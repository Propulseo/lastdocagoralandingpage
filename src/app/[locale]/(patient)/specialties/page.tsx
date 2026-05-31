import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ServicesGrid from "@/components/specialties-page/ServicesGrid";
import FeaturesOverlay from "@/components/specialties-page/FeaturesOverlay";
import AnimatedSection from "@/components/shared/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.specialties" });
  return { title: t("title"), description: t("description") };
}

export default async function SpecialtiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "specialtiesPage" });

  return (
    <>
      <section className="page-title page-title-layout1 bg-overlay">
        <div className="bg-img"><img src="/assets/images/page-titles/2.jpg" alt="" /></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5">
              <span className="pagetitle__subheading">{t("pageSubheading")}</span>
              <h1 className="pagetitle__heading">{t("pageHeading")}</h1>
              <p className="pagetitle__desc">{t("pageDesc")}</p>
              <div className="d-flex flex-wrap align-items-center">
                <a href={`/${locale}/specialties#services`} className="btn btn__secondary btn__rounded mr-30">
                  <span>{t("ctaFindDoctor")}</span>
                  <i className="icon-arrow-right"></i>
                </a>
                <a href={`/${locale}/about`} className="btn btn__secondary btn__outlined btn__rounded">
                  <span>{t("ctaAbout")}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatedSection>
        <ServicesGrid />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturesOverlay />
      </AnimatedSection>
    </>
  );
}
