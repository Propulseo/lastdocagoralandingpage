"use client";

import { useState } from "react";

/* ============================================================
   DocAgora, Landing PRO V2 · Section FONCTIONNALITÉS · Variante 3
   Layout : grille / accordéon de cartes fonctionnalité. La carte
   active se déploie sur toute la largeur et révèle son mockup.
   Themeable via tokens --v2-* (dark / light / mixte). Classes v2f3-*.
   ============================================================ */

type FeatureId =
  | "agenda"
  | "patients"
  | "reservation"
  | "tableau"
  | "multilingue"
  | "rappels";

interface Feature {
  id: FeatureId;
  title: string;
  desc: string;
  icon: string;
  soon?: boolean;
}

const FEATURES: Feature[] = [
  {
    id: "agenda",
    title: "Agenda intelligent",
    desc: "Votre semaine de consultations en un coup d’œil, par couleur et par praticien.",
    icon: "fa-calendar-check",
  },
  {
    id: "patients",
    title: "Gestion des patients",
    desc: "Une fiche claire par patient, avec recherche instantanée et étiquettes.",
    icon: "fa-users",
  },
  {
    id: "reservation",
    title: "Réservation en ligne 24h/24",
    desc: "Vos patients demandent un créneau à toute heure, vous confirmez d’un clic.",
    icon: "fa-clock",
  },
  {
    id: "tableau",
    title: "Tableau de bord",
    desc: "Les indicateurs clés de votre cabinet, réunis sur un seul écran.",
    icon: "fa-chart-bar",
  },
  {
    id: "multilingue",
    title: "Plateforme multilingue",
    desc: "Interface en Portugais, Français et Anglais, pour tous vos patients.",
    icon: "fa-language",
  },
  {
    id: "rappels",
    title: "Rappels automatiques",
    desc: "Des notifications avant chaque rendez-vous pour réduire les absences.",
    icon: "fa-bell",
    soon: true,
  },
];

function Chrome({ path }: { path: string }) {
  return (
    <div className="v2f3-chrome" aria-hidden="true">
      <span className="v2f3-dot v2f3-dot--r" />
      <span className="v2f3-dot v2f3-dot--y" />
      <span className="v2f3-dot v2f3-dot--g" />
      <span className="v2f3-url">
        <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        pro.docagora.com/{path}
      </span>
    </div>
  );
}

const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
const SLOTS = [
  { day: 0, top: 6, h: 22, tone: "cobalt", who: "M. Costa" },
  { day: 0, top: 42, h: 16, tone: "teal", who: "A. Lopes" },
  { day: 1, top: 14, h: 28, tone: "mint", who: "R. Dias" },
  { day: 2, top: 8, h: 18, tone: "cobalt", who: "S. Nunes" },
  { day: 2, top: 50, h: 20, tone: "teal", who: "P. Sá" },
  { day: 3, top: 24, h: 24, tone: "cobalt", who: "L. Faria" },
  { day: 4, top: 10, h: 16, tone: "mint", who: "J. Melo" },
  { day: 4, top: 46, h: 22, tone: "teal", who: "C. Reis" },
] as const;

