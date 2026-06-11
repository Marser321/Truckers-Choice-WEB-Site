import Image from "next/image";
import { cn } from "@/lib/utils";

export type CatalogCardVariant = "media" | "file" | "route" | "active";

const variantClass: Record<CatalogCardVariant, string> = {
  media: "catalog-card--media",
  file: "catalog-card--file",
  route: "catalog-card--route",
  active: "catalog-card--active",
};

export function catalogCardClass(variant: CatalogCardVariant, className?: string) {
  return cn("catalog-card", variantClass[variant], className);
}

interface CatalogCardVisualProps {
  variant: CatalogCardVariant;
  image?: string;
  index?: number;
}

export function CatalogCardVisual({ variant, image, index }: CatalogCardVisualProps) {
  return (
    <>
      {variant === "media" && image ? (
        <Image
          src={image}
          alt=""
          fill
          className="catalog-card__image"
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      ) : null}
      <span className="catalog-card__visual" aria-hidden="true" />
      {typeof index === "number" ? (
        <span className="catalog-card__index" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
    </>
  );
}
