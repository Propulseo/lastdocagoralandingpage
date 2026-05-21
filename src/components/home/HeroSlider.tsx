"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslations } from "next-intl";

import LandingChatbot from "./LandingChatbot";

const EASE_OUT = "easeOut" as const;

export default function HeroSlider() {
  const t = useTranslations("hero");
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="slider">
      <div className="slide-item align-v-h">
        <div className="bg-img">
          <img src="/assets/images/sliders/1.jpg" alt="slide img" />
        </div>
        <div className="container" style={{ maxWidth: 1400 }}>
          <div className="row align-items-center justify-content-between">
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6">
              <div className="slide__content">
                <motion.h1
                  className="slide__title"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: -30 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.2,
                    ease: EASE_OUT,
                  }}
                >
                  {t("slide1Title")}
                </motion.h1>
                <motion.p
                  className="slide__desc"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, y: -30 }
                  }
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.4,
                    ease: EASE_OUT,
                  }}
                >
                  {t("description")}
                </motion.p>
                <motion.ul
                  className="features-list list-unstyled mb-0 d-flex flex-wrap"
                  initial={
                    prefersReducedMotion
                      ? false
                      : { opacity: 0, scale: 0.95 }
                  }
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.7,
                    delay: 0.6,
                    ease: EASE_OUT,
                  }}
                >
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-heart"></i>
                    </div>
                    <span className="feature__title">{t("feature1")}</span>
                  </li>
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-medicine"></i>
                    </div>
                    <span className="feature__title">{t("feature2")}</span>
                  </li>
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-heart2"></i>
                    </div>
                    <span className="feature__title">{t("feature3")}</span>
                  </li>
                  <li className="feature-item">
                    <div className="feature__icon">
                      <i className="icon-blood-test"></i>
                    </div>
                    <span className="feature__title">{t("feature4")}</span>
                  </li>
                </motion.ul>
              </div>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6 col-xl-6 d-none d-lg-block">
              <motion.div
                className="d-flex justify-content-end"
                initial={
                  prefersReducedMotion
                    ? false
                    : { opacity: 0 }
                }
                animate={{ opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.3,
                  ease: EASE_OUT,
                }}
              >
                <LandingChatbot />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
