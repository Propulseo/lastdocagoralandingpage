"use client";

/**
 * /v2/pro, Landing PRO V2 (configuration FIGÉE, validée).
 *
 * Combo validé : thème Dark · assets Sombres · fond Points · vidéo hero ON ·
 * Hero 3 · Layout fonctionnalités 2. Le studio de sélection a été retiré.
 *
 * Le système de thème (--v2-*) reste en place (inerte sur cette config) pour
 * pouvoir basculer Light/Mixte ou un autre fond plus tard si besoin.
 * Showcase interne, non lié à la nav de prod.
 */

import Link from "next/link";

import Hero3 from "./_components/Hero3";
import Features2 from "./_components/Features2";
import SectionAvantApres from "./_components/SectionAvantApres";
import SectionRoiBento from "./_components/SectionRoiBento";
import SectionEarlyAccess from "./_components/SectionEarlyAccess";
import FooterV2 from "./_components/FooterV2";

export default function ProV2Page() {
  return (
    <div className="v2p" data-theme="dark" data-feat="dark" data-bg="4">
      <style>{`
        /* ============================================================
           V2, TOKENS DE THÈME
           ============================================================ */
        .v2p { box-sizing: border-box; position: relative; isolation: isolate; }
        .v2p *, .v2p *::before, .v2p *::after { box-sizing: border-box; }
        .v2p { --v2-bg: transparent; --v2-header-h: 56px; }
        .v2p {
          --v2-feat-panel-bg: var(--v2-panel-bg);
          --v2-feat-panel-text: var(--v2-panel-text);
          --v2-feat-panel-muted: var(--v2-panel-muted);
          --v2-feat-panel-border: var(--v2-panel-border);
        }

        /* ── DARK (config figée) ── */
        .v2p, .v2p[data-theme="dark"] {
          --v2-canvas: var(--color-dark-1);
          --v2-bg-2: rgba(255,255,255,0.028);
          --v2-surface: rgba(255,255,255,0.05);
          --v2-surface-2: rgba(255,255,255,0.08);
          --v2-panel-bg: #0E1622;
          --v2-panel-text: var(--text-on-dark);
          --v2-panel-muted: var(--text-on-dark-muted);
          --v2-panel-border: rgba(255,255,255,0.10);
          --v2-text: var(--text-on-dark);
          --v2-text-body: rgba(255,255,255,0.72);
          --v2-text-muted: rgba(255,255,255,0.50);
          --v2-border: rgba(255,255,255,0.10);
          --v2-accent: var(--color-teal);
          --v2-accent-2: var(--color-cobalt);
          --v2-accent-text: var(--color-teal);
          --v2-accent-ink: var(--color-dark-1);
          --v2-eyebrow: var(--color-teal);
          --v2-mesh-a: transparent;
          --v2-mesh-b: transparent;
          --v2-mesh-c: transparent;
          --v2-grain-opacity: 0.05;
          --v2-shadow: 0 24px 60px -30px rgba(0,0,0,0.80);
          --v2-shadow-lg: 0 40px 90px -30px rgba(0,0,0,0.85);
          --v2-fx-a: rgba(var(--color-cobalt-rgb), 0.45);
          --v2-fx-b: rgba(var(--color-teal-rgb), 0.30);
          --v2-fx-c: rgba(var(--color-mint-rgb), 0.22);
          --v2-fx-glow: rgba(var(--color-teal-rgb), 0.16);
          --v2-fx-line: rgba(255,255,255,0.06);
          color-scheme: dark;
        }

        /* ── LIGHT (conservé, inerte) ── */
        .v2p[data-theme="light"] {
          --v2-canvas: var(--color-light-1); --v2-bg-2: rgba(var(--color-navy-rgb), 0.035);
          --v2-surface: #FFFFFF; --v2-surface-2: var(--color-light-2);
          --v2-panel-bg: #FFFFFF; --v2-panel-text: var(--color-dark-1); --v2-panel-muted: var(--text-muted); --v2-panel-border: var(--border-default);
          --v2-text: var(--color-dark-1); --v2-text-body: #44505F; --v2-text-muted: var(--text-muted); --v2-border: var(--border-default);
          --v2-accent: var(--color-teal); --v2-accent-2: var(--color-cobalt); --v2-accent-text: var(--color-accent-ink); --v2-accent-ink: var(--color-dark-1); --v2-eyebrow: var(--color-accent-ink);
          --v2-grain-opacity: 0.025;
          --v2-shadow: 0 18px 50px -24px rgba(var(--color-navy-rgb), 0.16); --v2-shadow-lg: 0 30px 70px -28px rgba(var(--color-navy-rgb), 0.22);
          --v2-fx-a: rgba(var(--color-cobalt-rgb), 0.16); --v2-fx-b: rgba(var(--color-teal-rgb), 0.14); --v2-fx-c: rgba(var(--color-mint-rgb), 0.10);
          --v2-fx-glow: rgba(var(--color-teal-rgb), 0.10); --v2-fx-line: rgba(var(--color-navy-rgb), 0.06);
          color-scheme: light;
        }

        /* ── MIXTE (conservé, inerte) ── */
        .v2p[data-theme="mixte"] {
          --v2-canvas: #FAFCFE; --v2-bg-2: rgba(var(--color-navy-rgb), 0.04);
          --v2-surface: #FFFFFF; --v2-surface-2: var(--color-light-2);
          --v2-panel-bg: #0E1622; --v2-panel-text: var(--text-on-dark); --v2-panel-muted: rgba(255,255,255,0.58); --v2-panel-border: rgba(255,255,255,0.12);
          --v2-text: var(--color-dark-1); --v2-text-body: #44505F; --v2-text-muted: var(--text-muted); --v2-border: var(--border-default);
          --v2-accent: var(--color-teal); --v2-accent-2: var(--color-cobalt); --v2-accent-text: var(--color-accent-ink); --v2-accent-ink: var(--color-dark-1); --v2-eyebrow: var(--color-accent-ink);
          --v2-grain-opacity: 0.03;
          --v2-shadow: 0 18px 50px -24px rgba(var(--color-navy-rgb), 0.16); --v2-shadow-lg: 0 36px 80px -30px rgba(var(--color-navy-rgb), 0.30);
          --v2-fx-a: rgba(var(--color-cobalt-rgb), 0.16); --v2-fx-b: rgba(var(--color-teal-rgb), 0.13); --v2-fx-c: rgba(var(--color-navy-rgb), 0.10);
          --v2-fx-glow: rgba(var(--color-cobalt-rgb), 0.11); --v2-fx-line: rgba(var(--color-navy-rgb), 0.06);
          color-scheme: light;
        }
        .v2p[data-theme="mixte"][data-contrast="doux"] { --v2-canvas: #F4F7FB; --v2-bg-2: rgba(var(--color-navy-rgb), 0.05); --v2-border: #E3E8EF; --v2-panel-bg: #1D2A40; }
        .v2p[data-theme="mixte"][data-contrast="fort"] { --v2-canvas: #FFFFFF; --v2-border: #DFE4EA; --v2-panel-bg: var(--color-dark-2); --v2-shadow: 0 22px 56px -26px rgba(var(--color-navy-rgb), 0.24); }
        .v2p[data-theme="dark"][data-feat="light"],
        .v2p[data-theme="mixte"][data-feat="light"] {
          --v2-panel-bg: #FFFFFF; --v2-panel-text: var(--color-dark-1); --v2-panel-muted: var(--text-muted); --v2-panel-border: var(--border-default);
        }

        /* ============================================================
           CALQUE DE FOND GLOBAL (fond figé : Points)
           ============================================================ */
        .v2p { background: var(--v2-canvas); }
        .v2p__bgfx { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
        .v2p__bgfx::before {
          content: ""; position: absolute; inset: -10%;
          background:
            radial-gradient(42% 38% at 18% 8%, var(--v2-fx-a), transparent 60%),
            radial-gradient(40% 42% at 85% 0%, var(--v2-fx-b), transparent 58%),
            radial-gradient(46% 46% at 60% 108%, var(--v2-fx-c), transparent 60%);
        }
        .v2p__bgfx::after {
          content: ""; position: absolute; inset: 0;
          background-image: var(--v2-fx-pattern, none);
          background-size: var(--v2-fx-pattern-size, 32px 32px);
          opacity: var(--v2-fx-pattern-opacity, 0);
          -webkit-mask-image: radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 80%);
          mask-image: radial-gradient(120% 90% at 50% 0%, #000 35%, transparent 80%);
        }
        .v2p__glow {
          position: fixed; top: -16vh; left: 50%; transform: translateX(-50%);
          width: 120vw; height: 75vh; z-index: 0; pointer-events: none;
          background: radial-gradient(50% 50% at 50% 50%, var(--v2-fx-glow), transparent 70%);
          opacity: var(--v2-fx-glow-strength, 1);
        }

        /* Vidéo de fond du hero */
        .v2p__herovideo {
          position: absolute; top: 0; left: 0; width: 100%;
          height: min(112vh, 1000px); z-index: 0; overflow: hidden; pointer-events: none;
          -webkit-mask-image: linear-gradient(180deg, #000 60%, transparent);
          mask-image: linear-gradient(180deg, #000 60%, transparent);
        }
        .v2p__herovideo video { width: 100%; height: 100%; object-fit: cover; display: block; }
        .v2p__herovideo::after {
          content: ""; position: absolute; inset: 0;
          background: linear-gradient(180deg,
            color-mix(in srgb, var(--v2-canvas) 40%, transparent) 0%,
            color-mix(in srgb, var(--v2-canvas) 72%, transparent) 100%);
        }
        @media (prefers-reduced-motion: reduce) {
          .v2p__herovideo video { display: none; }
          .v2p__herovideo::after { background: var(--v2-canvas); }
        }

        /* Skin Points (figé) */
        .v2p[data-bg="4"] {
          --v2-fx-pattern: radial-gradient(var(--v2-fx-line) 1.4px, transparent 1.4px);
          --v2-fx-pattern-size: 24px 24px; --v2-fx-pattern-opacity: 1;
          --v2-fx-line: rgba(var(--color-teal-rgb), 0.18);
        }
        .v2p[data-bg="4"] .v2p__bgfx::before { opacity: 0.5; }

        .v2p main { position: relative; z-index: 1; }

        /* ============================================================
           Header
           ============================================================ */
        .v2p__bar {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; gap: 16px;
          padding: 12px clamp(16px, 4vw, 40px);
          background: rgba(7,12,22,0.78);
          backdrop-filter: blur(12px) saturate(1.2);
          -webkit-backdrop-filter: blur(12px) saturate(1.2);
          border-bottom: 1px solid rgba(255,255,255,0.08);
          font-family: var(--font-montserrat), system-ui, sans-serif;
        }
        .v2p__brand { display: inline-flex; align-items: center; gap: 9px; font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 17px; color: #fff; text-decoration: none; letter-spacing: -0.01em; }
        .v2p__brand-dot { width: 22px; height: 22px; border-radius: 6px; display: grid; place-items: center; background: linear-gradient(135deg, #67CBC7, #4A7CC7); color: #0C121E; font-weight: 700; font-size: 13px; font-family: var(--font-montserrat), sans-serif; }
        .v2p__tag { font-family: ui-monospace, "SF Mono", Menlo, monospace; font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #67CBC7; padding: 4px 9px; border-radius: 50px; border: 1px solid rgba(103,203,199,0.4); }
        .v2p__back { margin-left: auto; display: inline-flex; align-items: center; gap: 7px; font-size: 13px; font-weight: 600; color: rgba(255,255,255,0.7); text-decoration: none; transition: color 0.2s ease; }
        .v2p__back:hover { color: #fff; }

        @media (max-width: 600px) { .v2p__tag { display: none; } }
        @media (prefers-reduced-motion: reduce) { .v2p__back { transition: none; } }
      `}</style>

      <div className="v2p__bgfx" aria-hidden="true" />
      <div className="v2p__glow" aria-hidden="true" />
      <div className="v2p__herovideo" aria-hidden="true">
        <video autoPlay muted loop playsInline preload="metadata">
          <source src="/assets/video/hero-bg.mp4" type="video/mp4" />
          <source src="/assets/video/hero-bg.webm" type="video/webm" />
          <source src="/assets/video/hero-bg.mov" type="video/quicktime" />
        </video>
      </div>

      <header className="v2p__bar">
        <Link href="/v2/pro" className="v2p__brand">
          <span className="v2p__brand-dot">D</span>
          DocAgora
        </Link>
        <span className="v2p__tag">Pro · V2</span>
        <Link href="/variants" className="v2p__back">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M19 12H5M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Variantes
        </Link>
      </header>

      <main>
        <Hero3 />
        <Features2 />
        <SectionAvantApres />
        <SectionRoiBento />
        <SectionEarlyAccess />
        <FooterV2 />
      </main>
    </div>
  );
}
