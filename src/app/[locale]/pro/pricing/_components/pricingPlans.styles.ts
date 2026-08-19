/* ============================================================
   CSS de la grille de plans de /pro/pricing : 3 cartes glass
   dark, carte « Cabinet » mise en avant (liseré teal→cobalt +
   halo), prix placeholders et note de bas de grille.
   ============================================================ */

export const pricingPlansCss = `
  .pp1-plans {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: clamp(16px, 2vw, 24px);
    /* Section AÉRÉE du rythme de page (chantier 04) : les plans respirent,
       le comparatif juste en dessous se resserre. */
    align-items: stretch; padding-block: clamp(40px, 6vh, 68px) clamp(28px, 4vh, 44px);
  }
  .pp1-cell { position: relative; display: flex; }
  .pp1-cell--star { z-index: 1; }
  .pp1-plan {
    position: relative; display: flex; flex-direction: column; width: 100%;
    background: rgba(255,255,255,0.035); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 22px; padding: clamp(24px, 2.4vw, 32px);
  }
  /* Ombre de base réservée aux cartes standard : la vedette reçoit
     l'anneau + halo signature via .pro-ring/.pro-ring--halo (polish.css) —
     plus de barre 3px, de halo interne ni d'overflow:hidden (qui
     rognerait l'anneau). Bordure neutralisée : l'anneau la remplace. */
  .pp1-plan:not(.pp1-plan--star) { box-shadow: 0 24px 60px -30px rgba(0,0,0,0.80); }
  /* « Cabinet » en objet lumineux : elle est légèrement plus grande que ses
     voisines et se pose en perspective, comme le ticket Early Access validé
     sur la home. L'anneau + double halo viennent de .pro-ring (polish.css). */
  .pp1-plan--star {
    background: rgba(255,255,255,0.055); border-color: transparent;
    transform: scale(1.035);
  }
  .pp1-plans.mo-in .pp1-plan--star {
    animation: pp1-star-in 0.95s var(--mo-ease, ease) 0.3s both;
  }
  @keyframes pp1-star-in {
    from { transform: perspective(900px) rotateX(10deg) scale(0.97); }
    to   { transform: perspective(900px) rotateX(0deg) scale(1.035); }
  }
  /* Les coches se dessinent l'une après l'autre — mais elles sont visibles par
     défaut : ce sont les fonctionnalités incluses, pas un ornement. L'état
     « non dessiné » ne vit que pendant l'animation, sous .mo-in. */
  .pp1-feat-check path {
    stroke-dasharray: 20;
    stroke-dashoffset: 0;
  }
  .pp1-plans.mo-in .pp1-feat-check path {
    animation: pp1-draw 0.45s ease-out both;
    animation-delay: calc(var(--mo-delay, 0ms) + 300ms + var(--fi, 0) * 55ms);
  }
  @keyframes pp1-draw {
    from { stroke-dashoffset: 20; }
    to { stroke-dashoffset: 0; }
  }
  /* Crossfade 150ms du bloc prix au changement de périodicité
     (remontage keyé dans PlanCard — aucun montant inventé). */
  @keyframes pp1-priceswap {
    from { opacity: 0; transform: translateY(6px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .pp1-swap { animation: pp1-priceswap 150ms cubic-bezier(0.22, 1, 0.36, 1); }
  .pp1-plan-flag {
    position: absolute; top: 16px; right: 16px; z-index: 1;
    font-size: 11px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: #0C121E; background: linear-gradient(120deg, #67CBC7, #7FD4D0);
    padding: 5px 11px; border-radius: 999px; line-height: 1;
  }
  .pp1-plan-name {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: 22px; color: #FFFFFF; letter-spacing: -0.01em;
  }
  .pp1-plan-for { margin-top: 6px; font-size: 14px; color: rgba(255,255,255,0.5); min-height: 2.6em; }
  .pp1-price { display: flex; align-items: baseline; gap: 7px; margin-top: 18px; }
  .pp1-price-num {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; letter-spacing: -0.02em;
    font-size: clamp(38px, 3.4vw, 46px); line-height: 1; color: #E8EDF5;
    font-variant-numeric: tabular-nums;
  }
  .pp1-price-num--soft { color: rgba(255,255,255,0.45); }
  .pp1-price-num--custom { font-size: clamp(26px, 2.4vw, 32px); }
  .pp1-price-unit { font-size: 14px; font-weight: 600; color: rgba(255,255,255,0.5); }
  .pp1-price-sub { margin-top: 6px; font-size: 12.5px; color: rgba(255,255,255,0.45); }
  .pp1-price .pp1-tbc { margin-top: 0; }
  .pp1-plan .pp1-tbc { align-self: flex-start; margin-top: 10px; }
  .pp1-plan-hr { border: 0; border-top: 1px solid rgba(255,255,255,0.08); margin: 20px 0 18px; }
  .pp1-feats { list-style: none; display: grid; gap: 11px; font-size: 14.5px; color: rgba(255,255,255,0.72); }
  .pp1-feats li { display: flex; gap: 10px; align-items: flex-start; }
  .pp1-feats .pp1-feat-check { width: 15px; height: 15px; flex: none; margin-top: 3px; color: #67CBC7; }
  .pp1-feats li.pp1-feat-plus { color: #E8EDF5; font-weight: 600; }
  .pp1-plan-cta { margin-top: auto; padding-top: 24px; }
  .pp1-plans-foot {
    text-align: center; font-size: 12.5px; color: rgba(255,255,255,0.42);
    padding-bottom: clamp(28px, 4vh, 44px);
  }

  @media (max-width: 980px) {
    .pp1-plans { grid-template-columns: 1fr 1fr; }
    .pp1-cell--star { grid-column: 1 / -1; order: -1; }
    /* Pleine largeur : le surcroît d'échelle déborderait du conteneur. */
    .pp1-plan--star,
    .pp1-plans.mo-in .pp1-plan--star { transform: none; animation: none; }
  }
  /* Sous 760px, les 3 cartes empilées faisaient défiler une longue liste
     (retour client : « faire des carrousels »). Piste horizontale native
     (scroll-snap), sans JS : chaque carte prend l'essentiel de l'écran et
     le bord de la suivante dépasse pour signaler qu'on peut glisser. */
  @media (max-width: 760px) {
    .pp1-plans {
      display: flex;
      overflow-x: auto;
      scroll-snap-type: x mandatory;
      -webkit-overflow-scrolling: touch;
    }
    .pp1-cell {
      flex: 0 0 82%;
      grid-column: auto;
      scroll-snap-align: start;
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .pp1-plans.mo-in .pp1-plan--star { animation: none; }
    .pp1-feat-check path { stroke-dashoffset: 0; }
    .pp1-plans.mo-in .pp1-feat-check path { animation: none; }
  }
`;
