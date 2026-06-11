import Image from "next/image";
import { Container } from "./Container";
import { AmbientVideo } from "./AmbientVideo";

import { cn } from "@/lib/utils";

interface InteriorHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  video?: { mp4: string; webm?: string; poster: string };
  /** Shorter hero for content-dense pages (service files). */
  compact?: boolean;
  imagePosition?: string;
  overlay?: "strong" | "balanced" | "soft";
}

const overlayClass = {
  strong: "interior-hero--strong",
  balanced: "interior-hero--balanced",
  soft: "interior-hero--soft",
};

export function InteriorHero({
  eyebrow,
  title,
  description,
  image,
  video,
  compact,
  imagePosition = "center",
  overlay = "balanced",
}: InteriorHeroProps) {
  return (
    <section
      className={cn(
        "interior-hero relative flex items-end overflow-hidden border-b border-white/8 bg-[#050810] pt-28",
        overlayClass[overlay],
        compact ? "min-h-[42vh] pb-12" : "min-h-[66vh] pb-16 md:pb-24"
      )}
    >
      {(video || image) && (
        <div className="absolute inset-0" aria-hidden="true">
          {video ? (
            <div className="absolute inset-0 opacity-45">
              <AmbientVideo mp4={video.mp4} webm={video.webm} poster={video.poster} alt="" priority />
            </div>
          ) : (
            <Image
              src={image!}
              alt=""
              fill
              priority
              className="interior-hero__image object-cover"
              style={{ objectPosition: imagePosition }}
              sizes="100vw"
            />
          )}
          <div className="interior-hero__horizontal-wash absolute inset-0" />
          <div className="interior-hero__vertical-wash absolute inset-0" />
        </div>
      )}
      <div className="absolute inset-0 editorial-grid opacity-40" />
      <Container className="relative z-10">
        <span className="type-kicker">{eyebrow}</span>
        <h1
          className={cn(
            "type-hero mt-6 max-w-5xl text-balance text-text",
            compact ? "type-hero--compact" : ""
          )}
        >
          {title}
        </h1>
        <p className="type-lead mt-7 max-w-2xl text-text-muted">{description}</p>
      </Container>
    </section>
  );
}
