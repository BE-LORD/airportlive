'use client';

/**
 * RouteVisualization3D - 3D route path visualization
 * 
 * Features:
 * - 3D route path using CatmullRomCurve3 and TubeGeometry
 * - Animated path drawing with scroll trigger
 * - Route markers with 3D positioning
 * - Camera angle animation for depth effect
 * - Simplified geometry for mid-tier devices (line instead of tube)
 */

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { detectDeviceTier, isFeatureEnabled, getPixelRatio } from '@/lib/three';

interface RoutePoint {
  position: [number, number, number];
  label: string;
}

interface RouteVisualization3DProps {
  points: RoutePoint[];
  color?: string;
  className?: string;
  scrollProgress?: number; // 0 to 1
}

export function RouteVisualization3D({
  points,
  color = '#C8780A',
  className = '',
  scrollProgress = 0,
}: RouteVisualization3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const routeRef = useRef<THREE.Mesh | THREE.Line | null>(null);
  const markersRef = useRef<THREE.Group | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Check device tier outside of effect
  const tier = detectDeviceTier();
  const enabled = isFeatureEnabled('enable3DRouteVisualization', tier);
  const isSupported = enabled;

  useEffect(() => {
    // Don't render on low-tier devices
    if (!isSupported) {
      return;
    }

    const container = containerRef.current;
    if (!container || points.length < 2) return;

    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: tier === 'high',
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(getPixelRatio(tier));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create curve from points
    const curvePoints = points.map(
      (p) => new THREE.Vector3(p.position[0], p.position[1], p.position[2])
    );
    const curve = new THREE.CatmullRomCurve3(curvePoints);

    // Create route geometry based on device tier
    let routeObject: THREE.Mesh | THREE.Line;

    if (tier === 'high') {
      // High tier: Use tube geometry
      const tubeGeometry = new THREE.TubeGeometry(curve, 100, 0.1, 8, false);
      const tubeMaterial = new THREE.MeshStandardMaterial({
        color: new THREE.Color(color),
        metalness: 0.5,
        roughness: 0.5,
      });
      routeObject = new THREE.Mesh(tubeGeometry, tubeMaterial);

      // Add lighting for high tier
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
      scene.add(ambientLight);

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
      directionalLight.position.set(5, 10, 5);
      scene.add(directionalLight);
    } else {
      // Mid tier: Use line geometry
      const lineGeometry = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(100)
      );
      const lineMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(color),
        linewidth: 2,
      });
      routeObject = new THREE.Line(lineGeometry, lineMaterial);
    }

    scene.add(routeObject);
    routeRef.current = routeObject;

    // Create markers
    const markersGroup = new THREE.Group();
    const markerGeometry = new THREE.SphereGeometry(0.2, 16, 16);
    const markerMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color),
    });

    points.forEach((point) => {
      const marker = new THREE.Mesh(markerGeometry, markerMaterial);
      marker.position.set(point.position[0], point.position[1], point.position[2]);
      markersGroup.add(marker);
    });

    scene.add(markersGroup);
    markersRef.current = markersGroup;

    // Animation loop
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;

      animationFrameRef.current = requestAnimationFrame(animate);

      // Rotate camera slightly for depth effect
      const time = Date.now() * 0.0001;
      if (cameraRef.current) {
        cameraRef.current.position.x = Math.sin(time) * 2;
        cameraRef.current.lookAt(0, 0, 0);
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
      window.removeEventListener('resize', handleResize);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }

      if (routeRef.current) {
        routeRef.current.geometry.dispose();
        (routeRef.current.material as THREE.Material).dispose();
      }

      if (markersRef.current) {
        markersRef.current.children.forEach((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            (child.material as THREE.Material).dispose();
          }
        });
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
      routeRef.current = null;
      markersRef.current = null;
    };
  }, [points, color]);

  // Update route visibility based on scroll progress
  useEffect(() => {
    if (!routeRef.current) return;

    // Animate route drawing based on scroll progress
    if (routeRef.current instanceof THREE.Mesh) {
      // For tube geometry, use material opacity
      const material = routeRef.current.material as THREE.MeshStandardMaterial;
      material.opacity = scrollProgress;
      material.transparent = true;
    } else if (routeRef.current instanceof THREE.Line) {
      // For line geometry, use drawRange
      const geometry = routeRef.current.geometry;
      const totalPoints = geometry.attributes.position.count;
      const visiblePoints = Math.floor(totalPoints * scrollProgress);
      geometry.setDrawRange(0, visiblePoints);
    }

    // Show markers based on scroll progress
    if (markersRef.current) {
      markersRef.current.children.forEach((marker, index) => {
        const markerProgress = (index + 1) / markersRef.current!.children.length;
        marker.visible = scrollProgress >= markerProgress;
      });
    }
  }, [scrollProgress]);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ minHeight: '400px' }}
    />
  );
}
