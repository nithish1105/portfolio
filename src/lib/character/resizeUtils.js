import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function setupResizeHandling(camera, renderer) {
  let timeoutId = null;

  const handleResize = () => {
    // Debounce the resize event
    if (timeoutId) clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Update camera
      if (camera && camera.isPerspectiveCamera) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }

      // Update renderer
      if (renderer) {
        renderer.setSize(w, h);
      }

      // Refresh GSAP ScrollTriggers globally
      ScrollTrigger.refresh();
      
      // if specific timelines need resetting, they can hook into ScrollTrigger directly.
    }, 200);
  };

  window.addEventListener('resize', handleResize, { passive: true });

  return {
    dispose: () => {
      if (timeoutId) clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    }
  };
}
