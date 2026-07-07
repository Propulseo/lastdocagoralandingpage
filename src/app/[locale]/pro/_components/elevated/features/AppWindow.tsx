/* ============================================================
   AppWindow — chrome partagé des 6 fenêtres d'app de la section
   FONCTIONNALITÉS élevée : barre de dots + « url » + pill
   « Aperçu ». Reprend le langage visuel de HeroBoard (fenêtre
   d'app dark, tokens --v2-*). CSS partagée dans
   features/featuresStyles.ts (classes hef__app, hef__bar, ...).
   path vide = racine (pro.docagora.com), écran Tableau de bord.
   Pill « Aperçu » volontairement littérale (chrome illustratif,
   comme le reste du contenu des fenêtres — cf. FeaturesElevated).
   ============================================================ */

import { useTranslations } from "next-intl";

function LockIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="11"
      height="11"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <rect x="5" y="11" width="14" height="9" rx="2" />
      <path d="M8 11V7a4 4 0 0 1 8 0v4" />
    </svg>
  );
}

export default function AppWindow({
  path,
  panelId,
  tabId,
  children,
}: {
  path: string;
  panelId: string;
  tabId: string;
  children: React.ReactNode;
}) {
  const t = useTranslations("pro");
  return (
    <div className="hef__app" id={panelId} role="tabpanel" aria-labelledby={tabId}>
      <div className="hef__bar">
        <span className="hef__dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="hef__crumb">
          <LockIcon />
          {`pro.docagora.com${path ? `/${path}` : ""}`}
        </span>
        <span className="hef__pill">{t("appScreens.previewPill")}</span>
      </div>
      <div className="hef__body">{children}</div>
    </div>
  );
}
