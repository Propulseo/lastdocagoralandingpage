"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { SPECIALTIES, searchLoginUrl } from "@/lib/specialties";

/* NOTE: the section heading has no i18n key in the source. Copy hardcoded
   for the preview. TODO before prod: externalize to i18n. The specialty
   names themselves DO come from i18n (`specialties.items.*.title`). */
const HEAD = {
  title: "Seize spécialités, un seul endroit.",
  lede: "Des généralistes aux spécialistes, trouvez un professionnel vérifié qui parle votre langue.",
};

export default function SpecialtiesMarquee() {
  const t = useTranslations("specialties");
  const [paused, setPaused] = useState(false);

  const items = SPECIALTIES.map((s) => ({
    key: s.key,
    icon: s.icon,
    title: t(`items.${s.key}.title`),
    href: searchLoginUrl({ q: t(`items.${s.key}.title`) }),
  }));
  const rowA = items.slice(0, 8);
  const rowB = items.slice(8, 16);

  return (
    <section className="vnp-section vnp-section--tint vnsm" aria-labelledby="vnsm-title">
      <style>{`
        .vnsm { overflow: hidden; }
        .vnsm__head { display: flex; align-items: flex-end; justify-content: space-between; gap: 24px; margin-bottom: clamp(28px, 4vw, 44px); }
        .vnsm__title { font-family: var(--font-fraunces), Georgia, serif; font-weight: 600; font-size: clamp(26px, 3.2vw, 42px); line-height: 1.08; letter-spacing: -0.018em; color: var(--vnp-ink); margin: 0; text-wrap: balance; max-width: 18ch; }
        .vnsm__lede { font-size: 15px; line-height: 1.6; color: var(--vnp-body); margin: 12px 0 0; max-width: 46ch; }
        .vnsm__toggle {
          flex-shrink: 0; width: 44px; height: 44px; border-radius: 50%;
          border: 1px solid var(--vnp-line); background: #fff; color: var(--vnp-ink);
          cursor: pointer; display: flex; align-items: center; justify-content: center; font-size: 13px;
          transition: background 0.2s var(--vnp-ease), color 0.2s var(--vnp-ease), transform 0.2s var(--vnp-ease);
        }
        .vnsm__toggle:hover { background: var(--vnp-accent); color: #fff; transform: scale(1.05); }

        .vnsm__rows { display: flex; flex-direction: column; gap: 16px; }
        .vnsm__track { display: flex; gap: 16px; width: max-content; }
        .vnsm__track.a { animation: vnsm-left 42s linear infinite; }
        .vnsm__track.b { animation: vnsm-right 48s linear infinite; }
        .vnsm__rows.is-paused .vnsm__track { animation-play-state: paused; }
        .vnsm__rows:hover .vnsm__track { animation-play-state: paused; }
        @keyframes vnsm-left { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes vnsm-right { from { transform: translateX(-50%); } to { transform: translateX(0); } }

        .vnsm__card {
          flex-shrink: 0; display: inline-flex; align-items: center; gap: 13px;
          padding: 14px 20px 14px 14px; border-radius: 14px;
          background: #fff; border: 1px solid var(--vnp-line); text-decoration: none;
          box-shadow: var(--shadow-xs);
          transition: transform 0.25s var(--vnp-ease), box-shadow 0.25s var(--vnp-ease), border-color 0.25s var(--vnp-ease);
        }
        .vnsm__card:hover { transform: translateY(-4px); box-shadow: var(--shadow-md); border-color: rgba(var(--color-teal-rgb), 0.45); }
        .vnsm__card-icon { width: 42px; height: 42px; border-radius: 11px; flex-shrink: 0; display: flex; align-items: center; justify-content: center; font-size: 19px; color: var(--vnp-accent); background: var(--vnp-accent-soft); }
        .vnsm__card-label { font-size: 14.5px; font-weight: 600; color: var(--vnp-ink); white-space: nowrap; }

        /* edge fades */
        .vnsm__viewport { position: relative; }
        .vnsm__viewport::before, .vnsm__viewport::after { content: ""; position: absolute; top: 0; bottom: 0; width: 9%; z-index: 2; pointer-events: none; }
        .vnsm__viewport::before { left: 0; background: linear-gradient(90deg, var(--color-light-3), transparent); }
        .vnsm__viewport::after { right: 0; background: linear-gradient(270deg, var(--color-light-3), transparent); }

        @media (max-width: 600px) { .vnsm__head { flex-direction: column; align-items: flex-start; } }
        @media (prefers-reduced-motion: reduce) {
          .vnsm__track { animation: none !important; flex-wrap: wrap; width: 100%; }
        }
      `}</style>
      <div className="vnp-shell">
        <div className="vnsm__head">
          <div>
            <h2 className="vnsm__title" id="vnsm-title">{HEAD.title}</h2>
            <p className="vnsm__lede">{HEAD.lede}</p>
          </div>
          <button
            type="button"
            className="vnsm__toggle"
            aria-pressed={paused}
            aria-label={paused ? t("playLabel") : t("pauseLabel")}
            onClick={() => setPaused((p) => !p)}
          >
            <i className={paused ? "fas fa-play" : "fas fa-pause"} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className={`vnsm__viewport${paused ? "" : ""}`}>
        <div className={`vnsm__rows ${paused ? "is-paused" : ""}`}>
          <div className="vnsm__track a">
            {[...rowA, ...rowA].map((s, i) => (
              <a className="vnsm__card" href={s.href} key={`a-${s.key}-${i}`}>
                <span className="vnsm__card-icon"><i className={s.icon} aria-hidden="true" /></span>
                <span className="vnsm__card-label">{s.title}</span>
              </a>
            ))}
          </div>
          <div className="vnsm__track b">
            {[...rowB, ...rowB].map((s, i) => (
              <a className="vnsm__card" href={s.href} key={`b-${s.key}-${i}`}>
                <span className="vnsm__card-icon"><i className={s.icon} aria-hidden="true" /></span>
                <span className="vnsm__card-label">{s.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
