"use client";
import { useTranslations } from "next-intl";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"] as const;

export default function FAQAccordion() {
  const t = useTranslations("faqPage");
  const tc = useTranslations("contactPage");

  return (
    <section id="faq" className="faq pt-70 pb-70">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6 offset-lg-3">
            <div className="heading text-center mb-40">
              <span className="heading__subtitle d-block">{tc("faqSubtitle")}</span>
              <h2 className="heading__title">{tc("faqTitle")}</h2>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2" id="faq-accordion">
            {FAQ_KEYS.map((key, i) => (
              <div key={key} className={`accordion-item${i === 0 ? " opened" : ""}`}>
                <div className="accordion__header" data-toggle="collapse" data-target={`#faq-collapse-${key}`}>
                  <button className="accordion__title" type="button">{t(`items.${key}.question`)}</button>
                </div>
                <div id={`faq-collapse-${key}`} className={`collapse${i === 0 ? " show" : ""}`} data-parent="#faq-accordion">
                  <div className="accordion__body">
                    <p>{t(`items.${key}.answer`)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
