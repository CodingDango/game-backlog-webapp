"use client"; // Why? Because we need state.

import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import Image, { ImageProps } from "next/image"; // We extend standard Next Image props
import NotFoundCard from "./NotFoundCard";

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
  const [isLoading, setLoading] = useState(true);
  const handleLoadingComplete = () => setLoading(false);

  return (
    <div
      className={cn("relative overflow-hidden w-full h-full", wrapperClassName)}
    >
      {!!src || src?.length ? (
        <Image
          {...props}
          src={src}
          alt={alt}
          onLoad={handleLoadingComplete}
          className={cn(
            className,
            "transition-all duration-300 w-full h-full object-cover rounded-md",
            isLoading ? "opacity-0" : "opacity-100",
          )}
        />
      ) : (
        <NotFoundCard />
      )}

      {isLoading && <Skeleton className="absolute inset-0 z-5 rounded-md"/>}

    </div>
  );
}
