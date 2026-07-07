"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";

type Variant = "pro" | "patient";

type NavItem = { href: string; label: string; soon?: boolean; active: boolean };
type UtilItem = { icon: string; text: string; href?: string };

const TOPBAR_H = 42; // px — hauteur de la barre utilitaire (rangée du haut)
const NAVBAR_H = 72; // px — hauteur de la navbar (rangée du bas, sticky)

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

/**
 * Header « Variante 4 » — barre utilitaire + navbar, partagé pro/patient.
 * Une seule forme, deux thèmes :
 *   - variant="pro"     → sombre (topbar #070C16 + navbar glass, CTA teal)
 *   - variant="patient" → clair  (topbar navy + navbar blanche, CTA navy)
 * Seule la navbar (rangée du bas) se fixe au scroll (position: fixed via JS —
 * position: sticky est cassé par l'ancêtre .wrapper en overflow-x:hidden).
 */
export default function HeaderV4({
  variant,
  showAudienceSwitch = false,
}: {
  variant: Variant;
  showAudienceSwitch?: boolean;
}) {
  const isPro = variant === "pro";
  const t = useTranslations(isPro ? "navbarPro" : "navbar");
  const tt = useTranslations("topbar");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [stuck, setStuck] = useState(false);

  useEffect(() => {
    const onScroll = () => setStuck(window.scrollY > TOPBAR_H);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const homeHref = isPro ? "/pro" : "/";
  const logoSrc = isPro
    ? "/assets/images/logo/logo-light.png"
    : "/assets/images/logo/logo-dark.png";

  const utility: UtilItem[] = isPro
    ? [
        { icon: "fas fa-envelope", text: tt("email"), href: `mailto:${tt("email")}` },
        { icon: "fas fa-shield-alt", text: t("gdpr") },
        { icon: "fas fa-map-marker-alt", text: t("hosted") },
      ]
    : [
        { icon: "fas fa-envelope", text: tt("email"), href: `mailto:${tt("email")}` },
        { icon: "fas fa-map-marker-alt", text: tt("location") },
        { icon: "fas fa-clock", text: tt("available247") },
      ];

  const nav: NavItem[] = isPro
    ? [
        { href: "/pro#solutions", label: t("solution"), active: pathname === "/pro" },
        { href: "/pro/pricing", label: t("pricing"), soon: true, active: pathname === "/pro/pricing" },
        { href: "/pro/resources", label: t("resources"), soon: true, active: pathname === "/pro/resources" },
        { href: "/pro/about", label: t("about"), soon: true, active: pathname === "/pro/about" },
      ]
    : [
        { href: "/", label: t("home"), active: pathname === "/" },
        { href: "/about", label: t("about"), active: pathname === "/about" },
        { href: "/specialties", label: t("specialties"), active: pathname === "/specialties" },
        { href: "/blog", label: t("blog"), active: pathname === "/blog" },
        { href: "/contact", label: t("contact"), active: pathname === "/contact" },
      ];

  const crossLink = isPro ? { href: "/", label: t("imAPatient") } : null;
  const cta = isPro
    ? { href: "/contact", label: t("requestAccess"), icon: "fas fa-bolt" }
    : { href: "/pro", label: t("imAProfessional"), icon: "fas fa-user-md" };
  const loginUrl = `${PLATFORM_URL}/login`;

  return (
    <div className={`hv4 ${isPro ? "hv4--dark" : "hv4--light"}`}>
      <style>{`
        .hv4, .hv4 * { box-sizing: border-box; }
        .hv4 {
          position: relative;
          z-index: 1000;
          font-family: var(--font-montserrat), "Montserrat", sans-serif;
        }

        /* ── Rangée 1 : barre utilitaire ── */
        .hv4-top {
          display: flex; align-items: center; justify-content: space-between;
          height: ${TOPBAR_H}px; padding: 0 32px;
        }
        .hv4--dark .hv4-top {
          background: #070C16;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          --color-link: rgba(255, 255, 255, 0.82);
        }
        .hv4--light .hv4-top {
          background: linear-gradient(90deg, #1e3a6e 0%, var(--color-navy) 55%, #21406f 100%);
          --color-link: #ffffff;
        }
        .hv4-util { display: flex; align-items: center; gap: 22px; list-style: none; margin: 0; padding: 0; }
        .hv4-util li { display: inline-flex; align-items: center; gap: 7px; font-size: 12.5px; }
        .hv4-util li > i { color: var(--color-teal); font-size: 13px; }
        .hv4-util a { color: inherit; text-decoration: none; transition: color 0.2s ease; }
        .hv4--dark .hv4-util li { color: rgba(255, 255, 255, 0.7); }
        .hv4--light .hv4-util li { color: rgba(255, 255, 255, 0.85); }
        .hv4-util a:hover { color: #fff; }

        /* ── Rangée 2 : navbar ── */
        .hv4-bar {
          position: relative;
          display: flex; align-items: center; justify-content: space-between; gap: 24px;
          height: ${NAVBAR_H}px; padding: 0 32px;
        }
        .hv4--dark .hv4-bar {
          background: linear-gradient(120deg, rgba(12, 18, 30, 0.96), rgba(23, 37, 67, 0.96));
          backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
        }
        .hv4--light .hv4-bar {
          background: #ffffff;
          border-bottom: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        /* Sticky : seule la navbar reste fixée au scroll (JS toggle). */
        .hv4-bar.is-stuck {
          position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
          box-shadow: 0 8px 28px -16px rgba(0, 0, 0, 0.45);
        }
        .hv4-spacer { height: ${NAVBAR_H}px; }

        .hv4-brand { display: inline-flex; align-items: center; flex-shrink: 0; }
        .hv4-brand img { height: 44px; width: auto; display: block; }

        .hv4-collapse { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex: 1; }
        .hv4-nav { display: flex; gap: 30px; list-style: none; margin: 0; padding: 0; }
        .hv4-nav a {
          position: relative; display: inline-flex; align-items: center;
          text-decoration: none; font-weight: 600; font-size: 15px; padding: 6px 0;
          white-space: nowrap; transition: color 0.2s ease;
        }
        .hv4--dark .hv4-nav a { color: rgba(255, 255, 255, 0.8); }
        .hv4--dark .hv4-nav a:hover, .hv4--dark .hv4-nav a.is-active { color: #fff; }
        .hv4--light .hv4-nav a { color: #213360; }
        .hv4--light .hv4-nav a:hover, .hv4--light .hv4-nav a.is-active { color: var(--color-teal-ink); }
        .hv4-nav a.is-active::after {
          content: ""; position: absolute; left: 0; right: 0; bottom: -6px;
          height: 3px; border-radius: 3px; background: var(--color-teal);
        }
        .hv4-soon {
          margin-left: 6px; padding: 2px 7px; font-size: 10px; font-weight: 600; line-height: 16px;
          color: #fff; background: var(--color-cobalt); border-radius: 50px; white-space: nowrap;
        }

        .hv4-actions { display: flex; align-items: center; gap: 20px; }
        .hv4-patient { font-size: 14px; font-weight: 500; text-decoration: none; white-space: nowrap; transition: color 0.2s ease; }
        .hv4--dark .hv4-patient { color: rgba(255, 255, 255, 0.7); }
        .hv4--dark .hv4-patient:hover { color: #fff; }
        .hv4--light .hv4-patient { color: #213360; }
        .hv4-cta {
          display: inline-flex; align-items: center; gap: 9px; border-radius: var(--radius-pill);
          padding: 12px 22px; font-weight: 600; font-size: 14px; text-decoration: none; white-space: nowrap;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .hv4-cta i { font-size: 13px; }
        .hv4-cta:hover { transform: translateY(-1px); filter: brightness(1.05); }
        .hv4--dark .hv4-cta { background: var(--color-teal); color: var(--color-dark-1); }
        .hv4--light .hv4-cta { background: var(--color-navy); color: #fff; }

        /* ── Toggle d'audience Patient | Pro (variante patient) ── */
        .hv4-toggle {
          display: inline-flex; align-items: center; gap: 2px;
          padding: 3px; border-radius: var(--radius-pill);
          background: rgba(var(--color-navy-rgb), 0.06);
          border: 1px solid rgba(var(--color-navy-rgb), 0.08);
        }
        .hv4-toggle__opt {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 7px 16px; border-radius: var(--radius-pill);
          font-size: 13px; font-weight: 600; text-decoration: none; white-space: nowrap;
          color: #4a5a7a; transition: color 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
        }
        .hv4-toggle__opt:hover { color: var(--color-navy); }
        .hv4-toggle__opt.is-active {
          color: var(--color-navy); background: #fff;
          box-shadow: 0 2px 6px -2px rgba(var(--color-navy-rgb), 0.25);
        }
        /* Toggle sous le header pro (fond sombre) : chips en blanc alpha, actif en teal. */
        .hv4--dark .hv4-toggle {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.14);
        }
        .hv4--dark .hv4-toggle__opt { color: rgba(255, 255, 255, 0.7); }
        .hv4--dark .hv4-toggle__opt:hover { color: #fff; }
        .hv4--dark .hv4-toggle__opt.is-active {
          color: var(--color-dark-1); background: var(--color-teal);
          box-shadow: none;
        }
        .hv4-login {
          display: inline-flex; align-items: center; gap: 8px; border-radius: var(--radius-pill);
          padding: 12px 22px; font-weight: 600; font-size: 14px; text-decoration: none; white-space: nowrap;
          background: var(--color-navy); color: #fff;
          transition: transform 0.2s ease, filter 0.2s ease;
        }
        .hv4-login i { font-size: 13px; }
        .hv4-login:hover { transform: translateY(-1px); filter: brightness(1.06); }
        /* Login sous le header pro : chip translucide (le CTA teal reste l'accent principal). */
        .hv4--dark .hv4-login {
          background: rgba(255, 255, 255, 0.08);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        .hv4--dark .hv4-login:hover { background: rgba(255, 255, 255, 0.14); }

        /* ── Burger (mobile) ── */
        .hv4-burger {
          display: none; flex-direction: column; gap: 5px; padding: 8px;
          background: transparent; border: 0; cursor: pointer;
        }
        .hv4-burger span { display: block; width: 24px; height: 2px; border-radius: 2px; transition: opacity 0.2s ease; }
        .hv4--dark .hv4-burger span { background: #fff; }
        .hv4--light .hv4-burger span { background: var(--color-navy); }

        /* ── Responsive ── */
        @media (max-width: 991px) {
          .hv4-top { padding: 0 20px; }
          .hv4-util { gap: 14px; }
          .hv4-util li:not(:first-child) { display: none; }
          .hv4-bar { padding: 0 20px; }
          .hv4-burger { display: inline-flex; }
          .hv4-collapse {
            position: absolute; top: 100%; left: 0; right: 0;
            flex-direction: column; align-items: flex-start; gap: 18px;
            padding: 22px 20px 26px;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            box-shadow: 0 24px 40px -20px rgba(0, 0, 0, 0.4);
            display: none;
          }
          .hv4--dark .hv4-collapse { background: #0C121E; border-top-color: rgba(255, 255, 255, 0.08); }
          .hv4--light .hv4-collapse { background: #fff; }
          .hv4-collapse.is-open { display: flex; }
          .hv4-nav { flex-direction: column; gap: 16px; }
          .hv4-actions { flex-direction: column; align-items: flex-start; gap: 16px; width: 100%; }
          .hv4-cta { width: 100%; justify-content: center; }
          .hv4-toggle { width: 100%; }
          .hv4-toggle__opt { flex: 1; }
          .hv4-login { width: 100%; justify-content: center; }
        }

        /* ── Sélecteur de langue dans la navbar (persistant, les 2 variantes) ── */
        .hv4-lang { display: inline-flex; align-items: center; }
        .hv4--dark .hv4-lang { color: rgba(255, 255, 255, 0.85); }
        .hv4--light .hv4-lang { color: var(--color-navy); }

        @media (prefers-reduced-motion: reduce) {
          .hv4-cta, .hv4-nav a, .hv4-patient, .hv4-util a, .hv4-burger span { transition: none; }
        }
      `}</style>

      {/* Rangée 1 — utilitaire */}
      <div className="hv4-top">
        <ul className="hv4-util">
          {utility.map((u) => (
            <li key={u.text}>
              <i className={u.icon} aria-hidden="true" />
              {u.href ? <a href={u.href}>{u.text}</a> : u.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Rangée 2 — navbar */}
      <nav className={`hv4-bar${stuck ? " is-stuck" : ""}`} aria-label={t("navAria")}>
        <Link href={homeHref} className="hv4-brand" onClick={() => setOpen(false)}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} alt="DocAgora" />
        </Link>

        <button
          className="hv4-burger"
          type="button"
          aria-label={t("menuAria")}
          aria-expanded={open}
          aria-controls="hv4-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span /><span />
        </button>

        <div className={`hv4-collapse${open ? " is-open" : ""}`} id="hv4-menu">
          <ul className="hv4-nav">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={item.active ? "is-active" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                  {item.soon && <span className="hv4-soon">{t("soon")}</span>}
                </Link>
              </li>
            ))}
          </ul>
          <div className="hv4-actions">
            <span className="hv4-lang"><LanguageSwitcher /></span>
            {isPro && showAudienceSwitch ? (
              <>
                <div className="hv4-toggle" role="group" aria-label={t("audienceLabel")}>
                  <Link href="/" className="hv4-toggle__opt" onClick={() => setOpen(false)}>
                    {t("audiencePatient")}
                  </Link>
                  <span className="hv4-toggle__opt is-active" aria-current="page">
                    {t("audiencePro")}
                  </span>
                </div>
                <a className="hv4-login" href={loginUrl}>
                  <i className="fas fa-user" aria-hidden="true" />
                  {t("login")}
                </a>
              </>
            ) : isPro ? (
              <>
                {crossLink && (
                  <Link href={crossLink.href} className="hv4-patient" onClick={() => setOpen(false)}>
                    {crossLink.label}
                  </Link>
                )}
                <a className="hv4-cta" href={cta.href}>
                  <i className={cta.icon} aria-hidden="true" />
                  {cta.label}
                </a>
              </>
            ) : (
              <>
                <div className="hv4-toggle" role="group" aria-label={t("audienceLabel")}>
                  <span className="hv4-toggle__opt is-active" aria-current="page">
                    {t("audiencePatient")}
                  </span>
                  <Link href="/pro" className="hv4-toggle__opt" onClick={() => setOpen(false)}>
                    {t("audiencePro")}
                  </Link>
                </div>
                <a className="hv4-login" href={loginUrl}>
                  <i className="fas fa-user" aria-hidden="true" />
                  {t("login")}
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {stuck && <div className="hv4-spacer" aria-hidden="true" />}
    </div>
  );
}
