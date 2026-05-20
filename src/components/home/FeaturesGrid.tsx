"use client";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const FEATURES = [
  { key: "item1", icon: "icon-heart", mockup: "search" },
  { key: "item2", icon: "icon-doctor", mockup: "filter" },
  { key: "item3", icon: "icon-ambulance", mockup: "map" },
  { key: "item4", icon: "icon-drugs", mockup: "booking" },
  { key: "item5", icon: "icon-first-aid-kit", mockup: "lang" },
  { key: "item6", icon: "icon-hospital", mockup: "profile" },
  { key: "item7", icon: "icon-expenses", mockup: "reviews" },
  { key: "item8", icon: "icon-bandage", mockup: "reminders" },
] as const;

const FEATURE_DESCS: Record<string, string> = {
  item1: "Natural language search powered by AI. Type symptoms, specialties or questions. Get matched instantly.",
  item2: "Filter by specialty, language spoken, distance, insurance accepted and patient ratings.",
  item3: "See all available professionals near you on an interactive map with real-time slots.",
  item4: "Describe your need, pick a professional, confirm your slot. Done in under 60 seconds.",
  item5: "Full platform available in Portuguese, French and English. Doctors who speak your language.",
  item6: "Every professional is credential-verified. Licenses, diplomas and reviews checked.",
  item7: "Transparent ratings on punctuality, communication, expertise and bedside manner.",
  item8: "SMS and email reminders before your appointment. Post-visit follow-up prompts.",
};

function MockupSearch() {
  return (
    <div className="mk-inner">
      <div className="mk-search">
        <div className="mk-search__bar">
          <i className="fas fa-search" style={{ color: "var(--color-accent)", fontSize: 14 }}></i>
          <span className="mk-search__text">I need a cardiologist who speaks French...</span>
          <span className="mk-search__cursor"></span>
        </div>
        <div className="mk-search__suggestions">
          <div className="mk-search__item mk-search__item--active">
            <i className="icon-heart" style={{ color: "var(--color-accent)", fontSize: 16 }}></i>
            <div><strong>Cardiology</strong><span className="mk-muted"> · 23 professionals available</span></div>
          </div>
          <div className="mk-search__item">
            <i className="icon-doctor" style={{ color: "var(--color-cobalt)", fontSize: 16 }}></i>
            <div><strong>Dr. Marie Dupont</strong><span className="mk-muted"> · Cardiologist · FR/PT/EN</span></div>
          </div>
          <div className="mk-search__item">
            <i className="icon-doctor" style={{ color: "var(--color-cobalt)", fontSize: 16 }}></i>
            <div><strong>Dr. Jean Moreau</strong><span className="mk-muted"> · Cardiologist · FR/EN</span></div>
          </div>
        </div>
      </div>
      <div className="mk-tag-row">
        <span className="mk-tag mk-tag--teal">AI-powered</span>
        <span className="mk-tag">Natural language</span>
        <span className="mk-tag">Instant results</span>
      </div>
    </div>
  );
}

function MockupFilter() {
  return (
    <div className="mk-inner">
      <div className="mk-filters">
        <div className="mk-filter-row">
          <span className="mk-chip mk-chip--active">Cardiology</span>
          <span className="mk-chip">Dermatology</span>
          <span className="mk-chip">Pediatrics</span>
          <span className="mk-chip mk-chip--more">+13</span>
        </div>
        <div className="mk-filter-row">
          <span className="mk-chip mk-chip--outline mk-chip--active"><i className="fas fa-check" style={{ fontSize: 9, marginRight: 4 }}></i>French</span>
          <span className="mk-chip mk-chip--outline">Portuguese</span>
          <span className="mk-chip mk-chip--outline">English</span>
        </div>
        <div className="mk-filter-row">
          <span className="mk-chip mk-chip--outline mk-chip--active"><i className="fas fa-check" style={{ fontSize: 9, marginRight: 4 }}></i>&lt; 10 km</span>
          <span className="mk-chip mk-chip--outline">Accepts ADSE</span>
          <span className="mk-chip mk-chip--outline">4+ stars</span>
        </div>
      </div>
      <div className="mk-result-count">
        <span className="mk-result-dot"></span> <strong>7 professionals</strong> match your criteria
      </div>
    </div>
  );
}

