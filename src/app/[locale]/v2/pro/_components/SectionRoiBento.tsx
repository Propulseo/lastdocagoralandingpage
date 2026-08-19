"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import { useRevealInView } from "@/components/shared/useRevealInView";

/* ============================================================
   SectionRoiBento, V2 PRO "Le retour, en grand"
   THEMEABLE : toutes les couleurs passent par les tokens --v2-*
   herites de .v2p (dark/light/mixte + contrast). Aucune couleur
   en dur. Prefixe CSS "v2roi-".
   Compteurs animes conserves (useCountUp + useInView, SSR-safe,
   cleanup RAF / IntersectionObserver). Chiffres ILLUSTRATIFS.

   SSR-SAFETY : valeur initiale = valeur finale (aucun ecart
   serveur/client). L'animation ne demarre qu'apres hydratation
   (mounted flag, setTimeout 0ms). prefersReducedMotion() n'est
   jamais appele pendant le rendu — uniquement dans les effets.
   ============================================================ */

/* NOTE dedup vs Hero3 :
   Hero3 affiche la barre de metriques avec des etiquettes
   courtes ("-40 % de rendez-vous manques", "8 h gagnees /
   semaine", "+30 % de nouveaux patients"). Ce bento approfondit
   chaque chiffre avec un contexte metier detaille et ajoute
   trois indicateurs supplementaires (specialites, langues, cout).
   Les descriptions (.sub) ne reproduisent pas les labels
   concis du hero. */

type BentoAccent = "teal" | "cobalt" | "neutral";

type BentoMetric = {
  id: string;
  prefix: string;
  to: number;
  suffix: string;
  decimals: number;
  span: "wide" | "normal";
  accent: BentoAccent;
};

const BENTO_METRICS: BentoMetric[] = [
  {
    id: "b-faltas",
    prefix: "−",
    to: 40,
    suffix: "%",
    decimals: 0,
    span: "wide",
    accent: "teal",
  },
  {
    id: "b-horas",
    prefix: "",
    to: 8,
    suffix: "h",
    decimals: 0,
    span: "normal",
    accent: "cobalt",
  },
  {
    id: "b-pacientes",
    prefix: "+",
    to: 30,
    suffix: "%",
    decimals: 0,
    span: "normal",
    accent: "neutral",
  },
  {
    id: "b-especialidades",
    prefix: "",
    to: 16,
    suffix: "",
    decimals: 0,
    span: "normal",
    accent: "cobalt",
  },
  {
    id: "b-idiomas",
    prefix: "",
    to: 3,
    suffix: "",
    decimals: 0,
    span: "normal",
    accent: "teal",
  },
  {
    id: "b-custo",
    prefix: "",
    to: 0,
    suffix: "€",
    decimals: 0,
    span: "wide",
    accent: "teal",
  },
];

/* ── Hook : compteur anime declenche a l'entree dans le viewport ── */
function useCountUp(
  to: number,
  decimals: number,
  start: boolean,
  durationMs = 1400,
): string {
  /* Initialise TOUJOURS a la valeur finale : le serveur et le premier
     rendu client affichent la meme chose => zero avertissement
     d'hydratation. */
  const [value, setValue] = useState<number>(to);
  /* mounted : l'animation ne demarre qu'apres l'hydratation. */
  const [mounted, setMounted] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const id = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    /* prefersReducedMotion() est lu ici (dans un effet), jamais pendant
       le rendu => pas de lecture de window au SSR. */
    if (
      !mounted ||
      !start ||
      (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches)
    )
      return;

    const startTime = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(to * eased);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [to, durationMs, start, mounted]);

  return value.toFixed(decimals);
}

/* ── Sous-composant : cellule bento avec compteur anime ── */
function BentoCell({
  metric,
  delay,
  start,
}: {
  metric: BentoMetric;
  delay: number;
  start: boolean;
}) {
  const t = useTranslations("pro");
  const display = useCountUp(metric.to, metric.decimals, start);

  return (
    <div
      className={`v2roi-cell v2roi-cell--${metric.span} v2roi-cell--${metric.accent} v2roi-reveal`}
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="v2roi-num">
        <span className="v2roi-num__prefix">{metric.prefix}</span>
        <span className="v2roi-num__value">{display}</span>
        <span className="v2roi-num__suffix">{metric.suffix}</span>
        <span className="v2roi-num__star" aria-hidden="true">
          *
        </span>
      </div>
      <div className="v2roi-cell__title">
        {t(`roiBento.metrics.${metric.id}.title`)}
      </div>
      <p className="v2roi-cell__sub">{t(`roiBento.metrics.${metric.id}.sub`)}</p>
    </div>
  );
}

