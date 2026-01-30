import React from 'react';

/**
 * Fixed overlay at the bottom of the viewport. Opacity mask that fades from
 * transparent (top) to the page background (bottom)—content fades out as it
 * scrolls under, no blur. Respects prefers-reduced-motion (see index.css).
 */
const ViewportBottomBlur: React.FC = () => (
  <div
    className="viewport-bottom-blur fixed bottom-0 left-0 right-0 h-32 md:h-48 pointer-events-none z-[30]"
    aria-hidden
    style={{
      background: 'linear-gradient(to top, rgba(249,248,246,0.92) 0%, rgba(249,248,246,0.5) 40%, rgba(249,248,246,0) 100%)',
    }}
  />
);

export default ViewportBottomBlur;
