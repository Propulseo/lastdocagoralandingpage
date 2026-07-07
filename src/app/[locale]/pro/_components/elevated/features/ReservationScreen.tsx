"use client";

/* ============================================================
   Reproduction illustrative de pro.docagora.com/reservation :
   flux de réservation complet — sélecteur de jour (5 jours),
   créneaux groupés Matin / Après-midi, carte récap du créneau
   choisi + état « Demande reçue ». Contenu littéral illustratif
   (cf. FeaturesElevated). Préfixe CSS « hef-resa__ ».
   ============================================================ */

import { useTranslations } from "next-intl";

const DAYS = ["Lun 30", "Mar 1", "Mer 2", "Jeu 3", "Ven 4"];
const ACTIVE_DAY = "Mer 2";
const MORNING = ["09:00", "09:30", "10:15"];
const AFTERNOON = ["14:30", "15:45", "16:30"];
const ACTIVE_SLOT = "10:15";

export default function ReservationScreen() {
  const t = useTranslations("pro");
  return (
    <div className="hef-resa">
      <style>{`
        .hef-resa__head { display: flex; align-items: center; justify-content: space-between;
          gap: 10px; margin-bottom: 16px; }
        .hef-resa__title { font-size: 14px; font-weight: 700; color: var(--v2-text); }
        .hef-resa__pill { font-size: 10px; font-weight: 700; letter-spacing: 0.04em;
          color: var(--v2-accent-text); background: color-mix(in srgb, var(--v2-accent) 16%, transparent);
          border-radius: 999px; padding: 4px 10px; }
        .hef-resa__days { display: grid; grid-template-columns: repeat(5, 1fr); gap: 8px; margin-bottom: 18px; }
        .hef-resa__day { display: grid; place-items: center; min-height: 40px; border-radius: 10px;
          font-size: 12px; font-weight: 700; color: var(--v2-text-muted);
          background: var(--v2-surface); border: 1px solid var(--v2-border); }
        .hef-resa__day.is-active { color: var(--v2-accent-ink); background: var(--v2-accent); border-color: transparent; }
        .hef-resa__lead { font-size: 13px; font-weight: 600; color: var(--v2-text); margin: 0 0 12px; }
        .hef-resa__group { margin-bottom: 14px; }
        .hef-resa__grouplabel { display: block; font-size: 10px; font-weight: 700; text-transform: uppercase;
          letter-spacing: 0.05em; color: var(--v2-text-muted); margin-bottom: 8px; }
        .hef-resa__slots { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
        .hef-resa__slot { display: grid; place-items: center; min-height: 44px; border-radius: 10px;
          font-size: 13px; font-weight: 600; background: var(--v2-surface);
          border: 1px solid var(--v2-border); color: var(--v2-text); }
        .hef-resa__slot.is-active { background: var(--v2-accent); color: var(--v2-accent-ink); border-color: transparent; }
        .hef-resa__recap { display: flex; align-items: center; justify-content: space-between; gap: 12px;
          margin-top: 16px; padding: 13px 15px; border-radius: 12px;
          background: color-mix(in srgb, var(--v2-accent) 8%, var(--v2-surface));
          border: 1px solid color-mix(in srgb, var(--v2-accent) 30%, var(--v2-border)); }
        .hef-resa__recapmain { display: flex; flex-direction: column; gap: 2px; min-width: 0; }
        .hef-resa__recaptitle { font-size: 13px; font-weight: 700; color: var(--v2-text); }
        .hef-resa__recapsub { font-size: 11.5px; font-weight: 600; color: var(--v2-text-muted); }
        .hef-resa__status { flex-shrink: 0; font-size: 10.5px; font-weight: 700; color: var(--v2-accent-text);
          background: color-mix(in srgb, var(--v2-accent) 16%, transparent); border-radius: 999px; padding: 4px 10px; }
        .hef-resa__note { margin: 14px 0 0; font-size: 11.5px; font-style: italic; color: var(--v2-text-muted); }
        @media (max-width: 560px) {
          .hef-resa__days { gap: 5px; }
          .hef-resa__day { font-size: 11px; }
        }
      `}</style>

      <div className="hef-resa__head">
        <span className="hef-resa__title">{t("appScreens.reservation.title")}</span>
        <span className="hef-resa__pill">{t("appScreens.reservation.pill")}</span>
      </div>

      <div className="hef-resa__days" aria-hidden="true">
        {DAYS.map((d) => (
          <span key={d} className={`hef-resa__day${d === ACTIVE_DAY ? " is-active" : ""}`}>
            {d}
          </span>
        ))}
      </div>

      <p className="hef-resa__lead">{t("appScreens.reservation.chooseSlot")}</p>

      <div className="hef-resa__group">
        <span className="hef-resa__grouplabel">{t("appScreens.reservation.morning")}</span>
        <div className="hef-resa__slots">
          {MORNING.map((s) => (
            <span key={s} className={`hef-resa__slot${s === ACTIVE_SLOT ? " is-active" : ""}`}>
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="hef-resa__group">
        <span className="hef-resa__grouplabel">{t("appScreens.reservation.afternoon")}</span>
        <div className="hef-resa__slots">
          {AFTERNOON.map((s) => (
            <span key={s} className="hef-resa__slot">
              {s}
            </span>
          ))}
        </div>
      </div>

      <div className="hef-resa__recap">
        <div className="hef-resa__recapmain">
          <span className="hef-resa__recaptitle">Mer 2 juillet · 10:15</span>
          <span className="hef-resa__recapsub">{t("appScreens.reservation.recapSub")}</span>
        </div>
        <span className="hef-resa__status">{t("appScreens.reservation.status")}</span>
      </div>

      <p className="hef-resa__note">{t("appScreens.reservation.benefit")}</p>
    </div>
  );
}
