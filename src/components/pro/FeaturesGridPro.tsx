"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

const PLATFORM_URL =
  process.env.NEXT_PUBLIC_PLATFORM_URL || "http://localhost:3001";

const FEATURES = [
  { key: "agenda", icon: "fas fa-calendar-alt" },
  { key: "patients", icon: "fas fa-user-friends" },
  { key: "booking", icon: "fas fa-mouse-pointer" },
  { key: "dashboard", icon: "fas fa-chart-bar" },
  { key: "multilingual", icon: "fas fa-globe-europe" },
  { key: "reminders", icon: "fas fa-bell" },
  { key: "profile", icon: "fas fa-id-badge" },
  { key: "documents", icon: "fas fa-file-medical" },
] as const;

/* ── Mockup components ─────────────────────────────────────── */

function MockupAgenda() {
  const days = ["Lun", "Mar", "Mer", "Jeu", "Ven"];
  const slots = [
    { day: 0, row: 0, label: "M. Silva", type: "consult" },
    { day: 0, row: 1, label: "Mme Dupont", type: "followup" },
    { day: 1, row: 0, label: "M. Santos", type: "consult" },
    { day: 1, row: 2, label: "Mme Alves", type: "new" },
    { day: 2, row: 0, label: "M. Moreau", type: "consult" },
    { day: 2, row: 1, label: "Mme Costa", type: "followup" },
    { day: 3, row: 1, label: "M. Ferreira", type: "new" },
    { day: 3, row: 2, label: "Mme Leroy", type: "consult" },
    { day: 4, row: 0, label: "M. Oliveira", type: "consult" },
    { day: 4, row: 2, label: "Mme Martin", type: "followup" },
  ];
  const typeColors: Record<string, string> = {
    consult: "rgba(103,203,199,0.15)",
    followup: "rgba(74,124,199,0.12)",
    new: "rgba(111,66,193,0.12)",
  };
  const typeBorders: Record<string, string> = {
    consult: "rgba(103,203,199,0.4)",
    followup: "rgba(74,124,199,0.3)",
    new: "rgba(111,66,193,0.3)",
  };
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {days.map((d) => (
          <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 1 }}>{d}</div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 6 }}>
        {days.map((_, di) => (
          <div key={di} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
            {[0, 1, 2].map((ri) => {
              const slot = slots.find((s) => s.day === di && s.row === ri);
              return slot ? (
                <div key={ri} style={{ background: typeColors[slot.type], borderLeft: `3px solid ${typeBorders[slot.type]}`, borderRadius: 6, padding: "8px 6px", fontSize: 10, color: "rgba(255,255,255,0.7)", fontWeight: 600, lineHeight: 1.4 }}>
                  {slot.label}
                </div>
              ) : (
                <div key={ri} style={{ background: "rgba(255,255,255,0.02)", borderRadius: 6, padding: "8px 6px", minHeight: 36, border: "1px dashed rgba(255,255,255,0.04)" }} />
              );
            })}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: 16, marginTop: 16, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        {[
          { color: "rgba(103,203,199,0.4)", label: "Consultation" },
          { color: "rgba(74,124,199,0.3)", label: "Suivi" },
          { color: "rgba(111,66,193,0.3)", label: "Nouveau" },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 10, color: "rgba(255,255,255,0.35)" }}>
            <span style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupPatients() {
  const patients = [
    { initials: "AS", name: "Ana Silva", info: "42 ans · Suivi cardio", tag: "Prochain: Demain 10h", active: true },
    { initials: "PD", name: "Pierre Dupont", info: "35 ans · Bilan annuel", tag: "Vu il y a 3 jours", active: false },
    { initials: "MC", name: "Maria Costa", info: "58 ans · Diabète T2", tag: "Prochain: Vendredi", active: false },
  ];
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
        <i className="fas fa-search" style={{ color: "var(--color-accent)", fontSize: 13 }}></i>
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>Rechercher un patient...</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {patients.map((p) => (
          <div key={p.initials} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px",
            borderRadius: 12, background: p.active ? "rgba(103,203,199,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${p.active ? "rgba(103,203,199,0.2)" : "rgba(255,255,255,0.05)"}`,
          }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "linear-gradient(135deg, var(--color-accent), var(--color-navy))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 12, flexShrink: 0 }}>{p.initials}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 14 }}>{p.name}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{p.info}</div>
            </div>
            <span style={{ fontSize: 10, fontWeight: 600, color: p.active ? "var(--color-accent)" : "rgba(255,255,255,0.3)", background: p.active ? "rgba(103,203,199,0.1)" : "rgba(255,255,255,0.04)", padding: "4px 10px", borderRadius: 6, whiteSpace: "nowrap" }}>{p.tag}</span>
          </div>
        ))}
      </div>
      <div className="mk-result-count" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 14 }}>
        <span className="mk-result-dot"></span> <strong style={{ color: "rgba(255,255,255,0.7)" }}>127</strong> patients
      </div>
    </div>
  );
}

