import type { Metadata } from "next";

/**
 * Preview CODÉE de 4 pistes de header pour la page pro.
 * Pas un mock HTML : vraies classes, vrais tokens (--color-*, --radius-pill),
 * vrai logo, vraies polices — la variante retenue se porte à l'identique dans
 * NavbarPro + polish.css. Route hors layout (patient)/(pro) => aucun header parasite.
 * noindex : page de travail interne.
 */
export const metadata: Metadata = {
  title: "DocAgora Pro — 4 pistes de header (codées)",
  robots: { index: false, follow: false },
};

const NAV: { label: string; soon?: boolean; active?: boolean }[] = [
  { label: "Solution", active: true },
  { label: "Tarifs", soon: true },
  { label: "Ressources", soon: true },
  { label: "À Propos", soon: true },
];

function NavLinks() {
  return (
    <ul className="ph-nav">
      {NAV.map((item) => (
        <li key={item.label}>
          <a href="#" className={item.active ? "is-active" : undefined}>
            {item.label}
            {item.soon && <span className="ph-soon">Bientôt</span>}
          </a>
        </li>
      ))}
    </ul>
  );
}

function Logo({ light }: { light?: boolean }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="ph-logo"
      src={light ? "/assets/images/logo/logo-light.png" : "/assets/images/logo/logo-dark.png"}
      alt="DocAgora"
    />
  );
}

