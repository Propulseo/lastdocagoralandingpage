"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

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
  hidden: { opacity: 0, y: distance },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration, ease: "easeOut" as const },
  },
});

export function AnimatedCardsContainer({
  children,
  stagger = 0.1,
  className,
}: AnimatedCardsProps) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
    >
      {children}
    </motion.div>
  );
}

export function AnimatedCard({
  children,
  duration = 0.6,
  distance = 30,
  className,
}: {
  children: ReactNode;
  duration?: number;
  distance?: number;
  className?: string;
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return className ? <div className={className}>{children}</div> : <>{children}</>;
  }

  return (
    <motion.div className={className} variants={itemVariants(distance, duration)}>
      {children}
    </motion.div>
  );
}
