export default function BgGridBold() {
  return (
    <div className="bgfx-grid-bold">
      <style>{`
        .bgfx-grid-bold {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 78% 6%, rgba(var(--color-teal-rgb), 0.10) 0%, rgba(var(--color-teal-rgb), 0) 55%),
            radial-gradient(110% 80% at 8% 96%, rgba(var(--color-cobalt-rgb), 0.09) 0%, rgba(var(--color-cobalt-rgb), 0) 50%),
            linear-gradient(165deg, var(--color-light-1) 0%, var(--color-light-2) 48%, var(--color-light-3) 100%);
        }

        /* ---- Strong visible grid ---- */
        .bgfx-grid-bold .gb-grid {
          position: absolute;
          inset: -4%;
          background-image:
            linear-gradient(to right, rgba(var(--color-navy-rgb), 0.12) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--color-teal-rgb), 0.12) 1px, transparent 1px);
          background-size: 84px 84px;
          -webkit-mask-image: radial-gradient(120% 110% at 60% 40%, #000 35%, transparent 92%);
          mask-image: radial-gradient(120% 110% at 60% 40%, #000 35%, transparent 92%);
          transform-origin: center;
          animation: gb-grid-drift 46s ease-in-out infinite alternate;
        }
        .bgfx-grid-bold .gb-grid-fine {
          position: absolute;
          inset: -4%;
          background-image:
            linear-gradient(to right, rgba(var(--color-cobalt-rgb), 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(var(--color-cobalt-rgb), 0.05) 1px, transparent 1px);
          background-size: 21px 21px;
          -webkit-mask-image: radial-gradient(95% 90% at 60% 38%, #000 10%, transparent 70%);
          mask-image: radial-gradient(95% 90% at 60% 38%, #000 10%, transparent 70%);
        }

        /* ---- Big bold half circle (top-right) ---- */
        .bgfx-grid-bold .gb-halfcircle {
          position: absolute;
          top: -34vmax;
          right: -22vmax;
          width: 78vmax;
          height: 78vmax;
          border-radius: 50%;
          background:
            radial-gradient(circle at 36% 64%,
              rgba(var(--color-teal-rgb), 0.34) 0%,
              rgba(var(--color-mint-rgb), 0.20) 42%,
              rgba(var(--color-cobalt-rgb), 0.10) 70%,
              rgba(var(--color-cobalt-rgb), 0) 78%);
          transform-origin: 40% 60%;
          animation: gb-pulse 30s ease-in-out infinite alternate;
        }

        /* ---- Diagonal accent band ---- */
        .bgfx-grid-bold .gb-band {
          position: absolute;
          left: -30%;
          bottom: 8%;
          width: 160%;
          height: 22vmax;
          background: linear-gradient(90deg,
            rgba(var(--color-cobalt-rgb), 0) 0%,
            rgba(var(--color-cobalt-rgb), 0.12) 30%,
            rgba(var(--color-navy-rgb), 0.10) 60%,
            rgba(var(--color-teal-rgb), 0) 100%);
          transform: rotate(-14deg);
          transform-origin: center;
          -webkit-mask-image: linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent);
          mask-image: linear-gradient(90deg, transparent, #000 25%, #000 75%, transparent);
          animation: gb-band-slide 38s ease-in-out infinite alternate;
        }

        /* ---- Big concentric rings (bottom-left) ---- */
        .bgfx-grid-bold .gb-rings {
          position: absolute;
          left: -16vmax;
          bottom: -18vmax;
          width: 60vmax;
          height: 60vmax;
          color: rgba(var(--color-navy-rgb), 0.13);
          animation: gb-spin 90s linear infinite;
        }
        .bgfx-grid-bold .gb-rings svg { width: 100%; height: 100%; display: block; }

        /* ---- Soft floating glow accent ---- */
        .bgfx-grid-bold .gb-glow {
          position: absolute;
          top: 52%;
          left: 14%;
          width: 30vmax;
          height: 30vmax;
          border-radius: 50%;
          background: radial-gradient(circle,
            rgba(var(--color-mint-rgb), 0.16) 0%,
            rgba(var(--color-mint-rgb), 0) 68%);
          animation: gb-float 26s ease-in-out infinite alternate;
        }

        /* ---- Static grain ---- */
        .bgfx-grid-bold::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.035;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes gb-grid-drift {
          0%   { transform: translate3d(0, 0, 0) scale(1); }
          100% { transform: translate3d(-26px, 18px, 0) scale(1.04); }
        }
        @keyframes gb-pulse {
          0%   { transform: scale(1) rotate(0deg); opacity: 0.92; }
          100% { transform: scale(1.07) rotate(6deg); opacity: 1; }
        }
        @keyframes gb-band-slide {
          0%   { transform: translate3d(-3%, 0, 0) rotate(-14deg); opacity: 0.8; }
          100% { transform: translate3d(3%, 0, 0) rotate(-14deg); opacity: 1; }
        }
        @keyframes gb-spin {
          0%   { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes gb-float {
          0%   { transform: translate3d(0, 0, 0); opacity: 0.85; }
          100% { transform: translate3d(4vmax, -3vmax, 0); opacity: 1; }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-grid-bold * { animation: none !important; }
        }
      `}</style>

      <div className="gb-grid" />
      <div className="gb-grid-fine" />
      <div className="gb-halfcircle" />
      <div className="gb-band" />
      <div className="gb-glow" />
      <div className="gb-rings" aria-hidden="true">
        <svg viewBox="0 0 200 200" fill="none">
          <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="1.4" />
          <circle cx="100" cy="100" r="74" stroke="currentColor" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="52" stroke="currentColor" strokeWidth="1" />
          <circle cx="100" cy="100" r="30" stroke="currentColor" strokeWidth="0.9" />
        </svg>
      </div>
    </div>
  );
}
