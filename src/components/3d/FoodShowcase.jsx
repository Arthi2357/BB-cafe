import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import SteamParticles from './SteamParticles';

// 1. Stylized Artisanal Coffee Cup with Latte Art & Steam
function ModelCoffee() {
  return (
    <group position={[0, 0, 0]}>
      {/* Saucer */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.34, 0.26, 0.035, 32]} />
        <meshStandardMaterial color="#0B1325" roughness={0.3} metalness={0.2} />
      </mesh>
      {/* Gold Rim on Saucer */}
      <mesh position={[0, 0.038, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.338, 0.006, 12, 32]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Cup Body */}
      <mesh position={[0, 0.18, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.2, 0.14, 0.28, 32]} />
        <meshStandardMaterial color="#0E1A33" roughness={0.25} metalness={0.15} />
      </mesh>
      {/* Porcelain Cream Inside */}
      <mesh position={[0, 0.19, 0]}>
        <cylinderGeometry args={[0.185, 0.13, 0.26, 32]} />
        <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
      </mesh>
      {/* Handle */}
      <mesh position={[0.22, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.08, 0.022, 12, 24]} />
        <meshStandardMaterial color="#0E1A33" roughness={0.25} />
      </mesh>
      {/* Coffee Surface */}
      <mesh position={[0, 0.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.18, 32]} />
        <meshStandardMaterial color="#3E2723" roughness={0.4} />
      </mesh>
      {/* Latte Art Heart */}
      <group position={[0, 0.283, 0]} rotation={[-Math.PI / 2, 0, 0.2]}>
        <mesh position={[0, 0.02, 0]}>
          <circleGeometry args={[0.07, 24]} />
          <meshBasicMaterial color="#F4E8DB" />
        </mesh>
        <mesh position={[0, -0.045, 0]} rotation={[0, 0, Math.PI / 4]}>
          <planeGeometry args={[0.07, 0.07]} />
          <meshBasicMaterial color="#F4E8DB" />
        </mesh>
      </group>
      {/* Steam */}
      <SteamParticles position={[0, 0.32, 0]} count={40} scale={1.3} />
    </group>
  );
}

// 2. Stylized Gourmet Pizza on Wooden Board
function ModelPizza() {
  return (
    <group position={[0, 0, 0]}>
      {/* Wooden Peel / Board */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.48, 0.48, 0.03, 36]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.6} />
      </mesh>
      {/* Wooden Handle */}
      <mesh position={[0, 0.02, 0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.035, 0.3, 16]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.6} />
      </mesh>

      {/* Pizza Dough Crust */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.035, 36]} />
        <meshStandardMaterial color="#D4A373" roughness={0.7} />
      </mesh>
      {/* Raised Crust Outer Rim */}
      <mesh position={[0, 0.065, 0]}>
        <torusGeometry args={[0.4, 0.032, 12, 36]} />
        <meshStandardMaterial color="#BC6C25" roughness={0.6} />
      </mesh>
      {/* Tomato Sauce & Melted Golden Cheese */}
      <mesh position={[0, 0.07, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.37, 36]} />
        <meshStandardMaterial color="#F4A261" roughness={0.4} />
      </mesh>

      {/* Toppings: Pepperoni / Paneer slices */}
      {[
        [0.15, 0.076, 0.12],
        [-0.14, 0.076, 0.16],
        [0.02, 0.076, -0.18],
        [-0.18, 0.076, -0.1],
        [0.18, 0.076, -0.08],
        [0, 0.076, 0.02],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, i * 0.7]}>
          <circleGeometry args={[0.055, 16]} />
          <meshStandardMaterial color="#C0392B" roughness={0.5} />
        </mesh>
      ))}

      {/* Fresh Basil / Jalapeño Leaves */}
      {[
        [0.08, 0.08, 0.2],
        [-0.08, 0.08, -0.06],
        [0.22, 0.08, 0.04],
        [-0.12, 0.08, 0.04],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, i * 1.2]}>
          <planeGeometry args={[0.045, 0.03]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.4} side={2} />
        </mesh>
      ))}
    </group>
  );
}

