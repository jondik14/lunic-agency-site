import React, { useState, useEffect } from 'react';
import MetallicPaint, { parseLogoImage } from './MetallicPaint';

const LOGO_PATH = '/Assets/black-small-logo.svg';

const HeroMetallicLogo: React.FC = () => {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(LOGO_PATH);
        if (!res.ok) return;
        const blob = await res.blob();
        const file = new File([blob], 'logo.svg', { type: blob.type || 'image/svg+xml' });
        const parsed = await parseLogoImage(file);
        setImageData(parsed.imageData);
      } catch (e) {
        console.error('HeroMetallicLogo: failed to load or parse logo', e);
      }
    }
    load();
  }, []);

  return (
    <div className="w-full h-full min-w-0 min-h-0">
      {imageData ? (
        <MetallicPaint
          imageData={imageData}
          params={{
            edge: 2,
            patternBlur: 0.005,
            patternScale: 2,
            refraction: 0.015,
            speed: 0.3,
            liquid: 0.07,
          }}
        />
      ) : (
        <img
          src={LOGO_PATH}
          alt=""
          aria-hidden
          className="w-full h-full object-contain opacity-70"
        />
      )}
    </div>
  );
};

export default HeroMetallicLogo;
