/* ============================================================
   CSS du comparatif de /pro/pricing : table compacte (colonne
   « Cabinet » teintée) + bande de réassurance en 3 cartes.
   ============================================================ */

export const pricingCompareCss = `
  /* Section DENSE du rythme de page (chantier 04) : le tableau et la bande de
     réassurance sont serrés, entre les plans (aérés) et la FAQ (aérée). */
  .pp1-compare { padding-block: clamp(20px, 3vh, 32px); }
  /* Tête alignée à gauche (chantier 03) : le centrage reste au hero. */
  .pp1-compare .pp1-h2 { margin-inline: 0; text-align: left; }
  .pp1-compare .pp1-h2sub { margin-inline: 0; text-align: left; max-width: 62ch; }
  .pp1-table-scroll {
    overflow-x: auto; margin-top: clamp(22px, 3vh, 32px);
    border: 1px solid rgba(255,255,255,0.08); border-radius: 18px;
    background: rgba(255,255,255,0.03);
  }
  .pp1-table { width: 100%; min-width: 620px; border-collapse: collapse; font-size: 14px; }
  .pp1-table th, .pp1-table td {
    padding: 14px 18px; text-align: center;
    border-bottom: 1px solid rgba(255,255,255,0.06);
  }
  .pp1-table tr:last-child th, .pp1-table tr:last-child td { border-bottom: 0; }
  .pp1-table thead th { font-size: 13px; font-weight: 700; color: #E8EDF5; letter-spacing: 0.04em; }
  .pp1-table thead th:first-child { text-align: left; }
  .pp1-table tbody th { text-align: left; font-weight: 600; color: rgba(255,255,255,0.72); }
  .pp1-table td { color: rgba(255,255,255,0.6); }
  .pp1-table .pp1-col-star { background: rgba(103,203,199,0.05); }
  .pp1-table thead .pp1-col-star { color: #67CBC7; }
  .pp1-table .pp1-cell-check { width: 15px; height: 15px; color: #67CBC7; vertical-align: -2px; }
  .pp1-table .pp1-dash { color: rgba(255,255,255,0.25); }

  /* ── Comparatif guidé ──────────────────────────────────────────────────
     Le tableau ne tombe plus d'un bloc : il se lit ligne après ligne, et
     une lueur unique descend la colonne « Cabinet » pour désigner la
     formule mise en avant. Piloté par le .mo-in que RevealCascade pose
     au-dessus (aucun observateur supplémentaire). */
  .pp1-table tbody tr { opacity: 0; }
  .pp1-compare .mo-in .pp1-table tbody tr {
    animation: pp1-row-in 0.5s var(--mo-ease, ease) both;
    animation-delay: calc(260ms + var(--ri, 0) * 70ms);
  }
  @keyframes pp1-row-in {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: none; }
  }
  .pp1-compare .mo-in .pp1-table .pp1-col-star {
    animation: pp1-col-sweep 1.1s ease-out both;
    animation-delay: calc(700ms + var(--ri, 0) * 85ms);
  }
  @keyframes pp1-col-sweep {
    0%   { background: rgba(103,203,199,0.05); }
    30%  { background: rgba(103,203,199,0.20); }
    100% { background: rgba(103,203,199,0.05); }
  }
  /* Les coches du comparatif se dessinent avec leur ligne — MAIS elles sont
     visibles par défaut : une coche est de l'information, pas un ornement.
     L'état « non dessiné » ne vit que le temps de l'animation, sous .mo-in.
     Sans JS, ou si l'observateur ne se déclenche pas, le tableau reste
     entièrement lisible. */
  .pp1-table .pp1-cell-check path { stroke-dasharray: 20; stroke-dashoffset: 0; }
  .pp1-compare .mo-in .pp1-table .pp1-cell-check path {
    animation: pp1-cell-draw 0.45s ease-out both;
    animation-delay: calc(420ms + var(--ri, 0) * 70ms);
  }
  @keyframes pp1-cell-draw {
    from { stroke-dashoffset: 20; }
    to { stroke-dashoffset: 0; }
  }

  /* Chantier 01 : trois cartes de plus, identiques à toutes les autres de la
     page. Elles deviennent une rangée séparée par des filets verticaux —
     l'information est la même, le bruit visuel disparaît. */
  .pp1-assure {
    display: grid; grid-template-columns: repeat(3, 1fr);
    gap: 0; padding-block: clamp(22px, 3.5vh, 36px) clamp(30px, 5vh, 52px);
    border-top: 1px solid rgba(255,255,255,0.08);
    margin-top: clamp(22px, 3.5vh, 36px);
  }
  .pp1-assure-item {
    display: flex; gap: 14px; align-items: flex-start;
    background: none; border: 0; border-radius: 0;
    padding: clamp(18px, 2.4vh, 26px) clamp(20px, 2.6vw, 30px);
  }
  .pp1-assure-item + .pp1-assure-item { border-left: 1px solid rgba(255,255,255,0.08); }
  .pp1-assure-item:first-child { padding-left: 0; }
  .pp1-assure-item svg { width: 22px; height: 22px; flex: none; color: #67CBC7; margin-top: 2px; }
  .pp1-assure-item b { display: block; font-size: 15px; color: #E8EDF5; font-weight: 700; }
  .pp1-assure-item span { font-size: 13.5px; color: rgba(255,255,255,0.55); }

  @media (max-width: 860px) {
    .pp1-assure { grid-template-columns: 1fr; }
    .pp1-assure-item { padding-inline: 0; }
    .pp1-assure-item + .pp1-assure-item {
      border-left: 0; border-top: 1px solid rgba(255,255,255,0.08);
    }
  }
`;