// 3. Stylized Tall Milkshake with Whipped Cream & Straw
function ModelShake() {
  return (
    <group position={[0, 0, 0]}>
      {/* Glass Base & Stem */}
      <mesh position={[0, 0.02, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.18, 0.03, 24]} />
        <meshPhysicalMaterial transparent opacity={0.3} transmission={0.9} roughness={0.1} color="#FFF" />
      </mesh>
      <mesh position={[0, 0.08, 0]}>
        <cylinderGeometry args={[0.035, 0.035, 0.1, 16]} />
        <meshPhysicalMaterial transparent opacity={0.3} transmission={0.9} roughness={0.1} color="#FFF" />
      </mesh>
      {/* Tall Faceted Glass Body */}
      <mesh position={[0, 0.32, 0]} castShadow>
        <cylinderGeometry args={[0.16, 0.1, 0.4, 20]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.35}
          transmission={0.85}
          roughness={0.08}
          thickness={0.04}
          color="#FFFFFF"
        />
      </mesh>
      {/* Milkshake Creamy Fluid (Caramel / Chocolate) */}
      <mesh position={[0, 0.31, 0]}>
        <cylinderGeometry args={[0.15, 0.092, 0.38, 20]} />
        <meshStandardMaterial color="#BA4A00" roughness={0.35} />
      </mesh>
      {/* Whipped Cream Swirl on Top */}
      <group position={[0, 0.52, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.14, 20, 16, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
          <meshStandardMaterial color="#FFF8EE" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0.08, 0]} castShadow>
          <sphereGeometry args={[0.09, 16, 12]} />
          <meshStandardMaterial color="#FFF8EE" roughness={0.5} />
        </mesh>
        {/* Cherry / Caramel drizzle crown */}
        <mesh position={[0, 0.16, 0]} castShadow>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial color="#C0392B" roughness={0.2} />
        </mesh>
      </group>
      {/* Striped Straw */}
      <group position={[0.06, 0.45, 0]} rotation={[0.15, 0, -0.2]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.012, 0.012, 0.55, 12]} />
          <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

// 4. Stylized Crispy French Fries in Kraft Cup
function ModelFries() {
  return (
    <group position={[0, 0, 0]}>
      {/* Kraft Paper Serving Cup */}
      <mesh position={[0, 0.16, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.18, 0.12, 0.32, 24, 1, true]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.8} side={2} />
      </mesh>
      <mesh position={[0, 0.01, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 24]} />
        <meshStandardMaterial color="#D7CCC8" roughness={0.8} />
      </mesh>
      {/* Logo band on Cup */}
      <mesh position={[0, 0.16, 0]}>
        <cylinderGeometry args={[0.152, 0.138, 0.1, 24, 1, true]} />
        <meshStandardMaterial color="#0B1325" roughness={0.6} side={2} />
      </mesh>

      {/* Cluster of Golden French Fries Batons */}
      {[
        [-0.05, 0.3, -0.04, 0.15, 0.2, -0.1],
        [0.05, 0.32, 0.02, -0.1, 0.4, 0.15],
        [0.01, 0.35, -0.02, 0.05, -0.2, 0.05],
        [-0.08, 0.28, 0.05, 0.2, -0.3, -0.2],
        [0.08, 0.29, -0.06, -0.2, 0.1, 0.25],
        [0.02, 0.36, 0.06, 0.1, 0.5, 0.1],
        [-0.03, 0.34, 0.04, -0.15, -0.1, -0.15],
        [0.07, 0.31, 0.04, 0.25, 0.2, 0.2],
      ].map(([x, y, z, rx, ry, rz], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[rx, ry, rz]} castShadow>
          <boxGeometry args={[0.024, 0.32, 0.024]} />
          <meshStandardMaterial color={i % 2 === 0 ? "#F1C40F" : "#F39C12"} roughness={0.6} />
        </mesh>
      ))}

      {/* Dip bowl next to cup */}
      <group position={[0.26, 0.04, 0.1]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.08, 0.06, 0.08, 16]} />
          <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.035, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.075, 16]} />
          <meshStandardMaterial color="#C0392B" roughness={0.4} />
        </mesh>
      </group>
    </group>
  );
}

export default function FoodShowcase({
  activeType = 'coffee',
  position = [0, 1.05, -1.0],
  scale = 1.3
}) {
  const groupRef = useRef();

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.45;
    }
  });

  return (
    <group position={position}>
      {/* Illuminated Marble Display Plinth */}
      <mesh position={[0, -0.06, 0]} receiveShadow castShadow>
        <cylinderGeometry args={[0.62, 0.68, 0.12, 36]} />
        <meshStandardMaterial color="#1E293B" roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Glowing Gold Ring around Plinth */}
      <mesh position={[0, -0.005, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.622, 0.012, 12, 36]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} emissive="#C5A059" emissiveIntensity={0.6} />
      </mesh>

      {/* Warm Plinth Spot Light */}
      <spotLight
        position={[0, 1.8, 0.5]}
        target-position={[0, 0.2, 0]}
        color="#FFD166"
        intensity={2.8}
        angle={0.6}
        penumbra={0.5}
        castShadow
      />

      {/* Gently Rotating Model */}
      <group ref={groupRef} scale={scale}>
        {activeType === 'coffee' && <ModelCoffee />}
        {activeType === 'pizza' && <ModelPizza />}
        {activeType === 'shake' && <ModelShake />}
        {activeType === 'fries' && <ModelFries />}
      </group>
    </group>
  );
}
