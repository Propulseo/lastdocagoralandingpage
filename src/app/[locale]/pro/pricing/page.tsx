"use client";

import { useState, type FormEvent } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";

export default function PricingPage() {
  const t = useTranslations("pro.pricingPage");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "60vh", padding: "80px 16px" }}
    >
      <div style={{ maxWidth: 600, width: "100%", textAlign: "center" }}>
        <h1
          className="fw-bold mb-3"
          style={{ color: "var(--color-navy)", fontSize: "2.25rem" }}
        >
          {t("title")}
        </h1>

        <p
          className="mb-4"
          style={{ color: "var(--color-dark-2)", fontSize: "1.1rem", lineHeight: 1.6 }}
        >
          {t("subtitle")}
        </p>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mx-auto" style={{ maxWidth: 420 }}>
            <div className="d-flex flex-column flex-sm-row gap-2 mb-3">
              <input
                type="email"
                required
                placeholder={t("emailPlaceholder")}
                className="form-control"
                style={{
                  flex: 1,
                  padding: "12px 16px",
                  borderRadius: 8,
                  border: "1px solid #ddd",
                  fontSize: "1rem",
                }}
              />
              <button
                type="submit"
                className="btn text-white fw-semibold"
                style={{
                  background: "linear-gradient(135deg, var(--color-navy), var(--color-cobalt))",
                  border: "none",
                  borderRadius: 8,
                  padding: "12px 24px",
                  fontSize: "1rem",
                  whiteSpace: "nowrap",
                }}
              >
                {t("cta")}
              </button>
            </div>
            <p className="text-muted" style={{ fontSize: "0.85rem" }}>
              {t("trustLine")}
            </p>
          </form>
        ) : (
          <p
            className="fw-semibold"
            style={{ color: "var(--color-cobalt)", fontSize: "1.1rem" }}
          >
            {t("thankYou")}
          </p>
        )}

        <div className="mt-4">
          <Link
            href="/pro"
            className="fw-medium"
            style={{ color: "var(--color-navy)", textDecoration: "underline" }}
          >
            {t("ctaBack")}
          </Link>
        </div>
      </div>
    </main>
  );
}
