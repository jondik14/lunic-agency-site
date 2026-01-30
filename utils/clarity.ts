import * as Clarity from '@microsoft/clarity';

type ClarityAPI = {
  event?: (name: string) => void;
  setTag?: (key: string, value: string | string[]) => void;
  identify?: (a?: string, b?: string, c?: string, d?: string) => void;
  upgrade?: (reason: string) => void;
  consentV2?: (opts: { ad_Storage: string; analytics_Storage: string }) => void;
};
const C = Clarity as ClarityAPI;

/**
 * Clarity Analytics helpers. All calls guarded so no console errors if SDK exports differ.
 */
export const trackClarityEvent = (eventName: string): void => {
  try {
    if (typeof C.event === 'function') C.event(eventName);
  } catch (_) {}
};

export const setClarityTag = (key: string, value: string | string[]): void => {
  try {
    if (typeof C.setTag === 'function') C.setTag(key, value);
  } catch (_) {}
};

export const identifyClarityUser = (
  customId: string,
  customSessionId?: string,
  customPageId?: string,
  friendlyName?: string
): void => {
  try {
    if (typeof C.identify === 'function') C.identify(customId, customSessionId, customPageId, friendlyName);
  } catch (_) {}
};

export const upgradeClaritySession = (reason: string): void => {
  try {
    if (typeof C.upgrade === 'function') C.upgrade(reason);
  } catch (_) {}
};

export const setClarityConsent = (
  adStorage: 'granted' | 'denied' = 'denied',
  analyticsStorage: 'granted' | 'denied' = 'granted'
): void => {
  try {
    if (typeof C.consentV2 === 'function') C.consentV2({ ad_Storage: adStorage, analytics_Storage: analyticsStorage });
  } catch (_) {}
};
