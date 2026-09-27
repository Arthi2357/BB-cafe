import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const SCENE_WAYPOINTS = [
  // 0: Exterior Storefront
  {
    id: "hero",
    cameraPos: [0, 2.2, 13.8],
    targetPos: [0, 2.2, 5.8],
  },
  // 1: Entrance Walk-through
  {
    id: "entrance",
    cameraPos: [0, 2.0, 7.2],
    targetPos: [0, 1.8, 1.2],
  },
  // 2: Barista Counter Overview
  {
    id: "counter",
    cameraPos: [-0.6, 1.9, 3.4],
    targetPos: [-1.8, 1.5, 0.8],
  },
  // 3: Coffee Station & Rising Steam Close-up
  {
    id: "coffee",
    cameraPos: [-1.35, 1.52, 1.6],
    targetPos: [-1.75, 1.25, 0.85],
  },
  // 4: Seating Lounge (About)
  {
    id: "about",
    cameraPos: [1.6, 1.8, 3.2],
    targetPos: [2.4, 1.4, 0.8],
  },
  // 5: Menu & 3D Food Showcase
  {
    id: "menu",
    cameraPos: [0, 1.85, 2.4],
    targetPos: [0, 1.35, -1.1],
  },
  // 6: Gallery Photo Wall
  {
    id: "gallery",
    cameraPos: [1.8, 2.1, 0.4],
    targetPos: [2.5, 2.0, -3.6],
  },
  // 7: Location & Trichy Window
  {
    id: "location",
    cameraPos: [-1.2, 1.9, 1.6],
    targetPos: [-3.2, 1.8, -2.5],
  },
  // 8: Contact Desk
  {
    id: "contact",
    cameraPos: [0, 1.85, 2.6],
    targetPos: [0, 1.5, -0.5],
  },
];

export default function CameraController({
  scrollProgress = 0,
  prefersReducedMotion = false,
  isMobile = false
}) {
  const { camera, pointer } = useThree();
  const currentLookAt = useRef(new THREE.Vector3(0, 2.2, 5.8));
  const targetLookAt = useRef(new THREE.Vector3(0, 2.2, 5.8));
  const targetCamPos = useRef(new THREE.Vector3(0, 2.2, 13.8));

  // Update target coordinates based on scroll progress
  useEffect(() => {
    // Map progress (0 to 1) across the 9 waypoints (index 0 to 8)
    const totalWaypoints = SCENE_WAYPOINTS.length - 1;
    const virtualIndex = Math.max(0, Math.min(totalWaypoints, scrollProgress * totalWaypoints));

    const indexA = Math.floor(virtualIndex);
    const indexB = Math.min(totalWaypoints, indexA + 1);
    const t = virtualIndex - indexA;

    // Smoothstep interpolation factor
    const smoothT = t * t * (3 - 2 * t);

    const wpA = SCENE_WAYPOINTS[indexA];
    const wpB = SCENE_WAYPOINTS[indexB];

    const posA = new THREE.Vector3(...wpA.cameraPos);
    const posB = new THREE.Vector3(...wpB.cameraPos);
    const lookA = new THREE.Vector3(...wpA.targetPos);
    const lookB = new THREE.Vector3(...wpB.targetPos);

    targetCamPos.current.copy(posA).lerp(posB, smoothT);
    targetLookAt.current.copy(lookA).lerp(lookB, smoothT);
  }, [scrollProgress]);

  useFrame((_, delta) => {
    // Mouse parallax (subtle, disabled on reduced motion or minimized on mobile)
    const parallaxFactor = prefersReducedMotion ? 0 : (isMobile ? 0.08 : 0.25);
    const offsetX = pointer.x * parallaxFactor;
    const offsetY = pointer.y * (parallaxFactor * 0.6);

    const targetX = targetCamPos.current.x + offsetX;
    const targetY = targetCamPos.current.y - offsetY;
    const targetZ = targetCamPos.current.z;

    const lerpSpeed = prefersReducedMotion ? 12 : 3.5;

    camera.position.x = THREE.MathUtils.damp(camera.position.x, targetX, lerpSpeed, delta);
    camera.position.y = THREE.MathUtils.damp(camera.position.y, targetY, lerpSpeed, delta);
    camera.position.z = THREE.MathUtils.damp(camera.position.z, targetZ, lerpSpeed, delta);

    currentLookAt.current.x = THREE.MathUtils.damp(currentLookAt.current.x, targetLookAt.current.x, lerpSpeed, delta);
    currentLookAt.current.y = THREE.MathUtils.damp(currentLookAt.current.y, targetLookAt.current.y, lerpSpeed, delta);
    currentLookAt.current.z = THREE.MathUtils.damp(currentLookAt.current.z, targetLookAt.current.z, lerpSpeed, delta);

    camera.lookAt(currentLookAt.current);
  });

  return null;
}
