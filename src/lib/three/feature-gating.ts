/**
 * Device Tier-Based Feature Gating System
 * 
 * Controls which 3D features are enabled based on device capabilities
 */

import { detectWebGLSupport, shouldUseReducedQuality } from './webgl-support';

export type DeviceTier = 'high' | 'mid' | 'low';

export interface FeatureGates {
  // Particle system
  enableParticles: boolean;
  particleCount: number;
  
  // 3D effects
  enable3DCardTilt: boolean;
  enable3DRouteVisualization: boolean;
  
  // Rendering quality
  enableAntialiasing: boolean;
  enableShadows: boolean;
  pixelRatio: number;
  
  // Animation
  enableComplexAnimations: boolean;
  targetFPS: number;
}

/**
 * Detect device tier based on hardware capabilities
 */
export function detectDeviceTier(): DeviceTier {
  const webgl = detectWebGLSupport();
  
  // No WebGL support = low tier
  if (!webgl.supported) {
    return 'low';
  }
  
  // Check device memory
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const hasLowMemory = memory && memory < 4;
  
  // Check CPU cores
  const cores = navigator.hardwareConcurrency || 2;
  const hasLowCPU = cores < 4;
  
  // Check connection speed
  const connection = (navigator as Navigator & { connection?: { effectiveType?: string; saveData?: boolean } }).connection;
  const hasSlowConnection = connection && 
    (connection.effectiveType === 'slow-2g' || 
     connection.effectiveType === '2g' || 
     connection.saveData);
  
  // Check GPU capabilities
  const renderer = webgl.renderer.toLowerCase();
  const isLowEndGPU = 
    renderer.includes('intel') && 
    (renderer.includes('hd graphics') || renderer.includes('uhd graphics'));
  
  const hasSmallTextureSize = webgl.maxTextureSize < 4096;
  
  // Determine tier
  if (hasLowMemory || hasLowCPU || hasSlowConnection || isLowEndGPU || hasSmallTextureSize) {
    return 'low';
  }
  
  // Check for high-end indicators
  const hasHighMemory = !memory || memory >= 8;
  const hasHighCPU = cores >= 8;
  const hasLargeTextureSize = webgl.maxTextureSize >= 8192;
  const isHighEndGPU = 
    renderer.includes('nvidia') || 
    renderer.includes('amd') || 
    renderer.includes('radeon') ||
    (renderer.includes('apple') && renderer.includes('gpu'));
  
  if (hasHighMemory && hasHighCPU && (hasLargeTextureSize || isHighEndGPU)) {
    return 'high';
  }
  
  // Default to mid tier
  return 'mid';
}

/**
 * Get feature gates for a specific device tier
 */
export function getFeatureGates(tier: DeviceTier): FeatureGates {
  switch (tier) {
    case 'high':
      return {
        enableParticles: true,
        particleCount: 1000,
        enable3DCardTilt: true,
        enable3DRouteVisualization: true,
        enableAntialiasing: true,
        enableShadows: true,
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        enableComplexAnimations: true,
        targetFPS: 60,
      };
    
    case 'mid':
      return {
        enableParticles: true,
        particleCount: 500,
        enable3DCardTilt: true,
        enable3DRouteVisualization: true,
        enableAntialiasing: true,
        enableShadows: false,
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        enableComplexAnimations: true,
        targetFPS: 60,
      };
    
    case 'low':
      return {
        enableParticles: false,
        particleCount: 0,
        enable3DCardTilt: false,
        enable3DRouteVisualization: false,
        enableAntialiasing: false,
        enableShadows: false,
        pixelRatio: 1,
        enableComplexAnimations: false,
        targetFPS: 30,
      };
  }
}

/**
 * Check if a specific feature should be enabled
 */
export function isFeatureEnabled(featureName: keyof FeatureGates, tier?: DeviceTier): boolean {
  const deviceTier = tier || detectDeviceTier();
  const gates = getFeatureGates(deviceTier);
  return !!gates[featureName];
}

/**
 * Get particle count for current device
 */
export function getParticleCount(tier?: DeviceTier): number {
  const deviceTier = tier || detectDeviceTier();
  const gates = getFeatureGates(deviceTier);
  return gates.particleCount;
}

/**
 * Get pixel ratio for current device
 */
export function getPixelRatio(tier?: DeviceTier): number {
  const deviceTier = tier || detectDeviceTier();
  const gates = getFeatureGates(deviceTier);
  return gates.pixelRatio;
}

/**
 * Get target FPS for current device
 */
export function getTargetFPS(tier?: DeviceTier): number {
  const deviceTier = tier || detectDeviceTier();
  const gates = getFeatureGates(deviceTier);
  return gates.targetFPS;
}

/**
 * Check if device should use reduced quality
 */
export function shouldReduceQuality(): boolean {
  return shouldUseReducedQuality() || detectDeviceTier() === 'low';
}
