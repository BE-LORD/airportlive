'use client';

/**
 * VideoScrub - Scroll-synced video playback
 * 
 * Features:
 * - Sync video.currentTime with scroll progress
 * - Smooth scrubbing with requestAnimationFrame
 * - Loading state and error handling
 * - Respects prefers-reduced-motion
 */

import { useEffect, useRef, useState } from 'react';
import { useAnimationController } from '@/hooks/useAnimationController';

interface VideoScrubProps {
  src: string;
  className?: string;
  poster?: string;
  start?: string;
  end?: string;
}

export function VideoScrub({
  src,
  className = '',
  poster,
  start = 'top bottom',
  end = 'bottom top',
}: VideoScrubProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const { ScrollTrigger, prefersReducedMotion } = useAnimationController();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;

    if (!video || !container) return;

    // Handle video loading
    const handleLoadedMetadata = () => {
      setIsLoading(false);
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('error', handleError);

    // If reduced motion, just show the video normally
    if (prefersReducedMotion) {
      video.controls = true;
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
      };
    }

    // Wait for video to load
    if (video.readyState < 2) {
      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata);
        video.removeEventListener('error', handleError);
      };
    }

    // Create ScrollTrigger for video scrubbing
    const trigger = ScrollTrigger.create({
      trigger: container,
      start,
      end,
      scrub: 1,
      onUpdate: (self) => {
        if (!video || video.readyState < 2) return;

        // Calculate target time based on scroll progress
        const targetTime = self.progress * video.duration;

        // Use RAF for smooth scrubbing
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
        }

        rafRef.current = requestAnimationFrame(() => {
          if (video) {
            video.currentTime = targetTime;
          }
        });
      },
    });

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('error', handleError);
      
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      
      trigger.kill();
    };
  }, [ScrollTrigger, start, end, prefersReducedMotion]);

  if (hasError) {
    return (
      <div className={`flex items-center justify-center bg-gray-900 text-white ${className}`}>
        <p>Failed to load video</p>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white" />
        </div>
      )}
      
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        playsInline
        muted
        preload="metadata"
      />
    </div>
  );
}
