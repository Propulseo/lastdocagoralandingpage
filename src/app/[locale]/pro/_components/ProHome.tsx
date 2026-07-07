import HeroElevated from "./elevated/HeroElevated";
import FeaturesElevated from "./elevated/FeaturesElevated";
import SectionAvantApres from "@/app/[locale]/v2/pro/_components/SectionAvantApres";
import SectionRoiBento from "@/app/[locale]/v2/pro/_components/SectionRoiBento";
import SectionEarlyAccess from "@/app/[locale]/v2/pro/_components/SectionEarlyAccess";
import ReassuranceElevated from "./elevated/ReassuranceElevated";

/**
 * Corps de la home pro (/pro) — version élevée, servie par défaut.
 *
 * Thème DARK (.v2p[data-theme="dark"][data-feat="dark"][data-bg="4"]) + fond
 * Points + vidéo hero hero-bg, puis HeroElevated · FeaturesElevated · SectionAvantApres ·
 * SectionRoiBento · SectionEarlyAccess.
 *
 * NavbarPro et FooterPro sont fournis par le layout pro (pro/layout.tsx) :
 * ce composant n’en rend aucun (pas de FooterV2, pas de header de dev).
 * Les calques v2p__bgfx / v2p__glow sont en position:fixed et couvrent le
 * viewport derrière NavbarPro/FooterPro (fond sombre voulu).
 */
