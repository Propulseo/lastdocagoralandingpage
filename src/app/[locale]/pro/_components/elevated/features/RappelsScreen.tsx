"use client";

/* ============================================================
   Reproduction illustrative de l'écran Rappels : en-tête « Rappels
   automatiques · SMS & e-mail » + interrupteur « Activé », puis
   feed de rappels (canal · timing · patient · statut Envoyé /
   Programmé). Présenté comme une fonctionnalité à part entière —
   aucune mention « bientôt ». Contenu littéral illustratif (cf.
   FeaturesElevated). Préfixe CSS « hef-rappels__ ».
   ============================================================ */

import { useTranslations } from "next-intl";

function SmsIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M20 4H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3v3l4-3h9a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Z" strokeLinejoin="round" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
      <path d="M4 6.5l8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

type Kind = "sms" | "mail";
type Status = "sent" | "scheduled";

const REMINDERS: { kind: Kind; channel: string; detailKey: string; who: string; status: Status }[] = [
  { kind: "sms", channel: "SMS", detailKey: "detail24h", who: "Susanna Da Sousa", status: "sent" },
  { kind: "mail", channel: "E-mail", detailKey: "detailConfirmation", who: "Clara Mendes", status: "sent" },
  { kind: "sms", channel: "SMS", detailKey: "detail2h", who: "João P.", status: "scheduled" },
  { kind: "mail", channel: "E-mail", detailKey: "detailFollowUp", who: "Hugo Gomes", status: "scheduled" },
];

export default function RappelsScreen() {
  const t = useTranslations("pro");
  return (
    <div className="hef-rappels">
      <style>{`
        .hef-rappels__head { display: flex; align-items: center; justify-content: space-between;
          gap: 12px; margin-bottom: 16px; }
        .hef-rappels__headmain { display: flex; flex-direction: column; gap: 2px; }
        .hef-rappels__title { font-size: 14px; font-weight: 700; color: var(--v2-text); }
        .hef-rappels__sub { font-size: 11px; font-weight: 600; color: var(--v2-text-muted); }
        .hef-rappels__toggle { display: inline-flex; align-items: center; gap: 8px; flex-shrink: 0;
          font-size: 11.5px; font-weight: 700; color: var(--v2-accent-text); }
        .hef-rappels__switch { position: relative; width: 32px; height: 18px; border-radius: 999px;
          background: var(--v2-accent); display: inline-block; }
        .hef-rappels__switch i { position: absolute; top: 2px; right: 2px; width: 14px; height: 14px;
          border-radius: 50%; background: var(--v2-accent-ink); }
        .hef-rappels__feed { list-style: none; margin: 0; padding: 0;
          display: flex; flex-direction: column; gap: 10px; }
        .hef-rappels__item { display: flex; align-items: center; gap: 13px; padding: 12px 14px;
          border-radius: 12px; background: var(--v2-surface); border: 1px solid var(--v2-border); }
        .hef-rappels__ic { width: 34px; height: 34px; border-radius: 10px; flex-shrink: 0; display: grid;
          place-items: center; color: var(--v2-accent-ink); }
        .hef-rappels__ic.is-sms { background: var(--v2-accent); }
        .hef-rappels__ic.is-mail { background: var(--v2-accent-2); }
        .hef-rappels__main { display: flex; flex-direction: column; gap: 2px; flex: 1; min-width: 0; }
        .hef-rappels__main b { font-size: 12.5px; font-weight: 700; color: var(--v2-text);
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .hef-rappels__main em { font-size: 11px; font-style: normal; color: var(--v2-text-muted); }
        .hef-rappels__status { flex-shrink: 0; font-size: 10.5px; font-weight: 700;
          border-radius: 999px; padding: 4px 10px; white-space: nowrap; }
        .hef-rappels__status.is-sent { color: var(--v2-accent-text);
          background: color-mix(in srgb, var(--v2-accent) 16%, transparent); }
        .hef-rappels__status.is-scheduled { color: var(--v2-text-muted);
          background: color-mix(in srgb, var(--v2-panel-text) 9%, transparent); border: 1px solid var(--v2-border); }
        @media (max-width: 480px) { .hef-rappels__main b { white-space: normal; } }
      `}</style>

      <div className="hef-rappels__head">
        <div className="hef-rappels__headmain">
          <span className="hef-rappels__title">{t("appScreens.rappels.title")}</span>
          <span className="hef-rappels__sub">{t("appScreens.rappels.sub")}</span>
        </div>
        <span className="hef-rappels__toggle">
          <span className="hef-rappels__switch" aria-hidden="true">
            <i />
          </span>
          {t("appScreens.rappels.enabled")}
        </span>
      </div>

      <ul className="hef-rappels__feed">
        {REMINDERS.map((r) => (
          <li className="hef-rappels__item" key={`${r.who}-${r.detailKey}`}>
            <span className={`hef-rappels__ic is-${r.kind}`} aria-hidden="true">
              {r.kind === "sms" ? <SmsIcon /> : <MailIcon />}
            </span>
            <span className="hef-rappels__main">
              <b>
                {r.channel} · {t(`appScreens.rappels.${r.detailKey}`)}
              </b>
              <em>{r.who}</em>
            </span>
            <span className={`hef-rappels__status is-${r.status}`}>
              {r.status === "sent" ? `✓ ${t("appScreens.rappels.sent")}` : t("appScreens.rappels.scheduled")}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
