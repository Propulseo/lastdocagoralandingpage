"use client";

import { useState } from "react";

/* ============================================================
   DocAgora — Variante PRO #1 « Painel »
   SaaS clean product-led. Cobalt dominant, navy structurel,
   teal en touche. Le produit (mockup CSS) est la star.
   Tout le style vit dans le <style> ci-dessous, classes pro1-*.
   ============================================================ */

type TabId = "agenda" | "pacientes" | "marcacoes" | "painel";

interface TabDef {
  id: TabId;
  label: string;
  hint: string;
}

const TABS: TabDef[] = [
  { id: "agenda", label: "Agenda", hint: 'Vue hebdomadaire des consultations' },
  { id: "pacientes", label: "Patients", hint: 'Dossier et historique organisés' },
  { id: "marcacoes", label: "Rendez-vous", hint: 'Demandes à confirmer (bientôt)' },
  { id: "painel", label: "Tableau de bord", hint: 'Métriques de votre pratique' },
];

/* ── Sous-composant : barre de fenêtre navigateur fake ── */
function BrowserChrome({ url }: { url: string }) {
  return (
    <div className="pro1-chrome" aria-hidden="true">
      <span className="pro1-dot pro1-dot--r" />
      <span className="pro1-dot pro1-dot--y" />
      <span className="pro1-dot pro1-dot--g" />
      <div className="pro1-urlbar">
        <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="5" y="11" width="14" height="9" rx="2" />
          <path d="M8 11V7a4 4 0 0 1 8 0v4" />
        </svg>
        <span>{url}</span>
      </div>
    </div>
  );
}

/* ── Mini agenda semaine (écran « Agenda ») ── */
const WEEK_DAYS = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
interface Slot {
  day: number;
  top: number;
  h: number;
  tone: "cobalt" | "teal" | "mint";
  who: string;
}
const SLOTS: Slot[] = [
  { day: 0, top: 4, h: 22, tone: "cobalt", who: "M. Costa" },
  { day: 0, top: 40, h: 16, tone: "teal", who: "A. Lopes" },
  { day: 1, top: 14, h: 28, tone: "mint", who: "R. Dias" },
  { day: 2, top: 6, h: 18, tone: "cobalt", who: "S. Nunes" },
  { day: 2, top: 48, h: 20, tone: "teal", who: "P. Sá" },
  { day: 3, top: 22, h: 24, tone: "cobalt", who: "L. Faria" },
  { day: 4, top: 10, h: 16, tone: "mint", who: "J. Melo" },
  { day: 4, top: 44, h: 22, tone: "teal", who: "C. Reis" },
];

