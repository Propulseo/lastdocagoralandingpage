"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";

export default function FooterPro() {
  const t = useTranslations("footer");
  const tp = useTranslations("pro");

  return (
    <footer className="footer footer-pro">
      <div
        className="footer-primary"
        style={{ paddingTop: 80, paddingBottom: 40 }}
      >
        <div className="container-landing">
          <div className="row">
            {/* Column 1 -- Logo + About */}
            <div className="col-sm-12 col-md-6 col-lg-3">
              <div className="footer-widget-about">
                <Image
                  src="/assets/images/logo/logo-light.png"
                  alt="DocAgora"
                  width={160}
                  height={70}
                  className="mb-3"
                  style={{ filter: "brightness(1.1)" }}
                />
                <p
                  style={{ fontSize: 13, lineHeight: 1.8, color: "rgba(255,255,255,0.5)" }}
                >
                  {t("aboutText")}
                </p>
                <Link
                  href="/"
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
                  <i
                    className="icon-arrow-right"
                    style={{ fontSize: 11 }}
                  />
                </Link>
              </div>
            </div>

            {/* Column 2 -- Pro links */}
            <div className="col-sm-6 col-md-6 col-lg-2 offset-lg-1">
              <div className="footer-widget-nav" style={{ marginTop: 10 }}>
                <h6 className="footer-widget__title">{tp("footerPro.proLinksTitle")}</h6>
                <nav>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link href="/pro/pricing">
                        {tp("footerPro.pricingLink")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pro/resources">
                        {tp("footerPro.resourcesLink")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/pro#solutions">
                        {tp("footerPro.featuresLink")}
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Column 3 -- Links */}
            <div className="col-sm-6 col-md-6 col-lg-2">
              <div className="footer-widget-nav" style={{ marginTop: 10 }}>
                <h6 className="footer-widget__title">{t("linksTitle")}</h6>
                <nav>
                  <ul className="list-unstyled mb-0">
                    <li>
                      <Link href="/about">{t("linkAbout")}</Link>
                    </li>
                    <li>
                      <Link href="/blog">{t("linkBlog")}</Link>
                    </li>
                    <li>
                      <Link href="/contact">{t("linkContact")}</Link>
                    </li>
                    <li>
                      <Link href="/">
                        {tp("footerPro.patientSite")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/legal-notice">{t("linkLegal")}</Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">
                        {t("linkPrivacy")}
                      </Link>
                    </li>
                    <li>
                      <Link href="/terms-of-use">{t("linkTerms")}</Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            {/* Column 4 -- Get In Touch card (dark variant) */}
            <div className="col-sm-12 col-md-6 col-lg-4">
              <div
                className="footer-widget-contact"
                style={{
                  borderRadius: 12,
                  padding: 32,
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(var(--color-cobalt-rgb), 0.2)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <h6
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    marginBottom: 14,
                    color: "rgba(255,255,255,0.9)",
                    position: "relative",
                    zIndex: 1,
                  }}
                >
                  {t("contactTitle")}
                </h6>
                <ul
                  className="contact-list list-unstyled"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <li
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.5)",
                      lineHeight: 1.7,
                      marginBottom: 12,
                    }}
                  >
                    {t("contactDesc")}
                  </li>
                  <li>
                    <a
                      href={`mailto:${t("contactEmail")}`}
                      className="d-inline-flex align-items-center gap-2"
                      style={{
                        color: "var(--color-teal)",
                        fontWeight: 600,
                        fontSize: 15,
                        textDecoration: "none",
                        marginBottom: 8,
                      }}
                    >
                      <i
                        className="icon-email"
                        style={{ fontSize: 16 }}
                      />
                      <span>{t("contactEmail")}</span>
                    </a>
                  </li>
                  <li
                    className="d-flex align-items-center gap-2"
                    style={{
                      fontSize: 13,
                      color: "rgba(255,255,255,0.5)",
                      marginTop: 8,
                    }}
                  >
                    <i
                      className="fas fa-map-marker-alt"
                      style={{ color: "var(--color-teal)", fontSize: 14 }}
                    />
                    {t("contactLocation")}
                  </li>
                </ul>
                <div
                  className="mt-3"
                  style={{ position: "relative", zIndex: 1 }}
                >
                  <Link
                    href="/contact"
                    className="d-inline-flex align-items-center gap-2"
                    style={{
                      background: "var(--color-teal)",
                      color: "var(--color-dark-1)",
                      padding: "10px 24px",
                      borderRadius: 8,
                      fontSize: 13,
                      fontWeight: 600,
                      textDecoration: "none",
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--color-mint)";
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--color-teal)";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <span>{t("contactUs")}</span>
                    <i
                      className="icon-arrow-right"
                      style={{ fontSize: 11 }}
                    />
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
              marginTop: 40,
              paddingTop: 20,
            }}
          >
            <div className="footer-bottom__left" style={{ color: "rgba(255,255,255,0.35)" }}>
              {t("copyright")} {t("gdprBadge")}
            </div>
            <div className="footer-bottom__right">
              <Link href="/terms-of-use">{t("bottomTerms")}</Link>
              <Link href="/privacy-policy">{t("bottomPrivacy")}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
