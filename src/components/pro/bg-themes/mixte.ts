// mixte — background harmonization theme for the pro landing
// Editorial, high-contrast: a unified deep DARK family (dark-1/navy) alternating
// with a clean cool-tinted LIGHT family (light-1/light-2). Signature motif =
// faint topographic contour rings rendered via repeating-radial gradients,
// tuned light-on-dark vs dark-on-light. Seams = navy->teal brand hairlines
// plus soft glow bands at every light<->dark boundary. Cobalt/teal glows recur
// as the connective thread across all dark sections.
export const BG_MIXTE = `
  /* ====================================================================
     BASE CANVAS — sits behind everything as a safety backdrop
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] {
    background: var(--color-dark-1);
  }

  /* ====================================================================
     SIGNATURE MOTIF NOTES
     - Topographic contour = repeating-radial-gradient of thin rings.
     - On DARK sections: light rings (teal/cobalt) at very low alpha.
     - On LIGHT sections: navy rings at very low alpha.
     - Recurring accent glows = soft radial cobalt/teal on dark sections.
     - Seams baked as extra linear-gradient layers (top/bottom fades) plus a
       navy->teal hairline drawn as a tight gradient band at the edge.
     ==================================================================== */

  /* ====================================================================
     1. HERO — DARK (white text). Keep child glow layers, set unified dark
        base + signature contour + bottom seam fading toward the light
        "improve" section below.
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-hero {
    background:
      /* bottom seam: navy->teal hairline glow band where dark meets light */
      linear-gradient(to bottom, transparent calc(100% - 3px), rgba(var(--color-teal-rgb), 0.55) calc(100% - 1px), transparent),
      linear-gradient(to bottom, transparent 82%, rgba(var(--color-cobalt-rgb), 0.10) 100%),
      /* recurring accent glows (connective thread) */
      radial-gradient(70% 55% at 18% 8%, rgba(var(--color-cobalt-rgb), 0.16), transparent 60%),
      radial-gradient(60% 50% at 88% 4%, rgba(var(--color-teal-rgb), 0.12), transparent 58%),
      /* signature topographic contour, light-on-dark */
      repeating-radial-gradient(circle at 80% 120%, transparent 0 38px, rgba(var(--color-teal-rgb), 0.05) 38px 39px, transparent 39px 76px),
      /* unified dark base */
      linear-gradient(135deg, var(--color-dark-1) 0%, var(--color-navy) 100%)
      !important;
  }

  /* ====================================================================
     2. IMPROVE — LIGHT (dark text). Was flat light-1 via inline style.
        Clean cool-tinted light family + faint navy contour + seam glows
        on both edges (against dark hero above and dark features below).
        Override inline style with !important.
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-improve {
    background:
      /* top seam: soft teal glow lip catching the hero's dark edge */
      linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.08), transparent 9%),
      /* bottom seam: cobalt lip easing into the dark features section */
      linear-gradient(to top, rgba(var(--color-cobalt-rgb), 0.07), transparent 9%),
      /* signature topographic contour, dark-on-light (navy) */
      repeating-radial-gradient(circle at 12% -10%, transparent 0 44px, rgba(var(--color-navy-rgb), 0.035) 44px 45px, transparent 45px 90px),
      /* cool clean light base with a faint vertical tint */
      linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%)
      !important;
  }

  /* ====================================================================
     3. FEATURES — DARK (white text). Unify with hero's dark family.
        Top + bottom seam hairlines (light->dark and dark->light).
        ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-features {
    background:
      /* top seam hairline: navy->teal where it meets light improve */
      linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.50) 0 1px, transparent 3px),
      /* bottom seam hairline toward the light "why" section */
      linear-gradient(to top, rgba(var(--color-cobalt-rgb), 0.42) 0 1px, transparent 3px),
      linear-gradient(to top, rgba(var(--color-cobalt-rgb), 0.09) 0%, transparent 14%),
      /* recurring accent glows */
      radial-gradient(58% 48% at 92% 6%, rgba(var(--color-cobalt-rgb), 0.15), transparent 60%),
      radial-gradient(54% 46% at 6% 94%, rgba(var(--color-teal-rgb), 0.10), transparent 58%),
      /* signature topographic contour, light-on-dark */
      repeating-radial-gradient(circle at 105% 0%, transparent 0 40px, rgba(var(--color-cobalt-rgb), 0.05) 40px 41px, transparent 41px 80px),
      /* unified dark base */
      linear-gradient(135deg, var(--color-dark-1) 0%, var(--color-navy) 100%)
      !important;
  }

  /* ====================================================================
     4. WHY — LIGHT (dark text). Neutralize the existing vertical-line
        ::before, then paint clean light family + signature navy contour
        + seam glows on both edges.
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-why::before {
    background: none !important;
  }
  .pro-bg-root[data-bg="mixte"] .pro-s-why {
    background:
      /* top seam: teal lip catching dark features above */
      linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.08), transparent 9%),
      /* bottom seam: cobalt lip easing into dark reviews-adjacent flow */
      linear-gradient(to top, rgba(var(--color-cobalt-rgb), 0.06), transparent 8%),
      /* signature topographic contour, dark-on-light (navy) */
      repeating-radial-gradient(circle at 98% 110%, transparent 0 46px, rgba(var(--color-navy-rgb), 0.03) 46px 47px, transparent 47px 94px),
      /* clean cool light base */
      linear-gradient(180deg, var(--color-light-2) 0%, var(--color-light-1) 60%, var(--color-light-2) 100%)
      !important;
  }

  /* ====================================================================
     5. REVIEWS — LIGHT (dark text). Kill the off-system raster JPG,
        then paint clean light family + signature navy contour + seams.
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-reviews .bg-img {
    display: none !important;
  }
  .pro-bg-root[data-bg="mixte"] .pro-s-reviews {
    background:
      /* bottom seam: navy->teal lip easing into the dark "early" section */
      linear-gradient(to top, rgba(var(--color-teal-rgb), 0.09), transparent 10%),
      /* faint editorial accent wash, kept light */
      radial-gradient(60% 50% at 88% 10%, rgba(var(--color-cobalt-rgb), 0.05), transparent 60%),
      /* signature topographic contour, dark-on-light (navy) */
      repeating-radial-gradient(circle at 4% -8%, transparent 0 44px, rgba(var(--color-navy-rgb), 0.032) 44px 45px, transparent 45px 90px),
      /* clean cool light base */
      linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 100%)
      !important;
  }

  /* ====================================================================
     6. EARLY — DARK-ish (white text + white ticket card). Neutralize the
        saturated cobalt mesh + dot ::before, then bring INTO the unified
        dark family with restrained glows.
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-early::before {
    background: none !important;
  }
  .pro-bg-root[data-bg="mixte"] .pro-s-early {
    background:
      /* top seam hairline: teal where it meets light reviews above */
      linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.45) 0 1px, transparent 3px),
      linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.07) 0%, transparent 12%),
      /* recurring accent glows, slightly richer to anchor the CTA below */
      radial-gradient(62% 52% at 14% 10%, rgba(var(--color-cobalt-rgb), 0.16), transparent 58%),
      radial-gradient(58% 50% at 90% 96%, rgba(var(--color-teal-rgb), 0.11), transparent 56%),
      /* signature topographic contour, light-on-dark */
      repeating-radial-gradient(circle at -5% 100%, transparent 0 42px, rgba(var(--color-teal-rgb), 0.05) 42px 43px, transparent 43px 84px),
      /* unified dark base */
      linear-gradient(135deg, var(--color-dark-1) 0%, var(--color-navy) 100%)
      !important;
  }

  /* ====================================================================
     7. CTA — DARKEST finale (off-white text). Neutralize blueprint grid
        ::before and grain ::after, then paint the deepest member of the
        dark family with a top seam continuing from "early".
     ==================================================================== */
  .pro-bg-root[data-bg="mixte"] .pro-s-cta::before,
  .pro-bg-root[data-bg="mixte"] .pro-s-cta::after {
    display: none !important;
  }
  .pro-bg-root[data-bg="mixte"] .pro-s-cta {
    background:
      /* top seam hairline: cobalt->teal continuing the dark family flow */
      linear-gradient(to bottom, rgba(var(--color-cobalt-rgb), 0.40) 0 1px, transparent 3px),
      /* recurring accent glows, kept low for a confident finale */
      radial-gradient(110% 80% at 12% -8%, rgba(var(--color-teal-rgb), 0.10), transparent 55%),
      radial-gradient(85% 65% at 100% 0%, rgba(var(--color-cobalt-rgb), 0.08), transparent 50%),
      /* signature topographic contour, light-on-dark, finest at very low alpha */
      repeating-radial-gradient(circle at 50% -10%, transparent 0 48px, rgba(var(--color-cobalt-rgb), 0.04) 48px 49px, transparent 49px 98px),
      /* deepest base of the unified dark family */
      linear-gradient(180deg, var(--color-dark-1) 0%, var(--color-dark-2) 100%)
      !important;
  }
`;
