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
      <div className="footer-primary" style={{ paddingTop: 60, paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 1320 }}>
          <div className="row">
            {/* Column 1 — Logo + About */}
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="footer-widget-about">
                <img
                  src="/assets/images/logo/logo-light.png"
                  alt="DocAgora logo"
                  className="mb-3"
                  style={{ maxHeight: 70 }}
                />
                <p className="color-gray" style={{ fontSize: 13, lineHeight: 1.8 }}>
                  {t("aboutText")}
                </p>
                <Link
                  href="/specialties"
                  className="d-inline-flex align-items-center gap-2"
                  style={{
                    color: "var(--color-teal)",
                    fontSize: 13,
                    fontWeight: 600,
                    textDecoration: "none",
                    transition: "gap 0.3s",
                  }}
                >
                  <span>{t("findProfessional")}</span>
                  <i className="icon-arrow-right" style={{ fontSize: 11 }}></i>
                </Link>

                {/* Social icons */}
                <div className="footer-social">
                  {[
                    { icon: "fab fa-facebook-f", label: "Facebook" },
                    { icon: "fab fa-instagram", label: "Instagram" },
                    { icon: "fab fa-twitter", label: "Twitter" },
                    { icon: "fab fa-linkedin-in", label: "LinkedIn" },
                  ].map((social) => (
                    <button
                      key={social.icon}
                      type="button"
                      aria-label={social.label}
                      className="footer-social__link"
                    >
                      <i className={social.icon}></i>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Column 2 — Specialties */}
            <div className="col-sm-6 col-md-6 col-lg-2 offset-lg-1">
              <div className="footer-widget-nav" style={{ marginTop: 10 }}>
                <h6 className="footer-widget__title">{t("specialtiesTitle")}</h6>
                <nav>
                  <ul className="list-unstyled mb-0">
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
              <div className="footer-widget-nav" style={{ marginTop: 10 }}>
                <h6 className="footer-widget__title">{t("linksTitle")}</h6>
                <nav>
                  <ul className="list-unstyled mb-0">
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

            {/* Column 4 — Get In Touch card */}
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div
                className="footer-widget-contact"
                style={{
                  borderRadius: 16,
                  padding: "32px 30px",
                  background: "#ffffff",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h6
                  className="color-heading"
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 14,
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {t("contactTitle")}
                </h6>
                <ul className="contact-list list-unstyled" style={{ position: "relative", zIndex: 1 }}>
                  <li style={{ fontSize: 13, color: "#6b7280", lineHeight: 1.7, marginBottom: 12 }}>
                    {t("contactDesc")}
                  </li>
                  <li>
                    <a
                      href={`mailto:${t("contactEmail")}`}
                      className="d-inline-flex align-items-center gap-2"
                      style={{
                        color: "var(--color-cobalt)",
                        fontWeight: 600,
                        fontSize: 15,
                        textDecoration: "none",
                        marginBottom: 8,
                      }}
                    >
                      <i className="icon-email" style={{ fontSize: 16 }}></i>
                      <span>{t("contactEmail")}</span>
                    </a>
                  </li>
                  <li
                    className="d-flex align-items-center gap-2"
                    style={{ fontSize: 13, color: "#6b7280", marginTop: 8 }}
                  >
                    <i className="fas fa-map-marker-alt" style={{ color: "var(--color-accent)", fontSize: 14 }}></i>
                    {t("contactLocation")}
                  </li>
                </ul>
                <div className="mt-3" style={{ position: "relative", zIndex: 1 }}>
                  <Link href="/contact" className="footer-contact-cta">
                    <span>{t("contactUs")}</span>
                    <i className="icon-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Footer bottom */}
          <div
            className="footer-bottom"
            style={{
              borderTop: "1px solid rgba(255,255,255,0.08)",
              marginTop: 35,
              paddingTop: 20,
            }}
          >
            <div className="footer-bottom__left">
              {t("copyright")} {t("gdprBadge")}
            </div>
            <div className="footer-bottom__right">
              <Link href="/terms-of-use">{t("bottomTerms")}</Link>
              <Link href="/privacy-policy">{t("bottomPrivacy")}</Link>
              <Link href="/privacy-policy">{t("bottomGdpr")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
