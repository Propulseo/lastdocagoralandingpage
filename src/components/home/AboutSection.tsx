"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function AboutSection() {
  const t = useTranslations("about");
  return (
    <section className="about-layout2">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7 offset-lg-1">
            <div className="heading-layout2">
              <h2 className="heading__title mb-60">{t("title")} <br /> {t("titleBreak")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="text-with-icon">
              <div className="text__icon">
                <i className="icon-doctor"></i>
              </div>
              <div className="text__content">
                <p className="heading__desc font-weight-bold color-secondary mb-30">{t("subtitle")}</p>
                <Link href="/specialties" className="btn btn__secondary btn__rounded mb-70">
                  <span>{t("findProfessional")}</span> <i className="icon-arrow-right"></i>
                </Link>
              </div>
            </div>
            <div className="video-banner-layout2 da-about__media">
              <img src="/assets/images/about/2.jpg" alt="" className="w-100" />
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-7">
            <div className="about__text bg-white">
              <p className="heading__desc mb-30">{t("paragraph1")}</p>
              <p className="heading__desc mb-30">{t("paragraph2")}</p>
              <ul className="list-items list-unstyled">
                <li>{t("list1")}</li>
                <li>{t("list2")}</li>
                <li>{t("list3")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
