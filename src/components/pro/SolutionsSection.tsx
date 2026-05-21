"use client";

import { useCallback, useRef, useState } from "react";
import { useTranslations } from "next-intl";

const TABS = ["practitioners", "facilities"] as const;

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "https://app.docagora.com";

const specialties = [
  { key: "generalPractice", slug: "general-practice", icon: "fas fa-stethoscope" },
  { key: "cardiology", slug: "cardiology", icon: "fas fa-heartbeat" },
  { key: "dermatology", slug: "dermatology", icon: "fas fa-allergies" },
  { key: "pediatrics", slug: "pediatrics", icon: "fas fa-baby" },
  { key: "gynecology", slug: "gynecology", icon: "fas fa-venus" },
  { key: "ophthalmology", slug: "ophthalmology", icon: "fas fa-eye" },
  { key: "orthopedics", slug: "orthopedics", icon: "fas fa-bone" },
  { key: "psychology", slug: "psychology", icon: "fas fa-brain" },
  { key: "dentistry", slug: "dentistry", icon: "fas fa-tooth" },
  { key: "physiotherapy", slug: "physiotherapy", icon: "fas fa-walking" },
  { key: "ent", slug: "ent", icon: "fas fa-deaf" },
  { key: "endocrinology", slug: "endocrinology", icon: "fas fa-pills" },
  { key: "gastroenterology", slug: "gastroenterology", icon: "fas fa-procedures" },
  { key: "neurology", slug: "neurology", icon: "fas fa-head-side-virus" },
  { key: "urology", slug: "urology", icon: "fas fa-male" },
  { key: "rheumatology", slug: "rheumatology", icon: "fas fa-hand-holding-medical" },
] as const;

export default function SolutionsSection() {
  const t = useTranslations("pro.solutions");
  const tSpec = useTranslations("specialties");
  const [activeTab, setActiveTab] = useState<"practitioners" | "facilities">(
    "practitioners"
  );
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>) => {
      const currentIndex = TABS.indexOf(activeTab);
      let newIndex: number | null = null;

      if (e.key === "ArrowRight") {
        newIndex = (currentIndex + 1) % TABS.length;
      } else if (e.key === "ArrowLeft") {
        newIndex = (currentIndex - 1 + TABS.length) % TABS.length;
      }

      if (newIndex !== null) {
        e.preventDefault();
        setActiveTab(TABS[newIndex]);
        tabRefs.current[newIndex]?.focus();
      }
    },
    [activeTab]
  );

  return (
    <section id="solutions" style={{ background: "var(--color-light-1)", padding: "120px 0", position: "relative" }}>
      {/* Thin Cobalt separator at top */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "10%",
          right: "10%",
          height: 1,
          background: "rgba(var(--color-cobalt-rgb), 0.2)",
        }}
      />

      <div className="container-landing">
        {/* Header */}
        <div className="text-center" style={{ maxWidth: 640, margin: "0 auto 48px" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 3.5vw, 40px)",
              fontWeight: 700,
              marginBottom: 16,
              color: "var(--color-dark-1)",
              lineHeight: 1.15,
            }}
          >
            {t("title")}
          </h2>
        </div>

        {/* Segmented control tabs */}
        <div
          className="d-flex justify-content-center mb-5"
          role="tablist"
          aria-label={t("title")}
        >
          <div
            style={{
              display: "inline-flex",
              background: "var(--color-light-2)",
              borderRadius: 8,
              padding: 4,
              border: "1px solid rgba(var(--color-cobalt-rgb), 0.12)",
            }}
          >
            {TABS.map((tab, idx) => (
              <button
                key={tab}
                ref={(el) => { tabRefs.current[idx] = el; }}
                role="tab"
                id={`tab-${tab}`}
                aria-selected={activeTab === tab}
                aria-controls={`tabpanel-${tab}`}
                tabIndex={activeTab === tab ? 0 : -1}
                onClick={() => setActiveTab(tab)}
                onKeyDown={handleTabKeyDown}
                style={{
                  padding: "10px 28px",
                  borderRadius: 6,
                  border: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  cursor: "pointer",
                  background: activeTab === tab ? "var(--color-navy)" : "transparent",
                  color: activeTab === tab ? "#fff" : "var(--text-muted)",
                  transition: "all 0.2s ease",
                  boxShadow: activeTab === tab ? "0 2px 8px rgba(var(--color-navy-rgb), 0.2)" : "none",
                }}
              >
                {t(tab === "practitioners" ? "tabPractitioners" : "tabFacilities")}
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "practitioners" ? (
          <div
            role="tabpanel"
            id="tabpanel-practitioners"
            aria-labelledby="tab-practitioners"
            tabIndex={0}
            className="row g-3"
          >
            {specialties.map((spec) => (
              <div key={spec.key} className="col-6 col-md-4 col-lg-3">
                <a
                  href={`${PLATFORM_URL}/register?role=professional&specialty=${spec.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "var(--color-light-2)",
                    borderRadius: 12,
                    padding: "14px 16px",
                    border: "1px solid rgba(var(--color-cobalt-rgb), 0.1)",
                    textDecoration: "none",
                    color: "var(--color-dark-1)",
                    transition: "all 0.2s ease",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--color-cobalt-rgb), 0.3)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(36, 72, 130, 0.08)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(var(--color-cobalt-rgb), 0.1)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(var(--color-cobalt-rgb), 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={spec.icon}
                      style={{ fontSize: 14, color: "var(--color-cobalt)" }}
                    />
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.3 }}>
                    {tSpec(`items.${spec.key}.title`)}
                  </span>
                </a>
              </div>
            ))}
          </div>
        ) : (
          <div
            role="tabpanel"
            id="tabpanel-facilities"
            aria-labelledby="tab-facilities"
            tabIndex={0}
            className="text-center"
            style={{
              background: "var(--color-light-2)",
              borderRadius: 16,
              padding: "60px 20px",
              border: "1px solid rgba(var(--color-cobalt-rgb), 0.1)",
            }}
          >
            <i
              className="fas fa-hospital"
              style={{ fontSize: 40, color: "var(--text-muted)", marginBottom: 16, display: "block", opacity: 0.4 }}
            />
            <p style={{ fontSize: 15, color: "var(--text-muted)", marginBottom: 0 }}>
              {t("facilitiesComingSoon")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
