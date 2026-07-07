"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { SCROLL_REVEAL_FALLBACK_MS } from "@/components/shared/animationConstants";

/**
 * Déclencheur de reveal partagé du socle de mouvement.
 *
 * Renvoie une `ref` à poser sur le conteneur et un booléen `revealed` qui passe
 * à `true` quand l'élément entre dans le viewport (une seule fois). Même
 * comportement qu'AnimatedSection (seuil, fallback, reduced-motion) : compteurs,
 * cascades de cartes et reveals de section parlent ainsi un seul langage.
 *
 * - reduced-motion → `revealed` vrai d'emblée (aucune animation d'entrée) ;
 * - fallback → force `revealed` après SCROLL_REVEAL_FALLBACK_MS si l'observer
 *   reste muet (SSR, onglet en arrière-plan…).
 *
 * Usage typique (cascade CSS via motion.css) :
 *   const { ref, revealed } = useRevealInView();
 *   <ul ref={ref}>{items.map((it, i) => (
 *     <li key={it.id} className={`mo-reveal${revealed ? " mo-in" : ""}`}
 *         style={{ "--i": i } as CSSProperties}>…</li>
 *   ))}</ul>
 */
export function useRevealInView<T extends HTMLElement = HTMLDivElement>(
  amount = 0.2,
) {
  const ref = useRef<T>(null);
  const inView = useInView(ref, { once: true, amount });
  const prefersReduced = useReducedMotion();
  const [fallback, setFallback] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setFallback(true), SCROLL_REVEAL_FALLBACK_MS);
    return () => clearTimeout(id);
  }, []);
  // useReducedMotion() vaut null au SSR : n'honorer la préférence qu'après le
  // premier rendu client pour éviter un écart d'hydratation.
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  const revealed = (mounted && Boolean(prefersReduced)) || inView || fallback;
  return { ref, revealed };
}
