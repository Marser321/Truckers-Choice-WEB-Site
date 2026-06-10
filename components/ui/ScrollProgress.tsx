"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function ScrollProgress() {
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Add smooth spring physics to the progress bar
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Skip rendering if reduced motion is preferred by the user
  if (shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] bg-[#FFB020] origin-left z-[9999]"
      style={{ scaleX }}
    />
  );
}
