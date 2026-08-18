import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

function MetaPixelTracker() {
  const location = useLocation();
  const isFirstLoad = useRef(true);

  useEffect(() => {
    // Base pixel in index.html already tracks the first PageView
    if (isFirstLoad.current) {
      isFirstLoad.current = false;
      return;
    }

    if (typeof window.fbq !== 'function') return;
    if (location.pathname.startsWith('/admin')) return;

    window.fbq('track', 'PageView');
  }, [location.pathname, location.search]);

  return null;
}

export default MetaPixelTracker;
