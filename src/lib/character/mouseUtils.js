export function setupMouseTracking(model, container = window) {
  const mouse = { x: 0, y: 0 };
  const smoothed = { x: 0, y: 0 };
  let active = true;

  // Look for common head or neck bones
  let headBone = null;
  const targetBoneNames = ['spine006', 'head', 'neck', 'mixamorighead', 'character_head'];
  
  model.traverse((child) => {
    if (child.isBone && !headBone) {
      const name = child.name.toLowerCase();
      if (targetBoneNames.some(t => name.includes(t))) {
        headBone = child;
      }
    }
  });

  // If pivoting a head bone, we can turn it more. If pivoting the whole model, turn it less.
  const MAX_X = headBone ? Math.PI / 6 : Math.PI / 10;  
  const MAX_Y = headBone ? Math.PI / 9 : Math.PI / 16;  
  const LERP = 0.05;

  const onMouseMove = (e) => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    mouse.x = (e.clientX / w) * 2 - 1;
    mouse.y = -((e.clientY / h) * 2 - 1);
  };

  const onTouchMove = (e) => {
    if (!e.touches[0]) return;
    mouse.x = (e.touches[0].clientX / window.innerWidth) * 2 - 1;
    mouse.y = -((e.touches[0].clientY / window.innerHeight) * 2 - 1);
  };

  const onTouchEnd = () => {
    // Ease back to center
    mouse.x = 0;
    mouse.y = 0;
  };

  container.addEventListener('mousemove', onMouseMove, { passive: true });
  container.addEventListener('touchmove', onTouchMove, { passive: true });
  container.addEventListener('touchend', onTouchEnd, { passive: true });

  return {
    setActive(val) {
      active = val;
    },
    update() {
      if (!active) return;

      smoothed.x += (mouse.x - smoothed.x) * LERP;
      smoothed.y += (mouse.y - smoothed.y) * LERP;

      const target = headBone || model;
      
      // If we are rotating the whole model, we just apply rotation
      target.rotation.y = smoothed.x * MAX_X;
      target.rotation.x = smoothed.y * MAX_Y;
    },
    dispose() {
      active = false;
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('touchmove', onTouchMove);
      container.removeEventListener('touchend', onTouchEnd);
    },
  };
}
