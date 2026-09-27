import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function SteamParticles({ count = 35, position = [0, 0, 0], scale = 1 }) {
  const pointsRef = useRef();

  // Generate particle initial properties
  const { positions, velocities, _opacities, lifetimes } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const vel = new Float32Array(count * 3);
    const opac = new Float32Array(count);
    const life = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Small spawn circle radius
      const r = Math.random() * 0.08 * scale;
      const theta = Math.random() * Math.PI * 2;
      pos[i * 3] = Math.cos(theta) * r;
      pos[i * 3 + 1] = Math.random() * 0.1 * scale;
      pos[i * 3 + 2] = Math.sin(theta) * r;

      // Drift upward with slight wobble
      vel[i * 3] = (Math.random() - 0.5) * 0.04;
      vel[i * 3 + 1] = 0.15 + Math.random() * 0.15;
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.04;

      opac[i] = Math.random();
      life[i] = Math.random(); // Phase in life cycle
    }

    return { positions: pos, velocities: vel, opacities: opac, lifetimes: life };
  }, [count, scale]);

  // Create soft puff texture procedurally on canvas
  const steamTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
    grad.addColorStop(0, 'rgba(255, 248, 238, 0.8)');
    grad.addColorStop(0.4, 'rgba(235, 225, 210, 0.4)');
    grad.addColorStop(0.8, 'rgba(210, 200, 185, 0.1)');
    grad.addColorStop(1, 'rgba(200, 190, 180, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    const geo = pointsRef.current.geometry;
    const posAttr = geo.attributes.position;
    const posArray = posAttr.array;

    for (let i = 0; i < count; i++) {
      const idx = i * 3;
      // Increment age
      lifetimes[i] += delta * 0.7;

      if (lifetimes[i] > 1) {
        // Reset particle to cup surface
        lifetimes[i] = 0;
        const r = Math.random() * 0.06 * scale;
        const theta = Math.random() * Math.PI * 2;
        posArray[idx] = Math.cos(theta) * r;
        posArray[idx + 1] = 0;
        posArray[idx + 2] = Math.sin(theta) * r;
      } else {
        // Rise and drift
        posArray[idx] += (velocities[idx] + Math.sin(lifetimes[i] * 6 + i) * 0.03) * delta;
        posArray[idx + 1] += velocities[idx + 1] * delta;
        posArray[idx + 2] += (velocities[idx + 2] + Math.cos(lifetimes[i] * 5 + i) * 0.03) * delta;
      }
    }

    posAttr.needsUpdate = true;
  });

  return (
    <group position={position}>
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
          size={0.16 * scale}
          map={steamTexture}
          transparent={true}
          opacity={0.35}
          depthWrite={false}
          blending={THREE.NormalBlending}
        />
      </points>
    </group>
  );
}
