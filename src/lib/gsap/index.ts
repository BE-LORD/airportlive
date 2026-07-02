/**
 * GSAP Animation System
 * 
 * Exports all GSAP utilities and controllers
 */

export { AnimationController } from './AnimationController';
export type { AnimationOptions, TimelineOptions } from './AnimationController';

// Re-export GSAP and plugins (pre-registered via setup)
export { gsap, ScrollTrigger } from './setup';
