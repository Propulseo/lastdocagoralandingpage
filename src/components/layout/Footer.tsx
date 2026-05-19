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
        <div className="container">
          <div className="row">
            {/* Column 1 — Logo + About */}
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="footer-widget-about">
                <img
                  src="/assets/images/logo/logo-light.png"
                  alt="DocAgora logo"
                  className="mb-3"
                  style={{ maxHeight: 50 }}
                />
                <p className="color-gray" style={{ fontSize: 13, lineHeight: 1.8 }}>
                  {t("aboutText")}
                </p>
                <Link
                  href="/specialties"
                  className="d-inline-flex align-items-center gap-2"
                  style={{
                    color: "var(--color-accent)",
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
                <div className="d-flex gap-2 mt-4">
                  {[
                    { icon: "fab fa-facebook-f", href: "#" },
                    { icon: "fab fa-instagram", href: "#" },
                    { icon: "fab fa-twitter", href: "#" },
                    { icon: "fab fa-linkedin-in", href: "#" },
                  ].map((social) => (
                    <a
                      key={social.icon}
                      href={social.href}
                      className="d-flex align-items-center justify-content-center"
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: "rgba(255,255,255,0.08)",
                        color: "rgba(255,255,255,0.6)",
                        fontSize: 13,
                        transition: "all 0.3s",
                        textDecoration: "none",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "var(--color-accent)"
                        e.currentTarget.style.color = "#fff"
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(255,255,255,0.08)"
                        e.currentTarget.style.color = "rgba(255,255,255,0.6)"
                      }}
                    >
                      <i className={social.icon}></i>
                    </a>
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
                  <Link
                    href="/contact"
                    className="d-inline-flex align-items-center gap-2"
                    style={{
                      background: "linear-gradient(135deg, var(--color-navy), var(--color-cobalt))",
                      color: "#fff",
                      padding: "10px 24px",
                      borderRadius: 10,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "transform 0.2s, box-shadow 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = "translateY(-1px)"
                      e.currentTarget.style.boxShadow = "0 4px 12px rgba(var(--color-navy-rgb), 0.3)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = "translateY(0)"
                      e.currentTarget.style.boxShadow = "none"
                    }}
                  >
                    <span>{t("contactUs")}</span>
                    <i className="icon-arrow-right" style={{ fontSize: 11 }}></i>
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
              <a href="#">{t("bottomGdpr")}</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
