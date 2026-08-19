/* ============================================================
   CSS partagé de la page /pro/about (V2 « preuve par le produit »).
   Canvas dark + shell + primitives (eyebrow, boutons, sections,
   titres). Préfixe « pa2- ». Injecté une seule fois par page.tsx.
   Le hero compense la hauteur du header pro (116px) comme
   HeroElevated — voir aboutHero.styles.ts.
   ============================================================ */

export const aboutSharedCss = `
  .pa2-page, .pa2-page *, .pa2-page *::before, .pa2-page *::after { box-sizing: border-box; }
  /* Garde DA dark : les h1-h3 du thème clair global (navy) repeignaient les
     titres en foncé sur canvas sombre — on force le blanc de la home pro.
     Les accents teal (spans/em) gardent leur couleur propre. */
  .pa2-page h1, .pa2-page h2, .pa2-page h3 { color: #FFFFFF; }
  .pa2-page {
    position: relative;
    overflow: hidden;
    background: #080C14;
    color: rgba(255,255,255,0.70);
    font-family: var(--font-montserrat), "Montserrat", system-ui, sans-serif;
    line-height: 1.6;
  }
  .pa2-page :is(h1,h2,h3,p,ul,ol) { margin: 0; }
  /* Fond : calques fixes partagés (ProBackdrop, montés par page.tsx) —
     mêmes halos que la home /pro, plus de gradient local qui défile. */
  .pa2-shell {
    position: relative; z-index: 1;
    max-width: 1180px; margin-inline: auto;
    padding-inline: clamp(18px, 4vw, 28px);
  }

  /* Surtitre « filet + capitales » (choix A) — cf. pricingHero.styles.ts.
     Hero aligné à gauche : le filet s'aligne sur le bord du texte. */
  .pa2-eyebrow {
    display: inline-flex; flex-direction: column; align-items: flex-start; gap: 13px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--v2-text-muted, rgba(255,255,255,0.5));
    padding: 0; border: 0; border-radius: 0; background: none; line-height: 1;
  }
  .pa2-eyebrow i {
    width: 46px; height: 2px; border-radius: 2px; box-shadow: none;
    background: linear-gradient(90deg, var(--v2-accent, #67CBC7), var(--v2-accent-2, #4A7CC7));
  }
  .pa2-accent { color: #67CBC7; }

  .pa2-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    font-size: 15px; font-weight: 700; text-decoration: none; line-height: 1;
    padding: 15px 26px; min-height: 52px; border-radius: 14px;
    border: 1px solid transparent; cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease,
      border-color 0.25s ease;
  }
  .pa2-btn:focus-visible { outline: 3px solid #67CBC7; outline-offset: 3px; }
  .pa2-btn--primary {
    color: #0C121E; background: #67CBC7;
    box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8);
  }
  /* Grammaire de survol du site (retours client R1->R4) : le bouton s'eclaircit
     d'un cran et monte d'1 px. Le voile passe par un box-shadow inset plutot
     qu'un changement de fond, pour ne jamais toucher la couleur du libelle.
     Le bouton fantome, lui, se teinte a l'accent -- pas au blanc, qui le faisait
     virer au gris sur ce fond sombre. */
  .pa2-btn--primary:hover {
    color: #0C121E; transform: translateY(-1px);
    box-shadow: inset 0 0 0 999px rgba(255,255,255,0.12), 0 40px 90px -30px rgba(0,0,0,0.85);
  }
  .pa2-btn--ghost { color: #E8EDF5; background: transparent; border-color: rgba(255,255,255,0.10); }
  .pa2-btn--ghost:hover {
    color: #E8EDF5; transform: translateY(-1px);
    background: rgba(103,203,199,0.08); border-color: rgba(103,203,199,0.55);
  }

  /* Rythme de page (chantier 04) : toutes les sections avaient exactement le
     même pas, ce qui donnait une pile de blocs interchangeables. Le pas par
     défaut reste ample ; les sections denses (métriques) le réduisent
     elles-mêmes. La respiration vient de l'alternance, pas d'un espacement
     plus grand partout. */
  .pa2-section { padding-block: clamp(64px, 9vh, 108px); }
  .pa2-section--line { border-top: 1px solid rgba(255,255,255,0.08); }
  .pa2-h2 {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif; font-weight: 600;
    font-size: clamp(26px, 3vw, 38px); line-height: 1.15; letter-spacing: -0.015em;
    color: #E8EDF5; max-width: 24ch;
  }
  .pa2-sub { margin-top: 12px; font-size: 15.5px; max-width: 58ch; }

  @media (prefers-reduced-motion: reduce) {
    .pa2-page *, .pa2-page *::before, .pa2-page *::after {
      transition: none !important;
      animation: none !important;
    }
    /* Cible les seuls boutons : un transform:none global casserait l'agenda et
       le bento, dont la mise en place repose sur des transforms. */
    .pa2-btn:hover { transform: none; }
  }
`;
