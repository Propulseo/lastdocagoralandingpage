"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";

/* ============================================================
   PointerTilt — l'objet signature d'une page s'incline très
   légèrement vers le pointeur, puis revient à plat quand on
   s'éloigne. Il devient un objet posé dans l'espace plutôt
   qu'une image collée sur le fond.

   Règles d'emploi (elles font toute la différence entre un
   effet premium et un gadget) :
   - UN SEUL élément par page, celui qui porte la démonstration ;
   - amplitude faible (8° par défaut) ;
   - retour à plat lent, suivi du pointeur rapide ;
   - coupé net sous prefers-reduced-motion, et jamais activé sur
     un pointeur grossier (doigt) : sur mobile il n'y a pas de
     survol, l'inclinaison resterait figée après un appui.

   Le transform est écrit sur un wrapper dédié : l'enfant garde
   le sien (échelle de la carte vedette, cascade du socle motion).
   ============================================================ */

export default function PointerTilt({
  children,
  className,
  style,
  maxDeg = 8,
  lift = 10,
  ariaHidden,
}: {
  children: ReactNode;
  className?: string;
  /** Reçu tel quel de RevealCascade, qui y pose --mo-delay et --mo-i :
   *  sans ce passe-plat, l'élément sortirait de la cascade. */
  style?: CSSProperties;
  /** Inclinaison maximale, en degrés, sur chaque axe. */
  maxDeg?: number;
  /** Rapprochement vers l'œil, en pixels. */
  lift?: number;
  /** À passer quand le contenu est purement décoratif (maquette produit). */
  ariaHidden?: boolean;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  function apply(x: number, y: number, fast: boolean) {
    const node = innerRef.current;
    if (!node) return;
    node.style.transition = fast
      ? "transform 0.12s linear"
      : "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    node.style.transform = `rotateY(${x * maxDeg}deg) rotateX(${-y * maxDeg}deg) translateZ(${lift}px)`;
  }

  function handleMove(event: React.PointerEvent<HTMLDivElement>) {
    // Pointeur grossier (doigt) : pas de survol, donc pas d'inclinaison.
    if (prefersReduced || event.pointerType !== "mouse") return;
    const host = hostRef.current;
    if (!host) return;
    const rect = host.getBoundingClientRect();
    apply(
      (event.clientX - rect.left) / rect.width - 0.5,
      (event.clientY - rect.top) / rect.height - 0.5,
      true,
    );
  }

  function handleLeave() {
    const node = innerRef.current;
    if (!node) return;
    node.style.transition = "transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)";
    node.style.transform = "";
  }

  return (
    <div
      ref={hostRef}
      className={className}
      style={{ ...style, perspective: "1000px" }}
      aria-hidden={ariaHidden}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div
        ref={innerRef}
        style={{ transformStyle: "preserve-3d", display: "flex", width: "100%" }}
      >
        {children}
      </div>
    </div>
  );
}
