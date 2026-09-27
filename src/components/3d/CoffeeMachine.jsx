import { useRef } from 'react';


export default function CoffeeMachine({ position = [-2.2, 1.1, 0.5], rotation = [0, 0.4, 0] }) {
  const machineRef = useRef();

  return (
    <group ref={machineRef} position={position} rotation={rotation} scale={0.85}>
      {/* Main Machine Chassis */}
      <mesh position={[0, 0.35, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.9, 0.6, 0.65]} />
        <meshStandardMaterial
          color="#16223B"
          metalness={0.7}
          roughness={0.25}
        />
      </mesh>

      {/* Front Face Plate - Brushed Steel */}
      <mesh position={[0, 0.35, 0.33]} castShadow>
        <boxGeometry args={[0.84, 0.54, 0.02]} />
        <meshStandardMaterial
          color="#D8DEE9"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Top Cup Warmer Tray */}
      <mesh position={[0, 0.66, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.88, 0.02, 0.62]} />
        <meshStandardMaterial color="#B0BEC5" metalness={0.85} roughness={0.2} />
      </mesh>

      {/* Brass Guard Rail on Top */}
      <mesh position={[0, 0.71, 0.29]}>
        <cylinderGeometry args={[0.008, 0.008, 0.84, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0, 0.71, -0.29]}>
        <cylinderGeometry args={[0.008, 0.008, 0.84, 8]} rotation={[0, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Espresso Cups warming on top */}
      {[-0.28, -0.1, 0.08, 0.26].map((x, i) => (
        <group key={i} position={[x, 0.72, i % 2 === 0 ? 0.1 : -0.1]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.03, 0.07, 16]} />
            <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
          </mesh>
          <mesh position={[0.045, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
            <torusGeometry args={[0.022, 0.006, 8, 16]} />
            <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
          </mesh>
        </group>
      ))}

      {/* Lower Drip Tray */}
      <mesh position={[0, 0.06, 0.42]} castShadow receiveShadow>
        <boxGeometry args={[0.86, 0.12, 0.32]} />
        <meshStandardMaterial color="#90A4AE" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Drip Tray Slotted Grill */}
      <mesh position={[0, 0.125, 0.42]}>
        <boxGeometry args={[0.82, 0.01, 0.28]} />
        <meshStandardMaterial color="#37474F" metalness={0.8} roughness={0.4} />
      </mesh>

      {/* Group Heads (2 groups) */}
      {[-0.2, 0.2].map((x, i) => (
        <group key={i} position={[x, 0.38, 0.36]}>
          {/* Chrome Head */}
          <mesh castShadow>
            <cylinderGeometry args={[0.07, 0.07, 0.08, 20]} />
            <meshStandardMaterial color="#E0E6ED" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Portafilter Basket */}
          <mesh position={[0, -0.05, 0.02]} castShadow>
            <cylinderGeometry args={[0.065, 0.05, 0.06, 20]} />
            <meshStandardMaterial color="#B0BEC5" metalness={0.95} roughness={0.1} />
          </mesh>

          {/* Spout */}
          <mesh position={[0, -0.09, 0.02]}>
            <cylinderGeometry args={[0.015, 0.01, 0.04, 12]} />
            <meshStandardMaterial color="#E0E6ED" metalness={0.95} />
          </mesh>

          {/* Portafilter Handle (Walnut wood) */}
          <mesh position={[0, -0.05, 0.18]} rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.022, 0.02, 0.22, 16]} />
            <meshStandardMaterial color="#4A2810" roughness={0.4} />
          </mesh>
          {/* Brass Cap on Handle */}
          <mesh position={[0, -0.05, 0.29]} rotation={[Math.PI / 2, 0, 0]}>
            <sphereGeometry args={[0.022, 12, 12]} />
            <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      ))}

      {/* Steam Wands Left & Right */}
      <group position={[-0.38, 0.36, 0.36]} rotation={[0.2, -0.3, -0.2]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.01, 0.3, 12]} />
          <meshStandardMaterial color="#E0E6ED" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.16, 0]}>
          <coneGeometry args={[0.018, 0.04, 12]} />
          <meshStandardMaterial color="#B0BEC5" metalness={0.9} />
        </mesh>
      </group>
      <group position={[0.38, 0.36, 0.36]} rotation={[0.2, 0.3, 0.2]}>
        <mesh>
          <cylinderGeometry args={[0.012, 0.01, 0.3, 12]} />
          <meshStandardMaterial color="#E0E6ED" metalness={0.95} roughness={0.1} />
        </mesh>
        <mesh position={[0, -0.16, 0]}>
          <coneGeometry args={[0.018, 0.04, 12]} />
          <meshStandardMaterial color="#B0BEC5" metalness={0.9} />
        </mesh>
      </group>

      {/* Dual Pressure Gauges */}
      {[-0.08, 0.08].map((x, i) => (
        <group key={i} position={[x, 0.54, 0.345]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.045, 0.045, 0.015, 24]} />
            <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.008, 0]}>
            <cylinderGeometry args={[0.038, 0.038, 0.005, 24]} />
            <meshStandardMaterial color="#FFFFFF" roughness={0.3} />
          </mesh>
          {/* Dial Needle */}
          <mesh position={[0.008, 0.011, 0]} rotation={[0, 0, -0.4 + i * 0.8]}>
            <boxGeometry args={[0.028, 0.003, 0.002]} />
            <meshStandardMaterial color="#E74C3C" />
          </mesh>
        </group>
      ))}

      {/* Brand Plate on Machine */}
      <mesh position={[0, 0.2, 0.345]}>
        <boxGeometry args={[0.32, 0.06, 0.005]} />
        <meshStandardMaterial color="#0B1325" metalness={0.4} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.2, 0.348]}>
        <boxGeometry args={[0.28, 0.035, 0.002]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.2} emissive="#C5A059" emissiveIntensity={0.2} />
      </mesh>

      {/* Soft warm barista spot light under group heads */}
      <pointLight position={[0, 0.25, 0.45]} color="#FFD166" intensity={1.2} distance={1.2} decay={2} />
    </group>
  );
}
