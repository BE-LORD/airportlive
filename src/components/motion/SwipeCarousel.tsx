"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

interface SwipeCarouselProps {
  children: React.ReactNode[];
  className?: string;
  viewportClassName?: string;
  slideClassName?: string;
  showArrows?: boolean;
  ariaLabel: string;
}

export function SwipeCarousel({
  children,
  className,
  viewportClassName,
  slideClassName,
  showArrows = false,
  ariaLabel,
}: SwipeCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "center",
    containScroll: "trimSnaps",
    dragFree: false,
    skipSnaps: false,
  });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    // eslint-disable-next-line
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className={cn("relative", className)} aria-label={ariaLabel}>
      <div ref={emblaRef} className={cn("overflow-hidden", viewportClassName)}>
        <div className="flex touch-pan-y">
          {children.map((child, index) => (
            <div
              key={index}
              className={cn(
                "min-w-0 flex-[0_0_86%] px-2 transition-transform duration-300 sm:flex-[0_0_48%] lg:flex-[0_0_33.333%]",
                selected === index ? "scale-100" : "scale-[0.96]",
                slideClassName
              )}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {showArrows ? (
        <div className="mt-6 hidden justify-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DEDBD2] text-[#101010] transition-colors hover:border-[#B88A44]"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-[#DEDBD2] text-[#101010] transition-colors hover:border-[#B88A44]"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      ) : null}

      <div className="mt-6 flex justify-center gap-2">
        {snaps.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-2 rounded-full transition-all duration-300",
              selected === index ? "w-7 bg-[#B88A44]" : "w-2 bg-[#DEDBD2]"
            )}
            aria-label={`Go to slide ${index + 1}`}
            aria-current={selected === index}
          />
        ))}
      </div>
    </div>
  );
}