function MockupMap() {
  return (
    <div className="mk-inner">
      <div className="mk-map">
        <div className="mk-map__grid">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="mk-map__line"></div>
          ))}
        </div>
        <div className="mk-map__pin mk-map__pin--1"><i className="fas fa-map-marker-alt"></i></div>
        <div className="mk-map__pin mk-map__pin--2"><i className="fas fa-map-marker-alt"></i></div>
        <div className="mk-map__pin mk-map__pin--3 mk-map__pin--active">
          <i className="fas fa-map-marker-alt"></i>
          <div className="mk-map__tooltip">Dr. Silva · 0.8 km<br /><span className="mk-muted">Next slot: Today 14:30</span></div>
        </div>
        <div className="mk-map__pin mk-map__pin--4"><i className="fas fa-map-marker-alt"></i></div>
        <div className="mk-map__pin mk-map__pin--5"><i className="fas fa-map-marker-alt"></i></div>
      </div>
    </div>
  );
}

function MockupBooking() {
  return (
    <div className="mk-inner">
      <div className="mk-steps">
        <div className="mk-step mk-step--done"><span className="mk-step__num"><i className="fas fa-check" style={{ fontSize: 10 }}></i></span><span>Your need</span></div>
        <div className="mk-step__line mk-step__line--done"></div>
        <div className="mk-step mk-step--done"><span className="mk-step__num"><i className="fas fa-check" style={{ fontSize: 10 }}></i></span><span>Choose doctor</span></div>
        <div className="mk-step__line mk-step__line--active"></div>
        <div className="mk-step mk-step--active"><span className="mk-step__num">3</span><span>Confirm</span></div>
      </div>
      <div className="mk-booking-card">
        <div className="mk-booking-doc">
          <div className="mk-avatar">MD</div>
          <div><strong>Dr. Marie Dupont</strong><br /><span className="mk-muted">Cardiologist · Lisbon</span></div>
        </div>
        <div className="mk-slot-grid">
          <span className="mk-slot">09:00</span>
          <span className="mk-slot">10:30</span>
          <span className="mk-slot mk-slot--selected">14:30</span>
          <span className="mk-slot">16:00</span>
        </div>
        <div className="mk-confirm-btn">Confirm appointment</div>
      </div>
    </div>
  );
}

function MockupLang() {
  return (
    <div className="mk-inner">
      <div className="mk-lang">
        <div className="mk-lang__item mk-lang__item--active">
          <span className="mk-flag">🇵🇹</span>
          <div><strong>Português</strong><span className="mk-muted"> · Interface & doctors</span></div>
          <i className="fas fa-check-circle" style={{ color: "var(--color-accent)", marginLeft: "auto" }}></i>
        </div>
        <div className="mk-lang__item">
          <span className="mk-flag">🇫🇷</span>
          <div><strong>Français</strong><span className="mk-muted"> · Interface & doctors</span></div>
        </div>
        <div className="mk-lang__item">
          <span className="mk-flag">🇬🇧</span>
          <div><strong>English</strong><span className="mk-muted"> · Interface & doctors</span></div>
        </div>
      </div>
      <div className="mk-lang-stat">
        <span className="mk-result-dot"></span> <strong>89%</strong> of our professionals speak 2+ languages
      </div>
    </div>
  );
}

function MockupProfile() {
  return (
    <div className="mk-inner">
      <div className="mk-profile">
        <div className="mk-profile__header">
          <div className="mk-avatar mk-avatar--lg">MD</div>
          <div>
            <strong>Dr. Marie Dupont</strong>
            <span className="mk-badge"><i className="fas fa-shield-alt" style={{ fontSize: 9, marginRight: 3 }}></i>Verified</span>
            <br /><span className="mk-muted">Cardiologist · 12 years exp.</span>
          </div>
        </div>
        <div className="mk-profile__stats">
          <div className="mk-stat"><span className="mk-stat__val">4.9</span><span className="mk-muted">Rating</span></div>
          <div className="mk-stat"><span className="mk-stat__val">342</span><span className="mk-muted">Patients</span></div>
          <div className="mk-stat"><span className="mk-stat__val">FR PT EN</span><span className="mk-muted">Languages</span></div>
        </div>
        <div className="mk-profile__creds">
          <div className="mk-cred"><i className="fas fa-graduation-cap" style={{ color: "var(--color-accent)", fontSize: 11 }}></i> Univ. de Lisboa, Medicine</div>
          <div className="mk-cred"><i className="fas fa-certificate" style={{ color: "var(--color-accent)", fontSize: 11 }}></i> Ordem dos Médicos, #48291</div>
        </div>
      </div>
    </div>
  );
}

