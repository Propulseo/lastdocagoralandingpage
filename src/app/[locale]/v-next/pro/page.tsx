import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import HeaderV4 from "@/components/layout/HeaderV4";
import FooterPro from "@/components/layout/FooterPro";

const metricKeys = ["first", "second", "third"] as const;
const workflowKeys = ["profile", "agenda", "followup"] as const;
const featureKeys = ["visibility", "booking", "insights"] as const;
const proofKeys = ["one", "two", "three", "four"] as const;

export default async function VNextProPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "proVNext" });

  return (
    <div className="da-pro vpro-root">
      <HeaderV4 variant="pro" />
      <main className="vpro">
        <section className="vpro-hero" aria-labelledby="vpro-title">
          <div className="vpro-bg" aria-hidden="true">
            <span className="vpro-bg__beam vpro-bg__beam--one" />
            <span className="vpro-bg__beam vpro-bg__beam--two" />
            <span className="vpro-bg__grid" />
          </div>

          <div className="vpro-shell vpro-hero__grid">
            <div className="vpro-hero__copy">
              <p className="vpro-kicker">{t("hero.kicker")}</p>
              <h1 className="vpro-hero__title" id="vpro-title">
                {t("hero.title")}
              </h1>
              <p className="vpro-hero__lede">{t("hero.lede")}</p>

              <div className="vpro-actions" aria-label={t("hero.actionsLabel")}>
                <Link href="/contact" className="vpro-btn vpro-btn--primary">
                  {t("hero.primaryCta")}
                  <i className="fas fa-arrow-right" aria-hidden="true" />
                </Link>
                <a className="vpro-btn vpro-btn--ghost" href="#vpro-system">
                  {t("hero.secondaryCta")}
                </a>
              </div>
            </div>

            <div className="vpro-board" aria-label={t("hero.boardLabel")}>
              <div className="vpro-board__top">
                <span>{t("board.title")}</span>
                <strong>{t("board.status")}</strong>
              </div>
              <div className="vpro-board__agenda">
                <div className="vpro-board__day">
                  <span>{t("board.today")}</span>
                  <strong>16</strong>
                </div>
                <div className="vpro-board__slots">
                  <span className="is-filled" />
                  <span className="is-filled" />
                  <span />
                  <span className="is-cobalt" />
                  <span className="is-filled" />
                  <span />
                </div>
              </div>
              <div className="vpro-board__panel">
                <p>{t("board.panelTitle")}</p>
                <div className="vpro-board__bars" aria-hidden="true">
                  <span style={{ height: "42%" }} />
                  <span style={{ height: "58%" }} />
                  <span style={{ height: "78%" }} />
                  <span style={{ height: "64%" }} />
                  <span style={{ height: "88%" }} />
                </div>
                <strong>{t("board.panelValue")}</strong>
              </div>
            </div>
          </div>

          <div className="vpro-shell">
            <dl className="vpro-metrics">
              {metricKeys.map((key) => (
                <div className="vpro-metric" key={key}>
                  <dt>{t(`metrics.${key}.label`)}</dt>
                  <dd>{t(`metrics.${key}.value`)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="vpro-proof" aria-label={t("proof.aria")}>
          <div className="vpro-shell vpro-proof__grid">
            {proofKeys.map((key) => (
              <div className="vpro-proof__item" key={key}>
                <span>{t(`proof.${key}.value`)}</span>
                <p>{t(`proof.${key}.label`)}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="vpro-section" id="vpro-system" aria-labelledby="vpro-system-title">
          <div className="vpro-shell vpro-system">
            <div>
              <p className="vpro-eyebrow">{t("system.eyebrow")}</p>
              <h2 className="vpro-title" id="vpro-system-title">
                {t("system.title")}
              </h2>
              <p className="vpro-lede">{t("system.lede")}</p>
            </div>

            <div className="vpro-feature-grid">
              {featureKeys.map((key) => (
                <article className="vpro-feature" key={key}>
                  <span className="vpro-feature__icon">
                    <i className={t(`features.${key}.icon`)} aria-hidden="true" />
                  </span>
                  <h3>{t(`features.${key}.title`)}</h3>
                  <p>{t(`features.${key}.body`)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="vpro-section vpro-section--split" aria-labelledby="vpro-workflow-title">
          <div className="vpro-shell vpro-split">
            <div className="vpro-timeline">
              {workflowKeys.map((key, index) => (
                <article className="vpro-step" key={key}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3>{t(`workflow.${key}.title`)}</h3>
                    <p>{t(`workflow.${key}.body`)}</p>
                  </div>
                </article>
              ))}
            </div>

            <div className="vpro-split__copy">
              <p className="vpro-eyebrow">{t("workflow.eyebrow")}</p>
              <h2 className="vpro-title" id="vpro-workflow-title">
                {t("workflow.title")}
              </h2>
              <p className="vpro-lede">{t("workflow.lede")}</p>
            </div>
          </div>
        </section>

        <section className="vpro-section" aria-labelledby="vpro-roi-title">
          <div className="vpro-shell vpro-roi">
            <div className="vpro-roi__copy">
              <p className="vpro-eyebrow">{t("roi.eyebrow")}</p>
              <h2 className="vpro-title" id="vpro-roi-title">
                {t("roi.title")}
              </h2>
              <p className="vpro-lede">{t("roi.lede")}</p>
            </div>
            <div className="vpro-roi__card">
              <span>{t("roi.cardLabel")}</span>
              <strong>{t("roi.cardValue")}</strong>
              <p>{t("roi.cardBody")}</p>
            </div>
          </div>
        </section>

        <section className="vpro-final" aria-labelledby="vpro-final-title">
          <div className="vpro-shell vpro-final__inner">
            <p className="vpro-eyebrow">{t("final.eyebrow")}</p>
            <h2 className="vpro-title" id="vpro-final-title">
              {t("final.title")}
            </h2>
            <p className="vpro-lede">{t("final.lede")}</p>
            <Link href="/contact" className="vpro-btn vpro-btn--primary">
              {t("final.cta")}
              <i className="fas fa-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </main>
      <FooterPro />
    </div>
  );
}
