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

import ErrorBoundary from './ui/ErrorBoundary';

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
      // Ensure we have the model and the DOM is ready
      const setupTimeline = () => {
        const model = getModel();
        if (model) {
          const baseScale = model.scale.x;
          // Capture initial transforms - assuming the model is in 'idle' state from load
          const basePos   = model.position.clone();
          const baseRot   = model.rotation.clone();
          
          // Cleanup old instance if strictly needed (though usually useEffect cleanup handles it)
          if (aboutTimeline) aboutTimeline.kill();

          aboutTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: "#about",
              start: "top 60%",   // Start slightly earlier
              end: "bottom center",
              scrub: 1.5,         // Smoother scrub
              onEnter:     () => mouseTracker?.setActive?.(false),
              onLeave:     () => mouseTracker?.setActive?.(true),
              onEnterBack: () => mouseTracker?.setActive?.(false), // Re-disable when scrolling back up into view
              onLeaveBack: () => mouseTracker?.setActive?.(true),
              invalidateOnRefresh: true,
            }
          });

          aboutTimeline
            .to(model.position, {
              x: -1.8,
              y: -2.3,
              z: 1.2,
              duration: 2,
              ease: "power2.inOut"
            }, 0)
            .to(model.scale, {
              x: baseScale * 2.5,
              y: baseScale * 2.5,
              z: baseScale * 2.5,
              duration: 2,
              ease: "power2.inOut"
            }, 0)
            .to(model.rotation, {
              y: Math.PI / 4,
              x: -Math.PI / 20,
              // z: baseRot.z, // Let Z stay as is or animate if needed
              duration: 2,
              ease: "power2.inOut"
            }, 0);
            
            // Force a refresh to ensure start/end positions are calculated correctly
            ScrollTrigger.refresh();
        } else {
             // Retry if model somehow isn't ready despite isReady check
             aboutTimer = setTimeout(setupTimeline, 100);
        }
      };

      // Slight delay to ensure layout is settled
      aboutTimer = setTimeout(setupTimeline, 100);

      return () => {
        if (aboutTimer) clearTimeout(aboutTimer);
        if (aboutTimeline) aboutTimeline.kill();
        // Ensure mouse tracker is re-enabled if we unmount/leave
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
          <ErrorBoundary fallback={<div className="text-white p-10">TechStack Unavailable</div>}>
            <TechStack />
          </ErrorBoundary>
          <Certificates />
          <Work />
          <Contact />
        </div>
      </main>
    </div>
  );
};

export default MainContainer;
