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
  alt: string;
  className?: string;
  priority?: boolean;
  sizes: string;
  objectPosition?: string;
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
  alt,
  className,
  priority = false,
  sizes,
  objectPosition,
  fill,
  ...props
}: ResponsiveImageProps) {
  const imageClassName = cn("object-cover", className);
  const style = objectPosition ? { objectPosition } : undefined;

  if (fill) {
    return (
      <Image
        {...props}
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        loading={priority ? undefined : "lazy"}
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
      preload={priority}
      decoding="async"
      className={imageClassName}
      style={style}
    />
  );
}
