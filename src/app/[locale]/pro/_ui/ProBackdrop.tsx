/* ============================================================
   ProBackdrop — fond fixe partagé des SOUS-PAGES /pro (about,
   pricing, resources). Duplique volontairement le skin validé
   « Minimal profond » (data-bg="4") de ProHome.tsx : calques
   v2p__bgfx + v2p__glow en position:fixed, valeurs dark en dur
   (les sous-pages n'héritent pas des tokens --v2-*). La home
   garde ses propres calques + la vidéo hero-bg : NE PAS monter
   ce composant sur /pro. Préfixe « pro-bg » (aucune collision).
   ============================================================ */

const proBackdropCss = `
  .pro-bgfx { position: fixed; inset: 0; z-index: 0; pointer-events: none; overflow: hidden; }
  .pro-bgfx::before {
    content: ""; position: absolute; inset: 0;
    background:
      radial-gradient(54% 42% at 50% -8%, rgba(110,147,230,0.17), transparent 62%),
      radial-gradient(40% 30% at 50% 0%, rgba(103,203,199,0.10), transparent 70%);
  }
  .pro-glow {
    position: fixed; top: -16vh; left: 50%;
    width: 120vw; height: 75vh; z-index: 0; pointer-events: none;
    background: radial-gradient(50% 50% at 50% 50%, rgba(103,203,199,0.16), transparent 70%);
    opacity: 0.7;
    transform: translateX(-50%);
  }

  /* ── Dérive ambiante (chantier 05) ──────────────────────────────────────
     Les deux nappes se déplacent très lentement (23 s et 31 s, déphasées).
     À cette vitesse on ne le remarque pas consciemment : la page cesse
     simplement d'être une image fixe. Amplitude volontairement faible —
     dès qu'on voit le mouvement, c'est qu'il est trop fort. */
  .pro-bgfx::before { animation: pro-drift-a 31s ease-in-out infinite; }
  .pro-glow { animation: pro-drift-b 23s ease-in-out infinite; }
  @keyframes pro-drift-a {
    0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
    50% { transform: translate3d(-2.5%, 1.5%, 0) scale(1.06); }
  }
  @keyframes pro-drift-b {
    0%, 100% { transform: translateX(-50%) translateY(0); }
    50% { transform: translateX(-52%) translateY(2.5vh); }
  }
  @media (prefers-reduced-motion: reduce) {
    .pro-bgfx::before, .pro-glow { animation: none; }
  }
`;

export default function ProBackdrop() {
  return (
    <>
      <style>{proBackdropCss}</style>
      <div className="pro-bgfx" aria-hidden="true" />
      <div className="pro-glow" aria-hidden="true" />
    </>
  );
}
