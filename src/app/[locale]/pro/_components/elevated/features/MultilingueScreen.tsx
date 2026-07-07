"use client";

/* ============================================================
   Reproduction illustrative de l'écran multilingue : switcher de
   langue (PT actif | FR | EN) + 3 cartes côte à côte montrant le
   MÊME élément produit (bouton + 2 libellés de statut) traduit en
   PT / FR / EN. Contenu littéral illustratif (cf. FeaturesElevated).
   Préfixe CSS « hef-multi__ ».
   ============================================================ */

import { useTranslations } from "next-intl";

const SWITCHER = [
  { code: "PT", on: true },
  { code: "FR", on: false },
  { code: "EN", on: false },
];

const CARDS = [
  { code: "PT", name: "Português", cta: "Marcar consulta", available: "Disponível", confirmed: "Confirmado" },
  { code: "FR", name: "Français", cta: "Prendre RDV", available: "Disponible", confirmed: "Confirmé" },
  { code: "EN", name: "English", cta: "Book appointment", available: "Available", confirmed: "Confirmed" },
];

export default function MultilingueScreen() {
  const t = useTranslations("pro");
  return (
    <div className="hef-multi">
      <style>{`
        .hef-multi__switcher { display: inline-flex; gap: 4px; padding: 4px; margin-bottom: 20px;
          border-radius: 12px; background: var(--v2-surface); border: 1px solid var(--v2-border); }
        .hef-multi__seg { min-width: 44px; text-align: center; padding: 6px 12px; border-radius: 9px;
          font-size: 12px; font-weight: 800; letter-spacing: 0.03em; color: var(--v2-text-muted); }
        .hef-multi__seg.is-on { color: var(--v2-accent-ink); background: var(--v2-accent); }
        .hef-multi__cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .hef-multi__card { display: flex; flex-direction: column; gap: 12px; padding: 14px;
          border-radius: 12px; background: var(--v2-surface); border: 1px solid var(--v2-border); }
        .hef-multi__cardhead { display: flex; align-items: center; gap: 8px; }
        .hef-multi__code { font-size: 10.5px; font-weight: 800; letter-spacing: 0.03em;
          color: var(--v2-accent-ink); background: var(--v2-accent); border-radius: 7px; padding: 3px 7px; }
        .hef-multi__name { font-size: 12px; font-weight: 700; color: var(--v2-text); }
        .hef-multi__cta { display: block; text-align: center; padding: 9px 12px; border-radius: 9px;
          font-size: 12.5px; font-weight: 700; color: var(--v2-accent-ink); background: var(--v2-accent); }
        .hef-multi__tags { display: flex; flex-wrap: wrap; gap: 6px; }
        .hef-multi__tag { font-size: 10.5px; font-weight: 700; border-radius: 999px; padding: 3px 9px; }
        .hef-multi__tag.is-avail { color: var(--v2-accent-text);
          background: color-mix(in srgb, var(--v2-accent) 14%, transparent); }
        .hef-multi__tag.is-ok { color: var(--v2-text-body);
          background: color-mix(in srgb, var(--v2-panel-text) 8%, transparent); border: 1px solid var(--v2-border); }
        .hef-multi__note { margin: 18px 0 0; font-size: 11.5px; font-style: italic; color: var(--v2-text-muted); }
        @media (max-width: 640px) { .hef-multi__cards { grid-template-columns: 1fr; } }
      `}</style>

      <div className="hef-multi__switcher" aria-hidden="true">
        {SWITCHER.map((s) => (
          <span key={s.code} className={`hef-multi__seg${s.on ? " is-on" : ""}`}>
            {s.code}
          </span>
        ))}
      </div>

      <div className="hef-multi__cards">
        {CARDS.map((c) => (
          <div className="hef-multi__card" key={c.code}>
            <div className="hef-multi__cardhead">
              <span className="hef-multi__code">{c.code}</span>
              <span className="hef-multi__name">{c.name}</span>
            </div>
            <span className="hef-multi__cta">{c.cta}</span>
            <div className="hef-multi__tags">
              <span className="hef-multi__tag is-avail">{c.available}</span>
              <span className="hef-multi__tag is-ok">{c.confirmed}</span>
            </div>
          </div>
        ))}
      </div>

      <p className="hef-multi__note">{t("appScreens.multilingue.benefit")}</p>
    </div>
  );
}
