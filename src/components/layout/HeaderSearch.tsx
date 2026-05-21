"use client";

import { useState, useRef, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface SearchResult {
  title: string;
  excerpt: string;
  href: string;
  section: string;
}

export default function HeaderSearch() {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLFormElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function getSearchableContent(): SearchResult[] {
    const items: SearchResult[] = [];

    // Pages
    items.push(
      { title: t("navbar.home"), excerpt: t("hero.description"), href: "/", section: "Page" },
      { title: t("navbar.about"), excerpt: t("aboutPage.aboutTitle"), href: "/about", section: "Page" },
      { title: t("navbar.specialties"), excerpt: t("specialtiesPage.pageDesc"), href: "/specialties", section: "Page" },
      { title: t("navbar.blog"), excerpt: t("blogPage.pageTitle"), href: "/blog", section: "Page" },
      { title: t("navbar.contact"), excerpt: t("contactPage.formDesc"), href: "/contact", section: "Page" },
    );

    // Specialties
    const specKeys = [
      "generalPractice", "cardiology", "dermatology", "pediatrics", "gynecology",
      "ophthalmology", "orthopedics", "psychology", "dentistry", "physiotherapy",
      "ent", "endocrinology", "gastroenterology", "neurology", "urology", "rheumatology",
    ] as const;
    for (const key of specKeys) {
      items.push({
        title: t(`specialties.items.${key}.title`),
        excerpt: t(`specialties.items.${key}.desc`),
        href: `/specialties#${key}`,
        section: t("navbar.specialties"),
      });
    }

    // Blog articles
    const articleKeys = ["a1", "a2", "a3", "a4", "a5", "a6"] as const;
    for (const key of articleKeys) {
      items.push({
        title: t(`blogPage.articles.${key}.title`),
        excerpt: t(`blogPage.articles.${key}.excerpt`),
        href: "/blog",
        section: "Blog",
      });
    }

    // FAQ
    const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7", "q8", "q9", "q10"] as const;
    for (const key of faqKeys) {
      items.push({
        title: t(`faqPage.items.${key}.question`),
        excerpt: t(`faqPage.items.${key}.answer`),
        href: "/contact",
        section: "FAQ",
      });
    }

    return items;
  }

  function handleSearch(value: string) {
    setQuery(value);
    if (value.trim().length < 2) {
      setResults([]);
      setOpen(false);
      return;
    }
    const lower = value.toLowerCase();
    const all = getSearchableContent();
    const matched = all.filter(
      (item) =>
        item.title.toLowerCase().includes(lower) ||
        item.excerpt.toLowerCase().includes(lower)
    );
    setResults(matched.slice(0, 8));
    setOpen(true);
  }

  return (
    <form
      ref={wrapperRef}
      className="header-topbar__search"
      onSubmit={(e) => e.preventDefault()}
      style={{ position: "relative" }}
    >
      <input
        type="text"
        className="form-control"
        placeholder={t("headerSearch.placeholder")}
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => { if (results.length > 0) setOpen(true); }}
      />
      <button className="header-topbar__search-btn" type="submit">
        <i className="fa fa-search"></i>
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            width: "360px",
            maxHeight: "400px",
            overflowY: "auto",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.15)",
            zIndex: 9999,
            marginTop: "8px",
          }}
        >
          {results.length === 0 ? (
            <div style={{ padding: "16px 20px", color: "#999", fontSize: "14px" }}>
              {t("headerSearch.noResults")}
            </div>
          ) : (
            results.map((item, i) => (
              <Link
                key={i}
                href={item.href}
                onClick={() => { setOpen(false); setQuery(""); }}
                style={{
                  display: "block",
                  padding: "12px 20px",
                  borderBottom: i < results.length - 1 ? "1px solid #f0f0f0" : "none",
                  textDecoration: "none",
                  color: "inherit",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f8f9fa")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ fontSize: "11px", color: "#0EA5E9", fontWeight: 600, marginBottom: "2px", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                  {item.section}
                </div>
                <div style={{ fontSize: "14px", fontWeight: 600, color: "#1a1a1a", marginBottom: "2px" }}>
                  {item.title}
                </div>
                <div style={{ fontSize: "12px", color: "#888", lineHeight: 1.4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {item.excerpt}
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </form>
  );
}
