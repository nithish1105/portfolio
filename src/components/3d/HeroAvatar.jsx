import React, { useRef, useMemo } from 'react';
import { useFrame }               from '@react-three/fiber';
import { useGLTF, Float }         from '@react-three/drei';
import * as THREE                 from 'three';

/**
 * GLB model dimensions (confirmed from binary):
 *   Local Y: 0 → 1.5   (height = 1.5 units)
 *   Neck at: Y ≈ 1.15 (model space)
 *
 * World config with SCALE=2 and BASE_Y=-1.55:
 *   Feet world Y ≈ -1.55
 *   Neck world Y ≈ -1.55 + 1.15*2 = 0.75
 *   Head world Y ≈ -1.55 + 1.4*2  = 1.25
 */
const SCALE      = 2.0;
const BASE_Y     = -1.55;
const NECK_MDL   = 1.15;
const NECK_WLD   = BASE_Y + NECK_MDL * SCALE;   // ≈ 0.75

/* ── Animation phase timings ─────────────────────── */
const T_ENTER    = 0.8;   // seconds
const T_WAVE     = 2.6;   // seconds of wave
const T_SETTLE   = 0.55;  // blend back to neutral

/* ── Easing helpers ──────────────────────────────── */
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
const easeOutQuad  = (t) => 1 - Math.pow(1 - t, 2);

const HeroAvatar = () => {
  const { scene }     = useGLTF('/character.glb');
  const cloned        = useMemo(() => scene.clone(), [scene]);

  /* Refs that hold live transform targets (no React re-renders) */
  const bodyRef       = useRef();   // whole character group
  const neckRef       = useRef();   // pivot at neck for head follow

  const anim = useRef({
    phase:   'enter',      // 'enter' | 'wave' | 'settle' | 'idle'
    elapsed: 0,
    // smoothed cursor values
    cx: 0, cy: 0,
  });

  useFrame(({ pointer }, delta) => {
    const a    = anim.current;
    const body = bodyRef.current;
    const neck = neckRef.current;
    if (!body || !neck) return;

    a.elapsed += delta;
    // Smooth cursor
    a.cx = THREE.MathUtils.lerp(a.cx, pointer.x, 0.07);
    a.cy = THREE.MathUtils.lerp(a.cy, pointer.y, 0.07);

    /* ─── ENTER: rise from below + fade in scale ─────────── */
    if (a.phase === 'enter') {
      const t    = Math.min(a.elapsed / T_ENTER, 1);
      const ease = easeOutCubic(t);

      body.position.y = THREE.MathUtils.lerp(-4, 0, ease);
      body.scale.setScalar(THREE.MathUtils.lerp(0.5, 1, ease));
      body.rotation.set(0, 0, 0);
      neck.rotation.set(0, 0, 0);

      if (t >= 1) { a.phase = 'wave'; a.elapsed = 0; }

    /* ─── WAVE: body rocks like waving arm greeting ──────── */
    } else if (a.phase === 'wave') {
      const t = a.elapsed;

      // Primary wave: decaying sine on Z (tilt left/right)
      const wave = Math.sin(t * Math.PI * 3.2) * Math.exp(-t * 1.1);
      // Secondary sway on Y
      const sway = Math.sin(t * Math.PI * 1.6) * Math.exp(-t * 0.8);

      body.position.y = 0;
      body.scale.setScalar(1);
      body.rotation.z = wave *  0.22;
      body.rotation.y = sway *  0.14;
      body.rotation.x = 0;

      // Head bobs sympathetically
      neck.rotation.z = wave *  0.09;
      neck.rotation.y = sway * -0.06;
      neck.rotation.x = 0;

      if (a.elapsed >= T_WAVE) { a.phase = 'settle'; a.elapsed = 0; }

    /* ─── SETTLE: blend all rotations to zero ────────────── */
    } else if (a.phase === 'settle') {
      const t    = Math.min(a.elapsed / T_SETTLE, 1);
      const ease = easeOutQuad(t);

      body.rotation.z = THREE.MathUtils.lerp(body.rotation.z, 0, ease);
      body.rotation.y = THREE.MathUtils.lerp(body.rotation.y, 0, ease);
      neck.rotation.z = THREE.MathUtils.lerp(neck.rotation.z, 0, ease);
      neck.rotation.y = THREE.MathUtils.lerp(neck.rotation.y, 0, ease);

      if (t >= 1) { a.phase = 'idle'; }

    /* ─── IDLE: cursor-driven head tracking ──────────────── */
    } else {
      body.rotation.z = 0;
      body.rotation.y = 0;
      body.rotation.x = 0;

      neck.rotation.y =  a.cx * (Math.PI / 6);   // ±30° left/right
      neck.rotation.x = -a.cy * (Math.PI / 9);   // ±20° up/down
      neck.rotation.z =  0;
    }
  });

  return (
    /**
     * Float: subtle idle breathing that persists through all phases.
     * rotationIntensity very low to not fight our animation.
     */
    <Float speed={1.6} rotationIntensity={0.02} floatIntensity={0.28}>

      {/* bodyRef: receives enter slide-up + wave tilt */}
      <group ref={bodyRef} position={[0, -4, 0]} scale={0.5}>

        {/* Neck pivot: head follows cursor in idle phase */}
        <group position={[0, NECK_WLD, 0]}>
          <group ref={neckRef}>
            <group position={[0, -NECK_WLD, 0]}>
              <group position={[0, BASE_Y, 0]} scale={SCALE}>
                <primitive object={cloned} />
              </group>
            </group>
          </group>
        </group>

      </group>
    </Float>
  );
};

useGLTF.preload('/character.glb');
export default HeroAvatar;
