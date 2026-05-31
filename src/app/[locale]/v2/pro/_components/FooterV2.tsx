"use client";

import { useState } from "react";

/* ============================================================
   FooterV2, V2 PRO (CTA final intégré + barre de pied de page)
   THEMEABLE : toutes les couleurs passent par les tokens --v2-*
   hérités de .v2p (dark/light/mixte + contrast). Aucune couleur
   en dur. Préfixe CSS « v2ft- ».
   useState pour le formulaire d’accès anticipé (inline).
   ============================================================ */

export default function FooterV2() {
  const [done, setDone] = useState<boolean>(false);

  return (
    <footer className="v2ft-foot" aria-label="Pied de page">
      <style>{`
        .v2ft-foot, .v2ft-foot * { box-sizing: border-box; }

        .v2ft-foot {
          --v2ft-shell: 1200px;
          --v2ft-mono: ui-monospace, "SF Mono", Menlo, monospace;
          position: relative;
          background: var(--v2-bg-2);
          color: var(--v2-text-body);
          overflow: hidden;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        .v2ft-foot::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background:
            radial-gradient(700px 360px at 50% 0%, var(--v2-mesh-a), transparent 60%),
            radial-gradient(500px 300px at 85% 100%, var(--v2-mesh-b), transparent 60%);
        }

        /* ── CTA final ── */
        .v2ft-cta {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: clamp(72px, 10vh, 120px) clamp(16px, 4vw, 24px) 56px;
          max-width: 760px;
          margin-inline: auto;
        }
        .v2ft-cta__kicker {
          font-family: var(--v2ft-mono);
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--v2-eyebrow);
          font-weight: 600;
        }
        .v2ft-cta__h {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600;
          font-size: clamp(28px, 4vw, 44px);
          letter-spacing: -0.02em;
          line-height: 1.08;
          color: var(--v2-text);
          margin: 14px 0 0;
          text-transform: none;
        }
        .v2ft-cta__p {
          color: var(--v2-text-muted);
          font-size: 16px;
          margin: 16px auto 0;
          max-width: 50ch;
        }

        /* ── Boutons ── */
        .v2ft-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 50px;
          padding: 0 24px;
          border-radius: 12px;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 700;
          font-size: 15px;
          text-decoration: none;
          cursor: pointer;
          border: 1px solid transparent;
          transition: transform 0.2s ease, box-shadow 0.2s ease,
            background-color 0.2s ease, gap 0.2s ease;
          text-transform: none;
          line-height: 1;
        }
        .v2ft-btn--accent {
          background: var(--v2-accent);
          color: var(--v2-accent-ink);
          box-shadow: var(--v2-shadow);
        }
        .v2ft-btn--accent:hover {
          transform: translateY(-2px);
          gap: 13px;
          background: var(--v2-accent-2);
          color: var(--v2-accent-ink);
        }
        .v2ft-btn--ghost {
          color: var(--v2-text);
          background: var(--v2-surface);
          border-color: var(--v2-border);
        }
        .v2ft-btn--ghost:hover {
          background: var(--v2-surface-2);
          color: var(--v2-accent-text);
          transform: translateY(-2px);
        }
        .v2ft-btn:focus-visible {
          outline: 2px solid var(--v2-accent);
          outline-offset: 2px;
        }
        .v2ft-btn__arrow { font-size: 0; line-height: 0; }

        /* ── Formulaire accès anticipé ── */
        .v2ft-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 24px;
        }
        .v2ft-field { display: flex; gap: 10px; flex-wrap: wrap; }
        .v2ft-input {
          flex: 1;
          min-width: 0;
          min-height: 50px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1px solid var(--v2-border);
          background: var(--v2-surface);
          color: var(--v2-text);
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15px;
        }
        .v2ft-input::placeholder { color: var(--v2-text-muted); }
        .v2ft-input:focus-visible {
          outline: 2px solid var(--v2-accent);
          outline-offset: 2px;
        }
        .v2ft-form__note {
          font-size: 12px;
          color: var(--v2-text-muted);
          margin: 4px 0 0;
        }
        .v2ft-form__ok {
          font-size: 14px;
          color: var(--v2-accent-text);
          font-weight: 600;
          margin: 0;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .v2ft-cta__row {
          display: flex;
          flex-wrap: wrap;
          gap: 14px;
          justify-content: center;
          margin-top: 20px;
        }

        /* ── Barre de pied de page ── */
        .v2ft-footbar {
          position: relative;
          z-index: 1;
          border-top: 1px solid var(--v2-border);
          max-width: var(--v2ft-shell);
          margin-inline: auto;
          padding: 26px clamp(16px, 4vw, 24px);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .v2ft-footbar__brand {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 800;
          color: var(--v2-text);
          font-size: 17px;
        }
        .v2ft-logo__mark {
          display: inline-grid;
          place-items: center;
          width: 30px;
          height: 30px;
          border-radius: 9px;
          color: var(--v2-accent-ink);
          background: linear-gradient(135deg, var(--v2-accent), var(--v2-accent-2));
          box-shadow: var(--v2-shadow);
          font-size: 14px;
          font-weight: 800;
        }
        .v2ft-footbar__links {
          display: flex;
          gap: 22px;
          flex-wrap: wrap;
        }
        .v2ft-footbar__links a {
          color: var(--v2-text-muted);
          text-decoration: none;
          font-size: 13px;
          font-weight: 500;
          transition: color 0.2s ease;
        }
        .v2ft-footbar__links a:hover { color: var(--v2-accent-text); }
        .v2ft-footbar__copy {
          color: var(--v2-text-muted);
          font-size: 12px;
          width: 100%;
        }

        /* ── Responsive ── */
        @media (max-width: 560px) {
          .v2ft-footbar { padding: 20px 16px; }
          .v2ft-footbar__links { gap: 14px; }
          .v2ft-cta { padding-bottom: 40px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .v2ft-foot *,
          .v2ft-foot *::before,
          .v2ft-foot *::after {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ── CTA final ── */}
      <div className="v2ft-cta">
        <span className="v2ft-cta__kicker">Commencez aujourd’hui</span>
        <h2 className="v2ft-cta__h">Prêt à réinventer votre pratique ?</h2>
        <p className="v2ft-cta__p">
          Rejoignez les professionnels qui préparent l’avenir de leur cabinet
          avec DocAgora. La confirmation de rendez-vous en ligne arrive bientôt.
        </p>

        <form
          className="v2ft-form"
          onSubmit={(e) => {
            e.preventDefault();
            setDone(true);
          }}
        >
          <div className="v2ft-field">
            <label htmlFor="v2ft-email" style={{ display: "none" }}>
              Email
            </label>
            <input
              id="v2ft-email"
              className="v2ft-input"
              type="email"
              required
              placeholder="votre.email@clinique.fr"
              aria-label="Votre email professionnel"
            />
            <button className="v2ft-btn v2ft-btn--accent" type="submit">
              Demander l’accès
            </button>
          </div>
          {done ? (
            <p className="v2ft-form__ok">
              Merci, nous vous recontactons très prochainement.
            </p>
          ) : (
            <p className="v2ft-form__note">
              Réponse habituelle sous quelques jours ouvrés.
            </p>
          )}
        </form>

        <div className="v2ft-cta__row">
          <a className="v2ft-btn v2ft-btn--ghost" href="#v2ft-top">
            Parler à un conseiller
          </a>
        </div>
      </div>

      {/* ── Barre de pied de page ── */}
      <div className="v2ft-footbar">
        <span className="v2ft-footbar__brand">
          <span className="v2ft-logo__mark" aria-hidden="true">
            D
          </span>
          DocAgora
        </span>
        <nav className="v2ft-footbar__links" aria-label="Liens du pied de page">
          <a href="#v2ft-fonctionnalites">Fonctionnalités</a>
          <a href="#v2ft-benefices">Bénéfices</a>
          <a href="#v2ft-pourquoi">Pourquoi</a>
          <a href="#v2ft-acces">Accès anticipé</a>
        </nav>
        <span className="v2ft-footbar__copy">
          © {new Date().getFullYear()} DocAgora · Logiciel pour professionnels de
          santé. Données hébergées dans l’UE, conformité RGPD.
        </span>
      </div>
    </footer>
  );
}
