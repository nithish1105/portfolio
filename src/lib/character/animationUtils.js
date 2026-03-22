import * as THREE from 'three';

export function setupAnimationMixer(model, animations) {
  if (!animations || animations.length === 0) return null;

  const mixer = new THREE.AnimationMixer(model);
  const actions = {};

  animations.forEach((clip) => {
    actions[clip.name] = mixer.clipAction(clip);
  });

  const playIntroAndLoop = () => {
    // Just play the first animation found, if any
    const anim = animations[0];
    if (anim && actions[anim.name]) {
      const action = actions[anim.name];
      action.setLoop(THREE.LoopRepeat, Infinity);
      action.play();
    }
  };

  const triggerHoverEyebrowAnimation = () => {
    // Safe mock if no hover animation exists
  };

  return {
    mixer,
    actions,
    playIntroAndLoop,
    triggerHoverEyebrowAnimation,
    update: (dt) => mixer.update(dt)
  };
}
