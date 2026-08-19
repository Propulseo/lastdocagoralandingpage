/* ============================================================
   CSS de « ce que la plateforme fait » (/pro/about).
   Composition asymétrique : une carte dominante à gauche, trois
   lignes filetées à droite. Préfixe « pa2- ».
   ============================================================ */

export const aboutBentoCss = `
  .pa2-bento {
    display: grid;
    grid-template-columns: 1.02fr 0.98fr;
    column-gap: clamp(26px, 4vw, 56px);
    align-items: start;
    margin-top: clamp(30px, 4.5vh, 44px);
  }
  /* La carte dominante occupe la colonne de gauche sur toute la hauteur. */
  .pa2-cell--lead { grid-row: span 3; }

  .pa2-card {
    height: 100%;
    border-radius: 20px;
    padding: clamp(22px, 2.6vw, 30px);
    background: linear-gradient(160deg, rgba(103,203,199,0.09), rgba(255,255,255,0.025) 58%);
    border: 1px solid rgba(103,203,199,0.22);
    transition: border-color 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;
  }
  .pa2-card:hover {
    border-color: rgba(103,203,199,0.4);
    transform: translateY(-3px);
    box-shadow: 0 30px 70px -40px rgba(0,0,0,0.9);
  }
  /* Picto sorti de son carré arrondi : posé sur le canvas, plus grand. */
  .pa2-card-ico { display: block; color: #67CBC7; }
  .pa2-card-ico svg { width: 26px; height: 26px; }
  .pa2-card-title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: clamp(20px, 2.3vw, 25px); color: #E8EDF5;
    margin-top: 14px; letter-spacing: -0.01em;
  }
  .pa2-card-text { margin-top: 10px; font-size: 14px; max-width: 46ch; }

  .pa2-sms { margin-top: 20px; display: grid; gap: 8px; max-width: 400px; }
  .pa2-sms-in, .pa2-sms-out {
    font-size: 12.5px; line-height: 1.5; padding: 10px 13px; border-radius: 13px;
    width: fit-content; opacity: 0;
  }
  .pa2-sms-in {
    background: rgba(103,203,199,0.10); border: 1px solid rgba(103,203,199,0.28);
    color: rgba(255,255,255,0.80); border-bottom-left-radius: 4px;
  }
  .pa2-sms-out {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.10);
    color: #E8EDF5; font-weight: 700; margin-left: auto; border-bottom-right-radius: 4px;
  }
  /* Le rappel se JOUE : le SMS part, la réponse arrive après. Piloté par le
     .mo-in que RevealCascade pose sur la grille — donc au scroll. */
  .pa2-bento.mo-in .pa2-sms-in {
    animation: pa2-sms-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.45s forwards;
  }
  .pa2-bento.mo-in .pa2-sms-out {
    animation: pa2-sms-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.85s forwards;
  }
  @keyframes pa2-sms-in {
    from { opacity: 0; transform: translateY(7px); }
    to { opacity: 1; transform: none; }
  }

  /* ── Les trois autres : des lignes, plus des cartes ── */
  .pa2-row {
    display: grid; grid-template-columns: 24px 1fr; gap: 16px; align-items: start;
    padding: clamp(16px, 2vw, 22px) 0;
    border-top: 1px solid rgba(255,255,255,0.10);
  }
  .pa2-cell:nth-of-type(2) .pa2-row { border-top: 0; padding-top: 0; }
  .pa2-row-ico { color: #67CBC7; padding-top: 2px; }
  .pa2-row-ico svg { width: 22px; height: 22px; display: block; }
  .pa2-row-title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: 17px; color: #E8EDF5;
  }
  .pa2-row-text { margin-top: 5px; font-size: 13.5px; color: rgba(255,255,255,0.62); }

  /* ── Preuve des trois langues, sous la liste ── */
  .pa2-langs {
    display: flex; flex-wrap: wrap; gap: 10px;
    margin-top: clamp(24px, 3.5vh, 34px);
  }
  .pa2-lang {
    display: inline-flex; align-items: center; gap: 10px; font-size: 13px;
    padding: 9px 13px; border-radius: 11px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
    color: rgba(255,255,255,0.72);
  }
  .pa2-lang b {
    flex: none; font-size: 10.5px; font-weight: 800; letter-spacing: 0.08em;
    color: #67CBC7; background: rgba(103,203,199,0.10);
    border: 1px solid rgba(103,203,199,0.30); border-radius: 6px; padding: 4px 7px; line-height: 1;
  }
  .pa2-bento-note {
    display: flex; align-items: flex-start; gap: 10px;
    margin-top: 18px; font-size: 13px; color: rgba(255,255,255,0.5); max-width: 68ch;
  }
  .pa2-bento-note svg { width: 15px; height: 15px; color: #67CBC7; flex: none; margin-top: 3px; }

  @media (max-width: 860px) {
    .pa2-bento { grid-template-columns: 1fr; row-gap: 0; }
    .pa2-cell--lead { grid-row: auto; margin-bottom: clamp(20px, 3vw, 30px); }
    .pa2-cell:nth-of-type(2) .pa2-row { border-top: 1px solid rgba(255,255,255,0.10); padding-top: clamp(16px, 2vw, 22px); }
  }
  @media (prefers-reduced-motion: reduce) {
    .pa2-sms-in, .pa2-sms-out { opacity: 1; transform: none; animation: none; }
    .pa2-card:hover { transform: none; }
  }
`;
