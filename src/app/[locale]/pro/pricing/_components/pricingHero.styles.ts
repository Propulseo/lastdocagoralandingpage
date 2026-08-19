/* ============================================================
   CSS du hero de /pro/pricing : eyebrow, titre serif, lead,
   toggle Mensuel/Annuel et note « montants à confirmer ».
   Préfixe pp1- (base commune dans pricingBase.styles.ts).
   ============================================================ */

export const pricingHeroCss = `
  .pp1-hero { padding-block: clamp(56px, 9vh, 96px) clamp(28px, 4vh, 44px); text-align: center; }
  /* Surtitre « filet + capitales » (choix A) : plus de pilule à pastille — le
     motif le plus reconnaissable du design générique. Le conteneur saute, la
     pastille devient un court filet teal→cobalt posé au-dessus du libellé, et
     le libellé passe en gris clair : il indique la rubrique, il ne rivalise
     plus avec le titre. Balisage inchangé (l'ex-pastille devient le filet). */
  .pp1-eyebrow {
    display: inline-flex; flex-direction: column; align-items: center; gap: 13px;
    font-size: 12px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--v2-text-muted, rgba(255,255,255,0.5));
    padding: 0; border: 0; border-radius: 0; background: none; line-height: 1;
  }
  .pp1-eyebrow-dot {
    width: 46px; height: 2px; border-radius: 2px; box-shadow: none;
    background: linear-gradient(90deg, var(--v2-accent, #67CBC7), var(--v2-accent-2, #4A7CC7));
  }
  .pp1-h1 {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif; font-weight: 600;
    font-size: clamp(32px, 4.4vw, 52px); line-height: 1.05; letter-spacing: -0.02em;
    color: #FFFFFF; margin: clamp(18px, 2.4vh, 26px) auto 0; max-width: 21ch;
  }
  .pp1-h1 em { font-style: normal; color: #67CBC7; }
  .pp1-lead {
    max-width: 56ch; margin: 16px auto 0;
    font-size: clamp(16px, 1.35vw, 18px); color: rgba(255,255,255,0.72);
  }

  .pp1-toggle-wrap {
    display: flex; flex-direction: column; align-items: center; gap: 10px;
    margin-top: clamp(24px, 3.4vh, 36px);
  }
  /* Segmented control à thumb coulissant : deux colonnes égales, le
     thumb (span absolu) glisse sous le bouton actif (translateX pilotée
     par data-billing). Reduced-motion : coupé par le bloc global .pp1. */
  .pp1-toggle {
    position: relative;
    display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 5px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.10); border-radius: 999px;
  }
  .pp1-toggle-thumb {
    position: absolute; top: 5px; bottom: 5px; left: 5px;
    width: calc((100% - 14px) / 2);
    border-radius: 999px; background: #67CBC7;
    box-shadow: 0 10px 24px -12px rgba(103,203,199,0.45);
    transition: transform 0.25s var(--mo-ease, ease);
  }
  .pp1-toggle[data-billing="yearly"] .pp1-toggle-thumb {
    transform: translateX(calc(100% + 4px));
  }
  .pp1-toggle button {
    position: relative; z-index: 1;
    font: inherit; font-size: 14px; font-weight: 600; letter-spacing: 0.01em;
    color: rgba(255,255,255,0.55); background: transparent; border: 0; cursor: pointer;
    padding: 9px 18px; border-radius: 999px;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    transition: color 0.2s ease;
  }
  .pp1-toggle button:focus-visible { outline: 3px solid #67CBC7; outline-offset: 2px; }
  .pp1-toggle button[aria-pressed="true"] { color: #0C121E; font-weight: 700; }
  .pp1-toggle-save {
    font-size: 11px; font-weight: 700; letter-spacing: 0.06em;
    padding: 3px 8px; border-radius: 999px; line-height: 1.3;
    background: rgba(12,18,30,0.35); color: inherit;
  }
  .pp1-note {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12.5px; color: rgba(255,255,255,0.5);
    border: 1px dashed rgba(255,255,255,0.22); border-radius: 999px; padding: 6px 14px;
  }
  .pp1-note b { color: rgba(255,255,255,0.72); font-weight: 600; }

  /* Reduced-motion : le bloc global .pp1 gèle les transforms — le thumb
     ne peut plus glisser. On le masque et on rend le fond au bouton actif. */
  @media (prefers-reduced-motion: reduce) {
    .pp1-toggle-thumb { display: none; }
    .pp1-toggle button[aria-pressed="true"] { background: #67CBC7; }
  }
`;
