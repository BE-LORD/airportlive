import Image from "next/image";
import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type SharedImageProps = Omit<
  ComponentProps<typeof Image>,
  | "src"
  | "alt"
  | "sizes"
  | "className"
  | "fill"
  | "width"
  | "height"
  | "loading"
  | "preload"
  | "priority"
  | "style"
> & {
  src: string;
  mobileSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  objectPosition?: string;
  mobileObjectPosition?: string;
  objectFit?: "cover" | "contain";
};

type FillImageProps = SharedImageProps & {
  fill: true;
  width?: never;
  height?: never;
};

type FixedImageProps = SharedImageProps & {
  fill?: false;
  width: number;
  height: number;
};

export type ResponsiveImageProps = FillImageProps | FixedImageProps;

export function ResponsiveImage({
  src,
  mobileSrc,
  alt,
  className,
  priority = false,
  sizes,
  objectPosition,
  mobileObjectPosition,
  objectFit = "cover",
  fill,
  ...props
}: ResponsiveImageProps) {
  const hasArtDirectionMetadata = Boolean(mobileSrc || mobileObjectPosition);
  const imageClassName = cn(
    objectFit === "contain" ? "object-contain" : "object-cover",
    hasArtDirectionMetadata && "responsive-image-art-directed",
    className
  );
  const resolvedObjectPosition = objectPosition ?? mobileObjectPosition;
  const style = resolvedObjectPosition ? { objectPosition: resolvedObjectPosition } : undefined;

  if (fill) {
    return (
      <Image
        {...props}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? undefined : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        preload={priority}
        decoding="async"
        className={imageClassName}
        style={style}
      />
    );
  }

  return (
    <Image
      {...props}
      src={src}
      alt={alt}
      width={props.width}
      height={props.height}
      sizes={sizes}
      loading={priority ? undefined : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      preload={priority}
      decoding="async"
      className={imageClassName}
      style={style}
    />
  );
}
