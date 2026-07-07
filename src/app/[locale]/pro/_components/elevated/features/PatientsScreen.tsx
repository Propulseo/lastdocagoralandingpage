"use client";

/* ============================================================
   Reproduction illustrative de pro.docagora.com/patients : barre
   recherche + filtres, cartes stats, table « Liste des patients ».
   Contenu littéral illustratif (cf. FeaturesElevated). Préfixe CSS
   « hef-patients__ ».
   ============================================================ */

import { useTranslations } from "next-intl";

const STATS = [
  { val: "248", labelKey: "statTotal" },
  { val: "+12", labelKey: "statNew" },
  { val: "240", labelKey: "statActive" },
  { val: "96%", labelKey: "statRetention" },
  { val: "94%", labelKey: "statAttendance" },
  { val: "4,8/5", labelKey: "statRating" },
];

const ROWS = [
  { name: "Susanna Da Sousa", email: "patient1@docagora.com", last: "03/07/2026", count: 45 },
  { name: "Clara Mendes", email: "patient2@docagora.com", last: "06/06/2026", count: 15 },
  { name: "Marta Pinto", email: "patient6@docagora.com", last: "15/05/2026", count: 9 },
  { name: "Hugo Gomes", email: "patient9@docagora.com", last: "15/05/2026", count: 7 },
];

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" strokeLinecap="round" />
    </svg>
  );
}

export default function PatientsScreen() {
  const t = useTranslations("pro");
  return (
    <div className="hef-patients">
      <style>{`
        .hef-patients__toolbar { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 16px; }
        .hef-patients__search { display: inline-flex; align-items: center; gap: 7px;
          font-size: 12px; font-weight: 600; color: var(--v2-text-muted);
          padding: 8px 14px; border-radius: 10px; background: var(--v2-surface);
          border: 1px solid var(--v2-border); flex: 1; min-width: 160px; }
        .hef-patients__filter { display: inline-flex; align-items: center; font-size: 11.5px;
          font-weight: 600; color: var(--v2-text-muted); padding: 8px 12px; border-radius: 10px;
          background: var(--v2-surface); border: 1px solid var(--v2-border); white-space: nowrap; }
        .hef-patients__stats { display: grid; grid-template-columns: repeat(6, 1fr); gap: 8px; margin-bottom: 18px; }
        .hef-patients__stat { display: flex; flex-direction: column; gap: 3px; padding: 10px 11px;
          border-radius: 11px; background: var(--v2-surface); border: 1px solid var(--v2-border);
          border-top: 2.5px solid var(--v2-accent); min-width: 0; }
        .hef-patients__stat .v { font-size: 17px; font-weight: 800; color: var(--v2-text); letter-spacing: -0.02em; }
        .hef-patients__stat .l { font-size: 9.5px; font-weight: 700; color: var(--v2-text-muted);
          text-transform: uppercase; letter-spacing: 0.03em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .hef-patients__tabletitle { font-size: 12px; font-weight: 700; color: var(--v2-text); margin: 0 0 10px; }
        .hef-patients__tablewrap { overflow-x: auto; }
        .hef-patients__table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 520px; }
        .hef-patients__table th { text-align: left; font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.04em; color: var(--v2-text-muted); padding: 0 10px 8px; border-bottom: 1px solid var(--v2-border); }
        .hef-patients__table td { padding: 9px 10px; color: var(--v2-text-body);
          border-bottom: 1px solid var(--v2-border); white-space: nowrap; }
        .hef-patients__table tr:last-child td { border-bottom: none; }
        .hef-patients__status { font-size: 10px; font-weight: 700; color: var(--v2-accent-text);
          background: color-mix(in srgb, var(--v2-accent) 15%, transparent); border-radius: 999px; padding: 3px 9px; }
        @media (max-width: 720px) { .hef-patients__stats { grid-template-columns: repeat(3, 1fr); } }
        @media (max-width: 480px) { .hef-patients__stats { grid-template-columns: repeat(2, 1fr); } }
      `}</style>

      <div className="hef-patients__toolbar">
        <span className="hef-patients__search">
          <SearchIcon />
          {t("appScreens.patients.search")}
        </span>
        <span className="hef-patients__filter">{t("appScreens.patients.filterAll")} ▾</span>
        <span className="hef-patients__filter">{t("appScreens.patients.colLastVisit")} ▾</span>
      </div>

      <div className="hef-patients__stats">
        {STATS.map((s) => (
          <div className="hef-patients__stat" key={s.labelKey}>
            <span className="v">{s.val}</span>
            <span className="l">{t(`appScreens.patients.${s.labelKey}`)}</span>
          </div>
        ))}
      </div>

      <div className="hef-patients__tablewrap">
        <p className="hef-patients__tabletitle">{t("appScreens.patients.listTitle")}</p>
        <table className="hef-patients__table">
          <thead>
            <tr>
              <th>{t("appScreens.patients.colPatient")}</th>
              <th>{t("appScreens.patients.colEmail")}</th>
              <th>{t("appScreens.patients.colLastVisit")}</th>
              <th>{t("appScreens.patients.colVisits")}</th>
              <th>{t("appScreens.patients.colStatus")}</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.email}>
                <td>{r.name}</td>
                <td>{r.email}</td>
                <td>{r.last}</td>
                <td>{r.count}</td>
                <td>
                  <span className="hef-patients__status">{t("appScreens.patients.rowActive")}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
