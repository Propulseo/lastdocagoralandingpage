"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import Image from "next/image";
import LanguageSwitcher from "./LanguageSwitcher";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

export default function NavbarPro({ locale }: { locale?: string }) {
  void locale;
  const t = useTranslations("navbarPro");
  const tn = useTranslations("navbarPro");
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const soonBadgeStyle: React.CSSProperties = {
    display: "inline-block",
    marginLeft: 6,
    padding: "2px 8px",
    fontSize: 10,
    fontWeight: 600,
    lineHeight: "16px",
    color: "#fff",
    background: "var(--color-cobalt)",
    borderRadius: 50,
    verticalAlign: "middle",
    whiteSpace: "nowrap",
  };

  return (
    <nav className="navbar navbar-expand-lg sticky-navbar navbar-pro-glass" aria-label="Pro navigation">
      <div className="container">
        <Link
          className="navbar-brand"
          href="/pro"
        >
          <Image
            src="/assets/images/logo/logo-light.png"
            className="logo-light"
            alt="DocAgora"
            width={140}
            height={45}
            priority
            style={{ transform: "scale(1.4)" }}
          />
          <Image
            src="/assets/images/logo/logo-dark.png"
            className="logo-dark"
            alt="DocAgora"
            width={140}
            height={45}
            priority
            style={{ transform: "scale(1.4)" }}
          />
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
          aria-controls="pro-nav-menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="menu-lines">
            <span></span>
          </span>
        </button>
        <div
          className={`collapse navbar-collapse${isMenuOpen ? " show" : ""}`}
          id="pro-nav-menu"
        >
          <ul className="navbar-nav ml-auto">
            <li className="nav__item">
              <Link
                href="/pro#solutions"
                className="nav__item-link"
                onClick={() => setIsMenuOpen(false)}
              >
                {t("solution")}
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/pro/pricing"
                className={`nav__item-link${pathname === "/pro/pricing" ? " active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("pricing")}
                <span style={soonBadgeStyle}>{tn("soon")}</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/pro/resources"
                className={`nav__item-link${pathname === "/pro/resources" ? " active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("resources")}
                <span style={soonBadgeStyle}>{tn("soon")}</span>
              </Link>
            </li>
            <li className="nav__item">
              <Link
                href="/pro/about"
                className={`nav__item-link${pathname === "/pro/about" ? " active" : ""}`}
                onClick={() => setIsMenuOpen(false)}
              >
                {t("about")}
                <span style={soonBadgeStyle}>{tn("soon")}</span>
              </Link>
            </li>
          </ul>
          <div className="d-block d-lg-none py-3 px-3">
            <LanguageSwitcher />
          </div>
          <button
            className="close-mobile-menu d-block d-lg-none"
            onClick={() => setIsMenuOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="d-none d-xl-flex align-items-center position-relative ml-30">
          <LanguageSwitcher />
          <Link
            href="/"
            className="nav__item-link"
            style={{
              color: "rgba(255, 255, 255, 0.7)",
              fontSize: 14,
              fontWeight: 500,
              whiteSpace: "nowrap",
              marginLeft: 20,
              marginRight: 20,
            }}
          >
            {t("imAPatient")}
          </Link>
        </div>
      </div>
    </nav>
  );
}
