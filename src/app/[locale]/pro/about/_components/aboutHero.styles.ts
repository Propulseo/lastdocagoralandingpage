/* ============================================================
   CSS du hero /pro/about : rangée [texte | mock agenda] + chips
   flottantes. Préfixe « pa2- ». Comme HeroElevated, la section
   compense la hauteur du header pro en flux (116px) pour que
   header + hero remplissent le premier écran.
   ============================================================ */

export const aboutHeroCss = `
  .pa2-hero {
    display: grid; grid-template-columns: 1.02fr 0.98fr;
    gap: clamp(32px, 4.5vw, 64px); align-items: center; align-content: center;
    min-height: calc(100svh - 116px);
    padding: clamp(40px, 6vh, 72px) 0 clamp(56px, 8vh, 92px);
  }
  .pa2-hero-title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: clamp(33px, 4.2vw, 54px);
    line-height: 1.07; letter-spacing: -0.02em; color: #E8EDF5;
    margin-top: clamp(16px, 2.4vh, 24px); max-width: 16ch;
  }
  .pa2-hero-lead { margin-top: 18px; max-width: 48ch; font-size: clamp(16px, 1.35vw, 18px); }
  .pa2-hero-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: clamp(22px, 3vh, 30px); }
  .pa2-hero-badges {
    display: flex; flex-wrap: wrap; gap: 9px;
    margin: clamp(20px, 3vh, 28px) 0 0; padding: 0; list-style: none;
  }
  .pa2-hero-badges li {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.55); line-height: 1;
    padding: 7px 13px; border-radius: 999px;
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08);
  }
  .pa2-hero-badges svg { width: 12px; height: 12px; color: #67CBC7; flex: none; }

  /* Anneau signature .pro-ring (polish.css) posé sur le wrapper — comme
     HeroBoard : jamais sur .pa2-mock (son overflow:hidden rognerait
     l'anneau). Le halo .pro-ring--halo remplace l'ancienne ombre. */
  /* Le cadre ancre les chips ; le calque incliné (.pa2-tilt) ne contient que
     la maquette : preserve-3d en fait un plan clos, qui enfermerait les
     chips derrière elle. */
  .pa2-mockwrap { position: relative; border-radius: 20px; }
  .pa2-tilt { position: relative; border-radius: 20px; display: block; }
  .pa2-mock {
    position: relative;
    background: #0E1622;
    border: 0;
    border-radius: 20px;
    overflow: hidden;
  }
  .pa2-mock-head {
    display: flex; align-items: center; justify-content: space-between; gap: 12px;
    padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,0.08);
  }
  .pa2-mock-title { font-size: 13px; font-weight: 700; color: #E8EDF5; }
  .pa2-mock-live {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    color: #67CBC7; line-height: 1;
  }
  .pa2-mock-live i {
    width: 7px; height: 7px; border-radius: 999px; background: #67CBC7;
    box-shadow: 0 0 0 4px rgba(103,203,199,0.15);
  }
  .pa2-mock-week {
    display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px;
    padding: 14px 14px 18px; min-height: 300px;
  }
  /* ── « L'agenda se remplit » ────────────────────────────────────────────
     La page dit « la preuve par le produit » : le produit doit bouger. Le
     mock est au-dessus de la ligne de flottaison, donc l'animation se joue
     au chargement (pas de déclencheur au scroll à prévoir) : les créneaux
     se posent en diagonale, puis le créneau réservé en ligne s'allume en
     dernier — c'est LUI l'argument. Tout est décoratif (aria-hidden). */
  .pa2-slot {
    opacity: 0;
    animation: pa2-slot-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(0.25s + var(--i, 0) * 0.07s);
  }
  @keyframes pa2-slot-in {
    from { opacity: 0; transform: translateY(8px) scale(0.97); }
    to { opacity: 1; transform: none; }
  }
  /* Le flash teal arrive APRÈS le remplissage (le plus tardif : --i max 12). */
  .pa2-slot--online {
    animation:
      pa2-slot-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards,
      pa2-slot-flash 1.1s ease-out 1.55s both;
  }
  @keyframes pa2-slot-flash {
    0%, 100% { box-shadow: 0 0 0 0 rgba(103, 203, 199, 0); }
    35% { box-shadow: 0 0 0 5px rgba(103, 203, 199, 0.26); }
  }
  /* La pastille « En ligne » respire : elle annonce du temps réel. */
  .pa2-mock-live i { animation: pa2-live 2.6s ease-in-out infinite; }
  @keyframes pa2-live {
    0%, 100% { box-shadow: 0 0 0 4px rgba(103, 203, 199, 0.15); }
    50% { box-shadow: 0 0 0 8px rgba(103, 203, 199, 0.04); }
  }
  .pa2-mock-day { display: flex; flex-direction: column; gap: 7px; min-width: 0; }
  .pa2-mock-dayname {
    font-size: 10.5px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: rgba(255,255,255,0.45); text-align: center; padding-bottom: 3px;
  }
  .pa2-slot {
    border-radius: 9px; padding: 7px 8px;
    font-size: 10.5px; line-height: 1.35; color: rgba(255,255,255,0.62);
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
    overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
  }
  .pa2-slot b { display: block; font-size: 10.5px; color: #E8EDF5; font-weight: 700; }
  .pa2-slot--online {
    background: linear-gradient(135deg, rgba(103,203,199,0.24), rgba(74,124,199,0.20));
    border-color: rgba(103,203,199,0.40);
  }
  .pa2-slot--online b { color: #67CBC7; }
  .pa2-slot--free {
    background: transparent; border-style: dashed;
    color: rgba(255,255,255,0.35); text-align: center;
  }
  .pa2-float {
    position: absolute; z-index: 3; display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 700; color: #E8EDF5; line-height: 1;
    padding: 10px 14px; border-radius: 12px;
    background: #0E1622; border: 1px solid rgba(103,203,199,0.35);
    box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8);
  }
  .pa2-float svg { width: 14px; height: 14px; color: #67CBC7; flex: none; }
  .pa2-float--tr { top: -16px; right: 18px; }
  .pa2-float--bl { bottom: -16px; left: 18px; }
  /* Les chips arrivent une fois l'agenda posé, en léger « pop ». */
  .pa2-float {
    opacity: 0;
    animation: pa2-float-in 0.55s cubic-bezier(0.34, 1.4, 0.5, 1) forwards;
  }
  .pa2-float--tr { animation-delay: 1.2s; }
  .pa2-float--bl { animation-delay: 1.75s; }
  @keyframes pa2-float-in {
    from { opacity: 0; transform: translateY(8px) scale(0.88); }
    to { opacity: 1; transform: none; }
  }

  /* Rien ne bouge si la personne a demandé à réduire les animations : tout
     est déjà dans son état final (les états de départ sont en opacity 0). */
  @media (prefers-reduced-motion: reduce) {
    .pa2-slot, .pa2-slot--online, .pa2-float, .pa2-mock-live i {
      opacity: 1;
      transform: none;
      animation: none;
    }
  }

  @media (max-width: 760px) {
    .pa2-hero { grid-template-columns: 1fr; min-height: auto; }
    .pa2-hero-title { max-width: none; }
    .pa2-mock-week { grid-template-columns: repeat(3, 1fr); min-height: 0; }
    .pa2-mock-day:nth-child(n+4) { display: none; }
  }
  @media (max-width: 560px) {
    .pa2-hero-cta .pa2-btn { width: 100%; }
  }
`;
