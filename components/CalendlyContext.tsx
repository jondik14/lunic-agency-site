import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { CALENDLY_SCHEDULING_URL } from '../constants';

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (opts: { url: string }) => void;
    };
  }
}

type CalendlyContextValue = { openCalendly: () => void };

const CalendlyContext = createContext<CalendlyContextValue | null>(null);

export const useCalendly = (): CalendlyContextValue => {
  const ctx = useContext(CalendlyContext);
  if (!ctx) throw new Error('useCalendly must be used within CalendlyProvider');
  return ctx;
};

/**
 * Lazy-loads the Calendly script on first open, then opens the popup.
 * Does not block initial page render. Respects prefers-reduced-motion by not
 * adding any extra animations (Calendly’s own modal is unchanged).
 */
function loadAndOpenCalendly() {
  const open = () => {
    if (typeof window === 'undefined') return;
    if (window.Calendly) {
      window.Calendly.initPopupWidget({ url: CALENDLY_SCHEDULING_URL });
      return;
    }
    const scr = document.createElement('script');
    scr.src = CALENDLY_SCRIPT;
    scr.async = true;
    scr.onload = () => {
      if (window.Calendly) window.Calendly.initPopupWidget({ url: CALENDLY_SCHEDULING_URL });
    };
    document.body.appendChild(scr);
  };
  open();
}

export const CalendlyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const openCalendly = useCallback(loadAndOpenCalendly, []);
  const value = useRef<CalendlyContextValue>({ openCalendly }).current;
  return <CalendlyContext.Provider value={value}>{children}</CalendlyContext.Provider>;
};
