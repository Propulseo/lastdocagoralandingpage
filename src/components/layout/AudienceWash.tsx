"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "@/i18n/navigation";

type WashFn = (href: string, event: MouseEvent<HTMLElement>) => void;

const AudienceWashContext = createContext<WashFn | null>(null);

/** Le cercle a fini de couvrir l'écran : c'est là que la navigation part. */
const COVER_MS = 260;
/** Durée de la réouverture, à tenir avant de démonter le voile. */
const REVEAL_MS = 420;
/**
 * Filet de sécurité. Si la page d'arrivée n'arrive jamais (réseau coupé,
 * erreur de route), le voile resterait fermé indéfiniment : au-delà de ce
 * délai on rouvre quand même. Mieux vaut un saut brutal qu'un écran mort.
 */
const SAFETY_MS = 2500;

/**
 * Onde de bascule Patient ⇄ Pro.
 *
 * Passer du patient au pro, c'est passer d'un fond clair à un fond sombre : le
 * saut est brutal si rien ne l'accompagne. Un cercle part du bouton cliqué,
 * couvre l'écran dans la couleur de l'univers d'arrivée, la navigation se fait
 * derrière, puis le cercle se rouvre sur la nouvelle page.
 *
 * Pourquoi pas la View Transitions API, que le kit proposait : elle est absente
 * de Firefox, et surtout `router.push` de l'App Router ne rend pas la page dans
 * le callback de `startViewTransition` — le navigateur photographierait deux
 * fois l'ancien écran. Ce voile-ci ne dépend d'aucune API expérimentale et se
 * comporte pareil partout.
 *
 * Il vit dans le layout, seul endroit qui survit au changement de route : le
 * header, lui, est démonté puisque le patient et le pro n'ont pas le même.
 */
export function AudienceWashProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const [phase, setPhase] = useState<"idle" | "cover" | "reveal">("idle");
  const [toPro, setToPro] = useState(false);
  const pending = useRef<string | null>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const ids = timers.current;
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  const reveal = useCallback(() => {
    pending.current = null;
    setPhase("reveal");
    const id = window.setTimeout(() => setPhase("idle"), REVEAL_MS);
    timers.current.push(id);
  }, []);

  /* La page d'arrivée est montée : le voile se rouvre dessus. */
  useEffect(() => {
    if (pending.current && pathname === pending.current) reveal();
  }, [pathname, reveal]);

  const wash = useCallback<WashFn>(
    (href, event) => {
      const reduce =
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (reduce) {
        router.push(href);
        return;
      }

      event.preventDefault();

      // Le cercle naît au centre du bouton cliqué, pas au centre de l'écran.
      const rect = event.currentTarget.getBoundingClientRect();
      const root = document.documentElement;
      root.style.setProperty(
        "--aw-x",
        `${((rect.left + rect.width / 2) / window.innerWidth) * 100}%`,
      );
      root.style.setProperty(
        "--aw-y",
        `${((rect.top + rect.height / 2) / window.innerHeight) * 100}%`,
      );

      setToPro(href.startsWith("/pro"));
      setPhase("cover");
      pending.current = href;

      // Le téléchargement de la page part MAINTENANT, pendant que le cercle se
      // ferme : ces 260 ms deviennent du temps utile. La navigation, elle,
      // reste différée — la monter plus tôt ferait apparaître la page d'arrivée
      // dans le coin d'écran que le cercle n'a pas encore couvert.
      router.prefetch(href);

      // La navigation part quand l'écran est couvert : elle se fait à l'abri.
      const nav = window.setTimeout(() => router.push(href), COVER_MS);
      // Filet : la page d'arrivée n'est jamais venue, on rouvre quand même.
      const safety = window.setTimeout(() => {
        if (pending.current === href) reveal();
      }, SAFETY_MS);
      timers.current.push(nav, safety);
    },
    [router, reveal],
  );

  return (
    <AudienceWashContext.Provider value={wash}>
      {children}
      {phase !== "idle" && (
        <span
          className={`aw aw--${phase}${toPro ? " aw--pro" : ""}`}
          aria-hidden="true"
        />
      )}
      <style>{`
        .aw {
          position: fixed;
          inset: 0;
          z-index: 4000;
          pointer-events: none;
          background: var(--color-light-1, #f4f9fa);
        }
        /* Le voile porte la couleur de l'univers d'ARRIVÉE : on voit où l'on va
           avant même que la page soit là. */
        .aw--pro { background: #080c14; }

        /* Durées serrées : une transition de navigation doit accompagner le
           clic, pas le faire attendre. Couvrir va plus vite que rouvrir, parce
           que l'œil accepte d'être masqué mais pas de patienter devant du vide. */
        .aw--cover { animation: aw-cover 0.28s cubic-bezier(0.65, 0, 0.35, 1) both; }
        .aw--reveal { animation: aw-reveal 0.4s cubic-bezier(0.65, 0, 0.35, 1) both; }

        @keyframes aw-cover {
          from { clip-path: circle(0% at var(--aw-x, 76%) var(--aw-y, 8%)); }
          to { clip-path: circle(160% at var(--aw-x, 76%) var(--aw-y, 8%)); }
        }
        @keyframes aw-reveal {
          from { clip-path: circle(160% at var(--aw-x, 76%) var(--aw-y, 8%)); }
          to { clip-path: circle(0% at var(--aw-x, 76%) var(--aw-y, 8%)); }
        }

        @media (prefers-reduced-motion: reduce) {
          .aw { display: none; }
        }
      `}</style>
    </AudienceWashContext.Provider>
  );
}

/**
 * Renvoie la fonction de bascule, ou `null` hors du provider — l'appelant
 * retombe alors sur une navigation normale plutôt que de planter.
 */
export function useAudienceWash() {
  return useContext(AudienceWashContext);
}
