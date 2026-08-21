"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { usePathname } from "@/i18n/navigation";

import Wordmark from "@/components/layout/Wordmark";

/**
 * Écran d'ouverture — remplace le `.preloader` du template.
 *
 * Celui du template était retiré par jQuery après un `setTimeout` de 2 s
 * (main.js) : deux secondes d'attente imposées à chaque chargement, que la page
 * soit prête ou non, et un nœud appartenant à React supprimé par jQuery.
 * Ici, l'écran se retire dès que les polices sont prêtes ET que `minDuration`
 * est écoulé, et React reste seul propriétaire de son DOM.
 *
 * `minDuration` valait 900 ms : le voile restait donc au moins neuf dixièmes de
 * seconde même quand la page était déjà prête, puis mettait encore 860 ms à
 * s'effacer — près de deux secondes imposées sur la page la plus visitée du
 * site, et une mesure de vitesse faussée puisque le logo du voile devenait le
 * premier élément peint. Ramené à 150 ms, juste assez pour éviter un
 * clignotement d'une image si les polices répondent instantanément, et la
 * sortie ramenée de 860 à 450 ms.
 *
 * Il ne se rejoue pas dans la même session : on ne fait pas patienter deux fois
 * quelqu'un qui navigue entre les pages.
 *
 * La classe n'est PAS `.preloader` : ce nom est encore ciblé par le
 * `$(".preloader").remove()` du template, qui viendrait arracher ce composant.
 *
 * L'univers (clair patient / sombre pro) est déduit de la route, le layout
 * étant partagé. Le logo est le `Wordmark` du site — le même qu'en header et en
 * pied de page, comme demandé par la cliente.
 */
export default function SiteLoader({ minDuration = 150 }: { minDuration?: number }) {
  const t = useTranslations("loader");
  const pathname = usePathname();
  const isPro = pathname.startsWith("/pro");

  const [state, setState] = useState<"in" | "out" | "gone">("in");
  const seen = useRef(false);

  // Lecture de sessionStorage après le montage : au rendu serveur elle
  // n'existe pas, et la lire pendant le rendu créerait un écart d'hydratation.
  useEffect(() => {
    let dead = false;
    try {
      seen.current = sessionStorage.getItem("doca-loaded") === "1";
    } catch {
      seen.current = false;
    }
    if (seen.current) {
      setState("gone");
      return;
    }

    const fonts =
      typeof document !== "undefined" && document.fonts
        ? document.fonts.ready
        : Promise.resolve();

    Promise.all([fonts, new Promise((r) => setTimeout(r, minDuration))]).then(() => {
      if (dead) return;
      setState("out");
      try {
        sessionStorage.setItem("doca-loaded", "1");
      } catch {
        /* navigation privée : l'écran se rejouera, sans conséquence */
      }
      // Durée de l'iris (450 ms) + marge.
      setTimeout(() => {
        if (!dead) setState("gone");
      }, 500);
    });

    return () => {
      dead = true;
    };
  }, [minDuration]);

  if (state === "gone") return null;

  return (
    <div
      className={`sl${isPro ? " sl--pro" : ""}${state === "out" ? " sl--out" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={t("aria")}
    >
      <style>{`
        .sl {
          position: fixed;
          inset: 0;
          z-index: 5000;
          display: grid;
          place-items: center;
          background: var(--color-light-1, #f4f9fa);
        }
        /* Univers pro : le même fond sombre que le hero de /pro. */
        .sl--pro { background: #080c14; }

        /* La sortie : l'écran s'ouvre en iris sur la page. */
        .sl--out { animation: sl-iris 0.45s cubic-bezier(0.65, 0, 0.35, 1) both; }
        @keyframes sl-iris {
          from { clip-path: circle(150% at 50% 50%); }
          to { clip-path: circle(0% at 50% 50%); }
        }

        .sl__inner {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 24px;
        }

        /* Le logo du site, pas un logo de chargement : même composant qu'en
           header et en pied de page. Sa taille se pilote au font-size — c'est
           tout l'intérêt d'un logo en texte, il grandit sans perte. Ici il est
           le seul objet à l'écran, il occupe donc la place d'un titre. */
        .sl__logo {
          font-size: clamp(46px, 8vw, 78px);
          animation: sl-rise 0.64s 0.34s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes sl-rise {
          from { opacity: 0; transform: translateY(10px); letter-spacing: 0.06em; }
          to { opacity: 1; transform: none; letter-spacing: normal; }
        }

        .sl__dot {
          width: 11px;
          height: 11px;
          border-radius: 50%;
          background: var(--color-teal);
          animation: sl-dot 0.9s 0.12s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes sl-dot {
          0% { transform: scale(0.2); opacity: 0.35; }
          70%, 100% { transform: scale(1); opacity: 1; }
        }

        /* Le halo respire pendant l'attente : il dit que ça travaille, sans
           tourner comme un spinner de chargement générique. */
        .sl__halo {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300px;
          height: 300px;
          margin: -150px 0 0 -150px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(var(--color-teal-rgb), 0.22),
            transparent 65%
          );
          animation: sl-halo 1.5s 0.2s cubic-bezier(0.4, 0, 0.2, 1) infinite both;
        }
        @keyframes sl-halo {
          from { opacity: 0.5; transform: scale(0.6); }
          to { opacity: 0; transform: scale(2.1); }
        }

        @media (prefers-reduced-motion: reduce) {
          .sl, .sl *, .sl--out {
            animation-duration: 0.01ms !important;
            animation-delay: 0ms !important;
            animation-iteration-count: 1 !important;
          }
        }
      `}</style>

      <div className="sl__inner">
        <span className="sl__halo" aria-hidden="true" />
        <span className="sl__logo">
          <Wordmark tone={isPro ? "light" : "ink"} />
        </span>
        <span className="sl__dot" aria-hidden="true" />
      </div>
    </div>
  );
}
