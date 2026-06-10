import Image from "next/image";
import { Container } from "./Container";
import { AmbientVideo } from "./AmbientVideo";

interface InteriorHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image?: string;
  video?: { mp4: string; webm?: string; poster: string };
}

export function InteriorHero({ eyebrow, title, description, image, video }: InteriorHeroProps) {
  return (
    <section className="relative flex min-h-[66vh] items-end overflow-hidden border-b border-white/8 bg-[#050810] pb-16 pt-28 md:pb-24">
      {(video || image) && (
        <div className="absolute inset-0" aria-hidden="true">
          {video ? (
            <div className="absolute inset-0 opacity-45">
              <AmbientVideo mp4={video.mp4} webm={video.webm} poster={video.poster} alt="" priority />
            </div>
          ) : (
            <Image src={image!} alt="" fill priority className="object-cover opacity-45" sizes="100vw" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050810] via-[#050810]/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050810] via-transparent to-[#050810]/50" />
        </div>
      )}
      <div className="absolute inset-0 editorial-grid opacity-40" />
      <Container className="relative z-10">
        <span className="text-xs font-bold uppercase tracking-[0.28em] text-accent">{eyebrow}</span>
        <h1 className="mt-6 max-w-5xl text-balance font-display text-5xl font-bold leading-[0.92] tracking-[-0.05em] text-text md:text-8xl">{title}</h1>
        <p className="mt-7 max-w-2xl text-base leading-relaxed text-text-muted md:text-lg">{description}</p>
      </Container>
    </section>
  );
}
