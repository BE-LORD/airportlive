/**
 * WebGL Support Detection and Fallback Handling
 * 
 * Provides utilities to detect WebGL support and handle fallbacks
 */

export interface WebGLCapabilities {
  supported: boolean;
  version: 1 | 2 | null;
  maxTextureSize: number;
  maxVertexUniforms: number;
  maxFragmentUniforms: number;
  maxVaryingVectors: number;
  maxVertexAttributes: number;
  maxTextureImageUnits: number;
  renderer: string;
  vendor: string;
}

/**
 * Detect WebGL support and capabilities
 */
export function detectWebGLSupport(): WebGLCapabilities {
  if (typeof document === 'undefined') {
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0,
      maxVaryingVectors: 0,
      maxVertexAttributes: 0,
      maxTextureImageUnits: 0,
      renderer: 'unknown',
      vendor: 'unknown',
    };
  }

  const canvas = document.createElement('canvas');
  
  // Try WebGL2 first
  let gl: any = canvas.getContext('webgl2');
  let version: 1 | 2 | null = gl ? 2 : null;
  
  // Fall back to WebGL1
  if (!gl) {
    gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    version = gl ? 1 : null;
  }
  
  if (!gl) {
    return {
      supported: false,
      version: null,
      maxTextureSize: 0,
      maxVertexUniforms: 0,
      maxFragmentUniforms: 0,
      maxVaryingVectors: 0,
      maxVertexAttributes: 0,
      maxTextureImageUnits: 0,
      renderer: 'unknown',
      vendor: 'unknown',
    };
  }
  
  // Get debug info
  const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
  const renderer = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) 
    : 'unknown';
  const vendor = debugInfo 
    ? gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) 
    : 'unknown';
  
  return {
    supported: true,
    version,
    maxTextureSize: gl.getParameter(gl.MAX_TEXTURE_SIZE),
    maxVertexUniforms: gl.getParameter(gl.MAX_VERTEX_UNIFORM_VECTORS),
    maxFragmentUniforms: gl.getParameter(gl.MAX_FRAGMENT_UNIFORM_VECTORS),
    maxVaryingVectors: gl.getParameter(gl.MAX_VARYING_VECTORS),
    maxVertexAttributes: gl.getParameter(gl.MAX_VERTEX_ATTRIBS),
    maxTextureImageUnits: gl.getParameter(gl.MAX_TEXTURE_IMAGE_UNITS),
    renderer,
    vendor,
  };
}

/**
 * Check if WebGL is supported (simple check)
 */
export function isWebGLSupported(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    return !!gl;
  } catch (e) {
    return false;
  }
}

/**
 * Check if WebGL2 is supported
 */
export function isWebGL2Supported(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2');
    return !!gl;
  } catch (e) {
    return false;
  }
}

/**
 * Get recommended power preference based on device capabilities
 */
export function getRecommendedPowerPreference(): 'high-performance' | 'low-power' | 'default' {
  // Check if on battery power (if available)
  if ('getBattery' in navigator) {
    // Battery API is async, so we return default and let the app handle it
    return 'default';
  }
  
  // Check device memory
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  if (memory && memory < 4) {
    return 'low-power';
  }
  
  // Check hardware concurrency (CPU cores)
  const cores = navigator.hardwareConcurrency;
  if (cores && cores < 4) {
    return 'low-power';
  }
  
  return 'high-performance';
}

/**
 * Check if device should use reduced quality settings
 */
export function shouldUseReducedQuality(): boolean {
  const capabilities = detectWebGLSupport();
  
  if (!capabilities.supported) {
    return true;
  }
  
  // Check for low-end GPU indicators
  const renderer = capabilities.renderer.toLowerCase();
  const isLowEndGPU = 
    renderer.includes('intel') && 
    (renderer.includes('hd graphics') || renderer.includes('uhd graphics'));
  
  // Check for small texture size support (indicator of low-end device)
  const hasSmallTextureSize = capabilities.maxTextureSize < 4096;
  
  // Check device memory
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const hasLowMemory = memory && memory < 4;
  
  return !!(isLowEndGPU || hasSmallTextureSize || hasLowMemory);
}

/**
 * Get WebGL error message for user display
 */
export function getWebGLErrorMessage(): string {
  const capabilities = detectWebGLSupport();
  
  if (!capabilities.supported) {
    return 'Your browser does not support WebGL, which is required for 3D graphics. Please update your browser or try a different one.';
  }
  
  return 'WebGL is supported but encountered an error. Please try refreshing the page.';
}

/**
 * Create a fallback message element
 */
export function createWebGLFallbackElement(): HTMLDivElement {
  const fallback = document.createElement('div');
  fallback.className = 'webgl-fallback';
  fallback.style.cssText = `
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
    color: #ffffff;
    font-family: system-ui, -apple-system, sans-serif;
    text-align: center;
    padding: 2rem;
  `;
  
  const message = document.createElement('div');
  message.innerHTML = `
    <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem; font-weight: 600;">
      3D Graphics Not Available
    </h3>
    <p style="margin: 0; font-size: 1rem; opacity: 0.8; max-width: 400px;">
      ${getWebGLErrorMessage()}
    </p>
  `;
  
  fallback.appendChild(message);
  return fallback;
}
