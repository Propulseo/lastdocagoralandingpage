export default function BgAuroraBold() {
  return (
    <div className="bgfx-aurora-bold">
      <style>{`
        .bgfx-aurora-bold {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 50% -10%, var(--color-light-1) 0%, var(--color-light-2) 45%, var(--color-light-3) 100%);
          isolation: isolate;
        }

        /* Soft top sheen so navy text stays crisp near the top */
        .bgfx-aurora-bold__veil {
          position: absolute;
          inset: 0;
          background:
            linear-gradient(180deg, rgba(var(--color-light-1-rgb, 252, 254, 254), 0.72) 0%, rgba(var(--color-light-1-rgb, 252, 254, 254), 0) 32%),
            linear-gradient(0deg, rgba(var(--color-light-2-rgb, 248, 250, 253), 0.6) 0%, rgba(var(--color-light-2-rgb, 248, 250, 253), 0) 28%);
          z-index: 4;
          pointer-events: none;
        }

        /* Aurora mesh: saturated, overlapping colour blooms */
        .bgfx-aurora-bold__mesh {
          position: absolute;
          inset: -12%;
          z-index: 1;
        }
        .bgfx-aurora-bold__blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(64px);
          will-change: transform, opacity;
          transform: translate3d(0, 0, 0);
        }

        .bgfx-aurora-bold__b1 {
          top: -10%;
          left: -6%;
          width: 56vw;
          height: 56vw;
          background: radial-gradient(circle at 35% 35%, rgba(var(--color-teal-rgb), 0.45), rgba(var(--color-teal-rgb), 0) 68%);
          mix-blend-mode: multiply;
          animation: bgfx-aurora-bold-drift1 26s ease-in-out infinite alternate;
        }
        .bgfx-aurora-bold__b2 {
          top: -16%;
          right: -10%;
          width: 60vw;
          height: 60vw;
          background: radial-gradient(circle at 60% 40%, rgba(var(--color-cobalt-rgb), 0.4), rgba(var(--color-cobalt-rgb), 0) 70%);
          mix-blend-mode: multiply;
          animation: bgfx-aurora-bold-drift2 32s ease-in-out infinite alternate;
        }
        .bgfx-aurora-bold__b3 {
          bottom: -18%;
          left: 8%;
          width: 64vw;
          height: 64vw;
          background: radial-gradient(circle at 45% 55%, rgba(var(--color-mint-rgb), 0.42), rgba(var(--color-mint-rgb), 0) 70%);
          mix-blend-mode: multiply;
          animation: bgfx-aurora-bold-drift3 29s ease-in-out infinite alternate;
        }
        .bgfx-aurora-bold__b4 {
          bottom: -22%;
          right: -4%;
          width: 52vw;
          height: 52vw;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-teal-rgb), 0.38), rgba(var(--color-teal-rgb), 0) 68%);
          mix-blend-mode: multiply;
          animation: bgfx-aurora-bold-drift4 35s ease-in-out infinite alternate;
        }
        .bgfx-aurora-bold__b5 {
          top: 28%;
          left: 34%;
          width: 44vw;
          height: 44vw;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-cobalt-rgb), 0.32), rgba(var(--color-cobalt-rgb), 0) 66%);
          mix-blend-mode: screen;
          animation: bgfx-aurora-bold-drift5 24s ease-in-out infinite alternate;
        }
        .bgfx-aurora-bold__b6 {
          top: 12%;
          right: 22%;
          width: 38vw;
          height: 38vw;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-mint-rgb), 0.34), rgba(var(--color-mint-rgb), 0) 66%);
          mix-blend-mode: screen;
          animation: bgfx-aurora-bold-drift6 30s ease-in-out infinite alternate;
        }

        /* Crisp aurora ribbons drawn as inline SVG arcs */
        .bgfx-aurora-bold__ribbons {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          opacity: 0.55;
          animation: bgfx-aurora-bold-sway 40s ease-in-out infinite alternate;
          will-change: transform;
        }

        /* Single static grain pass */
        .bgfx-aurora-bold__grain {
          position: absolute;
          inset: 0;
          z-index: 3;
          opacity: 0.05;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes bgfx-aurora-bold-drift1 {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0.95; }
          100% { transform: translate3d(7%, 5%, 0) scale(1.12); opacity: 1; }
        }
        @keyframes bgfx-aurora-bold-drift2 {
          0%   { transform: translate3d(0, 0, 0) scale(1.05); opacity: 0.9; }
          100% { transform: translate3d(-6%, 7%, 0) scale(1); opacity: 1; }
        }
        @keyframes bgfx-aurora-bold-drift3 {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0.92; }
          100% { transform: translate3d(5%, -6%, 0) scale(1.1); opacity: 1; }
        }
        @keyframes bgfx-aurora-bold-drift4 {
          0%   { transform: translate3d(0, 0, 0) scale(1.08); opacity: 0.88; }
          100% { transform: translate3d(-7%, -4%, 0) scale(1); opacity: 1; }
        }
        @keyframes bgfx-aurora-bold-drift5 {
          0%   { transform: translate3d(0, 0, 0) scale(0.95); opacity: 0.8; }
          100% { transform: translate3d(6%, -7%, 0) scale(1.08); opacity: 1; }
        }
        @keyframes bgfx-aurora-bold-drift6 {
          0%   { transform: translate3d(0, 0, 0) scale(1); opacity: 0.78; }
          100% { transform: translate3d(-5%, 6%, 0) scale(1.1); opacity: 0.95; }
        }
        @keyframes bgfx-aurora-bold-sway {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-3%, 2%, 0) scale(1.04); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-aurora-bold * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-aurora-bold__mesh" aria-hidden="true">
        <span className="bgfx-aurora-bold__blob bgfx-aurora-bold__b1" />
        <span className="bgfx-aurora-bold__blob bgfx-aurora-bold__b2" />
        <span className="bgfx-aurora-bold__blob bgfx-aurora-bold__b3" />
        <span className="bgfx-aurora-bold__blob bgfx-aurora-bold__b4" />
        <span className="bgfx-aurora-bold__blob bgfx-aurora-bold__b5" />
        <span className="bgfx-aurora-bold__blob bgfx-aurora-bold__b6" />
      </div>

      <svg
        className="bgfx-aurora-bold__ribbons"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="bgfx-aurora-bold-g1" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgb(var(--color-teal-rgb))" stopOpacity="0.32" />
            <stop offset="100%" stopColor="rgb(var(--color-cobalt-rgb))" stopOpacity="0.04" />
          </linearGradient>
          <linearGradient id="bgfx-aurora-bold-g2" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgb(var(--color-mint-rgb))" stopOpacity="0.3" />
            <stop offset="100%" stopColor="rgb(var(--color-teal-rgb))" stopOpacity="0.03" />
          </linearGradient>
        </defs>
        <path
          d="M-80 250 C 320 120, 560 340, 900 220 S 1380 120, 1560 300"
          fill="none"
          stroke="url(#bgfx-aurora-bold-g1)"
          strokeWidth="160"
          strokeLinecap="round"
        />
        <path
          d="M-80 640 C 280 760, 620 540, 980 700 S 1340 800, 1560 600"
          fill="none"
          stroke="url(#bgfx-aurora-bold-g2)"
          strokeWidth="180"
          strokeLinecap="round"
        />
      </svg>

      <div className="bgfx-aurora-bold__grain" aria-hidden="true" />
      <div className="bgfx-aurora-bold__veil" aria-hidden="true" />
    </div>
  );
}
