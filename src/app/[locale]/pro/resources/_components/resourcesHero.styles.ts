/* ============================================================
   CSS du hero /pro/resources — eyebrow + titre serif + champ de
   recherche RÉEL (filtre les réponses rapides) + mots-clés.
   Préfixe « pr3- » (injecté par ResourcesHero).
   ============================================================ */

export const resourcesHeroCss = `
  .pr3-hero { text-align: center; max-width: 780px; margin-inline: auto; }
  /* Surtitre « filet + capitales » (choix A) — cf. pricingHero.styles.ts. */
  .pr3-eyebrow {
    display: inline-flex; flex-direction: column; align-items: center; gap: 13px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--v2-text-muted, rgba(255,255,255,0.5));
    padding: 0; border: 0; border-radius: 0; background: none; line-height: 1;
  }
  .pr3-eyebrow i {
    width: 46px; height: 2px; border-radius: 2px; box-shadow: none;
    background: linear-gradient(90deg, var(--v2-accent, #67CBC7), var(--v2-accent-2, #4A7CC7));
  }
  .pr3-title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: clamp(32px, 4.4vw, 52px);
    line-height: 1.08; letter-spacing: -0.02em;
    margin-top: clamp(18px, 2.4vh, 26px);
  }
  .pr3-title em { font-style: normal; color: #67CBC7; }
  .pr3-lead {
    font-size: clamp(15.5px, 1.35vw, 17.5px);
    color: rgba(232,237,245,0.68); margin-top: 12px;
  }

  /* ── Champ de recherche (filtre réel, pas de bouton factice) ──
     Anneau signature .pro-ring (polish.css) : la bordure statique est
     neutralisée (l'anneau dégradé la remplace), le focus garde son
     glow teal via box-shadow. */
  .pr3-search {
    display: flex; align-items: center; gap: 10px;
    margin-top: clamp(24px, 3.4vh, 34px);
    padding: 8px 12px 8px 20px; border-radius: 18px;
    background: rgba(255,255,255,0.05); border: 1px solid transparent;
    box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8);
    transition: box-shadow 0.25s ease;
  }
  /* Le halo s'intensifie dès qu'on saisit : le champ « s'allume ». */
  .pr3-search:focus-within {
    box-shadow:
      0 0 0 5px rgba(103,203,199,0.16),
      0 0 62px -14px rgba(103,203,199,0.55),
      0 24px 60px -30px rgba(0,0,0,0.8);
  }
  /* Bref flash à l'arrivée du champ, une seule fois. */
  .pr3-search { animation: pr3-search-flash 1.5s ease-out 0.75s 1; }
  @keyframes pr3-search-flash {
    0%, 100% { box-shadow: 0 24px 60px -30px rgba(0,0,0,0.8); }
    28% {
      box-shadow:
        0 0 0 6px rgba(103,203,199,0.18),
        0 0 70px -14px rgba(103,203,199,0.6),
        0 24px 60px -30px rgba(0,0,0,0.8);
    }
  }
  .pr3-search > svg { width: 19px; height: 19px; color: rgba(255,255,255,0.45); }
  .pr3-search input {
    flex: 1; min-width: 0; font: inherit; font-size: 15.5px; color: #E8EDF5;
    background: transparent; border: 0; outline: 0; padding: 12px 0;
  }
  .pr3-search input::placeholder { color: rgba(255,255,255,0.38); }
  .pr3-search input::-webkit-search-cancel-button { display: none; }
  .pr3-clear {
    display: inline-flex; align-items: center; gap: 7px;
    font: inherit; font-size: 13px; font-weight: 700; line-height: 1;
    color: rgba(255,255,255,0.62); background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.10); border-radius: 999px;
    padding: 9px 14px; cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .pr3-clear:hover { color: #E8EDF5; border-color: rgba(103,203,199,0.45); }
  .pr3-clear svg { width: 12px; height: 12px; }

  /* ── Mots-clés fréquents (remplissent réellement le champ) ── */
  .pr3-pop {
    display: flex; flex-wrap: wrap; justify-content: center; align-items: center;
    gap: 8px; margin-top: 16px; font-size: 13px; color: rgba(255,255,255,0.42);
  }
  .pr3-pop button {
    font: inherit; font-size: 13px; font-weight: 600; line-height: 1;
    color: rgba(255,255,255,0.62); background: rgba(255,255,255,0.04);
    border: 1px solid rgba(255,255,255,0.09); border-radius: 999px;
    padding: 7px 13px; cursor: pointer;
    transition: color 0.2s ease, border-color 0.2s ease;
  }
  .pr3-pop button:hover { color: #67CBC7; border-color: rgba(103,203,199,0.45); }
  .pr3-pop button[aria-pressed="true"] { color: #0C121E; background: #67CBC7; border-color: #67CBC7; }
  .pr3-search input:focus-visible, .pr3-clear:focus-visible, .pr3-pop button:focus-visible {
    outline: 3px solid #67CBC7; outline-offset: 3px;
  }

  /* Les mots-clés pulsent une fois, juste après le flash du champ : ils
     signalent qu'ils sont cliquables sans clignoter en boucle. */
  .pr3-pop button { animation: pr3-pop-pulse 1s ease-out 1.5s 1; }
  .pr3-pop button:nth-of-type(2) { animation-delay: 1.62s; }
  .pr3-pop button:nth-of-type(3) { animation-delay: 1.74s; }
  .pr3-pop button:nth-of-type(4) { animation-delay: 1.86s; }
  @keyframes pr3-pop-pulse {
    0%, 100% { border-color: rgba(255,255,255,0.09); }
    35% { border-color: rgba(103,203,199,0.6); color: #67CBC7; }
  }

  /* ── Séquence d'arrivée du hero ── */
  .pr3-rise {
    opacity: 0;
    transform: translateY(14px);
    animation: pr3-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .pr3-r1 { animation-delay: 0.05s; }
  .pr3-r2 { animation-delay: 0.16s; }
  .pr3-r3 { animation-delay: 0.27s; }
  .pr3-r4 { animation-delay: 0.38s; }
  .pr3-r5 { animation-delay: 0.5s; }
  @keyframes pr3-rise { to { opacity: 1; transform: none; } }
  /* .pr3-search porte à la fois la séquence et le flash : les deux
     animations coexistent (transform d'un côté, box-shadow de l'autre). */
  .pr3-search.pr3-rise {
    animation:
      pr3-rise 0.65s cubic-bezier(0.22, 1, 0.36, 1) 0.38s forwards,
      pr3-search-flash 1.5s ease-out 0.95s 1;
  }

  @media (max-width: 760px) {
    .pr3-search { flex-wrap: wrap; padding: 10px; }
    .pr3-search input { width: 100%; padding: 8px 6px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pr3-rise, .pr3-search.pr3-rise {
      opacity: 1;
      transform: none;
      animation: none;
    }
    .pr3-search, .pr3-pop button { animation: none; }
  }
`;
