/**
 * AnimationController - Singleton class for managing GSAP animations
 * 
 * Features:
 * - Timeline and ScrollTrigger registration
 * - Prefers-reduced-motion detection and handling
 * - Animation cleanup and disposal
 * - Global animation state management
 */

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface AnimationOptions {
  duration?: number;
  ease?: string;
  delay?: number;
  stagger?: number | object;
  scrollTrigger?: ScrollTrigger.Vars;
}

export interface TimelineOptions {
  id: string;
  paused?: boolean;
  repeat?: number;
  yoyo?: boolean;
  onComplete?: () => void;
}

class AnimationControllerClass {
  private timelines: Map<string, gsap.core.Timeline> = new Map();
  private scrollTriggers: Map<string, ScrollTrigger> = new Map();
  private prefersReducedMotion: boolean = false;
  private initialized: boolean = false;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initialize();
    }
  }

  /**
   * Initialize the animation controller
   */
  private initialize(): void {
    if (this.initialized) return;

    // Detect prefers-reduced-motion
    this.detectReducedMotion();

    // Listen for changes to prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    mediaQuery.addEventListener('change', () => {
      this.detectReducedMotion();
      this.handleReducedMotionChange();
    });

    this.initialized = true;
  }

  /**
   * Detect if user prefers reduced motion
   */
  private detectReducedMotion(): void {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.prefersReducedMotion = mediaQuery.matches;
  }

  /**
   * Handle changes to reduced motion preference
   */
  private handleReducedMotionChange(): void {
    if (this.prefersReducedMotion) {
      // Pause all animations
      this.pauseAll();
      
      // Kill all ScrollTriggers
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    } else {
      // Resume all animations
      this.resumeAll();
    }
  }

  /**
   * Check if reduced motion is preferred
   */
  isPrefersReducedMotion(): boolean {
    return this.prefersReducedMotion;
  }

  /**
   * Create and register a timeline
   */
  createTimeline(options: TimelineOptions): gsap.core.Timeline | null {
    if (this.prefersReducedMotion) {
      return null;
    }

    const timeline = gsap.timeline({
      paused: options.paused,
      repeat: options.repeat,
      yoyo: options.yoyo,
      onComplete: options.onComplete,
    });

    this.timelines.set(options.id, timeline);
    return timeline;
  }

  /**
   * Get a registered timeline by ID
   */
  getTimeline(id: string): gsap.core.Timeline | undefined {
    return this.timelines.get(id);
  }

  /**
   * Remove and kill a timeline
   */
  removeTimeline(id: string): void {
    const timeline = this.timelines.get(id);
    if (timeline) {
      timeline.kill();
      this.timelines.delete(id);
    }
  }

  /**
   * Create an animation with optional ScrollTrigger
   */
  animate(
    target: gsap.TweenTarget,
    vars: gsap.TweenVars,
    options?: AnimationOptions
  ): gsap.core.Tween | null {
    if (this.prefersReducedMotion) {
      // Apply end state immediately
      gsap.set(target, vars);
      return null;
    }

    const tweenVars: gsap.TweenVars = {
      ...vars,
      duration: options?.duration,
      ease: options?.ease,
      delay: options?.delay,
      stagger: options?.stagger,
    };

    if (options?.scrollTrigger) {
      tweenVars.scrollTrigger = options.scrollTrigger;
    }

    return gsap.to(target, tweenVars);
  }

  /**
   * Create a ScrollTrigger animation
   */
  createScrollTrigger(
    id: string,
    config: ScrollTrigger.Vars
  ): ScrollTrigger | null {
    if (this.prefersReducedMotion) {
      return null;
    }

    const trigger = ScrollTrigger.create(config);
    this.scrollTriggers.set(id, trigger);
    return trigger;
  }

  /**
   * Get a registered ScrollTrigger by ID
   */
  getScrollTrigger(id: string): ScrollTrigger | undefined {
    return this.scrollTriggers.get(id);
  }

  /**
   * Remove and kill a ScrollTrigger
   */
  removeScrollTrigger(id: string): void {
    const trigger = this.scrollTriggers.get(id);
    if (trigger) {
      trigger.kill();
      this.scrollTriggers.delete(id);
    }
  }

  /**
   * Pause all animations
   */
  pauseAll(): void {
    this.timelines.forEach((timeline) => timeline.pause());
    gsap.globalTimeline.pause();
  }

  /**
   * Resume all animations
   */
  resumeAll(): void {
    this.timelines.forEach((timeline) => timeline.resume());
    gsap.globalTimeline.resume();
  }

  /**
   * Kill all animations and ScrollTriggers
   */
  killAll(): void {
    this.timelines.forEach((timeline) => timeline.kill());
    this.timelines.clear();

    this.scrollTriggers.forEach((trigger) => trigger.kill());
    this.scrollTriggers.clear();

    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  /**
   * Refresh all ScrollTriggers
   */
  refreshScrollTriggers(): void {
    ScrollTrigger.refresh();
  }

  /**
   * Get GSAP instance
   */
  getGSAP(): typeof gsap {
    return gsap;
  }

  /**
   * Get ScrollTrigger plugin
   */
  getScrollTriggerPlugin(): typeof ScrollTrigger {
    return ScrollTrigger;
  }
}

// Export singleton instance
export const AnimationController = new AnimationControllerClass();
