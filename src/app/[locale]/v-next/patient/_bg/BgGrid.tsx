export default function BgGrid() {
  return (
    <div className="bgfx-grid">
      <style>{`
        .bgfx-grid {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 90% at 12% 8%, var(--color-light-1) 0%, var(--color-light-2) 46%, var(--color-light-3) 100%);
          overflow: hidden;
        }

        /* fine dot-grid, faint teal/navy, masked to fade at the edges */
        .bgfx-grid__dots {
          position: absolute;
          inset: -2%;
          background-image:
            radial-gradient(rgba(var(--color-teal-rgb), 0.10) 1.4px, transparent 1.6px),
            radial-gradient(rgba(var(--color-navy-rgb), 0.07) 1.4px, transparent 1.6px);
          background-size: 24px 24px, 24px 24px;
          background-position: 0 0, 12px 12px;
          -webkit-mask-image:
            radial-gradient(125% 105% at 50% 42%, #000 38%, rgba(0, 0, 0, 0.55) 66%, transparent 100%);
          mask-image:
            radial-gradient(125% 105% at 50% 42%, #000 38%, rgba(0, 0, 0, 0.55) 66%, transparent 100%);
        }

        /* soft brand glows behind the structure, keeps the base light-dominant */
        .bgfx-grid__glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(70px);
          opacity: 0.5;
          will-change: transform, opacity;
        }
        .bgfx-grid__glow--a {
          top: -16%;
          right: -10%;
          width: 52vw;
          height: 52vw;
          background: radial-gradient(circle, rgba(var(--color-teal-rgb), 0.22) 0%, transparent 68%);
          animation: bgfx-grid-breathe 22s ease-in-out infinite;
        }
        .bgfx-grid__glow--b {
          bottom: -22%;
          left: -14%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle, rgba(var(--color-cobalt-rgb), 0.16) 0%, transparent 70%);
          animation: bgfx-grid-breathe 28s ease-in-out infinite reverse;
        }

        /* large thin stroked arcs / rings anchored off the edges */
        .bgfx-grid__arcs {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }
        .bgfx-grid__arcs svg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        /* one very slow rotating ring, centered */
        .bgfx-grid__ring {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 92vmin;
          height: 92vmin;
          margin-top: -46vmin;
          margin-left: -46vmin;
          transform-origin: 50% 50%;
          will-change: transform;
          animation: bgfx-grid-spin 140s linear infinite;
        }
        .bgfx-grid__ring svg {
          width: 100%;
          height: 100%;
          display: block;
        }

        /* static low-opacity grain, single pseudo-element */
        .bgfx-grid::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes bgfx-grid-breathe {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.45; }
          50% { transform: translate3d(0, 2.5%, 0) scale(1.08); opacity: 0.6; }
        }
        @keyframes bgfx-grid-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-grid * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-grid__glow bgfx-grid__glow--a" />
      <div className="bgfx-grid__glow bgfx-grid__glow--b" />

      <div className="bgfx-grid__dots" />

      {/* large thin arcs anchored off the edges */}
      <div className="bgfx-grid__arcs" aria-hidden="true">
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" fill="none">
          {/* arc anchored off the top-right corner */}
          <circle
            cx="1340"
            cy="120"
            r="560"
            stroke="rgba(var(--color-teal-rgb), 0.20)"
            strokeWidth="1.5"
          />
          {/* concentric inner arc, cobalt */}
          <circle
            cx="1340"
            cy="120"
            r="430"
            stroke="rgba(var(--color-cobalt-rgb), 0.14)"
            strokeWidth="1.5"
          />
          {/* sweeping arc anchored off the bottom-left */}
          <circle
            cx="60"
            cy="860"
            r="640"
            stroke="rgba(var(--color-navy-rgb), 0.10)"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* one very slow rotating dashed ring, centered */}
      <div className="bgfx-grid__ring" aria-hidden="true">
        <svg viewBox="0 0 100 100" fill="none">
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="rgba(var(--color-mint-rgb), 0.16)"
            strokeWidth="0.18"
            strokeDasharray="0.6 3.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}
