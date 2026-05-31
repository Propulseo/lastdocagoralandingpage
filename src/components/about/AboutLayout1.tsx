"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AboutLayout1() {
  const t = useTranslations("aboutPage");
  return (
    <section className="about-layout1 pb-0">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="heading-layout2">
              <h3 className="heading__title mb-40">{t("aboutTitle")}</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="about__Text">
              <p className="mb-30">{t("aboutP1")}</p>
              <p className="mb-30">{t("aboutP2")}</p>
              <div className="d-flex align-items-center mb-30">
                <Link href="/specialties" className="btn btn__primary btn__outlined btn__rounded mr-30">
                  {t("meetProfessionals")}
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="video-banner da-about__media">
              <img src="/assets/images/about/1.jpg" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
