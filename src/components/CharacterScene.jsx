import React, { useEffect, useRef } from 'react';
import { createCharacterScene } from '../lib/character/sceneSetup.js';
import { useLoading } from '../contexts/LoadingContext.jsx';

const CharacterScene = () => {
  const canvasRef = useRef(null);
  const { setProgress, isReady } = useLoading();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const { dispose } = createCharacterScene(
      canvas,
      (pct) => setProgress(pct),
      () => {
        // Readiness is handled by the LoadingContext based on progress reaching 1.0, Focus only on the canvas setup.
      }
    );

    return dispose;
  }, [setProgress]);

  return (
    <div className="absolute inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{
          opacity: isReady ? 1 : 0,
          transition: 'opacity 1s ease-in-out',
        }}
      />
    </div>
  );
};

export default CharacterScene;

