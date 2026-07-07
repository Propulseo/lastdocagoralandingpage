"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { useTranslations } from "next-intl";
import { featuresElevatedCss } from "./features/featuresStyles";
import AppWindow from "./features/AppWindow";
import AgendaScreen from "./features/AgendaScreen";
import PatientsScreen from "./features/PatientsScreen";
import ReservationScreen from "./features/ReservationScreen";
import DashboardScreen from "./features/DashboardScreen";
import MultilingueScreen from "./features/MultilingueScreen";
import RappelsScreen from "./features/RappelsScreen";

/* ============================================================
   FeaturesElevated — section FONCTIONNALITÉS élevée du Pro (dark
   cobalt/teal). Onglets horizontaux + reproduction fidèle de la
   vraie page de l'app correspondante en dessous (fenêtre d'app
   avec le chrome de AppWindow, qui reprend le langage visuel de
   HeroBoard : tokens --v2-*, color-mix, cartes à liseré, badges
   teal). Seuls les 6 labels d'onglets + le titre/la phrase
   bénéfice de chaque onglet sont i18n (namespace « pro.features »,
   cf. locales/{pt,fr,en}.json). Le contenu illustratif À
   L'INTÉRIEUR de chaque fenêtre (noms, heures, emails, colonnes)
   reste volontairement littéral, comme dans Features2 (composant
   remplacé ici) et pour la même raison : ce sont des captures
   d'écran illustratives, pas de la prose marketing. Préfixe CSS
   « hef- ».
   ============================================================ */

const TAB_IDS = ["agenda", "patients", "reservation", "dashboard", "multilingue", "rappels"] as const;
type TabId = (typeof TAB_IDS)[number];

// path vide = racine (pro.docagora.com), écran Tableau de bord.
const TAB_PATH: Record<TabId, string> = {
  agenda: "agenda",
  patients: "patients",
  reservation: "reservation",
  dashboard: "",
  multilingue: "multilingue",
  rappels: "rappels",
};

const SCREENS: Record<TabId, () => React.ReactElement> = {
  agenda: AgendaScreen,
  patients: PatientsScreen,
  reservation: ReservationScreen,
  dashboard: DashboardScreen,
  multilingue: MultilingueScreen,
  rappels: RappelsScreen,
};

export default function FeaturesElevated() {
  const t = useTranslations("pro");
  const [active, setActive] = useState<TabId>("agenda");
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const ActiveScreen = SCREENS[active];

  const sectionRef = useRef<HTMLElement | null>(null);
  const reduceRef = useRef(false);
  const [autoplay, setAutoplay] = useState(false);
  const [paused, setPaused] = useState(false);

  // Auto-play : démarre seulement si la section est visible ET que
  // l'utilisateur n'a pas demandé à réduire les animations.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceRef.current = mq.matches;
    const section = sectionRef.current;
    if (!section || mq.matches) return;
    const io = new IntersectionObserver(
      ([entry]) => setAutoplay(entry.isIntersecting),
      { threshold: 0.3 },
    );
    io.observe(section);
    return () => io.disconnect();
  }, []);

  // Passe à l'onglet suivant quand le remplissage de l'actif se termine (boucle).
  const advance = useCallback(() => {
    setActive((cur) => TAB_IDS[(TAB_IDS.indexOf(cur) + 1) % TAB_IDS.length]);
  }, []);

  const activateTab = useCallback((index: number) => {
    const id = TAB_IDS[index];
    if (!id) return;
    setActive(id);
    tabRefs.current[index]?.focus();
  }, []);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      const currentIndex = TAB_IDS.indexOf(active);
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          activateTab((currentIndex + 1) % TAB_IDS.length);
          break;
        case "ArrowLeft":
          event.preventDefault();
          activateTab((currentIndex - 1 + TAB_IDS.length) % TAB_IDS.length);
          break;
        case "Home":
          event.preventDefault();
          activateTab(0);
          break;
        case "End":
          event.preventDefault();
          activateTab(TAB_IDS.length - 1);
          break;
      }
    },
    [active, activateTab],
  );

  return (
    <section
      ref={sectionRef}
      className={`hef${autoplay ? " hef--play" : ""}${paused ? " hef--paused" : ""}`}
      aria-labelledby="hef-title"
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
      }}
    >
      <style>{featuresElevatedCss}</style>

      <div className="hef__wrap">
        <div className="hef__head">
          <span className="hef__eyebrow">
            <span className="hef__eyebrow-dot" aria-hidden="true" />
            {t("features.eyebrow")}
          </span>
          <h2 className="hef__title" id="hef-title">
            {t("features.title")}
          </h2>
          <p className="hef__subtitle">{t("features.subtitle")}</p>
        </div>

        <div
          className="hef__tabs"
          role="tablist"
          aria-label={t("features.tabsAriaLabel")}
          onKeyDown={handleKeyDown}
        >
          {TAB_IDS.map((id, index) => (
            <button
              key={id}
              ref={(el) => {
                tabRefs.current[index] = el;
              }}
              type="button"
              role="tab"
              id={`hef-tab-${id}`}
              aria-selected={active === id}
              aria-controls="hef-panel"
              tabIndex={active === id ? 0 : -1}
              className="hef__tab"
              onClick={() => setActive(id)}
            >
              <span className="hef__tab-txt">{t(`features.tabs.${id}`)}</span>
              {active === id && (
                <span
                  className="hef__tab-fill"
                  aria-hidden="true"
                  onAnimationEnd={(e) => {
                    if (e.animationName === "hef-fill") advance();
                  }}
                >
                  {t(`features.tabs.${id}`)}
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="hef__intro">
          <h3 className="hef__intro-title">{t(`features.${active}.title`)}</h3>
          <p className="hef__intro-lead">{t(`features.${active}.benefit`)}</p>
        </div>

        {/* Pause de l'auto-play : seulement quand la souris est sur l'aperçu
            d'app (pas sur les onglets au-dessus). Le focus clavier, lui, met en
            pause au niveau de la section entière (accessibilité). */}
        <div
          className="hef__stage"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AppWindow path={TAB_PATH[active]} panelId="hef-panel" tabId={`hef-tab-${active}`}>
            <ActiveScreen key={active} />
          </AppWindow>
        </div>
      </div>
    </section>
  );
}
