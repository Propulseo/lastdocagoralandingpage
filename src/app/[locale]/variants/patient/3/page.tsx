"use client";

/**
 * /variants/patient/3 — « Sinal Vital »
 * Variante landing patient IMMERSIVE / cinématographique / sombre / motion-first.
 * Fond dark + gradient mesh animé en boucle + grain SVG + tracé ECG dessiné en
 * boucle + mot multilingue qui cycle (PT/FR/EN). Reveals au scroll en cascade.
 * Page de démo interne — strings non externalisées (i18n au go-live).
 * DocAgora ne promet PAS téléconsultation / paiement / RDV instantané.
 */

import { useEffect, useRef, useState } from "react";

/* ── Mot qui cycle dans le hero (multilingue volontaire) ── */
const ROTATING_WORDS = ["confiance", "trust", "soin", "clarté", "confiança"] as const;

/* ── Stats illustratives (clairement marquées) ── */
type Stat = { value: number; suffix: string; label: string };
const STATS: Stat[] = [
  { value: 16, suffix: "", label: "spécialités" },
  { value: 3, suffix: "", label: "langues · PT · FR · EN" },
  { value: 6, suffix: "", label: "villes couvertes" },
  { value: 100, suffix: "%", label: "recherche gratuite" },
];

/* ── Timeline « Comment ça marche » ── */
type Step = { k: string; title: string; body: string };
const STEPS: Step[] = [
  {
    k: "01",
    title: "Recherchez",
    body: "Indiquez la spécialité, la ville et la langue que vous préférez. La recherche est gratuite, sans inscription obligatoire.",
  },
  {
    k: "02",
    title: "Comparez",
    body: "Consultez les professionnels avec profil vérifié, localisation et langues parlées. Sans bruit, sans précipitation.",
  },
  {
    k: "03",
    title: "Contactez",
    body: "Trouvez les coordonnées du professionnel et échangez directement. Simple et transparent.",
  },
  {
    k: "04",
    title: "Prenez rendez-vous (bientôt)",
    body: "La prise de rendez-vous en ligne arrive bientôt. Pour l’instant, nous facilitons la découverte, le reste suit de près.",
  },
];

/* ── Spécialités (tuiles) ── */
type Spec = { icon: string; name: string };
const SPECIALTIES: Spec[] = [
  { icon: "fa-user-md", name: "Médecine générale" },
  { icon: "fa-heartbeat", name: "Cardiologie" },
  { icon: "fa-tooth", name: "Chirurgie dentaire" },
  { icon: "fa-eye", name: "Ophtalmologie" },
  { icon: "fa-brain", name: "Neurologie" },
  { icon: "fa-bone", name: "Orthopédie" },
  { icon: "fa-baby", name: "Pédiatrie" },
  { icon: "fa-allergies", name: "Dermatologie" },
];

/* ── Piliers de confiance ── */
type Trust = { icon: string; title: string; body: string };
const TRUST: Trust[] = [
  {
    icon: "fa-check-circle",
    title: "Professionnels vérifiés",
    body: "Chaque profil est vérifié avant d’apparaître dans les résultats.",
  },
  {
    icon: "fa-lock",
    title: "RGPD en premier",
    body: "Vos données sont traitées avec rigueur et ne sont jamais vendues à des tiers.",
  },
  {
    icon: "fa-shield-alt",
    title: "Données en Europe",
    body: "Infrastructure et hébergement alignés sur le cadre européen de protection des données.",
  },
  {
    icon: "fa-language",
    title: "Toujours multilingue",
    body: "Toute l’expérience disponible en portugais, français et anglais.",
  },
];

/* ──────────────────────────────────────────────────────────
   Sous-composant : compteur animé (count-up) au scroll
   ────────────────────────────────────────────────────────── */
function Counter({ stat, active }: { stat: Stat; active: boolean }) {
  const [display, setDisplay] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    if (!active || doneRef.current) return;
    doneRef.current = true;

    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      setDisplay(stat.value);
      return;
    }

    const duration = 1100;
    const start = performance.now();
    let raf = 0;

    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(eased * stat.value));
      if (p < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, stat.value]);

  return (
    <span className="pat3-stat__num">
      {display}
      {stat.suffix}
    </span>
  );
}

/* ──────────────────────────────────────────────────────────
   Page
   ────────────────────────────────────────────────────────── */
