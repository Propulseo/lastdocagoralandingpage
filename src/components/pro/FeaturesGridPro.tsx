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
  const t = useTranslations("pro");
  const days = [
    t("featuresGrid.mockups.days.mon"),
    t("featuresGrid.mockups.days.tue"),
    t("featuresGrid.mockups.days.wed"),
    t("featuresGrid.mockups.days.thu"),
    t("featuresGrid.mockups.days.fri"),
  ];
  const slots = [
    { day: 0, row: 0, label: t("featuresGrid.mockups.slots.patient1"), type: "consult" },
    { day: 0, row: 1, label: t("featuresGrid.mockups.slots.patient2"), type: "followup" },
    { day: 1, row: 0, label: t("featuresGrid.mockups.slots.patient3"), type: "consult" },
    { day: 1, row: 2, label: t("featuresGrid.mockups.slots.patient4"), type: "new" },
    { day: 2, row: 0, label: t("featuresGrid.mockups.slots.patient5"), type: "consult" },
    { day: 2, row: 1, label: t("featuresGrid.mockups.slots.patient6"), type: "followup" },
    { day: 3, row: 1, label: t("featuresGrid.mockups.slots.patient7"), type: "new" },
    { day: 3, row: 2, label: t("featuresGrid.mockups.slots.patient8"), type: "consult" },
    { day: 4, row: 0, label: t("featuresGrid.mockups.slots.patient9"), type: "consult" },
    { day: 4, row: 2, label: t("featuresGrid.mockups.slots.patient10"), type: "followup" },
  ];
  const typeColors: Record<string, string> = {
    consult: "rgba(103,203,199,0.15)",
    followup: "rgba(74,124,199,0.12)",
    new: "rgba(90,162,170,0.12)",
  };
  const typeBorders: Record<string, string> = {
    consult: "rgba(103,203,199,0.4)",
    followup: "rgba(74,124,199,0.3)",
    new: "rgba(90,162,170,0.3)",
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
          { color: "rgba(103,203,199,0.4)", label: t("featuresGrid.mockups.agenda.consultation") },
          { color: "rgba(74,124,199,0.3)", label: t("featuresGrid.mockups.agenda.followup") },
          { color: "rgba(90,162,170,0.3)", label: t("featuresGrid.mockups.agenda.new") },
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
  const t = useTranslations("pro");
  const patients = [
    { initials: t("featuresGrid.mockups.patients.patient1.initials"), name: t("featuresGrid.mockups.patients.patient1.name"), info: t("featuresGrid.mockups.patients.patient1.info"), tag: t("featuresGrid.mockups.patients.patient1.tag"), active: true },
    { initials: t("featuresGrid.mockups.patients.patient2.initials"), name: t("featuresGrid.mockups.patients.patient2.name"), info: t("featuresGrid.mockups.patients.patient2.info"), tag: t("featuresGrid.mockups.patients.patient2.tag"), active: false },
    { initials: t("featuresGrid.mockups.patients.patient3.initials"), name: t("featuresGrid.mockups.patients.patient3.name"), info: t("featuresGrid.mockups.patients.patient3.info"), tag: t("featuresGrid.mockups.patients.patient3.tag"), active: false },
  ];
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", alignItems: "center", gap: 12, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
        <i className="fas fa-search" style={{ color: "var(--color-accent)", fontSize: 13 }} />
        <span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>{t("featuresGrid.mockups.patients.search")}</span>
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
        <span className="mk-result-dot" /> <strong style={{ color: "rgba(255,255,255,0.7)" }}>127</strong> {t("featuresGrid.mockups.patients.patientsLabel")}
      </div>
    </div>
  );
}

function MockupBooking() {
  const t = useTranslations("pro");
  return (
    <div className="mk-inner">
      <div style={{ textAlign: "center", marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: 2, marginBottom: 6 }}>{t("featuresGrid.mockups.booking.patientView")}</div>
        <div style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{t("featuresGrid.mockups.booking.subtitle")}</div>
      </div>
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 14, padding: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18, color: "#fff", fontSize: 14 }}>
          <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg, var(--color-accent), var(--color-navy))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{t("featuresGrid.mockups.booking.you")}</div>
          <div><strong>{t("featuresGrid.mockups.booking.yourProfile")}</strong><br /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{t("featuresGrid.mockups.booking.publiclyVisible")}</span></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 8, marginBottom: 16 }}>
          {["09:00", "10:30", "14:00", "15:30", "16:00", "17:00"].map((time, i) => (
            <span key={time} style={{
              textAlign: "center", padding: "10px 0", borderRadius: 8, fontSize: 13, fontWeight: 600,
              background: i === 2 ? "rgba(103,203,199,0.12)" : "rgba(255,255,255,0.04)",
              border: `1px solid ${i === 2 ? "var(--color-accent)" : "rgba(255,255,255,0.06)"}`,
              color: i === 2 ? "var(--color-accent)" : "rgba(255,255,255,0.5)",
            }}>{time}</span>
          ))}
        </div>
        <div style={{ background: "linear-gradient(135deg, #67CBC7, #5AA2AA)", color: "#fff", textAlign: "center", padding: 12, borderRadius: 10, fontWeight: 700, fontSize: 14, boxShadow: "0 4px 16px rgba(103,203,199,0.25)" }}>
          {t("featuresGrid.mockups.booking.confirmBooking")}
        </div>
      </div>
    </div>
  );
}

