"use client";
import { useTranslations } from "next-intl";

const FEATURE_ICONS = [
  "icon-heart", "icon-doctor", "icon-ambulance", "icon-drugs",
  "icon-first-aid-kit", "icon-hospital", "icon-expenses", "icon-bandage",
];
const FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"] as const;

export default function FeaturesLayout1() {
  const t = useTranslations("aboutPage");
  return (
    <section className="features-layout1 pt-130 pb-50 mt--90">
      <div className="bg-img"><img src="/assets/images/backgrounds/1.jpg" alt="background" /></div>
      <div className="container">
        <div className="row mb-40">
          <div className="col-sm-12 col-md-12 col-lg-5">
            <div className="heading__layout2">
              <h3 className="heading__title">{t("featuresTitle")}</h3>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-5 offset-lg-1">
            <p className="heading__desc font-weight-bold">{t("featuresDesc")}</p>
            <div className="d-flex flex-wrap align-items-center mt-40 mb-30">
              <a href="#" className="btn btn__primary btn__rounded mr-30">
                <span>{t("featuresCta1")}</span>
                <i className="icon-arrow-right"></i>
              </a>
              <a href="#" className="btn btn__secondary btn__link">
                <i className="icon-arrow-right icon-filled"></i>
                <span>{t("featuresCta2")}</span>
              </a>
            </div>
          </div>
        </div>
        <div className="row">
          {FEATURE_KEYS.map((key, i) => (
            <div key={key} className="col-sm-6 col-md-6 col-lg-3">
              <div className="feature-item">
                <div className="feature__content">
                  <div className="feature__icon">
                    <i className={FEATURE_ICONS[i]}></i>
                    <i className={`${FEATURE_ICONS[i]} feature__overlay-icon`}></i>
                  </div>
                  <h4 className="feature__title">{t(`features.${key}`)}</h4>
                </div>
                <a href="#" className="btn__link">
                  <i className="icon-arrow-right icon-outlined"></i>
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="row">
          <div className="col-md-12 col-lg-6 offset-lg-3 text-center">
            <p className="font-weight-bold mb-0">
              {t("featuresBottom")}{" "}
              <a href="#" className="color-secondary">
                <span>{t("featuresBottomCta")}</span> <i className="icon-arrow-right"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
