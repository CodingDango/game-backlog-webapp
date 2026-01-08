"use client"; // Why? Because we need state.

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/utils";
import Image, { ImageProps } from "next/image"; // We extend standard Next Image props

interface AppImageProps extends ImageProps {
  wrapperClassName?: string;
}

export function AppImage({
  src,
  alt,
  className,
  wrapperClassName,
  ...props
}: AppImageProps) {
  // TODO #1: Create a state variable called 'isLoading'.
  const [isLoading, setLoading] = useState(true);

  return (
    <div className={cn("relative overflow-hidden w-full h-full", wrapperClassName)}>
      {isLoading && (
        <Skeleton className="absolute inset-0 z-10 h-full w-full" />
      )}

      <Image
        src={src}
        alt={alt}
        {...props}
        className={cn(
          className,
          "transition-all duration-300 w-full h-full object-cover rounded-md",
          isLoading ? "opacity-0" : "opacity-100"
        )}
        onLoadingComplete={() => setLoading(false)}
      />
    </div>
  );
}
