/* ============================================================
   CSS du duo « guide vedette + réponses rapides » de
   /pro/resources. La carte vedette est un <article> non
   cliquable (contenu rédigé plus tard) ; l'accordéon est
   filtré par la recherche du hero. Préfixe « pr3- ».
   ============================================================ */

export const resourcesFeaturedCss = `
  .pr3-main {
    display: grid; grid-template-columns: 1.05fr 0.95fr; gap: 22px;
    margin-top: clamp(44px, 7vh, 72px); align-items: start;
  }

  /* ── Guide vedette (non cliquable) ──
     Anneau + halo signature via .pro-ring/.pro-ring--halo (polish.css) :
     plus de filet top 2px ni d'overflow:hidden (qui rognerait l'anneau).
     Bordure neutralisée — l'anneau dégradé la remplace. */
  .pr3-star {
    position: relative;
    padding: clamp(26px, 3vw, 38px);
    border: 1px solid transparent; border-radius: 22px;
    background: linear-gradient(160deg, rgba(103,203,199,0.09), rgba(255,255,255,0.03) 55%);
  }
  .pr3-badge {
    display: inline-flex; align-items: center; gap: 7px;
    font-size: 11px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase;
    color: #0C121E; background: linear-gradient(135deg, #67CBC7, #9BD8D5);
    border-radius: 999px; padding: 6px 12px; line-height: 1;
  }
  .pr3-star h2 {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: clamp(22px, 2.6vw, 32px);
    line-height: 1.15; letter-spacing: -0.015em; margin-top: 16px;
  }
  .pr3-star > p { font-size: 15px; color: rgba(232,237,245,0.66); margin-top: 12px; }
  .pr3-pts { list-style: none; margin-top: 18px; display: grid; gap: 10px; }
  .pr3-pts li {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 14.5px; color: rgba(232,237,245,0.78);
  }
  .pr3-pts svg { width: 15px; height: 15px; color: #67CBC7; margin-top: 3px; }
  .pr3-smeta {
    display: flex; flex-wrap: wrap; align-items: center; gap: 8px 14px;
    margin-top: 18px; font-size: 12.5px; font-weight: 600; color: rgba(255,255,255,0.48);
  }

  /* ── Réponses rapides (accordéon filtré) ── */
  .pr3-quick {
    border: 1px solid rgba(255,255,255,0.08); border-radius: 22px;
    background: rgba(255,255,255,0.03); padding: clamp(18px, 2vw, 26px);
  }
  .pr3-quick__head {
    display: flex; align-items: baseline; justify-content: space-between; gap: 12px;
    padding: 0 6px 12px; border-bottom: 1px solid rgba(255,255,255,0.07);
  }
  .pr3-quick__head h2 {
    font-size: 11.5px; font-weight: 700; letter-spacing: 0.16em;
    text-transform: uppercase; color: rgba(255,255,255,0.50);
  }
  .pr3-count { font-size: 12px; font-weight: 600; color: rgba(255,255,255,0.38); font-variant-numeric: tabular-nums; }
  .pr3-quick details { border-bottom: 1px solid rgba(255,255,255,0.07); }
  .pr3-quick details:last-of-type { border-bottom: 0; }
  .pr3-quick summary {
    display: flex; align-items: center; justify-content: space-between; gap: 14px;
    padding: 16px 6px; font-size: 15px; font-weight: 700; line-height: 1.35;
    cursor: pointer; list-style: none; transition: color 0.2s ease;
  }
  .pr3-quick summary::-webkit-details-marker { display: none; }
  .pr3-quick summary:hover { color: #67CBC7; }
  .pr3-quick summary:focus-visible { outline: 3px solid #67CBC7; outline-offset: 3px; }
  .pr3-quick summary svg {
    width: 16px; height: 16px; color: rgba(255,255,255,0.40);
    transition: transform 0.25s ease;
  }
  .pr3-quick details[open] summary { color: #67CBC7; }
  .pr3-quick details[open] summary svg { transform: rotate(45deg); color: #67CBC7; }
  .pr3-quick details p {
    font-size: 14px; color: rgba(232,237,245,0.62);
    padding: 0 6px 16px; max-width: 56ch;
  }

  /* ── Aucune réponse ── */
  .pr3-empty { padding: 22px 6px 8px; }
  .pr3-empty p { font-size: 14.5px; color: rgba(232,237,245,0.70); }
  .pr3-empty p b { color: #67CBC7; font-weight: 700; }
  .pr3-empty small { display: block; margin-top: 8px; font-size: 13px; color: rgba(255,255,255,0.45); }

  /* ── Filtrage chorégraphié ──
     La liste est remontée à chaque saisie : ses réponses réapparaissent en
     léger décalage plutôt que de se substituer d'un bloc. Le compteur rejoue
     sa pastille au même moment. */
  .pr3-quick__list > details {
    animation: pr3-item-in 0.36s cubic-bezier(0.22, 1, 0.36, 1) both;
    animation-delay: calc(var(--qi, 0) * 45ms);
  }
  @keyframes pr3-item-in {
    from { opacity: 0; transform: translateY(7px); }
    to { opacity: 1; transform: none; }
  }
  .pr3-count { animation: pr3-count-tick 0.4s ease-out; }
  @keyframes pr3-count-tick {
    0% { opacity: 0.2; transform: translateY(-3px); }
    100% { opacity: 1; transform: none; }
  }

  @media (max-width: 760px) {
    .pr3-main { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pr3-quick__list > details, .pr3-count { animation: none; opacity: 1; transform: none; }
  }
`;
