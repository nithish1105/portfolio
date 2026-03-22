import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // We only want this on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let hoverTarget = null;
    let mouseX = 0, mouseY = 0;

    const moveCursor = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!hoverTarget) {
        gsap.to(cursor, {
          x: mouseX,
          y: mouseY,
          duration: 0.15,
          ease: "power2.out"
        });
      }
    };

    const handleHover = (e) => {
      hoverTarget = e.currentTarget;
      const rect = hoverTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Magnetic snap to center of button/link
      gsap.to(cursor, { 
        x: centerX, 
        y: centerY, 
        scale: 2.5, 
        backgroundColor: "rgba(0, 229, 176, 0.15)", // Teal glow
        borderColor: "rgba(0, 229, 176, 0.4)",
        duration: 0.3,
        ease: "power2.out"
      });
      
      // Also slightly move the target itself for full magnetic effect
      gsap.to(hoverTarget, {
        x: (mouseX - centerX) * 0.2,
        y: (mouseY - centerY) * 0.2,
        duration: 0.3,
        ease: "power2.out"
      });
      
      window.dispatchEvent(new CustomEvent('mouseenter-interactive'));
    };

    const handleHoverMove = (e) => {
      if (!hoverTarget) return;
      const rect = hoverTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      // Pull the cursor slightly towards the mouse while snapped
      const magneticX = centerX + (mouseX - centerX) * 0.3;
      const magneticY = centerY + (mouseY - centerY) * 0.3;
      
      gsap.to(cursor, {
        x: magneticX,
        y: magneticY,
        duration: 0.1,
        ease: "power2.out"
      });
      
      // Pull the button slightly
      gsap.to(hoverTarget, {
        x: (mouseX - centerX) * 0.2,
        y: (mouseY - centerY) * 0.2,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const handleLeave = (e) => {
      if (hoverTarget) {
        // Reset hovered element position
        gsap.to(hoverTarget, { x: 0, y: 0, duration: 0.4, ease: "elastic.out(1, 0.3)" });
      }
      hoverTarget = null;
      
      gsap.to(cursor, { 
        scale: 1, 
        backgroundColor: "#00e5b0", // Solid mint dot
        borderColor: "transparent", 
        duration: 0.3 
      });
      window.dispatchEvent(new CustomEvent('mouseleave-interactive'));
    };

    window.addEventListener("mousemove", moveCursor);

    // Add listeners to interactive elements
    const interactiveSelectors = 'a, button, [role="button"]';
    const initHoverEvents = () => {
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.addEventListener("mouseenter", handleHover);
        el.addEventListener("mousemove", handleHoverMove);
        el.addEventListener("mouseleave", handleLeave);
      });
    };
    
    initHoverEvents();
    
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          initHoverEvents();
        }
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll(interactiveSelectors).forEach(el => {
        el.removeEventListener("mouseenter", handleHover);
        el.removeEventListener("mousemove", handleHoverMove);
        el.removeEventListener("mouseleave", handleLeave);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-3 h-3 rounded-full bg-brand-500 pointer-events-none z-[9999] hidden md:block -ml-1.5 -mt-1.5 mix-blend-screen"
      />
    </>
  );
};

export default CursorFollower;
