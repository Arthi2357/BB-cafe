// Single Mid-Century Armchair

function Armchair({ position = [0, 0, 0], rotation = [0, 0, 0], color = "#1E3462" }) {
  return (
    <group position={position} rotation={rotation} scale={0.9}>
      {/* Seat Cushion */}
      <mesh position={[0, 0.44, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.62, 0.12, 0.58]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Backrest Curved */}
      <mesh position={[0, 0.72, -0.24]} rotation={[0.1, 0, 0]} castShadow>
        <boxGeometry args={[0.6, 0.48, 0.1]} />
        <meshStandardMaterial color={color} roughness={0.7} />
      </mesh>
      {/* Left Armrest */}
      <mesh position={[-0.31, 0.58, -0.05]} castShadow>
        <boxGeometry args={[0.08, 0.24, 0.48]} />
        <meshStandardMaterial color="#4A2F20" roughness={0.5} />
      </mesh>
      {/* Right Armrest */}
      <mesh position={[0.31, 0.58, -0.05]} castShadow>
        <boxGeometry args={[0.08, 0.24, 0.48]} />
        <meshStandardMaterial color="#4A2F20" roughness={0.5} />
      </mesh>
      {/* Wooden Splayed Legs */}
      {[
        [-0.24, 0.2, 0.22, 0.1, -0.1],
        [0.24, 0.2, 0.22, 0.1, 0.1],
        [-0.24, 0.2, -0.22, -0.1, -0.1],
        [0.24, 0.2, -0.22, -0.1, 0.1],
      ].map(([x, y, z, rx, rz], idx) => (
        <mesh key={idx} position={[x, y, z]} rotation={[rx, 0, rz]} castShadow>
          <cylinderGeometry args={[0.02, 0.014, 0.42, 12]} />
          <meshStandardMaterial color="#3E2723" roughness={0.5} />
        </mesh>
      ))}
      {/* Brass Leg Ferrules (Caps) */}
      {[
        [-0.26, 0.03, 0.24],
        [0.26, 0.03, 0.24],
        [-0.26, 0.03, -0.24],
        [0.26, 0.03, -0.24],
      ].map(([x, y, z], idx) => (
        <mesh key={idx} position={[x, y, z]}>
          <cylinderGeometry args={[0.016, 0.014, 0.05, 12]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
        </mesh>
      ))}
    </group>
  );
}

// Single Round Cafe Table with Cast Iron Base
function CafeTable({ position = [0, 0, 0] }) {
  return (
    <group position={position}>
      {/* Fluted Cast Iron Heavy Base */}
      <mesh position={[0, 0.02, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.32, 0.36, 0.04, 32]} />
        <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.5} />
      </mesh>
      {/* Center Fluted Column */}
      <mesh position={[0, 0.38, 0]} castShadow>
        <cylinderGeometry args={[0.04, 0.05, 0.72, 20]} />
        <meshStandardMaterial color="#1E293B" metalness={0.7} roughness={0.5} />
      </mesh>
      {/* Brass Accent Ring on Stem */}
      <mesh position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.065, 0.065, 0.03, 20]} />
        <meshStandardMaterial color="#C5A059" metalness={0.85} roughness={0.25} />
      </mesh>
      {/* Warm Oak Beveled Table Top */}
      <mesh position={[0, 0.75, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.55, 0.55, 0.035, 40]} />
        <meshStandardMaterial color="#8D6E63" roughness={0.4} />
      </mesh>
      {/* Brass Edge Band */}
      <mesh position={[0, 0.75, 0]}>
        <torusGeometry args={[0.55, 0.008, 12, 40]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Table Accessories: Mini Ceramic Vase with dried flowers */}
      <group position={[0.1, 0.77, 0.05]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.03, 0.045, 0.12, 16]} />
          <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
        </mesh>
        {/* Flower Stems */}
        <mesh position={[0, 0.1, 0]} rotation={[0.1, 0, 0.1]}>
          <cylinderGeometry args={[0.003, 0.003, 0.16, 8]} />
          <meshStandardMaterial color="#D7CCC8" roughness={0.9} />
        </mesh>
        <mesh position={[0.02, 0.16, 0.01]}>
          <sphereGeometry args={[0.018, 10, 10]} />
          <meshStandardMaterial color="#D4AC0D" roughness={0.8} />
        </mesh>
      </group>

      {/* Coffee Cup on Table */}
      <group position={[-0.15, 0.77, -0.08]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.05, 0.035, 0.07, 16]} />
          <meshStandardMaterial color="#FFF8EE" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.045, 16]} />
          <meshStandardMaterial color="#3E2723" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Lush Potted Monstera / Ficus Plant