export default function SectionRoiBento() {
  const t = useTranslations("pro");
  const { ref, revealed } = useRevealInView<HTMLDivElement>();
  return (
    <section
      className="v2roi-section"
      id="v2roi-numbers"
      aria-labelledby="v2roi-numbers-title"
    >
      <style>{`
        .v2roi-section, .v2roi-section * { box-sizing: border-box; }

        .v2roi-section {
          --v2roi-shell: 1200px;
          --v2roi-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          padding-block: clamp(var(--spacing-xl), 10vh, var(--spacing-section-lg));
          background: var(--v2-bg);
          color: var(--v2-text-body);
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          line-height: 1.5;
          overflow: hidden;
        }
        .v2roi-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(55% 50% at 85% 0%, var(--v2-mesh-a), transparent 60%),
            radial-gradient(55% 50% at 10% 100%, var(--v2-mesh-b), transparent 60%);
        }

        .v2roi-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: var(--v2roi-shell);
          margin-inline: auto;
          padding-inline: clamp(var(--spacing-sm), 4vw, var(--spacing-md));
        }

        /* ── Reveal cascade (déclenché au scroll via .v2roi-play) ── */
        @keyframes v2roi-reveal {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2roi-reveal { opacity: 0; }
        .v2roi-play .v2roi-reveal {
          animation: v2roi-reveal 0.7s var(--mo-ease) forwards;
        }

        /* ── Eyebrow ── */
        .v2roi-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--v2roi-mono);
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          line-height: 1;
        }
        /* Les filets décoratifs qui encadraient le surtitre ont été retirés :
           ils n'existaient pas sur la page patient, et pas non plus de la même
           façon d'une section pro à l'autre (2 filets ici, 1 sur Avant/Après).
           Retour client : « Not sure you need these… are they on the patient
           page? » */

        /* ── Section head ── */
        .v2roi-sechead {
          max-width: 640px;
          margin: 0 auto var(--spacing-xl);
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .v2roi-sectitle {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--v2-text);
          margin: var(--spacing-sm) 0 0;
          text-transform: none;
        }
        .v2roi-secsub {
          font-size: 16px;
          line-height: 1.6;
          color: var(--v2-text-muted);
          margin: var(--spacing-xs) 0 0;
        }

        /* ── BENTO ── */
        .v2roi-bento {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: var(--spacing-sm);
        }
        .v2roi-cell {
          position: relative;
          border-radius: var(--radius-lg);
          padding: var(--spacing-md);
          background: var(--v2-surface);
          border: 1px solid var(--v2-border);
          box-shadow: var(--v2-shadow);
          overflow: hidden;
          transition: transform 0.3s var(--ease-out-soft, ease),
                      box-shadow 0.3s var(--ease-out-soft, ease);
          grid-column: span 1;
        }
        .v2roi-cell:hover {
          transform: translateY(-4px);
          box-shadow: var(--v2-shadow-lg);
        }
        .v2roi-cell--wide { grid-column: span 2; }
        .v2roi-cell::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .v2roi-cell--teal::before {
          background: radial-gradient(80% 70% at 100% 0%, var(--v2-mesh-b), transparent 60%);
        }
        .v2roi-cell--cobalt::before {
          background: radial-gradient(80% 70% at 100% 0%, var(--v2-mesh-a), transparent 60%);
        }
        .v2roi-cell--neutral::before {
          background: none;
        }

        .v2roi-num {
          position: relative;
          display: flex;
          align-items: baseline;
          font-weight: 800;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1;
          letter-spacing: -0.03em;
          font-variant-numeric: tabular-nums;
          font-feature-settings: "tnum" 1;
          color: var(--v2-text);
        }
        .v2roi-cell--teal .v2roi-num { color: var(--v2-accent-text); }
        .v2roi-cell--cobalt .v2roi-num { color: var(--v2-accent-2); }
        .v2roi-num__prefix { color: inherit; }
        .v2roi-num__suffix { font-size: 0.5em; margin-left: 2px; }
        .v2roi-num__star {
          font-size: 0.32em;
          color: var(--v2-text-muted);
          margin-left: 3px;
          align-self: flex-start;
        }
        .v2roi-cell__title {
          position: relative;
          margin-top: var(--spacing-xs);
          font-size: 16px;
          font-weight: 700;
          color: var(--v2-text);
          text-transform: none;
        }
        .v2roi-cell__sub {
          position: relative;
          margin: var(--spacing-xs) 0 0;
          font-size: 14px;
          line-height: 1.5;
          color: var(--v2-text-muted);
        }

        /* ── Footnote ── */
        .v2roi-footnote {
          margin-top: var(--spacing-md);
          font-size: 12px;
          line-height: 1.5;
          color: var(--v2-text-muted);
          max-width: 760px;
        }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .v2roi-bento { grid-template-columns: repeat(2, 1fr); }
          .v2roi-cell--wide { grid-column: span 2; }
        }
        @media (max-width: 720px) {
          .v2roi-cell { padding: var(--spacing-sm); }
        }
        /* Sous 460px la grille restait à 2 colonnes (héritée de 980px) :
           les 4 cartes normales se lisent par paires, les 2 cartes phares
           (« wide ») gardent la ligne pleine largeur — retour client, la
           colonne unique donnait 6 blocs empilés plutôt que 2 paires. */

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .v2roi-section *,
          .v2roi-reveal {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div
        className={`v2roi-shell${revealed ? " v2roi-play" : ""}`}
        ref={ref}
      >
        <div className="v2roi-sechead v2roi-reveal" style={{ animationDelay: "0ms" }}>
          <span className="v2roi-eyebrow">
            {t("roiBento.eyebrow")}
          </span>
          <h2 className="v2roi-sectitle" id="v2roi-numbers-title">
            {t("roiBento.title")}
          </h2>
          <p className="v2roi-secsub">{t("roiBento.subtitle")}</p>
        </div>

        <div className="v2roi-bento">
          {BENTO_METRICS.map((m, i) => (
            <BentoCell key={m.id} metric={m} delay={120 + i * 80} start={revealed} />
          ))}
        </div>

        <p className="v2roi-footnote v2roi-reveal" style={{ animationDelay: "680ms" }}>
          {t("roiBento.footnoteText")}
        </p>
      </div>
    </section>
  );
}
