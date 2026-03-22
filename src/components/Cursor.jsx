import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const CursorFollower = () => {
  const cursorRef = useRef(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    // Use quickSetter for instant updates without overhead of gsap.to() parsing
    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");

    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;
    let isHovering = false;

    // Use requestAnimationFrame loop for smooth following instead of reacting to every event
    let rafId = null;
    const loop = () => {
      // Smooth lerp: moves 15% towards target per frame
      const dt = 0.15;
      targetX += (mouseX - targetX) * dt;
      targetY += (mouseY - targetY) * dt;

      xSet(targetX);
      ySet(targetY);
      rafId = requestAnimationFrame(loop);
    };
    loop();

    const onMouseMove = (e) => {
      // Offset by half width/height so cursor centers on pointer
      mouseX = e.clientX - 6; 
      mouseY = e.clientY - 6;
    };

    // --- Hover Logic using Event Delegation (Performant) ---
    // Instead of attaching listeners to every element, listen on document capture/bubble
    const onMouseOver = (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target) {
        isHovering = true;
        gsap.to(cursor, { 
          scale: 3.5, 
          backgroundColor: "rgba(0, 229, 176, 0.1)", // Faint teal
          borderColor: "rgba(0, 229, 176, 0.4)",
          borderWidth: "1px",
          borderStyle: "solid",
          duration: 0.3,
          ease: "power2.out"
        });
      }
    };

    const onMouseOut = (e) => {
      const target = e.target.closest('a, button, [role="button"]');
      if (target) {
        isHovering = false;
        gsap.to(cursor, { 
          scale: 1, 
          backgroundColor: "#00e5b0", // Solid mint dot
          borderColor: "transparent", 
          borderWidth: "0px",
          duration: 0.3 
        });
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseout", onMouseOut, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseout", onMouseOut);
    };
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 w-3 h-3 rounded-full bg-brand-500 pointer-events-none z-[9999] hidden md:block"
      style={{ willChange: 'transform' }} // Hardware acceleration hint
    />
  );
};


export default CursorFollower;
