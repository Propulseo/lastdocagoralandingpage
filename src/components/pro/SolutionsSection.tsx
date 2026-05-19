"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

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

  return (
    <section id="solutions" style={{ padding: "80px 0", background: "#F8FAFD" }}>
      <div className="container">
        <h3
          className="text-center"
          style={{
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 700,
            marginBottom: 12,
            color: "var(--color-dark-1)",
          }}
        >
          {t("title")}
        </h3>
        <div
          style={{
            width: 48,
            height: 3,
            background: "var(--color-accent)",
            borderRadius: 2,
            margin: "16px auto 36px",
          }}
        />

        {/* Tabs */}
        <div className="d-flex justify-content-center gap-2 mb-5">
          <button
            onClick={() => setActiveTab("practitioners")}
            style={{
              padding: "10px 28px",
              borderRadius: 24,
              border: activeTab === "practitioners" ? "none" : "1px solid #e2e8f0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              background: activeTab === "practitioners" ? "var(--color-accent)" : "#fff",
              color: activeTab === "practitioners" ? "#fff" : "#374151",
              transition: "all 0.2s",
              boxShadow: activeTab === "practitioners" ? "0 4px 12px rgba(var(--color-teal-rgb), 0.3)" : "none",
            }}
          >
            {t("tabPractitioners")}
          </button>
          <button
            onClick={() => setActiveTab("facilities")}
            style={{
              padding: "10px 28px",
              borderRadius: 24,
              border: activeTab === "facilities" ? "none" : "1px solid #e2e8f0",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              background: activeTab === "facilities" ? "var(--color-accent)" : "#fff",
              color: activeTab === "facilities" ? "#fff" : "#374151",
              transition: "all 0.2s",
              boxShadow: activeTab === "facilities" ? "0 4px 12px rgba(var(--color-teal-rgb), 0.3)" : "none",
            }}
          >
            {t("tabFacilities")}
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "practitioners" ? (
          <div className="row g-3">
            {specialties.map((spec) => (
              <div key={spec.key} className="col-6 col-md-4 col-lg-3">
                <a
                  href={`${PLATFORM_URL}/patient/search?specialty=${spec.slug}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 12,
                    background: "#fff",
                    borderRadius: 12,
                    padding: "14px 16px",
                    border: "1px solid #f0f0f5",
                    textDecoration: "none",
                    color: "var(--color-dark-1)",
                    transition: "all 0.25s",
                    height: "100%",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(var(--color-teal-rgb), 0.12)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#f0f0f5";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 8,
                      background: "rgba(var(--color-teal-rgb), 0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={spec.icon}
                      style={{ fontSize: 14, color: "var(--color-accent)" }}
                    ></i>
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
            className="text-center"
            style={{
              background: "#fff",
              borderRadius: 16,
              padding: "60px 20px",
              border: "1px solid #f0f0f5",
            }}
          >
            <i
              className="fas fa-hospital"
              style={{ fontSize: 40, color: "#d1d5db", marginBottom: 16, display: "block" }}
            ></i>
            <p style={{ fontSize: 15, color: "#6b7280", marginBottom: 0 }}>
              {t("facilitiesComingSoon")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
