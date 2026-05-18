"use client";
import { useTranslations } from "next-intl";

const STEP_KEYS = ["step1", "step2", "step3", "step4", "step5"] as const;
const STEP_ICONS = [
  "icon-health-report", "icon-dna", "icon-medicine", "icon-stethoscope", "icon-head",
];

export default function WorkProcess() {
  const t = useTranslations("process");
  return (
    <section id="process" className="work-process work-process-carousel pt-130 pb-0 bg-overlay bg-overlay-secondary">
      <div className="bg-img"><img src="/assets/images/banners/1.jpg" alt="background" /></div>
      <div className="container">
        <div className="row heading-layout2">
          <div className="col-12">
            <h2 className="heading__subtitle color-primary">{t("subtitle")}</h2>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-5">
            <h3 className="heading__title color-white">{t("title")}</h3>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 offset-xl-1">
            <p className="heading__desc font-weight-bold color-gray mb-40">{t("desc")}</p>
            <ul className="list-items list-items-layout2 list-items-light list-horizontal list-unstyled">
              {(t.raw("tags") as string[]).map((tag: string) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="carousel-container mt-90">
              <div
                className="slick-carousel"
                data-slick='{"slidesToShow": 4, "slidesToScroll": 1, "infinite":false, "arrows": false, "dots": false, "responsive": [{"breakpoint": 1200, "settings": {"slidesToShow": 3}}, {"breakpoint": 992, "settings": {"slidesToShow": 2}}, {"breakpoint": 767, "settings": {"slidesToShow": 2}}, {"breakpoint": 480, "settings": {"slidesToShow": 1}}]}'
              >
                {STEP_KEYS.map((key, i) => (
                  <div key={key} className="process-item">
                    <span className="process__number">{t(`steps.${key}.number`)}</span>
                    <div className="process__icon">
                      <i className={STEP_ICONS[i]}></i>
                    </div>
                    <h4 className="process__title">{t(`steps.${key}.title`)}</h4>
                    <p className="process__desc">{t(`steps.${key}.desc`)}</p>
                    <a href="#" className="btn btn__secondary btn__link">
                      <span>{t(`steps.${key}.cta`)}</span>
                      <i className="icon-arrow-right"></i>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cta bg-primary">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-2 col-lg-2">
              <img src="/assets/images/icons/alert.png" className="cta__img" alt="alert" />
            </div>
            <div className="col-sm-12 col-md-7 col-lg-7">
              <h4 className="cta__title">{t("ctaTitle")}</h4>
              <p className="cta__desc">{t("ctaDesc")}</p>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-3">
              <a href="#" className="btn btn__secondary btn__secondary-style2 btn__rounded mr-30">
                <span>{t("ctaButton")}</span>
                <i className="icon-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
