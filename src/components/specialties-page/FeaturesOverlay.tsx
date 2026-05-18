"use client";
import { useTranslations } from "next-intl";

const FEATURE_ICONS = [
  "icon-heart", "icon-doctor", "icon-ambulance", "icon-drugs",
  "icon-first-aid-kit", "icon-hospital", "icon-expenses", "icon-bandage",
];
const FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"] as const;

export default function FeaturesOverlay() {
  const t = useTranslations("specialtiesPage");
  return (
    <section className="features-layout2 pt-130 bg-overlay bg-overlay-primary">
      <div className="bg-img"><img src="/assets/images/backgrounds/2.jpg" alt="background" /></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-8 offset-lg-1">
            <div className="heading__layout2 mb-50">
              <h3 className="heading__title color-white">{t("featuresTitle")}</h3>
            </div>
          </div>
        </div>
        <div className="row mb-100">
          <div className="col-sm-3 col-md-3 col-lg-1 offset-lg-5">
            <div className="heading__icon">
              <i className="icon-insurance"></i>
            </div>
          </div>
          <div className="col-sm-9 col-md-9 col-lg-6">
            <p className="heading__desc font-weight-bold color-white mb-30">{t("featuresDesc")}</p>
            <a href="#" className="btn btn__white btn__link">
              <i className="icon-arrow-right icon-filled"></i>
              <span>{t("featuresCoreValues")}</span>
            </a>
          </div>
        </div>
        <div className="row">
          {FEATURE_KEYS.map((key, i) => (
            <div key={key} className="col-sm-6 col-md-6 col-lg-3">
              <div className="feature-item">
                <div className="feature__img">
                  <img src={`/assets/images/services/${i + 1}.jpg`} alt="service" loading="lazy" />
                </div>
                <div className="feature__content">
                  <div className="feature__icon">
                    <i className={FEATURE_ICONS[i]}></i>
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
            <p className="font-weight-bold color-gray mb-0">
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
