"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Equivalent local de `react-countup` avec `enableScrollSpy` : le compteur
 * demarre quand la section entre dans le champ, une seule fois.
 *
 * Ecrit a la main plutot qu'ajoute en dependance : le template tire
 * react-countup pour ce seul usage, et une maquette jetable ne justifie pas
 * une dependance de plus dans le landing.
 *
 * IMPORTANT — la valeur de depart est la valeur FINALE, jamais zero. Ces
 * compteurs portent des faits (« 100 % de praticiens verifies », « 3 langues ») :
 * afficher 0 tant que l'animation n'a pas tourne n'est pas un contenu absent,
 * c'est un contenu FAUX — y compris dans le rendu serveur et sans JavaScript.
 * L'animation ne fait que rejouer la montee, et elle s'amorce 300 px avant que
 * le compteur n'entre dans le champ pour que le retour a zero reste hors ecran.
 */
export default function MedCountUp({ end, duration = 1800 }: { end: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const [value, setValue] = useState(end);
  const [mounted, setMounted] = useState(false);
  const started = useRef(false);

  // Serveur et premier rendu client identiques (pas d'ecart d'hydratation) :
  // l'animation ne peut demarrer qu'apres.
  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const start = performance.now();
        function tick(now: number) {
          const progress = Math.min(1, (now - start) / duration);
          // Sortie amortie : rapide au debut, freine a l'arrivee.
          const eased = 1 - Math.pow(1 - progress, 3);
          setValue(Math.round(end * eased));
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      },
      { threshold: 0, rootMargin: "300px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [mounted, duration, end]);

  return <span ref={ref}>{value}</span>;
}
