"use client";
import { useTranslations } from "next-intl";

const ITEM_KEYS = ["item1", "item2", "item3"] as const;

const ACCENTS = [
  { gradient: "linear-gradient(135deg, #67CBC7, #5AA2AA)", shadow: "rgba(103,203,199,0.18)" },
  { gradient: "linear-gradient(135deg, #244882, #4A7CC7)", shadow: "rgba(36,72,130,0.18)" },
  { gradient: "linear-gradient(135deg, #67CBC7, #244882)", shadow: "rgba(103,203,199,0.14)" },
];

export default function Testimonials({ compact = false }: { compact?: boolean }) {
  const t = useTranslations("testimonials");

  return (
    <section className="da-testimonials" style={compact ? { paddingTop: 40 } : undefined}>
      <style>{`
        .da-testimonials {
          position: relative;
          padding: 100px 0 110px;
          background: #FCFEFE;
          overflow: hidden;
        }
        .da-testimonials::before {
          content: '';
          position: absolute;
          top: -120px;
          right: -80px;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(103,203,199,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        .da-testimonials::after {
          content: '';
          position: absolute;
          bottom: -100px;
          left: -60px;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(36,72,130,0.05) 0%, transparent 70%);
          pointer-events: none;
        }

        .da-test__header {
          text-align: center;
          margin-bottom: 64px;
          position: relative;
          z-index: 1;
        }
        .da-test__pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(103,203,199,0.08);
          border: 1px solid rgba(103,203,199,0.15);
          border-radius: 50px;
          padding: 6px 20px;
          font-size: 12px;
          font-weight: 700;
          color: #67CBC7;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          margin-bottom: 20px;
        }
        .da-test__pill i {
          font-size: 14px;
        }
        .da-test__title {
          font-size: clamp(26px, 3.2vw, 38px);
          font-weight: 700;
          color: #0C121E;
          line-height: 1.2;
          margin: 0;
        }

        .da-test__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
          position: relative;
          z-index: 1;
        }

        .da-test__card {
          background: #fff;
          border-radius: 18px;
          padding: 36px 30px 32px;
          position: relative;
          display: flex;
          flex-direction: column;
          transition: transform 0.35s cubic-bezier(0.25,0.46,0.45,0.94), box-shadow 0.35s ease;
          box-shadow: 0 2px 12px rgba(0,0,0,0.04);
          border: 1px solid rgba(0,0,0,0.04);
        }
        .da-test__card:nth-child(2) {
          transform: translateY(24px);
        }
        .da-test__card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 48px rgba(0,0,0,0.08);
        }
        .da-test__card:nth-child(2):hover {
          transform: translateY(20px);
        }

        .da-test__accent {
          width: 48px;
          height: 4px;
          border-radius: 2px;
          margin-bottom: 24px;
        }

        .da-test__quote-mark {
          font-size: 48px;
          line-height: 1;
          font-weight: 800;
          margin-bottom: 8px;
          opacity: 0.15;
          font-family: Georgia, "Times New Roman", serif;
          user-select: none;
        }

        .da-test__quote {
          font-size: 16px;
          line-height: 1.75;
          color: #374151;
          margin: 0 0 auto;
          padding-bottom: 28px;
          font-style: italic;
        }

        .da-test__author {
          display: flex;
          align-items: center;
          gap: 14px;
          padding-top: 20px;
          border-top: 1px solid #f0f0f5;
        }
        .da-test__avatar {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          overflow: hidden;
          flex-shrink: 0;
        }
        .da-test__avatar img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .da-test__name {
          font-size: 15px;
          font-weight: 700;
          color: #0C121E;
          margin: 0;
          line-height: 1.3;
        }
        .da-test__location {
          font-size: 13px;
          color: #6b7280;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 5px;
        }
        .da-test__location i {
          font-size: 11px;
          color: #67CBC7;
        }

        .da-test__stars {
          display: flex;
          gap: 2px;
          margin-bottom: 20px;
        }
        .da-test__star {
          color: #fbbf24;
          font-size: 13px;
        }

        @media (max-width: 991px) {
          .da-test__grid {
            grid-template-columns: 1fr;
            max-width: 520px;
            margin: 0 auto;
            gap: 20px;
          }
          .da-test__card:nth-child(2) {
            transform: none;
          }
          .da-test__card:hover,
          .da-test__card:nth-child(2):hover {
            transform: translateY(-4px);
          }
          .da-testimonials {
            padding: 72px 0 80px;
          }
        }
      `}</style>

      <div className="container">
        <div className="da-test__header">
          <div className="da-test__pill">
            <i className="icon-heart2"></i>
            {t("title")}
          </div>
          <h3 className="da-test__title">{t("title")}</h3>
        </div>

        <div className="da-test__grid">
          {ITEM_KEYS.map((key, i) => (
            <div key={key} className="da-test__card">
              <div
                className="da-test__accent"
                style={{ background: ACCENTS[i].gradient }}
              />
              <div className="da-test__stars">
                {[...Array(5)].map((_, s) => (
                  <span key={s} className="da-test__star">&#9733;</span>
                ))}
              </div>
              <p className="da-test__quote">
                &ldquo;{t(`items.${key}.quote`)}&rdquo;
              </p>
              <div className="da-test__author">
                <div className="da-test__avatar">
                  <img
                    src={`/assets/images/testimonials/thumbs/${i + 1}.png`}
                    alt={t(`items.${key}.name`)}
                  />
                </div>
                <div>
                  <p className="da-test__name">{t(`items.${key}.name`)}</p>
                  <p className="da-test__location">
                    <i className="fas fa-map-marker-alt"></i>
                    {t(`items.${key}.location`)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
