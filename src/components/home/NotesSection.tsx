"use client";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotesSection() {
  const t = useTranslations("notes");
  return (
    <section className="notes border-top pt-60 pb-60">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="note font-weight-bold">
              <i className="far fa-file-alt color-primary"></i>
              <span>{t("text")}</span>
              <Link href="/specialties" className="btn btn__link btn__secondary">
                <span>{t("browseSpecialties")}</span>
                <i className="icon-arrow-right"></i>
              </Link>
            </div>
          </div>
          <div className="col-sm-12 col-md-12 col-lg-6">
            <div className="info__meta d-flex flex-wrap justify-content-between align-items-center">
              <div className="testimonials__rating">
                <div className="testimonials__rating-inner d-flex align-items-center">
                  <span className="total__rate" style={{ visibility: "hidden" }}>0</span>
                  <div>
                    <span className="overall__rate">{t("stats")}</span>
                  </div>
                </div>
              </div>
              <Link href="/specialties" className="btn btn__primary btn__rounded">
                <span>{t("createAccount")}</span> <i className="icon-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
