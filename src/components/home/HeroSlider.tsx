"use client";
import { useTranslations } from "next-intl";

export default function HeroSlider() {
  const t = useTranslations("hero");
  return (
    <section className="slider">
      <div className="slide-item align-v-h">
        <div className="bg-img">
          <img src="/assets/images/sliders/1.jpg" alt="slide img" />
        </div>
        <div className="container">
          <div className="row align-items-center">
            <div className="col-sm-12 col-md-12 col-lg-12 col-xl-7">
              <div className="slide__content">
                <h2 className="slide__title">{t("slide1Title")}</h2>
                <p className="slide__desc">{t("description")}</p>
                <ul className="features-list list-unstyled mb-0 d-flex flex-wrap">
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-heart"></i>
                    </div>
                    <h2 className="feature__title">{t("feature1")}</h2>
                  </li>
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-medicine"></i>
                    </div>
                    <h2 className="feature__title">{t("feature2")}</h2>
                  </li>
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-heart2"></i>
                    </div>
                    <h2 className="feature__title">{t("feature3")}</h2>
                  </li>
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-blood-test"></i>
                    </div>
                    <h2 className="feature__title">{t("feature4")}</h2>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
