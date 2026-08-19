/* ============================================================
   CSS de la FAQ courte (details/summary) de /pro/pricing.
   Le bloc de la carte CTA finale a été retiré avec elle
   (trois appels à l'action se suivaient sur la page).
   ============================================================ */

export const pricingFaqCss = `
  /* Section AÉRÉE qui referme la page (chantier 04), après le bloc dense
     comparatif + réassurance. Tête alignée à gauche (chantier 03). */
  .pp1-faq {
    max-width: 760px; margin-inline: auto;
    padding-block: clamp(44px, 7vh, 76px) clamp(64px, 9vh, 104px);
  }
  .pp1-faq .pp1-h2 { text-align: left; margin-bottom: clamp(10px, 1.6vh, 16px); }
  .pp1-faq details {
    background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08);
    border-radius: 16px; padding: 0 22px; margin-top: 12px;
  }
  .pp1-faq details[open] { border-color: rgba(103,203,199,0.3); }
  .pp1-faq summary {
    cursor: pointer; list-style: none;
    display: flex; justify-content: space-between; align-items: center; gap: 16px;
    padding: 18px 0; font-size: 15.5px; font-weight: 600; color: #E8EDF5;
  }
  .pp1-faq summary::-webkit-details-marker { display: none; }
  .pp1-faq summary::after {
    content: "+"; font-family: var(--font-fraunces), Georgia, serif;
    font-size: 22px; color: #67CBC7; line-height: 1; flex: none;
  }
  .pp1-faq details[open] summary::after { content: "–"; }
  .pp1-faq p { padding: 0 0 18px; font-size: 14.5px; color: rgba(255,255,255,0.6); max-width: 60ch; }
  /* L'ouverture n'est plus un à-coup : la réponse se déplie. L'élément
     details ne s'anime pas nativement — on anime le paragraphe. */
  .pp1-faq details[open] p {
    animation: pp1-faq-open 0.32s var(--mo-ease, ease) both;
  }
  @keyframes pp1-faq-open {
    from { opacity: 0; transform: translateY(-6px); }
    to   { opacity: 1; transform: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pp1-faq details[open] p { animation: none; }
  }
`;
