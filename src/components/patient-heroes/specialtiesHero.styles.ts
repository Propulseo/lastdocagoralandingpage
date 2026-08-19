/* ============================================================
   CSS du hero de /specialties (racine .psh, injecté par le
   composant). La console reprend TRAIT POUR TRAIT le langage de
   celle de la home patient (glass 22px, liseré dégradé masqué,
   sheen, champs 56px, pastille de langue glissante, CTA teal
   dégradé, rangée de réassurance) : c'est LA page recherche du
   site, elle ne peut pas avoir une version appauvrie.
   Teal lisible sur fond clair = teal-ink #1E6E68 (le teal de
   marque est trop pâle pour du texte sur blanc).
   ============================================================ */

export const specialtiesHeroCss = `
  .psh, .psh * { box-sizing: border-box; }
  .psh {
    position: relative;
    overflow: hidden;
    padding: clamp(30px, 4.2vw, 58px) clamp(20px, 5vw, 48px) clamp(48px, 6vw, 88px);
    font-family: var(--font-montserrat), "Montserrat", sans-serif;
  }
  .psh::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background:
      radial-gradient(56% 50% at 88% 4%, rgba(var(--color-teal-rgb), 0.20), transparent 60%),
      radial-gradient(44% 44% at 6% 82%, rgba(var(--color-cobalt-rgb), 0.12), transparent 60%),
      linear-gradient(180deg, var(--color-light-1) 0%, var(--color-light-2) 42%, var(--color-light-2) 62%, var(--color-light-1) 100%);
  }
  .psh__inner {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 780px;
    margin-inline: auto;
    text-align: center;
  }
  /* Surtitre « filet + capitales » (choix A) — cf. AboutHero. Hero centré. */
  .psh__eyebrow {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    gap: 13px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(var(--color-navy-rgb), 0.58);
    line-height: 1;
  }
  .psh__eyebrow::before {
    content: "";
    width: 46px;
    height: 2px;
    border-radius: 2px;
    background: linear-gradient(90deg, var(--color-teal), var(--color-cobalt));
  }
  .psh__title {
    font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
    font-weight: 600;
    font-size: clamp(2.1rem, 4.4vw, 3.2rem);
    line-height: 1.06;
    letter-spacing: -0.015em;
    color: var(--color-navy);
    margin: 16px 0 0;
    text-wrap: balance;
  }
  .psh__em { color: var(--color-accent-ink); font-style: normal; }
  .psh__desc {
    color: #40506a;
    font-size: clamp(15px, 1.3vw, 17px);
    line-height: 1.6;
    max-width: 46ch;
    margin: 16px auto 0;
  }

  /* ── Console de recherche ── */
  .psh__console {
    position: relative;
    max-width: 660px;
    margin: 30px auto 0;
    padding: clamp(18px, 2.2vw, 26px);
    border-radius: 22px;
    text-align: left;
    background: rgba(255, 255, 255, 0.62);
    border: 1px solid rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(22px) saturate(1.5);
    -webkit-backdrop-filter: blur(22px) saturate(1.5);
    box-shadow:
      0 40px 90px -30px rgba(var(--color-mint-rgb), 0.5),
      0 0 60px -20px rgba(var(--color-teal-rgb), 0.42),
      inset 0 1px 0 rgba(255, 255, 255, 0.95);
  }
  /* Liseré dégradé teal→cobalt (anneau 1.5px via masque xor). */
  .psh__console::before {
    content: "";
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.5px;
    pointer-events: none;
    z-index: 0;
    background: linear-gradient(135deg, rgba(var(--color-teal-rgb), 0.9), rgba(var(--color-cobalt-rgb), 0.55) 55%, rgba(255, 255, 255, 0.25));
    -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    -webkit-mask-composite: xor;
    mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
    mask-composite: exclude;
  }
  /* Sheen : reflet clair sur le haut de la console. */
  .psh__console::after {
    content: "";
    position: absolute;
    inset: 0 0 auto;
    height: 44%;
    border-radius: 22px 22px 0 0;
    pointer-events: none;
    z-index: 0;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.5), transparent);
  }
  .psh__console > * { position: relative; z-index: 1; }

  .psh__label {
    display: block;
    font-size: 11.5px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--color-navy-rgb), 0.66);
    margin-bottom: 8px;
  }
  .psh__main { margin-bottom: 16px; }
  .psh__inputwrap { position: relative; }
  .psh__icon {
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-accent-ink);
    font-size: 15px;
    pointer-events: none;
  }
  .psh__input {
    width: 100%;
    height: 56px;
    padding: 0 18px 0 46px;
    border-radius: 14px;
    border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
    background: rgba(255, 255, 255, 0.72);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 6px -3px rgba(var(--color-navy-rgb), 0.16);
    color: var(--color-dark-1);
    font-family: inherit;
    font-size: 16px;
    transition: border-color 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
  }
  .psh__input::placeholder { color: rgba(var(--color-navy-rgb), 0.5); }
  .psh__input:focus {
    outline: none;
    border-color: var(--color-accent-ink);
    background: #fff;
    box-shadow:
      0 0 0 4px rgba(var(--color-teal-rgb), 0.32),
      0 0 26px rgba(var(--color-teal-rgb), 0.28);
  }
  .psh__row {
    display: grid;
    grid-template-columns: minmax(0, 1.15fr) auto auto;
    gap: 12px;
    align-items: end;
  }
  .psh__row .psh__input { height: 52px; padding-left: 16px; font-size: 15px; }

  /* Pastille glissante PT/FR/EN (largeur fixe 54px → translation = index × 54). */
  .psh__seg {
    position: relative;
    display: flex;
    padding: 4px;
    height: 52px;
    border-radius: 12px;
    border: 1.5px solid rgba(var(--color-navy-rgb), 0.16);
    background: rgba(255, 255, 255, 0.72);
    box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), inset 0 -2px 6px -3px rgba(var(--color-navy-rgb), 0.16);
  }
  .psh__seg-pill {
    position: absolute;
    top: 4px;
    left: 4px;
    width: 54px;
    height: calc(100% - 8px);
    border-radius: 8px;
    background: var(--color-accent-ink);
    box-shadow: 0 6px 16px -4px rgba(var(--color-mint-rgb), 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.35);
    transform: translateX(calc(var(--seg-i, 0) * 54px));
    transition: transform 0.34s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
    z-index: 0;
  }
  .psh__seg-btn {
    position: relative;
    z-index: 1;
    width: 54px;
    padding: 0;
    border: 0;
    border-radius: 8px;
    background: transparent;
    color: rgba(var(--color-navy-rgb), 0.62);
    font-family: inherit;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 0.04em;
    cursor: pointer;
    transition: color 0.22s ease;
  }
  .psh__seg-btn:hover { color: var(--color-navy); }
  .psh__seg-btn.is-active { color: #fff; }

  .psh__cta {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 9px;
    height: 52px;
    padding: 0 26px;
    border: 0;
    border-radius: var(--radius-pill, 999px);
    background: linear-gradient(135deg, #2AA39C, var(--color-accent-ink) 70%);
    color: #fff;
    font-family: inherit;
    font-size: 14.5px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    box-shadow: 0 14px 30px -8px rgba(var(--color-mint-rgb), 0.85), inset 0 1px 0 rgba(255, 255, 255, 0.5);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  .psh__cta:hover { transform: translateY(-2px); box-shadow: 0 16px 34px -10px rgba(var(--color-mint-rgb), 0.8); }
  .psh__cta:active { transform: translateY(0); }
  .psh__cta svg { width: 16px; height: 16px; }

  .psh__trust {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    margin-top: 18px;
    padding-top: 16px;
    border-top: 1px solid rgba(var(--color-navy-rgb), 0.12);
  }
  .psh__trust span {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 12.5px;
    font-weight: 600;
    color: rgba(var(--color-navy-rgb), 0.78);
  }
  .psh__trust svg { width: 14px; height: 14px; color: var(--color-accent-ink); flex-shrink: 0; }

  /* ── Accès immédiat : les 6 spécialités vedettes en pastilles ── */
  .psh__chips-label {
    margin: 26px 0 12px;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(var(--color-navy-rgb), 0.55);
  }
  .psh__chips {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
  }
  .psh__chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 9px 16px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.78);
    border: 1px solid rgba(var(--color-navy-rgb), 0.12);
    color: var(--color-navy);
    font-size: 13.5px;
    font-weight: 600;
    text-decoration: none;
    opacity: 0;
    transform: translateY(10px);
    animation: psh-rise 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards;
    animation-delay: calc(0.45s + var(--i, 0) * 0.06s);
    transition: border-color 0.22s ease, background 0.22s ease, transform 0.2s ease;
  }
  .psh__chip:hover {
    background: #fff;
    border-color: rgba(var(--color-teal-rgb), 0.55);
    transform: translateY(-2px);
    color: var(--color-navy);
  }
  .psh__chip i { color: var(--color-accent-ink); font-size: 15px; }

  .psh-reveal {
    opacity: 0;
    transform: translateY(16px);
    animation: psh-rise 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  .psh-d1 { animation-delay: 0.05s; }
  .psh-d2 { animation-delay: 0.15s; }
  .psh-d3 { animation-delay: 0.25s; }
  .psh-d4 { animation-delay: 0.35s; }
  @keyframes psh-rise { to { opacity: 1; transform: translateY(0); } }

  @media (max-width: 620px) {
    .psh__row { grid-template-columns: 1fr; }
    .psh__cta { width: 100%; }
    .psh__seg { width: max-content; }
  }
  @media (prefers-reduced-motion: reduce) {
    .psh-reveal, .psh__chip {
      opacity: 1 !important;
      transform: none !important;
      animation: none !important;
    }
    .psh__seg-pill { transition: none; }
    .psh__cta:hover, .psh__chip:hover { transform: none; }
  }
`;
