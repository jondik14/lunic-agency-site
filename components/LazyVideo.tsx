import React, { useRef, useEffect, useState, forwardRef } from 'react';

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
  /** Load when within this distance of viewport (px or % only). Default 400px = start loading before visible. */
  rootMargin?: string;
}

/**
 * Video that only loads its source when it enters the viewport. Speeds up initial page load.
 * Uses a large default rootMargin so playback is ready by the time the user scrolls to it.
 */
const LazyVideo = forwardRef<HTMLVideoElement, LazyVideoProps>(
  ({ src, rootMargin = '400px', ...props }, ref) => {
    const innerRef = useRef<HTMLVideoElement>(null);
    const setRef = (el: HTMLVideoElement | null) => {
      innerRef.current = el;
      if (typeof ref === 'function') ref(el);
      else if (ref) (ref as React.MutableRefObject<HTMLVideoElement | null>).current = el;
    };
    const [shouldLoad, setShouldLoad] = useState(false);

    useEffect(() => {
      const el = innerRef.current;
      if (!el || !src) return;

      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) setShouldLoad(true);
        },
        { rootMargin, threshold: 0.01 }
      );
      io.observe(el);
      return () => io.disconnect();
    }, [src, rootMargin]);

    return (
      <video
        ref={setRef}
        src={shouldLoad ? src : undefined}
        preload={shouldLoad ? 'auto' : 'none'}
        {...props}
      />
    );
  }
);

LazyVideo.displayName = 'LazyVideo';

export default LazyVideo;
