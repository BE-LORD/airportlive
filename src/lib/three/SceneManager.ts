/**
 * SceneManager - Manages Three.js scene lifecycle and resources
 * 
 * Responsibilities:
 * - Scene initialization and cleanup
 * - WebGL context management
 * - Resource disposal
 * - Performance monitoring
 */

import * as THREE from 'three';

export interface SceneConfig {
  antialias?: boolean;
  alpha?: boolean;
  powerPreference?: 'high-performance' | 'low-power' | 'default';
  failIfMajorPerformanceCaveat?: boolean;
}

export interface SceneManagerOptions {
  canvas?: HTMLCanvasElement;
  config?: SceneConfig;
  onContextLost?: () => void;
  onContextRestored?: () => void;
}

export class SceneManager {
  private scene: THREE.Scene | null = null;
  private camera: THREE.PerspectiveCamera | null = null;
  private renderer: THREE.WebGLRenderer | null = null;
  private animationFrameId: number | null = null;
  private isDisposed = false;
  private contextLostHandler: ((event: Event) => void) | null = null;
  private contextRestoredHandler: ((event: Event) => void) | null = null;

  constructor(private options: SceneManagerOptions = {}) {}

  /**
   * Initialize the Three.js scene
   */
  initialize(container: HTMLElement): boolean {
    if (this.isDisposed) {
      console.warn('SceneManager: Cannot initialize after disposal');
      return false;
    }

    if (!this.isWebGLSupported()) {
      console.warn('SceneManager: WebGL not supported');
      return false;
    }

    try {
      // Create scene
      this.scene = new THREE.Scene();

      // Create camera
      const aspect = container.clientWidth / container.clientHeight;
      this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
      this.camera.position.z = 5;

      // Create renderer
      const config: SceneConfig = {
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        ...this.options.config,
      };

      this.renderer = new THREE.WebGLRenderer({
        canvas: this.options.canvas,
        ...config,
      });

      this.renderer.setSize(container.clientWidth, container.clientHeight);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

      // Append canvas if not provided
      if (!this.options.canvas) {
        container.appendChild(this.renderer.domElement);
      }

      // Set up context loss handlers
      this.setupContextLossHandlers();

      return true;
    } catch (error) {
      console.error('SceneManager: Initialization failed', error);
      this.dispose();
      return false;
    }
  }

  /**
   * Check if WebGL is supported
   */
  isWebGLSupported(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      return !!gl;
    } catch (e) {
      return false;
    }
  }

  /**
   * Set up WebGL context loss handlers
   */
  private setupContextLossHandlers(): void {
    if (!this.renderer) return;

    const canvas = this.renderer.domElement;

    this.contextLostHandler = (event: Event) => {
      event.preventDefault();
      console.warn('SceneManager: WebGL context lost');
      this.stopAnimation();
      this.options.onContextLost?.();
    };

    this.contextRestoredHandler = () => {
      console.log('SceneManager: WebGL context restored');
      this.options.onContextRestored?.();
    };

    canvas.addEventListener('webglcontextlost', this.contextLostHandler);
    canvas.addEventListener('webglcontextrestored', this.contextRestoredHandler);
  }

  /**
   * Start animation loop
   */
  startAnimation(callback: (time: number) => void): void {
    if (!this.renderer || !this.scene || !this.camera) {
      console.warn('SceneManager: Cannot start animation - not initialized');
      return;
    }

    const animate = (time: number) => {
      if (this.isDisposed) return;

      this.animationFrameId = requestAnimationFrame(animate);
      
      callback(time);
      
      this.renderer!.render(this.scene!, this.camera!);
    };

    animate(0);
  }

  /**
   * Stop animation loop
   */
  stopAnimation(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  /**
   * Handle window resize
   */
  handleResize(width: number, height: number): void {
    if (!this.camera || !this.renderer) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  /**
   * Add object to scene
   */
  add(object: THREE.Object3D): void {
    if (!this.scene) {
      console.warn('SceneManager: Cannot add object - scene not initialized');
      return;
    }
    this.scene.add(object);
  }

  /**
   * Remove object from scene
   */
  remove(object: THREE.Object3D): void {
    if (!this.scene) return;
    this.scene.remove(object);
  }

  /**
   * Get scene instance
   */
  getScene(): THREE.Scene | null {
    return this.scene;
  }

  /**
   * Get camera instance
   */
  getCamera(): THREE.PerspectiveCamera | null {
    return this.camera;
  }

  /**
   * Get renderer instance
   */
  getRenderer(): THREE.WebGLRenderer | null {
    return this.renderer;
  }

  /**
   * Dispose all resources
   */
  dispose(): void {
    if (this.isDisposed) return;

    this.stopAnimation();

    // Remove context loss handlers
    if (this.renderer && (this.contextLostHandler || this.contextRestoredHandler)) {
      const canvas = this.renderer.domElement;
      if (this.contextLostHandler) {
        canvas.removeEventListener('webglcontextlost', this.contextLostHandler);
      }
      if (this.contextRestoredHandler) {
        canvas.removeEventListener('webglcontextrestored', this.contextRestoredHandler);
      }
    }

    // Dispose scene objects
    if (this.scene) {
      this.scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry?.dispose();
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((material) => material.dispose());
            } else {
              object.material.dispose();
            }
          }
        }
      });
      this.scene.clear();
      this.scene = null;
    }

    // Dispose renderer
    if (this.renderer) {
      this.renderer.dispose();
      this.renderer.forceContextLoss();
      this.renderer = null;
    }

    this.camera = null;
    this.isDisposed = true;
  }

  /**
   * Check if disposed
   */
  isDestroyed(): boolean {
    return this.isDisposed;
  }
}
