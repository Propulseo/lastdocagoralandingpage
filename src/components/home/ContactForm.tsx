"use client";
import { useTranslations } from "next-intl";

const SPECIALTY_KEYS = [
  "generalPractice", "cardiology", "dermatology", "pediatrics",
  "gynecology", "ophthalmology", "orthopedics", "psychology",
  "dentistry", "physiotherapy", "ent", "endocrinology",
  "gastroenterology", "neurology", "urology", "rheumatology",
] as const;

export default function ContactForm() {
  const t = useTranslations("contactForm");
  const ts = useTranslations("specialties");

  return (
    <section className="contact-layout3 bg-overlay bg-overlay-primary-gradient pb-60">
      <div className="bg-img"><img src="/assets/images/banners/3.jpg" alt="banner" /></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-7">
            <div className="contact-panel mb-50">
              <form className="contact-panel__form" method="post" action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-sm-12">
                    <h4 className="contact-panel__title">{t("title")}</h4>
                    <p className="contact-panel__desc mb-30">{t("desc")}</p>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <i className="icon-news form-group-icon"></i>
                      <input type="text" className="form-control" placeholder={t("name")} />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <i className="icon-email form-group-icon"></i>
                      <input type="email" className="form-control" placeholder={t("email")} />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <i className="icon-widget form-group-icon"></i>
                      <select className="form-control">
                        <option value="">{t("specialty")}</option>
                        {SPECIALTY_KEYS.map((key) => (
                          <option key={key} value={key}>{ts(`items.${key}.title`)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <i className="icon-location form-group-icon"></i>
                      <input type="text" className="form-control" placeholder={t("city")} />
                    </div>
                  </div>
                  <div className="col-sm-4 col-md-4 col-lg-4">
                    <div className="form-group">
                      <i className="icon-clock form-group-icon"></i>
                      <select className="form-control">
                        <option value="">{t("preferredLanguage")}</option>
                        <option value="pt">{t("languageOptions.pt")}</option>
                        <option value="fr">{t("languageOptions.fr")}</option>
                        <option value="en">{t("languageOptions.en")}</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-12">
                    <button type="submit" className="btn btn__secondary btn__rounded btn__block btn__xhight mt-10">
                      <span>{t("submit")}</span> <i className="icon-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="heading heading-light mb-30">
              <h3 className="heading__title mb-30">{t("whyTitle")}</h3>
              <p className="heading__desc">{t("whyDesc")}</p>
            </div>
            <div className="d-flex align-items-center">
              <a href="#" className="btn btn__white btn__rounded mr-30">
                <i className="fas fa-search"></i> <span>{t("findProfessional")}</span>
              </a>
              <a className="video__btn video__btn-white" href="#">
                <div className="video__player">
                  <i className="fa fa-play"></i>
                </div>
                <span className="video__btn-title color-white">{t("playVideo")}</span>
              </a>
            </div>
            <div className="text__block">
              <p className="text__block-desc color-white font-weight-bold">{t("freeText")}</p>
              <div className="sinature color-white">
                <span className="font-weight-bold">{t("teamSignature")}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
