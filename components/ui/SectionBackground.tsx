import Image from "next/image";
import { cn } from "@/lib/utils";

export type SectionBackgroundVariant =
  | "canvas"
  | "surface"
  | "cinematic"
  | "functional"
  | "document"
  | "route"
  | "local";

const variantClass: Record<SectionBackgroundVariant, string> = {
  canvas: "section-background--canvas",
  surface: "section-background--surface",
  cinematic: "section-background--cinematic",
  functional: "section-background--functional",
  document: "section-background--document",
  route: "section-background--route",
  local: "section-background--local",
};

const variantImage: Partial<Record<SectionBackgroundVariant, string>> = {
  cinematic: "/images/bg-connected-routes.webp",
  document: "/images/bg-operational-documents.webp",
  route: "/images/bg-connected-routes.webp",
  local: "/images/bg-local-network.webp",
};

export type SectionBackgroundDensity = "quiet" | "balanced" | "rich";

interface SectionBackgroundProps {
  variant?: SectionBackgroundVariant;
  image?: string;
  imagePosition?: string;
  density?: SectionBackgroundDensity;
  transition?: "none" | "top" | "bottom" | "both";
  className?: string;
}

export function SectionBackground({
  variant = "canvas",
  image,
  imagePosition = "center",
  density = "balanced",
  transition = "both",
  className,
}: SectionBackgroundProps) {
  const backgroundImage = image ?? variantImage[variant];

  return (
    <div
      className={cn("section-background", variantClass[variant], className)}
      data-density={density}
      data-transition={transition}
      aria-hidden="true"
    >
      {backgroundImage ? (
        <Image
          src={backgroundImage}
          alt=""
          fill
          className="section-background__image"
          style={{ objectPosition: imagePosition }}
          sizes="100vw"
        />
      ) : null}
      <span className="section-background__wash" />
      <span className="section-background__grid" />
      <span className="section-background__glow section-background__glow--primary" />
      <span className="section-background__glow section-background__glow--secondary" />
    </div>
  );
}