function MockupReviews() {
  return (
    <div className="mk-inner">
      <div className="mk-reviews">
        <div className="mk-review">
          <div className="mk-review__header">
            <div className="mk-avatar mk-avatar--sm">SL</div>
            <div><strong>Sophie L.</strong><br /><span className="mk-stars">★★★★★</span></div>
          </div>
          <p className="mk-review__text">&quot;Dr. Dupont was incredibly thorough and explained everything in French. Felt truly heard.&quot;</p>
          <div className="mk-review__tags">
            <span className="mk-rtag">Punctual</span>
            <span className="mk-rtag">Clear communication</span>
            <span className="mk-rtag">Expert</span>
          </div>
        </div>
        <div className="mk-review mk-review--faded">
          <div className="mk-review__header">
            <div className="mk-avatar mk-avatar--sm">PC</div>
            <div><strong>Pierre C.</strong><br /><span className="mk-stars">★★★★☆</span></div>
          </div>
          <p className="mk-review__text">&quot;Very competent, slightly long wait but excellent care overall.&quot;</p>
        </div>
      </div>
    </div>
  );
}

function MockupReminders() {
  return (
    <div className="mk-inner">
      <div className="mk-reminders">
        <div className="mk-notif mk-notif--highlight">
          <div className="mk-notif__icon"><i className="fas fa-bell" style={{ color: "var(--color-accent)" }}></i></div>
          <div>
            <strong>Appointment tomorrow</strong><br />
            <span className="mk-muted">Dr. Dupont · Cardiology · 14:30</span>
          </div>
          <span className="mk-notif__time">1h ago</span>
        </div>
        <div className="mk-notif">
          <div className="mk-notif__icon"><i className="fas fa-envelope" style={{ color: "var(--color-cobalt)" }}></i></div>
          <div>
            <strong>Confirmation email sent</strong><br />
            <span className="mk-muted">Check your inbox for details</span>
          </div>
          <span className="mk-notif__time">2 days</span>
        </div>
        <div className="mk-notif">
          <div className="mk-notif__icon"><i className="fas fa-notes-medical" style={{ color: "var(--color-cobalt)" }}></i></div>
          <div>
            <strong>Post-visit follow-up</strong><br />
            <span className="mk-muted">How was your appointment?</span>
          </div>
          <span className="mk-notif__time">1 week</span>
        </div>
      </div>
    </div>
  );
}

const MOCKUPS: Record<string, () => React.JSX.Element> = {
  search: MockupSearch,
  filter: MockupFilter,
  map: MockupMap,
  booking: MockupBooking,
  lang: MockupLang,
  profile: MockupProfile,
  reviews: MockupReviews,
  reminders: MockupReminders,
};

