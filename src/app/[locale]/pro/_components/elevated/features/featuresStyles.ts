/* ============================================================
   CSS partagée de la section FONCTIONNALITÉS élevée (injectée via
   <style> dans FeaturesElevated). Couvre le shell, l'en-tête, les
   onglets et le chrome commun des 6 fenêtres d'app (barre, dots,
   crumb, pill « Aperçu »). Le contenu propre à chaque écran vit
   dans le <style> de son propre composant (features/*Screen.tsx),
   pour garder chaque fichier sous ~200 lignes.
   Couleurs uniquement via tokens --v2-* (+ color-mix). Préfixe
   « hef- » (Highlighted Elevated Features).
   ============================================================ */

export const featuresElevatedCss = `
  .hef, .hef *, .hef *::before, .hef *::after { box-sizing: border-box; }
  .hef {
    position: relative;
    --hef-dur: 5s;
    width: 100%;
    padding: clamp(72px, 10vh, 120px) 0;
    font-family: var(--font-montserrat), "Montserrat", sans-serif;
    color: var(--v2-text-body);
    line-height: 1.55;
    -webkit-font-smoothing: antialiased;
  }
  .hef__wrap {
    position: relative;
    z-index: 1;
    max-width: 1200px;
    margin-inline: auto;
    padding-inline: clamp(16px, 4vw, 24px);
  }

  .hef__head { text-align: center; max-width: 60ch; margin-inline: auto; }
  .hef__eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 12px; font-weight: 600; letter-spacing: 0.2em; text-transform: uppercase;
    color: var(--v2-eyebrow);
  }
  .hef__eyebrow-dot {
    width: 7px; height: 7px; border-radius: 999px; background: var(--v2-accent);
    box-shadow: 0 0 0 4px color-mix(in srgb, var(--v2-accent) 18%, transparent);
  }
  .hef__title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600; font-size: clamp(24px, 3.2vw, 36px);
    line-height: 1.1; letter-spacing: -0.02em; margin: 8px 0 0;
    color: var(--v2-text);
  }
  .hef__subtitle {
    font-size: clamp(15px, 1.5vw, 18px); color: var(--v2-text-body);
    margin: 9px auto 0; max-width: 54ch; font-weight: 500;
  }

  /* ── Onglets ── */
  .hef__tabs { display: flex; flex-wrap: wrap; gap: 8px; justify-content: center; margin: 22px 0 16px; }
  .hef__tab {
    position: relative; overflow: hidden;
    display: inline-flex; align-items: center; gap: 8px;
    min-height: 44px; padding: 0 var(--hef-tab-px, 18px); border-radius: 999px;
    border: 1px solid var(--v2-border); background: var(--v2-surface);
    color: var(--v2-text-body); font-family: inherit; font-weight: 600; font-size: 13.5px;
    cursor: pointer;
    transition: transform .18s ease, border-color .18s ease, background-color .18s ease,
      color .18s ease, box-shadow .18s ease;
  }
  .hef__tab-txt { position: relative; z-index: 1; }
  .hef__tab:hover {
    color: var(--v2-text); background: var(--v2-surface-2);
    border-color: color-mix(in srgb, var(--v2-accent) 40%, var(--v2-border));
    transform: translateY(-1px);
  }
  .hef__tab:focus-visible { outline: 2px solid var(--v2-accent); outline-offset: 3px; }
  .hef__tab[aria-selected="true"] {
    color: var(--v2-text); background: var(--v2-surface-2);
    border-color: color-mix(in srgb, var(--v2-accent) 45%, var(--v2-border));
    box-shadow: var(--v2-shadow); transform: translateY(-1px);
  }

  /* Remplissage teal de l'onglet actif = minuteur de l'auto-play. Un calque
     teal (libellé en encre foncée) recouvre l'onglet en balayant de gauche à
     droite (clip-path) ; l'onglet « grisé » dessous reste lisible tant qu'il
     n'est pas atteint. Le libellé de base porte le nom accessible ; ce calque
     est aria-hidden. */
  .hef__tab-fill {
    position: absolute; inset: 0; z-index: 2;
    display: flex; align-items: center; justify-content: flex-start;
    padding: 0 var(--hef-tab-px, 18px);
    white-space: nowrap; color: var(--v2-accent-ink); background: var(--v2-accent);
    clip-path: inset(0 100% 0 0);
  }
  .hef--play .hef__tab[aria-selected="true"] .hef__tab-fill {
    animation: hef-fill var(--hef-dur, 5s) linear both;
  }
  .hef--paused .hef__tab[aria-selected="true"] .hef__tab-fill {
    animation-play-state: paused;
  }
  @keyframes hef-fill {
    from { clip-path: inset(0 100% 0 0); }
    to   { clip-path: inset(0 0 0 0); }
  }

  /* ── Intro par onglet (titre + phrase bénéfice) ── */
  .hef__intro { text-align: center; max-width: 56ch; margin: 0 auto 16px; min-height: 3.5em; }
  .hef__intro-title { font-size: clamp(17px, 1.9vw, 21px); font-weight: 700; color: var(--v2-text); margin: 0; }
  .hef__intro-lead { font-size: clamp(13.5px, 1.4vw, 15px); color: var(--v2-text-body); margin: 6px 0 0; }

  /* ── Chrome commun des fenêtres d'app ── */
  .hef__app {
    position: relative; border-radius: 20px; overflow: hidden;
    background: var(--v2-panel-bg); border: 1px solid var(--v2-panel-border);
    box-shadow: var(--v2-shadow-lg); color: var(--v2-panel-text);
  }
  .hef__bar {
    display: flex; align-items: center; gap: 10px; padding: 12px 16px;
    border-bottom: 1px solid var(--v2-panel-border);
    background: color-mix(in srgb, var(--v2-panel-text) 4%, transparent);
  }
  .hef__dots { display: inline-flex; gap: 5px; }
  .hef__dots i { width: 9px; height: 9px; border-radius: 50%; background: rgba(255, 255, 255, 0.16); }
  .hef__dots i:first-child { background: var(--v2-accent); }
  .hef__crumb {
    flex: 1; margin-left: 4px; display: inline-flex; align-items: center; gap: 7px;
    font-size: 11.5px; font-weight: 600; color: var(--v2-panel-muted);
    padding: 5px 12px; border-radius: 8px;
    background: color-mix(in srgb, var(--v2-panel-text) 6%, transparent);
    border: 1px solid var(--v2-panel-border);
  }
  .hef__crumb svg { color: var(--v2-accent); flex-shrink: 0; }
  .hef__pill {
    font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--v2-accent-text); background: color-mix(in srgb, var(--v2-accent) 15%, transparent);
    border-radius: 999px; padding: 4px 10px; white-space: nowrap;
  }
  .hef__body { padding: 16px; min-height: 296px; }

  @keyframes hef-in {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  .hef__body > div { animation: hef-in 0.4s cubic-bezier(0.2, 0.7, 0.2, 1) both; }

  @media (max-width: 720px) {
    .hef__tab { font-size: 12.5px; --hef-tab-px: 14px; }
    .hef__body { padding: 16px; }
  }
  @media (max-width: 420px) {
    .hef__tab { font-size: 12px; --hef-tab-px: 12px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .hef *, .hef__body > div {
      animation: none !important;
      transition: none !important;
    }
    /* Onglet actif : remplissage teal figé en entier (état sélectionné clair). */
    .hef__tab[aria-selected="true"] .hef__tab-fill { clip-path: inset(0 0 0 0); }
  }
`;
