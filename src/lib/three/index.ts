/**
 * Three.js Infrastructure
 * 
 * Exports all Three.js utilities and managers
 */

export { SceneManager } from './SceneManager';
export type { SceneConfig, SceneManagerOptions } from './SceneManager';

export {
  detectWebGLSupport,
  isWebGLSupported,
  isWebGL2Supported,
  getRecommendedPowerPreference,
  shouldUseReducedQuality,
  getWebGLErrorMessage,
  createWebGLFallbackElement,
} from './webgl-support';
export type { WebGLCapabilities } from './webgl-support';

export {
  detectDeviceTier,
  getFeatureGates,
  isFeatureEnabled,
  getParticleCount,
  getPixelRatio,
  getTargetFPS,
  shouldReduceQuality,
} from './feature-gating';
export type { DeviceTier, FeatureGates } from './feature-gating';
