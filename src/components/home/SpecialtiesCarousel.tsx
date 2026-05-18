"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const SPECIALTIES = [
  { key: "generalPractice", icon: "icon-doctor" },
  { key: "cardiology", icon: "icon-heart" },
  { key: "dermatology", icon: "icon-microscope" },
  { key: "pediatrics", icon: "icon-heart3" },
  { key: "gynecology", icon: "icon-heart2" },
  { key: "ophthalmology", icon: "icon-first-aid-kit" },
  { key: "orthopedics", icon: "icon-bandage" },
  { key: "psychology", icon: "icon-head" },
  { key: "dentistry", icon: "icon-medicine" },
  { key: "physiotherapy", icon: "icon-stethoscope" },
  { key: "ent", icon: "icon-hospital" },
  { key: "endocrinology", icon: "icon-dropper" },
  { key: "gastroenterology", icon: "icon-health-report" },
  { key: "neurology", icon: "icon-head" },
  { key: "urology", icon: "icon-drugs" },
  { key: "rheumatology", icon: "icon-expenses" },
] as const;

export default function SpecialtiesCarousel() {
  const t = useTranslations("specialties");
  return (
    <section className="services-layout1 services-carousel">
      <div className="bg-img"><img src="/assets/images/backgrounds/2.jpg" alt="background" /></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div className="heading text-center mb-60">
              <h2 className="heading__subtitle">{t("subtitle")}</h2>
              <h3 className="heading__title">{t("title")}</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div
              className="slick-carousel"
              data-slick='{"slidesToShow": 3, "slidesToScroll": 1, "autoplay": true, "arrows": false, "dots": true, "responsive": [ {"breakpoint": 992, "settings": {"slidesToShow": 2}}, {"breakpoint": 767, "settings": {"slidesToShow": 1}}, {"breakpoint": 480, "settings": {"slidesToShow": 1}}]}'
            >
              {SPECIALTIES.map(({ key, icon }) => (
                <div key={key} className="service-item">
                  <div className="service__icon">
                    <i className={icon}></i>
                    <i className={icon}></i>
                  </div>
                  <div className="service__content">
                    <h4 className="service__title">{t(`items.${key}.title`)}</h4>
                    <p className="service__desc">{t(`items.${key}.desc`)}</p>
                    <Link href="/specialties" className="btn btn__secondary btn__outlined btn__rounded">
                      <span>{t(`items.${key}.cta`)}</span>
                      <i className="icon-arrow-right"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
