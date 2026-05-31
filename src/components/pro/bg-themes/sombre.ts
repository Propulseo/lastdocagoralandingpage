// sombre — background harmonization theme for the pro landing
// Dark-dominant, cinematic premium re-skin. Fully scoped to
// .pro-bg-root[data-bg="sombre"]. Layouts untouched: backgrounds only.
//
// MOTIF: one unified fine dot grid (light dots on dark sections,
// dark dots on light sections) at low opacity, baked into each
// section's background shorthand. Recurring cobalt/teal radial glows
// thread every dark section. Light sections are a cool dim blue-grey
// (recede, never bright white) yet stay light enough for dark text.
// Smooth gradient seams fade every light<->dark boundary.
//
// IMPORTANT: this is a template literal. Never use the dollar+brace
// sequence anywhere below. Plain CSS only.

export const BG_SOMBRE = `
  /* ============================================================
     Base canvas behind everything — deepest navy-black so any
     gap between sections reads as part of the dark family.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] {
    background-color: var(--color-dark-2);
  }

  /* ============================================================
     1. HERO — DARK (white text). Airy at top, settling into navy.
     Unified dark base; keep the component's own glow child layers.
     A teal/cobalt accent pair + fine light dot grid + a bottom
     seam fade into the next (light) section.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-hero {
    background:
      /* fine light dot grid (unified motif) */
      radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px) 0 0 / 30px 30px,
      /* signature accent glows */
      radial-gradient(70% 55% at 18% 12%, rgba(var(--color-cobalt-rgb), 0.22) 0%, transparent 60%),
      radial-gradient(60% 60% at 88% 90%, rgba(var(--color-teal-rgb), 0.14) 0%, transparent 58%),
      /* bottom seam: fade toward the dim light section below */
      linear-gradient(180deg, transparent 78%, rgba(233,237,243,0.10) 100%),
      /* unified dark base — airy top, navy depth */
      linear-gradient(160deg, var(--color-dark-1) 0%, #16243f 62%, var(--color-navy) 100%)
      var(--color-dark-1) !important;
  }

  /* ============================================================
     2. IMPROVE — LIGHT (dark text). Cool dim blue-grey, NOT white.
     Overrides the inline flat light-1. Dark dot grid + soft top
     vignette so it recedes; top + bottom seams fade to neighbours.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-improve {
    background:
      /* fine dark dot grid (unified motif, inverted for light bg) */
      radial-gradient(rgba(var(--color-navy-rgb), 0.06) 1px, transparent 1.4px) 0 0 / 30px 30px,
      /* top seam: receive hero's dark, fade down */
      linear-gradient(180deg, rgba(var(--color-dark-1-rgb), 0.10) 0%, transparent 16%),
      /* bottom seam: hand off to the features dark section */
      linear-gradient(180deg, transparent 84%, rgba(var(--color-dark-1-rgb), 0.10) 100%),
      /* dim cool vignette so the panel reads recessed */
      radial-gradient(120% 90% at 50% 0%, #eef2f7 0%, #e9edf3 70%, #e6eaf1 100%)
      #e9edf3 !important;
  }

  /* ============================================================
     3. FEATURES — DARK (white text). Unified with hero but a touch
     deeper. Cobalt glow signature + light dot grid + top/bottom
     seams blending the surrounding light sections.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-features {
    background:
      radial-gradient(rgba(255,255,255,0.045) 1px, transparent 1.4px) 0 0 / 30px 30px,
      radial-gradient(65% 55% at 82% 14%, rgba(var(--color-cobalt-rgb), 0.20) 0%, transparent 60%),
      radial-gradient(55% 55% at 10% 95%, rgba(var(--color-teal-rgb), 0.10) 0%, transparent 58%),
      /* seams: dim light above and below */
      linear-gradient(180deg, rgba(233,237,243,0.10) 0%, transparent 12%),
      linear-gradient(180deg, transparent 88%, rgba(233,237,243,0.10) 100%),
      /* unified dark base — a shade deeper than hero */
      linear-gradient(155deg, var(--color-dark-1) 0%, #111a2e 60%, var(--color-navy) 100%)
      var(--color-dark-1) !important;
  }

  /* ============================================================
     4. WHY — LIGHT (dark text). Neutralize the vertical hairline
     ::before grid, then paint the unified dim light bg with the
     dark dot motif + faint navy hairline columns of our own (baked
     into the background, no overlay pseudo).
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-why::before {
    background: none !important;
    background-image: none !important;
  }
  .pro-bg-root[data-bg="sombre"] .pro-s-why {
    background:
      /* dark dot grid (unified motif) */
      radial-gradient(rgba(var(--color-navy-rgb), 0.06) 1px, transparent 1.4px) 0 0 / 30px 30px,
      /* our own faint vertical hairline columns, very subtle */
      repeating-linear-gradient(90deg, rgba(var(--color-navy-rgb), 0.035) 0 1px, transparent 1px 25%),
      /* seams: dark above and below */
      linear-gradient(180deg, rgba(var(--color-dark-1-rgb), 0.10) 0%, transparent 14%),
      linear-gradient(180deg, transparent 86%, rgba(var(--color-dark-1-rgb), 0.10) 100%),
      /* dim cool recessed base */
      radial-gradient(120% 95% at 50% 0%, #eef2f7 0%, #e9edf3 72%, #e6eaf1 100%)
      #e9edf3 !important;
  }

  /* ============================================================
     5. REVIEWS — LIGHT (dark text). Kill the off-system raster
     topographic JPG, then paint a faint gradient "contour" feel
     using soft mesh + the dark dot motif on the dim light base.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-reviews .bg-img {
    display: none !important;
  }
  .pro-bg-root[data-bg="sombre"] .pro-s-reviews {
    background:
      /* dark dot grid (unified motif) */
      radial-gradient(rgba(var(--color-navy-rgb), 0.055) 1px, transparent 1.4px) 0 0 / 30px 30px,
      /* faint brand mesh echoing the dark sections' glows, but pale */
      radial-gradient(80% 70% at 88% 8%, rgba(var(--color-cobalt-rgb), 0.05) 0%, transparent 55%),
      radial-gradient(70% 70% at 6% 100%, rgba(var(--color-mint-rgb), 0.05) 0%, transparent 55%),
      /* seams: dark above and below */
      linear-gradient(180deg, rgba(var(--color-dark-1-rgb), 0.10) 0%, transparent 14%),
      linear-gradient(180deg, transparent 86%, rgba(var(--color-dark-1-rgb), 0.10) 100%),
      /* dim cool recessed base */
      radial-gradient(120% 95% at 50% 100%, #eef2f7 0%, #e9edf3 72%, #e6eaf1 100%)
      #e9edf3 !important;
  }

  /* ============================================================
     6. EARLY — DARK-ish (white text + white ticket card).
     Neutralize the saturated cobalt mesh + dot ::before, then
     bring into the unified dark family: mid-navy depth with the
     signature glows, lighter dot grid, top seam from the dim light
     section, bottom seam easing into the darkest CTA finale.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-early::before {
    background: none !important;
    background-image: none !important;
  }
  .pro-bg-root[data-bg="sombre"] .pro-s-early {
    background:
      /* fine light dot grid (unified motif) */
      radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1.4px) 0 0 / 30px 30px,
      /* signature accent glows — desaturated vs the original */
      radial-gradient(70% 60% at 14% 4%, rgba(var(--color-cobalt-rgb), 0.18) 0%, transparent 58%),
      radial-gradient(65% 70% at 90% 104%, rgba(var(--color-teal-rgb), 0.12) 0%, transparent 56%),
      /* top seam from the dim light reviews section */
      linear-gradient(180deg, rgba(233,237,243,0.10) 0%, transparent 12%),
      /* bottom seam easing into the near-black CTA */
      linear-gradient(180deg, transparent 80%, rgba(8,7,11,0.55) 100%),
      /* unified dark base — mid-navy, the brightest of the dark family */
      linear-gradient(155deg, var(--color-navy) 0%, #15233d 58%, var(--color-dark-1) 100%)
      var(--color-dark-1) !important;
  }

  /* ============================================================
     7. CTA — DARKEST finale (off-white text). Neutralize the
     blueprint grid ::before and grain ::after, then paint the
     deepest near-black base with the unified light dot grid, a
     faint blueprint baked in, accent glows, and a top seam from
     the early section.
     ============================================================ */
  .pro-bg-root[data-bg="sombre"] .pro-s-cta::before,
  .pro-bg-root[data-bg="sombre"] .pro-s-cta::after {
    display: none !important;
  }
  .pro-bg-root[data-bg="sombre"] .pro-s-cta {
    background:
      /* fine light dot grid (unified motif) */
      radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1.4px) 0 0 / 30px 30px,
      /* baked blueprint hairline grid, very faint, fading at edges */
      repeating-linear-gradient(0deg, rgba(244,243,239,0.030) 0 1px, transparent 1px 64px),
      repeating-linear-gradient(90deg, rgba(244,243,239,0.030) 0 1px, transparent 1px 64px),
      /* signature accent glows at the crown */
      radial-gradient(80% 55% at 50% -8%, rgba(var(--color-teal-rgb), 0.12) 0%, transparent 55%),
      radial-gradient(70% 50% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.08) 0%, transparent 50%),
      /* top seam from the early dark section */
      linear-gradient(180deg, rgba(var(--color-navy-rgb), 0.30) 0%, transparent 18%),
      /* deepest near-black finale base */
      linear-gradient(180deg, #0a0910 0%, #08070b 100%)
      #08070b !important;
  }

  /* ============================================================
     Motion safety — this theme adds no animation, but guard any
     baked transitions/inherited section animations on dark family.
     ============================================================ */
  @media (prefers-reduced-motion: reduce) {
    .pro-bg-root[data-bg="sombre"] .pro-s-hero,
    .pro-bg-root[data-bg="sombre"] .pro-s-features,
    .pro-bg-root[data-bg="sombre"] .pro-s-early,
    .pro-bg-root[data-bg="sombre"] .pro-s-cta {
      background-attachment: scroll;
    }
  }
`;