export default function PatientVariant3() {
  const [wordIndex, setWordIndex] = useState(0);
  const [statsActive, setStatsActive] = useState(false);
  const statsRef = useRef<HTMLDivElement | null>(null);
  const revealRoot = useRef<HTMLElement | null>(null);

  /* Cycle du mot multilingue */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      setWordIndex((i) => (i + 1) % ROTATING_WORDS.length);
    }, 2200);
    return () => window.clearInterval(id);
  }, []);

  /* Déclenche les compteurs quand la section stats entre dans le viewport */
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setStatsActive(true);
            obs.disconnect();
          }
        }
      },
      { threshold: 0.35 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  /* Reveals au scroll (IntersectionObserver générique) */
  useEffect(() => {
    const root = revealRoot.current;
    if (!root) return;
    const nodes = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add("is-in");
            obs.unobserve(e.target);
          }
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -8% 0px" }
    );

    nodes.forEach((n) => obs.observe(n));
    return () => obs.disconnect();
  }, []);

  return (
    <main className="pat3" ref={revealRoot}>
      <style>{`
        .pat3 {
          box-sizing: border-box;
          position: relative;
          isolation: isolate;
          min-height: 100vh;
          overflow-x: hidden;
          font-family: var(--font-montserrat), system-ui, sans-serif;
          color: var(--color-light-1);
          background: var(--color-dark-2);
          line-height: 1.6;
          -webkit-font-smoothing: antialiased;
        }
        .pat3 *, .pat3 *::before, .pat3 *::after { box-sizing: border-box; }
        .pat3 p, .pat3 h1, .pat3 h2, .pat3 h3, .pat3 ul, .pat3 li, .pat3 figure {
          margin: 0; padding: 0; text-transform: none;
        }
        .pat3 a { text-decoration: none; color: inherit; }
        .pat3 ul { list-style: none; }
        .pat3__inner { width: 100%; max-width: 1160px; margin: 0 auto; padding: 0 24px; }

        .pat3 :focus-visible {
          outline: 2px solid var(--color-teal);
          outline-offset: 3px;
          border-radius: 6px;
        }

        /* ── Mesh animé global (fixe, derrière tout) ── */
        .pat3__mesh {
          position: fixed; inset: -20% -20% -20% -20%; z-index: -2; pointer-events: none;
          background:
            radial-gradient(38% 42% at 18% 22%, rgba(var(--color-teal-rgb), 0.30), transparent 60%),
            radial-gradient(40% 44% at 82% 30%, rgba(var(--color-cobalt-rgb), 0.28), transparent 62%),
            radial-gradient(46% 50% at 60% 88%, rgba(var(--color-mint-rgb), 0.22), transparent 60%),
            radial-gradient(40% 40% at 30% 80%, rgba(var(--color-navy-rgb), 0.30), transparent 60%);
          filter: blur(14px);
          animation: pat3-drift 26s ease-in-out infinite alternate;
          will-change: transform;
        }
        .pat3__veil {
          position: fixed; inset: 0; z-index: -1; pointer-events: none;
          background:
            linear-gradient(180deg, rgba(var(--color-dark-2-rgb), 0.30) 0%, rgba(var(--color-dark-2-rgb), 0.78) 60%, var(--color-dark-2) 100%);
        }
        .pat3__grain {
          position: fixed; inset: 0; z-index: -1; pointer-events: none; opacity: 0.055; mix-blend-mode: screen;
          background-image: radial-gradient(rgba(255,255,255,0.85) 0.5px, transparent 0.6px);
          background-size: 3px 3px;
        }

        @keyframes pat3-drift {
          0%   { transform: translate3d(0,0,0) scale(1); }
          50%  { transform: translate3d(2.5%, -2%, 0) scale(1.06); }
          100% { transform: translate3d(-2%, 2.5%, 0) scale(1.03); }
        }

        /* ── Nav ── */
        .pat3-nav {
          position: relative; z-index: 5;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 22px 0; flex-wrap: wrap;
        }
        .pat3-nav__brand {
          display: inline-flex; align-items: center; gap: 11px;
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: 21px; letter-spacing: -0.01em; color: #fff;
        }
        .pat3-nav__dot {
          width: 11px; height: 11px; border-radius: 50%;
          background: var(--color-teal);
          box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.20), 0 0 16px 2px rgba(var(--color-teal-rgb), 0.65);
          animation: pat3-pulse 2.4s ease-in-out infinite;
        }
        @keyframes pat3-pulse {
          0%, 100% { box-shadow: 0 0 0 4px rgba(var(--color-teal-rgb), 0.20), 0 0 14px 2px rgba(var(--color-teal-rgb), 0.55); }
          50%      { box-shadow: 0 0 0 7px rgba(var(--color-teal-rgb), 0.06), 0 0 22px 4px rgba(var(--color-teal-rgb), 0.85); }
        }
        .pat3-nav__back {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 500; letter-spacing: 0.02em;
          color: rgba(255,255,255,0.62);
          padding: 9px 14px; border-radius: 50px;
          border: 1px solid rgba(255,255,255,0.12);
          transition: color 0.25s ease, border-color 0.25s ease, background 0.25s ease;
        }
        .pat3-nav__back:hover { color: #fff; border-color: rgba(var(--color-teal-rgb), 0.6); background: rgba(var(--color-teal-rgb), 0.08); }

        /* ── HERO ── */
        .pat3-hero {
          position: relative; z-index: 2;
          padding: clamp(56px, 11vh, 130px) 0 clamp(70px, 12vh, 140px);
        }
        .pat3-hero__ecg {
          position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%);
          width: 100%; height: clamp(180px, 32vh, 340px); z-index: -1; pointer-events: none;
          opacity: 0.85;
        }
        .pat3-hero__ecg path {
          fill: none; stroke: var(--color-teal); stroke-width: 2.2;
          stroke-linecap: round; stroke-linejoin: round;
          filter: drop-shadow(0 0 6px rgba(var(--color-teal-rgb), 0.9));
          stroke-dasharray: 2400;
          stroke-dashoffset: 2400;
          animation: pat3-trace 5.5s linear infinite;
        }
        .pat3-hero__ecg path.pat3-ecg--ghost {
          stroke: rgba(var(--color-teal-rgb), 0.12);
          stroke-width: 1.4; filter: none;
          stroke-dasharray: none; stroke-dashoffset: 0; animation: none;
        }
        @keyframes pat3-trace {
          0%   { stroke-dashoffset: 2400; }
          70%  { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -2400; }
        }

        .pat3-hero__eyebrow {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px; letter-spacing: 0.30em; text-transform: uppercase;
          color: var(--color-teal); margin-bottom: 26px;
        }
        .pat3-hero__eyebrow span { display: block; height: 1px; width: 38px; background: linear-gradient(90deg, var(--color-teal), transparent); }

        .pat3-hero__title {
          font-family: var(--font-fraunces), Georgia, serif;
          font-weight: 600; line-height: 1.02; letter-spacing: -0.02em;
          font-size: clamp(40px, 8vw, 92px); color: #fff;
          max-width: 16ch; text-wrap: balance;
        }
        .pat3-hero__title em {
          font-style: italic; font-weight: 500;
          background: linear-gradient(120deg, var(--color-teal), var(--color-mint));
          -webkit-background-clip: text; background-clip: text; color: transparent;
        }

        .pat3-rotor {
          display: inline-grid; vertical-align: bottom; min-width: 5ch; position: relative;
        }
        .pat3-rotor__item {
          grid-area: 1 / 1; font-style: italic; opacity: 0; transform: translateY(0.25em);
          background: linear-gradient(120deg, var(--color-teal), var(--color-mint));
          -webkit-background-clip: text; background-clip: text; color: transparent;
          transition: opacity 0.55s ease, transform 0.55s ease;
        }
        .pat3-rotor__item.is-active { opacity: 1; transform: translateY(0); }

        .pat3-hero__lead {
          margin-top: 26px; max-width: 56ch;
          font-size: clamp(15px, 1.7vw, 19px); line-height: 1.7;
          color: rgba(255,255,255,0.70);
        }

        .pat3-hero__cta { margin-top: 38px; display: flex; flex-wrap: wrap; gap: 16px; align-items: center; }
        .pat3-btn {
          display: inline-flex; align-items: center; gap: 10px;
          min-height: 52px; padding: 0 26px; border-radius: 50px;
          font-family: var(--font-montserrat), sans-serif; font-weight: 600; font-size: 15px;
          cursor: pointer; border: 0; line-height: 1; text-transform: none;
          transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s ease, background 0.28s ease;
        }
        .pat3-btn--primary {
          color: var(--color-dark-2);
          background: linear-gradient(120deg, var(--color-teal), var(--color-mint));
          box-shadow: 0 0 0 1px rgba(var(--color-teal-rgb), 0.4), 0 14px 40px -12px rgba(var(--color-teal-rgb), 0.85);
        }
        .pat3-btn--primary:hover { transform: translateY(-3px); box-shadow: 0 0 0 1px rgba(var(--color-teal-rgb), 0.6), 0 22px 54px -12px rgba(var(--color-teal-rgb), 1); }
        .pat3-btn--ghost {
          color: #fff; background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.16);
        }
        .pat3-btn--ghost:hover { transform: translateY(-3px); border-color: rgba(var(--color-teal-rgb), 0.6); background: rgba(var(--color-teal-rgb), 0.08); }
        .pat3-btn svg { transition: transform 0.28s ease; }
        .pat3-btn:hover svg { transform: translateX(4px); }

        .pat3-hero__note {
          margin-top: 22px; font-size: 12.5px; color: rgba(255,255,255,0.46);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .pat3-hero__note i { color: var(--color-teal); }

        /* ── Section générique ── */
        .pat3-sec { position: relative; z-index: 2; padding: clamp(64px, 11vh, 120px) 0; }
        .pat3-sec__kicker {
          font-family: ui-monospace, "SF Mono", Menlo, monospace;
          font-size: 12px; letter-spacing: 0.26em; text-transform: uppercase;
          color: var(--color-teal); margin-bottom: 14px;
        }
        .pat3-sec__title {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(28px, 4.4vw, 52px); line-height: 1.08; letter-spacing: -0.015em;
          color: #fff; max-width: 18ch;
        }
        .pat3-sec__title em { font-style: italic; color: var(--color-teal); }
        .pat3-sec__lead {
          margin-top: 16px; max-width: 52ch; font-size: clamp(14px, 1.5vw, 17px);
          line-height: 1.7; color: rgba(255,255,255,0.64);
        }

        /* ── Reveal utility ── */
        [data-reveal] {
          opacity: 0; transform: translateY(26px);
          transition: opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1);
        }
        [data-reveal].is-in { opacity: 1; transform: translateY(0); }

        /* ── STATS ── */
        .pat3-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 44px; }
        .pat3-stat {
          position: relative; padding: 28px 22px; border-radius: 18px; overflow: hidden;
          background: linear-gradient(180deg, rgba(255,255,255,0.055), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.09);
        }
        .pat3-stat::before {
          content: ""; position: absolute; inset: 0; opacity: 0.7;
          background: radial-gradient(120% 90% at 50% -10%, rgba(var(--color-teal-rgb), 0.16), transparent 60%);
        }
        .pat3-stat__num {
          position: relative; display: block;
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(40px, 5vw, 60px); line-height: 1; color: #fff; letter-spacing: -0.02em;
        }
        .pat3-stat__label {
          position: relative; margin-top: 10px; font-size: 13px; line-height: 1.5;
          color: rgba(255,255,255,0.60);
        }
        .pat3-stats__note {
          margin-top: 20px; font-size: 12px; color: rgba(255,255,255,0.42);
          font-family: ui-monospace, "SF Mono", Menlo, monospace; letter-spacing: 0.04em;
        }

        /* ── TIMELINE ── */
        .pat3-tl { margin-top: 50px; position: relative; padding-left: 8px; }
        .pat3-tl::before {
          content: ""; position: absolute; left: 21px; top: 8px; bottom: 8px; width: 2px;
          background: linear-gradient(180deg, rgba(var(--color-teal-rgb), 0.65), rgba(var(--color-cobalt-rgb), 0.10));
        }
        .pat3-step {
          position: relative; display: grid; grid-template-columns: 56px 1fr; gap: 22px;
          padding: 18px 0 30px;
        }
        .pat3-step__dot {
          position: relative; z-index: 1; width: 44px; height: 44px; border-radius: 50%;
          display: grid; place-items: center;
          font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 13px; font-weight: 600;
          color: var(--color-teal);
          background: var(--color-dark-1);
          border: 1px solid rgba(var(--color-teal-rgb), 0.45);
          box-shadow: 0 0 0 5px rgba(var(--color-dark-2-rgb), 0.9), 0 0 22px -4px rgba(var(--color-teal-rgb), 0.7);
        }
        .pat3-step__title {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(20px, 2.4vw, 26px); color: #fff; margin-bottom: 6px;
        }
        .pat3-step__body { font-size: 15px; line-height: 1.7; color: rgba(255,255,255,0.64); max-width: 56ch; }

        /* ── SPÉCIALITÉS ── */
        .pat3-specs { margin-top: 46px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; }
        .pat3-spec {
          position: relative; isolation: isolate; overflow: hidden;
          padding: 26px 20px; border-radius: 16px; cursor: default;
          background: linear-gradient(180deg, rgba(255,255,255,0.045), rgba(255,255,255,0.01));
          border: 1px solid rgba(255,255,255,0.08);
          transition: transform 0.32s cubic-bezier(0.22,1,0.36,1), border-color 0.32s ease, box-shadow 0.32s ease;
        }
        .pat3-spec::before {
          content: ""; position: absolute; inset: 0; z-index: -1; opacity: 0; transition: opacity 0.32s ease;
          background: radial-gradient(120% 100% at 50% 0%, rgba(var(--color-teal-rgb), 0.22), transparent 60%);
        }
        .pat3-spec:hover {
          transform: translateY(-5px);
          border-color: rgba(var(--color-teal-rgb), 0.5);
          box-shadow: 0 24px 50px -28px rgba(var(--color-teal-rgb), 0.9);
        }
        .pat3-spec:hover::before { opacity: 1; }
        .pat3-spec__icon {
          width: 44px; height: 44px; border-radius: 12px; display: grid; place-items: center;
          background: rgba(var(--color-teal-rgb), 0.12);
          color: var(--color-teal); font-size: 18px; margin-bottom: 16px;
          transition: background 0.32s ease, color 0.32s ease;
        }
        .pat3-spec:hover .pat3-spec__icon { background: rgba(var(--color-teal-rgb), 0.22); }
        .pat3-spec__name { font-size: 15px; font-weight: 600; color: #fff; }
        .pat3-specs__more {
          grid-column: 1 / -1; margin-top: 8px; font-size: 13px; color: rgba(255,255,255,0.5);
          display: inline-flex; align-items: center; gap: 8px;
        }

        /* ── CONFIANCE ── */
        .pat3-trust { margin-top: 46px; display: grid; grid-template-columns: repeat(2, 1fr); gap: 18px; }
        .pat3-trust__card {
          display: grid; grid-template-columns: 52px 1fr; gap: 18px; align-items: start;
          padding: 26px; border-radius: 18px;
          background: linear-gradient(180deg, rgba(255,255,255,0.05), rgba(255,255,255,0.015));
          border: 1px solid rgba(255,255,255,0.08);
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .pat3-trust__card:hover { border-color: rgba(var(--color-teal-rgb), 0.4); transform: translateY(-3px); }
        .pat3-trust__icon {
          width: 52px; height: 52px; border-radius: 14px; display: grid; place-items: center;
          background: rgba(var(--color-teal-rgb), 0.12); color: var(--color-teal); font-size: 20px;
        }
        .pat3-trust__title {
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: 19px; color: #fff; margin-bottom: 7px;
        }
        .pat3-trust__body { font-size: 14px; line-height: 1.65; color: rgba(255,255,255,0.62); }

        /* ── CTA final ── */
        .pat3-cta {
          position: relative; z-index: 2; overflow: hidden;
          margin: clamp(40px, 7vh, 80px) 0 0;
        }
        .pat3-cta__panel {
          position: relative; overflow: hidden; border-radius: 28px;
          padding: clamp(48px, 8vw, 96px) clamp(28px, 6vw, 80px); text-align: center;
          background:
            radial-gradient(80% 120% at 50% -10%, rgba(var(--color-teal-rgb), 0.30), transparent 60%),
            linear-gradient(160deg, var(--color-navy) 0%, var(--color-dark-1) 70%);
          border: 1px solid rgba(var(--color-teal-rgb), 0.30);
          box-shadow: 0 40px 90px -50px rgba(var(--color-teal-rgb), 0.9);
        }
        .pat3-cta__glow {
          position: absolute; left: 50%; top: -30%; width: 70%; height: 80%; transform: translateX(-50%);
          background: radial-gradient(50% 50% at 50% 50%, rgba(var(--color-teal-rgb), 0.45), transparent 70%);
          filter: blur(30px); pointer-events: none;
          animation: pat3-breathe 6s ease-in-out infinite;
        }
        @keyframes pat3-breathe { 0%, 100% { opacity: 0.55; } 50% { opacity: 1; } }
        .pat3-cta__title {
          position: relative;
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600;
          font-size: clamp(30px, 5.4vw, 60px); line-height: 1.05; letter-spacing: -0.02em; color: #fff;
          max-width: 20ch; margin: 0 auto;
        }
        .pat3-cta__title em { font-style: italic; color: var(--color-teal); }
        .pat3-cta__lead {
          position: relative; margin: 18px auto 0; max-width: 52ch;
          font-size: clamp(15px, 1.6vw, 18px); line-height: 1.7; color: rgba(255,255,255,0.72);
        }
        .pat3-cta__actions { position: relative; margin-top: 34px; display: flex; flex-wrap: wrap; gap: 16px; justify-content: center; }
        .pat3-cta__soon {
          position: relative; margin-top: 22px; font-size: 12.5px; color: rgba(255,255,255,0.5);
          display: inline-flex; align-items: center; gap: 8px;
        }
        .pat3-cta__soon i { color: var(--color-teal); }

        /* ── Footer ── */
        .pat3-foot {
          position: relative; z-index: 2;
          margin-top: clamp(48px, 8vh, 90px); padding: 40px 0 56px;
          border-top: 1px solid rgba(255,255,255,0.08);
        }
        .pat3-foot__row { display: flex; align-items: center; justify-content: space-between; gap: 18px; flex-wrap: wrap; }
        .pat3-foot__brand {
          display: inline-flex; align-items: center; gap: 10px;
          font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 18px; color: #fff;
        }
        .pat3-foot__links { display: flex; gap: 22px; flex-wrap: wrap; }
        .pat3-foot__links a { font-size: 13px; color: rgba(255,255,255,0.6); transition: color 0.25s ease; }
        .pat3-foot__links a:hover { color: var(--color-teal); }
        .pat3-foot__legal {
          margin-top: 24px; font-size: 12px; line-height: 1.7; color: rgba(255,255,255,0.42); max-width: 78ch;
        }
        .pat3-foot__legal b { color: rgba(255,255,255,0.66); font-weight: 600; }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pat3-stats { grid-template-columns: repeat(2, 1fr); }
          .pat3-specs { grid-template-columns: repeat(2, 1fr); }
          .pat3-trust { grid-template-columns: 1fr; }
        }
        @media (max-width: 540px) {
          .pat3-hero__cta { gap: 12px; }
          .pat3-btn { width: 100%; justify-content: center; }
          .pat3-stats { grid-template-columns: 1fr 1fr; gap: 12px; }
          .pat3-specs { grid-template-columns: 1fr 1fr; gap: 12px; }
          .pat3-step { grid-template-columns: 44px 1fr; gap: 16px; }
          .pat3-trust__card { grid-template-columns: 1fr; }
        }

        /* ── Reduced motion : on neutralise TOUT ── */
        @media (prefers-reduced-motion: reduce) {
          .pat3__mesh,
          .pat3-nav__dot,
          .pat3-hero__ecg path,
          .pat3-cta__glow {
            animation: none !important;
          }
          .pat3-hero__ecg path {
            stroke-dasharray: none !important; stroke-dashoffset: 0 !important;
          }
          .pat3-rotor__item { transition: none !important; }
          [data-reveal] { opacity: 1 !important; transform: none !important; transition: none !important; }
          .pat3-btn, .pat3-spec, .pat3-trust__card { transition: none !important; }
          .pat3-btn:hover, .pat3-spec:hover, .pat3-trust__card:hover { transform: none !important; }
        }
      `}</style>

      {/* Atmosphère */}
      <div className="pat3__mesh" aria-hidden="true" />
      <div className="pat3__veil" aria-hidden="true" />
      <div className="pat3__grain" aria-hidden="true" />

      <div className="pat3__inner">
        {/* ── NAV ── */}
        <nav className="pat3-nav" aria-label="Navigation de la variante">
          <span className="pat3-nav__brand">
            <span className="pat3-nav__dot" aria-hidden="true" />
            DocAgora
          </span>
          <a className="pat3-nav__back" href="/variants">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M19 12H5M11 18l-6-6 6-6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Variantes
          </a>
        </nav>

        {/* ── HERO ── */}
        <header className="pat3-hero">
          {/* Tracé ECG signature */}
          <svg
            className="pat3-hero__ecg"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              className="pat3-ecg--ghost"
              d="M0 100 H300 l18 0 l10 -54 l16 108 l14 -130 l16 156 l12 -80 l10 0 H720 l18 0 l10 -54 l16 108 l14 -130 l16 156 l12 -80 l10 0 H1200"
            />
            <path d="M0 100 H300 l18 0 l10 -54 l16 108 l14 -130 l16 156 l12 -80 l10 0 H720 l18 0 l10 -54 l16 108 l14 -130 l16 156 l12 -80 l10 0 H1200" />
          </svg>

          <p className="pat3-hero__eyebrow">
            <span aria-hidden="true" />
            Santé · Portugal · en PT · FR · EN
          </p>

          <h1 className="pat3-hero__title">
            Trouvez qui prend soin de vous avec{" "}
            <span className="pat3-rotor" aria-hidden="true">
              {ROTATING_WORDS.map((w, i) => (
                <span
                  key={w}
                  className={`pat3-rotor__item${i === wordIndex ? " is-active" : ""}`}
                >
                  {w}
                </span>
              ))}
            </span>
            <span className="pat3-sr-only" style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>
              confiance
            </span>
            .
          </h1>

          <p className="pat3-hero__lead">
            DocAgora rassemble des professionnels de santé vérifiés et vous aide à les
            trouver par spécialité, ville et langue. La recherche est gratuite &mdash;
            sans inscription, sans complication.
          </p>

          <div className="pat3-hero__cta">
            <a className="pat3-btn pat3-btn--primary" href="#specialites">
              Commencer la recherche
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 12h14M13 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
            <a className="pat3-btn pat3-btn--ghost" href="#comment-ca-marche">
              Comment ça marche
            </a>
          </div>

          <p className="pat3-hero__note">
            <i className="fas fa-calendar-check" aria-hidden="true" />
            Prise de rendez-vous en ligne <strong>&laquo;&nbsp;bientôt&nbsp;&raquo;</strong>.
          </p>
        </header>

        {/* ── STATS ── */}
        <section className="pat3-sec" aria-labelledby="pat3-stats-title">
          <div data-reveal>
            <p className="pat3-sec__kicker">En chiffres</p>
            <h2 className="pat3-sec__title" id="pat3-stats-title">
              Une porte d’entrée <em>claire</em> vers la santé
            </h2>
          </div>

          <div className="pat3-stats" ref={statsRef}>
            {STATS.map((s, i) => (
              <div
                className="pat3-stat"
                data-reveal
                key={s.label}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <Counter stat={s} active={statsActive} />
                <span className="pat3-stat__label">{s.label}</span>
              </div>
            ))}
          </div>

          <p className="pat3-stats__note" data-reveal>
            * Chiffres illustratifs, présentés à des fins de démonstration de cette variante.
          </p>
        </section>

        {/* ── COMMENT ÇA MARCHE (timeline) ── */}
        <section className="pat3-sec" id="comment-ca-marche" aria-labelledby="pat3-how-title">
          <div data-reveal>
            <p className="pat3-sec__kicker">Comment ça marche</p>
            <h2 className="pat3-sec__title" id="pat3-how-title">
              Quatre étapes, <em>sans bruit</em>
            </h2>
            <p className="pat3-sec__lead">
              Chaque étape est conçue pour être transparente. Aujourd’hui nous facilitons la
              découverte ; la prise de rendez-vous en ligne arrive ensuite.
            </p>
          </div>

          <ol className="pat3-tl">
            {STEPS.map((step, i) => (
              <li
                className="pat3-step"
                data-reveal
                key={step.k}
                style={{ transitionDelay: `${i * 90}ms` }}
              >
                <span className="pat3-step__dot" aria-hidden="true">
                  {step.k}
                </span>
                <div>
                  <h3 className="pat3-step__title">{step.title}</h3>
                  <p className="pat3-step__body">{step.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* ── SPÉCIALITÉS ── */}
        <section className="pat3-sec" id="specialites" aria-labelledby="pat3-spec-title">
          <div data-reveal>
            <p className="pat3-sec__kicker">Spécialités</p>
            <h2 className="pat3-sec__title" id="pat3-spec-title">
              16 domaines, <em>une seule recherche</em>
            </h2>
            <p className="pat3-sec__lead">
              De la médecine générale à la dermatologie, trouvez le professionnel adapté à
              votre besoin. Voici quelques-unes des spécialités disponibles.
            </p>
          </div>

          <div className="pat3-specs">
            {SPECIALTIES.map((sp, i) => (
              <article
                className="pat3-spec"
                data-reveal
                key={sp.name}
                style={{ transitionDelay: `${(i % 4) * 70}ms` }}
              >
                <span className="pat3-spec__icon" aria-hidden="true">
                  <i className={`fas ${sp.icon}`} />
                </span>
                <h3 className="pat3-spec__name">{sp.name}</h3>
              </article>
            ))}
            <p className="pat3-specs__more" data-reveal>
              <i className="fas fa-plus" aria-hidden="true" />
              … et 8 autres spécialités, pour un total de 16.
            </p>
          </div>
        </section>

        {/* ── CONFIANCE ── */}
        <section className="pat3-sec" aria-labelledby="pat3-trust-title">
          <div data-reveal>
            <p className="pat3-sec__kicker">Confiance</p>
            <h2 className="pat3-sec__title" id="pat3-trust-title">
              Construit sur la <em>rigueur</em> et le respect
            </h2>
            <p className="pat3-sec__lead">
              La santé est un sujet sensible. C’est pourquoi nous plaçons la vérification et
              la protection des données au cœur de tout ce que nous faisons.
            </p>
          </div>

          <div className="pat3-trust">
            {TRUST.map((t, i) => (
              <article
                className="pat3-trust__card"
                data-reveal
                key={t.title}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <span className="pat3-trust__icon" aria-hidden="true">
                  <i className={`fas ${t.icon}`} />
                </span>
                <div>
                  <h3 className="pat3-trust__title">{t.title}</h3>
                  <p className="pat3-trust__body">{t.body}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── CTA FINAL ── */}
        <section className="pat3-cta" aria-labelledby="pat3-cta-title">
          <div className="pat3-cta__panel" data-reveal>
            <div className="pat3-cta__glow" aria-hidden="true" />
            <h2 className="pat3-cta__title" id="pat3-cta-title">
              Votre prochaine démarche de santé <em>commence ici</em>
            </h2>
            <p className="pat3-cta__lead">
              Explorez dès maintenant les professionnels vérifiés près de chez vous. Gratuit,
              en trois langues, sans engagement.
            </p>
            <div className="pat3-cta__actions">
              <a className="pat3-btn pat3-btn--primary" href="#specialites">
                Rechercher des professionnels
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14M13 6l6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a className="pat3-btn pat3-btn--ghost" href="#comment-ca-marche">
                En savoir plus
              </a>
            </div>
            <p className="pat3-cta__soon">
              <i className="fas fa-bell" aria-hidden="true" />
              Vous souhaitez être averti à l’ouverture de la prise de rendez-vous en ligne&nbsp;? Bientôt.
            </p>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className="pat3-foot">
          <div className="pat3-foot__row">
            <span className="pat3-foot__brand">
              <span className="pat3-nav__dot" aria-hidden="true" />
              DocAgora
            </span>
            <nav className="pat3-foot__links" aria-label="Liens du pied de page">
              <a href="#comment-ca-marche">Comment ça marche</a>
              <a href="#specialites">Spécialités</a>
              <a href="#">Confidentialité</a>
              <a href="/variants">Variantes</a>
            </nav>
          </div>
          <p className="pat3-foot__legal">
            <b>Variante de démonstration interne &mdash; &laquo;&nbsp;Sinal Vital&nbsp;&raquo;.</b> Tous
            les chiffres, exemples et contenus sont illustratifs. DocAgora propose une recherche
            gratuite de professionnels de santé vérifiés ; la prise de rendez-vous en ligne
            est indiquée comme &laquo;&nbsp;bientôt&nbsp;&raquo;. Il n’existe pas, à ce stade, de téléconsultation,
            de paiement en ligne, d’ordonnance électronique ni de remboursement d’assurance.
          </p>
        </footer>
      </div>
    </main>
  );
}