function MockupBooking() {
  return (
    <div className="mk-inner">
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>Vue patient</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>Vos patients réservent en ligne, 24h/24</div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, color: "#fff", fontSize: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, var(--color-accent), var(--color-navy))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>Vous</div>
          <div><strong>Votre profil DocAgora</strong><br /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>Visible publiquement</span></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
          {["09:00", "10:30", "14:00", "15:30", "16:00", "17:00"].map((t, i) => (
            <span key={t} style={{
              textAlign: "center", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: i === 2 ? "rgba(103,203,199,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === 2 ? "var(--color-accent)" : "rgba(255,255,255,0.06)"}`,
              color: i === 2 ? "var(--color-accent)" : "rgba(255,255,255,0.5)",
            }}>{t}</span>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg, #67CBC7, #5AA2AA)", color: "#fff", textAlign: "center", padding: 12, borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: "0 4px 16px rgba(103,203,199,0.25)" }}>
          Confirmer le rendez-vous
        </div>
      </div>
    </div>
  );
}

function MockupDashboard() {
  const stats = [
    { label: "Cette semaine", value: "24", sub: "rendez-vous", color: "var(--color-accent)" },
    { label: "Taux présence", value: "96%", sub: "+4% vs mois dernier", color: "var(--color-cobalt)" },
    { label: "Satisfaction", value: "4.8", sub: "sur 5.0", color: "#6f42c1" },
  ];
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        {stats.map((s) => (
          <div key={s.label} style={{ flex: 1, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "16px 12px", textAlign: "center" }}>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color, marginBottom: 4 }}>{s.value}</div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 600 }}>{s.label}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginTop: 2 }}>{s.sub}</div>
          </div>
        ))}
      </div>
      {/* Mini bar chart */}
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>Rendez-vous cette semaine</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
          {[60, 80, 45, 90, 70].map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: "100%", height: h, borderRadius: 6, background: i === 3 ? "linear-gradient(180deg, #67CBC7, rgba(103,203,199,0.3))" : "rgba(255,255,255,0.06)", transition: "height 0.3s" }} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{["L", "M", "Me", "J", "V"][i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupMultilingual() {
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {[
          { flag: "\u{1F1F5}\u{1F1F9}", lang: "Português", desc: "Interface + fiche patient", active: true },
          { flag: "\u{1F1EB}\u{1F1F7}", lang: "Français", desc: "Interface + fiche patient", active: false },
          { flag: "\u{1F1EC}\u{1F1E7}", lang: "English", desc: "Interface + fiche patient", active: false },
        ].map((l) => (
          <div key={l.lang} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12,
            background: l.active ? "rgba(103,203,199,0.05)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${l.active ? "rgba(103,203,199,0.25)" : "rgba(255,255,255,0.05)"}`,
            color: "#fff", fontSize: 14,
          }}>
            <span style={{ fontSize: 24 }}>{l.flag}</span>
            <div style={{ flex: 1 }}><strong>{l.lang}</strong><br /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{l.desc}</span></div>
            {l.active && <i className="fas fa-check-circle" style={{ color: "var(--color-accent)" }}></i>}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <i className="fas fa-info-circle" style={{ color: "var(--color-accent)", fontSize: 12 }}></i>
        Vos patients voient le site dans leur langue
      </div>
    </div>
  );
}

function MockupReminders() {
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { icon: "fas fa-bell", color: "var(--color-accent)", title: "Rappel envoyé automatiquement", desc: "M. Silva · Demain 10h30", time: "Il y a 1h", highlight: true },
          { icon: "fas fa-check-circle", color: "#28c840", title: "Rendez-vous confirmé", desc: "Mme Dupont a confirmé sa présence", time: "Il y a 3h", highlight: false },
          { icon: "fas fa-envelope", color: "var(--color-cobalt)", title: "Rappel SMS J-1 programmé", desc: "3 patients · Envoi demain 8h", time: "Planifié", highlight: false },
          { icon: "fas fa-chart-line", color: "#6f42c1", title: "Taux de no-show réduit", desc: "-40% depuis l'activation des rappels", time: "Ce mois", highlight: false },
        ].map((n) => (
          <div key={n.title} style={{
            display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 12,
            background: n.highlight ? "rgba(103,203,199,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${n.highlight ? "rgba(103,203,199,0.2)" : "rgba(255,255,255,0.05)"}`,
            color: "#fff", fontSize: 13, position: "relative",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={n.icon} style={{ color: n.color, fontSize: 14 }}></i>
            </div>
            <div style={{ flex: 1 }}>
              <strong>{n.title}</strong><br />
              <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{n.desc}</span>
            </div>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", whiteSpace: "nowrap" }}>{n.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupProfile() {
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, color: "#fff", fontSize: 15 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--color-accent), var(--color-navy))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>Vous</div>
        <div>
          <strong>Dr. Votre Nom</strong>
          <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(103,203,199,0.12)", color: "var(--color-accent)", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, marginLeft: 8 }}>
            <i className="fas fa-shield-alt" style={{ fontSize: 9, marginRight: 3 }}></i>Vérifié
          </span>
          <br /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>Votre spécialité · Votre ville</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        {[
          { val: "4.9", label: "Note" },
          { val: "PT FR EN", label: "Langues" },
          { val: "En ligne", label: "Statut" },
        ].map((s, i) => (
          <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "16px 10px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{s.val}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "fas fa-graduation-cap", text: "Votre formation" },
          { icon: "fas fa-certificate", text: "Ordem dos Médicos — N° licence" },
        ].map((c) => (
          <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <i className={c.icon} style={{ color: "var(--color-accent)", fontSize: 11 }}></i> {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupDocuments() {
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "fas fa-file-medical-alt", name: "Compte-rendu consultation", patient: "M. Silva", date: "Aujourd'hui", status: "new" },
          { icon: "fas fa-file-prescription", name: "Ordonnance", patient: "Mme Dupont", date: "Hier", status: "sent" },
          { icon: "fas fa-file-alt", name: "Certificat médical", patient: "M. Santos", date: "12 mai", status: "sent" },
          { icon: "fas fa-notes-medical", name: "Notes de consultation", patient: "Mme Costa", date: "10 mai", status: "draft" },
        ].map((d) => (
          <div key={d.name + d.patient} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12,
            background: d.status === "new" ? "rgba(103,203,199,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${d.status === "new" ? "rgba(103,203,199,0.15)" : "rgba(255,255,255,0.05)"}`,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={d.icon} style={{ color: d.status === "new" ? "var(--color-accent)" : "var(--color-cobalt)", fontSize: 14 }}></i>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ color: "#fff", fontWeight: 600, fontSize: 13 }}>{d.name}</div>
              <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{d.patient}</div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{d.date}</div>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 4, marginTop: 2, display: "inline-block",
                background: d.status === "new" ? "rgba(103,203,199,0.1)" : d.status === "draft" ? "rgba(255,189,46,0.1)" : "rgba(255,255,255,0.04)",
                color: d.status === "new" ? "var(--color-accent)" : d.status === "draft" ? "#ffbd2e" : "rgba(255,255,255,0.3)",
              }}>{d.status === "new" ? "Nouveau" : d.status === "draft" ? "Brouillon" : "Envoyé"}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <i className="fas fa-lock" style={{ color: "var(--color-accent)", fontSize: 11 }}></i>
        Stockage sécurisé · Chiffrement de bout en bout
      </div>
    </div>
  );
}

const MOCKUPS: Record<string, () => React.JSX.Element> = {
  agenda: MockupAgenda,
  patients: MockupPatients,
  booking: MockupBooking,
  dashboard: MockupDashboard,
  multilingual: MockupMultilingual,
  reminders: MockupReminders,
  profile: MockupProfile,
  documents: MockupDocuments,
};

/* ── Main component ─────────────────────────────────────────── */

export default function FeaturesGridPro() {
  const t = useTranslations("pro.featuresGrid");
  const [active, setActive] = useState(0);
  const ActiveMockup = MOCKUPS[FEATURES[active].key];

  return (
    <section className="ft-showcase">
      <style>{`
        /* ===== SECTION ===== */
        .ft-showcase {
          position: relative;
          padding: 120px 0;
          background: linear-gradient(170deg, #070C16 0%, #0C121E 35%, #244882 70%, #070C16 100%);
          overflow: clip;
        }
        .ft-showcase::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse 800px 600px at 20% 20%, rgba(103,203,199,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 600px 800px at 80% 80%, rgba(74,124,199,0.08) 0%, transparent 100%);
          pointer-events: none;
          z-index: 0;
        }
        .ft-showcase::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* ===== HEADER ===== */
        .ft-showcase .ft-header {
          text-align: center;
          max-width: 700px;
          margin: 0 auto 72px;
          position: relative;
          z-index: 1;
        }
        .ft-showcase .ft-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(103,203,199,0.08);
          border: 1px solid rgba(103,203,199,0.18);
          border-radius: 50px;
          padding: 7px 22px;
          font-size: 12px;
          font-weight: 700;
          color: #67CBC7;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 28px;
        }
        .ft-showcase .ft-title {
          font-size: 42px;
          font-weight: 700;
          color: #fff;
          line-height: 1.15;
          margin-bottom: 20px;
        }
        .ft-showcase .ft-subtitle {
          font-size: 17px;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin: 0;
        }

        /* ===== SPLIT LAYOUT ===== */
        .ft-showcase .ft-split {
          display: flex;
          gap: 56px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        /* ===== MOCKUP (LEFT) ===== */
        .ft-showcase .ft-mockup-wrap {
          flex: 0 0 55%;
          max-width: 55%;
          position: sticky;
          top: 120px;
        }
        .ft-showcase .ft-device {
          background: #0C121E;
          border-radius: 20px;
          border: 1px solid rgba(255,255,255,0.06);
          box-shadow:
            0 4px 24px rgba(0,0,0,0.4),
            0 40px 80px rgba(0,0,0,0.3),
            inset 0 1px 0 rgba(255,255,255,0.04);
          overflow: hidden;
        }
        .ft-showcase .ft-device__bar {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 14px 20px;
          background: rgba(255,255,255,0.02);
          border-bottom: 1px solid rgba(255,255,255,0.04);
        }
        .ft-showcase .ft-dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
        }
        .ft-showcase .ft-dot:first-child { background: #ff5f57; }
        .ft-showcase .ft-dot:nth-child(2) { background: #ffbd2e; }
        .ft-showcase .ft-dot:nth-child(3) { background: #28c840; }
        .ft-showcase .ft-device__url {
          margin-left: 16px;
          font-size: 12px;
          color: rgba(255,255,255,0.25);
          font-family: monospace;
        }
        .ft-showcase .ft-device__body {
          padding: 32px 28px;
          min-height: 420px;
          position: relative;
        }

        /* ===== MOCKUP INTERNALS ===== */
        .mk-inner {
          animation: mkFadeIn 0.4s ease;
        }
        @keyframes mkFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .mk-result-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #67CBC7; display: inline-block;
          animation: mkPulse 2s infinite;
        }
        @keyframes mkPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* ===== FEATURE LIST (RIGHT) ===== */
        .ft-showcase .ft-list-wrap {
          flex: 1;
          min-width: 0;
        }
        .ft-showcase .ft-item {
          position: relative;
          padding: 20px 20px 20px 24px;
          border-left: 2px solid rgba(255,255,255,0.06);
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .ft-showcase .ft-item:hover {
          background: rgba(255,255,255,0.02);
        }
        .ft-showcase .ft-item--active {
          border-left-color: #67CBC7;
          background: rgba(103,203,199,0.04);
        }
        .ft-showcase .ft-item__head {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .ft-showcase .ft-item__num {
          font-size: 11px;
          font-weight: 700;
          color: rgba(255,255,255,0.15);
          letter-spacing: 1px;
          min-width: 22px;
          transition: color 0.3s;
        }
        .ft-showcase .ft-item--active .ft-item__num { color: #67CBC7; }
        .ft-showcase .ft-item__icon {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: rgba(255,255,255,0.04);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          color: rgba(255,255,255,0.3);
          transition: all 0.3s;
          flex-shrink: 0;
        }
        .ft-showcase .ft-item--active .ft-item__icon {
          background: rgba(103,203,199,0.1);
          color: #67CBC7;
        }
        .ft-showcase .ft-item__title {
          font-size: 15px;
          font-weight: 600;
          color: rgba(255,255,255,0.45);
          margin: 0;
          transition: color 0.3s;
        }
        .ft-showcase .ft-item--active .ft-item__title { color: #fff; }
        .ft-showcase .ft-item__desc {
          overflow: hidden;
          max-height: 0;
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          padding-left: 36px;
          font-size: 13px;
          line-height: 1.65;
          color: rgba(255,255,255,0.4);
        }
        .ft-showcase .ft-item--active .ft-item__desc {
          max-height: 80px;
          opacity: 1;
          margin-top: 12px;
        }

        /* ===== CTA ===== */
        .ft-showcase .ft-cta {
          text-align: center;
          margin-top: 72px;
          position: relative;
          z-index: 1;
        }
        .ft-showcase .ft-cta a {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 14px 36px;
          border-radius: 50px;
          border: 1px solid rgba(103,203,199,0.25);
          color: #67CBC7;
          font-size: 15px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s;
        }
        .ft-showcase .ft-cta a:hover {
          background: rgba(103,203,199,0.08);
          border-color: #67CBC7;
          box-shadow: 0 0 30px rgba(103,203,199,0.1);
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 991px) {
          .ft-showcase .ft-split { flex-direction: column; gap: 40px; }
          .ft-showcase .ft-mockup-wrap { flex: none; max-width: 100%; position: static; }
          .ft-showcase .ft-title { font-size: 32px; }
          .ft-showcase { padding: 80px 0; }
        }
        @media (max-width: 575px) {
          .ft-showcase .ft-title { font-size: 26px; }
          .ft-showcase .ft-device__body { padding: 20px 16px; min-height: 340px; }
        }
      `}</style>

      <div className="container">
        <div className="ft-header">
          <div className="ft-pill">
            <i className="fas fa-laptop-medical"></i> {t("pill")}
          </div>
          <h3 className="ft-title">{t("title")}</h3>
          <p className="ft-subtitle">{t("desc")}</p>
        </div>

        <div className="ft-split">
          <div className="ft-mockup-wrap">
            <div className="ft-device">
              <div className="ft-device__bar">
                <span className="ft-dot"></span>
                <span className="ft-dot"></span>
                <span className="ft-dot"></span>
                <span className="ft-device__url">pro.docagora.com</span>
              </div>
              <div className="ft-device__body" key={active}>
                <ActiveMockup />
              </div>
            </div>
          </div>

          <div className="ft-list-wrap">
            {FEATURES.map(({ key, icon }, i) => (
              <div
                key={key}
                className={`ft-item${active === i ? " ft-item--active" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="ft-item__head">
                  <span className="ft-item__num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ft-item__icon"><i className={icon}></i></div>
                  <h4 className="ft-item__title">{t(`items.${key}.title`)}</h4>
                </div>
                <div className="ft-item__desc">{t(`items.${key}.desc`)}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-cta">
          <a href={`${PLATFORM_URL}/register?role=professional&utm_source=landing_pro`}>
            <span>{t("cta")}</span>
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
    </section>
  );
}
