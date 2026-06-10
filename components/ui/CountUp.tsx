"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: number;
  decimals?: number;
  suffix?: string;
}

export function CountUp({ value, decimals = 0, suffix = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const isReduced = useReducedMotion();

  const springValue = useSpring(motionValue, {
    damping: 35,
    stiffness: 90,
  });

  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    if (isReduced) {
      if (ref.current) {
        ref.current.textContent = value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",") + suffix;
      }
      return;
    }

    return springValue.on("change", (latest: number) => {
      if (ref.current) {
        const formatted = latest.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        ref.current.textContent = formatted + suffix;
      }
    });
  }, [springValue, decimals, value, suffix, isReduced]);

  return (
    <span ref={ref} className="font-bold font-display">
      {isReduced ? `${value.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}` : `0${suffix}`}
    </span>
  );
}
