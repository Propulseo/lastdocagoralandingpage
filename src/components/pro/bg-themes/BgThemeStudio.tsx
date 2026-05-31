"use client";

// TEMPORARY background-selection tool.
// Wraps the whole pro landing in <div class="pro-bg-root" data-bg="...">, injects
// the 3 harmonization themes (only the active one matches via [data-bg]), and shows
// a floating panel to switch sombre / clair / mixte live. Once Étienne picks one,
// the chosen theme gets baked in and this studio + the other themes are removed.

import { useState, type ReactNode } from "react";
import { BG_SOMBRE } from "./sombre";
import { BG_CLAIR } from "./clair";
import { BG_MIXTE } from "./mixte";

type BgTheme = "clair" | "mixte" | "sombre";

const OPTIONS: { key: BgTheme; label: string }[] = [
  { key: "clair", label: "Clair" },
  { key: "mixte", label: "Mixte" },
  { key: "sombre", label: "Sombre" },
];

export function BgThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<BgTheme>("clair");
  const [open, setOpen] = useState(true);

  return (
    <div className="pro-bg-root" data-bg={theme}>
      <style>{BG_SOMBRE}</style>
      <style>{BG_CLAIR}</style>
      <style>{BG_MIXTE}</style>

      {children}

      <div
        style={{
          position: "fixed",
          right: 20,
          bottom: 20,
          zIndex: 9999,
          fontFamily: "var(--font-montserrat), system-ui, sans-serif",
        }}
      >
        {open ? (
          <div
            style={{
              background: "rgba(12,18,30,0.94)",
              backdropFilter: "blur(14px)",
              WebkitBackdropFilter: "blur(14px)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 16,
              boxShadow: "0 24px 60px rgba(0,0,0,0.45)",
              padding: 16,
              color: "#fff",
              width: 248,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: 1,
                  textTransform: "uppercase",
                }}
              >
                <i
                  className="fas fa-fill-drip"
                  style={{ marginRight: 8, color: "var(--color-teal)" }}
                  aria-hidden="true"
                />
                Fond de page
              </span>
              <button
                type="button"
                aria-label="Réduire le sélecteur de fond"
                onClick={() => setOpen(false)}
                style={{
                  border: "none",
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.8)",
                  width: 26,
                  height: 26,
                  borderRadius: 8,
                  cursor: "pointer",
                  fontSize: 12,
                }}
              >
                <i className="fas fa-minus" aria-hidden="true" />
              </button>
            </div>

            <div style={{ display: "flex", gap: 6 }}>
              {OPTIONS.map((opt) => {
                const active = theme === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setTheme(opt.key)}
                    style={{
                      flex: 1,
                      border: active
                        ? "1px solid var(--color-teal)"
                        : "1px solid rgba(255,255,255,0.12)",
                      background: active ? "var(--color-teal)" : "rgba(255,255,255,0.05)",
                      color: active ? "var(--color-dark-1)" : "rgba(255,255,255,0.85)",
                      borderRadius: 9,
                      padding: "9px 4px",
                      fontSize: 12,
                      fontWeight: 600,
                      cursor: "pointer",
                      transition: "all 0.18s ease",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <button
            type="button"
            aria-label="Ouvrir le sélecteur de fond"
            onClick={() => setOpen(true)}
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(12,18,30,0.94)",
              color: "var(--color-teal)",
              boxShadow: "0 16px 40px rgba(0,0,0,0.4)",
              cursor: "pointer",
              fontSize: 18,
            }}
          >
            <i className="fas fa-fill-drip" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  );
}
