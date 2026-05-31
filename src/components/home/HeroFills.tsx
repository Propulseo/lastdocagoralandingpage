"use client";
import { useTranslations } from "next-intl";
import { searchLoginUrl, SPECIALTY_ICON } from "@/lib/specialties";

/* Five candidate elements to fill the hero right-column space below the
   verified-record card. Rendered side-by-side on /preview-fills for the
   founder to choose. The chosen one gets full i18n + wiring into Hero.tsx. */

// Pin coordinates (% of the board) index-aligned with cities.items
// order: [Lisboa, Porto, Coimbra, Braga, Faro, Cascais]
const PIN_POS = [
  { top: "66%", left: "32%", active: true }, // Lisboa
  { top: "26%", left: "26%" }, // Porto
  { top: "45%", left: "42%" }, // Coimbra
  { top: "13%", left: "34%" }, // Braga
  { top: "90%", left: "56%" }, // Faro
  { top: "71%", left: "15%" }, // Cascais
];

export function FillMap() {
  const tc = useTranslations("cities");
  const cities = tc.raw("items") as string[];
  return (
    <div className="hf hf-map">
      <span className="hf__eyebrow">{tc("eyebrow")}</span>
      <div className="hf-map__board" role="img" aria-label={tc("title")}>
        {cities.map((city, i) => {
          const pos = PIN_POS[i] ?? { top: "50%", left: "50%" };
          return (
            <span
              key={city}
              className={`hf-map__pin${pos.active ? " hf-map__pin--active" : ""}`}
              style={{ top: pos.top, left: pos.left }}
            >
              <span className="hf-map__dot" aria-hidden="true" />
              <span className="hf-map__label">{city}</span>
            </span>
          );
        })}
      </div>
      <p className="hf-map__caption">
        <i className="fas fa-map-marker-alt" aria-hidden="true" />
        {tc("title")}
      </p>
    </div>
  );
}

const STACK = [
  { key: "dermatology", city: 0 }, // Lisboa
  { key: "pediatrics", city: 3 }, // Braga
  { key: "dentistry", city: 1 }, // Porto
];

