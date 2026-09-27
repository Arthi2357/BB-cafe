import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import SteamParticles from './SteamParticles';

export default function CoffeeCupStation({ position = [-1.7, 1.05, 0.9], onCupClick }) {
  const groupRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (groupRef.current && hovered) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onCupClick?.(); }}
      cursor={hovered ? 'pointer' : 'auto'}
    >
      {/* Saucer */}
      <mesh position={[0, 0.015, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.025, 32]} />
        <meshStandardMaterial color="#0E1A33" roughness={0.3} metalness={0.1} />
      </mesh>
      {/* Saucer Gold Rim */}
      <mesh position={[0, 0.026, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.218, 0.005, 12, 32]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Ceramic Coffee Cup Body */}
      <mesh position={[0, 0.12, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.13, 0.09, 0.18, 32]} />
        <meshStandardMaterial color="#0E1A33" roughness={0.25} metalness={0.15} />
      </mesh>

      {/* Cup Inner Porcelain Cream */}
      <mesh position={[0, 0.13, 0]}>
        <cylinderGeometry args={[0.12, 0.082, 0.165, 32]} />
        <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
      </mesh>

      {/* Cup Handle */}
      <mesh position={[0.14, 0.12, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.055, 0.016, 12, 24]} />
        <meshStandardMaterial color="#0E1A33" roughness={0.25} metalness={0.15} />
      </mesh>

      {/* Espresso Liquid Level */}
      <mesh position={[0, 0.18, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.116, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.4} />
      </mesh>

      {/* Latte Art (Creamy heart/leaf design) */}
      <group position={[0, 0.182, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
        {/* Central Heart Shape */}
        <mesh position={[0, 0.01, 0]}>
          <circleGeometry args={[0.045, 24]} />
          <meshBasicMaterial color="#F5EBE1" />
        </mesh>
        <mesh position={[0, -0.03, 0]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.045, 0.045]} />
          <meshBasicMaterial color="#F5EBE1" />
        </mesh>
        {/* Outer Rosetta Feathers */}
        {[-0.04, 0.04].map((offset, i) => (
          <mesh key={i} position={[offset, -0.01, 0]}>
            <circleGeometry args={[0.022, 16]} />
            <meshBasicMaterial color="#F5EBE1" />
          </mesh>
        ))}
      </group>

      {/* Delicate Steam Rising from Coffee */}
      <SteamParticles position={[0, 0.22, 0]} count={36} scale={1.1} />

      {/* Petite Golden Coffee Spoon */}
      <group position={[0.14, 0.035, 0.08]} rotation={[0.1, 0.6, 0.1]}>
        {/* Spoon Handle */}
        <mesh castShadow>
          <cylinderGeometry args={[0.005, 0.007, 0.22, 8]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Spoon Scoop */}
        <mesh position={[-0.12, 0, 0]} scale={[1.2, 0.4, 0.8]}>
          <sphereGeometry args={[0.02, 16, 16]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
        </mesh>
      </group>

      {/* Glass Jar with Coffee Beans next to cup */}
      <group position={[-0.32, 0.15, -0.1]}>
        {/* Glass Jar Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.09, 0.28, 24]} />
          <meshPhysicalMaterial
            transparent={true}
            opacity={0.3}
            roughness={0.1}
            transmission={0.8}
            thickness={0.05}
            color="#FFFFFF"
          />
        </mesh>
        {/* Roasted Beans inside jar */}
        <mesh position={[0, -0.03, 0]}>
          <cylinderGeometry args={[0.082, 0.082, 0.18, 16]} />
          <meshStandardMaterial color="#2B1810" roughness={0.8} />
        </mesh>
        {/* Cork / Wooden Lid */}
        <mesh position={[0, 0.15, 0]} castShadow>
          <cylinderGeometry args={[0.095, 0.088, 0.04, 24]} />
          <meshStandardMaterial color="#8D6E63" roughness={0.6} />
        </mesh>
      </group>

      {/* Warm gentle aura light */}
      <pointLight position={[0, 0.35, 0]} color="#FFD166" intensity={0.8} distance={0.8} decay={2} />
    </group>
  );
}
