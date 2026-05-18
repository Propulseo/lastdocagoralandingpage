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
    <section id="solutions" style={{ padding: "80px 0" }}>
      <div className="container">
        <h3
          className="text-center"
          style={{
            fontSize: "clamp(24px, 3vw, 34px)",
            fontWeight: 700,
            marginBottom: 36,
          }}
        >
          {t("title")}
        </h3>

        {/* Tabs */}
        <div className="d-flex justify-content-center gap-3 mb-5">
          <button
            onClick={() => setActiveTab("practitioners")}
            style={{
              padding: "10px 28px",
              borderRadius: 24,
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              background:
                activeTab === "practitioners" ? "#21cdc0" : "#f1f5f9",
              color: activeTab === "practitioners" ? "#fff" : "#374151",
              transition: "all 0.2s",
            }}
          >
            {t("tabPractitioners")}
          </button>
          <button
            onClick={() => setActiveTab("facilities")}
            style={{
              padding: "10px 28px",
              borderRadius: 24,
              border: "none",
              fontSize: 14,
              fontWeight: 600,
              cursor: "pointer",
              background:
                activeTab === "facilities" ? "#21cdc0" : "#f1f5f9",
              color: activeTab === "facilities" ? "#fff" : "#374151",
              transition: "all 0.2s",
            }}
          >
            {t("tabFacilities")}
          </button>
        </div>

        {/* Tab content */}
        {activeTab === "practitioners" ? (
          <div className="row g-3 justify-content-center">
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
                    padding: "16px 18px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                    textDecoration: "none",
                    color: "#1a1a2e",
                    transition: "box-shadow 0.2s, transform 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.1)";
                    e.currentTarget.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.05)";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: "rgba(33,205,192,0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <i
                      className={spec.icon}
                      style={{ fontSize: 16, color: "#21cdc0" }}
                    ></i>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>
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
              background: "#f8fafc",
              borderRadius: 16,
              padding: "60px 20px",
            }}
          >
            <i
              className="fas fa-hospital"
              style={{ fontSize: 40, color: "#d1d5db", marginBottom: 16 }}
            ></i>
            <p style={{ fontSize: 15, color: "#6b7280" }}>
              {t("facilitiesComingSoon")}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
