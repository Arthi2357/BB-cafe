import { useMemo } from 'react';
import * as THREE from 'three';
import StorefrontExterior from './StorefrontExterior';
import CafeCounter from './CafeCounter';
import CafeTables from './CafeTables';
import MenuBoard3D from './MenuBoard3D';
import FoodShowcase from './FoodShowcase';
import GalleryWall from './GalleryWall';
import DustParticles from './DustParticles';

export default function CafeEnvironment({
  activeFoodType = 'coffee',
  onPhotoClick,
  onOpenMenu,
  onCupClick
}) {
  // Procedural wood parquet canvas texture for cafe floor
  const floorTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');

    // Base warm walnut tone
    ctx.fillStyle = '#261811';
    ctx.fillRect(0, 0, 512, 512);

    // Herringbone / plank pattern
    const plankHeight = 32;
    const plankWidth = 128;
    ctx.strokeStyle = '#160E0A';
    ctx.lineWidth = 2;

    for (let y = 0; y < 512; y += plankHeight) {
      for (let x = 0; x < 512; x += plankWidth) {
        const offset = (Math.floor(y / plankHeight) % 2) * (plankWidth / 2);
        const px = (x + offset) % 512;

        // Subtle plank tone variation
        const shade = 35 + ((x * 13 + y * 7) % 15);
        ctx.fillStyle = `rgb(${shade + 8}, ${shade - 2}, ${shade - 12})`;
        ctx.fillRect(px, y, plankWidth - 2, plankHeight - 2);
        ctx.strokeRect(px, y, plankWidth, plankHeight);
      }
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(6, 8);
    return tex;
  }, []);

  return (
    <group>
      {/* ================= LIGHTING ================= */}
      {/* Soft Fill Ambient */}
      <ambientLight color="#16233B" intensity={1.1} />

      {/* Main Directional Warm Light (Angling through front cafe windows) */}
      <directionalLight
        position={[4, 6, 8]}
        target-position={[0, 1, 0]}
        color="#FFF4DD"
        intensity={1.8}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.0005}
      />

      {/* Soft Blue Moonlight Fill from Opposite Window */}
      <directionalLight
        position={[-6, 5, 2]}
        color="#1E3462"
        intensity={0.6}
      />

      {/* Warm Ambient Center Chandelier / Pendant glow */}
      <pointLight position={[0, 3.2, 0.5]} color="#FFC107" intensity={2.0} distance={7} decay={2} />
      <pointLight position={[0, 3.2, -2.5]} color="#FFD166" intensity={1.8} distance={6} decay={2} />

      {/* ================= ARCHITECTURE ================= */}

      {/* Interior Parquet Wood Floor */}
      <mesh position={[0, 0, 0.8]} receiveShadow>
        <boxGeometry args={[9.2, 0.05, 10.4]} />
        <meshStandardMaterial
          map={floorTexture}
          roughness={0.35}
          metalness={0.08}
        />
      </mesh>

      {/* Back Interior Wall (Deep Navy Blue with vertical wood slat details) */}
      <mesh position={[0, 2.1, -4.4]} receiveShadow>
        <boxGeometry args={[9.2, 4.2, 0.2]} />
        <meshStandardMaterial color="#0B1325" roughness={0.7} />
      </mesh>

      {/* Back Wall Warm Cove Lighting Strip at Ceiling */}
      <mesh position={[0, 4.15, -4.3]}>
        <boxGeometry args={[9.0, 0.04, 0.04]} />
        <meshStandardMaterial color="#FFD166" emissive="#FFD166" emissiveIntensity={2.0} />
      </mesh>
      <pointLight position={[0, 4.0, -4.1]} color="#FFB300" intensity={1.5} distance={4} decay={2} />

      {/* Left Wall (Behind Counter) */}
      <mesh position={[-4.5, 2.1, 0.8]} receiveShadow>
        <boxGeometry args={[0.2, 4.2, 10.4]} />
        <meshStandardMaterial color="#0E1A33" roughness={0.8} />
      </mesh>
      {/* Wall Shelves Behind Counter */}
      {[-0.8, 0.6, 2.0].map((z, idx) => (
        <group key={idx} position={[-4.3, 2.4, z]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[0.24, 0.03, 1.2]} />
            <meshStandardMaterial color="#3E2723" roughness={0.6} />
          </mesh>
          {/* Ceramic Mugs & Jars on Shelf */}
          {[-0.4, 0, 0.4].map((px, i) => (
            <mesh key={i} position={[0, 0.08, px]} castShadow>
              <cylinderGeometry args={[0.045, 0.04, 0.12, 16]} />
              <meshStandardMaterial color={i % 2 === 0 ? "#FFF8EE" : "#C5A059"} roughness={0.3} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Right Wall (Along Seating Lounge) */}
      <mesh position={[4.5, 2.1, 0.8]} receiveShadow>
        <boxGeometry args={[0.2, 4.2, 10.4]} />
        <meshStandardMaterial color="#0B1325" roughness={0.8} />
      </mesh>

      {/* Ceiling with Matte Finish and Timber Beams */}
      <mesh position={[0, 4.2, 0.8]} receiveShadow>
        <boxGeometry args={[9.2, 0.1, 10.4]} />
        <meshStandardMaterial color="#070B16" roughness={0.9} />
      </mesh>
      {/* Timber Ceiling Beams */}
      {[-3, -1.2, 0.6, 2.4, 4.2].map((z, i) => (
        <mesh key={i} position={[0, 4.08, z]} castShadow>
          <boxGeometry args={[9.2, 0.16, 0.18]} />
          <meshStandardMaterial color="#2B1810" roughness={0.7} />
        </mesh>
      ))}

      {/* ================= INTERIOR SECTIONS ================= */}

      {/* 1. Storefront Exterior & Entrance Facade */}
      <StorefrontExterior />

      {/* 2. Barista Counter & Coffee Machine Station */}
      <CafeCounter onCupClick={onCupClick} onMenuBoardClick={onOpenMenu} />

      {/* 3. Seating Lounge & Coffee Tables */}
      <CafeTables />

      {/* 4. 3D Interactive Menu Board Stand */}
      <MenuBoard3D position={[0, 0, 0.5]} onOpenMenu={onOpenMenu} />

      {/* 5. 3D Interactive Food Showcase Stage */}
      <FoodShowcase
        activeType={activeFoodType}
        position={[0, 1.0, -1.4]}
        scale={1.25}
      />

      {/* 6. 3D Gallery Photo Wall */}
      <GalleryWall onPhotoClick={onPhotoClick} />

      {/* 7. Ambient Floating Dust Motes */}
      <DustParticles count={70} />
    </group>
  );
}
