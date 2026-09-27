import CoffeeMachine from './CoffeeMachine';
import CoffeeCupStation from './CoffeeCupStation';

export default function CafeCounter({ onCupClick, _onMenuBoardClick }) {
  return (
    <group position={[-1.8, 0, 1.2]}>
      {/* Main Counter Base (Rich dark walnut with vertical slatted detail) */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.2, 1.0, 4.4]} />
        <meshStandardMaterial color="#2E1C12" roughness={0.7} />
      </mesh>

      {/* Decorative vertical fluting slats on counter customer face */}
      {Array.from({ length: 28 }).map((_, i) => (
        <mesh key={i} position={[0.61, 0.5, -2.0 + i * 0.145]} castShadow>
          <boxGeometry args={[0.02, 0.94, 0.08]} />
          <meshStandardMaterial color="#4A2F20" roughness={0.6} />
        </mesh>
      ))}

      {/* Brass Kickplate / Foot Rail Base */}
      <mesh position={[0.62, 0.05, 0]}>
        <boxGeometry args={[0.04, 0.1, 4.4]} />
        <meshStandardMaterial color="#C5A059" metalness={0.85} roughness={0.25} />
      </mesh>

      {/* Italian Carrara Marble Countertop */}
      <mesh position={[0.04, 1.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.32, 0.06, 4.56]} />
        <meshStandardMaterial
          color="#F2F4F7"
          roughness={0.18}
          metalness={0.08}
        />
      </mesh>
      {/* Countertop Brass Beveled Trim */}
      <mesh position={[0.69, 1.03, 0]}>
        <boxGeometry args={[0.02, 0.06, 4.56]} />
        <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Warm Under-Counter LED Ambient Strip */}
      <mesh position={[0.63, 0.99, 0]}>
        <boxGeometry args={[0.02, 0.02, 4.4]} />
        <meshStandardMaterial
          color="#FFD166"
          emissive="#FFD166"
          emissiveIntensity={1.5}
        />
      </mesh>
      <pointLight position={[0.8, 0.8, 0]} color="#FFC107" intensity={0.9} distance={1.8} decay={2} />

      {/* Glass Pastry Display Showcase (on right section of counter) */}
      <group position={[0.05, 1.06, 1.3]}>
        {/* Showcase Marble Base */}
        <mesh position={[0, 0.02, 0]} castShadow>
          <boxGeometry args={[0.85, 0.04, 1.3]} />
          <meshStandardMaterial color="#1E293B" roughness={0.3} />
        </mesh>
        {/* Glass Hood */}
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[0.8, 0.48, 1.25]} />
          <meshPhysicalMaterial
            transparent={true}
            opacity={0.35}
            roughness={0.05}
            transmission={0.85}
            thickness={0.05}
            color="#FFFFFF"
          />
        </mesh>
        {/* Glass Shelf Inside */}
        <mesh position={[0, 0.24, 0]}>
          <boxGeometry args={[0.72, 0.015, 1.15]} />
          <meshPhysicalMaterial transparent opacity={0.5} roughness={0.1} color="#FFFFFF" />
        </mesh>
        {/* Pastries on display: Croissants and Pain au chocolat */}
        {[-0.35, 0, 0.35].map((z, i) => (
          <group key={i} position={[0, 0.06, z]}>
            {/* Croissant curved mesh */}
            <mesh castShadow rotation={[0, 0.2 * i, 0]}>
              <torusGeometry args={[0.08, 0.038, 12, 16, Math.PI * 0.9]} />
              <meshStandardMaterial color="#D35400" roughness={0.8} />
            </mesh>
          </group>
        ))}
        {/* Upper Shelf Pastries (Muffins/Buns) */}
        {[-0.25, 0.25].map((z, i) => (
          <mesh key={i} position={[0, 0.28, z]} castShadow>
            <cylinderGeometry args={[0.065, 0.045, 0.07, 16]} />
            <meshStandardMaterial color="#795548" roughness={0.7} />
          </mesh>
        ))}
        {/* Warm Interior Display Light */}
        <pointLight position={[0, 0.4, 0]} color="#FFA000" intensity={0.9} distance={1.2} decay={2} />
      </group>

      {/* POS Terminal / Cafe Tablet on Counter */}
      <group position={[0.2, 1.06, 0.3]} rotation={[0, -0.4, 0]}>
        {/* Metal Stand */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.02, 0.04, 0.2, 16]} />
          <meshStandardMaterial color="#212121" metalness={0.8} />
        </mesh>
        {/* Tablet Screen */}
        <mesh position={[0, 0.22, 0]} rotation={[0.4, 0, 0]}>
          <boxGeometry args={[0.3, 0.22, 0.018]} />
          <meshStandardMaterial color="#111827" metalness={0.5} />
        </mesh>
        <mesh position={[0, 0.22, 0.01]} rotation={[0.4, 0, 0]}>
          <planeGeometry args={[0.27, 0.19]} />
          <meshBasicMaterial color="#0E1A33" />
        </mesh>
      </group>

      {/* Dual Group Espresso Machine on Left Section */}
      <CoffeeMachine position={[-0.05, 1.06, -0.8]} rotation={[0, 0.2, 0]} />

      {/* Hot Fresh Ceramic Coffee Cup Station */}
      <CoffeeCupStation position={[0.25, 1.06, -0.1]} onCupClick={onCupClick} />

      {/* Pendant Lights Suspended from Above Counter */}
      {[-1.2, 0.2, 1.4].map((z, idx) => (
        <group key={idx} position={[0.2, 3.2, z]}>
          {/* Black Cord */}
          <mesh position={[0, -0.6, 0]}>
            <cylinderGeometry args={[0.005, 0.005, 1.2, 8]} />
            <meshStandardMaterial color="#1E293B" metalness={0.7} />
          </mesh>
          {/* Conical Brass Shade */}
          <mesh position={[0, -1.2, 0]}>
            <coneGeometry args={[0.18, 0.2, 24, 1, true]} />
            <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} side={2} />
          </mesh>
          {/* Glowing Filament Bulb */}
          <mesh position={[0, -1.24, 0]}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
              color="#FFF8EE"
              emissive="#FFD166"
              emissiveIntensity={2.5}
            />
          </mesh>
          {/* Warm Downlight */}
          <pointLight position={[0, -1.35, 0]} color="#FFC107" intensity={1.8} distance={3.5} decay={2} />
        </group>
      ))}
    </group>
  );
}