function IndoorPlant({ position = [0, 0, 0] }) {
  return (
    <group position={position} scale={1.1}>
      {/* Terracotta / Ribbed Ceramic Planter */}
      <mesh position={[0, 0.32, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.2, 0.64, 24]} />
        <meshStandardMaterial color="#B07D62" roughness={0.65} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.62, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.24, 24]} />
        <meshStandardMaterial color="#271912" roughness={0.95} />
      </mesh>
      {/* Stems & Broad Sculptural Leaves */}
      {[
        [0.05, 0.7, 0.05, 0.2, 0.4, 0.1],
        [-0.08, 0.8, -0.06, -0.3, -0.5, 0.2],
        [0.1, 0.9, -0.08, 0.4, 0.2, -0.2],
        [-0.12, 0.75, 0.1, -0.2, 0.6, -0.1],
        [0, 1.05, 0, 0.1, 0, 0],
      ].map(([x, y, z, rx, ry, rz], idx) => (
        <group key={idx} position={[x, y, z]} rotation={[rx, ry, rz]}>
          {/* Stem */}
          <mesh castShadow>
            <cylinderGeometry args={[0.009, 0.012, 0.5, 8]} />
            <meshStandardMaterial color="#2E5A36" roughness={0.6} />
          </mesh>
          {/* Broad Leaf */}
          <mesh position={[0, 0.25, 0]} rotation={[0.4, 0, 0]} castShadow>
            <cylinderGeometry args={[0.18, 0.08, 0.38, 16]} scale={[1, 0.01, 1]} />
            <meshStandardMaterial color="#1B4D2E" roughness={0.4} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Brass Arc Floor Lamp
function ArcFloorLamp({ position = [0, 0, 0], rotation = [0, 0, 0] }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Heavy Marble Base */}
      <mesh position={[0, 0.04, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.24, 0.24, 0.08, 24]} />
        <meshStandardMaterial color="#F2F4F7" roughness={0.2} />
      </mesh>
      {/* Brass Vertical Pole */}
      <mesh position={[0, 1.1, 0]}>
        <cylinderGeometry args={[0.016, 0.016, 2.1, 12]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Curved Upper Arc */}
      <mesh position={[-0.45, 2.15, 0]} rotation={[0, 0, -Math.PI / 4]}>
        <cylinderGeometry args={[0.014, 0.014, 1.1, 12]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>
      {/* Brass Dome Lamp Shade */}
      <group position={[-0.85, 1.85, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.22, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} side={2} />
        </mesh>
        {/* Filament Warm Bulb */}
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshStandardMaterial color="#FFF8EE" emissive="#FFD166" emissiveIntensity={2.8} />
        </mesh>
        {/* Cozy Warm Pool of Light on Seating */}
        <pointLight position={[0, -0.2, 0]} color="#FFC107" intensity={2.2} distance={3.8} decay={2} />
      </group>
    </group>
  );
}

export default function CafeTables() {
  return (
    <group position={[2.4, 0, 1.2]}>
      {/* Table 1 with 2 Armchairs */}
      <group position={[0, 0, -0.8]}>
        <CafeTable position={[0, 0, 0]} />
        <Armchair position={[-0.75, 0, 0.1]} rotation={[0, 1.2, 0]} color="#1E3462" />
        <Armchair position={[0.75, 0, -0.1]} rotation={[0, -1.2, 0]} color="#5D4037" />
      </group>

      {/* Table 2 with 2 Armchairs */}
      <group position={[0.3, 0, 1.6]}>
        <CafeTable position={[0, 0, 0]} />
        <Armchair position={[-0.7, 0, 0.15]} rotation={[0, 1.1, 0]} color="#5D4037" />
        <Armchair position={[0.7, 0, -0.15]} rotation={[0, -1.3, 0]} color="#1E3462" />
      </group>

      {/* Lush Indoor Monstera Plant in Corner */}
      <IndoorPlant position={[1.4, 0, -0.2]} />

      {/* Curved Brass Arc Floor Lamp casting cozy amber light */}
      <ArcFloorLamp position={[1.3, 0, 1.2]} rotation={[0, 0.3, 0]} />
    </group>
  );
}
