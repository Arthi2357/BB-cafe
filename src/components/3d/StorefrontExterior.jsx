import { Text } from '@react-three/drei';

export default function StorefrontExterior() {


  return (
    <group position={[0, 0, 5.8]}>
      {/* Exterior Facade Top Architrave / Lintel */}
      <mesh position={[0, 3.6, 0]} castShadow>
        <boxGeometry args={[8.8, 1.2, 0.4]} />
        <meshStandardMaterial color="#0B1325" roughness={0.7} />
      </mesh>
      {/* Decorative Gold Fascia Molding Trim */}
      <mesh position={[0, 3.02, 0.22]}>
        <boxGeometry args={[8.8, 0.05, 0.04]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh position={[0, 4.18, 0.22]}>
        <boxGeometry args={[8.8, 0.05, 0.04]} />
        <meshStandardMaterial color="#C5A059" metalness={0.8} roughness={0.3} />
      </mesh>

      {/* Main 3D Signboard: BREW BLUE */}
      <group position={[0, 3.6, 0.24]}>
        {/* Navy Signboard Plate */}
        <mesh castShadow>
          <boxGeometry args={[5.2, 0.85, 0.06]} />
          <meshStandardMaterial color="#070B16" roughness={0.5} />
        </mesh>
        {/* Brass Border Around Sign */}
        <mesh position={[0, 0, 0.035]}>
          <boxGeometry args={[5.12, 0.77, 0.01]} />
          <meshStandardMaterial color="#C5A059" metalness={0.85} roughness={0.25} />
        </mesh>

        {/* 3D Glowing Text: BREW BLUE */}
        <Text
          position={[0, 0.08, 0.06]}
          fontSize={0.42}
          color="#FFF8EE"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.16}
        >
          BREW BLUE
        </Text>

        {/* Subtitle Plaque */}
        <Text
          position={[0, -0.22, 0.06]}
          fontSize={0.12}
          color="#C5A059"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.28}
        >
          CAFE • TRICHY
        </Text>

        {/* Warm Backlight behind sign */}
        <pointLight position={[0, 0, 0.4]} color="#FFD166" intensity={2.8} distance={4} decay={2} />
      </group>

      {/* Exterior Lantern Sconces Left & Right */}
      {[-3.2, 3.2].map((x, i) => (
        <group key={i} position={[x, 2.6, 0.22]}>
          {/* Wall bracket */}
          <mesh>
            <boxGeometry args={[0.08, 0.16, 0.08]} />
            <meshStandardMaterial color="#C5A059" metalness={0.9} />
          </mesh>
          {/* Lantern Arm */}
          <mesh position={[0, 0.08, 0.12]} rotation={[0.4, 0, 0]}>
            <cylinderGeometry args={[0.012, 0.012, 0.25, 8]} />
            <meshStandardMaterial color="#C5A059" metalness={0.9} />
          </mesh>
          {/* Lantern Glass Housing */}
          <mesh position={[0, 0, 0.22]}>
            <cylinderGeometry args={[0.12, 0.09, 0.28, 6]} />
            <meshPhysicalMaterial transparent opacity={0.4} transmission={0.8} roughness={0.1} color="#FFF" />
          </mesh>
          {/* Glowing Amber Bulb Inside Lantern */}
          <mesh position={[0, 0, 0.22]}>
            <sphereGeometry args={[0.05, 12, 12]} />
            <meshStandardMaterial color="#FFF" emissive="#FFB300" emissiveIntensity={3} />
          </mesh>
          <pointLight position={[0, 0, 0.35]} color="#FFB300" intensity={2.2} distance={4.5} decay={2} />
        </group>
      ))}

      {/* Exterior Ground / Sidewalk Curb */}
      <mesh position={[0, -0.05, 4.5]} receiveShadow>
        <boxGeometry args={[12, 0.1, 9.0]} />
        <meshStandardMaterial color="#0A101D" roughness={0.85} />
      </mesh>
      {/* Entrance Welcome Stone Mat */}
      <mesh position={[0, 0.005, 0.8]} receiveShadow>
        <boxGeometry args={[2.2, 0.01, 1.2]} />
        <meshStandardMaterial color="#142344" roughness={0.7} />
      </mesh>
      <mesh position={[0, 0.012, 0.8]}>
        <boxGeometry args={[2.1, 0.002, 1.1]} />
        <meshStandardMaterial color="#C5A059" metalness={0.7} roughness={0.4} />
      </mesh>
      <Text
        position={[0, 0.02, 0.8]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.11}
        color="#FFF8EE"
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.15}
      >
        ENTER BREW BLUE
      </Text>

      {/* Left Wall Segment */}
      <mesh position={[-3.3, 1.5, 0]} castShadow>
        <boxGeometry args={[2.2, 3.0, 0.25]} />
        <meshStandardMaterial color="#0B1325" roughness={0.7} />
      </mesh>
      {/* Right Wall Segment */}
      <mesh position={[3.3, 1.5, 0]} castShadow>
        <boxGeometry args={[2.2, 3.0, 0.25]} />
        <meshStandardMaterial color="#0B1325" roughness={0.7} />
      </mesh>

      {/* Left Large Display Window */}
      <mesh position={[-1.7, 1.5, 0]}>
        <boxGeometry args={[1.0, 2.7, 0.02]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.3}
          roughness={0.05}
          transmission={0.9}
          thickness={0.02}
          color="#DCE7F5"
        />
      </mesh>
      {/* Right Large Display Window */}
      <mesh position={[1.7, 1.5, 0]}>
        <boxGeometry args={[1.0, 2.7, 0.02]} />
        <meshPhysicalMaterial
          transparent={true}
          opacity={0.3}
          roughness={0.05}
          transmission={0.9}
          thickness={0.02}
          color="#DCE7F5"
        />
      </mesh>

      {/* Center Glass Entrance Double Doors */}
      <group position={[0, 1.45, 0]}>
        {/* Door Frame Metal */}
        <mesh>
          <boxGeometry args={[2.0, 2.75, 0.08]} />
          <meshStandardMaterial color="#0B1325" roughness={0.5} />
        </mesh>
        {/* Left Glass Leaf */}
        <mesh position={[-0.48, 0, 0]}>
          <boxGeometry args={[0.92, 2.65, 0.02]} />
          <meshPhysicalMaterial
            transparent={true}
            opacity={0.25}
            roughness={0.04}
            transmission={0.92}
            thickness={0.03}
            color="#E8F1F5"
          />
        </mesh>
        {/* Right Glass Leaf */}
        <mesh position={[0.48, 0, 0]}>
          <boxGeometry args={[0.92, 2.65, 0.02]} />
          <meshPhysicalMaterial
            transparent={true}
            opacity={0.25}
            roughness={0.04}
            transmission={0.92}
            thickness={0.03}
            color="#E8F1F5"
          />
        </mesh>
        {/* Vertical Brass Door Handles */}
        <mesh position={[-0.08, 0, 0.06]}>
          <cylinderGeometry args={[0.014, 0.014, 0.7, 12]} />
          <meshStandardMaterial color="#C5A059" metalness={0.95} roughness={0.15} />
        </mesh>
        <mesh position={[0.08, 0, 0.06]}>
          <cylinderGeometry args={[0.014, 0.014, 0.7, 12]} />
          <meshStandardMaterial color="#C5A059" metalness={0.95} roughness={0.15} />
        </mesh>
      </group>
    </group>
  );
}
