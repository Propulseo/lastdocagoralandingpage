"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function NavbarPro({ locale }: { locale?: string }) {
  void locale;
  const t = useTranslations("navbarPro");
  const pathname = usePathname();

  return (
    <nav className="navbar navbar-expand-lg sticky-navbar">
      <div className="container-fluid">
        <Link
          className="navbar-brand"
          href="/pro"
          style={{ marginLeft: "clamp(0px, 5vw, 3cm)" }}
        >
          <img
            src="/assets/images/logo/logo-light.png"
            className="logo-light"
            alt="logo"
            style={{ transform: "scale(1.4)" }}
          />
          <img
            src="/assets/images/logo/logo-dark.png"
            className="logo-dark"
            alt="logo"
            style={{ transform: "scale(1.4)" }}
          />
        </Link>
        <button className="navbar-toggler" type="button">
          <span className="menu-lines">
            <span></span>
          </span>
        </button>
        <div className="collapse navbar-collapse" id="mainNavigation">
          <ul className="navbar-nav ml-auto">
            <li className="nav__item">
              <Link
                href="/pro#solutions"
                className="nav__item-link"
              >
                {t("solution")}
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/pro/pricing"
                className={`nav__item-link${pathname === "/pro/pricing" ? " active" : ""}`}
              >
                {t("pricing")}
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/pro/resources"
                className={`nav__item-link${pathname === "/pro/resources" ? " active" : ""}`}
              >
                {t("resources")}
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/pro/about"
                className={`nav__item-link${pathname === "/pro/about" ? " active" : ""}`}
              >
                {t("about")}
              </Link>
            </li>
          </ul>
          <div className="d-block d-lg-none py-3 px-3">
            <LanguageSwitcher />
          </div>
          <button className="close-mobile-menu d-block d-lg-none">
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="d-none d-xl-flex align-items-center position-relative ml-30">
          <LanguageSwitcher />
          <Link
            href="/"
            className="nav__item-link"
            style={{
              color: "var(--color-accent)",
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: "nowrap",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {t("imAPatient")}
          </Link>
          <a
            href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}
            className="ml-30"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "var(--color-primary)",
              color: "#fff",
              padding: "10px 24px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 600,
              textDecoration: "none",
              transition: "all 0.3s",
              whiteSpace: "nowrap",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-cobalt)";
              e.currentTarget.style.boxShadow = "0 4px 12px rgba(var(--color-navy-rgb), 0.3)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--color-primary)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <span>{t("getStarted")}</span>
            <i className="fas fa-arrow-right" style={{ fontSize: 12 }}></i>
          </a>
        </div>
      </div>
    </nav>
  );
}
