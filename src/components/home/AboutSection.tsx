"use client";
import { useTranslations } from "next-intl";

export default function AboutSection() {
  const t = useTranslations("about");
  return (
    <section className="about-layout2 pb-0">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7 offset-lg-1">
            <div className="heading-layout2">
              <h3 className="heading__title mb-60">{t("title")} <br /> {t("titleBreak")}</h3>
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
                <a href="#" className="btn btn__secondary btn__rounded mb-70">
                  <span>{t("findProfessional")}</span> <i className="icon-arrow-right"></i>
                </a>
              </div>
            </div>
            <div className="video-banner-layout2 bg-overlay">
              <img src="/assets/images/about/2.jpg" alt="about" className="w-100" />
              {/* Video placeholder */}
              <a className="video__btn video__btn-white" href="#">
                <div className="video__player">
                  <i className="fa fa-play"></i>
                </div>
                <span className="video__btn-title color-white">{t("watchVideo")}</span>
              </a>
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
