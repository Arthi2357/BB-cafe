import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function DustParticles({ count = 80 }) {
  const pointsRef = useRef();

  const [positions, phases, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const ph = new Float32Array(count);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Scatter throughout the cafe volume (x: -4 to 4, y: 0.5 to 3.5, z: -4 to 12)
      pos[i * 3] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 1] = 0.5 + Math.random() * 3.0;
      pos[i * 3 + 2] = -4 + Math.random() * 16;

      ph[i] = Math.random() * Math.PI * 2;
      sp[i] = 0.2 + Math.random() * 0.4;
    }

    return [pos, ph, sp];
  }, [count]);

  const dustTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 14);
    grad.addColorStop(0, 'rgba(255, 230, 180, 0.9)');
    grad.addColorStop(0.5, 'rgba(220, 180, 120, 0.4)');
    grad.addColorStop(1, 'rgba(200, 160, 100, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 32, 32);

    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position;
    const arr = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Gentle floating sine wave motion
      arr[idx] += Math.sin(t * speeds[i] + phases[i]) * 0.002;
      arr[idx + 1] += Math.cos(t * speeds[i] * 0.8 + phases[i]) * 0.0015;
      arr[idx + 2] += Math.sin(t * speeds[i] * 0.5 + phases[i]) * 0.001;
    }

    posAttr.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.07}
        map={dustTexture}
        transparent={true}
        opacity={0.5}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
