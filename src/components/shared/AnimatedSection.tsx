"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  distance?: number;
  direction?: "up" | "down" | "left" | "right";
  className?: string;
  disabled?: boolean;
  once?: boolean;
}

const directionMap = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export default function AnimatedSection({
  children,
  delay = 0,
  duration = 0.8,
  distance = 60,
  direction = "up",
  className,
  disabled = false,
  once = false,
}: AnimatedSectionProps) {
  const prefersReduced = useReducedMotion();

  if (disabled || prefersReduced) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  const dir = directionMap[direction];

  return (
    <motion.div
      className={className}
      style={{ position: "relative" }}
      initial={{ opacity: 0, x: dir.x * distance, y: dir.y * distance }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.15 }}
      transition={{ duration, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
