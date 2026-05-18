"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const specialties = [
  { key: "generalPractice", slug: "general-practice" },
  { key: "cardiology", slug: "cardiology" },
  { key: "dermatology", slug: "dermatology" },
  { key: "pediatrics", slug: "pediatrics" },
  { key: "dentistry", slug: "dentistry" },
  { key: "psychology", slug: "psychology" },
] as const;

export default function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="footer">
      <div className="footer-primary">
        <div className="container">
          <div className="row">
            {/* Column 1 — Logo + About */}
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="footer-widget-about" style={{ marginTop: "30px" }}>
                <img
                  src="/assets/images/logo/logo-light.png"
                  alt="DocAgora logo"
                  className="mb-20"
                  style={{ transform: "scale(1.2)", transformOrigin: "left top" }}
                />
                <p className="color-gray">{t("aboutText")}</p>
                <a href="#" className="btn btn__primary btn__primary-style2 btn__link">
                  <span>{t("findProfessional")}</span>{" "}
                  <i className="icon-arrow-right"></i>
                </a>
              </div>
            </div>

            {/* Column 2 — Specialties */}
            <div className="col-sm-6 col-md-6 col-lg-2">
              <div className="footer-widget-nav" style={{ marginTop: "50px", marginLeft: "60px" }}>
                <h6 className="footer-widget__title">{t("specialtiesTitle")}</h6>
                <nav>
                  <ul className="list-unstyled">
                    {specialties.map((spec) => (
                      <li key={spec.key}>
                        <Link href={`/specialties#${spec.slug}`}>
                          {t(`footerSpecialties.${spec.key}`)}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
            </div>

            {/* Column 3 — Links */}
            <div className="col-sm-6 col-md-6 col-lg-2">
              <div className="footer-widget-nav" style={{ marginTop: "50px", marginLeft: "60px" }}>
                <h6 className="footer-widget__title">{t("linksTitle")}</h6>
                <nav>
                  <ul className="list-unstyled">
                    <li><Link href="/about">{t("linkAbout")}</Link></li>
                    <li><Link href="/specialties">{t("linkSpecialties")}</Link></li>
                    <li><Link href="/blog">{t("linkBlog")}</Link></li>
                    <li><Link href="/contact">{t("linkContact")}</Link></li>
                    <li><Link href="/legal-notice">{t("linkLegal")}</Link></li>
                    <li><Link href="/privacy-policy">{t("linkPrivacy")}</Link></li>
                    <li><Link href="/terms-of-use">{t("linkTerms")}</Link></li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Column 4 — Get In Touch card (untouched) */}
            <div className="col-sm-12 col-md-6 col-lg-4 offset-lg-1">
              <div className="footer-widget-contact">
                <h6 className="footer-widget__title color-heading">
                  {t("contactTitle")}
                </h6>
                <ul className="contact-list list-unstyled">
                  <li>{t("contactDesc")}</li>
                  <li>
                    <a href={`mailto:${t("contactEmail")}`} className="phone__number">
                      <i className="icon-email"></i>{" "}
                      <span>{t("contactEmail")}</span>
                    </a>
                  </li>
                  <li className="color-body">{t("contactLocation")}</li>
                </ul>
                <div className="d-flex align-items-center">
                  <Link
                    href="/contact"
                    className="btn btn__primary btn__link mr-30"
                  >
                    <i className="icon-arrow-right"></i>{" "}
                    <span>{t("contactUs")}</span>
                  </Link>
                  <ul className="social-icons list-unstyled mb-0">
                    <li>
                      <a href="#">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-instagram"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i className="fab fa-twitter"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom__left">
              {t("copyright")} {t("gdprBadge")}
            </div>
            <div className="footer-bottom__right">
              <Link href="/terms-of-use">{t("bottomTerms")}</Link>
              <Link href="/privacy-policy">{t("bottomPrivacy")}</Link>
              <a href="#">{t("bottomGdpr")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
