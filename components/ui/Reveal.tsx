"use client";

import React, { ReactNode } from "react";
import { motion, Variants } from "framer-motion";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { motionEase } from "@/lib/motion";

type RevealVariant = "fade-up" | "fade" | "blur-in" | "mask-up";

interface RevealProps {
  children: ReactNode;
  className?: string;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  yOffset?: number;
  stagger?: boolean | number;
  once?: boolean;
  margin?: string;
}

export function Reveal({
  children,
  className,
  variant = "fade-up",
  delay = 0,
  duration = 0.6,
  yOffset = 30,
  stagger = false,
  once = true,
  margin = "-10% 0px -10% 0px",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, render immediately without animations/delays
  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  // Animation variants for reveal items
  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? yOffset : 0,
      filter: variant === "blur-in" ? "blur(8px)" : "blur(0px)",
      clipPath: variant === "mask-up" ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 0%)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      clipPath: "inset(0% 0% 0% 0%)",
      transition: {
        duration,
        ease: motionEase,
        delay: stagger ? 0 : delay, // stagger is controlled by the parent transition config
      },
    },
  };

  // If stagger is enabled, act as a container orchestrating the children animation
  if (stagger) {
    const staggerVal = typeof stagger === "number" ? stagger : 0.1;
    const containerVariants: Variants = {
      hidden: {},
      visible: {
        transition: {
          staggerChildren: staggerVal,
          delayChildren: delay,
        },
      },
    };

    return (
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once, margin }}
        variants={containerVariants}
        className={className}
      >
        {React.Children.map(children, (child, index) => {
          if (!child) return null;
          return (
            <motion.div key={index} variants={itemVariants} className="w-full">
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Single Reveal item animation
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin }}
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
