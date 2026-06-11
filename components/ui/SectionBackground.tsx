import Image from "next/image";
import { cn } from "@/lib/utils";

export type SectionBackgroundVariant =
  | "canvas"
  | "surface"
  | "document"
  | "route"
  | "local";

const variantClass: Record<SectionBackgroundVariant, string> = {
  canvas: "section-background--canvas",
  surface: "section-background--surface",
  document: "section-background--document",
  route: "section-background--route",
  local: "section-background--local",
};

const variantImage: Partial<Record<SectionBackgroundVariant, string>> = {
  document: "/images/bg-operational-documents.webp",
  route: "/images/bg-connected-routes.webp",
  local: "/images/bg-local-network.webp",
};

interface SectionBackgroundProps {
  variant?: SectionBackgroundVariant;
  image?: string;
  imagePosition?: string;
  className?: string;
}

export function SectionBackground({
  variant = "canvas",
  image,
  imagePosition = "center",
  className,
}: SectionBackgroundProps) {
  const backgroundImage = image ?? variantImage[variant];

  return (
    <div
      className={cn("section-background", variantClass[variant], className)}
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
