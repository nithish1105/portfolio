import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import { RGBELoader } from 'three-stdlib';
import { setupLighting } from './lightingUtils.js';
import { setupAnimationMixer } from './animationUtils.js';
import { setupMouseTracking } from './mouseUtils.js';
import { decryptAndGetBlobUrl } from './decrypt.js';
import { setupResizeHandling } from './resizeUtils.js';

export function createCharacterScene(canvas, onProgress, onReady) {
  let disposed = false;
  let rafId = null;
  let mixerManager = null;
  let mouseTracker = null;
  let loadedModel = null;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 7);
  camera.lookAt(0, 0, 0);
  // camera.zoom = 1.1; // removed to ensure it fits nicely
  camera.updateProjectionMatrix();

  const renderer = new THREE.WebGLRenderer({ 
    canvas, 
    alpha: true, 
    antialias: true,
    powerPreference: "high-performance"
  });
  // Cap pixel ratio to 1.5 to save huge GPU overhead on Retina/4K screens
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Keep soft shadows but maybe reduce map size in lightingUtils

  const lightController = setupLighting(scene);

  const resizeHandler = setupResizeHandling(camera, renderer);

  const loadScene = async () => {
    try {
      // Skip Decrypt for custom provided models
      const url = '/models/base_basic_pbr.glb';
      const revoke = () => {};

      const loader = new GLTFLoader();
      const dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath('/draco/');
      loader.setDRACOLoader(dracoLoader);

      loader.load(
        url,
        async (gltf) => {
          if (disposed) return;
          const model = gltf.scene;

          // Auto-center and scale to ensure visibility
          const box = new THREE.Box3().setFromObject(model);
          const size = box.getSize(new THREE.Vector3());
          const center = box.getCenter(new THREE.Vector3());
          
          // Re-center
          model.position.x += (model.position.x - center.x);
          model.position.y += (model.position.y - center.y);
          model.position.z += (model.position.z - center.z);
          
          // Scale so the max dimension is about ~3.5 units to fit the camera properly
          const maxDim = Math.max(size.x, size.y, size.z);
          if (maxDim > 0 && maxDim !== 3.5) {
            const scale = 3.5 / maxDim;
            model.scale.setScalar(scale);
          }
          
          // Nudge down slightly so it sits neatly in the viewport
          model.position.y -= 1.5;

          // Create dynamic 3D teal back-glow
          const canvasGlow = document.createElement('canvas');
          canvasGlow.width = 128; canvasGlow.height = 128;
          const ctx = canvasGlow.getContext('2d');
          const gradient = ctx.createRadialGradient(64,64,0, 64,64,64);
          gradient.addColorStop(0, 'rgba(0, 229, 176, 0.4)');
          gradient.addColorStop(1, 'rgba(0, 229, 176, 0)');
          ctx.fillStyle = gradient;
          ctx.fillRect(0,0,128,128);
          
          const tex = new THREE.CanvasTexture(canvasGlow);
          const spriteMat = new THREE.SpriteMaterial({ map: tex, transparent: true, blending: THREE.AdditiveBlending });
          const sprite = new THREE.Sprite(spriteMat);
          sprite.scale.set(10, 10, 1);
          sprite.position.set(0, 2, -1.5); // Push entirely behind character but attached
          model.add(sprite);

          // Outline / Glow Stroke for the character
          const outlineMaterial = new THREE.ShaderMaterial({
            uniforms: {
              color: { value: new THREE.Color(0x00e5b0) },
              thickness: { value: 0.04 }
            },
            vertexShader: `
              uniform float thickness;
              #include <common>
              #include <skinning_pars_vertex>
              void main() {
                vec3 transformed = position + normal * thickness;
                #include <skinbase_vertex>
                #include <skinning_vertex>
                #include <project_vertex>
              }
            `,
            fragmentShader: `
              uniform vec3 color;
              void main() {
                gl_FragColor = vec4(color, 1.0);
              }
            `,
            side: THREE.BackSide,
            skinning: true,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false, 
          });

          // Traverse and collect meshes to outline
          const meshesToOutline = [];
          model.traverse((child) => {
            if (child.isMesh) {
              child.castShadow = true;
              child.receiveShadow = true;
              child.frustumCulled = true;

              // Tweak clothing
              if (child.material && child.material.name.toLowerCase().includes('shirt')) {
                child.material.color.setHex(0x8B4513);
              }
              if (child.material && child.material.name.toLowerCase().includes('pant')) {
                child.material.color.setHex(0x000000);
              }
              child.material.needsUpdate = true;
              
              if (child.isSkinnedMesh) {
                meshesToOutline.push(child);
              }
            }
          });

          meshesToOutline.forEach((mesh) => {
            const outline = mesh.clone();
            outline.material = outlineMaterial;
            outline.renderOrder = -1;
            if (mesh.parent) {
              mesh.parent.add(outline);
            }
          });

          scene.add(model);
          loadedModel = model;

          mixerManager = setupAnimationMixer(model, gltf.animations);
          mouseTracker = setupMouseTracking(model, window);

          // Compile shaders synchronously before render to prevent stutter
          await renderer.compileAsync(scene, camera);

          revoke(); // Cleanup blob

          if (onReady) onReady();
        },
        (xhr) => {
          if (onProgress) onProgress(xhr.loaded / xhr.total);
        },
        (err) => console.error('[GLTFLoader] Error:', err)
      );

    } catch (err) {
      console.error('Failed to load scene:', err);
    }
  };

  loadScene();

  const clock = new THREE.Clock();

  const renderLoop = () => {
    if (disposed) return;
    rafId = requestAnimationFrame(renderLoop);

    const dt = clock.getDelta();
    if (mixerManager) mixerManager.update(dt);
    if (mouseTracker) mouseTracker.update();

    renderer.render(scene, camera);
  };

  renderLoop();

  return {
    lightController,
    mixerManager,
    mouseTracker,
    getModel: () => loadedModel,
    dispose: () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      resizeHandler.dispose();
      
      if (mouseTracker) mouseTracker.dispose();
      if (mixerManager && mixerManager.mixer) {
        mixerManager.mixer.stopAllAction();
        mixerManager.mixer.uncacheRoot(mixerManager.mixer.getRoot());
      }
      
      scene.traverse((child) => {
        if (child.isMesh) {
          if (child.geometry) child.geometry.dispose();
          if (child.material) {
            if (Array.isArray(child.material)) {
              child.material.forEach(m => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        }
      });

      renderer.dispose();
    }
  };
}
