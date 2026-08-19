/* ============================================================
   CSS du masthead de /blog (racine .pbh, injecté par le
   composant). Le masthead n'est plus seulement typographique :
   il porte les rubriques et LA « une » — grande carte duotone,
   titre Fraunces posé sur l'image, balayage au survol. Le
   duotone (niveaux de gris + voile navy→teal en mix-blend) rend
   les photos du template cohérentes avec la DA sans les
   remplacer une par une (chantier imagerie séparé).
   ============================================================ */

export const blogHeroCss = `
  .pbh, .pbh * { box-sizing: border-box; }
  .pbh {
    position: relative;
    overflow: hidden;
    padding: clamp(30px, 4.2vw, 58px) clamp(20px, 5vw, 48px) clamp(40px, 5vw, 64px);
    font-family: var(--font-montserrat), "Montserrat", sans-serif;
  }
  .pbh::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(52% 50% at 88% 4%, rgba(var(--color-teal-rgb), 0.18), transparent 60%),
      radial-gradient(44% 44% at 6% 80%, rgba(var(--color-cobalt-rgb), 0.10), transparent 60%),
      linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 42%, var(--color-light-2) 62%, var(--color-light-1) 100%);
  }
  .pbh__inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 820px;
    margin-inline: auto;
    text-align: center;
  }
  .pbh__crumb { font-size: 12px; color: var(--text-muted); letter-spacing: 0.04em; }
  .pbh__crumb a { color: var(--color-accent-ink); text-decoration: none; }
  .pbh__crumb a:hover { text-decoration: underline; }
  .pbh__title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600;
    font-size: clamp(2.6rem, 6vw, 4rem);
    line-height: 1.02;
    letter-spacing: -0.02em;
    color: var(--color-navy);
    margin: 14px 0 0;
    text-wrap: balance;
  }
  .pbh__subtitle {
    color: #40506a;
    font-size: clamp(15px, 1.3vw, 17px);
    line-height: 1.6;
    max-width: 54ch;
    margin: 16px auto 0;
  }

  /* ── Rubriques : la navigation est visible dès l'arrivée ── */
  .pbh__cats {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 9px;
    margin: clamp(20px, 2.6vw, 28px) 0 0;
  }
  .pbh__cat {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    padding: 8px 15px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.76);
    border: 1px solid rgba(var(--color-navy-rgb), 0.12);
    color: var(--color-navy);
    font-size: 13px;
    font-weight: 600;
    text-decoration: none;
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.2s ease;
  }
  .pbh__cat:hover {
    background: #fff;
    border-color: rgba(var(--color-teal-rgb), 0.55);
    color: var(--color-navy);
    transform: translateY(-2px);
  }
  .pbh__cat.is-active {
    background: var(--color-navy);
    border-color: transparent;
    color: #fff;
  }
  .pbh__cat-count { font-size: 11.5px; opacity: 0.6; font-variant-numeric: tabular-nums; }

  /* ── La « une » ── */
  .pbh__wide {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 1120px;
    margin: clamp(28px, 3.6vw, 44px) auto 0;
  }
  .pbh__cover {
    position: relative;
    display: block;
    border-radius: 26px;
    overflow: hidden;
    min-height: clamp(300px, 42vw, 460px);
    box-shadow: 0 44px 90px -40px rgba(var(--color-navy-rgb), 0.6);
    isolation: isolate;
  }
  .pbh__cover-media { position: absolute; inset: 0; z-index: 0; }
  .pbh__cover-media img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    filter: grayscale(1) contrast(1.06) brightness(0.94);
    transform: scale(1.02);
    transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  }
  .pbh__cover:hover .pbh__cover-media img { transform: scale(1.06); }
  /* Duotone navy→teal : le voile teinte les gris, il ne les recouvre pas. */
  .pbh__cover-media::after {
    content: "";
    position: absolute;
    inset: 0;
    mix-blend-mode: color;
    background: linear-gradient(130deg, var(--color-navy) 12%, var(--color-cobalt) 58%, var(--color-teal) 100%);
  }
  /* Voile de lisibilité, sous le texte uniquement. */
  .pbh__cover-scrim {
    position: absolute;
    inset: 0;
    z-index: 1;
    background: linear-gradient(
      to top,
      rgba(11, 26, 51, 0.92) 0%,
      rgba(11, 26, 51, 0.62) 38%,
      rgba(11, 26, 51, 0.12) 72%,
      transparent 100%
    );
  }
  .pbh__cover-body {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
    min-height: inherit;
    justify-content: flex-end;
    padding: clamp(24px, 3.4vw, 44px);
    text-align: left;
  }
  .pbh__cover-tags { display: flex; flex-wrap: wrap; gap: 8px; }
  .pbh__cover-cat {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: linear-gradient(135deg, var(--color-teal), var(--color-cobalt));
    color: #fff;
    font-size: 11px;
    font-weight: 800;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .pbh__cover-flag {
    display: inline-block;
    padding: 6px 14px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.16);
    border: 1px solid rgba(255, 255, 255, 0.32);
    color: #fff;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
  }
  .pbh__cover-title {
    margin: 0;
    max-width: 22ch;
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600;
    font-size: clamp(1.7rem, 3.4vw, 2.7rem);
    line-height: 1.08;
    letter-spacing: -0.015em;
    color: #fff;
    text-wrap: balance;
  }
  .pbh__cover-title a { color: #fff; text-decoration: none; }
  .pbh__cover-excerpt {
    margin: 0;
    max-width: 60ch;
    color: rgba(255, 255, 255, 0.86);
    font-size: clamp(14px, 1.15vw, 15.5px);
    line-height: 1.6;
  }
  .pbh__cover-meta {
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.7);
  }
  /* Lien fléché : la flèche avance, la couleur ne vire pas (règle maison). */
  .pbh__cover-more {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    margin-top: 4px;
    color: #fff;
    font-size: 14px;
    font-weight: 700;
    text-decoration: none;
    transition: gap 0.22s ease;
  }
  .pbh__cover-more:hover { gap: 15px; color: #fff; }
  .pbh__cover-more svg { width: 16px; height: 16px; }

  .pbh-reveal {
    opacity: 0;
    transform: translateY(16px);
    animation: pbh-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .pbh-d1 { animation-delay: 0.05s; }
  .pbh-d2 { animation-delay: 0.15s; }
  .pbh-d3 { animation-delay: 0.25s; }
  .pbh-d4 { animation-delay: 0.35s; }
  @keyframes pbh-rise { to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 640px) {
    .pbh__cover-title { max-width: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pbh-reveal { opacity: 1 !important; transform: none !important; animation: none !important; }
    .pbh__cover-media img,
    .pbh__cover:hover .pbh__cover-media img { transition: none; transform: none; }
    .pbh__cat:hover { transform: none; }
  }
`;
