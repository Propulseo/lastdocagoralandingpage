import { getTranslations } from "next-intl/server";
import AnimatedSection from "@/components/shared/AnimatedSection";

/** App teaser — copy + phone mockup split. Reuses `home.mobileApp.*`.
 *  App is genuinely unreleased ("bientôt"), so the mockup is a framed
 *  preview of the app concept, not a fake screenshot of a live product. */
export default async function MobileApp() {
  const t = await getTranslations("home.mobileApp");

  // Illustrative directory rows (names are sample, locale-appropriate).
  const docs = [
    { name: "Dra. Sofia Marques", spec: t("phoneDoc1Spec"), icon: "fas fa-heart-pulse" },
    { name: "Dr. Tiago Lopes", spec: t("phoneDoc2Spec"), icon: "fas fa-tooth" },
    { name: "Dra. Inês Carvalho", spec: t("phoneDoc3Spec"), icon: "fas fa-child" },
  ];

  return (
    <section className="vnp-section vnp-section--tint vnma" aria-labelledby="vnma-title">
      <style>{`
        .vnma__grid { display: grid; grid-template-columns: 1.05fr 0.95fr; gap: clamp(36px, 5vw, 80px); align-items: center; }
        .vnma__stars { display: inline-flex; align-items: center; gap: 9px; font-size: 13px; font-weight: 600; color: var(--vnp-accent); margin-bottom: 18px; }
        .vnma__stars i { color: var(--color-mint); }
        .vnma__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.08; letter-spacing: -0.018em; color: var(--vnp-ink); margin: 0; text-wrap: balance; }
        .vnma__sub { font-size: clamp(15px, 1.35vw, 17px); line-height: 1.62; color: var(--vnp-body); margin: 16px 0 0; max-width: 50ch; }
        .vnma__cta { margin-top: 26px; }

        /* Phone mockup */
        .vnma__phonewrap { display: flex; justify-content: center; position: relative; }
        .vnma__phonewrap::before { content: ""; position: absolute; inset: 6% 12%; border-radius: 50%; z-index: 0; background: radial-gradient(circle, rgba(var(--color-teal-rgb),0.18), transparent 70%); }
        /* v1 phone proportions: tall ~1:2 portrait, 36px frame radius */
        .vnma__phone {
          position: relative; z-index: 1; width: clamp(250px, 27vw, 286px);
          background: #0b1322; border-radius: 38px; padding: 11px;
          box-shadow: 0 40px 90px -30px rgba(var(--color-navy-rgb), 0.6), inset 0 0 0 2px rgba(255,255,255,0.06);
          animation: vnma-float 6s ease-in-out infinite;
        }
        @keyframes vnma-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        .vnma__screen {
          background: var(--color-light-1); border-radius: 28px; overflow: hidden;
          padding: 18px 15px 16px; display: flex; flex-direction: column;
          min-height: clamp(468px, 53vw, 540px);
        }
        .vnma__notch { width: 34%; height: 6px; border-radius: 999px; background: rgba(255,255,255,0.25); margin: 2px auto 16px; }
        .vnma__tabbar { margin-top: auto; padding-top: 14px; display: flex; align-items: center; justify-content: space-around; border-top: 1px solid var(--vnp-line); }
        .vnma__tab { font-size: 15px; color: var(--vnp-muted); }
        .vnma__tab.is-active { color: var(--vnp-accent); }
        .vnma__appbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 14px; }
        .vnma__applogo { font-family: var(--font-fraunces), Georgia, serif; font-weight: 700; font-size: 17px; color: var(--color-navy); }
        .vnma__appdot { width: 30px; height: 30px; border-radius: 50%; background: var(--vnp-accent-soft); display: flex; align-items: center; justify-content: center; color: var(--vnp-accent); font-size: 12px; }
        .vnma__appsearch { display: flex; align-items: center; gap: 9px; padding: 11px 14px; border-radius: 12px; background: var(--color-light-3); color: var(--vnp-muted); font-size: 12.5px; margin-bottom: 14px; }
        .vnma__appsearch i { color: var(--vnp-accent); }
        .vnma__doc { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 14px; background: #fff; border: 1px solid var(--vnp-line); margin-bottom: 10px; }
        .vnma__doc-ic { width: 38px; height: 38px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; color: var(--vnp-accent); background: var(--vnp-accent-soft); font-size: 15px; }
        .vnma__doc-name { font-size: 13px; font-weight: 700; color: var(--vnp-ink); margin: 0; }
        .vnma__doc-spec { font-size: 11.5px; color: var(--vnp-muted); margin: 2px 0 0; }

        @media (max-width: 880px) {
          .vnma__grid { grid-template-columns: 1fr; gap: 44px; }
          .vnma__phonewrap { order: -1; }
          /* .vnp-btn--inline reste width:auto + nowrap (styles.css) : sur
             mobile ce libellé long dépassait l'écran. */
          .vnma__cta .vnp-btn { width: 100%; white-space: normal; text-align: center; }
        }
        @media (prefers-reduced-motion: reduce) { .vnma__phone { animation: none; } }
      `}</style>
      <div className="vnp-shell">
        <div className="vnma__grid">
          <AnimatedSection direction="left">
            <div>
              <span className="vnma__stars"><i className="fas fa-mobile-screen-button" aria-hidden="true" />{t("starsLabel")}</span>
              <h2 className="vnma__title" id="vnma-title">{t("title")}</h2>
              <p className="vnma__sub">{t("subtitle")}</p>
              <div className="vnma__cta">
                <a className="vnp-btn vnp-btn--primary vnp-btn--inline" href="#vnp-hero">{t("cta")}</a>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div className="vnma__phonewrap" aria-hidden="true">
              <div className="vnma__phone">
                <div className="vnma__screen">
                  <div className="vnma__notch" />
                  <div className="vnma__appbar">
                    <span className="vnma__applogo">DocAgora</span>
                    <span className="vnma__appdot"><i className="fas fa-user" /></span>
                  </div>
                  <div className="vnma__appsearch"><i className="fas fa-search" />{t("phoneSearch")}</div>
                  {docs.map((d) => (
                    <div className="vnma__doc" key={d.name}>
                      <span className="vnma__doc-ic"><i className={d.icon} /></span>
                      <div>
                        <p className="vnma__doc-name">{d.name}</p>
                        <p className="vnma__doc-spec">{d.spec}</p>
                      </div>
                    </div>
                  ))}
                  <div className="vnma__tabbar">
                    <i className="fas fa-magnifying-glass vnma__tab is-active" />
                    <i className="fas fa-calendar-day vnma__tab" />
                    <i className="fas fa-heart vnma__tab" />
                    <i className="fas fa-user vnma__tab" />
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