function ScreenAgenda() {
  return (
    <div className="pro1-screen">
      <div className="pro1-screen__bar">
        <span className="pro1-screen__title">Mai 2026 &middot; Semaine 22</span>
        <span className="pro1-pill pro1-pill--soft">Aujourd’hui</span>
      </div>
      <div className="pro1-week">
        {WEEK_DAYS.map((d, i) => (
          <div className="pro1-week__col" key={d}>
            <span className="pro1-week__day">{d}</span>
            <div className="pro1-week__track">
              {SLOTS.filter((s) => s.day === i).map((s, j) => (
                <span
                  key={`${d}-${j}`}
                  className={`pro1-evt pro1-evt--${s.tone}`}
                  style={{ top: `${s.top}%`, height: `${s.h}%` }}
                >
                  <span className="pro1-evt__who">{s.who}</span>
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Liste pacientes (écran « Pacientes ») ── */
const PATIENTS = [
  { ini: "MC", name: "Marie Côté", meta: "Cardiologie &middot; 14:30" },
  { ini: "RD", name: "Romain Dupont", meta: "Dermatologie &middot; 15:00" },
  { ini: "SN", name: "Sophie Noël", meta: "Pédiatrie &middot; 15:45" },
  { ini: "LF", name: "Lucas Faure", meta: "Médecine générale &middot; 16:30" },
];

function ScreenPacientes() {
  return (
    <div className="pro1-screen">
      <div className="pro1-screen__bar">
        <span className="pro1-screen__title">Patients du jour</span>
        <span className="pro1-screen__search">
          <i className="fa fa-search" aria-hidden="true" /> Rechercher
        </span>
      </div>
      <ul className="pro1-plist">
        {PATIENTS.map((p) => (
          <li className="pro1-prow" key={p.name}>
            <span className="pro1-avatar">{p.ini}</span>
            <span className="pro1-prow__main">
              <span className="pro1-prow__name">{p.name}</span>
              <span className="pro1-prow__meta" dangerouslySetInnerHTML={{ __html: p.meta }} />
            </span>
            <span className="pro1-chev" aria-hidden="true">
              <i className="fa fa-arrow-right" />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Pedidos de marcação (écran « Marcações ») ── */
const REQUESTS = [
  { name: "Anne Laurent", when: "Jeu 4 juin &middot; matin", state: "novo" },
  { name: "Pierre Sage", when: "Ven 5 juin &middot; après-midi", state: "novo" },
  { name: "Claire Renard", when: "Lun 8 juin &middot; matin", state: "espera" },
];

function ScreenMarcacoes() {
  return (
    <div className="pro1-screen">
      <div className="pro1-screen__bar">
        <span className="pro1-screen__title">Demandes de rendez-vous</span>
        <span className="pro1-pill pro1-pill--breve">bientôt</span>
      </div>
      <ul className="pro1-rlist">
        {REQUESTS.map((r) => (
          <li className="pro1-rrow" key={r.name}>
            <span className="pro1-rrow__main">
              <span className="pro1-rrow__name">{r.name}</span>
              <span className="pro1-rrow__when" dangerouslySetInnerHTML={{ __html: r.when }} />
            </span>
            <span
              className={`pro1-pill ${r.state === "novo" ? "pro1-pill--cobalt" : "pro1-pill--soft"}`}
            >
              {r.state === "novo" ? "Nouveau" : "En attente"}
            </span>
          </li>
        ))}
      </ul>
      <p className="pro1-screen__note">La confirmation en ligne des rendez-vous arrive bientôt.</p>
    </div>
  );
}

/* ── Painel métriques + bar chart (écran « Painel ») ── */
const BARS = [38, 52, 44, 67, 58, 74, 49];
const BAR_LABELS = ["L", "M", "M", "J", "V", "S", "D"];

function ScreenPainel() {
  return (
    <div className="pro1-screen">
      <div className="pro1-screen__bar">
        <span className="pro1-screen__title">Tableau de bord &middot; 7 derniers jours</span>
        <span className="pro1-pill pro1-pill--soft">illustratif</span>
      </div>
      <div className="pro1-stats">
        <div className="pro1-stat">
          <span className="pro1-stat__num">128</span>
          <span className="pro1-stat__lab">Consultations</span>
        </div>
        <div className="pro1-stat">
          <span className="pro1-stat__num pro1-stat__num--teal">94%</span>
          <span className="pro1-stat__lab">Taux de présence*</span>
        </div>
        <div className="pro1-stat">
          <span className="pro1-stat__num pro1-stat__num--mint">4,8</span>
          <span className="pro1-stat__lab">Satisfaction*</span>
        </div>
      </div>
      <div className="pro1-chart" role="img" aria-label="Graphique illustratif des consultations par jour">
        {BARS.map((v, i) => (
          <span className="pro1-chart__col" key={`${BAR_LABELS[i]}-${i}`}>
            <span className="pro1-chart__bar" style={{ height: `${v}%` }} />
            <span className="pro1-chart__lab">{BAR_LABELS[i]}</span>
          </span>
        ))}
      </div>
    </div>
  );
}

const SCREENS: Record<TabId, () => React.ReactElement> = {
  agenda: ScreenAgenda,
  pacientes: ScreenPacientes,
  marcacoes: ScreenMarcacoes,
  painel: ScreenPainel,
};

/* ── Données sections ── */
const BENEFITS = [
  {
    icon: "fa-clock",
    title: "Moins d’administration",
    body: "L’agenda, les dossiers et les contacts au même endroit. Passez plus de temps avec vos patients, moins sur la paperasse.",
  },
  {
    icon: "fa-calendar-check",
    title: "Rendez-vous 24h/24",
    body: "Vos patients demandent un créneau à toute heure, vous confirmez quand vous le souhaitez.",
    breve: true,
  },
  {
    icon: "fa-bell",
    title: "Rappels automatiques",
    body: "Notifications avant chaque consultation pour réduire les absences.",
    breve: true,
  },
  {
    icon: "fa-language",
    title: "Multilingue",
    body: "Interface et communications en Portugais, Français et Anglais, pour tous vos patients.",
  },
];

const REASONS = [
  {
    n: "01",
    title: "Conçu au Portugal",
    body: "Pensé pour la réalité des professionnels de santé, avec un support dans votre langue.",
  },
  {
    n: "02",
    title: "Données au Portugal",
    body: "Les données sont hébergées sur des serveurs au Portugal, en conformité RGPD.",
  },
  {
    n: "03",
    title: "Simple dès le premier jour",
    body: "Aucune installation complexe. Ouvrez votre navigateur et commencez : l’équipe vous accompagne.",
  },
  {
    n: "04",
    title: "Évolue avec vous",
    body: "D’un cabinet individuel à une clinique multi-spécialités, sans changer d’outil.",
  },
];

export default function ProVariant1() {
  const [tab, setTab] = useState<TabId>("agenda");
  const ActiveScreen = SCREENS[tab];

  return (
    <main className="pro1-root">
      <style>{`
        .pro1-root {
          box-sizing: border-box;
          --pro1-cobalt: var(--color-cobalt);
          --pro1-navy: var(--color-navy);
          --pro1-teal: var(--color-teal);
          --pro1-mint: var(--color-mint);
          --pro1-ink: var(--color-dark-1);
          --pro1-light: var(--color-light-1);
          --pro1-light2: var(--color-light-2);
          --pro1-mono: ui-monospace, "SF Mono", Menlo, monospace;
          --pro1-r: 16px;
          --pro1-r-sm: 10px;
          --pro1-shadow: 0 30px 70px -28px rgba(var(--color-navy-rgb), 0.45);
          position: relative;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
          color: var(--pro1-ink);
          background:
            radial-gradient(1100px 620px at 78% -8%, rgba(var(--color-cobalt-rgb), 0.16), transparent 60%),
            radial-gradient(820px 520px at 6% 4%, rgba(var(--color-teal-rgb), 0.12), transparent 60%),
            var(--pro1-light);
          overflow-x: hidden;
          line-height: 1.55;
          -webkit-font-smoothing: antialiased;
        }
        .pro1-root *, .pro1-root *::before, .pro1-root *::after { box-sizing: border-box; }

        .pro1-root::before {
          content: "";
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(var(--color-navy-rgb), 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(var(--color-navy-rgb), 1) 1px, transparent 1px);
          background-size: 46px 46px;
          mask-image: radial-gradient(circle at 50% 18%, #000 0%, transparent 72%);
          -webkit-mask-image: radial-gradient(circle at 50% 18%, #000 0%, transparent 72%);
        }

        .pro1-wrap {
          position: relative;
          z-index: 1;
          max-width: 1180px;
          margin-inline: auto;
          padding-inline: 24px;
        }

        /* ── Reveal cascade ── */
        @keyframes pro1-rise {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .pro1-reveal { opacity: 0; animation: pro1-rise 0.7s cubic-bezier(.2,.7,.2,1) forwards; }
        .pro1-d1 { animation-delay: 60ms; }
        .pro1-d2 { animation-delay: 130ms; }
        .pro1-d3 { animation-delay: 200ms; }
        .pro1-d4 { animation-delay: 270ms; }
        .pro1-d5 { animation-delay: 340ms; }
        .pro1-d6 { animation-delay: 420ms; }
        .pro1-d7 { animation-delay: 500ms; }

        /* ── Header ── */
        .pro1-header {
          position: relative;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          max-width: 1180px;
          margin-inline: auto;
          padding: 22px 24px;
        }
        .pro1-logo {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 800;
          font-size: 20px;
          letter-spacing: -0.02em;
          color: var(--pro1-navy);
          text-transform: none;
        }
        .pro1-logo__mark {
          display: inline-grid;
          place-items: center;
          width: 30px; height: 30px;
          border-radius: 9px;
          color: #fff;
          background: linear-gradient(135deg, var(--pro1-cobalt), var(--pro1-navy));
          box-shadow: 0 6px 16px -6px rgba(var(--color-cobalt-rgb), 0.7);
        }
        .pro1-back {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 13px;
          font-weight: 600;
          color: var(--pro1-navy);
          text-decoration: none;
          padding: 9px 14px;
          border-radius: 999px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.16);
          background: rgba(255,255,255,0.6);
          transition: transform .2s ease, background-color .2s ease, gap .2s ease;
        }
        .pro1-back:hover { background: #fff; transform: translateY(-1px); gap: 11px; color: var(--pro1-cobalt); }

        /* ── Hero ── */
        .pro1-hero { padding: 30px 0 70px; }
        .pro1-hero__grid {
          display: grid;
          grid-template-columns: 1.05fr 1.15fr;
          gap: 56px;
          align-items: center;
        }
        .pro1-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: var(--pro1-mono);
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--pro1-cobalt);
          padding: 7px 13px;
          border-radius: 999px;
          background: rgba(var(--color-cobalt-rgb), 0.1);
          border: 1px solid rgba(var(--color-cobalt-rgb), 0.22);
        }
        .pro1-eyebrow__pulse {
          width: 7px; height: 7px; border-radius: 50%;
          background: var(--pro1-teal);
          box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0.6);
          animation: pro1-pulse 2.4s ease-out infinite;
        }
        @keyframes pro1-pulse {
          0% { box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0.55); }
          70% { box-shadow: 0 0 0 9px rgba(var(--color-teal-rgb), 0); }
          100% { box-shadow: 0 0 0 0 rgba(var(--color-teal-rgb), 0); }
        }
        .pro1-h1 {
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 800;
          font-size: clamp(34px, 5.2vw, 60px);
          line-height: 1.04;
          letter-spacing: -0.03em;
          color: var(--pro1-navy);
          margin: 20px 0 0;
          text-transform: none;
        }
        .pro1-h1 em {
          font-style: normal;
          background: linear-gradient(100deg, var(--pro1-cobalt), var(--pro1-teal));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .pro1-lead {
          font-size: clamp(16px, 1.6vw, 19px);
          color: rgba(var(--color-dark-1-rgb), 0.7);
          margin: 18px 0 0;
          max-width: 30ch;
          font-weight: 500;
          line-height: 1.6;
        }
        .pro1-cta-row { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 30px; }
        .pro1-btn {
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
          transition: transform .2s ease, box-shadow .2s ease, background-color .2s ease, gap .2s ease;
          text-transform: none;
          line-height: 1;
        }
        .pro1-btn--primary {
          color: #fff;
          background: linear-gradient(135deg, var(--pro1-cobalt), var(--pro1-navy));
          box-shadow: 0 16px 32px -14px rgba(var(--color-cobalt-rgb), 0.85);
        }
        .pro1-btn--primary:hover { transform: translateY(-2px); gap: 13px; color: #fff; }
        .pro1-btn--ghost {
          color: var(--pro1-navy);
          background: rgba(255,255,255,0.7);
          border-color: rgba(var(--color-navy-rgb), 0.2);
        }
        .pro1-btn--ghost:hover { background: #fff; transform: translateY(-2px); color: var(--pro1-navy); }
        .pro1-badges { display: flex; flex-wrap: wrap; gap: 18px; margin-top: 28px; }
        .pro1-badge {
          display: inline-flex; align-items: center; gap: 8px;
          font-size: 13px; font-weight: 600;
          color: rgba(var(--color-navy-rgb), 0.78);
        }
        .pro1-badge i { color: var(--pro1-teal); font-size: 14px; }

        /* ── Mockup produit (élément wouah) ── */
        .pro1-mock {
          position: relative;
          border-radius: var(--pro1-r);
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          box-shadow: var(--pro1-shadow);
          overflow: hidden;
          animation: pro1-float 7s ease-in-out infinite;
        }
        @keyframes pro1-float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }
        .pro1-mock::after {
          content: "";
          position: absolute; inset: 0;
          pointer-events: none;
          background: linear-gradient(160deg, rgba(var(--color-teal-rgb), 0.06), transparent 40%);
        }
        .pro1-chrome {
          display: flex; align-items: center; gap: 8px;
          padding: 12px 14px;
          background: var(--pro1-light2);
          border-bottom: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .pro1-dot { width: 11px; height: 11px; border-radius: 50%; flex-shrink: 0; }
        .pro1-dot--r { background: #ff5f57; }
        .pro1-dot--y { background: #febc2e; }
        .pro1-dot--g { background: #28c840; }
        .pro1-urlbar {
          flex: 1;
          display: inline-flex; align-items: center; gap: 8px;
          margin-left: 8px;
          padding: 6px 12px;
          border-radius: 8px;
          background: #fff;
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          font-family: var(--pro1-mono);
          font-size: 12px;
          color: rgba(var(--color-dark-1-rgb), 0.55);
        }
        .pro1-urlbar svg { color: var(--pro1-teal); flex-shrink: 0; }

        .pro1-mock__body { display: grid; grid-template-columns: 168px 1fr; min-height: 360px; }
        .pro1-side {
          background: var(--pro1-navy);
          padding: 18px 14px;
          display: flex; flex-direction: column; gap: 6px;
        }
        .pro1-side__brand {
          color: #fff; font-weight: 800; font-size: 14px;
          letter-spacing: -0.02em; padding: 4px 8px 14px;
        }
        .pro1-tab {
          display: flex; align-items: center; gap: 10px;
          width: 100%;
          padding: 9px 11px;
          border-radius: 9px;
          border: 0;
          background: transparent;
          color: rgba(255,255,255,0.62);
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 600; font-size: 13px;
          text-align: left;
          cursor: pointer;
          transition: background-color .2s ease, color .2s ease;
        }
        .pro1-tab:hover { color: #fff; background: rgba(255,255,255,0.08); }
        .pro1-tab.is-active {
          color: #fff;
          background: linear-gradient(120deg, rgba(var(--color-cobalt-rgb), 0.95), rgba(var(--color-cobalt-rgb), 0.55));
          box-shadow: inset 3px 0 0 var(--pro1-teal);
        }
        .pro1-tab__ic {
          width: 8px; height: 8px; border-radius: 3px;
          background: currentColor; opacity: 0.85; flex-shrink: 0;
        }
        .pro1-side__hint {
          margin-top: auto;
          font-size: 11px;
          color: rgba(255,255,255,0.4);
          line-height: 1.45;
          padding: 10px 8px 2px;
          border-top: 1px solid rgba(255,255,255,0.1);
        }
        .pro1-mock__view { padding: 18px; background: #fff; }

        /* screen reveal */
        @keyframes pro1-screen-in {
          from { opacity: 0; transform: translateY(8px) scale(.992); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .pro1-screen { animation: pro1-screen-in .4s ease forwards; }
        .pro1-screen__bar {
          display: flex; align-items: center; justify-content: space-between;
          gap: 10px; margin-bottom: 14px;
        }
        .pro1-screen__title { font-weight: 700; font-size: 14px; color: var(--pro1-navy); }
        .pro1-screen__search {
          font-size: 11px; color: rgba(var(--color-dark-1-rgb), 0.5);
          display: inline-flex; align-items: center; gap: 6px;
          padding: 5px 10px; border-radius: 7px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.12);
        }
        .pro1-screen__note {
          margin: 12px 0 0; font-size: 11px;
          color: rgba(var(--color-dark-1-rgb), 0.5);
          font-style: italic;
        }
        .pro1-pill {
          font-family: var(--pro1-mono);
          font-size: 10px; letter-spacing: 0.05em;
          padding: 4px 9px; border-radius: 999px; font-weight: 600;
          white-space: nowrap;
        }
        .pro1-pill--soft { background: rgba(var(--color-navy-rgb), 0.08); color: var(--pro1-navy); }
        .pro1-pill--cobalt { background: rgba(var(--color-cobalt-rgb), 0.15); color: var(--pro1-cobalt); }
        .pro1-pill--breve { background: rgba(var(--color-teal-rgb), 0.18); color: var(--pro1-mint); }

        /* week agenda */
        .pro1-week { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; }
        .pro1-week__col { display: flex; flex-direction: column; gap: 8px; }
        .pro1-week__day {
          font-family: var(--pro1-mono); font-size: 10px; text-transform: uppercase;
          letter-spacing: 0.08em; color: rgba(var(--color-dark-1-rgb), 0.45);
          text-align: center;
        }
        .pro1-week__track {
          position: relative;
          height: 250px;
          border-radius: 9px;
          background: var(--pro1-light2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.06);
        }
        .pro1-evt {
          position: absolute; left: 5px; right: 5px;
          border-radius: 6px;
          padding: 4px 6px;
          font-size: 9px; font-weight: 600; color: #fff;
          overflow: hidden;
          box-shadow: 0 4px 10px -6px rgba(var(--color-navy-rgb), 0.5);
        }
        .pro1-evt__who { display: block; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; }
        .pro1-evt--cobalt { background: linear-gradient(135deg, var(--pro1-cobalt), var(--pro1-navy)); }
        .pro1-evt--teal { background: linear-gradient(135deg, var(--pro1-teal), var(--pro1-mint)); color: var(--pro1-ink); }
        .pro1-evt--mint { background: linear-gradient(135deg, var(--pro1-mint), var(--pro1-cobalt)); }

        /* patient list */
        .pro1-plist, .pro1-rlist { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
        .pro1-prow {
          display: flex; align-items: center; gap: 12px;
          padding: 10px 12px; border-radius: 10px;
          background: var(--pro1-light2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.06);
          transition: transform .2s ease;
        }
        .pro1-prow:hover { transform: translateX(3px); }
        .pro1-avatar {
          width: 34px; height: 34px; border-radius: 9px; flex-shrink: 0;
          display: grid; place-items: center;
          font-size: 11px; font-weight: 800; color: #fff;
          background: linear-gradient(135deg, var(--pro1-cobalt), var(--pro1-navy));
        }
        .pro1-prow__main { display: flex; flex-direction: column; gap: 2px; flex: 1; }
        .pro1-prow__name { font-weight: 700; font-size: 13px; color: var(--pro1-navy); }
        .pro1-prow__meta { font-size: 11px; color: rgba(var(--color-dark-1-rgb), 0.55); }
        .pro1-chev { color: var(--pro1-cobalt); font-size: 11px; }

        /* requests */
        .pro1-rrow {
          display: flex; align-items: center; justify-content: space-between; gap: 12px;
          padding: 11px 12px; border-radius: 10px;
          background: var(--pro1-light2);
          border: 1px dashed rgba(var(--color-cobalt-rgb), 0.3);
        }
        .pro1-rrow__main { display: flex; flex-direction: column; gap: 2px; }
        .pro1-rrow__name { font-weight: 700; font-size: 13px; color: var(--pro1-navy); }
        .pro1-rrow__when { font-size: 11px; color: rgba(var(--color-dark-1-rgb), 0.55); }

        /* painel */
        .pro1-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 14px; }
        .pro1-stat {
          padding: 12px; border-radius: 11px;
          background: var(--pro1-light2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.06);
          display: flex; flex-direction: column; gap: 2px;
        }
        .pro1-stat__num { font-weight: 800; font-size: 22px; color: var(--pro1-cobalt); letter-spacing: -0.02em; }
        .pro1-stat__num--teal { color: var(--pro1-mint); }
        .pro1-stat__num--mint { color: var(--pro1-navy); }
        .pro1-stat__lab { font-size: 10px; color: rgba(var(--color-dark-1-rgb), 0.55); font-weight: 600; }
        .pro1-chart {
          display: grid; grid-template-columns: repeat(7, 1fr); gap: 10px;
          align-items: end; height: 120px;
          padding: 12px; border-radius: 11px;
          background: var(--pro1-light2);
          border: 1px solid rgba(var(--color-navy-rgb), 0.06);
        }
        .pro1-chart__col { display: flex; flex-direction: column; align-items: center; gap: 6px; height: 100%; justify-content: flex-end; }
        .pro1-chart__bar {
          width: 100%; max-width: 18px; border-radius: 5px 5px 2px 2px;
          background: linear-gradient(180deg, var(--pro1-cobalt), rgba(var(--color-teal-rgb), 0.8));
          transform-origin: bottom;
          animation: pro1-grow .7s cubic-bezier(.2,.7,.2,1) both;
        }
        @keyframes pro1-grow { from { transform: scaleY(0); } to { transform: scaleY(1); } }
        .pro1-chart__lab { font-family: var(--pro1-mono); font-size: 9px; color: rgba(var(--color-dark-1-rgb), 0.45); }

        /* ── Section générique ── */
        .pro1-section { padding: 72px 0; position: relative; }
        .pro1-section--alt { background: linear-gradient(180deg, transparent, rgba(var(--color-cobalt-rgb), 0.04)); }
        .pro1-kicker {
          font-family: var(--pro1-mono); font-size: 12px; letter-spacing: 0.14em;
          text-transform: uppercase; color: var(--pro1-cobalt); font-weight: 600;
        }
        .pro1-h2 {
          font-family: var(--font-montserrat), sans-serif;
          font-weight: 800;
          font-size: clamp(26px, 3.4vw, 40px);
          line-height: 1.1;
          letter-spacing: -0.025em;
          color: var(--pro1-navy);
          margin: 10px 0 0;
          text-transform: none;
          max-width: 22ch;
        }
        .pro1-sub {
          font-size: 16px; color: rgba(var(--color-dark-1-rgb), 0.65);
          margin: 12px 0 0; max-width: 56ch; font-weight: 500;
        }
        .pro1-head--center { text-align: center; }
        .pro1-head--center .pro1-h2, .pro1-head--center .pro1-sub { margin-inline: auto; }

        /* ── Section funcionalidades (tabs + mockup) ── */
        .pro1-feat { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: 44px; align-items: center; margin-top: 40px; }
        .pro1-featlist { display: flex; flex-direction: column; gap: 10px; }
        .pro1-feattab {
          display: flex; align-items: flex-start; gap: 14px;
          width: 100%; text-align: left;
          padding: 16px 18px; border-radius: 14px;
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          background: rgba(255,255,255,0.66);
          cursor: pointer;
          font-family: var(--font-montserrat), sans-serif;
          transition: transform .2s ease, border-color .2s ease, background-color .2s ease, box-shadow .2s ease;
        }
        .pro1-feattab:hover { transform: translateX(3px); background: #fff; }
        .pro1-feattab.is-active {
          border-color: rgba(var(--color-cobalt-rgb), 0.5);
          background: #fff;
          box-shadow: 0 18px 40px -26px rgba(var(--color-cobalt-rgb), 0.7);
        }
        .pro1-feattab__n {
          font-family: var(--pro1-mono); font-size: 12px; font-weight: 700;
          color: var(--pro1-cobalt);
          width: 30px; height: 30px; flex-shrink: 0;
          display: grid; place-items: center; border-radius: 8px;
          background: rgba(var(--color-cobalt-rgb), 0.1);
        }
        .pro1-feattab.is-active .pro1-feattab__n { background: var(--pro1-cobalt); color: #fff; }
        .pro1-feattab__t { font-weight: 700; font-size: 16px; color: var(--pro1-navy); }
        .pro1-feattab__d { font-size: 13px; color: rgba(var(--color-dark-1-rgb), 0.6); margin-top: 2px; }
        .pro1-feat__mock { position: relative; }
        .pro1-feat__mock .pro1-mock { animation: none; }

        /* ── Benefits cards ── */
        .pro1-grid4 {
          display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; margin-top: 44px;
        }
        .pro1-card {
          position: relative;
          padding: 26px 22px;
          border-radius: var(--pro1-r);
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          transition: transform .25s ease, box-shadow .25s ease, border-color .25s ease;
          overflow: hidden;
        }
        .pro1-card::before {
          content: ""; position: absolute; left: 0; top: 0; height: 3px; width: 100%;
          background: linear-gradient(90deg, var(--pro1-cobalt), var(--pro1-teal));
          transform: scaleX(0); transform-origin: left; transition: transform .3s ease;
        }
        .pro1-card:hover { transform: translateY(-6px); box-shadow: 0 26px 50px -30px rgba(var(--color-navy-rgb), 0.5); border-color: rgba(var(--color-cobalt-rgb), 0.35); }
        .pro1-card:hover::before { transform: scaleX(1); }
        .pro1-card__ic {
          width: 46px; height: 46px; border-radius: 13px;
          display: grid; place-items: center;
          color: #fff; font-size: 18px;
          background: linear-gradient(135deg, var(--pro1-cobalt), var(--pro1-navy));
          box-shadow: 0 12px 26px -14px rgba(var(--color-cobalt-rgb), 0.85);
        }
        .pro1-card__t {
          font-weight: 700; font-size: 17px; color: var(--pro1-navy);
          margin: 18px 0 0; display: flex; align-items: center; gap: 8px; flex-wrap: wrap;
          text-transform: none;
        }
        .pro1-card__b { font-size: 14px; color: rgba(var(--color-dark-1-rgb), 0.65); margin: 9px 0 0; line-height: 1.6; }
        .pro1-tag-breve {
          font-family: var(--pro1-mono); font-size: 9px; letter-spacing: 0.05em;
          padding: 3px 7px; border-radius: 999px; font-weight: 700;
          background: rgba(var(--color-teal-rgb), 0.18); color: var(--pro1-mint);
        }

        /* ── Reasons ── */
        .pro1-reasons { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 44px; }
        .pro1-reason {
          display: flex; gap: 18px; align-items: flex-start;
          padding: 26px;
          border-radius: var(--pro1-r);
          background: rgba(255,255,255,0.7);
          border: 1px solid rgba(var(--color-navy-rgb), 0.1);
          transition: transform .25s ease, box-shadow .25s ease;
        }
        .pro1-reason:hover { transform: translateY(-4px); box-shadow: 0 22px 44px -30px rgba(var(--color-navy-rgb), 0.45); }
        .pro1-reason__n {
          font-family: var(--pro1-mono); font-weight: 700; font-size: 16px;
          color: var(--pro1-cobalt);
          width: 50px; height: 50px; flex-shrink: 0;
          display: grid; place-items: center; border-radius: 13px;
          border: 1px solid rgba(var(--color-cobalt-rgb), 0.3);
          background: rgba(var(--color-cobalt-rgb), 0.07);
        }
        .pro1-reason__t { font-weight: 700; font-size: 18px; color: var(--pro1-navy); text-transform: none; margin: 0; }
        .pro1-reason__b { font-size: 14px; color: rgba(var(--color-dark-1-rgb), 0.65); margin: 7px 0 0; line-height: 1.6; }

        /* ── Acesso antecipado ── */
        .pro1-early {
          margin-top: 12px;
          border-radius: 22px;
          padding: 48px;
          background:
            radial-gradient(600px 360px at 90% 10%, rgba(var(--color-teal-rgb), 0.22), transparent 60%),
            linear-gradient(135deg, var(--pro1-navy), var(--color-dark-1));
          color: #fff;
          display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 40px; align-items: center;
          box-shadow: var(--pro1-shadow);
          position: relative; overflow: hidden;
        }
        .pro1-early__title { font-family: var(--font-montserrat), sans-serif; font-weight: 800; font-size: clamp(24px, 3vw, 34px); letter-spacing: -0.025em; margin: 10px 0 0; color: #fff; text-transform: none; line-height: 1.1; }
        .pro1-early__sub { color: rgba(255,255,255,0.72); font-size: 15px; margin: 14px 0 0; max-width: 42ch; }
        .pro1-early .pro1-kicker { color: var(--pro1-teal); }
        .pro1-form { display: flex; flex-direction: column; gap: 12px; }
        .pro1-field {
          display: flex; gap: 10px; flex-wrap: wrap;
        }
        .pro1-input {
          flex: 1; min-width: 0;
          min-height: 50px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.2);
          background: rgba(255,255,255,0.08);
          color: #fff;
          font-family: var(--font-montserrat), sans-serif;
          font-size: 15px;
        }
        .pro1-input::placeholder { color: rgba(255,255,255,0.5); }
        .pro1-input:focus-visible { outline: 2px solid var(--pro1-teal); outline-offset: 2px; }
        .pro1-btn--teal {
          background: var(--pro1-teal); color: var(--pro1-ink);
          box-shadow: 0 16px 32px -16px rgba(var(--color-teal-rgb), 0.9);
        }
        .pro1-btn--teal:hover { transform: translateY(-2px); gap: 13px; background: var(--pro1-mint); color: var(--pro1-ink); }
        .pro1-early__note { font-size: 12px; color: rgba(255,255,255,0.55); margin: 4px 0 0; }
        .pro1-early__ok { font-size: 14px; color: var(--pro1-teal); font-weight: 600; margin: 0; display: inline-flex; align-items: center; gap: 8px; }

        /* ── CTA final + footer ── */
        .pro1-foot {
          margin-top: 80px;
          background: linear-gradient(180deg, var(--color-dark-1), var(--color-dark-2));
          color: #fff;
          position: relative;
          overflow: hidden;
        }
        .pro1-foot::before {
          content: ""; position: absolute; inset: 0; opacity: 0.5;
          background: radial-gradient(700px 360px at 50% 0%, rgba(var(--color-cobalt-rgb), 0.28), transparent 60%);
          pointer-events: none;
        }
        .pro1-cta {
          position: relative; z-index: 1;
          text-align: center; padding: 80px 24px 56px;
          max-width: 760px; margin-inline: auto;
        }
        .pro1-cta__h { font-family: var(--font-montserrat), sans-serif; font-weight: 800; font-size: clamp(28px, 4vw, 46px); letter-spacing: -0.03em; line-height: 1.08; color: #fff; margin: 14px 0 0; text-transform: none; }
        .pro1-cta__p { color: rgba(255,255,255,0.7); font-size: 16px; margin: 16px auto 0; max-width: 50ch; }
        .pro1-cta__row { display: flex; flex-wrap: wrap; gap: 14px; justify-content: center; margin-top: 30px; }
        .pro1-footbar {
          position: relative; z-index: 1;
          border-top: 1px solid rgba(255,255,255,0.1);
          max-width: 1180px; margin-inline: auto;
          padding: 26px 24px;
          display: flex; align-items: center; justify-content: space-between; gap: 16px; flex-wrap: wrap;
        }
        .pro1-footbar__brand { display: inline-flex; align-items: center; gap: 10px; font-weight: 800; color: #fff; font-size: 17px; }
        .pro1-footbar__links { display: flex; gap: 22px; flex-wrap: wrap; }
        .pro1-footbar__links a { color: rgba(255,255,255,0.55); text-decoration: none; font-size: 13px; font-weight: 500; transition: color .2s ease; }
        .pro1-footbar__links a:hover { color: var(--pro1-teal); }
        .pro1-footbar__copy { color: rgba(255,255,255,0.4); font-size: 12px; width: 100%; }

        /* ── Responsive ── */
        @media (max-width: 980px) {
          .pro1-hero__grid { grid-template-columns: 1fr; gap: 40px; }
          .pro1-feat { grid-template-columns: 1fr; gap: 30px; }
          .pro1-feat__mock { order: -1; }
          .pro1-grid4 { grid-template-columns: repeat(2, 1fr); }
          .pro1-reasons { grid-template-columns: 1fr; }
          .pro1-early { grid-template-columns: 1fr; padding: 36px; }
          .pro1-lead { max-width: none; }
        }
        @media (max-width: 560px) {
          .pro1-grid4 { grid-template-columns: 1fr; }
          .pro1-mock__body { grid-template-columns: 1fr; }
          .pro1-side { flex-direction: row; flex-wrap: wrap; gap: 6px; }
          .pro1-side__brand { width: 100%; padding-bottom: 6px; }
          .pro1-tab { width: auto; flex: 1 1 40%; }
          .pro1-side__hint { display: none; }
          .pro1-header { padding: 16px; }
          .pro1-stats { grid-template-columns: 1fr; }
          .pro1-week__track { height: 180px; }
        }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .pro1-root *, .pro1-root *::before, .pro1-root *::after {
            opacity: 1 !important;
            transform: none !important;
            animation: none !important;
            transition: none !important;
          }
        }
      `}</style>

      {/* ── Header ── */}
      <header className="pro1-header pro1-reveal pro1-d1">
        <span className="pro1-logo">
          <span className="pro1-logo__mark" aria-hidden="true">D</span>
          DocAgora
        </span>
        <a className="pro1-back" href="/variants">
          <i className="fa fa-arrow-right" aria-hidden="true" style={{ transform: "rotate(180deg)" }} />
          Variantes
        </a>
      </header>

      {/* ── Hero ── */}
      <section className="pro1-hero">
        <div className="pro1-wrap">
          <div className="pro1-hero__grid">
            <div>
              <span className="pro1-eyebrow pro1-reveal pro1-d1">
                <span className="pro1-eyebrow__pulse" aria-hidden="true" />
                Logiciel pour professionnels de santé
              </span>
              <h1 className="pro1-h1 pro1-reveal pro1-d2">
                La suite <em>tout-en-un</em> qui réinvente votre pratique
              </h1>
              <p className="pro1-lead pro1-reveal pro1-d3">
                Agenda, patients et métriques dans un tableau de bord clair
                &mdash; conçu pour votre quotidien.
              </p>
              <div className="pro1-cta-row pro1-reveal pro1-d4">
                <a className="pro1-btn pro1-btn--primary" href="#acesso">
                  Commencer
                  <i className="fa fa-arrow-right" aria-hidden="true" />
                </a>
                <a className="pro1-btn pro1-btn--ghost" href="#acesso">
                  Parler à un conseiller
                </a>
              </div>
              <div className="pro1-badges pro1-reveal pro1-d5">
                <span className="pro1-badge">
                  <i className="fa fa-shield-alt" aria-hidden="true" /> RGPD
                </span>
                <span className="pro1-badge">
                  <i className="fa fa-lock" aria-hidden="true" /> Données au Portugal
                </span>
                <span className="pro1-badge">
                  <i className="fa fa-globe-europe" aria-hidden="true" /> Conçu au Portugal
                </span>
              </div>
            </div>

            {/* ── Mockup produit (élément wouah) ── */}
            <div className="pro1-mock pro1-reveal pro1-d4">
              <BrowserChrome url="app.docagora.com/painel" />
              <div className="pro1-mock__body">
                <nav className="pro1-side" aria-label="Navigation du produit (démonstration)">
                  <span className="pro1-side__brand">DocAgora</span>
                  {TABS.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`pro1-tab${tab === t.id ? " is-active" : ""}`}
                      onClick={() => setTab(t.id)}
                      aria-pressed={tab === t.id}
                    >
                      <span className="pro1-tab__ic" aria-hidden="true" />
                      {t.label}
                    </button>
                  ))}
                  <span className="pro1-side__hint">{TABS.find((t) => t.id === tab)?.hint}</span>
                </nav>
                <div className="pro1-mock__view">
                  <ActiveScreen key={tab} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Funcionalidades (tabs partagés avec le mockup) ── */}
      <section className="pro1-section pro1-section--alt" id="funcionalidades">
        <div className="pro1-wrap">
          <div className="pro1-head--center">
            <span className="pro1-kicker">Fonctionnalités</span>
            <h2 className="pro1-h2">Un tableau de bord, tout ce qu’il vous faut</h2>
            <p className="pro1-sub">
              Sélectionnez un onglet pour voir l’écran correspondant &mdash; celui que vous utilisez au quotidien.
            </p>
          </div>
          <div className="pro1-feat">
            <div className="pro1-featlist">
              {TABS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  className={`pro1-feattab${tab === t.id ? " is-active" : ""}`}
                  onClick={() => setTab(t.id)}
                  aria-pressed={tab === t.id}
                >
                  <span className="pro1-feattab__n">{String(i + 1).padStart(2, "0")}</span>
                  <span>
                    <span className="pro1-feattab__t">{t.label}</span>
                    <span className="pro1-feattab__d">{t.hint}</span>
                  </span>
                </button>
              ))}
            </div>
            <div className="pro1-feat__mock">
              <div className="pro1-mock">
                <BrowserChrome url={`app.docagora.com/${tab}`} />
                <div className="pro1-mock__view" style={{ minHeight: 320 }}>
                  <ActiveScreen key={`feat-${tab}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Benefícios ── */}
      <section className="pro1-section" id="beneficios">
        <div className="pro1-wrap">
          <div className="pro1-head--center">
            <span className="pro1-kicker">Bénéfices</span>
            <h2 className="pro1-h2">Moins de tâches, plus de temps pour vos patients</h2>
          </div>
          <div className="pro1-grid4">
            {BENEFITS.map((b) => (
              <article className="pro1-card" key={b.title}>
                <span className="pro1-card__ic" aria-hidden="true">
                  <i className={`fa ${b.icon}`} />
                </span>
                <h3 className="pro1-card__t">
                  {b.title}
                  {b.breve ? <span className="pro1-tag-breve">bientôt</span> : null}
                </h3>
                <p className="pro1-card__b">{b.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Porquê DocAgora ── */}
      <section className="pro1-section pro1-section--alt" id="porque">
        <div className="pro1-wrap">
          <div className="pro1-head--center">
            <span className="pro1-kicker">Pourquoi DocAgora</span>
            <h2 className="pro1-h2">Construit pour la santé, ancré au Portugal</h2>
          </div>
          <div className="pro1-reasons">
            {REASONS.map((r) => (
              <article className="pro1-reason" key={r.n}>
                <span className="pro1-reason__n" aria-hidden="true">{r.n}</span>
                <div>
                  <h3 className="pro1-reason__t">{r.title}</h3>
                  <p className="pro1-reason__b">{r.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Acesso antecipado ── */}
      <section className="pro1-section" id="acesso">
        <div className="pro1-wrap">
          <EarlyAccess />
        </div>
      </section>

      {/* ── CTA final + footer ── */}
      <footer className="pro1-foot">
        <div className="pro1-cta">
          <span className="pro1-kicker" style={{ color: "var(--color-teal)" }}>Commencez aujourd’hui</span>
          <h2 className="pro1-cta__h">Prêt à réinventer votre pratique&nbsp;?</h2>
          <p className="pro1-cta__p">
            Rejoignez les professionnels qui préparent l’avenir de leur cabinet avec DocAgora.
            La confirmation de rendez-vous en ligne arrive bientôt.
          </p>
          <div className="pro1-cta__row">
            <a className="pro1-btn pro1-btn--teal" href="#acesso">
              Demander l’accès anticipé
              <i className="fa fa-arrow-right" aria-hidden="true" />
            </a>
            <a className="pro1-btn pro1-btn--ghost" href="#acesso" style={{ color: "#fff", background: "rgba(255,255,255,0.08)", borderColor: "rgba(255,255,255,0.25)" }}>
              Parler à un conseiller
            </a>
          </div>
        </div>
        <div className="pro1-footbar">
          <span className="pro1-footbar__brand">
            <span className="pro1-logo__mark" aria-hidden="true">D</span>
            DocAgora
          </span>
          <nav className="pro1-footbar__links" aria-label="Liens du pied de page">
            <a href="#funcionalidades">Fonctionnalités</a>
            <a href="#beneficios">Bénéfices</a>
            <a href="#porque">Pourquoi</a>
            <a href="#acesso">Accès anticipé</a>
            <a href="/variants">Variantes</a>
          </nav>
          <span className="pro1-footbar__copy">
            &copy; 2026 DocAgora &middot; Logiciel pour professionnels de santé. Données hébergées dans l’UE, conformité RGPD.
          </span>
        </div>
      </footer>
    </main>
  );
}

/* ── Sous-composant local : formulaire acesso antecipado ── */
function EarlyAccess() {
  const [done, setDone] = useState(false);

  return (
    <div className="pro1-early">
      <div>
        <span className="pro1-kicker">Accès anticipé</span>
        <h2 className="pro1-early__title">Soyez parmi les premiers à découvrir DocAgora</h2>
        <p className="pro1-early__sub">
          Laissez votre email et nous vous contactons pour une démonstration sans engagement.
          Sans paiement en ligne, sans téléconsultation &mdash; uniquement l’outil adapté à votre pratique.
        </p>
        <p className="pro1-early__note">
          *Les chiffres affichés dans les écrans sont illustratifs.
        </p>
      </div>
      <form
        className="pro1-form"
        onSubmit={(e) => {
          e.preventDefault();
          setDone(true);
        }}
      >
        <div className="pro1-field">
          <label htmlFor="pro1-email" className="pro1-input" style={{ display: "none" }}>Email</label>
          <input
            id="pro1-email"
            className="pro1-input"
            type="email"
            required
            placeholder="votre.email@clinique.fr"
            aria-label="Votre email professionnel"
          />
          <button className="pro1-btn pro1-btn--teal" type="submit">
            Demander l’accès
            <i className="fa fa-arrow-right" aria-hidden="true" />
          </button>
        </div>
        {done ? (
          <p className="pro1-early__ok">
            <i className="fa fa-check-circle" aria-hidden="true" />
            Merci &mdash; nous vous recontactons très prochainement.
          </p>
        ) : (
          <p className="pro1-early__note">Réponse habituelle sous quelques jours ouvrés.</p>
        )}
      </form>
    </div>
  );
}
