"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"] as const;

export default function FAQAccordion() {
  const t = useTranslations("faqPage");
  const tc = useTranslations("contactPage");
  const [openKey, setOpenKey] = useState<string>("q1");

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
          <div className="col-sm-12 col-md-10 col-lg-8 offset-md-1 offset-lg-2">
            {FAQ_KEYS.map((key) => {
              const isOpen = openKey === key;
              const panelId = `faq-panel-${key}`;
              const headerId = `faq-header-${key}`;
              return (
                <div key={key} className={`accordion-item${isOpen ? " opened" : ""}`}>
                  <div className="accordion__header">
                    <button
                      id={headerId}
                      className="accordion__title"
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpenKey(isOpen ? "" : key)}
                    >
                      {t(`items.${key}.question`)}
                    </button>
                  </div>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={headerId}
                    className="accordion__panel"
                  >
                    <div className="accordion__body">
                      <p>{t(`items.${key}.answer`)}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
