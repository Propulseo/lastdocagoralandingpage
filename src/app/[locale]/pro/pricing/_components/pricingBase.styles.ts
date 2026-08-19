/* ============================================================
   Base CSS de /pro/pricing (V1 « Grille premium », préfixe pp1-).
   Socle partagé : wrapper de page dark, shell, titres h2,
   boutons, puce « à confirmer », reduced-motion. Fond : calques
   fixes partagés ProBackdrop (montés par page.tsx). Reveals :
   socle commun motion.css (mo-reveal / mo-cascade), plus de
   keyframes locales.
   ============================================================ */

export const pricingBaseCss = `
  .pp1, .pp1 *, .pp1 *::before, .pp1 *::after { box-sizing: border-box; margin: 0; padding: 0; }
  /* Garde DA dark : les h1-h3 du thème clair global (navy) repeignaient les
     titres en foncé sur canvas sombre — on force le blanc de la home pro.
     Les accents teal (spans/em) gardent leur couleur propre. */
  .pp1 h1, .pp1 h2, .pp1 h3 { color: #FFFFFF; }
  .pp1 {
    position: relative; isolation: isolate; overflow: hidden;
    background: #080C14; color: rgba(255,255,255,0.72);
    font-family: var(--font-montserrat), "Montserrat", system-ui, sans-serif;
    line-height: 1.55; font-size: 16px;
  }
  .pp1-shell {
    position: relative; z-index: 1; max-width: 1240px;
    margin-inline: auto; padding-inline: clamp(18px, 4vw, 24px);
  }

  .pp1-h2 {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; letter-spacing: -0.02em;
    font-size: clamp(24px, 2.6vw, 32px); color: #FFFFFF;
    text-align: center; line-height: 1.15;
  }
  .pp1-h2sub { text-align: center; margin-top: 10px; font-size: 15px; color: rgba(255,255,255,0.5); }

  .pp1-btn {
    display: inline-flex; width: 100%; align-items: center; justify-content: center; gap: 10px;
    font: inherit; font-size: 15px; font-weight: 700; text-decoration: none; cursor: pointer;
    min-height: 50px; padding: 12px 24px; border-radius: 14px; border: 1px solid transparent; line-height: 1;
    transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease, border-color 0.25s ease;
  }
  .pp1-btn:focus-visible { outline: 3px solid #67CBC7; outline-offset: 3px; }
  .pp1-btn--primary { color: #0C121E; background: #67CBC7; box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8); }
  /* Grammaire de survol du site (retours client R1->R4) : le bouton s'eclaircit
     d'un cran et monte d'1 px. Le voile passe par un box-shadow inset plutot
     qu'un changement de fond, pour ne jamais toucher la couleur du libelle.
     Le bouton fantome, lui, se teinte a l'accent -- pas au blanc, qui le faisait
     virer au gris sur ce fond sombre. */
  .pp1-btn--primary:hover {
    color: #0C121E; transform: translateY(-1px);
    box-shadow: inset 0 0 0 999px rgba(255,255,255,0.12), 0 40px 90px -30px rgba(0,0,0,0.85);
  }
  .pp1-btn--ghost { color: #E8EDF5; background: transparent; border-color: rgba(255,255,255,0.14); }
  .pp1-btn--ghost:hover {
    color: #E8EDF5; transform: translateY(-1px);
    background: rgba(103,203,199,0.08); border-color: rgba(103,203,199,0.55);
  }
  .pp1-arrow { width: 16px; height: 16px; flex: none; transition: transform 0.2s ease; }
  .pp1-btn--primary:hover .pp1-arrow { transform: translateX(3px); }

  .pp1-tbc {
    display: inline-block; font-size: 11px; font-weight: 600; letter-spacing: 0.08em;
    text-transform: uppercase; color: rgba(255,255,255,0.45);
    border: 1px dashed rgba(255,255,255,0.2); border-radius: 999px; padding: 4px 10px;
  }

  @media (prefers-reduced-motion: reduce) {
    .pp1 *, .pp1 *::before, .pp1 *::after {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }
  }
`;