function ScreenAgenda() {
  return (
    <div className="v2f3-screen">
      <div className="v2f3-screen__bar">
        <span className="v2f3-screen__title">Mai 2026 · Semaine 22</span>
        <span className="v2f3-pill v2f3-pill--soft">Aujourd’hui</span>
      </div>
      <div className="v2f3-week">
        {WEEK_DAYS.map((d, i) => (
          <div className="v2f3-week__col" key={d}>
            <span className="v2f3-week__day">{d}</span>
            <div className="v2f3-week__track">
              {SLOTS.filter((s) => s.day === i).map((s) => (
                <span
                  key={`${d}-${s.top}`}
                  className={`v2f3-evt v2f3-evt--${s.tone}`}
                  style={{ top: `${s.top}%`, height: `${s.h}%` }}
                >
                  {s.who}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const PATIENTS = [
  { ini: "MC", name: "Marie Côté", tag: "Cardiologie" },
  { ini: "RD", name: "Romain Dupont", tag: "Dermatologie" },
  { ini: "SN", name: "Sophie Noël", tag: "Pédiatrie" },
  { ini: "LF", name: "Lucas Faure", tag: "Généraliste" },
];

function ScreenPatients() {
  return (
    <div className="v2f3-screen">
      <div className="v2f3-screen__bar">
        <span className="v2f3-screen__title">Patients</span>
        <span className="v2f3-search">
          <i className="fa fa-search" aria-hidden="true" /> Rechercher
        </span>
      </div>
      <ul className="v2f3-plist">
        {PATIENTS.map((p) => (
          <li className="v2f3-prow" key={p.name}>
            <span className="v2f3-avatar">{p.ini}</span>
            <span className="v2f3-prow__name">{p.name}</span>
            <span className="v2f3-tag">{p.tag}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ScreenReservation() {
  return (
    <div className="v2f3-screen">
      <div className="v2f3-screen__bar">
        <span className="v2f3-screen__title">Réservation patient</span>
        <span className="v2f3-pill v2f3-pill--soft">24h/24</span>
      </div>
      <div className="v2f3-resa">
        <p className="v2f3-resa__lead">Choisissez un créneau</p>
        <div className="v2f3-resa__slots">
          {["09:00", "09:30", "10:15", "11:00", "14:30", "15:45"].map((t, i) => (
            <span key={t} className={`v2f3-slot${i === 2 ? " is-on" : ""}`}>
              {t}
            </span>
          ))}
        </div>
        <p className="v2f3-screen__note">Vos patients réservent en ligne, vous confirmez d’un clic.</p>
      </div>
    </div>
  );
}

const BARS = [38, 52, 44, 67, 58, 74, 49];
const BAR_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

function ScreenTableau() {
  return (
    <div className="v2f3-screen">
      <div className="v2f3-screen__bar">
        <span className="v2f3-screen__title">Tableau de bord · 7 jours</span>
        <span className="v2f3-pill v2f3-pill--soft">*illustratif</span>
      </div>
      <div className="v2f3-stats">
        <div className="v2f3-stat">
          <span className="v2f3-stat__num">128</span>
          <span className="v2f3-stat__lab">Consultations</span>
        </div>
        <div className="v2f3-stat">
          <span className="v2f3-stat__num v2f3-stat__num--teal">94%</span>
          <span className="v2f3-stat__lab">Présence*</span>
        </div>
        <div className="v2f3-stat">
          <span className="v2f3-stat__num v2f3-stat__num--mint">4,8</span>
          <span className="v2f3-stat__lab">Satisfaction*</span>
        </div>
      </div>
      <div className="v2f3-chart" role="img" aria-label="Graphique illustratif des consultations par jour">
        {BARS.map((v, i) => (
          <span className="v2f3-chart__col" key={`${BAR_LABELS[i]}-${v}`}>
            <span className="v2f3-chart__bar" style={{ height: `${v}%` }} />
            <span className="v2f3-chart__lab">{BAR_LABELS[i]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const LANGS = [
  { code: "PT", label: "Português", on: true },
  { code: "FR", label: "Français", on: false },
  { code: "EN", label: "English", on: false },
];

function ScreenMultilingue() {
  return (
    <div className="v2f3-screen">
      <div className="v2f3-screen__bar">
        <span className="v2f3-screen__title">Langue de l’interface</span>
        <span className="v2f3-pill v2f3-pill--soft">
          <i className="fa fa-language" aria-hidden="true" /> 3 langues
        </span>
      </div>
      <ul className="v2f3-langs">
        {LANGS.map((l) => (
          <li className={`v2f3-lang${l.on ? " is-on" : ""}`} key={l.code}>
            <span className="v2f3-lang__code">{l.code}</span>
            <span className="v2f3-lang__label">{l.label}</span>
            {l.on ? <i className="fa fa-check" aria-hidden="true" /> : null}
          </li>
        ))}
      </ul>
    </div>
  );
}

const NOTIFS = [
  { who: "M. Costa", when: "Rappel envoyé · J-1" },
  { who: "A. Lopes", when: "Rappel envoyé · J-1" },
  { who: "R. Dias", when: "Programmé · demain 9h" },
];

function ScreenRappels() {
  return (
    <div className="v2f3-screen">
      <div className="v2f3-screen__bar">
        <span className="v2f3-screen__title">Rappels automatiques</span>
        <span className="v2f3-pill v2f3-pill--soon">bientôt</span>
      </div>
      <ul className="v2f3-notifs">
        {NOTIFS.map((n) => (
          <li className="v2f3-notif" key={n.who}>
            <span className="v2f3-notif__ic" aria-hidden="true">
              <i className="fa fa-bell" />
            </span>
            <span className="v2f3-notif__main">
              <span className="v2f3-notif__who">{n.who}</span>
              <span className="v2f3-notif__when">{n.when}</span>
            </span>
          </li>
        ))}
      </ul>
      <p className="v2f3-screen__note">Les rappels automatiques arrivent bientôt.</p>
    </div>
  );
}

const SCREENS: Record<FeatureId, () => React.ReactElement> = {
  agenda: ScreenAgenda,
  patients: ScreenPatients,
  reservation: ScreenReservation,
  tableau: ScreenTableau,
  multilingue: ScreenMultilingue,
  rappels: ScreenRappels,
};

export default function Features3() {
  const [active, setActive] = useState<FeatureId>("agenda");

  return (
    <section className="v2f3-root" aria-labelledby="v2f3-title">
      <style>{`
        .v2f3-root {
          box-sizing: border-box;
          --v2f3-mono: ui-monospace, "SF Mono", Menlo, monospace;
          --v2f3-r: 18px;
          position: relative;
          width: 100%;
          padding: clamp(72px, 10vh, 120px) 0;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--v2-text-body);
          background:
            radial-gradient(820px 460px at 12% -8%, var(--v2-mesh-b), transparent 60%),
            radial-gradient(820px 460px at 92% 102%, var(--v2-mesh-a), transparent 60%),
            var(--v2-bg);
          overflow: hidden;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        .v2f3-root *, .v2f3-root *::before, .v2f3-root *::after { box-sizing: border-box; }

        .v2f3-wrap {
          position: relative; z-index: 1;
          max-width: 1200px; margin-inline: auto; padding-inline: clamp(16px, 4vw, 24px);
        }

        .v2f3-head { text-align: center; max-width: 60ch; margin-inline: auto; }
        .v2f3-kicker {
          display: inline-flex; align-items: center; gap: 8px;
          font-family: var(--v2f3-mono);
          font-size: 12px; letter-spacing: 0.22em; text-transform: uppercase; font-weight: 600;
          color: var(--v2-eyebrow);
        }
        .v2f3-h2 {
          font-family: var(--font-fraunces), serif;
          font-weight: 600; font-size: clamp(28px, 4vw, 44px);
          line-height: 1.08; letter-spacing: -0.02em; margin: 16px 0 0;
          color: var(--v2-text);
        }
        .v2f3-sub {
          font-size: clamp(15px, 1.5vw, 18px);
          color: var(--v2-text-body);
          margin: 14px auto 0; max-width: 54ch; font-weight: 500;
        }

        /* ── Grille de cartes accordéon = CARTES themeable ── */
        .v2f3-grid {
          display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-top: 48px;
        }
        .v2f3-card {
          grid-column: span 1;
          border-radius: var(--v2f3-r);
          border: 1px solid var(--v2-border);
          background: var(--v2-surface);
          box-shadow: var(--v2-shadow);
          overflow: hidden;
          transition: border-color .2s ease, background-color .2s ease;
        }
        .v2f3-card.is-open {
          grid-column: 1 / -1;
          border-color: color-mix(in srgb, var(--v2-accent) 45%, transparent);
          background: var(--v2-surface-2);
          box-shadow: var(--v2-shadow-lg);
        }
        .v2f3-trigger {
          display: flex; align-items: center; gap: 16px;
          width: 100%; text-align: left;
          padding: 20px 22px;
          background: transparent; border: 0; cursor: pointer;
          color: var(--v2-text);
          font-family: var(--font-montserrat), sans-serif;
        }
        .v2f3-trigger:focus-visible { outline: 2px solid var(--v2-accent); outline-offset: -3px; }
        .v2f3-trigger:hover .v2f3-trigger__ic { transform: translateY(-2px); }
        .v2f3-trigger__ic {
          width: 46px; height: 46px; border-radius: 13px; flex-shrink: 0;
          display: grid; place-items: center; font-size: 18px; color: var(--v2-accent-ink);
          background: var(--v2-accent-2);
          transition: transform .2s ease;
        }
        .v2f3-card.is-open .v2f3-trigger__ic {
          background: var(--v2-accent);
          color: var(--v2-accent-ink);
        }
        .v2f3-trigger__body { flex: 1; min-width: 0; }
        .v2f3-trigger__t {
          font-weight: 700; font-size: 17px; color: var(--v2-text);
          display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
        }
        .v2f3-trigger__d {
          font-size: 13px; margin-top: 4px;
          color: var(--v2-text-body);
        }
        .v2f3-trigger__chev {
          flex-shrink: 0; color: var(--v2-accent-text); font-size: 14px;
          transition: transform .25s ease;
        }
        .v2f3-card.is-open .v2f3-trigger__chev { transform: rotate(180deg); }
        .v2f3-soon {
          font-family: var(--v2f3-mono); font-size: 9px; letter-spacing: 0.04em; font-weight: 700;
          padding: 3px 7px; border-radius: 999px;
          background: var(--v2-surface-2); color: var(--v2-text-muted);
          border: 1px solid var(--v2-border);
        }

        .v2f3-panel { padding: 0 22px 22px; }

        /* ── Mockup = PANNEAU themeable ── */
        .v2f3-mock {
          position: relative;
          border-radius: 14px;
          background: var(--v2-feat-panel-bg);
          color: var(--v2-feat-panel-text);
          border: 1px solid var(--v2-feat-panel-border);
          overflow: hidden;
        }
        .v2f3-chrome {
          display: flex; align-items: center; gap: 8px;
          padding: 11px 13px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border-bottom: 1px solid var(--v2-feat-panel-border);
        }
        .v2f3-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
        .v2f3-dot--r { background: color-mix(in srgb, var(--v2-feat-panel-text) 22%, transparent); }
        .v2f3-dot--y { background: color-mix(in srgb, var(--v2-feat-panel-text) 16%, transparent); }
        .v2f3-dot--g { background: var(--v2-accent); }
        .v2f3-url {
          flex: 1; margin-left: 8px;
          display: inline-flex; align-items: center; gap: 7px;
          padding: 5px 11px; border-radius: 8px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 6%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
          font-family: var(--v2f3-mono); font-size: 11px;
          color: var(--v2-feat-panel-muted);
        }
        .v2f3-url svg { color: var(--v2-accent); flex-shrink: 0; }
        .v2f3-view { padding: 20px; min-height: 300px; }

        @keyframes v2f3-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .v2f3-panel { animation: v2f3-in .35s cubic-bezier(.2,.7,.2,1) both; }
        .v2f3-screen__bar {
          display: flex; align-items: center; justify-content: space-between; gap: 10px; margin-bottom: 16px;
        }
        .v2f3-screen__title { font-weight: 700; font-size: 14px; color: var(--v2-feat-panel-text); }
        .v2f3-screen__note {
          margin: 14px 0 0; font-size: 11px; font-style: italic;
          color: var(--v2-feat-panel-muted);
        }
        .v2f3-search {
          font-size: 11px; color: var(--v2-feat-panel-muted);
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px; border-radius: 7px;
          border: 1px solid var(--v2-feat-panel-border);
        }
        .v2f3-pill {
          font-family: var(--v2f3-mono); font-size: 10px; letter-spacing: 0.04em;
          padding: 4px 9px; border-radius: 999px; font-weight: 600;
          display: inline-flex; align-items: center; gap: 5px; white-space: nowrap;
        }
        .v2f3-pill--soft {
          background: color-mix(in srgb, var(--v2-accent) 16%, transparent);
          color: var(--v2-accent-text);
        }
        .v2f3-pill--soon {
          background: color-mix(in srgb, var(--v2-feat-panel-text) 10%, transparent);
          color: var(--v2-feat-panel-muted);
        }

        /* week */
        .v2f3-week { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .v2f3-week__col { display: flex; flex-direction: column; gap: 8px; }
        .v2f3-week__day {
          font-family: var(--v2f3-mono); font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.08em; text-align: center;
          color: var(--v2-feat-panel-muted);
        }
        .v2f3-week__track {
          position: relative; height: 220px; border-radius: 9px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
        }
        .v2f3-evt {
          position: absolute; left: 5px; right: 5px;
          border-radius: 6px; padding: 4px 6px;
          font-size: 9.5px; font-weight: 700;
          overflow: hidden; white-space: nowrap; text-overflow: ellipsis;
        }
        .v2f3-evt--cobalt { background: var(--v2-accent-2); color: var(--v2-accent-ink); }
        .v2f3-evt--teal { background: var(--v2-accent); color: var(--v2-accent-ink); }
        .v2f3-evt--mint {
          background: color-mix(in srgb, var(--v2-accent) 70%, var(--v2-accent-2));
          color: var(--v2-accent-ink);
        }

        /* patients */
        .v2f3-plist { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; }
        .v2f3-prow {
          display: flex; align-items: center; gap: 12px;
          padding: 12px 14px; border-radius: 11px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
        }
        .v2f3-avatar {
          width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
          display: grid; place-items: center;
          font-size: 11px; font-weight: 800; color: var(--v2-accent-ink);
          background: var(--v2-accent-2);
        }
        .v2f3-prow__name { font-weight: 700; font-size: 13px; color: var(--v2-feat-panel-text); flex: 1; }
        .v2f3-tag {
          font-size: 10px; font-weight: 600; padding: 3px 9px; border-radius: 999px;
          background: color-mix(in srgb, var(--v2-accent) 16%, transparent); color: var(--v2-accent-text);
        }

        /* reservation */
        .v2f3-resa__lead { font-size: 14px; font-weight: 600; color: var(--v2-feat-panel-text); margin: 0 0 12px; }
        .v2f3-resa__slots { display: grid; grid-template-columns: repeat(6, 1fr); gap: 10px; }
        .v2f3-slot {
          display: grid; place-items: center; min-height: 46px;
          border-radius: 10px; font-size: 13px; font-weight: 600;
          font-family: var(--v2f3-mono);
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
          color: var(--v2-feat-panel-text);
        }
        .v2f3-slot.is-on {
          background: var(--v2-accent);
          color: var(--v2-accent-ink); border-color: transparent;
        }

        /* stats + chart */
        .v2f3-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 16px; }
        .v2f3-stat {
          padding: 16px; border-radius: 12px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
          display: flex; flex-direction: column; gap: 4px;
        }
        .v2f3-stat__num { font-weight: 800; font-size: 26px; letter-spacing: -0.02em; color: var(--v2-accent-2); }
        .v2f3-stat__num--teal { color: var(--v2-accent-text); }
        .v2f3-stat__num--mint { color: var(--v2-accent-text); }
        .v2f3-stat__lab { font-size: 11px; font-weight: 600; color: var(--v2-feat-panel-muted); }
        .v2f3-chart {
          display: grid; grid-template-columns: repeat(7, 1fr); gap: 12px;
          align-items: end; height: 130px; padding: 14px; border-radius: 12px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
        }
        .v2f3-chart__col { display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
        .v2f3-chart__bar {
          width: 100%; max-width: 22px; border-radius: 5px 5px 2px 2px;
          background: linear-gradient(180deg, var(--v2-accent-2), var(--v2-accent));
          transform-origin: bottom; animation: v2f3-grow .6s cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes v2f3-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .v2f3-chart__lab { font-family: var(--v2f3-mono); font-size: 9px; color: var(--v2-feat-panel-muted); }

        /* langs */
        .v2f3-langs { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
        .v2f3-lang {
          display: flex; align-items: center; gap: 12px; min-height: 56px;
          padding: 12px 16px; border-radius: 12px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px solid var(--v2-feat-panel-border);
          color: var(--v2-feat-panel-text);
        }
        .v2f3-lang.is-on { border-color: color-mix(in srgb, var(--v2-accent) 50%, transparent); }
        .v2f3-lang__code {
          font-family: var(--v2f3-mono); font-weight: 800; font-size: 13px;
          width: 38px; height: 30px; display: grid; place-items: center; border-radius: 8px;
          background: color-mix(in srgb, var(--v2-accent) 18%, transparent); color: var(--v2-accent-text);
        }
        .v2f3-lang__label { flex: 1; font-size: 13px; font-weight: 600; }
        .v2f3-lang i { color: var(--v2-accent-text); }

        /* notifs */
        .v2f3-notifs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 10px; }
        .v2f3-notif {
          display: flex; align-items: center; gap: 14px;
          padding: 13px 16px; border-radius: 12px;
          background: color-mix(in srgb, var(--v2-feat-panel-text) 5%, transparent);
          border: 1px dashed color-mix(in srgb, var(--v2-accent) 35%, transparent);
        }
        .v2f3-notif__ic {
          width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
          display: grid; place-items: center; font-size: 14px; color: var(--v2-accent-ink);
          background: var(--v2-accent);
        }
        .v2f3-notif__main { display: flex; flex-direction: column; gap: 2px; }
        .v2f3-notif__who { font-weight: 700; font-size: 14px; color: var(--v2-feat-panel-text); }
        .v2f3-notif__when { font-size: 12px; color: var(--v2-feat-panel-muted); }

        /* ── Responsive ── */
        @media (max-width: 820px) {
          .v2f3-grid { grid-template-columns: 1fr; }
          .v2f3-card, .v2f3-card.is-open { grid-column: 1 / -1; }
        }
        @media (max-width: 560px) {
          .v2f3-plist { grid-template-columns: 1fr; }
          .v2f3-stats { grid-template-columns: 1fr; }
          .v2f3-langs { grid-template-columns: 1fr; }
          .v2f3-resa__slots { grid-template-columns: repeat(3, 1fr); }
          .v2f3-week__track { height: 180px; }
        }

        @media (prefers-reduced-motion: reduce) {
          .v2f3-root *, .v2f3-root *::before, .v2f3-root *::after {
            animation: none !important; transition: none !important;
          }
        }
      `}</style>

      <div className="v2f3-wrap">
        <div className="v2f3-head">
          <span className="v2f3-kicker">
            <i className="fa fa-th-large" aria-hidden="true" /> Fonctionnalités
          </span>
          <h2 className="v2f3-h2" id="v2f3-title">
            Tout ce qu’il vous faut pour gérer votre cabinet, au même endroit.
          </h2>
          <p className="v2f3-sub">
            Ouvrez une fonctionnalité pour déployer l’aperçu de l’outil, directement dans la carte.
          </p>
        </div>

        <div className="v2f3-grid">
          {FEATURES.map((f) => {
            const open = active === f.id;
            const ActiveScreen = SCREENS[f.id];
            return (
              <article className={`v2f3-card${open ? " is-on is-open" : ""}`} key={f.id}>
                <h3>
                  <button
                    type="button"
                    className="v2f3-trigger"
                    aria-expanded={open}
                    aria-controls={`v2f3-panel-${f.id}`}
                    onClick={() => setActive(f.id)}
                  >
                    <span className="v2f3-trigger__ic" aria-hidden="true">
                      <i className={`fa ${f.icon}`} />
                    </span>
                    <span className="v2f3-trigger__body">
                      <span className="v2f3-trigger__t">
                        {f.title}
                        {f.soon ? <span className="v2f3-soon">bientôt</span> : null}
                      </span>
                      <span className="v2f3-trigger__d">{f.desc}</span>
                    </span>
                    <span className="v2f3-trigger__chev" aria-hidden="true">
                      <i className="fa fa-chevron-down" />
                    </span>
                  </button>
                </h3>
                {open ? (
                  <div className="v2f3-panel" id={`v2f3-panel-${f.id}`}>
                    <div className="v2f3-mock">
                      <Chrome path={f.id} />
                      <div className="v2f3-view">
                        <ActiveScreen key={f.id} />
                      </div>
                    </div>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
