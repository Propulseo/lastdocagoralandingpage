"use client";

import { type ReactNode, useRef, useState, useEffect } from "react";
import { motion, useReducedMotion, useInView } from "framer-motion";
import { SCROLL_REVEAL_FALLBACK_MS } from "@/components/shared/animationConstants";

interface AnimatedCardsProps {
  children: ReactNode;
  stagger?: number;
  duration?: number;
  distance?: number;
  className?: string;
}

const containerVariants = (stagger: number) => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

const itemVariants = (distance: number, duration: number) => ({
  hidden: { opacity: 0, y: distance, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration, ease: "easeOut" as const },
  },
});

export function AnimatedCardsContainer({
  children,
  stagger = 0.1,
  className,
}: AnimatedCardsProps) {
  // Hooks must run before the disabled/reduced-motion early-return (Rules of Hooks).
  const prefersReduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const [fallback, setFallback] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const id = setTimeout(() => setFallback(true), SCROLL_REVEAL_FALLBACK_MS);
    return () => clearTimeout(id);
  }, []);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 0); return () => clearTimeout(id); }, []);

  // `mounted` guard: useReducedMotion() is null on SSR -> avoid hydration mismatch
  // by only honoring reduced-motion AFTER the first client render.
  if (mounted && prefersReduced) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  const show = inView || fallback;

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
  duration = 0.6,
  distance = 50,
  className,
}: {
  children: ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { const id = setTimeout(() => setMounted(true), 0); return () => clearTimeout(id); }, []);

  // `mounted` guard: useReducedMotion() is null on SSR -> avoid hydration mismatch
  // by only honoring reduced-motion AFTER the first client render.
  if (mounted && prefersReduced) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div className={className} variants={itemVariants(distance, duration)}>
      {children}
    </motion.div>
  );
}
