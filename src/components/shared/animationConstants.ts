/* ============================================================
   Langage de mouvement partagé (socle) — repris de la démo validée.
   Source de vérité TS ; le pendant CSS (mêmes valeurs) vit dans
   src/styles/motion.css. Garder les deux en phase.
   ============================================================ */

/** Délai (ms) avant de forcer l'apparition si l'observer reste muet. */
export const SCROLL_REVEAL_FALLBACK_MS = 1500;

/** Marge viewport du fallback manuel, en fraction de hauteur d'ecran. */
export const REVEAL_FALLBACK_VIEWPORT_MARGIN = 0.18;

/** Courbe d'accélération commune à tous les reveals (cubic-bezier). */
export const MOTION_EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Reveal : glissé vertical (px) et durée (s). */
export const REVEAL_DISTANCE = 26;
export const REVEAL_DURATION = 0.7;

/** Cascade : décalage (s) entre deux sous-éléments successifs. */
export const STAGGER_STEP = 0.09;
