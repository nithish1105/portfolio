import * as THREE from 'three';
import gsap from 'gsap';

export function playHiAudio() {
  // Web Audio API friendly tone chime
  try {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      const ctx = new AudioCtx();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const now = ctx.currentTime;

      // Two-tone rising melody for "Hi!"
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc2.type = 'sine';

      // Pitch glide from 440Hz to 660Hz
      osc1.frequency.setValueAtTime(440, now);
      osc1.frequency.exponentialRampToValueAtTime(660, now + 0.2);

      osc2.frequency.setValueAtTime(880, now);
      osc2.frequency.exponentialRampToValueAtTime(1320, now + 0.2);

      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 0.55);
      osc2.stop(now + 0.55);
    }
  } catch (err) {
    console.error('Audio synth error:', err);
  }

  // Voice speech utterance
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    try {
      window.speechSynthesis.cancel();
      const msg = new SpeechSynthesisUtterance("Hi! Welcome!");
      msg.rate = 1.0;
      msg.pitch = 1.2;
      msg.volume = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const englishVoice = voices.find(v => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha')));
      if (englishVoice) msg.voice = englishVoice;

      window.speechSynthesis.speak(msg);
    } catch (e) {
      console.warn('SpeechSynthesis error:', e);
    }
  }
}

export function setupAnimationMixer(model, animations) {
  const mixer = model ? new THREE.AnimationMixer(model) : null;
  const actions = {};

  if (animations && animations.length > 0 && mixer) {
    animations.forEach((clip) => {
      actions[clip.name] = mixer.clipAction(clip);
    });
  }

  // Multi-pattern bone detection supporting Mixamo, Blender, Humanoid & GLTF naming
  let rightArm = null;
  let rightForeArm = null;
  let rightHand = null;
  let head = null;

  if (model) {
    model.traverse((child) => {
      const name = child.name ? child.name.toLowerCase() : '';
      if (!name) return;

      if (!rightArm && (/right.*arm|arm.*r|upper.*arm.*r|r.*upper.*arm|mixamorig.*rightarm/i.test(name) && !/fore|lower/i.test(name))) {
        rightArm = child;
      } else if (!rightForeArm && (/right.*forearm|forearm.*r|lower.*arm.*r|r.*lower.*arm|mixamorig.*rightforearm|elbow.*r/i.test(name))) {
        rightForeArm = child;
      } else if (!rightHand && (/right.*hand|hand.*r|wrist.*r|mixamorig.*righthand/i.test(name))) {
        rightHand = child;
      } else if (!head && (/head|neck|mixamorig.*head/i.test(name))) {
        head = child;
      }
    });
  }

  const triggerHandWave = (onComplete) => {
    // Play sound & voice greeting
    playHiAudio();

    const tl = gsap.timeline({ onComplete });

    if (rightArm || rightForeArm || rightHand) {
      const initArmZ = rightArm ? rightArm.rotation.z : 0;
      const initArmX = rightArm ? rightArm.rotation.x : 0;
      const initForeZ = rightForeArm ? rightForeArm.rotation.z : 0;
      const initHandZ = rightHand ? rightHand.rotation.z : 0;

      // 1. Lift right arm up & turn head/torso friendly toward screen
      if (rightArm) {
        tl.to(rightArm.rotation, { z: -1.3, x: 0.4, duration: 0.4, ease: "back.out(1.4)" }, 0);
      }
      if (rightForeArm) {
        tl.to(rightForeArm.rotation, { z: -0.7, duration: 0.4, ease: "back.out(1.4)" }, 0);
      }
      if (head) {
        tl.to(head.rotation, { y: 0.2, x: 0.05, duration: 0.35, ease: "power1.out" }, 0);
      }
      if (model) {
        tl.to(model.rotation, { y: 0.1, duration: 0.35, ease: "power1.out" }, 0);
      }

      // 2. Wave hand back & forth 6 times
      const wavingBone = rightHand || rightForeArm || rightArm;
      if (wavingBone) {
        tl.to(wavingBone.rotation, { z: "-=0.45", duration: 0.16, yoyo: true, repeat: 5, ease: "sine.inOut" });
      }

      // 3. Lower arm back smoothly to rest pose
      if (rightArm) tl.to(rightArm.rotation, { z: initArmZ, x: initArmX, duration: 0.5, ease: "power2.inOut" });
      if (rightForeArm) tl.to(rightForeArm.rotation, { z: initForeZ, duration: 0.5, ease: "power2.inOut" });
      if (rightHand) tl.to(rightHand.rotation, { z: initHandZ, duration: 0.5, ease: "power2.inOut" });
      if (head) tl.to(head.rotation, { y: 0, x: 0, duration: 0.45, ease: "power1.inOut" }, "-=0.4");
      if (model) tl.to(model.rotation, { y: 0, duration: 0.45, ease: "power1.inOut" }, "-=0.4");

    } else if (model) {
      // Expressive full character tilt & wave motion fallback
      tl.to(model.rotation, { z: 0.12, y: 0.2, duration: 0.35, ease: "power2.out" })
        .to(model.rotation, { z: -0.12, duration: 0.18, yoyo: true, repeat: 5, ease: "sine.inOut" })
        .to(model.rotation, { z: 0, y: 0, duration: 0.45, ease: "power2.inOut" });
    } else {
      if (onComplete) onComplete();
    }
  };

  const playIntroAndLoop = (onComplete) => {
    // Play any built-in idle/wave clip from the GLTF if available
    if (animations && animations.length > 0) {
      const idleClip = animations.find(a => /idle|breathe|stand/i.test(a.name)) || animations[0];
      if (idleClip && actions[idleClip.name]) {
        const action = actions[idleClip.name];
        action.setLoop(THREE.LoopRepeat, Infinity);
        action.fadeIn(0.5);
        action.play();
      }
    }

    // Gentle idle floating bob so the character always feels alive
    if (model) {
      const startY = model.position.y;
      gsap.to(model.position, {
        y: startY + 0.05,
        duration: 2.2,
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
      });
    }

    if (onComplete) onComplete();
  };

  const triggerHoverEyebrowAnimation = () => {};

  return {
    mixer,
    actions,
    playIntroAndLoop,
    triggerHandWave,
    triggerHoverEyebrowAnimation,
    update: (dt) => {
      if (mixer) mixer.update(dt);
    }
  };
}
