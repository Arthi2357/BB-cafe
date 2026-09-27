import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Demo gallery items clearly structured with placeholders for easy replacement
export const GALLERY_ITEMS = [
  {
    id: 1,
    title: "The Morning Espresso Extraction",
    subtitle: "Freshly ground Arabica blend dripping golden crema",
    category: "Coffee Craft",
    color: "#3E2723",
    tag: "Barista Moment",
    accent: "#D4AC0D"
  },
  {
    id: 2,
    title: "Freshly Fired Artisan Pizza",
    subtitle: "Bubbling cheese, crisp thin crust and sweet basil leaves",
    category: "Comfort Food",
    color: "#B7410E",
    tag: "Kitchen Special",
    accent: "#E67E22"
  },
  {
    id: 3,
    title: "Acoustic Seating Lounge",
    subtitle: "Warm ambient lights, timber slats and relaxed conversations",
    category: "Atmosphere",
    color: "#1E3462",
    tag: "Interior Glow",
    accent: "#5DADE2"
  },
  {
    id: 4,
    title: "Signature Biscoff Shake",
    subtitle: "Whipped decadent cream with caramelized biscuit crumble",
    category: "Beverages",
    color: "#6E2C00",
    tag: "Sweet Indulgence",
    accent: "#F39C12"
  }
];

function GalleryFrame({ item, _index, position = [0, 0, 0], onPhotoClick }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Procedural artistic canvas texture for each frame
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Rich luxury gradient
    const grad = ctx.createLinearGradient(0, 0, 512, 512);
    grad.addColorStop(0, '#0B1325');
    grad.addColorStop(0.5, item.color);
    grad.addColorStop(1, '#070B16');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);

    // Subtle geometric architectural grid
    ctx.strokeStyle = 'rgba(197, 160, 89, 0.25)';
    ctx.lineWidth = 2;
    ctx.strokeRect(32, 32, 448, 448);
    ctx.strokeRect(48, 48, 416, 416);

    // Warm radial glow in center
    const radial = ctx.createRadialGradient(256, 256, 10, 256, 256, 220);
    radial.addColorStop(0, 'rgba(255, 209, 102, 0.25)');
    radial.addColorStop(1, 'rgba(0, 0, 0, 0.4)');
    ctx.fillStyle = radial;
    ctx.fillRect(48, 48, 416, 416);

    // Category Tag
    ctx.fillStyle = '#C5A059';
    ctx.font = 'bold 20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(item.tag.toUpperCase(), 256, 180);

    // Title
    ctx.fillStyle = '#FFF8EE';
    ctx.font = 'bold 28px serif';
    ctx.fillText(item.title, 256, 260);

    // Subtitle
    ctx.fillStyle = 'rgba(255, 248, 238, 0.7)';
    ctx.font = '18px sans-serif';
    ctx.fillText(item.subtitle, 256, 310);

    // Click hint
    ctx.fillStyle = '#C5A059';
    ctx.font = 'italic 16px sans-serif';
    ctx.fillText('Tap to expand full view', 256, 420);

    return new THREE.CanvasTexture(canvas);
  }, [item]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = hovered ? 1.05 : 1.0;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 8);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => { e.stopPropagation(); onPhotoClick?.(item); }}
      cursor={hovered ? 'pointer' : 'auto'}
    >
      {/* Wooden Deep Bevel Frame */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[1.08, 1.08, 0.06]} />
        <meshStandardMaterial color="#2B1810" roughness={0.6} />
      </mesh>

      {/* Gold Inner Beading */}
      <mesh position={[0, 0, 0.032]}>
        <boxGeometry args={[0.98, 0.98, 0.01]} />
        <meshStandardMaterial
          color={hovered ? "#FFD166" : "#C5A059"}
          metalness={0.9}
          roughness={0.2}
          emissive={hovered ? "#C5A059" : "#000"}
          emissiveIntensity={hovered ? 0.5 : 0}
        />
      </mesh>

      {/* White Matting Border */}
      <mesh position={[0, 0, 0.038]}>
        <planeGeometry args={[0.94, 0.94]} />
        <meshStandardMaterial color="#FFF8EE" roughness={0.4} />
      </mesh>

      {/* Artwork Canvas Plane */}
      <mesh position={[0, 0, 0.042]}>
        <planeGeometry args={[0.82, 0.82]} />
        <meshBasicMaterial map={texture} />
      </mesh>

      {/* Brass Picture Light Mounted Above Each Frame */}
      <group position={[0, 0.65, 0.12]}>
        {/* Wall Mount */}
        <mesh>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 12]} rotation={[Math.PI / 2, 0, 0]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} />
        </mesh>
        {/* Curved Arm */}
        <mesh position={[0, 0.04, 0.08]} rotation={[0.5, 0, 0]}>
          <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} />
        </mesh>
        {/* Horizontal Lamp Hood */}
        <mesh position={[0, 0.09, 0.15]}>
          <cylinderGeometry args={[0.025, 0.025, 0.45, 16]} rotation={[0, 0, Math.PI / 2]} />
          <meshStandardMaterial color="#C5A059" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Warm Downward Spotlight */}
        <spotLight
          position={[0, 0.08, 0.16]}
          target-position={[0, -0.6, 0]}
          color="#FFD166"
          intensity={hovered ? 2.2 : 1.4}
          angle={0.65}
          penumbra={0.4}
          distance={2.0}
        />
      </group>
    </group>
  );
}

export default function GalleryWall({ onPhotoClick }) {
  return (
    <group position={[2.5, 2.0, -3.6]}>
      {/* Acoustic Wood Slats Wall Section Behind Gallery */}
      <mesh position={[0, 0, -0.05]} receiveShadow>
        <boxGeometry args={[4.4, 2.8, 0.04]} />
        <meshStandardMaterial color="#142344" roughness={0.8} />
      </mesh>

      {/* Vertical decorative oak wood ribs */}
      {Array.from({ length: 30 }).map((_, i) => (
        <mesh key={i} position={[-2.1 + i * 0.145, 0, -0.02]}>
          <boxGeometry args={[0.025, 2.75, 0.03]} />
          <meshStandardMaterial color="#4A2F20" roughness={0.6} />
        </mesh>
      ))}

      {/* 4 Art Frames in 2x2 or Linear Grid */}
      <GalleryFrame item={GALLERY_ITEMS[0]} index={0} position={[-1.2, 0.55, 0]} onPhotoClick={onPhotoClick} />
      <GalleryFrame item={GALLERY_ITEMS[1]} index={1} position={[1.2, 0.55, 0]} onPhotoClick={onPhotoClick} />
      <GalleryFrame item={GALLERY_ITEMS[2]} index={2} position={[-1.2, -0.65, 0]} onPhotoClick={onPhotoClick} />
      <GalleryFrame item={GALLERY_ITEMS[3]} index={3} position={[1.2, -0.65, 0]} onPhotoClick={onPhotoClick} />
    </group>
  );
}
