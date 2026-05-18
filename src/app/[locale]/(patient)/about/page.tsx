import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import AboutLayout1 from "@/components/about/AboutLayout1";
import FeaturesLayout1 from "@/components/about/FeaturesLayout1";
import WorkProcess from "@/components/home/WorkProcess";
import TeamCarousel from "@/components/home/TeamCarousel";
import AnimatedSection from "@/components/shared/AnimatedSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "metadata.about" });
  return { title: t("title"), description: t("description") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "aboutPage" });

  return (
    <>
      <section className="page-title page-title-layout1 bg-overlay">
        <div className="bg-img"><img src="/assets/images/page-titles/1.jpg" alt="background" /></div>
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-5">
              <h1 className="pagetitle__heading">{t("pageHeading")}</h1>
              <p className="pagetitle__desc">{t("pageDesc")}</p>
              <div className="d-flex flex-wrap align-items-center">
                <a href="#" className="btn btn__primary btn__rounded mr-30">
                  <span>{t("ctaFindDoctor")}</span>
                  <i className="icon-arrow-right"></i>
                </a>
                <a href={`/${locale}/specialties`} className="btn btn__white btn__rounded">
                  <span>{t("ctaSpecialties")}</span>
                  <i className="icon-arrow-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <AnimatedSection>
        <AboutLayout1 />
      </AnimatedSection>
      <AnimatedSection>
        <FeaturesLayout1 />
      </AnimatedSection>
      <AnimatedSection>
        <WorkProcess />
      </AnimatedSection>
      <AnimatedSection>
        <TeamCarousel />
      </AnimatedSection>
    </>
  );
}
