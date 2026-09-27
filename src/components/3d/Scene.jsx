import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import CameraController from './CameraController';
import CafeEnvironment from './CafeEnvironment';

export default function Scene({
  scrollProgress = 0,
  activeFoodType = 'coffee',
  onPhotoClick,
  onOpenMenu,
  onCupClick,
  prefersReducedMotion = false,
  isMobile = false
}) {
  return (
    <div className="fixed inset-0 pointer-events-auto z-0 overflow-hidden">
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.5] : [1, 2]}
        camera={{ position: [0, 2.2, 13.8], fov: isMobile ? 55 : 45, near: 0.1, far: 50 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false
        }}
        onCreated={({ gl }) => {
          gl.setClearColor('#0B1325', 1);
        }}
      >
        <Suspense fallback={null}>
          <CameraController
            scrollProgress={scrollProgress}
            prefersReducedMotion={prefersReducedMotion}
            isMobile={isMobile}
          />

          <CafeEnvironment
            activeFoodType={activeFoodType}
            onPhotoClick={onPhotoClick}
            onOpenMenu={onOpenMenu}
            onCupClick={onCupClick}
          />
        </Suspense>
      </Canvas>
    </div>
  );
}
