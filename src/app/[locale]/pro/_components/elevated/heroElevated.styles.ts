/* ============================================================
   CSS du hero élevé Pro (injecté via <style> dans HeroElevated).
   Extrait du composant pour tenir le fichier sous ~200 lignes.
   Couleurs uniquement via tokens --v2-* (+ color-mix / keywords).
   Préfixe « hepro- ». La classe .hepro-reveal et le bloc
   reduced-motion couvrent aussi HeroBoard (descendant de .hepro).
   ============================================================ */

export const heroElevatedCss = `
  .hepro, .hepro * { box-sizing: border-box; }
  .hepro {
    --hepro-shell: 1240px;
    position: relative;
    width: 100%;
    min-height: calc(100svh - 116px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    /* Plus d'air sous le header, des DEUX côtés de la grille (surtitre à
       gauche, panneau Dashboard à droite) — c'est le trait du haut de la
       capture client. Repris sur le bas pour ne pas allonger le hero. */
    padding-block: clamp(18px, 2.6vh, 34px) clamp(8px, 1.2vh, 16px);
    font-family: var(--font-montserrat), "Montserrat", sans-serif;
    color: var(--v2-text-body);
    line-height: 1.5;
  }
  .hepro__shell {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: var(--hepro-shell);
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 24px);
    flex: 1;
    display: flex;
    flex-direction: column;
  }
  .hepro__top {
    flex: 1;
    display: grid;
    grid-template-columns: 1.06fr 0.94fr;
    gap: clamp(30px, 3.6vw, 56px);
    align-items: start;
  }

  @keyframes hepro-reveal {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hepro-reveal {
    opacity: 0;
    animation: hepro-reveal 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }

  /* Surtitre « filet + capitales » (choix A, 2026-07-30). La pilule à pastille
     qui était ici est le motif le plus reconnaissable du design générique ; on
     la remplace par un court filet teal→cobalt posé au-dessus d'un libellé en
     gris clair. Même traitement sur les trois sous-pages pro, pour que le site
     n'ait qu'un seul langage de surtitre. Balisage inchangé : l'ex-pastille
     (.hepro__eyebrow-dot) devient le filet. */
  .hepro__eyebrow {
    display: inline-flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 13px;
    font-size: clamp(12px, 0.95vw, 12.5px);
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--v2-text-muted);
    padding: 0;
    border: 0;
    border-radius: 0;
    background: none;
    line-height: 1;
  }
  .hepro__eyebrow-dot {
    width: 46px;
    height: 2px;
    border-radius: 2px;
    box-shadow: none;
    background: linear-gradient(90deg, var(--v2-accent), var(--v2-accent-2));
  }
  .hepro__title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600;
    font-size: clamp(31px, 3.9vw, 50px);
    line-height: 1.03;
    letter-spacing: -0.02em;
    margin: clamp(16px, 2vh, 24px) 0 0;
    max-width: 18ch;
    color: var(--v2-text);
  }
  .hepro__accent { color: var(--v2-accent-text); }
  .hepro__lead {
    font-size: clamp(16px, 1.45vw, 19px);
    line-height: 1.5;
    margin: clamp(14px, 1.8vh, 20px) 0 0;
    max-width: 46ch;
    color: var(--v2-text-body);
  }
  .hepro__cta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin-top: clamp(20px, 2.6vh, 30px);
  }
  .hepro__btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-family: var(--font-montserrat), "Montserrat", sans-serif;
    font-size: clamp(15px, 1.15vw, 16px);
    font-weight: 700;
    text-decoration: none;
    padding: clamp(12px, 1.4vh, 15px) clamp(24px, 2vw, 28px);
    min-height: 52px;
    border-radius: 14px;
    border: 1px solid transparent;
    cursor: pointer;
    line-height: 1;
    transition: transform 0.2s ease, box-shadow 0.25s ease, background-color 0.25s ease,
      border-color 0.25s ease;
  }
  .hepro__btn:focus-visible { outline: 3px solid var(--v2-accent); outline-offset: 3px; }
  .hepro__arrow { width: 18px; height: 18px; transition: transform 0.2s ease; }
  .hepro__check { width: 13px; height: 13px; color: var(--v2-accent-text); flex: none; }
  .hepro__btn--primary {
    color: var(--v2-accent-ink);
    background: var(--v2-accent);
    box-shadow: var(--v2-shadow);
  }
  .hepro__btn--primary:hover {
    color: var(--v2-accent-ink);
    transform: translateY(-1px);
    box-shadow: inset 0 0 0 999px rgba(255, 255, 255, 0.12), var(--v2-shadow-lg);
  }
  .hepro__btn--primary:hover .hepro__arrow { transform: translateX(3px); }
  .hepro__btn--ghost { color: var(--v2-text); background: transparent; border-color: var(--v2-border); }
  /* Bouton contour : même grammaire que les onglets Fonctionnalités
     (élévation 2px + fond de surface + bordure teintée accent). */
  .hepro__btn--ghost:hover {
    color: var(--v2-text);
    transform: translateY(-1px);
    background: color-mix(in srgb, var(--v2-accent) 8%, transparent);
    border-color: color-mix(in srgb, var(--v2-accent) 55%, var(--v2-border));
  }

  .hepro__badges {
    display: flex;
    flex-wrap: wrap;
    gap: 9px;
    margin: clamp(20px, 2.6vh, 28px) 0 0;
    padding: 0;
    list-style: none;
  }
  .hepro__badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: clamp(12px, 0.95vw, 13px);
    font-weight: 600;
    color: var(--v2-text-muted);
    padding: 7px 13px;
    border-radius: 999px;
    background: var(--v2-surface);
    border: 1px solid var(--v2-border);
    line-height: 1;
  }

  .hepro__bar {
    margin-top: clamp(24px, 3.2vh, 36px);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    border: 1px solid var(--v2-border);
    border-radius: 22px;
    background: var(--v2-surface);
    overflow: hidden;
  }
  .hepro__metric {
    display: flex;
    flex-direction: column;
    gap: clamp(6px, 0.9vh, 9px);
    padding: clamp(14px, 1.9vh, 20px) clamp(16px, 2.2vw, 26px);
    min-width: 0;
  }
  .hepro__metric + .hepro__metric { border-left: 1px solid var(--v2-border); }
  .hepro__metric-num {
    display: flex;
    align-items: baseline;
    font-weight: 800;
    font-size: clamp(26px, 3vw, 38px);
    color: var(--v2-accent-text);
    font-variant-numeric: tabular-nums;
    font-feature-settings: "tnum" 1;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .hepro__metric-suffix { font-size: 0.62em; margin-left: 1px; }
  .hepro__metric-label {
    font-size: clamp(13px, 1.05vw, 14px);
    font-weight: 600;
    line-height: 1.3;
    color: var(--v2-text-muted);
  }
  @media (max-width: 980px) {
    .hepro { min-height: auto; }
    .hepro__top { grid-template-columns: 1fr; gap: 28px; align-items: stretch; flex: 0 1 auto; }
    .hepro__title { max-width: none; }
    .hepro__lead { max-width: 52ch; }
  }
  @media (max-width: 560px) {
    .hepro__shell { padding-inline: 18px; }
    .hepro__cta .hepro__btn { width: 100%; }
    .hepro__bar { grid-template-columns: 1fr; }
    .hepro__metric + .hepro__metric { border-left: none; border-top: 1px solid var(--v2-border); }
  }
  @media (prefers-reduced-motion: reduce) {
    .hepro *, .hepro-reveal {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
      transition: none !important;
    }
  }
`;
