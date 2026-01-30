import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import * as Clarity from '@microsoft/clarity';

const CLARITY_PROJECT_ID = import.meta.env.VITE_CLARITY_PROJECT_ID || '';

/**
 * Clarity Analytics — initializes when project ID is set. All calls guarded to avoid console errors.
 */
const ClarityAnalytics: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return;
    try {
      if (typeof (Clarity as { init?: (id: string) => void }).init === 'function') {
        (Clarity as { init: (id: string) => void }).init(CLARITY_PROJECT_ID);
      }
      const c = Clarity as { consentV2?: (o: { ad_Storage: string; analytics_Storage: string }) => void };
      if (typeof c.consentV2 === 'function') {
        c.consentV2({ ad_Storage: 'denied', analytics_Storage: 'granted' });
      }
    } catch (_) {
      // Silently skip if SDK not available or version mismatch
    }
  }, []);

  useEffect(() => {
    if (!CLARITY_PROJECT_ID) return;
    const pageId = location.pathname + location.hash;
    try {
      const c = Clarity as { identify?: (...args: unknown[]) => void; setTag?: (k: string, v: string) => void };
      if (typeof c.identify === 'function') c.identify(undefined, undefined, pageId, undefined);
      if (typeof c.setTag === 'function') {
        const pageType = location.pathname === '/' ? 'home' : location.pathname.startsWith('/blog') ? 'blog' : location.pathname.startsWith('/work') ? 'work' : location.pathname.startsWith('/contact') ? 'contact' : 'other';
        c.setTag('page-type', pageType);
      }
    } catch (_) {
      // Silently skip
    }
  }, [location]);

  return null;
};

export default ClarityAnalytics;
