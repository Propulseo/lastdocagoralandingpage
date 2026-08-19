/* ============================================================
   Socle CSS de /pro/resources (racine .pr3, injecté une fois
   depuis page.tsx). Canvas dark pro + shell + boutons partagés.
   Préfixe « pr3- » (direction « Centre d'aide »).
   ============================================================ */

export const resourcesBaseCss = `
  .pr3, .pr3 *, .pr3 *::before, .pr3 *::after { box-sizing: border-box; margin: 0; padding: 0; }
  /* Garde DA dark : les h1-h3 du thème clair global (navy) repeignaient les
     titres en foncé sur canvas sombre — on force le blanc de la home pro.
     Les accents teal (spans/em) gardent leur couleur propre. */
  .pr3 h1, .pr3 h2, .pr3 h3 { color: #FFFFFF; }
  .pr3 {
    position: relative;
    overflow: hidden;
    background: #080C14;
    color: #E8EDF5;
    font-family: var(--font-montserrat), "Montserrat", system-ui, sans-serif;
    line-height: 1.55;
    padding: clamp(48px, 7vh, 84px) 0 clamp(64px, 9vh, 104px);
    -webkit-font-smoothing: antialiased;
  }
  .pr3 a { text-decoration: none; color: inherit; }
  .pr3 svg { display: block; flex: none; }
  /* Fond : calques fixes partagés (ProBackdrop, montés par page.tsx) —
     mêmes halos que la home /pro, plus de gradient local qui défile. */
  .pr3-shell {
    position: relative; z-index: 1;
    max-width: 1140px; margin-inline: auto;
    padding-inline: clamp(20px, 4.5vw, 32px);
  }

  /* ── Boutons partagés (Featured + CTA) ── */
  .pr3-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 10px;
    font-size: 15px; font-weight: 700; line-height: 1;
    padding: 14px 24px; min-height: 50px;
    border-radius: 14px; border: 1px solid transparent; cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.25s ease,
      background-color 0.25s ease, border-color 0.25s ease;
  }
  .pr3-btn svg { width: 17px; height: 17px; }
  .pr3-btn--primary { color: #0C121E; background: #67CBC7; box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8); }
  /* Grammaire de survol du site (retours client R1->R4) : le bouton s'eclaircit
     d'un cran et monte d'1 px. Le voile passe par un box-shadow inset plutot
     qu'un changement de fond, pour ne jamais toucher la couleur du libelle.
     Le bouton fantome, lui, se teinte a l'accent -- pas au blanc, qui le faisait
     virer au gris sur ce fond sombre. */
  .pr3-btn--primary:hover {
    transform: translateY(-1px);
    box-shadow: inset 0 0 0 999px rgba(255,255,255,0.12), 0 40px 90px -30px rgba(0,0,0,0.85);
  }
  .pr3-btn--ghost { color: #E8EDF5; border-color: rgba(255,255,255,0.14); }
  .pr3-btn--ghost:hover {
    transform: translateY(-1px);
    background: rgba(103,203,199,0.08);
    border-color: rgba(103,203,199,0.55);
  }
  .pr3-btn:focus-visible { outline: 3px solid #67CBC7; outline-offset: 3px; }

  @media (prefers-reduced-motion: reduce) {
    .pr3 *, .pr3 *::before, .pr3 *::after {
      transition: none !important;
      animation: none !important;
    }
    /* Cible les seuls boutons : un transform:none global casserait la fleche
       et l'anneau spotlight, qui ne sont pas des mouvements d'entree. */
    .pr3-btn:hover { transform: none; }
  }
`;
