"use client";

/* ============================================================
   Reproduction illustrative de pro.docagora.com/agenda : sous-barre
   Jour/Semaine/Mois, légende des statuts, grille 5 jours avec
   blocs de RDV positionnés (top/height en %). Contenu littéral
   illustratif (cf. FeaturesElevated) : noms, heures, statuts ne
   passent pas par l'i18n. Préfixe CSS « hef-agenda__ ».
   ============================================================ */

import { useTranslations } from "next-intl";

type Status = "confirmed" | "waiting" | "done" | "absent";

const DAYS = ["Lun 29", "Mar 30", "Mer 1", "Jeu 2", "Ven 3"];

const LEGEND: Status[] = ["confirmed", "waiting", "done", "absent"];

const EVENTS: { day: number; top: number; h: number; status: Status; time: string; name: string }[] = [
  { day: 0, top: 10, h: 18, status: "confirmed", time: "09:30", name: "Clara M." },
  { day: 1, top: 24, h: 16, status: "confirmed", time: "11:00", name: "Hugo G." },
  { day: 2, top: 46, h: 18, status: "done", time: "14:00", name: "Ana M." },
  { day: 3, top: 60, h: 16, status: "absent", time: "16:00", name: "Marta" },
  { day: 4, top: 6, h: 20, status: "confirmed", time: "09:00", name: "Susanna Da Sousa" },
  { day: 4, top: 32, h: 18, status: "waiting", time: "10:30", name: "João P." },
];

export default function AgendaScreen() {
  const t = useTranslations("pro");
  return (
    <div className="hef-agenda">
      <style>{`
        .hef-agenda__toolbar { display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 12px; flex-wrap: wrap; }
        .hef-agenda__views { display: inline-flex; gap: 6px; }
        .hef-agenda__view { font-size: 11.5px; font-weight: 700; padding: 5px 12px; border-radius: 999px;
          color: var(--v2-text-muted); background: var(--v2-surface); border: 1px solid var(--v2-border); }
        .hef-agenda__view.is-active { color: var(--v2-accent-ink); background: var(--v2-accent); border-color: transparent; }
        .hef-agenda__week { font-size: 11.5px; font-weight: 600; color: var(--v2-text-muted); }
        .hef-agenda__legend { list-style: none; display: flex; flex-wrap: wrap; gap: 14px;
          margin: 0 0 16px; padding: 0; }
        .hef-agenda__legend-item { display: inline-flex; align-items: center; gap: 6px;
          font-size: 11px; font-weight: 600; color: var(--v2-text-muted); }
        .hef-agenda__legend-item i { width: 8px; height: 8px; border-radius: 50%; display: inline-block; flex-shrink: 0; }
        .hef-agenda__legend-item.is-confirmed i { background: var(--v2-accent); }
        .hef-agenda__legend-item.is-waiting i { background: var(--v2-accent-2); }
        .hef-agenda__legend-item.is-done i { background: color-mix(in srgb, var(--v2-text) 45%, transparent); }
        .hef-agenda__legend-item.is-absent i {
          background: transparent; border: 1.5px solid color-mix(in srgb, var(--v2-text-muted) 70%, transparent);
        }
        .hef-agenda__grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 10px; }
        .hef-agenda__col { display: flex; flex-direction: column; gap: 8px; min-width: 0; }
        .hef-agenda__day { font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.06em; text-align: center; color: var(--v2-text-muted); }
        .hef-agenda__track { position: relative; height: 230px; border-radius: 10px;
          background: var(--v2-surface); border: 1px solid var(--v2-border); }
        .hef-agenda__evt { position: absolute; left: 4px; right: 4px; border-radius: 7px;
          padding: 5px 6px; font-size: 9.5px; font-weight: 700; line-height: 1.25; overflow: hidden; }
        .hef-agenda__evt span { display: block; }
        .hef-agenda__evt.is-confirmed { background: var(--v2-accent); color: var(--v2-accent-ink); }
        .hef-agenda__evt.is-waiting { background: var(--v2-accent-2); color: var(--v2-accent-ink); }
        .hef-agenda__evt.is-done {
          background: color-mix(in srgb, var(--v2-text) 35%, transparent); color: var(--v2-text);
        }
        .hef-agenda__evt.is-absent {
          background: transparent; color: var(--v2-text-muted);
          border: 1.5px dashed color-mix(in srgb, var(--v2-text-muted) 55%, transparent);
        }
        @media (max-width: 720px) {
          .hef-agenda__grid { gap: 5px; }
          .hef-agenda__track { height: 175px; }
          .hef-agenda__evt { font-size: 8.5px; padding: 4px; }
          .hef-agenda__legend { gap: 10px; }
        }
      `}</style>

      <div className="hef-agenda__toolbar">
        <div className="hef-agenda__views" aria-hidden="true">
          <span className="hef-agenda__view">{t("appScreens.agenda.viewDay")}</span>
          <span className="hef-agenda__view is-active">{t("appScreens.agenda.viewWeek")}</span>
          <span className="hef-agenda__view">{t("appScreens.agenda.viewMonth")}</span>
        </div>
        <span className="hef-agenda__week">{t("appScreens.agenda.weekOf")}</span>
      </div>

      <ul className="hef-agenda__legend" aria-hidden="true">
        {LEGEND.map((status) => (
          <li className={`hef-agenda__legend-item is-${status}`} key={status}>
            <i />
            {t(`appScreens.status.${status}`)}
          </li>
        ))}
      </ul>

      <div className="hef-agenda__grid">
        {DAYS.map((day, dayIndex) => (
          <div className="hef-agenda__col" key={day}>
            <span className="hef-agenda__day">{day}</span>
            <div className="hef-agenda__track">
              {EVENTS.filter((e) => e.day === dayIndex).map((e) => (
                <div
                  key={`${day}-${e.time}`}
                  className={`hef-agenda__evt is-${e.status}`}
                  style={{ top: `${e.top}%`, height: `${e.h}%` }}
                >
                  <span>{e.time}</span>
                  <span>{e.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
