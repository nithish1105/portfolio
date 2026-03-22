import * as THREE from 'three';
import gsap from 'gsap';

export function setupLighting(scene, screenLightMesh = null) {
  // 1. Directional Light (Key)
  const dirLight = new THREE.DirectionalLight(0xffffff, 0); // Start at 0 for GSAP
  dirLight.position.set(5, 10, 7);
  dirLight.castShadow = true;
  dirLight.shadow.mapSize.width = 2048;
  dirLight.shadow.mapSize.height = 2048;
  dirLight.shadow.bias = -0.001;
  scene.add(dirLight);

  // 2. Point Light (Fill/Screen bounce)
  const pointLight = new THREE.PointLight(0x4ade80, 0, 20); // teal-ish
  pointLight.position.set(0, 5, 5);
  scene.add(pointLight);

// Expose light controller and add Ambient Light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0); // Start at 0
  scene.add(ambientLight);

  const controller = {
    dirLight,
    pointLight,
    ambientLight,
    scene, // Expose scene here
    envIntensity: 0, // Used by scene
    updateScreenLight: (intensity) => {
      // Connect point light to screen mesh emissive if needed
      pointLight.intensity = intensity;
      if (screenLightMesh && screenLightMesh.material) {
        screenLightMesh.material.emissiveIntensity = intensity;
      }
    }
  };

  return controller;
}

export function turnOnLights(scene, lightController, rimElement, onComplete) {
  const tl = gsap.timeline({ onComplete });

  tl.to(lightController, {
    envIntensity: 1.0,
    duration: 2.0,
    ease: "power2.inOut",
    onUpdate: () => {
      // In newer Three.js versions we can animate scene.environmentIntensity directly
      if ('environmentIntensity' in scene) {
        scene.environmentIntensity = lightController.envIntensity;
      }
    }
  })
  .to(lightController.dirLight, {
    intensity: 2.5,
    duration: 1.5,
    ease: "power2.out",
  }, "-=1.0")
  .to(lightController.ambientLight, {
    intensity: 1.0, // strong fallback ambient light
    duration: 1.5,
  }, "-=1.5")
  .to(rimElement, {
    opacity: 1, // Assumes rimElement is a DOM overlay with initial opacity 0
    duration: 1.0,
    ease: "power1.inOut"
  }, "-=1.0");

  return tl;
}
