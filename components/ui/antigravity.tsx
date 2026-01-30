import React from 'react';

interface AntigravityProps {
  count?: number;
  magnetRadius?: number;
  ringRadius?: number;
  waveSpeed?: number;
  waveAmplitude?: number;
  particleSize?: number;
  lerpSpeed?: number;
  color?: string;
  autoAnimate?: boolean;
  particleVariance?: number;
  rotationSpeed?: number;
  depthFactor?: number;
  pulseSpeed?: number;
  particleShape?: 'sphere' | 'circle';
  fieldStrength?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Antigravity({
  count = 80,
  magnetRadius = 29,
  ringRadius = 8,
  waveSpeed = 0.4,
  waveAmplitude = 0.4,
  particleSize = 2.5,
  lerpSpeed = 0.04,
  color = '#4599fe',
  autoAnimate = true,
  particleVariance = 2.9,
  rotationSpeed = 0,
  depthFactor = 0,
  pulseSpeed = 1,
  particleShape = 'sphere',
  fieldStrength = 1,
  className = '',
  style = {},
}: AntigravityProps) {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const animationFrameRef = React.useRef<number>();
  const particlesRef = React.useRef<Array<{
    x: number;
    y: number;
    z: number;
    vx: number;
    vy: number;
    vz: number;
    targetX: number;
    targetY: number;
    targetZ: number;
    phase: number;
  }>>([]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Get canvas dimensions after resize
    const width = canvas.width / window.devicePixelRatio;
    const height = canvas.height / window.devicePixelRatio;

    // Initialize particles only if canvas has valid dimensions
    if (width > 0 && height > 0) {
      const particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: (Math.random() - 0.5) * depthFactor * 100,
        vx: 0,
        vy: 0,
        vz: 0,
        targetX: Math.random() * width,
        targetY: Math.random() * height,
        targetZ: 0,
        phase: Math.random() * Math.PI * 2,
      }));
      particlesRef.current = particles;
    } else {
      particlesRef.current = [];
    }

    let mouseX = width / 2;
    let mouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    let time = 0;
    const animate = () => {
      if (!ctx) return;
      
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Skip if invalid dimensions
      if (width <= 0 || height <= 0) {
        if (autoAnimate) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
        return;
      }

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = color;
      ctx.strokeStyle = color;

      time += 0.016; // ~60fps

      const particles = particlesRef.current;
      if (!particles || particles.length === 0) {
        if (autoAnimate) {
          animationFrameRef.current = requestAnimationFrame(animate);
        }
        return;
      }

      particles.forEach((particle, i) => {
        // Calculate distance to mouse
        const dx = mouseX - particle.x;
        const dy = mouseY - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // Magnetic attraction
        if (dist < magnetRadius) {
          const force = (1 - dist / magnetRadius) * fieldStrength;
          particle.targetX = mouseX;
          particle.targetY = mouseY;
        } else {
          // Wave motion
          const waveX = Math.sin(time * waveSpeed + particle.phase) * waveAmplitude * 50;
          const waveY = Math.cos(time * waveSpeed + particle.phase) * waveAmplitude * 50;
          particle.targetX = particle.x + waveX;
          particle.targetY = particle.y + waveY;
        }

        // Lerp to target
        particle.x += (particle.targetX - particle.x) * lerpSpeed;
        particle.y += (particle.targetY - particle.y) * lerpSpeed;

        // Boundary wrapping
        if (particle.x < 0) particle.x = width;
        if (particle.x > width) particle.x = 0;
        if (particle.y < 0) particle.y = height;
        if (particle.y > height) particle.y = 0;

        // Draw particle - ensure size is always positive
        const size = Math.max(0.1, particleSize + Math.sin(time * pulseSpeed + particle.phase) * particleVariance);
        ctx.beginPath();
        if (particleShape === 'sphere') {
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        } else {
          ctx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
        }
        ctx.fill();

        // Draw connections
        const otherParticles = particles.slice(i + 1);
        otherParticles.forEach(other => {
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < ringRadius) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = color;
            ctx.globalAlpha = 1 - dist / ringRadius;
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        });
      });

      if (autoAnimate) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    if (autoAnimate) {
      animate();
    }

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [
    count,
    magnetRadius,
    ringRadius,
    waveSpeed,
    waveAmplitude,
    particleSize,
    lerpSpeed,
    color,
    autoAnimate,
    particleVariance,
    pulseSpeed,
    particleShape,
    fieldStrength,
    depthFactor,
  ]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        ...style,
      }}
    />
  );
}