export default function ProHeaderPreview() {
  return (
    <main className="phx">
      <style>{`
        .phx, .phx * { box-sizing: border-box; }
        .phx {
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          background: #eef1f6;
          color: #0C121E;
          padding: 40px 24px 90px;
          -webkit-font-smoothing: antialiased;
        }
        .phx__head { max-width: 1180px; margin: 0 auto 34px; }
        .phx__head h1 {
          font-family: var(--font-fraunces), "Fraunces", Georgia, serif;
          font-weight: 600; font-size: 30px; color: var(--color-navy); margin: 0;
        }
        .phx__head p { color: #6B7280; font-size: 14px; margin: 6px 0 0; }
        .phx__variant { max-width: 1180px; margin: 0 auto 46px; }
        .phx__meta { display: flex; gap: 12px; align-items: baseline; margin-bottom: 12px; flex-wrap: wrap; }
        .phx__tag {
          font-size: 11px; font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
          color: #fff; background: var(--color-navy); border-radius: 999px; padding: 5px 12px; white-space: nowrap;
        }
        .phx__title { font-family: var(--font-fraunces), "Fraunces", serif; font-weight: 600; font-size: 18px; }
        .phx__desc { color: #6B7280; font-size: 13px; flex: 1 1 320px; }
        .phx__frame {
          border-radius: 16px; overflow: hidden; border: 1px solid #d7dce6;
          box-shadow: 0 18px 50px -28px rgba(36, 72, 130, .28);
        }
        /* Scène sombre = contexte réel de la page pro, pour juger le header dessus. */
        .phx__stage { background: linear-gradient(120deg, #0C121E 0%, #172543 100%); }
        .phx__hint {
          color: rgba(255, 255, 255, .42);
          font-family: var(--font-fraunces), "Fraunces", serif;
          font-size: 24px; font-weight: 500; padding: 40px 34px 64px; margin: 0; line-height: 1.2;
        }
        .phx__hint b { color: rgba(255, 255, 255, .72); font-weight: 600; }

        /* ── briques partagées ── */
        .ph-logo { height: 46px; width: auto; display: block; }
        .ph-nav { display: flex; gap: 30px; list-style: none; margin: 0; padding: 0; }
        .ph-nav a {
          position: relative; text-decoration: none; font-weight: 600; font-size: 15px;
          padding: 6px 0; white-space: nowrap; display: inline-flex; align-items: center;
        }
        .ph-soon {
          margin-left: 6px; padding: 2px 7px; font-size: 10px; font-weight: 600; line-height: 16px;
          color: #fff; background: var(--color-cobalt); border-radius: 50px; vertical-align: middle;
        }
        .ph-lang { font-weight: 600; font-size: 14px; display: inline-flex; align-items: center; gap: 5px; white-space: nowrap; }
        .ph-patient { font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; }
        .ph-cta {
          display: inline-flex; align-items: center; gap: 9px; border-radius: var(--radius-pill);
          padding: 13px 24px; font-weight: 600; font-size: 14px; text-decoration: none; white-space: nowrap;
          border: 0; cursor: pointer;
        }
        .ph-cta i { font-size: 13px; }
        .ph-util { display: flex; align-items: center; gap: 22px; list-style: none; margin: 0; padding: 0; font-size: 13px; }
        .ph-util li { display: inline-flex; align-items: center; gap: 7px; }
        .ph-social { display: flex; gap: 8px; list-style: none; margin: 0; padding: 0; }
        .ph-social a {
          width: 30px; height: 30px; border-radius: 999px; display: inline-flex; align-items: center;
          justify-content: center; text-decoration: none; font-size: 13px;
        }

        /* ============ V1 — Clair, 2 rangées (jumeau patient) ============ */
        .ph1 .ph1-top {
          display: flex; align-items: center; justify-content: space-between; height: 48px; padding: 0 32px;
          background: linear-gradient(90deg, #1e3a6e 0%, var(--color-navy) 55%, #21406f 100%);
        }
        .ph1 .ph1-top .ph-util li, .ph1 .ph1-top a { color: rgba(255, 255, 255, .85); text-decoration: none; }
        .ph1 .ph1-top .ph-util i { color: var(--color-teal); }
        .ph1 .ph1-top .ph-social a { background: rgba(255, 255, 255, .10); color: #fff; }
        .ph1 .ph1-top .right { display: flex; align-items: center; gap: 18px; }
        .ph1 .ph1-bar {
          display: flex; align-items: center; justify-content: space-between; height: 74px; padding: 0 32px; background: #fff;
        }
        .ph1 .ph-nav a { color: #213360; }
        .ph1 .ph-nav a.is-active { color: var(--color-teal-ink); }
        .ph1 .ph-nav a.is-active::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 3px; border-radius: 3px; background: var(--color-teal);
        }
        .ph1 .right2 { display: flex; align-items: center; gap: 20px; }
        .ph1 .ph-lang { color: #213360; }
        .ph1 .ph-patient { color: #213360; }
        .ph1 .ph-cta { background: var(--color-navy); color: #fff; }

        /* ============ V2 — Clair, mono-ligne épuré ============ */
        .ph2 .ph2-bar {
          display: flex; align-items: center; gap: 28px; height: 80px; padding: 0 34px; background: #fff;
        }
        .ph2 .ph-nav { flex: 1; justify-content: center; }
        .ph2 .ph-nav a { color: #213360; }
        .ph2 .ph-nav a.is-active { color: var(--color-teal-ink); }
        .ph2 .ph-nav a.is-active::after {
          content: ""; position: absolute; left: 50%; transform: translateX(-50%); bottom: -6px;
          width: 20px; height: 3px; border-radius: 3px; background: var(--color-teal);
        }
        .ph2 .right { display: flex; align-items: center; gap: 18px; }
        .ph2 .ph-lang { color: #213360; }
        .ph2 .ph-patient { color: #6B7280; }
        .ph2 .ph-cta { background: var(--color-navy); color: #fff; }

        /* ============ V3 — Sombre glass (pro-natif raffiné) ============ */
        .ph3 .ph3-bar {
          display: flex; align-items: center; justify-content: space-between; gap: 24px; height: 78px; padding: 0 32px;
          background: linear-gradient(120deg, rgba(12, 18, 30, .96), rgba(23, 37, 67, .96));
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(255, 255, 255, .08);
        }
        .ph3 .ph-nav a { color: rgba(255, 255, 255, .8); }
        .ph3 .ph-nav a.is-active { color: #fff; }
        .ph3 .ph-nav a.is-active::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 3px; border-radius: 3px; background: var(--color-teal);
        }
        .ph3 .right { display: flex; align-items: center; gap: 18px; }
        .ph3 .ph-lang { color: rgba(255, 255, 255, .85); }
        .ph3 .ph-patient { color: rgba(255, 255, 255, .7); }
        .ph3 .ph-cta { background: var(--color-teal); color: var(--color-dark-1); }

        /* ============ V4 — Sombre, 2 rangées (topbar + barre glass) ============ */
        .ph4 .ph4-top {
          display: flex; align-items: center; justify-content: space-between; height: 42px; padding: 0 32px;
          background: #070C16; border-bottom: 1px solid rgba(255, 255, 255, .06);
        }
        .ph4 .ph4-top .ph-util li { color: rgba(255, 255, 255, .7); font-size: 12.5px; }
        .ph4 .ph4-top .ph-util i { color: var(--color-teal); }
        .ph4 .ph4-top .ph-lang { color: rgba(255, 255, 255, .82); font-size: 13px; }
        .ph4 .ph4-bar {
          display: flex; align-items: center; justify-content: space-between; height: 72px; padding: 0 32px;
          background: linear-gradient(120deg, rgba(12, 18, 30, .96), rgba(23, 37, 67, .96));
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        }
        .ph4 .ph-nav a { color: rgba(255, 255, 255, .8); }
        .ph4 .ph-nav a.is-active { color: #fff; }
        .ph4 .ph-nav a.is-active::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px; height: 3px; border-radius: 3px; background: var(--color-teal);
        }
        .ph4 .right2 { display: flex; align-items: center; gap: 20px; }
        .ph4 .ph-patient { color: rgba(255, 255, 255, .7); }
        .ph4 .ph-cta { background: var(--color-teal); color: var(--color-dark-1); }

        @media (max-width: 860px) {
          .ph-nav, .ph-util, .ph-lang, .ph-patient { display: none; }
        }
      `}</style>

      <div className="phx__head">
        <h1>DocAgora Pro — 4 pistes de header</h1>
        <p>
          Variantes <strong>codées</strong> (vraies classes, tokens de marque, vrai logo) affichées sur un fond
          sombre type page pro. Dis-moi le numéro retenu : il se porte à l’identique dans le header réel.
        </p>
      </div>

      {/* ============ V1 ============ */}
      <section className="phx__variant ph1">
        <div className="phx__meta">
          <span className="phx__tag">Variante 1</span>
          <span className="phx__title">Clair — 2 rangées (jumeau patient)</span>
          <span className="phx__desc">
            Exactement le header patient appliqué au pro : barre utilitaire navy + navbar blanche, onglet actif teal-ink souligné. Cohérence de marque maximale.
          </span>
        </div>
        <div className="phx__frame">
          <div className="ph1-top">
            <ul className="ph-util">
              <li><i className="fas fa-envelope" /> hello@docagora.com</li>
              <li><i className="fas fa-shield-alt" /> Conforme RGPD</li>
              <li><i className="fas fa-map-marker-alt" /> Hébergé au Portugal</li>
            </ul>
            <div className="right">
              <ul className="ph-social">
                <li><a href="#"><i className="fab fa-linkedin-in" /></a></li>
                <li><a href="#"><i className="fab fa-facebook-f" /></a></li>
                <li><a href="#"><i className="fab fa-instagram" /></a></li>
              </ul>
            </div>
          </div>
          <div className="ph1-bar">
            <Logo />
            <NavLinks />
            <div className="right2">
              <span className="ph-lang">FR <i className="fas fa-chevron-down" style={{ fontSize: 11 }} /></span>
              <a className="ph-patient" href="#">Je suis un patient</a>
              <a className="ph-cta" href="#"><i className="fas fa-bolt" /> Demander l’accès</a>
            </div>
          </div>
          <div className="phx__stage">
            <p className="phx__hint">Votre temps a de la valeur. <b>Mesurez le retour.</b></p>
          </div>
        </div>
      </section>

      {/* ============ V2 ============ */}
      <section className="phx__variant ph2">
        <div className="phx__meta">
          <span className="phx__tag">Variante 2</span>
          <span className="phx__title">Clair — mono-ligne épuré</span>
          <span className="phx__desc">
            Une seule barre blanche, nav centrée, onglet actif souligné teal, CTA pilule navy. Très SaaS, beaucoup d’air.
          </span>
        </div>
        <div className="phx__frame">
          <div className="ph2-bar">
            <Logo />
            <NavLinks />
            <div className="right">
              <span className="ph-lang">FR <i className="fas fa-chevron-down" style={{ fontSize: 11 }} /></span>
              <a className="ph-patient" href="#">Je suis un patient</a>
              <a className="ph-cta" href="#"><i className="fas fa-bolt" /> Demander l’accès</a>
            </div>
          </div>
          <div className="phx__stage">
            <p className="phx__hint">Votre temps a de la valeur. <b>Mesurez le retour.</b></p>
          </div>
        </div>
      </section>

      {/* ============ V3 ============ */}
      <section className="phx__variant ph3">
        <div className="phx__meta">
          <span className="phx__tag">Variante 3</span>
          <span className="phx__title">Sombre glass — pro-natif raffiné</span>
          <span className="phx__desc">
            Garde l’univers sombre/premium de la page pro mais adopte les finitions patient : soulignage teal, CTA pilule teal. S’intègre sans rupture sur la page.
          </span>
        </div>
        <div className="phx__frame phx__stage">
          <div className="ph3-bar">
            <Logo light />
            <NavLinks />
            <div className="right">
              <span className="ph-lang">FR <i className="fas fa-chevron-down" style={{ fontSize: 11 }} /></span>
              <a className="ph-patient" href="#">Je suis un patient</a>
              <a className="ph-cta" href="#"><i className="fas fa-bolt" /> Demander l’accès</a>
            </div>
          </div>
          <p className="phx__hint">Votre temps a de la valeur. <b>Mesurez le retour.</b></p>
        </div>
      </section>

      {/* ============ V4 ============ */}
      <section className="phx__variant ph4">
        <div className="phx__meta">
          <span className="phx__tag">Variante 4</span>
          <span className="phx__title">Sombre — 2 rangées (topbar + barre glass)</span>
          <span className="phx__desc">
            Fine barre utilitaire très sombre + navbar glass : le pendant sombre de la V1. Riche en infos, soulignage teal, CTA pilule teal.
          </span>
        </div>
        <div className="phx__frame phx__stage">
          <div className="ph4-top">
            <ul className="ph-util">
              <li><i className="fas fa-envelope" /> hello@docagora.com</li>
              <li><i className="fas fa-shield-alt" /> Conforme RGPD</li>
              <li><i className="fas fa-map-marker-alt" /> Hébergé au Portugal</li>
            </ul>
            <span className="ph-lang">PT · FR · EN</span>
          </div>
          <div className="ph4-bar">
            <Logo light />
            <NavLinks />
            <div className="right2">
              <a className="ph-patient" href="#">Je suis un patient</a>
              <a className="ph-cta" href="#"><i className="fas fa-bolt" /> Demander l’accès</a>
            </div>
          </div>
          <p className="phx__hint">Votre temps a de la valeur. <b>Mesurez le retour.</b></p>
        </div>
      </section>
    </main>
  );
}
