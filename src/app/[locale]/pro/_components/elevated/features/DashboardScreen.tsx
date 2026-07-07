"use client";

import { useTranslations } from "next-intl";

import { dashboardCss } from "./dashboardStyles";

/* ============================================================
   Reproduction illustrative de pro.docagora.com (Tableau de bord) :
   salutation + date, 4 cartes stats, puis 2 colonnes — colonne
   principale (« Aujourd'hui » + « Activité de la semaine » avec
   sparkline, même langage visuel que HeroBoard : classes
   line/area/s0/s1, id de gradient distinct pour éviter tout
   doublon DOM avec le sparkline du hero) et sidebar de mini-widgets.
   Sur mobile la sidebar passe sous la colonne principale (CSS dans
   dashboardStyles.ts). Contenu littéral illustratif (cf.
   FeaturesElevated). Préfixe CSS « hef-dash__ ».
   ============================================================ */

const STATS = [
  { key: "rdv", labelKey: "appScreens.dashboard.statRdv", val: "12", delta: "↑ +3", accent: "teal" },
  { key: "patients", labelKey: "appScreens.dashboard.statPatients", val: "248", delta: "", accent: "cobalt" },
  { key: "waiting", labelKey: "appScreens.status.waiting", val: "0", delta: "", accent: "teal" },
  { key: "presence", labelKey: "appScreens.dashboard.statPresence", val: "96%", delta: "", accent: "cobalt" },
] as const;

const APPTS = [
  { time: "09:00", ini: "SD", name: "Susanna Da Sousa" },
  { time: "10:30", ini: "JP", name: "João P." },
] as const;

const RECENTS = ["Susanna D.", "Clara M.", "Hugo G."];

export default function DashboardScreen() {
  const t = useTranslations("pro");
  return (
    <div className="hef-dash">
      <style>{dashboardCss}</style>

      <div className="hef-dash__greet">
        <strong>{t("hero.board.greeting")}</strong>
        <span>{t("hero.board.date")}</span>
      </div>

      <div className="hef-dash__stats">
        {STATS.map((s) => (
          <div key={s.key} className={`hef-dash__stat is-${s.accent}`}>
            <span className="l">{t(s.labelKey)}</span>
            <b className="v">{s.val}</b>
            {s.delta ? <em className="d">{s.delta}</em> : null}
          </div>
        ))}
      </div>

      <div className="hef-dash__cols">
        <div className="hef-dash__main">
          <div className="hef-dash__card">
            <div className="hef-dash__cardhead">
              <b>{t("appScreens.dashboard.today")}</b>
              <span>{t("appScreens.dashboard.apptCount")}</span>
            </div>
            {APPTS.map((a) => (
              <div className="hef-dash__appt" key={a.time}>
                <span className="t">{a.time}</span>
                <span className="ini" aria-hidden="true">{a.ini}</span>
                <span className="who">{a.name}</span>
                <span className="ok">{t("appScreens.status.confirmed")}</span>
              </div>
            ))}
          </div>

          <div className="hef-dash__card">
            <div className="hef-dash__cardhead">
              <b>{t("appScreens.dashboard.weekActivity")}</b>
              <span className="up">↑ +48%</span>
            </div>
            <svg className="hef-dash__spark" viewBox="0 0 300 60" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="hef-dash-spark-g" x1="0" y1="0" x2="0" y2="1">
                  <stop className="s0" offset="0" />
                  <stop className="s1" offset="1" />
                </linearGradient>
              </defs>
              <path className="area" d="M6,48 C46,46 66,36 108,30 C150,24 176,10 232,10 C266,10 282,9 294,8 L294,60 L6,60 Z" />
              <path className="line" d="M6,48 C46,46 66,36 108,30 C150,24 176,10 232,10 C266,10 282,9 294,8" />
            </svg>
          </div>
        </div>

        <aside className="hef-dash__side">
          <div className="hef-dash__widget">
            <span className="wl">{t("appScreens.dashboard.nextSlot")}</span>
            <span className="wv">15:30</span>
          </div>
          <div className="hef-dash__widget">
            <span className="wl">{t("appScreens.dashboard.remindersToSend")}</span>
            <span className="ws">✓ {t("appScreens.dashboard.allConfirmed")}</span>
          </div>
          <div className="hef-dash__widget">
            <span className="wl">{t("appScreens.dashboard.recentPatients")}</span>
            <div className="hef-dash__chips">
              {RECENTS.map((n) => (
                <span className="hef-dash__chip" key={n}>{n}</span>
              ))}
            </div>
          </div>
          <div className="hef-dash__widget">
            <span className="wl">{t("appScreens.dashboard.noShowMonth")}</span>
            <span className="wv wv--teal">0%</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
