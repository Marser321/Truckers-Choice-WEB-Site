"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ExpandableSectionProps {
  summary: ReactNode;
  children: ReactNode;
  /** Anchor id; when the URL hash matches, the section opens and scrolls into view. */
  id?: string;
  defaultOpen?: boolean;
  className?: string;
}

export function ExpandableSection({ summary, children, id, defaultOpen, className }: ExpandableSectionProps) {
  const ref = useRef<HTMLDetailsElement>(null);

  useEffect(() => {
    if (!id) return;
    const openFromHash = () => {
      if (window.location.hash.slice(1) !== id || !ref.current) return;
      ref.current.open = true;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      ref.current.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    };
    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [id]);

  return (
    <details
      ref={ref}
      id={id}
      open={defaultOpen}
      className={cn(
        "group scroll-mt-28 rounded-2xl border border-white/8 bg-white/[0.03] transition-colors open:border-white/15",
        className
      )}
    >
      <summary className="flex cursor-pointer list-none items-center gap-4 p-5 [&::-webkit-details-marker]:hidden">
        {summary}
        <ChevronDown
          className="ml-auto h-5 w-5 shrink-0 text-text-muted transition-transform duration-300 group-open:rotate-180"
          aria-hidden="true"
        />
      </summary>
      <div className="px-5 pb-6">{children}</div>
    </details>
  );
}
