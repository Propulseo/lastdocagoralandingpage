"use client";
import { useTranslations } from "next-intl";

const SPECIALTY_KEYS = [
  "generalPractice", "cardiology", "dermatology", "pediatrics",
  "gynecology", "ophthalmology", "orthopedics", "psychology",
  "dentistry", "physiotherapy", "ent", "endocrinology",
  "gastroenterology", "neurology", "urology", "rheumatology",
] as const;

export default function ContactLayout() {
  const t = useTranslations("contactPage");
  const ts = useTranslations("specialties");

  return (
    <section className="contact-layout1 pt-0 mt--100">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="contact-panel d-flex flex-wrap">
              <form className="contact-panel__form" method="post" action="#" onSubmit={(e) => e.preventDefault()}>
                <div className="row">
                  <div className="col-sm-12">
                    <h4 className="contact-panel__title">{t("formTitle")}</h4>
                    <p className="contact-panel__desc mb-30">{t("formDesc")}</p>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <i className="icon-user form-group-icon"></i>
                      <input type="text" className="form-control" placeholder={t("labelName")} />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <i className="icon-email form-group-icon"></i>
                      <input type="email" className="form-control" placeholder={t("labelEmail")} />
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <i className="icon-widget form-group-icon"></i>
                      <select className="form-control">
                        <option value="">{t("labelSpecialty")}</option>
                        {SPECIALTY_KEYS.map((key) => (
                          <option key={key} value={key}>{ts(`items.${key}.title`)}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="col-sm-6 col-md-6 col-lg-6">
                    <div className="form-group">
                      <i className="icon-location form-group-icon"></i>
                      <input type="text" className="form-control" placeholder={t("labelCity")} />
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="form-group">
                      <i className="icon-alert form-group-icon"></i>
                      <textarea className="form-control" placeholder={t("labelMessage")}></textarea>
                    </div>
                    <button type="submit" className="btn btn__secondary btn__rounded btn__block btn__xhight mt-10">
                      <span>{t("submitButton")}</span> <i className="icon-arrow-right"></i>
                    </button>
                  </div>
                </div>
              </form>
              <div className="contact-panel__info d-flex flex-column justify-content-between bg-overlay bg-overlay-primary-gradient">
                <div className="bg-img"><img src="/assets/images/banners/1.jpg" alt="banner" /></div>
                <div>
                  <h4 className="contact-panel__title color-white">{t("panelTitle")}</h4>
                  <p className="contact-panel__desc font-weight-bold color-white mb-30">{t("panelDesc")}</p>
                </div>
                <div>
                  <ul className="contact__list list-unstyled mb-30">
                    <li>
                      <i className="icon-phone"></i><a href="tel:112">{t("panelEmergency")}</a>
                    </li>
                    <li>
                      <i className="icon-location"></i><a href="#">{t("panelLocation")}</a>
                    </li>
                    <li>
                      <i className="icon-email"></i><a href="mailto:hello@docagora.com">{t("panelEmail")}</a>
                    </li>
                  </ul>
                  <a href="#" className="btn btn__white btn__rounded btn__outlined">{t("panelContactUs")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