function MockupDashboard() {
  const t = useTranslations("pro");
  const stats = [
    { label: t("featuresGrid.mockups.dashboard.thisWeek"), value: "24", sub: t("featuresGrid.mockups.dashboard.appointments"), color: "var(--color-accent)" },
    { label: t("featuresGrid.mockups.dashboard.attendanceRate"), value: "96%", sub: t("featuresGrid.mockups.dashboard.vsLastMonth"), color: "var(--color-cobalt)" },
    { label: t("featuresGrid.mockups.dashboard.satisfaction"), value: "4.8", sub: t("featuresGrid.mockups.dashboard.outOf"), color: "var(--color-mint)" },
  ];
  const dayLabels = [
    t("featuresGrid.mockups.dashboard.dayMon"),
    t("featuresGrid.mockups.dashboard.dayTue"),
    t("featuresGrid.mockups.dashboard.dayWed"),
    t("featuresGrid.mockups.dashboard.dayThu"),
    t("featuresGrid.mockups.dashboard.dayFri"),
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
      <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 12, padding: "18px 16px" }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: 14 }}>{t("featuresGrid.mockups.dashboard.weeklyAppointments")}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 80 }}>
          {[60, 80, 45, 90, 70].map((h, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <div style={{ width: "100%", height: h, borderRadius: 6, background: i === 3 ? "linear-gradient(180deg, #67CBC7, rgba(103,203,199,0.3))" : "rgba(255,255,255,0.06)", transition: "height 0.3s" }} />
              <span style={{ fontSize: 10, color: "rgba(255,255,255,0.25)" }}>{dayLabels[i]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MockupMultilingual() {
  const t = useTranslations("pro");
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {[
          { flag: "\u{1F1F5}\u{1F1F9}", lang: "Portugu\u00EAs", desc: t("featuresGrid.mockups.multilingual.interfacePatient"), active: true },
          { flag: "\u{1F1EB}\u{1F1F7}", lang: "Fran\u00E7ais", desc: t("featuresGrid.mockups.multilingual.interfacePatient"), active: false },
          { flag: "\u{1F1EC}\u{1F1E7}", lang: "English", desc: t("featuresGrid.mockups.multilingual.interfacePatient"), active: false },
        ].map((l) => (
          <div key={l.lang} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12,
            background: l.active ? "rgba(103,203,199,0.05)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${l.active ? "rgba(103,203,199,0.25)" : "rgba(255,255,255,0.05)"}`,
            color: "#fff", fontSize: 14,
          }}>
            <span style={{ fontSize: 24 }}>{l.flag}</span>
            <div style={{ flex: 1 }}><strong>{l.lang}</strong><br /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 12 }}>{l.desc}</span></div>
            {l.active && <i className="fas fa-check-circle" style={{ color: "var(--color-accent)" }} />}
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "rgba(255,255,255,0.5)", paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <i className="fas fa-info-circle" style={{ color: "var(--color-accent)", fontSize: 12 }} />
        {t("featuresGrid.mockups.multilingual.patientsSeeSite")}
      </div>
    </div>
  );
}

function MockupReminders() {
  const t = useTranslations("pro");
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {[
          { icon: "fas fa-bell", color: "var(--color-accent)", title: t("featuresGrid.mockups.reminders.autoReminderSent"), desc: t("featuresGrid.mockups.reminders.reminderDesc"), time: t("featuresGrid.mockups.reminders.oneHourAgo"), highlight: true },
          { icon: "fas fa-check-circle", color: "#28c840", title: t("featuresGrid.mockups.reminders.appointmentConfirmed"), desc: t("featuresGrid.mockups.reminders.confirmedDesc"), time: t("featuresGrid.mockups.reminders.threeHoursAgo"), highlight: false },
          { icon: "fas fa-envelope", color: "var(--color-cobalt)", title: t("featuresGrid.mockups.reminders.smsReminder"), desc: t("featuresGrid.mockups.reminders.smsDesc"), time: t("featuresGrid.mockups.reminders.scheduled"), highlight: false },
          { icon: "fas fa-chart-line", color: "var(--color-mint)", title: t("featuresGrid.mockups.reminders.noShowReduced"), desc: t("featuresGrid.mockups.reminders.noShowDesc"), time: t("featuresGrid.mockups.reminders.thisMonth"), highlight: false },
        ].map((n) => (
          <div key={n.title} style={{
            display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", borderRadius: 12,
            background: n.highlight ? "rgba(103,203,199,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${n.highlight ? "rgba(103,203,199,0.2)" : "rgba(255,255,255,0.05)"}`,
            color: "#fff", fontSize: 13, position: "relative",
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={n.icon} style={{ color: n.color, fontSize: 14 }} />
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
  const t = useTranslations("pro");
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, color: "#fff", fontSize: 15 }}>
        <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, var(--color-accent), var(--color-navy))", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 16, flexShrink: 0 }}>{t("featuresGrid.mockups.profile.you")}</div>
        <div>
          <strong>{t("featuresGrid.mockups.profile.yourName")}</strong>
          <span style={{ display: "inline-flex", alignItems: "center", background: "rgba(103,203,199,0.12)", color: "var(--color-accent)", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 6, marginLeft: 8 }}>
            <i className="fas fa-shield-alt" style={{ fontSize: 9, marginRight: 3 }} />{t("featuresGrid.mockups.profile.verified")}
          </span>
          <br /><span style={{ color: "rgba(255,255,255,0.35)", fontSize: 13 }}>{t("featuresGrid.mockups.profile.yourSpecialty")}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 0, marginBottom: 20, background: "rgba(255,255,255,0.03)", borderRadius: 12, border: "1px solid rgba(255,255,255,0.06)", overflow: "hidden" }}>
        {[
          { val: "4.9", label: t("featuresGrid.mockups.profile.rating") },
          { val: "PT FR EN", label: t("featuresGrid.mockups.profile.languages") },
          { val: t("featuresGrid.mockups.profile.online"), label: t("featuresGrid.mockups.profile.status") },
        ].map((s, i) => (
          <div key={s.label} style={{ flex: 1, textAlign: "center", padding: "16px 10px", borderRight: i < 2 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 16 }}>{s.val}</div>
            <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 11 }}>{s.label}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "fas fa-graduation-cap", text: t("featuresGrid.mockups.profile.yourTraining") },
          { icon: "fas fa-certificate", text: t("featuresGrid.mockups.profile.medicalLicense") },
        ].map((c) => (
          <div key={c.text} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
            <i className={c.icon} style={{ color: "var(--color-accent)", fontSize: 11 }} /> {c.text}
          </div>
        ))}
      </div>
    </div>
  );
}

