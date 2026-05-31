"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { AnimatedCardsContainer, AnimatedCard } from "@/components/shared/AnimatedCards";

const SPECIALTIES = [
  { key: "generalPractice", icon: "icon-doctor", slug: "general-practice" },
  { key: "cardiology", icon: "icon-heart", slug: "cardiology" },
  { key: "dermatology", icon: "icon-microscope", slug: "dermatology" },
  { key: "pediatrics", icon: "icon-heart3", slug: "pediatrics" },
  { key: "gynecology", icon: "icon-heart2", slug: "gynecology" },
  { key: "ophthalmology", icon: "icon-first-aid-kit", slug: "ophthalmology" },
  { key: "orthopedics", icon: "icon-bandage", slug: "orthopedics" },
  { key: "psychology", icon: "icon-head", slug: "psychology" },
  { key: "dentistry", icon: "icon-medicine", slug: "dentistry" },
  { key: "physiotherapy", icon: "icon-stethoscope", slug: "physiotherapy" },
  { key: "ent", icon: "icon-hospital", slug: "ent" },
  { key: "endocrinology", icon: "icon-dropper", slug: "endocrinology" },
  { key: "gastroenterology", icon: "icon-health-report", slug: "gastroenterology" },
  { key: "neurology", icon: "icon-head", slug: "neurology" },
  { key: "urology", icon: "icon-drugs", slug: "urology" },
  { key: "rheumatology", icon: "icon-expenses", slug: "rheumatology" },
] as const;

export default function ServicesGrid() {
  const t = useTranslations("specialties");
  const tp = useTranslations("specialtiesPage");

  return (
    <section className="services-layout1 pt-130" id="services">
      <div className="bg-img"><img src="/assets/images/backgrounds/2.jpg" alt="" /></div>
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div className="heading text-center mb-60">
              <h2 className="heading__subtitle">{tp("servicesSubtitle")}</h2>
              <h3 className="heading__title">{tp("servicesTitle")}</h3>
            </div>
          </div>
        </div>
        <AnimatedCardsContainer className="row" stagger={0.08}>
          {SPECIALTIES.map(({ key, icon, slug }) => (
            <AnimatedCard key={key} className="col-sm-12 col-md-6 col-lg-4">
              <div className="service-item" id={slug}>
                <div className="service__icon">
                  <i className={icon}></i>
                  <i className={icon}></i>
                </div>
                <div className="service__content">
                  <h4 className="service__title">{t(`items.${key}.title`)}</h4>
                  <p className="service__desc">{t(`items.${key}.desc`)}</p>
                  <ul className="list-items list-items-layout1 list-unstyled">
                    {(tp.raw(`subItems.${key}`) as string[]).map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <Link href="/specialties" className="btn btn__secondary btn__outlined btn__rounded">
                    <span>{t(`items.${key}.cta`)}</span>
                    <i className="icon-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </AnimatedCard>
          ))}
        </AnimatedCardsContainer>
      </div>
    </section>
  );
}
