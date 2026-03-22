import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLoading } from '../contexts/LoadingContext';
import { createCharacterScene } from '../lib/character/sceneSetup';
import { turnOnLights } from '../lib/character/lightingUtils';

import Landing from './sections/Landing';
import About from './sections/About';
import WhatIDo from './sections/WhatIDo';
import TechStack from './sections/TechStack';
import Certificates from './sections/Certificates';
import Work from './sections/Work';
import Contact from './sections/Contact';

gsap.registerPlugin(ScrollTrigger);

const MainContainer = () => {
  const canvasRef = useRef(null);
  const { setProgress, isReady } = useLoading();
  const characterSystemRef = useRef(null);
  const overlayRimRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const setup = createCharacterScene(
      canvasRef.current,
      (pct) => setProgress(pct),
      () => setProgress(1.0)
    );

    characterSystemRef.current = setup;

    return () => setup.dispose();
  }, [setProgress]);

  // Orchestrate the intro sequence once the loading screen tells us we're ready (i.e., its exit animation finishes)
  useEffect(() => {
    if (isReady && characterSystemRef.current) {
      const { lightController, mixerManager, getModel, mouseTracker } = characterSystemRef.current;
      let aboutTimeline = null;
      let aboutTimer = null;
      
      // 1. Turn on lights, pass the rim element
      turnOnLights(
        lightController.scene, 
        lightController, 
        overlayRimRef.current, 
        () => {
          // 2. Play intro animation
          if (mixerManager) {
            mixerManager.playIntroAndLoop();
          }
        }
      );

      // 3. Setup ScrollTrigger for 3D Character
        // Wait a moment for model to be fully ready before grabbing
      aboutTimer = setTimeout(() => {
        const model = getModel();
        if (model) {
          const baseScale = model.scale.x;
          const basePos   = model.position.clone();
          const baseRot   = model.rotation.clone();
          
          // Smooth, classy scrubbed animation that matches the provided reference crop
          aboutTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: "#about",
              start: "top 75%",   // start earlier so the shift is visible
              end: "bottom center",
              scrub: 1.2,
              onEnter:   () => mouseTracker?.setActive?.(false),
              onLeave:   () => mouseTracker?.setActive?.(true),
              onLeaveBack: () => mouseTracker?.setActive?.(true),
            }
          });

          aboutTimeline
            .fromTo(model.position, {
              x: basePos.x,
              y: basePos.y,
              z: basePos.z,
            }, {
              x: -1.8,   // Positioned on the left side like the photo
              y: -2.3,   // Shoulders at the bottom
              z: 1.2,    // Closer to camera
              duration: 1.2,
              ease: "power3.inOut"
            }, 0)
            .fromTo(model.scale, {
              x: baseScale,
              y: baseScale,
              z: baseScale,
            }, {
              x: baseScale * 2.5, // Large but fully visible head
              y: baseScale * 2.5,
              z: baseScale * 2.5,
              duration: 1.2,
              ease: "power3.inOut"
            }, 0)
            .fromTo(model.rotation, {
              x: baseRot.x,
              y: baseRot.y,
              z: baseRot.z,
            }, {
              y: Math.PI / 4, // 45 degree turn towards text
              x: -Math.PI / 20, // Slight tilt down
              z: baseRot.z,
              duration: 1.2,
              ease: "power3.inOut"
            }, 0);
        }
      }, 500);

      return () => {
        if (aboutTimer) clearTimeout(aboutTimer);
        if (aboutTimeline?.scrollTrigger) aboutTimeline.scrollTrigger.kill();
        if (aboutTimeline) aboutTimeline.kill();
        mouseTracker?.setActive?.(true);
      };
    }
  }, [isReady]);

  return (
    <div className="relative w-full">
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full pointer-events-auto"
          style={{ opacity: isReady ? 1 : 0, transition: 'opacity 0.6s ease-in-out' }}
        />
      </div>

      {/* Rim Light DOM Overlay */}
      <div 
        ref={overlayRimRef} 
        className="fixed inset-0 z-0 pointer-events-none opacity-0 shadow-[inset_-50px_0_150px_rgba(20,184,166,0.15)]" 
      />

      <main className="relative z-10 bg-transparent flex flex-col">
        {/* Sections */}
        <div id="home" className="h-[100dvh] relative">
          <Landing />
        </div>
        
        {/* About section made transparent to reveal the shifted 3D character */}
        <About />

        {/* We place these in a solid background wrapper so they overlay the fixed canvas below them */}
        <div className="bg-black relative z-20">
          <WhatIDo />
          <TechStack />
          <Certificates />
          <Work />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
