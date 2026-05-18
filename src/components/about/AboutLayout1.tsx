"use client";
import { useTranslations } from "next-intl";

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
                <a href="#" className="btn btn__primary btn__outlined btn__rounded mr-30">
                  {t("meetProfessionals")}
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="video-banner">
              <img src="/assets/images/about/1.jpg" alt="about" />
              <a className="video__btn video__btn-white" href="#">
                <div className="video__player">
                  <i className="fa fa-play"></i>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
