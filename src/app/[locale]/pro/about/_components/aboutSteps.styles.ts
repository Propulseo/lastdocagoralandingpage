/* ============================================================
   CSS de la timeline d'onboarding /pro/about (4 étapes reliées
   par un filet dégradé teal→cobalt). Préfixe « pa2- ».
   ============================================================ */

export const aboutStepsCss = `
  .pa2-steps {
    position: relative; display: grid; grid-template-columns: repeat(4, 1fr);
    gap: clamp(18px, 2.5vw, 32px); margin-top: clamp(32px, 5vh, 48px);
    list-style: none; padding: 0;
  }
  /* Le filet se TRACE quand la timeline entre dans le viewport, puis les
     jalons apparaissent l'un après l'autre. RevealCascade pose déjà .mo-in
     sur la liste et un --mo-delay par étape : on s'y branche, sans nouveau
     mécanisme (socle motion.css). */
  .pa2-steps::before {
    content: ""; position: absolute; top: 17px; left: 8%; right: 8%; height: 1px;
    background: linear-gradient(90deg, transparent, #67CBC7 20%, #4A7CC7 80%, transparent);
    opacity: 0.6;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 1.3s var(--mo-ease, ease) 0.15s;
  }
  .pa2-steps.mo-in::before { transform: scaleX(1); }
  .pa2-steps.mo-in .pa2-step-dot {
    animation: pa2-dot-pop 0.5s var(--mo-ease, ease) both;
    animation-delay: calc(var(--mo-delay, 0ms) + 260ms);
  }
  @keyframes pa2-dot-pop {
    0% { opacity: 0; transform: translateX(-50%) scale(0.5); }
    60% { opacity: 1; transform: translateX(-50%) scale(1.14); }
    100% { opacity: 1; transform: translateX(-50%) scale(1); }
  }
  .pa2-step { position: relative; text-align: center; padding-top: 50px; }
  .pa2-step-dot {
    position: absolute; top: 0; left: 50%; transform: translateX(-50%);
    width: 36px; height: 36px; border-radius: 999px;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; color: #67CBC7;
    background: #080C14; border: 1px solid rgba(103,203,199,0.45);
    box-shadow: 0 0 0 6px rgba(103,203,199,0.07);
  }
  .pa2-step-title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: 18px; color: #E8EDF5;
  }
  .pa2-step-text { margin-top: 7px; font-size: 13.5px; color: rgba(255,255,255,0.60); }
  .pa2-step-chip {
    display: inline-flex; align-items: center; gap: 6px; margin-top: 12px;
    font-size: 11.5px; font-weight: 700; color: #67CBC7; line-height: 1;
    padding: 6px 11px; border-radius: 999px;
    background: rgba(103,203,199,0.08); border: 1px solid rgba(103,203,199,0.28);
  }

  @media (max-width: 760px) {
    .pa2-steps { grid-template-columns: 1fr; gap: 26px; }
    .pa2-steps::before { display: none; }
    .pa2-step { text-align: left; padding-top: 0; padding-left: 50px; }
    .pa2-step-dot { left: 0; transform: none; }
    /* En colonne, la pastille n'est plus recentrée : le keyframe qui garde
       translateX(-50%) la décalerait. La cascade des étapes suffit. */
    .pa2-steps.mo-in .pa2-step-dot { animation: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pa2-steps::before { transition: none; transform: scaleX(1); }
    .pa2-steps.mo-in .pa2-step-dot { animation: none; }
  }
`;