export function FillStack() {
  const tspec = useTranslations("specialties");
  const tc = useTranslations("cities");
  const tr = useTranslations("record");
  const cities = tc.raw("items") as string[];
  return (
    <div className="hf hf-stack-wrap">
      <span className="hf__eyebrow">{tr("verified")}</span>
      <div className="hf-stack">
        {STACK.map((s) => (
          <div key={s.key} className="hf-stack__card">
            <span className="hf-stack__mono" aria-hidden="true">
              <i className={SPECIALTY_ICON[s.key] ?? "icon-doctor"} />
            </span>
            <div>
              <p className="hf-stack__title">{tspec(`items.${s.key}.title`)}</p>
              <p className="hf-stack__meta">{cities[s.city]} · PT · FR · EN</p>
            </div>
            <i className="fas fa-check-circle hf-stack__check" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

const CHIP_KEYS = ["dermatology", "pediatrics", "dentistry", "psychology", "cardiology"];

export function FillChips() {
  const tspec = useTranslations("specialties");
  const ts = useTranslations("search");
  return (
    <div className="hf hf-chips">
      <span className="hf__eyebrow">{ts("specialtyLabel")}</span>
      <div className="hf-chips__list">
        {CHIP_KEYS.map((key) => (
          <a
            key={key}
            href={searchLoginUrl({ q: tspec(`items.${key}.title`), specialty: key })}
            className="hf-chip"
          >
            <i className={SPECIALTY_ICON[key] ?? "icon-doctor"} aria-hidden="true" />
            {tspec(`items.${key}.title`)}
          </a>
        ))}
      </div>
    </div>
  );
}

const STEP_KEYS = ["step1", "step2", "step4"] as const;

export function FillSteps() {
  const tp = useTranslations("process");
  return (
    <div className="hf hf-steps-wrap">
      <span className="hf__eyebrow">{tp("subtitle")}</span>
      <div className="hf-steps">
        {STEP_KEYS.map((key) => (
          <div key={key} className="hf-step">
            <span className="hf-step__num">{tp(`steps.${key}.number`)}</span>
            <div>
              <p className="hf-step__title">{tp(`steps.${key}.title`)}</p>
              <p className="hf-step__desc">{tp(`steps.${key}.desc`)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Refinements of the chosen "verified profiles" concept ── */
const PROFILES = [
  { key: "dermatology", city: 0, langs: ["PT", "FR"] }, // Lisboa
  { key: "pediatrics", city: 3, langs: ["PT", "EN"] }, // Braga
  { key: "dentistry", city: 1, langs: ["EN", "PT"] }, // Porto
  { key: "psychology", city: 2, langs: ["FR", "EN"] }, // Coimbra
];

function ProfileRow({
  pKey,
  cityIdx,
  langs,
}: {
  pKey: string;
  cityIdx: number;
  langs: string[];
}) {
  const tspec = useTranslations("specialties");
  const tc = useTranslations("cities");
  const cities = tc.raw("items") as string[];
  return (
    <div className="hf-prof">
      <span className="hf-prof__mono" aria-hidden="true">
        <i className={SPECIALTY_ICON[pKey] ?? "icon-doctor"} />
      </span>
      <div>
        <p className="hf-prof__title">{tspec(`items.${pKey}.title`)}</p>
        <p className="hf-prof__meta">
          {cities[cityIdx]} · {langs.join(" · ")}
        </p>
      </div>
      <i className="fas fa-check-circle hf-prof__check" aria-hidden="true" />
    </div>
  );
}

// A) Clean list
export function FillStackList() {
  const tr = useTranslations("record");
  return (
    <div className="hf">
      <span className="hf__eyebrow">{tr("verified")}</span>
      <div className="hf-sl">
        {PROFILES.slice(0, 3).map((p) => (
          <ProfileRow key={p.key} pKey={p.key} cityIdx={p.city} langs={p.langs} />
        ))}
      </div>
    </div>
  );
}

// B) Fanned cards
export function FillStackFan() {
  const tr = useTranslations("record");
  return (
    <div className="hf">
      <span className="hf__eyebrow">{tr("verified")}</span>
      <div className="hf-fan">
        {[PROFILES[2], PROFILES[1], PROFILES[0]].map((p) => (
          <div key={p.key} className="hf-fan__card">
            <ProfileRow pKey={p.key} cityIdx={p.city} langs={p.langs} />
          </div>
        ))}
      </div>
    </div>
  );
}

// C) Vertical ticker
export function FillStackTicker() {
  const tr = useTranslations("record");
  const loop = [...PROFILES, ...PROFILES];
  return (
    <div className="hf">
      <span className="hf__eyebrow">{tr("verified")}</span>
      <div className="hf-ticker">
        <div className="hf-ticker__track">
          {loop.map((p, i) => (
            <ProfileRow key={`${p.key}-${i}`} pKey={p.key} cityIdx={p.city} langs={p.langs} />
          ))}
        </div>
      </div>
    </div>
  );
}

// D) 2×2 badge grid
export function FillStackGrid() {
  const tr = useTranslations("record");
  return (
    <div className="hf">
      <span className="hf__eyebrow">{tr("verified")}</span>
      <div className="hf-grid2">
        {PROFILES.map((p) => (
          <div key={p.key} className="hf-grid2__badge">
            <ProfileRow pKey={p.key} cityIdx={p.city} langs={p.langs} />
          </div>
        ))}
      </div>
    </div>
  );
}

const LANGS = [
  { code: "PT", name: "Português" },
  { code: "FR", name: "Français" },
  { code: "EN", name: "English" },
];

export function FillLanguages() {
  const tr = useTranslations("record");
  return (
    <div className="hf hf-langs-wrap">
      <span className="hf__eyebrow">{tr("speaks")}</span>
      <div className="hf-langs">
        {LANGS.map((l) => (
          <div key={l.code} className="hf-lang-row">
            <span className="hf-lang-code">{l.code}</span>
            <span className="hf-lang-name">{l.name}</span>
            <i className="fas fa-check-circle hf-lang-check" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}
