import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'motion/react';

const PHONE_IMAGE_URL = '/Assets/iphone-16-pro-max-black-titanium-portrait-1.png';
const VIDEO_URL = '/Assets/demo.mp4';

const HeroIphoneStatic: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const tryPlay = async () => {
      try {
        await video.play();
        setIsPlaying(true);
      } catch {
        // Autoplay may be blocked until user interacts
      }
    };
    tryPlay();

    const onPointerDown = () => {
      video.play().catch(() => {});
      setIsPlaying(true);
      window.removeEventListener('pointerdown', onPointerDown);
    };
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      video.pause();
    };
  }, []);

  return (
    <div
      className="w-full overflow-hidden pointer-events-none flex items-start justify-center md:items-center"
      style={{ 
        height: 'clamp(280px, 50vw, 720px)',
        maxWidth: 'clamp(280px, 90vw, 760px)',
        minHeight: '280px'
      }}
      aria-hidden
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        className="relative w-full h-full flex items-start md:items-center justify-center hero-phone-container"
      >
        {/* Static iPhone Image - clipped to top half on mobile */}
        <img
          src={PHONE_IMAGE_URL}
          alt=""
          className="w-full h-full object-contain hero-phone-image"
          draggable={false}
        />
        
        {/* Video Overlay - positioned inside the phone screen */}
        <div
          className="absolute"
          style={{
            // These values position the video inside the iPhone screen
            // Adjust these percentages based on the actual phone image dimensions
            top: '8%',
            left: '12%',
            width: '76%',
            height: '84%',
            borderRadius: '3.5%', // Rounded corners to match iPhone screen
            overflow: 'hidden',
            pointerEvents: 'none',
          }}
        >
          <div className="relative w-full h-full hero-video-container">
            <video
              ref={videoRef}
              src={VIDEO_URL}
              loop
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover hero-phone-video"
              style={{
                opacity: isPlaying ? 1 : 0,
                transition: 'opacity 0.3s ease-in-out',
              }}
            />
            {/* Fade overlay - gradient from transparent to opaque towards bottom */}
            <div
              className="absolute inset-0 pointer-events-none hero-video-fade"
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HeroIphoneStatic;
