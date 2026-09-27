import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';

export default function MenuBoard3D({ position = [0, 0, 0.4], onOpenMenu }) {
  const boardRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (boardRef.current && hovered) {
      boardRef.current.position.y = Math.sin(clock.getElapsedTime() * 3) * 0.02;
    } else if (boardRef.current) {
      boardRef.current.position.y = 0;
    }
  });

  return (
    <group
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onOpenMenu?.(); }}
      cursor={hovered ? 'pointer' : 'auto'}
    >
      <group ref={boardRef}>
        {/* Brass Easel / Stand Legs */}
        {[-0.45, 0.45].map((x, i) => (
          <mesh key={i} position={[x, 0.9, 0]} rotation={[0, 0, (i === 0 ? 0.06 : -0.06)]} castShadow>
            <cylinderGeometry args={[0.02, 0.02, 1.8, 12]} />
            <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
          </mesh>
        ))}
        {/* Rear Support Leg */}
        <mesh position={[0, 0.9, -0.35]} rotation={[0.25, 0, 0]} castShadow>
          <cylinderGeometry args={[0.018, 0.018, 1.8, 12]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
        </mesh>

        {/* Board Frame (Rich walnut wood with gold bevel) */}
        <mesh position={[0, 1.35, 0.04]} castShadow receiveShadow>
          <boxGeometry args={[1.08, 1.38, 0.06]} />
          <meshStandardMaterial color="#3E2723" roughness={0.5} />
        </mesh>
        {/* Gold Inset Bevel */}
        <mesh position={[0, 1.35, 0.065]}>
          <boxGeometry args={[0.98, 1.28, 0.02]} />
          <meshStandardMaterial
            color={hovered ? "#FFD166" : "#C5A059"}
            metalness={0.8}
            roughness={0.3}
            emissive={hovered ? "#C5A059" : "#000000"}
            emissiveIntensity={hovered ? 0.4 : 0}
          />
        </mesh>

        {/* Slate Chalkboard Interior */}
        <mesh position={[0, 1.35, 0.076]}>
          <planeGeometry args={[0.92, 1.22]} />
          <meshStandardMaterial color="#0B1325" roughness={0.85} />
        </mesh>

        {/* 3D Drei Typography on Board */}
        <Text
          position={[0, 1.82, 0.082]}
          fontSize={0.065}
          color="#FFF8EE"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.15}
        >
          BREW BLUE SPECIALS
        </Text>

        <mesh position={[0, 1.74, 0.082]}>
          <planeGeometry args={[0.65, 0.004]} />
          <meshBasicMaterial color="#C5A059" />
        </mesh>

        <Text
          position={[0, 1.62, 0.082]}
          fontSize={0.042}
          color="#FFD166"
          anchorX="center"
          anchorY="middle"
        >
          Caramel Cappuccino • Fries on Pizza
        </Text>
        <Text
          position={[0, 1.52, 0.082]}
          fontSize={0.042}
          color="#FFF8EE"
          anchorX="center"
          anchorY="middle"
        >
          Biscoff Shake • Peri Peri Fries
        </Text>
        <Text
          position={[0, 1.42, 0.082]}
          fontSize={0.042}
          color="#FFF8EE"
          anchorX="center"
          anchorY="middle"
        >
          Garlic Cheese Toast • Burn Baby Bowl
        </Text>

        {/* Interactive "Click to View Menu" badge */}
        <group position={[0, 1.15, 0.082]}>
          <mesh>
            <planeGeometry args={[0.68, 0.16]} />
            <meshStandardMaterial
              color={hovered ? "#C5A059" : "#142344"}
              roughness={0.3}
              metalness={0.4}
              emissive={hovered ? "#C5A059" : "#142344"}
              emissiveIntensity={hovered ? 0.6 : 0.2}
            />
          </mesh>
          <Text
            position={[0, 0, 0.005]}
            fontSize={0.042}
            color={hovered ? "#0B1325" : "#FFF8EE"}
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            {hovered ? "CLICK TO EXPLORE MENU" : "TOUCH TO VIEW FULL MENU"}
          </Text>
        </group>

        {/* Ambient Warm Spotlight focused on menu board */}
        <pointLight
          position={[0, 2.2, 0.8]}
          color="#FFD166"
          intensity={hovered ? 2.5 : 1.6}
          distance={2.5}
          decay={2}
        />
      </group>
    </group>
  );
}
