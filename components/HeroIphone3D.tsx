import React, { useRef, useEffect, useState, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { Environment, ContactShadows } from '@react-three/drei';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as THREE from 'three';
import type { Group, Material } from 'three';

/* GLB at public/Assets/iPhone 17 Pro.glb. Video at public/Assets/demo.mp4 */
const GLB_URL = '/Assets/iphone-17-pro.glb';
const VIDEO_URL = '/Assets/demo.mp4';

/* Video plane: slightly above screen to avoid z-fight. Size tuned to phone bezel (aspect ~9:19.5). */
const SCREEN_PLANE_W = 0.052;
const SCREEN_PLANE_H = 0.112;
const SCREEN_PLANE_Z = 0.02;

/** VideoTexture on a plane; placed slightly in front of the phone screen to avoid z-fight. */
function PhoneVideoScreen({
  position = [0, 0, SCREEN_PLANE_Z],
  rotation = [0, 0, 0],
  scale = [1, 1, 1],
}: {
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: [number, number, number];
}) {
  const video = useMemo(() => {
    const v = document.createElement('video');
    v.src = VIDEO_URL;
    v.crossOrigin = 'anonymous';
    v.loop = true;
    v.muted = true;
    v.playsInline = true;
    v.setAttribute('playsinline', '');
    v.preload = 'auto';
    v.playbackRate = 1;
    return v;
  }, []);

  const texture = useMemo(() => {
    const t = new THREE.VideoTexture(video);
    t.colorSpace = THREE.SRGBColorSpace;
    t.minFilter = THREE.LinearFilter;
    t.magFilter = THREE.LinearFilter;
    t.generateMipmaps = false;
    return t;
  }, [video]);

  const textureRef = useRef(texture);
  textureRef.current = texture;

  useEffect(() => {
    const tryPlay = async () => {
      try {
        await video.play();
      } catch {
        /* autoplay may be blocked until user interacts */
      }
    };
    tryPlay();

    const onPointerDown = () => {
      video.play().catch(() => {});
      window.removeEventListener('pointerdown', onPointerDown);
    };
    window.addEventListener('pointerdown', onPointerDown);

    return () => {
      window.removeEventListener('pointerdown', onPointerDown);
      video.pause();
      video.src = '';
      texture.dispose();
    };
  }, [video]);

  useFrame(() => {
    if (textureRef.current) textureRef.current.needsUpdate = true;
  });

  return (
    <mesh position={position} rotation={rotation} scale={scale} renderOrder={10}>
      <planeGeometry args={[SCREEN_PLANE_W, SCREEN_PLANE_H]} />
      <meshBasicMaterial map={texture} toneMapped={false} side={THREE.DoubleSide} depthTest depthWrite />
    </mesh>
  );
}

/* Camera distance; used for fit calculation. Must match Canvas camera position[2]. */
const CAM_Z = 8;
const CAM_FOV_DEG = 40;

/* Fit factor: higher = bigger phone. 0.82 → 0.88 for larger presence. */
const FIT_FACTOR = 0.88;

const desktopPreset = {
  fromRot: { x: 0.10, y: -0.95, z: -0.06 },
  toRot:   { x: 0.62, y: -0.28, z: 0.12 },
  fromPos: { x: 0.28, y: -0.18, z: 0 },
  toPos:   { x: 0.06, y: 0.02,  z: 0 },
};

const mobilePreset = {
  fromRot: { x: 0.12, y: -0.55, z: -0.04 },
  toRot:   { x: 0.58, y: -0.18, z: 0.11 },
  fromPos: { x: 0.14, y: -0.10, z: 0 },
  toPos:   { x: 0.02, y: 0.00,  z: 0 },
};

/* Intro: swivels in; ends tilted upwards. Scale animates baseScale*0.9 → baseScale*1.0. Video on screen via PhoneVideoScreen. */
function IphoneModel() {
  const group = useRef<Group>(null);
  const glb = useLoader(GLTFLoader, GLB_URL);
  const { viewport } = useThree();
  const [reduced, setReduced] = useState(false);
  const progress = useRef(0);
  const baseScaleRef = useRef<number | null>(null);
  const scene = useMemo(() => glb.scene.clone(), [glb]);
  const box = useMemo(() => new THREE.Box3(), []);
  const size = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const on = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  useFrame((_state, delta) => {
    if (!group.current) return;

    if (baseScaleRef.current === null) {
      box.setFromObject(group.current);
      box.getSize(size);
      const maxDim = Math.max(size.x, size.y, size.z);
      if (maxDim <= 0) {
        baseScaleRef.current = 35;
      } else {
        const fovRad = (CAM_FOV_DEG / 2) * (Math.PI / 180);
        const visibleHeight = 2 * CAM_Z * Math.tan(fovRad);
        baseScaleRef.current = (visibleHeight * FIT_FACTOR) / maxDim;
      }
    }

    if (progress.current < 1) {
      if (reduced) progress.current = 1;
      else progress.current = Math.min(1, progress.current + delta * 0.6);
    }

    const t = progress.current;
    const eased = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const isMobile = viewport.width < 10;
    const preset = isMobile ? mobilePreset : desktopPreset;
    const { fromRot, toRot, fromPos, toPos } = preset;
    const base = baseScaleRef.current ?? 35;

    group.current.rotation.x = THREE.MathUtils.lerp(fromRot.x, toRot.x, eased);
    group.current.rotation.y = THREE.MathUtils.lerp(fromRot.y, toRot.y, eased);
    group.current.rotation.z = THREE.MathUtils.lerp(fromRot.z, toRot.z, eased);

    group.current.position.x = THREE.MathUtils.lerp(fromPos.x, toPos.x, eased);
    group.current.position.y = THREE.MathUtils.lerp(fromPos.y, toPos.y, eased);
    group.current.position.z = THREE.MathUtils.lerp(fromPos.z, toPos.z, eased);

    const fromScale = base * 0.9;
    const toScale = base * 1.0;
    group.current.scale.setScalar(THREE.MathUtils.lerp(fromScale, toScale, eased));

    const opacityVal = Math.min(1, eased * 2);
    /* Only fade the GLB materials; leave the video screen at full opacity. */
    scene.traverse((o) => {
      const m = (o as { material?: Material | Material[] }).material;
      if (m) {
        const mats = Array.isArray(m) ? m : [m];
        mats.forEach((mat) => {
          mat.transparent = true;
          mat.opacity = opacityVal;
        });
      }
    });
  });

  return (
    <group ref={group} position={[0, 0, 0]} scale={1.0}>
      <primitive object={scene} />
      {/* Video on screen: plane slightly in front to avoid z-fight; moves with phone. */}
      <PhoneVideoScreen />
    </group>
  );
}

function FallbackPhones() {
  return null;
}

const HeroIphone3D: React.FC = () => {
  return (
    <div
      className="w-full h-[380px] md:h-[600px] lg:h-[720px] max-w-[760px] overflow-visible pointer-events-none"
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0.2, CAM_Z], fov: CAM_FOV_DEG }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        className="!w-full !h-full"
      >
        <ambientLight intensity={1.5} />
        <directionalLight position={[5, 5, 5]} intensity={2.5} />
        <directionalLight position={[-5, 2, 2]} intensity={1.0} />
        <Suspense fallback={<FallbackPhones />}>
          <Environment preset="city" />
          <IphoneModel />
          <ContactShadows
            position={[0, -2.4, 0]}
            opacity={0.3}
            scale={15}
            blur={2.8}
            far={5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroIphone3D;
