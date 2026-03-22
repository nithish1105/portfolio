import React, { useEffect, useRef, useState } from 'react';

const TOTAL_FRAMES = 240;
const WAVE_FPS     = 24;
const IDLE_FRAME   = 239; // 0-indexed → frame 240 (standing still)

// Head region: top 38% of the image height
const HEAD_RATIO   = 0.38;
// Max pixel shift of head in each direction
const MAX_SHIFT_X  = 18;
const MAX_SHIFT_Y  = 12;

/** Remove green-screen pixels from ImageData in place */
function chromaKey(data) {
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    if (g > 80 && g > r * 1.25 && g > b * 1.25) {
      data[i + 3] = 0;
    }
  }
}

const CharacterAnimation = ({ width = 420, height = 570 }) => {
  const canvasRef   = useRef(null);
  const framesRef   = useRef([]);           // all Image objects
  const stateRef    = useRef('loading');    // 'loading' | 'wave' | 'idle'
  const frameIdxRef = useRef(0);
  const lastTimeRef = useRef(0);
  const rafRef      = useRef(null);

  // Smooth cursor tracking (in pixels, relative to canvas centre)
  const cursorRef   = useRef({ x: 0, y: 0 });
  const smoothRef   = useRef({ x: 0, y: 0 });

  const [loading, setLoading]   = useState(true);

  // ── 1. Preload all frames ────────────────────────────────────────────────
  useEffect(() => {
    let loaded = 0;
    const imgs = new Array(TOTAL_FRAMES);

    const done = () => {
      framesRef.current = imgs;
      setLoading(false);
      stateRef.current = 'wave';
    };

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const num = String(i + 1).padStart(3, '0');
      img.src = `/frames/ezgif-frame-${num}.jpg`;
      img.onload = img.onerror = () => { if (++loaded === TOTAL_FRAMES) done(); };
      imgs[i] = img;
    }
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // ── 2. Track cursor position ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!parent) return;

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const cx   = rect.left + rect.width  / 2;
      const cy   = rect.top  + rect.height / 2;
      // normalise to -1..+1 relative to component centre
      cursorRef.current.x = Math.max(-1, Math.min(1, (e.clientX - cx) / (rect.width  / 2)));
      cursorRef.current.y = Math.max(-1, Math.min(1, (e.clientY - cy) / (rect.height / 2)));
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // ── 3. Render loop ──────────────────────────────────────────────────────
  useEffect(() => {
    if (loading) return;

    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d', { willReadFrequently: true });
    const W      = canvas.width;
    const H      = canvas.height;
    const HEAD_H = Math.floor(H * HEAD_RATIO);  // pixel height of head zone
    const INTERVAL = 1000 / WAVE_FPS;

    // Pre-render all frames into offscreen canvases so chroma-key runs once only
    const offscreens = framesRef.current.map((img) => {
      const off = document.createElement('canvas');
      off.width  = W;
      off.height = H;
      const oc   = off.getContext('2d', { willReadFrequently: true });
      oc.drawImage(img, 0, 0, W, H);
      const id   = oc.getImageData(0, 0, W, H);
      chromaKey(id.data);
      oc.putImageData(id, 0, 0);
      return off;
    });

    const render = (ts) => {
      rafRef.current = requestAnimationFrame(render);
      const mode = stateRef.current;

      if (mode === 'wave') {
        // ── Wave phase: advance frames at FPS ───────────────────
        if (ts - lastTimeRef.current < INTERVAL) return;
        lastTimeRef.current = ts;

        ctx.clearRect(0, 0, W, H);
        ctx.drawImage(offscreens[frameIdxRef.current], 0, 0);

        frameIdxRef.current++;
        if (frameIdxRef.current >= TOTAL_FRAMES) {
          frameIdxRef.current = IDLE_FRAME;
          stateRef.current    = 'idle';
        }

      } else if (mode === 'idle') {
        // ── Idle phase: static body + head follows cursor ────────
        // Smooth cursor with lerp
        smoothRef.current.x += (cursorRef.current.x - smoothRef.current.x) * 0.07;
        smoothRef.current.y += (cursorRef.current.y - smoothRef.current.y) * 0.07;

        const shiftX = smoothRef.current.x * MAX_SHIFT_X;
        const shiftY = smoothRef.current.y * MAX_SHIFT_Y;

        const idle = offscreens[IDLE_FRAME];

        ctx.clearRect(0, 0, W, H);

        // 1. Draw full body (lower portion, no shift)
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, HEAD_H, W, H - HEAD_H);
        ctx.clip();
        ctx.drawImage(idle, 0, 0);
        ctx.restore();

        // 2. Draw head region shifted by cursor
        ctx.save();
        ctx.beginPath();
        ctx.rect(0, 0, W, HEAD_H);
        ctx.clip();
        ctx.drawImage(idle, shiftX, shiftY);   // entire image shifted; clip keeps only head
        ctx.restore();
      }
    };

    rafRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loading]);

  return (
    <div style={{ position: 'relative', width, height }}>
      {loading && (
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          color: '#4ade80', gap: 12, fontSize: 13, fontFamily: 'monospace',
        }}>
          <div className="loading-ring" />
          <span>Loading…</span>
        </div>
      )}
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          opacity: loading ? 0 : 1,
          transition: 'opacity 0.5s',
          filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.65))',
        }}
      />
    </div>
  );
};

export default CharacterAnimation;
