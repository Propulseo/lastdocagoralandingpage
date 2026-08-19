/* ============================================================
   CSS de la section « Explorer par thème » de /pro/resources.
   Tuiles <article> NON cliquables (le contenu sera rédigé plus
   tard) : pas de curseur pointeur ni d'effet de survol qui
   suggérerait un lien. Préfixe « pr3- ».
   ============================================================ */

export const resourcesThemesCss = `
  /* Section AÉRÉE du rythme de page, juste après le duo dense
     « guide vedette + réponses rapides » (chantier 04). */
  .pr3-th { margin-top: clamp(64px, 10vh, 104px); }
  /* Tête de section alignée à gauche (chantier 03) : le centrage reste au
     hero, qui est le seul moment d'accroche de la page. */
  .pr3-th__head h2 {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: clamp(23px, 2.6vw, 32px);
    letter-spacing: -0.015em;
  }
  .pr3-th__head p { color: rgba(232,237,245,0.60); margin-top: 8px; font-size: 15px; max-width: 62ch; }

  /* Chantier 01 : quatre tuiles identiques ne hiérarchisaient rien et
     répétaient une cinquième fois la même carte translucide. Elles
     redeviennent une liste, séparée par des filets — l'objet le plus
     discret possible pour un contenu qui n'est pas encore cliquable. */
  .pr3-tiles {
    display: grid; grid-template-columns: 1fr 1fr;
    column-gap: clamp(28px, 5vw, 64px);
    margin-top: clamp(20px, 3vh, 30px);
  }
  .pr3-tile {
    display: grid; grid-template-columns: 26px 1fr; gap: 16px; align-items: start;
    padding: clamp(17px, 2.2vw, 23px) 0;
    border-top: 1px solid rgba(255,255,255,0.09);
    border-radius: 0; background: none;
  }
  /* Les deux premières lignes ouvrent chacune leur colonne : pas de filet. */
  .pr3-tile:nth-child(-n + 2) { border-top: 0; padding-top: 0; }
  /* Picto sorti de son carré arrondi (chantier 02) : posé sur le canvas. */
  .pr3-tile i {
    width: auto; height: auto; display: block; padding-top: 2px;
    border: 0; border-radius: 0; background: none; color: #67CBC7;
    transition: transform 0.3s var(--mo-ease, ease);
  }
  .pr3-tile i svg { width: 23px; height: 23px; display: block; }
  .pr3-tile h3 { font-size: 16px; font-weight: 700; }
  .pr3-tile p { margin-top: 5px; font-size: 13.5px; color: rgba(232,237,245,0.58); max-width: 40ch; }
  /* Les lignes restent NON cliquables : au survol, seul le picto bouge.
     Ni curseur pointeur, ni soulèvement, ni bordure teal — rien qui laisse
     croire à un lien qui n'existe pas encore. */
  .pr3-tile:hover i { transform: translateX(2px) scale(1.06); }

  @media (max-width: 760px) {
    .pr3-tiles { grid-template-columns: 1fr; }
    .pr3-tile:nth-child(-n + 2) { border-top: 1px solid rgba(255,255,255,0.09); padding-top: clamp(17px, 2.2vw, 23px); }
    .pr3-tile:first-child { border-top: 0; padding-top: 0; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pr3-tile i { transition: none; }
    .pr3-tile:hover i { transform: none; }
  }
`;
