import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

type DocKey = "privacy" | "terms" | "notice";

interface Section {
  title: string;
  body: string;
}

export default async function PolicyPage({
  docKey,
  locale,
}: {
  docKey: DocKey;
  locale: string;
}) {
  const t = await getTranslations({ locale, namespace: "legal" });
  const sections = t.raw(`${docKey}.sections`) as Section[];

  return (
    <>
      <section className="page-title page-title-layout1 bg-overlay">
        <div className="bg-img">
          <img src="/assets/images/page-titles/1.jpg" alt="" />
        </div>
        <div className="container">
          <div className="row">
            <div className="col-12">
              <h1 className="pagetitle__heading">{t(`${docKey}.title`)}</h1>
              <p className="pagetitle__desc">{t("lastUpdated")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="pt-90 pb-90">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="legal-prose">
                <p className="legal-prose__intro">{t(`${docKey}.intro`)}</p>
                {sections.map((section) => (
                  <div key={section.title} className="legal-prose__section">
                    <h2>{section.title}</h2>
                    <p>{section.body}</p>
                  </div>
                ))}
              </div>
              <div className="legal-prose__contact">
                <span>{t("contactPrompt")}</span>
                <Link href="/contact" className="btn btn__primary btn__rounded">
                  <span>{t("contactCta")}</span>
                  <i className="icon-arrow-right"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
