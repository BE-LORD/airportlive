'use client';

/**
 * ParticleSystem - 3D particle background effect
 * 
 * Features:
 * - 1000 particles (high tier), 500 (mid tier), 0 (low tier)
 * - Gold color (#D1D1D1)
 * - Mouse-influenced parallax effect
 * - Noise-based organic movement
 * - Device tier gating
 */

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { detectDeviceTier, getParticleCount, getPixelRatio } from '@/lib/three';

interface ParticleSystemProps {
  className?: string;
}

export function ParticleSystem({ className = '' }: ParticleSystemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | null>(null);
  
  const [tier, setTier] = useState<string>('low');
  const [isSupported, setIsSupported] = useState(false);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    const detectedTier = detectDeviceTier();
    const count = getParticleCount(detectedTier);
    setTier(detectedTier);
    setParticleCount(count);
    setIsSupported(count > 0);
  }, []);

  useEffect(() => {
    // Don't render on low-tier devices or if not supported
    if (!isSupported || particleCount === 0) {
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: tier === 'high',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getPixelRatio(tier as any));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle geometry
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      // Random position in a sphere
      const radius = Math.random() * 10 + 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      positions[i] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i + 2] = radius * Math.cos(phi);

      // Random velocity for organic movement
      velocities[i] = (Math.random() - 0.5) * 0.02;
      velocities[i + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i + 2] = (Math.random() - 0.5) * 0.02;
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('velocity', new THREE.BufferAttribute(velocities, 3));

    // Create particle material (gold color)
    const material = new THREE.PointsMaterial({
      color: 0xc8780a, // Gold
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    // Create particle system
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Mouse move handler for parallax
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    let time = 0;
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      animationFrameRef.current = requestAnimationFrame(animate);
      time += 0.01;

      // Update particle positions with noise-based movement
      const positions = geometry.attributes.position.array as Float32Array;
      const velocities = geometry.attributes.velocity.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        // Apply velocity
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Add noise-based movement
        positions[i] += Math.sin(time + i) * 0.001;
        positions[i + 1] += Math.cos(time + i) * 0.001;

        // Boundary check - wrap around
        const distance = Math.sqrt(
          positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
        );

        if (distance > 15) {
          positions[i] *= 0.5;
          positions[i + 1] *= 0.5;
          positions[i + 2] *= 0.5;
        }
      }

      geometry.attributes.position.needsUpdate = true;

      // Apply mouse parallax to camera
      if (cameraRef.current) {
        cameraRef.current.position.x += (mouseRef.current.x * 0.5 - cameraRef.current.position.x) * 0.05;
        cameraRef.current.position.y += (mouseRef.current.y * 0.5 - cameraRef.current.position.y) * 0.05;
        cameraRef.current.lookAt(scene.position);
      }

      // Rotate particle system slowly
      if (particlesRef.current) {
        particlesRef.current.rotation.y += 0.0005;
      }

      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;

      const width = container.clientWidth;
      const height = container.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (particlesRef.current) {
        particlesRef.current.geometry.dispose();
        (particlesRef.current.material as THREE.Material).dispose();
      }

      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current.forceContextLoss();
        if (container.contains(rendererRef.current.domElement)) {
          container.removeChild(rendererRef.current.domElement);
        }
      }

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      particlesRef.current = null;
    };
  }, [isSupported, particleCount, tier]);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