export default function FeaturesGrid() {
  const t = useTranslations("features");
  const [active, setActive] = useState(0);
  const ActiveMockup = MOCKUPS[FEATURES[active].mockup];

  return (
    <section className="ft-showcase">
      <style>{`
        /* ===== SECTION ===== */
        .ft-showcase {
          position: relative;
          padding: 120px 0;
          background: linear-gradient(170deg, #070C16 0%, #0C121E 35%, #244882 70%, #070C16 100%);
          overflow: hidden;
        }
        .ft-showcase::before {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background:
            radial-gradient(ellipse 800px 600px at 20% 20%, rgba(103,203,199,0.06) 0%, transparent 100%),
            radial-gradient(ellipse 600px 800px at 80% 80%, rgba(74,124,199,0.08) 0%, transparent 100%);
          pointer-events: none;
        }
        .ft-showcase::after {
          content: '';
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='1' cy='1' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
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
        .mk-muted { color: rgba(255,255,255,0.35); font-size: 13px; }

        /* Search mockup */
        .mk-search__bar {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 14px 18px;
          margin-bottom: 12px;
        }
        .mk-search__text { color: rgba(255,255,255,0.6); font-size: 14px; }
        .mk-search__cursor {
          width: 2px; height: 18px;
          background: #67CBC7;
          animation: mkBlink 1s infinite;
          border-radius: 1px;
        }
        @keyframes mkBlink { 0%,50% { opacity: 1; } 51%,100% { opacity: 0; } }
        .mk-search__suggestions {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 12px;
          overflow: hidden;
        }
        .mk-search__item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-bottom: 1px solid rgba(255,255,255,0.04);
          font-size: 14px;
          color: #fff;
          transition: background 0.2s;
        }
        .mk-search__item:last-child { border-bottom: none; }
        .mk-search__item--active { background: rgba(103,203,199,0.06); }
        .mk-tag-row { display: flex; gap: 8px; margin-top: 16px; }
        .mk-tag {
          font-size: 11px;
          padding: 5px 12px;
          border-radius: 6px;
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.4);
          font-weight: 600;
        }
        .mk-tag--teal { background: rgba(103,203,199,0.1); color: #67CBC7; }

        /* Filter mockup */
        .mk-filters { display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px; }
        .mk-filter-row { display: flex; gap: 8px; flex-wrap: wrap; }
        .mk-chip {
          font-size: 13px; padding: 8px 16px; border-radius: 8px;
          background: rgba(255,255,255,0.05); color: rgba(255,255,255,0.5);
          font-weight: 500; border: 1px solid transparent; transition: all 0.2s;
        }
        .mk-chip--active { background: rgba(103,203,199,0.12); color: #67CBC7; border-color: rgba(103,203,199,0.25); }
        .mk-chip--outline { background: transparent; border: 1px solid rgba(255,255,255,0.1); }
        .mk-chip--outline.mk-chip--active { border-color: rgba(103,203,199,0.3); color: #67CBC7; background: rgba(103,203,199,0.06); }
        .mk-chip--more { background: rgba(74,124,199,0.2); color: #7b9ad8; }
        .mk-result-count {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; color: rgba(255,255,255,0.6);
          padding: 16px 0; border-top: 1px solid rgba(255,255,255,0.06);
        }
        .mk-result-dot {
          width: 8px; height: 8px; border-radius: 50%;
          background: #67CBC7; display: inline-block;
          animation: mkPulse 2s infinite;
        }
        @keyframes mkPulse { 0%,100% { opacity: 1; } 50% { opacity: 0.4; } }

        /* Map mockup */
        .mk-map {
          position: relative; height: 300px;
          background: rgba(255,255,255,0.02);
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06);
          overflow: hidden;
        }
        .mk-map__grid {
          position: absolute; inset: 0;
          display: flex; flex-direction: column; justify-content: space-between;
          padding: 20px;
        }
        .mk-map__line { height: 1px; background: rgba(255,255,255,0.03); }
        .mk-map__pin {
          position: absolute; font-size: 20px; color: #4A7CC7;
          transition: transform 0.3s;
        }
        .mk-map__pin--1 { top: 25%; left: 30%; }
        .mk-map__pin--2 { top: 40%; left: 65%; }
        .mk-map__pin--3 { top: 55%; left: 45%; }
        .mk-map__pin--4 { top: 70%; left: 25%; }
        .mk-map__pin--5 { top: 35%; left: 78%; }
        .mk-map__pin--active { color: #67CBC7; font-size: 24px; z-index: 2; }
        .mk-map__tooltip {
          position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%);
          background: #0C121E; border: 1px solid rgba(103,203,199,0.2);
          border-radius: 8px; padding: 8px 14px; font-size: 12px;
          color: #fff; white-space: nowrap; margin-bottom: 4px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
        }

        /* Booking mockup */
        .mk-steps {
          display: flex; align-items: center; justify-content: center;
          gap: 0; margin-bottom: 28px;
        }
        .mk-step {
          display: flex; align-items: center; gap: 8px;
          font-size: 13px; color: rgba(255,255,255,0.35); font-weight: 600;
        }
        .mk-step__num {
          width: 28px; height: 28px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.06); font-size: 12px; color: rgba(255,255,255,0.3);
        }
        .mk-step--done .mk-step__num { background: #67CBC7; color: #fff; }
        .mk-step--done { color: #67CBC7; }
        .mk-step--active .mk-step__num { background: rgba(103,203,199,0.15); color: #67CBC7; border: 1px solid #67CBC7; }
        .mk-step--active { color: #fff; }
        .mk-step__line {
          width: 40px; height: 2px; background: rgba(255,255,255,0.08);
          margin: 0 10px; border-radius: 2px;
        }
        .mk-step__line--done { background: #67CBC7; }
        .mk-step__line--active { background: linear-gradient(90deg, #67CBC7, rgba(255,255,255,0.08)); }
        .mk-booking-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 24px;
        }
        .mk-booking-doc { display: flex; align-items: center; gap: 14px; margin-bottom: 20px; color: #fff; font-size: 14px; }
        .mk-avatar {
          width: 44px; height: 44px; border-radius: 12px;
          background: linear-gradient(135deg, #67CBC7, #4A7CC7);
          display: flex; align-items: center; justify-content: center;
          color: #fff; font-weight: 700; font-size: 13px; flex-shrink: 0;
        }
        .mk-avatar--lg { width: 56px; height: 56px; font-size: 16px; border-radius: 16px; }
        .mk-avatar--sm { width: 32px; height: 32px; font-size: 11px; border-radius: 8px; }
        .mk-slot-grid { display: flex; gap: 8px; margin-bottom: 18px; }
        .mk-slot {
          flex: 1; text-align: center; padding: 10px 0; border-radius: 8px;
          background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
          color: rgba(255,255,255,0.5); font-size: 13px; font-weight: 600;
        }
        .mk-slot--selected { background: rgba(103,203,199,0.12); border-color: #67CBC7; color: #67CBC7; }
        .mk-confirm-btn {
          background: linear-gradient(135deg, #67CBC7, #5AA2AA);
          color: #fff; text-align: center; padding: 12px;
          border-radius: 10px; font-weight: 700; font-size: 14px;
          box-shadow: 0 4px 16px rgba(103,203,199,0.25);
        }

        /* Lang mockup */
        .mk-lang { display: flex; flex-direction: column; gap: 8px; margin-bottom: 20px; }
        .mk-lang__item {
          display: flex; align-items: center; gap: 14px;
          padding: 16px 18px; border-radius: 12px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          color: #fff; font-size: 14px; transition: all 0.2s;
        }
        .mk-lang__item--active { border-color: rgba(103,203,199,0.25); background: rgba(103,203,199,0.05); }
        .mk-flag { font-size: 24px; }
        .mk-lang-stat {
          display: flex; align-items: center; gap: 8px;
          font-size: 14px; color: rgba(255,255,255,0.6);
          padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06);
        }

        /* Profile mockup */
        .mk-profile__header {
          display: flex; align-items: center; gap: 16px;
          margin-bottom: 24px; color: #fff; font-size: 15px;
        }
        .mk-badge {
          display: inline-flex; align-items: center;
          background: rgba(103,203,199,0.12); color: #67CBC7;
          font-size: 11px; font-weight: 700; padding: 3px 10px;
          border-radius: 6px; margin-left: 8px;
        }
        .mk-profile__stats {
          display: flex; gap: 0; margin-bottom: 24px;
          background: rgba(255,255,255,0.03); border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.06); overflow: hidden;
        }
        .mk-stat {
          flex: 1; text-align: center; padding: 18px 12px;
          border-right: 1px solid rgba(255,255,255,0.06);
          display: flex; flex-direction: column; gap: 4px;
        }
        .mk-stat:last-child { border-right: none; }
        .mk-stat__val { color: #fff; font-weight: 700; font-size: 18px; }
        .mk-profile__creds { display: flex; flex-direction: column; gap: 10px; }
        .mk-cred {
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; color: rgba(255,255,255,0.5);
        }

        /* Reviews mockup */
        .mk-reviews { display: flex; flex-direction: column; gap: 14px; }
        .mk-review {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06);
          border-radius: 14px; padding: 20px;
        }
        .mk-review--faded { opacity: 0.5; }
        .mk-review__header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; color: #fff; font-size: 14px; }
        .mk-stars { color: #ffbd2e; font-size: 13px; letter-spacing: 1px; }
        .mk-review__text { color: rgba(255,255,255,0.6); font-size: 13px; line-height: 1.6; margin: 0 0 10px; font-style: italic; }
        .mk-review__tags { display: flex; gap: 6px; }
        .mk-rtag {
          font-size: 11px; padding: 4px 10px; border-radius: 6px;
          background: rgba(103,203,199,0.08); color: rgba(103,203,199,0.8); font-weight: 600;
        }

        /* Reminders mockup */
        .mk-reminders { display: flex; flex-direction: column; gap: 10px; }
        .mk-notif {
          display: flex; align-items: flex-start; gap: 14px;
          padding: 18px; border-radius: 12px;
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05);
          color: #fff; font-size: 13px; position: relative;
        }
        .mk-notif--highlight { border-color: rgba(103,203,199,0.2); background: rgba(103,203,199,0.04); }
        .mk-notif__icon {
          width: 36px; height: 36px; border-radius: 10px;
          background: rgba(255,255,255,0.05);
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; flex-shrink: 0;
        }
        .mk-notif__time {
          position: absolute; top: 18px; right: 18px;
          font-size: 11px; color: rgba(255,255,255,0.2);
        }

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
            <i className="icon-insurance"></i> Platform features
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
                <span className="ft-device__url">docagora.com</span>
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
                  <h4 className="ft-item__title">{t(key)}</h4>
                </div>
                <div className="ft-item__desc">{FEATURE_DESCS[key]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="ft-cta">
          <Link href="/about">
            <span>{t("learnMore")}</span>
            <i className="icon-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  );
}
