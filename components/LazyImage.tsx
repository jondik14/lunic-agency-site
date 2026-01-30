import React, { useRef, useEffect, useState } from 'react';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /** Load when within this distance of viewport. Default 50vh = start loading well before visible. */
  rootMargin?: string;
}

/**
 * Image that only loads its source when it enters (or nears) the viewport.
 * Uses a large rootMargin so images are ready by the time the user scrolls to them.
 */
const LazyImage: React.FC<LazyImageProps> = ({
  src,
  rootMargin = '50vh',
  alt = '',
  loading,
  decoding = 'async',
  ...props
}) => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const el = imgRef.current;
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
    <img
      ref={imgRef}
      src={shouldLoad ? src : undefined}
      alt={alt}
      loading={shouldLoad ? loading : 'lazy'}
      decoding={decoding}
      {...props}
    />
  );
};

export default LazyImage;
