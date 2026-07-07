"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { useRevealInView } from "@/components/shared/useRevealInView";

/* ──────────────────────────────────────────────────────────────────────────
   Structure des étapes (id / numéro / icône). Les libellés sont i18n
   (namespace `howItWorks`). Tout le contenu de l'aperçu est ILLUSTRATIF.
   Anti-survente : recherche gratuite de professionnels vérifiés ;
   la prise de rendez-vous est « bientôt ».
   ────────────────────────────────────────────────────────────────────────── */
type StepId = "search" | "compare" | "slot";

interface StepMeta {
  id: StepId;
  num: string;
  icon: string;
}

const STEPS: StepMeta[] = [
  { id: "search", num: "01", icon: "fas fa-magnifying-glass" },
  { id: "compare", num: "02", icon: "fas fa-user-doctor" },
  { id: "slot", num: "03", icon: "fas fa-calendar-check" },
];

const AUTOPLAY_MS = 4200;

export default function SectionCommentCaMarche() {
  const t = useTranslations("howItWorks");
  const [active, setActive] = useState<StepId>("search");
  const [paused, setPaused] = useState(false);
  const [scrub, setScrub] = useState(false);
  const [barP, setBarP] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const { ref, revealed } = useRevealInView<HTMLDivElement>();

  /* Mode « scrub » : sur desktop (≥981px) hors reduced-motion, l'étape active
     est pilotée par la position de la section au scroll. Sinon (mobile /
     reduced-motion) : auto-play temporel doux. */
  useEffect(() => {
    const mqD = window.matchMedia("(min-width: 981px)");
    const mqR = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setScrub(mqD.matches && !mqR.matches);
    update();
    mqD.addEventListener("change", update);
    mqR.addEventListener("change", update);
    return () => {
      mqD.removeEventListener("change", update);
      mqR.removeEventListener("change", update);
    };
  }, []);

  /* Scrub AVEC pin : la piste (300vh) est figée (sticky) le temps qu'on la
     traverse ; la progression du scroll DANS la piste pilote l'étape active +
     la sous-progression de la barre. Une fois la piste passée (p=1), la page
     repart normalement vers la section suivante. */
  useEffect(() => {
    if (!scrub) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const track = trackRef.current;
        if (!track) return;
        const rect = track.getBoundingClientRect();
        const total = rect.height - window.innerHeight; // distance de pin (≈ 200vh)
        if (total <= 0) return;
        const p = Math.min(Math.max(-rect.top / total, 0), 1);
        const idx = Math.min(STEPS.length - 1, Math.floor(p * STEPS.length));
        setActive(STEPS[idx].id);
        setBarP(Math.min(Math.max(p * STEPS.length - idx, 0), 1));
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [scrub]);

  /* Auto-play doux (mobile / reduced-motion), stoppé au survol. */
  useEffect(() => {
    if (scrub || paused) return;
    const order: StepId[] = STEPS.map((s) => s.id);
    const timer = window.setInterval(() => {
      setActive((current) => order[(order.indexOf(current) + 1) % order.length]);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [scrub, paused]);

  const activeIndex = STEPS.findIndex((s) => s.id === active);

  return (
    <section
      className={`vphw-section${scrub ? " is-scrub" : ""}`}
      aria-labelledby="vphw-title"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <style>{`
        .vphw-section, .vphw-section * { box-sizing: border-box; }
        .vphw-section {
          position: relative;
          overflow: hidden;
          padding-block: clamp(64px, 8vw, 108px);
          /* Halo teal relocalisé BAS-DROITE (autour de l'aperçu app) au lieu de
             déborder par le haut : le bord haut de la section reste light-1 pur,
             donc la couture avec le hero (light-1) ne « vire pas au vert ». */
          background:
            radial-gradient(66% 60% at 92% 66%, rgba(var(--color-teal-rgb), 0.15), transparent 72%),
            radial-gradient(64% 58% at 4% 108%, rgba(var(--color-cobalt-rgb), 0.10), transparent 72%),
            linear-gradient(180deg,
              var(--color-light-1) 0%,
              var(--color-light-1) 16%,
              var(--color-light-2) 48%,
              var(--color-light-2) 60%,
              var(--color-light-1) 100%);
          color: var(--text-default);
          font-family: var(--font-body);
          -webkit-font-smoothing: antialiased;
        }
        /* Grain léger pour la profondeur */
        .vphw-section::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.5;
          background-image: radial-gradient(rgba(var(--color-navy-rgb), 0.045) 1px, transparent 1px);
          background-size: 4px 4px;
          /* Fondu des bords : le motif de points s'estompe en haut/bas pour ne
             pas « couper net » à la couture (cf. methodo-peaufinage-propulseo). */
          -webkit-mask-image: linear-gradient(180deg, transparent, #000 clamp(40px, 6vh, 80px), #000 calc(100% - clamp(40px, 6vh, 80px)), transparent);
          mask-image: linear-gradient(180deg, transparent, #000 clamp(40px, 6vh, 80px), #000 calc(100% - clamp(40px, 6vh, 80px)), transparent);
          z-index: 0;
        }
        .vphw-shell {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1340px;
          margin-inline: auto;
          padding-inline: clamp(20px, 5vw, 48px);
        }

        /* ── En-tête ── */
        .vphw-head { max-width: 52ch; margin-bottom: clamp(18px, 2.2vw, 28px); }
        .vphw-kicker {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          font-size: 0.72rem;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--color-accent-ink);
        }
        .vphw-kicker-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.18);
        }
        .vphw-h2 {
          margin: var(--spacing-xs) 0 0;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: clamp(1.7rem, 3.4vw, 2.5rem);
          line-height: 1.08;
          letter-spacing: -0.02em;
          color: var(--color-navy);
        }
        .vphw-h2 em {
          font-style: italic;
          color: var(--color-accent-ink);
        }
        .vphw-sub {
          margin: var(--spacing-sm) 0 0;
          font-size: clamp(0.95rem, 1.4vw, 1.05rem);
          line-height: 1.6;
          color: var(--text-muted);
          max-width: 54ch;
        }

        /* ── Grille principale : étapes ↔ aperçu ── */
        .vphw-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.05fr);
          gap: clamp(var(--spacing-md), 4vw, var(--spacing-2xl));
          align-items: center;
        }
        /* Colonne narrative : titre + étapes empilés à gauche, l'aperçu à
           droite comble l'espace, et tout tient dans un écran quand la section
           est figée (pin). */
        .vphw-narrative { display: flex; flex-direction: column; }

        /* ── Étapes cliquables ── */
        .vphw-steps {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        .vphw-step {
          position: relative;
          width: 100%;
          text-align: left;
          display: grid;
          grid-template-columns: auto 1fr;
          gap: var(--spacing-sm);
          align-items: start;
          padding: var(--spacing-sm) var(--spacing-md);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          background: var(--color-light-1);
          cursor: pointer;
          font-family: inherit;
          color: inherit;
          box-shadow: var(--shadow-xs);
          transition: border-color 0.3s var(--ease-out-soft), box-shadow 0.3s var(--ease-out-soft), transform 0.3s var(--ease-out-soft);
        }
        .vphw-step:hover {
          transform: translateY(-2px);
          border-color: rgba(var(--color-teal-rgb), 0.5);
          box-shadow: var(--shadow-md);
        }
        .vphw-step:focus-visible {
          outline: none;
          border-color: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.28);
        }
        .vphw-step.is-active {
          border-color: rgba(var(--color-teal-rgb), 0.65);
          background:
            linear-gradient(180deg, rgba(var(--color-teal-rgb), 0.07), rgba(var(--color-teal-rgb), 0.02));
          box-shadow: var(--shadow-lg);
        }
        .vphw-step-badge {
          position: relative;
          width: 46px; height: 46px;
          border-radius: var(--radius-md);
          display: grid;
          place-items: center;
          font-family: var(--font-display);
          font-size: 1.1rem;
          font-weight: 700;
          letter-spacing: 0.01em;
          color: var(--color-accent-ink);
          background: rgba(var(--color-teal-rgb), 0.12);
          transition: background 0.3s var(--ease-out-soft), color 0.3s var(--ease-out-soft), transform 0.3s var(--ease-out-soft);
        }
        .vphw-step.is-active .vphw-step-badge {
          color: var(--color-light-1);
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-teal));
          transform: scale(1.04);
        }
        .vphw-step-copy { display: block; }
        .vphw-step-title {
          display: block;
          margin: 2px 0 0;
          font-size: 1.02rem;
          font-weight: 700;
          color: var(--color-navy);
          font-family: inherit;
        }
        .vphw-step-desc {
          display: block;
          margin: 6px 0 0;
          font-size: 0.86rem;
          line-height: 1.55;
          color: var(--text-muted);
        }
        .vphw-step-bar {
          position: absolute;
          left: 0; bottom: 0;
          height: 3px;
          width: 0;
          border-radius: 0 0 var(--radius-lg) var(--radius-lg);
          background: linear-gradient(90deg, var(--color-cobalt), var(--color-teal));
        }
        .vphw-step.is-active .vphw-step-bar { animation: vphw-progress var(--vphw-ms, 4200ms) linear forwards; }
        /* Scrub : la barre suit le scroll (width inline), pas l'horloge. */
        .vphw-section.is-scrub .vphw-step.is-active .vphw-step-bar { animation: none; }
        .vphw-section.is-scrub .vphw-step { cursor: default; }

        /* ── Pin (scrollytelling) : la piste donne la distance de scroll ; le
           contenu reste figé (sticky) pendant qu'on la traverse. Offset =
           hauteur du header sticky clair (--v2pat-header-h, défaut 56px) pour
           que le contenu ne passe pas dessous. overflow:visible est REQUIS
           (un overflow:hidden sur un ancêtre du sticky casserait le pin). */
        .vphw-section.is-scrub { overflow: visible; padding-block: 0; }
        .vphw-section.is-scrub .vphw-track { position: relative; height: 300vh; }
        .vphw-section.is-scrub .vphw-sticky {
          position: sticky;
          /* Fige un peu plus bas (marge sous le header) et laisse une marge en
             bas : la frame de pin est plus courte que l'écran, le contenu est
             centré dedans → respiration haut ET bas. */
          top: calc(var(--v2pat-navbar-h, var(--v2pat-header-h, 56px)) + 22px);
          min-height: calc(100vh - var(--v2pat-navbar-h, var(--v2pat-header-h, 56px)) - 44px);
          display: flex;
          align-items: center;
          padding-block: 8px;
        }
        /* Compactage du mode figé : titre + 3 étapes doivent tenir en entier
           dans un seul écran. Ces réglages ne s'appliquent QU'EN scrub
           (desktop pin) ; mobile / reduced-motion gardent le rythme aéré. */
        .vphw-section.is-scrub .vphw-head { margin-bottom: clamp(8px, 1vw, 14px); }
        .vphw-section.is-scrub .vphw-h2 { font-size: clamp(1.4rem, 2.7vw, 2rem); }
        .vphw-section.is-scrub .vphw-sub { margin-top: 8px; font-size: 0.9rem; line-height: 1.5; }
        .vphw-section.is-scrub .vphw-steps { gap: 9px; }
        .vphw-section.is-scrub .vphw-step { padding: 10px var(--spacing-md); }
        .vphw-section.is-scrub .vphw-step-badge { width: 40px; height: 40px; }
        .vphw-section.is-scrub .vphw-step-desc { margin-top: 3px; font-size: 0.8rem; line-height: 1.45; }

        /* ── Aperçu produit (device) ── */
        .vphw-stage { position: relative; }
        .vphw-stage-glow {
          position: absolute;
          inset: -8% -4% -12%;
          background: radial-gradient(60% 60% at 50% 30%, rgba(var(--color-teal-rgb), 0.22), transparent 72%);
          filter: blur(8px);
          z-index: 0;
          pointer-events: none;
        }
        .vphw-device {
          position: relative;
          z-index: 1;
          border-radius: calc(var(--radius-lg) + 6px);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.10);
          box-shadow: var(--shadow-lg);
          overflow: hidden;
        }
        .vphw-topbar {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
          padding: var(--spacing-xs) var(--spacing-sm);
          border-bottom: 1px solid rgba(var(--color-navy-rgb), 0.08);
          background: var(--color-light-2);
        }
        .vphw-dots { display: inline-flex; gap: 6px; }
        .vphw-dots span {
          width: 9px; height: 9px; border-radius: 50%;
          background: rgba(var(--color-navy-rgb), 0.16);
        }
        .vphw-dots span:first-child { background: rgba(var(--color-teal-rgb), 0.7); }
        .vphw-url {
          flex: 1;
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-xs);
          font-size: 0.72rem;
          font-weight: 600;
          color: var(--text-muted);
          padding: 5px 11px;
          border-radius: var(--radius-sm);
          background: var(--color-light-1);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .vphw-url i { color: var(--color-teal); font-size: 0.66rem; }
        .vphw-illus {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: var(--color-accent-ink);
          padding: 3px 8px;
          border-radius: var(--radius-pill);
          background: rgba(var(--color-teal-rgb), 0.12);
        }
        .vphw-screen {
          position: relative;
          padding: var(--spacing-md);
        }
        /* Le sizer (écran « compare », caché) fixe la hauteur du modal ; l'écran
           actif se superpose en absolu → taille CONSTANTE = « Comparer les
           profils », quelle que soit l'étape active. */
        .vphw-screen-sizer { visibility: hidden; pointer-events: none; display: grid; }
        .vphw-screen-sizer > * { grid-area: 1 / 1; }
        .vphw-screen-active {
          position: absolute;
          top: var(--spacing-md);
          left: var(--spacing-md);
          right: var(--spacing-md);
        }
        .vphw-panel {
          animation: vphw-enter 0.45s var(--ease-out-soft) both;
        }
        .vphw-panel-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }
        .vphw-panel-title {
          font-size: 0.95rem;
          font-weight: 700;
          color: var(--color-navy);
          font-family: var(--font-display);
        }
        .vphw-tag {
          font-size: 0.62rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 9px;
          border-radius: var(--radius-pill);
          color: var(--color-navy);
          background: rgba(var(--color-navy-rgb), 0.06);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .vphw-tag--live {
          display: inline-flex; align-items: center; gap: 6px;
          color: var(--color-accent-ink);
          background: rgba(var(--color-teal-rgb), 0.12);
          border-color: rgba(var(--color-teal-rgb), 0.42);
        }
        .vphw-live-dot {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--color-mint);
          animation: vphw-pulse 2s infinite;
        }
        @keyframes vphw-pulse {
          0% { box-shadow: 0 0 0 0 rgba(var(--color-mint-rgb), 0.5); }
          70% { box-shadow: 0 0 0 7px rgba(var(--color-mint-rgb), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--color-mint-rgb), 0); }
        }

        /* Écran 1 : recherche */
        .vphw-searchbar {
          display: flex;
          align-items: center;
          gap: 9px;
          padding: 11px var(--spacing-sm);
          border-radius: var(--radius-md);
          border: 1px solid rgba(var(--color-teal-rgb), 0.45);
          background: var(--color-light-1);
          box-shadow: var(--shadow-sm);
          color: var(--color-navy);
          font-weight: 600;
          font-size: 0.85rem;
        }
        .vphw-searchbar i { color: var(--color-teal); }
        .vphw-caret {
          display: inline-block;
          width: 2px; height: 15px;
          margin-left: auto;
          background: var(--color-cobalt);
          animation: vphw-blink 1.1s steps(1) infinite;
        }
        .vphw-chips { display: flex; flex-wrap: wrap; gap: var(--spacing-xs); margin-top: var(--spacing-sm); }
        .vphw-chip {
          font-size: 0.76rem;
          font-weight: 600;
          padding: 7px 13px;
          border-radius: var(--radius-pill);
          color: var(--color-navy);
          background: var(--color-light-2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
        }
        .vphw-chip.is-on {
          color: var(--color-light-1);
          background: var(--color-navy);
          border-color: var(--color-navy);
        }
        .vphw-chip.is-on i { color: var(--color-teal); }
        .vphw-hint {
          margin-top: var(--spacing-sm);
          font-size: 0.74rem;
          color: var(--text-muted);
        }
        .vphw-hint b { color: var(--color-navy); }
        .vphw-found {
          margin-top: var(--spacing-sm);
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 13px;
          border-radius: var(--radius-pill);
          font-size: 0.76rem; font-weight: 600;
          color: var(--color-navy);
          background: rgba(var(--color-teal-rgb), 0.1);
          border: 1px solid rgba(var(--color-teal-rgb), 0.32);
        }
        .vphw-found i { color: var(--color-accent-ink); font-size: 0.8rem; }
        .vphw-found b { color: var(--color-accent-ink); font-weight: 800; font-variant-numeric: tabular-nums; }

        /* Écran 2 : comparaison de profils */
        .vphw-cards { display: flex; flex-direction: column; gap: var(--spacing-xs); }
        .vphw-card {
          display: grid;
          grid-template-columns: auto 1fr auto;
          gap: var(--spacing-xs);
          align-items: center;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-md);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          background: var(--color-light-1);
          box-shadow: var(--shadow-xs);
          transition: border-color 0.25s var(--ease-out-soft), box-shadow 0.25s var(--ease-out-soft), transform 0.25s var(--ease-out-soft);
        }
        .vphw-card.is-top {
          border-color: rgba(var(--color-teal-rgb), 0.55);
          box-shadow: var(--shadow-sm);
        }
        .vphw-avatar {
          width: 42px; height: 42px;
          border-radius: var(--radius-md);
          display: grid;
          place-items: center;
          color: var(--color-light-1);
          font-size: 0.95rem;
          background: linear-gradient(135deg, var(--color-cobalt), var(--color-mint));
        }
        .vphw-card-name {
          font-size: 0.86rem;
          font-weight: 700;
          color: var(--color-navy);
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .vphw-verified { color: var(--color-teal); font-size: 0.78rem; }
        .vphw-card-meta {
          margin-top: 3px;
          font-size: 0.72rem;
          color: var(--text-muted);
          display: flex;
          flex-wrap: wrap;
          gap: 4px 10px;
        }
        .vphw-langs { display: inline-flex; gap: 4px; margin-top: 6px; }
        .vphw-lang {
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          padding: 2px 6px;
          border-radius: var(--radius-sm);
          color: var(--color-accent-ink);
          background: rgba(var(--color-teal-rgb), 0.12);
        }
        .vphw-card-cta {
          font-size: 0.7rem;
          font-weight: 700;
          color: var(--color-accent-ink);
          display: inline-flex;
          align-items: center;
          gap: 5px;
          white-space: nowrap;
        }

        /* Écran 3 : réservation (RDV en ligne actif) */
        .vphw-cal {
          padding: 4px 2px;
        }
        .vphw-week { display: grid; grid-template-columns: repeat(5, 1fr); gap: var(--spacing-xs); }
        .vphw-day {
          text-align: center;
          padding: 9px 4px;
          border-radius: var(--radius-md);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          background: var(--color-light-1);
        }
        .vphw-day.is-sel {
          border-color: rgba(var(--color-teal-rgb), 0.6);
          background: rgba(var(--color-teal-rgb), 0.08);
        }
        .vphw-day-dow { font-size: 0.62rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; }
        .vphw-day-n { font-size: 0.95rem; font-weight: 700; color: var(--color-navy); margin-top: 2px; }
        .vphw-slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-xs); margin-top: var(--spacing-sm); }
        .vphw-slot {
          text-align: center;
          padding: 9px 4px;
          border-radius: var(--radius-sm);
          font-size: 0.78rem;
          font-weight: 600;
          color: var(--color-navy);
          background: var(--color-light-2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
        }
        .vphw-slot.is-sel {
          color: var(--color-light-1);
          border-color: transparent;
          background: linear-gradient(135deg, var(--color-mint), var(--color-accent-ink));
          box-shadow: 0 8px 18px -9px rgba(var(--color-mint-rgb), 0.9);
        }
        .vphw-book-ctx {
          display: flex; align-items: center; gap: var(--spacing-xs);
          margin-bottom: var(--spacing-sm);
        }
        .vphw-book-ctx .vphw-avatar { width: 38px; height: 38px; font-size: 0.85rem; }
        .vphw-book-who { display: flex; flex-direction: column; }
        .vphw-book-n {
          display: flex; align-items: center; gap: 6px;
          font-size: 0.82rem; font-weight: 700; color: var(--color-navy);
        }
        .vphw-book-s { font-size: 0.68rem; color: var(--text-muted); margin-top: 1px; }
        .vphw-book-cta {
          margin-top: var(--spacing-sm);
          display: flex; align-items: center; justify-content: center; gap: 9px;
          padding: 12px var(--spacing-md);
          border-radius: var(--radius-pill);
          color: var(--color-light-1); font-weight: 700; font-size: 0.84rem;
          background: linear-gradient(135deg, var(--color-mint), var(--color-accent-ink) 78%);
          box-shadow: 0 14px 28px -12px rgba(var(--color-mint-rgb), 0.9), inset 0 1px 0 rgba(255, 255, 255, 0.4);
        }
        .vphw-book-cta i { font-size: 0.78rem; }
        .vphw-book-reassure {
          margin-top: 10px;
          display: flex; align-items: center; justify-content: center; gap: 7px;
          font-size: 0.7rem; color: var(--text-muted);
        }
        .vphw-book-reassure i { color: var(--color-accent-ink); }

        /* ── Reveals en cascade (déclenchés au scroll via .vphw-play) ── */
        .vphw-reveal { opacity: 0; transform: translateY(18px); }
        .vphw-play .vphw-reveal { animation: vphw-reveal 0.7s var(--ease-out-soft) forwards; }
        .vphw-play .vphw-d1 { animation-delay: 0.05s; }
        .vphw-play .vphw-d2 { animation-delay: 0.16s; }
        .vphw-play .vphw-d3 { animation-delay: 0.27s; }
        .vphw-play .vphw-d4 { animation-delay: 0.38s; }

        @keyframes vphw-reveal { to { opacity: 1; transform: translateY(0); } }
        @keyframes vphw-enter { from { opacity: 0; transform: translateY(10px) scale(0.99); } to { opacity: 1; transform: none; } }
        @keyframes vphw-progress { from { width: 0; } to { width: 100%; } }
        @keyframes vphw-blink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .vphw-grid { grid-template-columns: 1fr; gap: var(--spacing-lg); }
          .vphw-screen { min-height: 340px; }
        }
        @media (max-width: 520px) {
          .vphw-step { padding: var(--spacing-sm); gap: var(--spacing-xs); }
          .vphw-step-badge { width: 42px; height: 42px; }
          .vphw-week { grid-template-columns: repeat(5, 1fr); gap: 6px; }
          .vphw-card { grid-template-columns: auto 1fr; }
          .vphw-card-cta { grid-column: 2; justify-content: flex-end; }
        }

        @media (prefers-reduced-motion: reduce) {
          .vphw-reveal, .vphw-panel, .vphw-step-bar, .vphw-caret, .vphw-section *,
          .vphw-step-badge, .vphw-step {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      <div className="vphw-track" ref={trackRef}>
        <div className="vphw-sticky">
          <div className={`vphw-shell${revealed ? " vphw-play" : ""}`} ref={ref}>
        <div className="vphw-grid">
          <div className="vphw-narrative">
            <header className="vphw-head">
              <span className="vphw-kicker vphw-reveal vphw-d1">
                <span className="vphw-kicker-dot" aria-hidden="true" />
                {t("kicker")}
              </span>
              <h2 id="vphw-title" className="vphw-h2 vphw-reveal vphw-d2">
                {t.rich("title", { em: (chunks) => <em>{chunks}</em> })}
              </h2>
              <p className="vphw-sub vphw-reveal vphw-d3">{t("sub")}</p>
            </header>

            {/* Étapes cliquables, pilotent l’aperçu */}
            <ol className="vphw-steps vphw-reveal vphw-d3" aria-label={t("stepsAria")}>
            {STEPS.map((step) => {
              const isActive = step.id === active;
              const title = t(`steps.${step.id}.title`);
              return (
                <li key={step.id}>
                  <button
                    type="button"
                    className={`vphw-step${isActive ? " is-active" : ""}`}
                    aria-pressed={isActive}
                    aria-label={t("stepAria", { num: step.num, title })}
                    onClick={() => setActive(step.id)}
                    onMouseEnter={scrub ? undefined : () => setActive(step.id)}
                    onFocus={scrub ? undefined : () => setActive(step.id)}
                    style={{ ["--vphw-ms" as string]: `${AUTOPLAY_MS}ms` }}
                  >
                    <span className="vphw-step-badge" aria-hidden="true">{step.num}</span>
                    <span className="vphw-step-copy">
                      <span className="vphw-step-title">{title}</span>
                      <span className="vphw-step-desc">{t(`steps.${step.id}.desc`)}</span>
                    </span>
                    <span
                      className="vphw-step-bar"
                      aria-hidden="true"
                      style={scrub && isActive ? { width: `${barP * 100}%` } : undefined}
                    />
                  </button>
                </li>
              );
            })}
            </ol>
          </div>

          {/* Aperçu produit app-like, réagit à l’étape active */}
          <div className="vphw-stage vphw-reveal vphw-d4">
            <span className="vphw-stage-glow" aria-hidden="true" />
            <div className="vphw-device">
              <div className="vphw-topbar">
                <span className="vphw-dots" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="vphw-url">
                  <i className="fas fa-lock" aria-hidden="true" />
                  docagora.pt
                </span>
                <span className="vphw-illus">{t("example")}</span>
              </div>

              <div
                className="vphw-screen"
                role="group"
                aria-live="polite"
                aria-label={t("previewAria", {
                  index: activeIndex + 1,
                  total: STEPS.length,
                })}
              >
                {/* Sizer invisible : réserve toujours la hauteur de l'écran
                    « Comparer les profils » (le plus grand). */}
                <div className="vphw-screen-sizer" aria-hidden="true">
                  <PreviewScreen step="search" />
                  <PreviewScreen step="compare" />
                  <PreviewScreen step="slot" />
                </div>
                {/* key force la transition entre écrans */}
                <div className="vphw-screen-active">
                  <PreviewScreen key={active} step={active} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Écrans de l’aperçu, mockups 100 % CSS/SVG, contenu ILLUSTRATIF.
   Libellés i18n (namespace `howItWorks.screen`) ; les noms de médecins,
   la marque (docagora.pt) et les codes langue (PT/FR/EN) restent littéraux.
   ────────────────────────────────────────────────────────────────────────── */
function PreviewScreen({ step }: { step: StepId }) {
  const t = useTranslations("howItWorks");

  if (step === "search") {
    return (
      <div className="vphw-panel" aria-hidden="true">
        <div className="vphw-panel-head">
          <span className="vphw-panel-title">{t("screen.search.title")}</span>
          <span className="vphw-tag">{t("screen.search.tag")}</span>
        </div>
        <div className="vphw-searchbar">
          <i className="fas fa-magnifying-glass" />
          {t("screen.search.query")}
          <span className="vphw-caret" />
        </div>
        <div className="vphw-chips">
          <span className="vphw-chip is-on">
            <i className="fas fa-user-doctor" /> {t("screen.search.chipSpecialty")}
          </span>
          <span className="vphw-chip">
            <i className="fas fa-location-dot" /> {t("screen.search.chipCity")}
          </span>
          <span className="vphw-chip">
            <i className="fas fa-language" /> {t("screen.search.chipLang")}
          </span>
        </div>
        <div className="vphw-found">
          <i className="fas fa-circle-check" aria-hidden="true" />
          {t.rich("screen.search.found", { b: (chunks) => <b>{chunks}</b> })}
        </div>
        <p className="vphw-hint">
          {t.rich("screen.search.hint", { b: (chunks) => <b>{chunks}</b> })}
        </p>
      </div>
    );
  }

  if (step === "compare") {
    return (
      <div className="vphw-panel" aria-hidden="true">
        <div className="vphw-panel-head">
          <span className="vphw-panel-title">{t("screen.compare.title")}</span>
          <span className="vphw-tag">PT · FR · EN</span>
        </div>
        <div className="vphw-cards">
          <article className="vphw-card is-top">
            <span className="vphw-avatar">
              <i className="fas fa-user-doctor" />
            </span>
            <div>
              <span className="vphw-card-name">
                Dr. A. Marques
                <i
                  className="fas fa-circle-check vphw-verified"
                  title={t("screen.compare.verified")}
                />
              </span>
              <span className="vphw-card-meta">
                <span>{t("screen.compare.specialty")}</span>
                <span>· {t("screen.compare.cityLisbon")}</span>
              </span>
              <span className="vphw-langs">
                <span className="vphw-lang">PT</span>
                <span className="vphw-lang">FR</span>
                <span className="vphw-lang">EN</span>
              </span>
            </div>
            <span className="vphw-card-cta">
              {t("screen.compare.see")} <i className="fas fa-arrow-right" />
            </span>
          </article>

          <article className="vphw-card">
            <span className="vphw-avatar">
              <i className="fas fa-user-doctor" />
            </span>
            <div>
              <span className="vphw-card-name">
                Dr. S. Costa
                <i
                  className="fas fa-circle-check vphw-verified"
                  title={t("screen.compare.verified")}
                />
              </span>
              <span className="vphw-card-meta">
                <span>{t("screen.compare.specialty")}</span>
                <span>· {t("screen.compare.cityCascais")}</span>
              </span>
              <span className="vphw-langs">
                <span className="vphw-lang">PT</span>
                <span className="vphw-lang">EN</span>
              </span>
            </div>
            <span className="vphw-card-cta">
              {t("screen.compare.see")} <i className="fas fa-arrow-right" />
            </span>
          </article>
        </div>
        <p className="vphw-hint">
          {t.rich("screen.compare.hint", { b: (chunks) => <b>{chunks}</b> })}
        </p>
      </div>
    );
  }

  // step === "slot"
  return (
    <div className="vphw-panel" aria-hidden="true">
      <div className="vphw-panel-head">
        <span className="vphw-panel-title">{t("screen.slot.title")}</span>
        <span className="vphw-tag vphw-tag--live">
          <span className="vphw-live-dot" aria-hidden="true" />
          {t("screen.slot.tag")}
        </span>
      </div>
      <div className="vphw-book-ctx">
        <span className="vphw-avatar"><i className="fas fa-user-doctor" /></span>
        <span className="vphw-book-who">
          <span className="vphw-book-n">
            Dr. A. Marques
            <i className="fas fa-circle-check vphw-verified" title={t("screen.compare.verified")} />
          </span>
          <span className="vphw-book-s">
            {t("screen.compare.specialty")} · {t("screen.compare.cityLisbon")}
          </span>
        </span>
      </div>
      <div className="vphw-cal">
        <div className="vphw-week">
          <div className="vphw-day">
            <div className="vphw-day-dow">{t("screen.slot.dayMon")}</div>
            <div className="vphw-day-n">12</div>
          </div>
          <div className="vphw-day is-sel">
            <div className="vphw-day-dow">{t("screen.slot.dayTue")}</div>
            <div className="vphw-day-n">13</div>
          </div>
          <div className="vphw-day">
            <div className="vphw-day-dow">{t("screen.slot.dayWed")}</div>
            <div className="vphw-day-n">14</div>
          </div>
          <div className="vphw-day">
            <div className="vphw-day-dow">{t("screen.slot.dayThu")}</div>
            <div className="vphw-day-n">15</div>
          </div>
          <div className="vphw-day">
            <div className="vphw-day-dow">{t("screen.slot.dayFri")}</div>
            <div className="vphw-day-n">16</div>
          </div>
        </div>
        <div className="vphw-slots">
          <span className="vphw-slot is-sel">09:30</span>
          <span className="vphw-slot">11:00</span>
          <span className="vphw-slot">14:15</span>
        </div>
      </div>
      <span className="vphw-book-cta">
        <span>{t("screen.slot.cta")}</span>
        <i className="fas fa-arrow-right" aria-hidden="true" />
      </span>
      <p className="vphw-book-reassure">
        <i className="fas fa-check" aria-hidden="true" />
        {t("screen.slot.reassure")}
      </p>
    </div>
  );
}
