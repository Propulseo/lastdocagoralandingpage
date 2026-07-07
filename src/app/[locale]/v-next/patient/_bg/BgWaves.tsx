export default function BgWaves() {
  return (
    <div className="bgfx-waves">
      <style>{`
        .bgfx-waves {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 90% at 50% -10%, var(--color-light-1) 0%, var(--color-light-2) 45%, var(--color-light-3) 100%);
          overflow: hidden;
        }

        /* soft top glow to lift the composition without darkening */
        .bgfx-waves .bgfx-waves-glow {
          position: absolute;
          left: 50%;
          top: -28vh;
          width: 120vw;
          height: 70vh;
          transform: translateX(-50%);
          background:
            radial-gradient(closest-side, rgba(var(--color-teal-rgb), 0.16), rgba(var(--color-teal-rgb), 0) 72%);
          pointer-events: none;
        }

        /* each wave band is a full-width svg pinned low and offset vertically */
        .bgfx-waves .bgfx-waves-band {
          position: absolute;
          left: -8%;
          width: 116%;
          height: auto;
          will-change: transform;
          pointer-events: none;
        }

        .bgfx-waves .bgfx-waves-band svg {
          display: block;
          width: 100%;
          height: auto;
        }

        .bgfx-waves .bgfx-waves-b1 {
          bottom: -6vh;
          opacity: 0.5;
          animation: bgfx-waves-driftA 26s ease-in-out infinite;
        }
        .bgfx-waves .bgfx-waves-b2 {
          bottom: 2vh;
          opacity: 0.4;
          animation: bgfx-waves-driftB 32s ease-in-out infinite;
        }
        .bgfx-waves .bgfx-waves-b3 {
          bottom: 12vh;
          opacity: 0.3;
          animation: bgfx-waves-driftA 38s ease-in-out infinite reverse;
        }

        @keyframes bgfx-waves-driftA {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(-3.5%, 1.4vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        @keyframes bgfx-waves-driftB {
          0%   { transform: translate3d(0, 0, 0); }
          50%  { transform: translate3d(3%, -1.2vh, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }

        /* single static grain layer, very low opacity */
        .bgfx-waves::after {
          content: "";
          position: absolute;
          inset: 0;
          opacity: 0.035;
          mix-blend-mode: multiply;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-waves * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-waves-glow" />

      <div className="bgfx-waves-band bgfx-waves-b3">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="bgfx-waves-grad3" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-cobalt)" />
              <stop offset="1" stopColor="var(--color-teal)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bgfx-waves-grad3)"
            d="M0,160 C220,90 420,90 720,150 C1010,210 1230,210 1440,140 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      <div className="bgfx-waves-band bgfx-waves-b2">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="bgfx-waves-grad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-mint)" />
              <stop offset="1" stopColor="var(--color-cobalt)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bgfx-waves-grad2)"
            d="M0,200 C260,140 460,260 760,200 C1040,150 1240,250 1440,190 L1440,320 L0,320 Z"
          />
        </svg>
      </div>

      <div className="bgfx-waves-band bgfx-waves-b1">
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="bgfx-waves-grad1" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="var(--color-teal)" />
              <stop offset="1" stopColor="var(--color-mint)" />
            </linearGradient>
          </defs>
          <path
            fill="url(#bgfx-waves-grad1)"
            d="M0,240 C240,300 480,180 760,230 C1040,280 1240,200 1440,250 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
    </div>
  );
}
