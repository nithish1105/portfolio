import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three-stdlib';

/**
 * Renders the Angry.fbx model in a self-contained Three.js canvas.
 * - Loads via FBXLoader
 * - AnimationMixer plays all baked animations
 * - Camera auto-frames the character
 * - Subtle mouse-based rotation for interactivity
 */
const AboutModel = () => {
  const mountRef  = useRef(null);
  const rafRef    = useRef(null);
  const mouseRef  = useRef({ x: 0, y: 0 });
  const smoothRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth  || 400;
    const H = mount.clientHeight || 500;

    /* ── Renderer ─────────────────────────────────────── */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
    renderer.toneMapping       = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.outputColorSpace  = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    /* ── Scene ────────────────────────────────────────── */
    const scene = new THREE.Scene();

    /* ── Camera ───────────────────────────────────────── */
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 1000);
    camera.position.set(0, 120, 280);
    camera.lookAt(0, 80, 0);

    /* ── Lighting ─────────────────────────────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.6));

    const keyLight = new THREE.DirectionalLight(0xffeedd, 1.8);
    keyLight.position.set(100, 200, 100);
    keyLight.castShadow = true;
    scene.add(keyLight);

    const rimL = new THREE.PointLight(0x059669, 2.5, 600);
    rimL.position.set(-200, 100, -100);
    scene.add(rimL);

    const rimR = new THREE.PointLight(0x34d399, 2.0, 600);
    rimR.position.set(200, 50, -100);
    scene.add(rimR);

    // Ground shadow receiver
    const ground = new THREE.Mesh(
      new THREE.PlaneGeometry(600, 600),
      new THREE.ShadowMaterial({ opacity: 0.3 })
    );
    ground.rotation.x  = -Math.PI / 2;
    ground.position.y  = 0;
    ground.receiveShadow = true;
    scene.add(ground);

    /* ── Load FBX ─────────────────────────────────────── */
    let mixer = null;
    const clock = new THREE.Clock();

    const loader = new FBXLoader();
    loader.load(
      '/angry.fbx',
      (fbx) => {
        // Auto-scale: FBX can have wildly varying units
        const box    = new THREE.Box3().setFromObject(fbx);
        const size   = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const targetH = 180; // desired height in scene units
        fbx.scale.setScalar(targetH / maxDim);

        // Re-center after scale
        const box2 = new THREE.Box3().setFromObject(fbx);
        const center = new THREE.Vector3();
        box2.getCenter(center);
        fbx.position.sub(center);
        fbx.position.y = 0; // feet on ground

        // Shadows + material tweaks
        fbx.traverse((obj) => {
          if (obj.isMesh) {
            obj.castShadow    = true;
            obj.receiveShadow = true;
            obj.frustumCulled = false;
            if (obj.material) {
              const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
              mats.forEach((mat) => {
                mat.roughness = 0.55;
                mat.metalness = 0.05;
              });
            }
          }
        });

        scene.add(fbx);

        // Reposition camera to properly frame the model
        const box3 = new THREE.Box3().setFromObject(fbx);
        const sz   = new THREE.Vector3();
        box3.getSize(sz);
        const ctr  = new THREE.Vector3();
        box3.getCenter(ctr);
        const dist = sz.y * 1.5;
        camera.position.set(0, ctr.y, dist);
        camera.lookAt(ctr);

        // AnimationMixer — play all clips
        if (fbx.animations && fbx.animations.length > 0) {
          mixer = new THREE.AnimationMixer(fbx);
          fbx.animations.forEach((clip) => {
            const action = mixer.clipAction(clip);
            action.setLoop(THREE.LoopRepeat, Infinity);
            action.play();
          });
        }
      },
      undefined,
      (err) => console.error('[AboutModel] FBX load error:', err),
    );

    /* ── Mouse tracking ───────────────────────────────── */
    const onMouse = (e) => {
      const r = mount.getBoundingClientRect();
      mouseRef.current.x  = ((e.clientX - r.left)  / r.width)  * 2 - 1;
      mouseRef.current.y = -((e.clientY - r.top)   / r.height) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    /* ── Render loop ──────────────────────────────────── */
    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Update animation mixer
      if (mixer) mixer.update(delta);

      // Smooth character rotation following mouse
      smoothRef.current.x += (mouseRef.current.x - smoothRef.current.x) * 0.05;
      // Apply to all scene children (the fbx group)
      scene.children.forEach((obj) => {
        if (obj.isMesh === undefined && obj !== ground) {
          obj.rotation.y = smoothRef.current.x * (Math.PI / 6);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    /* ── Resize ───────────────────────────────────────── */
    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouse);
      window.removeEventListener('resize', onResize);
      if (mixer) mixer.stopAllAction();
      scene.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry?.dispose();
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
          mats.forEach((m) => m?.dispose());
        }
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100%', borderRadius: 'inherit' }}
    />
  );
};

export default AboutModel;
