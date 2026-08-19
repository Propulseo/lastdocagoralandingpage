"use client";

import { useTranslations } from "next-intl";
import AnimatedSection from "@/components/shared/AnimatedSection";

/** Editorial 2-column "about": media on the left (organic frame), prose +
 *  checklist on the right. Reuses the `about.*` i18n keys. */
export default function AboutPatient() {
  const t = useTranslations("about");
  const checks = [t("list1"), t("list2"), t("list3")];

  return (
    <section className="vnp-section vnab" aria-labelledby="vnab-title">
      <style>{`
        .vnab__grid {
          display: grid; grid-template-columns: 0.92fr 1.08fr;
          gap: clamp(36px, 5vw, 76px); align-items: center;
        }
        .vnab__media { position: relative; }
        .vnab__media img {
          display: block; width: 100%; height: clamp(380px, 46vw, 540px);
          object-fit: cover; border-radius: 32px;
          box-shadow: var(--shadow-lg);
        }
        /* Débord symétrique gauche/droite : la carte débordait de 18px à gauche
           et venait butter contre le bord droit de l'image (retour client). */
        .vnab__badge {
          position: absolute; left: -18px; right: -18px; bottom: 34px;
          display: flex; align-items: center; gap: 13px;
          padding: 16px 20px; border-radius: 20px;
          background: rgba(255,255,255,0.92); border: 1px solid var(--vnp-line);
          backdrop-filter: blur(10px);
          box-shadow: var(--shadow-md);
        }
        .vnab__badge-icon {
          width: 44px; height: 44px; border-radius: 12px; flex-shrink: 0;
          display: flex; align-items: center; justify-content: center;
          font-size: 20px; color: #fff;
          background: linear-gradient(135deg, var(--color-navy), var(--color-cobalt));
        }
        .vnab__badge-v { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: 17px; color: var(--vnp-ink); margin: 0; line-height: 1.1; }
        .vnab__badge-l { font-size: 12px; color: var(--vnp-muted); margin: 2px 0 0; }
        .vnab__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(28px, 3.4vw, 44px); line-height: 1.08; letter-spacing: -0.018em; color: var(--vnp-ink); margin: 0; text-wrap: balance; }
        .vnab__title em { font-style: italic; color: var(--vnp-accent); }
        .vnab__subtitle { font-size: clamp(16px, 1.4vw, 18px); font-weight: 600; color: var(--vnp-accent); margin: 16px 0 0; }
        .vnab__p { font-size: 15px; line-height: 1.72; color: var(--vnp-body); margin: 16px 0 0; max-width: 56ch; }
        .vnab__list { list-style: none; margin: 24px 0 0; padding: 0; display: flex; flex-direction: column; gap: 14px; }
        .vnab__list li { display: flex; gap: 13px; font-size: 14.5px; line-height: 1.5; color: var(--vnp-body); }
        .vnab__check { flex-shrink: 0; width: 24px; height: 24px; margin-top: 1px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; color: var(--vnp-accent); background: var(--vnp-accent-soft); }
        .vnab__cta { margin-top: 28px; }
        @media (max-width: 880px) {
          .vnab__grid { grid-template-columns: 1fr; gap: 36px; }
          .vnab__media img { height: clamp(280px, 60vw, 420px); border-radius: 24px; }
          /* Sur mobile, pas de débord : la carte s'aligne sur l'image pour ne
             pas toucher le bord de l'écran. */
          .vnab__badge { left: 0; right: 0; }
        }
      `}</style>
      <div className="vnp-shell">
        <div className="vnab__grid">
          <AnimatedSection direction="left">
            <div className="vnab__media">
              <img src="/assets/images/about/2.jpg" alt="" />
              <div className="vnab__badge">
                <span className="vnab__badge-icon"><i className="fas fa-user-md" aria-hidden="true" /></span>
                <div>
                  <p className="vnab__badge-v">100%</p>
                  <p className="vnab__badge-l">{t("list2").split(".")[0]}</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="right" delay={0.1}>
            <div>
              <h2 className="vnab__title" id="vnab-title">
                {t("title")} <em>{t("titleBreak")}</em>
              </h2>
              <p className="vnab__subtitle">{t("subtitle")}</p>
              <p className="vnab__p">{t("paragraph1")}</p>
              <p className="vnab__p">{t("paragraph2")}</p>
              <ul className="vnab__list">
                {checks.map((c) => (
                  <li key={c}>
                    <span className="vnab__check" aria-hidden="true"><i className="fas fa-check" /></span>
                    {c}
                  </li>
                ))}
              </ul>
              <div className="vnab__cta">
                <a className="vnp-btn vnp-btn--primary" href="#vnp-hero">
                  {t("findProfessional")}
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
