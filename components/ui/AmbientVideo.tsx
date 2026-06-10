"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { cn } from "@/lib/utils";

interface AmbientVideoProps {
  mp4: string;
  webm?: string;
  poster: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function AmbientVideo({
  mp4,
  webm,
  poster,
  alt,
  className,
  priority = false,
}: AmbientVideoProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || reducedMotion) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          void videoRef.current?.play().catch(() => undefined);
        } else {
          videoRef.current?.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.05 }
    );

    observer.observe(wrapper);
    return () => observer.disconnect();
  }, [reducedMotion]);

  return (
    <div ref={wrapperRef} className={cn("relative h-full w-full overflow-hidden", className)}>
      <Image src={poster} alt={alt} fill priority={priority} className="object-cover" sizes="100vw" />
      {shouldLoad && !reducedMotion && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
          className="absolute inset-0 h-full w-full object-cover"
          aria-hidden="true"
        >
          {webm && <source src={webm} type="video/webm" />}
          <source src={mp4} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
