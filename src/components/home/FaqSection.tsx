"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

/** FAQ patient — compacte : au lieu d'empiler 10 questions, on les groupe en
 *  3 thèmes (onglets) et on n'affiche qu'un groupe à la fois. Libellés via
 *  faqPage.cat.* ; questions via faqPage.items.qN ; titre via contactPage.
 *  Catégories factuelles (pas de « confiance » anxiogène en contexte médical). */
const CATEGORIES = [
  { id: "platform", qs: [1, 2, 3, 7] },
  { id: "appointments", qs: [4, 5, 10] },
  { id: "account", qs: [6, 8, 9] },
] as const;

export default function FaqSection() {
  const t = useTranslations("faqPage");
  const tc = useTranslations("contactPage");
  const [activeCat, setActiveCat] = useState<string>(CATEGORIES[0].id);
  const [open, setOpen] = useState<number | null>(CATEGORIES[0].qs[0]);

  const current = CATEGORIES.find((c) => c.id === activeCat) ?? CATEGORIES[0];

  return (
    <section className="vnp-section vnfaq" aria-labelledby="vnfaq-title">
      <style>{`
        .vnfaq__grid {
          display: grid; grid-template-columns: 0.85fr 1.15fr;
          gap: clamp(32px, 5vw, 72px); align-items: start;
        }
        .vnfaq__aside { position: sticky; top: 110px; }
        .vnfaq__sub { font-size: 13px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--vnp-accent); margin: 0 0 14px; }
        .vnfaq__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(26px, 3vw, 40px); line-height: 1.1; letter-spacing: -0.018em; color: var(--vnp-ink); margin: 0; text-wrap: balance; }

        /* Onglets de thème */
        .vnfaq__tabs { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 18px; }
        .vnfaq__tab {
          font-family: inherit; font-size: 13.5px; font-weight: 600; color: var(--vnp-body);
          background: var(--vnp-card); border: 1px solid var(--vnp-line); border-radius: 999px;
          padding: 9px 16px; cursor: pointer;
          transition: color 0.2s var(--vnp-ease), border-color 0.2s var(--vnp-ease), background 0.2s var(--vnp-ease);
        }
        .vnfaq__tab:hover { border-color: rgba(var(--color-teal-rgb), 0.5); color: var(--vnp-ink); }
        .vnfaq__tab.is-active {
          color: #fff; border-color: transparent;
          background: linear-gradient(135deg, var(--vnp-accent), #2E8C86);
          box-shadow: 0 10px 22px -12px rgba(var(--color-mint-rgb), 0.75);
        }
        .vnfaq__tab:focus-visible { outline: 3px solid rgba(var(--color-teal-rgb), 0.4); outline-offset: 2px; }

        .vnfaq__list { display: flex; flex-direction: column; gap: 12px; }
        .vnfaq__item { border: 1px solid var(--vnp-line); border-radius: 14px; background: var(--vnp-card); overflow: hidden; transition: border-color 0.25s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease); }
        .vnfaq__item.is-open { border-color: rgba(var(--color-teal-rgb), 0.5); box-shadow: var(--shadow-sm); }
        .vnfaq__q {
          width: 100%; text-align: left; cursor: pointer; border: 0; background: transparent;
          display: flex; align-items: center; justify-content: space-between; gap: 16px;
          padding: 18px 20px; font-family: inherit; font-size: 16px; font-weight: 600; color: var(--vnp-ink);
        }
        .vnfaq__q-icon { flex-shrink: 0; width: 26px; height: 26px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 12px; color: var(--vnp-accent); background: var(--vnp-accent-soft); transition: transform 0.3s var(--vnp-ease); }
        .vnfaq__item.is-open .vnfaq__q-icon { transform: rotate(45deg); }
        .vnfaq__panel { overflow: hidden; max-height: 0; transition: max-height 0.4s var(--vnp-ease); }
        .vnfaq__item.is-open .vnfaq__panel { max-height: 460px; }
        .vnfaq__a { margin: 0; padding: 0 20px 20px; font-size: 14.5px; line-height: 1.65; color: var(--vnp-body); }
        @media (max-width: 860px) {
          .vnfaq__grid { grid-template-columns: 1fr; gap: 28px; }
          .vnfaq__aside { position: static; }
        }
        @media (prefers-reduced-motion: reduce) {
          .vnfaq__panel, .vnfaq__tab, .vnfaq__q-icon { transition: none; }
        }
      `}</style>
      <div className="vnp-shell">
        <div className="vnfaq__grid">
          <div className="vnfaq__aside">
            <p className="vnfaq__sub">{tc("faqSubtitle")}</p>
            <h2 className="vnfaq__title" id="vnfaq-title">{tc("faqTitle")}</h2>
          </div>
          <div className="vnfaq__main">
            <div className="vnfaq__tabs" role="tablist" aria-label={tc("faqTitle")}>
              {CATEGORIES.map((c) => {
                const isActive = c.id === activeCat;
                return (
                  <button
                    key={c.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`vnfaq__tab${isActive ? " is-active" : ""}`}
                    onClick={() => {
                      setActiveCat(c.id);
                      setOpen(c.qs[0]);
                    }}
                  >
                    {t(`cat.${c.id}`)}
                  </button>
                );
              })}
            </div>
            <div className="vnfaq__list">
              {current.qs.map((i) => {
                const isOpen = open === i;
                return (
                  <div className={`vnfaq__item${isOpen ? " is-open" : ""}`} key={i}>
                    <button
                      type="button"
                      className="vnfaq__q"
                      aria-expanded={isOpen}
                      aria-controls={`vnfaq-panel-${i}`}
                      onClick={() => setOpen(isOpen ? null : i)}
                    >
                      {t(`items.q${i}.question`)}
                      <span className="vnfaq__q-icon" aria-hidden="true"><i className="fas fa-plus" /></span>
                    </button>
                    <div className="vnfaq__panel" id={`vnfaq-panel-${i}`} role="region">
                      <p className="vnfaq__a">{t(`items.q${i}.answer`)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