function MockupDocuments() {
  const t = useTranslations("pro");
  return (
    <div className="mk-inner">
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {[
          { icon: "fas fa-file-medical-alt", name: t("featuresGrid.mockups.documents.consultReport"), patient: t("featuresGrid.mockups.documents.patient1"), date: t("featuresGrid.mockups.documents.today"), status: "new" },
          { icon: "fas fa-file-prescription", name: t("featuresGrid.mockups.documents.prescription"), patient: t("featuresGrid.mockups.documents.patient2"), date: t("featuresGrid.mockups.documents.yesterday"), status: "sent" },
          { icon: "fas fa-file-alt", name: t("featuresGrid.mockups.documents.medicalCertificate"), patient: t("featuresGrid.mockups.documents.patient3"), date: t("featuresGrid.mockups.documents.may12"), status: "sent" },
          { icon: "fas fa-notes-medical", name: t("featuresGrid.mockups.documents.consultNotes"), patient: t("featuresGrid.mockups.documents.patient4"), date: t("featuresGrid.mockups.documents.may10"), status: "draft" },
        ].map((d) => (
          <div key={d.name + d.patient} style={{
            display: "flex", alignItems: "center", gap: 14, padding: "14px 16px", borderRadius: 12,
            background: d.status === "new" ? "rgba(103,203,199,0.04)" : "rgba(255,255,255,0.03)",
            border: `1px solid ${d.status === "new" ? "rgba(103,203,199,0.15)" : "rgba(255,255,255,0.05)"}`,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <i className={d.icon} style={{ color: d.status === "new" ? "var(--color-accent)" : "var(--color-cobalt)", fontSize: 14 }} />
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
              }}>{d.status === "new" ? t("featuresGrid.mockups.documents.statusNew") : d.status === "draft" ? t("featuresGrid.mockups.documents.statusDraft") : t("featuresGrid.mockups.documents.statusSent")}</span>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "rgba(255,255,255,0.35)", marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <i className="fas fa-lock" style={{ color: "var(--color-accent)", fontSize: 11 }} />
        {t("featuresGrid.mockups.documents.secureStorage")}
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
        /* ===== SECTION — gradient transition from light to dark ===== */
        .ft-showcase {
          position: relative;
          padding: 120px 0;
          background: linear-gradient(to bottom, var(--color-light-1) 0px, var(--color-dark-1) 120px);
          overflow: clip;
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
          background: rgba(var(--color-cobalt-rgb),0.08);
          border: 1px solid rgba(var(--color-cobalt-rgb),0.18);
          border-radius: 50px;
          padding: 7px 22px;
          font-size: 12px;
          font-weight: 700;
          color: var(--color-pro-accent);
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 28px;
        }
        .ft-showcase .ft-title {
          font-size: clamp(28px, 3.5vw, 40px);
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

        /* ===== SPLIT LAYOUT — 60/40 ===== */
        .ft-showcase .ft-split {
          display: flex;
          gap: 64px;
          align-items: flex-start;
          position: relative;
          z-index: 1;
        }

        /* ===== MOCKUP (LEFT) — 60% ===== */
        .ft-showcase .ft-mockup-wrap {
          flex: 0 0 58%;
          max-width: 58%;
          position: sticky;
          top: 120px;
        }
        .ft-showcase .ft-device {
          background: var(--color-dark-2);
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
          background: var(--color-pro-accent); display: inline-block;
          animation: mkPulse 2s infinite;
        }
        @keyframes mkPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        @media (prefers-reduced-motion: reduce) {
          .mk-inner { animation: none; }
          .mk-result-dot { animation: none; }
        }

        /* ===== FEATURE LIST (RIGHT) — 40% ===== */
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
          border-left-color: var(--color-teal);
          background: rgba(var(--color-cobalt-rgb),0.04);
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
        .ft-showcase .ft-item--active .ft-item__num { color: var(--color-teal); }
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
          background: rgba(var(--color-teal-rgb),0.1);
          color: var(--color-teal);
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

        /* ===== CTA — primary Teal filled ===== */
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
          padding: 16px 32px;
          border-radius: 8px;
          background: var(--color-teal);
          color: var(--color-dark-1) !important;
          font-size: 16px;
          font-weight: 600;
          text-decoration: none !important;
          transition: all 0.2s ease;
          box-shadow: 0 4px 16px rgba(var(--color-teal-rgb), 0.3);
        }
        .ft-showcase .ft-cta a:hover {
          background: var(--color-mint);
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(var(--color-teal-rgb), 0.4);
          color: var(--color-dark-1) !important;
        }

        /* ===== RESPONSIVE ===== */
        @media (max-width: 991px) {
          .ft-showcase .ft-split { flex-direction: column; gap: 40px; }
          .ft-showcase .ft-mockup-wrap { flex: none; max-width: 100%; position: static; }
          .ft-showcase { padding: 64px 0; background: linear-gradient(to bottom, var(--color-light-1) 0px, var(--color-dark-1) 80px); }
        }
        @media (max-width: 575px) {
          .ft-showcase .ft-device__body { padding: 20px 16px; min-height: 340px; }
        }
      `}</style>

      <div className="container-landing">
        <div className="ft-header">
          <div className="ft-pill">
            <i className="fas fa-laptop-medical" /> {t("pill")}
          </div>
          <h2 className="ft-title">{t("title")}</h2>
          <p className="ft-subtitle">{t("desc")}</p>
        </div>

        <div className="ft-split">
          <div className="ft-mockup-wrap">
            <div className="ft-device">
              <div className="ft-device__bar">
                <span className="ft-dot" />
                <span className="ft-dot" />
                <span className="ft-dot" />
                <span className="ft-device__url">pro.docagora.com</span>
              </div>
              <div className="ft-device__body" key={active}>
                <ActiveMockup />
              </div>
            </div>
          </div>

          <div className="ft-list-wrap" aria-label={t("title")} role="list">
            {FEATURES.map(({ key, icon }, i) => (
              <div
                key={key}
                className={`ft-item${active === i ? " ft-item--active" : ""}`}
                role="button"
                tabIndex={0}
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setActive(i);
                  }
                }}
              >
                <div className="ft-item__head">
                  <span className="ft-item__num">{String(i + 1).padStart(2, "0")}</span>
                  <div className="ft-item__icon"><i className={icon} /></div>
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
            <i className="fas fa-arrow-right" />
          </a>
        </div>
      </div>
    </section>
  );
}
