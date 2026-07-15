/**
 * GSAP Animation System
 * 
 * Exports all GSAP utilities and controllers
 */

export { AnimationController } from './AnimationController';
export type { AnimationOptions, TimelineOptions } from './AnimationController';

// Re-export GSAP and plugins for convenience
export { default as gsap } from 'gsap';
export { ScrollTrigger } from 'gsap/ScrollTrigger';
