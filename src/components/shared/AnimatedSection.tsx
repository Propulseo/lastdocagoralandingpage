"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import {
  SCROLL_REVEAL_FALLBACK_MS,
  REVEAL_DISTANCE,
  REVEAL_DURATION,
  MOTION_EASE,
} from "@/components/shared/animationConstants";

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
  duration = REVEAL_DURATION,
  distance = REVEAL_DISTANCE,
  direction = "up",
  className,
  disabled = false,
  once = true,
}: AnimatedSectionProps) {
  // Hooks must run before the disabled/reduced-motion early-return (Rules of Hooks).
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, amount: 0.15 });
  const [fallback, setFallback] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setFallback(true), SCROLL_REVEAL_FALLBACK_MS);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 0); return () => clearTimeout(id); }, []);

  // `mounted` guard: useReducedMotion() is null on SSR -> avoid hydration mismatch
  // by only honoring reduced-motion AFTER the first client render.
  if (disabled || (mounted && prefersReduced)) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  const dir = directionMap[direction];
  const show = inView || fallback;

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ position: "relative" }}
      initial={{ opacity: 0, x: dir.x * distance, y: dir.y * distance }}
      animate={show ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: dir.x * distance, y: dir.y * distance }}
      transition={{ duration, delay, ease: MOTION_EASE }}
    >
      {children}
    </motion.div>
  );
}