export default function ProHome() {
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
          --v2-canvas: #080C14;
          --v2-bg-2: rgba(255,255,255,0.028);
          --v2-surface: rgba(255,255,255,0.05);
          --v2-surface-2: rgba(255,255,255,0.08);
          --v2-panel-bg: #0E1622;
          --v2-panel-text: #FFFFFF;
          --v2-panel-muted: rgba(255,255,255,0.55);
          --v2-panel-border: rgba(255,255,255,0.10);
          --v2-text: #FFFFFF;
          --v2-text-body: rgba(255,255,255,0.72);
          --v2-text-muted: rgba(255,255,255,0.50);
          --v2-border: rgba(255,255,255,0.10);
          --v2-accent: #67CBC7;
          --v2-accent-2: #4A7CC7;
          --v2-accent-text: #67CBC7;
          --v2-accent-ink: #0C121E;
          --v2-eyebrow: #67CBC7;
          --v2-mesh-a: transparent;
          --v2-mesh-b: transparent;
          --v2-mesh-c: transparent;
          --v2-grain-opacity: 0.05;
          --v2-shadow: 0 24px 60px -30px rgba(0,0,0,0.80);
          --v2-shadow-lg: 0 40px 90px -30px rgba(0,0,0,0.85);
          --v2-fx-a: rgba(74,124,199,0.45);
          --v2-fx-b: rgba(103,203,199,0.30);
          --v2-fx-c: rgba(90,162,170,0.22);
          --v2-fx-glow: rgba(103,203,199,0.16);
          --v2-fx-line: rgba(255,255,255,0.06);
          color-scheme: dark;
        }

        /* ── LIGHT (conservé, inerte) ── */
        .v2p[data-theme="light"] {
          --v2-canvas: #FCFEFE; --v2-bg-2: rgba(36,72,130,0.035);
          --v2-surface: #FFFFFF; --v2-surface-2: #F8FAFD;
          --v2-panel-bg: #FFFFFF; --v2-panel-text: #0C121E; --v2-panel-muted: #6B7280; --v2-panel-border: #E5E8EA;
          --v2-text: #0C121E; --v2-text-body: #44505F; --v2-text-muted: #6B7280; --v2-border: #E5E8EA;
          --v2-accent: #67CBC7; --v2-accent-2: #4A7CC7; --v2-accent-text: #1E6E68; --v2-accent-ink: #0C121E; --v2-eyebrow: #1E6E68;
          --v2-grain-opacity: 0.025;
          --v2-shadow: 0 18px 50px -24px rgba(36,72,130,0.16); --v2-shadow-lg: 0 30px 70px -28px rgba(36,72,130,0.22);
          --v2-fx-a: rgba(74,124,199,0.16); --v2-fx-b: rgba(103,203,199,0.14); --v2-fx-c: rgba(90,162,170,0.10);
          --v2-fx-glow: rgba(103,203,199,0.10); --v2-fx-line: rgba(36,72,130,0.06);
          color-scheme: light;
        }

        /* ── MIXTE (conservé, inerte) ── */
        .v2p[data-theme="mixte"] {
          --v2-canvas: #FAFCFE; --v2-bg-2: rgba(36,72,130,0.04);
          --v2-surface: #FFFFFF; --v2-surface-2: #F8FAFD;
          --v2-panel-bg: #0E1622; --v2-panel-text: #FFFFFF; --v2-panel-muted: rgba(255,255,255,0.58); --v2-panel-border: rgba(255,255,255,0.12);
          --v2-text: #0C121E; --v2-text-body: #44505F; --v2-text-muted: #6B7280; --v2-border: #E5E8EA;
          --v2-accent: #67CBC7; --v2-accent-2: #4A7CC7; --v2-accent-text: #1E6E68; --v2-accent-ink: #0C121E; --v2-eyebrow: #1E6E68;
          --v2-grain-opacity: 0.03;
          --v2-shadow: 0 18px 50px -24px rgba(36,72,130,0.16); --v2-shadow-lg: 0 36px 80px -30px rgba(36,72,130,0.30);
          --v2-fx-a: rgba(74,124,199,0.16); --v2-fx-b: rgba(103,203,199,0.13); --v2-fx-c: rgba(36,72,130,0.10);
          --v2-fx-glow: rgba(74,124,199,0.11); --v2-fx-line: rgba(36,72,130,0.06);
          color-scheme: light;
        }
        .v2p[data-theme="mixte"][data-contrast="doux"] { --v2-canvas: #F4F7FB; --v2-bg-2: rgba(36,72,130,0.05); --v2-border: #E3E8EF; --v2-panel-bg: #1D2A40; }
        .v2p[data-theme="mixte"][data-contrast="fort"] { --v2-canvas: #FFFFFF; --v2-border: #DFE4EA; --v2-panel-bg: #070C16; --v2-shadow: 0 22px 56px -26px rgba(36,72,130,0.24); }
        .v2p[data-theme="dark"][data-feat="light"],
        .v2p[data-theme="mixte"][data-feat="light"] {
          --v2-panel-bg: #FFFFFF; --v2-panel-text: #0C121E; --v2-panel-muted: #6B7280; --v2-panel-border: #E5E8EA;
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

        /* Skin « Minimal profond » — pas de motif, un halo doux en haut */
        .v2p[data-bg="4"] {
          --v2-fx-pattern: none; --v2-fx-pattern-opacity: 0;
          --v2-fx-glow-strength: 0.7;
        }
        .v2p[data-bg="4"] .v2p__bgfx::before {
          inset: 0;
          background:
            radial-gradient(54% 42% at 50% -8%, rgba(110,147,230,0.17), transparent 62%),
            radial-gradient(40% 30% at 50% 0%, rgba(103,203,199,0.10), transparent 70%);
        }

        .v2p main { position: relative; z-index: 1; }

        /* Rythme vertical resserré (~½) et unifié entre les sections.
           (Séparation : déjà OK — canvas dark continu, Avant/Après fondu,
           vidéo hero masquée ; Réassurance = fine bande bordée, inchangée.) */
        .v2p .v2aa-section,
        .v2p .v2roi-section,
        .v2p .v2ea-section { padding-block: clamp(36px, 5vh, 60px); }
        /* Section Fonctionnalités : padding réduit pour qu'elle tienne dans un écran. */
        .v2p .hef { padding-block: clamp(22px, 3.2vh, 40px); }
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

      <main>
        <HeroElevated />
        <FeaturesElevated />
        <ReassuranceElevated />
        <SectionAvantApres />
        <SectionRoiBento />
        <SectionEarlyAccess />
      </main>
    </div>
  );
}
