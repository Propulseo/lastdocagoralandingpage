"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedCardsContainer, AnimatedCard } from "@/components/shared/AnimatedCards";

export default function ContactInfoBoxes() {
  const t = useTranslations("contactInfo");
  return (
    <section className="contact-info py-4">
      <div className="container">
        <AnimatedCardsContainer className="row row-no-gutter boxes-wrapper" stagger={0.15}>
          <AnimatedCard className="col-sm-12 col-md-4">
            <div className="contact-box d-flex align-items-center">
              <div className="contact__icon">
                <i className="icon-call3"></i>
              </div>
              <div className="contact__content">
                <h2 className="contact__title">{t("emergencyTitle")}</h2>
                <p className="contact__desc">{t("emergencyDesc")}</p>
                <a href="tel:112" className="phone__number">
                  <i className="icon-phone"></i> <span>{t("emergencyNumber")}</span>
                </a>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="col-sm-12 col-md-4">
            <div className="contact-box d-flex align-items-center">
              <div className="contact__icon">
                <i className="icon-health-report"></i>
              </div>
              <div className="contact__content">
                <h2 className="contact__title">{t("bookingTitle")}</h2>
                <p className="contact__desc">{t("bookingDesc")}</p>
                <Link href="/specialties" className="btn btn__white btn__outlined btn__rounded">
                  <span>{t("bookingCta")}</span><i className="icon-arrow-right"></i>
                </Link>
              </div>
            </div>
          </AnimatedCard>
          <AnimatedCard className="col-sm-12 col-md-4">
            <div className="contact-box d-flex align-items-center">
              <div className="contact__icon">
                <i className="icon-heart2"></i>
              </div>
              <div className="contact__content">
                <h2 className="contact__title">{t("availableTitle")}</h2>
                <ul className="time__list list-unstyled mb-0">
                  <li><span>{t("platformAvailable")}</span><span>{t("platformValue")}</span></li>
                  <li><span>{t("searchBook")}</span><span>{t("searchBookValue")}</span></li>
                  <li><span>{t("reminders")}</span><span>{t("remindersValue")}</span></li>
                </ul>
              </div>
            </div>
          </AnimatedCard>
        </AnimatedCardsContainer>
      </div>
    </section>
  );
}
