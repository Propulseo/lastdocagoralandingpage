// clair — background harmonization theme for the pro landing
// Light-dominant, clinical, airy, trustworthy healthcare system.
// Light sections stay bright & luminous (dark text safe); dark sections are
// re-skinned into the BRAND BLUE family (navy -> cobalt-tinted navy, never near-black)
// so white text stays legible while feeling friendlier than the current near-black.
// Unified motif: an airy fine dot grid, tuned dark-on-light vs light-on-dark.
// Fully scoped under .pro-bg-root[data-bg="clair"]. Plain CSS only.

export const BG_CLAIR = `
  /* ============================================================
     CLAIR — base canvas behind everything (bright, airy)
     ============================================================ */
  .pro-bg-root[data-bg="clair"] {
    background:
      radial-gradient(140% 120% at 50% -10%, rgba(var(--color-teal-rgb), 0.05), transparent 60%),
      var(--color-light-1);
  }

  /* ============================================================
     1. HERO — DARK (white text) -> friendly brand blue
     Keep its own .hero-pro__glow-* child layers; we set a lighter,
     clearly-blue navy/cobalt base + airy light dot grid + bottom seam.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-hero {
    background:
      radial-gradient(85% 70% at 12% 8%, rgba(var(--color-cobalt-rgb), 0.30), transparent 58%),
      radial-gradient(80% 75% at 92% 18%, rgba(var(--color-teal-rgb), 0.16), transparent 55%),
      radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.05) 1px, transparent 1.6px),
      linear-gradient(180deg, transparent 78%, rgba(var(--color-navy-rgb), 0.18) 100%),
      linear-gradient(150deg, #1c3a6b 0%, #2a4f8f 48%, #244882 100%) !important;
    background-size: auto, auto, 30px 30px, 100% 100%, 100% 100% !important;
  }

  /* ============================================================
     2. IMPROVE — LIGHT (dark text). Flat inline light-1 -> bright,
     airy, faint teal/warm tint + dark-on-light dot grid + top seam
     fading down from the hero blue.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-improve {
    background:
      linear-gradient(180deg, rgba(var(--color-navy-rgb), 0.05) 0%, transparent 14%),
      radial-gradient(120% 90% at 50% 0%, rgba(var(--color-teal-rgb), 0.05), transparent 60%),
      radial-gradient(circle at 16% 20%, rgba(var(--color-navy-rgb), 0.05) 1px, transparent 1.6px),
      linear-gradient(180deg, var(--color-light-2) 0%, var(--color-light-1) 55%) !important;
    background-size: 100% 100%, auto, 30px 30px, 100% 100% !important;
  }

  /* ============================================================
     3. FEATURES — DARK (white text). Unify with the hero brand blue.
     Same navy/cobalt gradient + cobalt glow + light dots + top/bottom seams.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-features {
    background:
      radial-gradient(80% 65% at 88% 6%, rgba(var(--color-cobalt-rgb), 0.26), transparent 56%),
      radial-gradient(75% 70% at 6% 96%, rgba(var(--color-teal-rgb), 0.14), transparent 55%),
      radial-gradient(circle at 22% 28%, rgba(255, 255, 255, 0.045) 1px, transparent 1.6px),
      linear-gradient(180deg, rgba(var(--color-navy-rgb), 0.22) 0%, transparent 10%, transparent 90%, rgba(var(--color-navy-rgb), 0.20) 100%),
      linear-gradient(150deg, #21437d 0%, #2c5293 50%, #244882 100%) !important;
    background-size: auto, auto, 30px 30px, 100% 100%, 100% 100% !important;
  }

  /* ============================================================
     4. WHY — LIGHT (dark text). Neutralize its vertical hairline
     ::before, then paint a bright airy base with dot grid + top seam
     fading down from the features blue.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-why::before {
    background: none !important;
    opacity: 0 !important;
  }
  .pro-bg-root[data-bg="clair"] .pro-s-why {
    background:
      linear-gradient(180deg, rgba(var(--color-navy-rgb), 0.06) 0%, transparent 16%),
      radial-gradient(110% 80% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.045), transparent 55%),
      radial-gradient(circle at 16% 20%, rgba(var(--color-navy-rgb), 0.05) 1px, transparent 1.6px),
      linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%) !important;
    background-size: 100% 100%, auto, 30px 30px, 100% 100% !important;
  }

  /* ============================================================
     5. REVIEWS — LIGHT (dark text). Kill the off-system raster JPG,
     then paint a bright airy base + dot grid + teal tint + soft seams.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-reviews .bg-img {
    display: none !important;
  }
  .pro-bg-root[data-bg="clair"] .pro-s-reviews {
    background:
      radial-gradient(120% 90% at 50% 0%, rgba(var(--color-teal-rgb), 0.06), transparent 58%),
      radial-gradient(100% 80% at 0% 100%, rgba(var(--color-mint-rgb), 0.045), transparent 55%),
      radial-gradient(circle at 18% 22%, rgba(var(--color-navy-rgb), 0.045) 1px, transparent 1.6px),
      linear-gradient(180deg, var(--color-light-2) 0%, var(--color-light-1) 50%, var(--color-light-2) 100%) !important;
    background-size: auto, auto, 30px 30px, 100% 100% !important;
    position: relative;
  }

  /* ============================================================
     6. EARLY — DARK-ish (white text + white ticket card).
     Neutralize its saturated cobalt mesh + dot ::before, then bring
     into the unified brand-blue family: softened navy/cobalt gradient
     + gentle teal/cobalt glows + light dots + top/bottom seams.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-early::before {
    background: none !important;
    opacity: 0 !important;
  }
  .pro-bg-root[data-bg="clair"] .pro-s-early {
    background:
      radial-gradient(95% 80% at 12% 0%, rgba(var(--color-cobalt-rgb), 0.30), transparent 56%),
      radial-gradient(90% 85% at 92% 108%, rgba(var(--color-teal-rgb), 0.18), transparent 55%),
      radial-gradient(circle at 20% 26%, rgba(255, 255, 255, 0.05) 1px, transparent 1.6px),
      linear-gradient(180deg, rgba(var(--color-navy-rgb), 0.20) 0%, transparent 9%, transparent 91%, rgba(var(--color-navy-rgb), 0.24) 100%),
      linear-gradient(155deg, #234580 0%, #2b5191 52%, #20406f 100%) !important;
    background-size: auto, auto, 30px 30px, 100% 100%, 100% 100% !important;
  }

  /* ============================================================
     7. CTA — DARK finale (off-white text). Neutralize blueprint
     grid ::before + grain ::after. Deepest of the blues, but still
     navy family (no near-black): airy light dots + gentle glows + top seam.
     ============================================================ */
  .pro-bg-root[data-bg="clair"] .pro-s-cta::before,
  .pro-bg-root[data-bg="clair"] .pro-s-cta::after {
    display: none !important;
  }
  .pro-bg-root[data-bg="clair"] .pro-s-cta {
    background:
      radial-gradient(100% 80% at 12% -8%, rgba(var(--color-teal-rgb), 0.14), transparent 55%),
      radial-gradient(85% 70% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.16), transparent 52%),
      radial-gradient(circle at 24% 30%, rgba(255, 255, 255, 0.04) 1px, transparent 1.6px),
      linear-gradient(180deg, rgba(var(--color-navy-rgb), 0.30) 0%, transparent 10%),
      linear-gradient(160deg, #1a3666 0%, #15294f 55%, #112241 100%) !important;
    background-size: auto, auto, 30px 30px, 100% 100%, 100% 100% !important;
  }

  /* ============================================================
     Reduced-motion: this theme is static (no animation added), so
     nothing to disable. Existing section animations remain untouched.
     ============================================================ */
`;
