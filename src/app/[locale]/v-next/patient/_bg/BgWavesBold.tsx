export default function BgWavesBold() {
  return (
    <div className="bgfx-waves-bold">
      <style>{`
        .bgfx-waves-bold {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(140% 90% at 12% 6%, rgba(var(--color-teal-rgb), 0.16) 0%, rgba(var(--color-teal-rgb), 0) 46%),
            radial-gradient(120% 80% at 92% 4%, rgba(var(--color-cobalt-rgb), 0.14) 0%, rgba(var(--color-cobalt-rgb), 0) 44%),
            linear-gradient(178deg, var(--color-light-1) 0%, var(--color-light-2) 48%, var(--color-light-3) 100%);
        }

        /* Bold gradient sweep across the top */
        .bgfx-waves-bold__topsweep {
          position: absolute;
          top: -22%;
          left: -10%;
          width: 120%;
          height: 60%;
          background:
            linear-gradient(102deg,
              rgba(var(--color-cobalt-rgb), 0.34) 0%,
              rgba(var(--color-mint-rgb), 0.30) 38%,
              rgba(var(--color-teal-rgb), 0.36) 72%,
              rgba(var(--color-teal-rgb), 0) 100%);
          filter: blur(48px);
          opacity: 0.9;
          transform: translate3d(0, 0, 0) rotate(-3deg);
          will-change: transform, opacity;
          animation: bgfx-waves-bold-sweep 26s ease-in-out infinite;
        }

        /* Saturated glow orbs to lift energy while keeping base light */
        .bgfx-waves-bold__orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(60px);
          will-change: transform, opacity;
        }
        .bgfx-waves-bold__orb--a {
          width: 46vw;
          height: 46vw;
          top: -10%;
          right: -8%;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-teal-rgb), 0.42) 0%, rgba(var(--color-teal-rgb), 0) 68%);
          animation: bgfx-waves-bold-drift-a 30s ease-in-out infinite;
        }
        .bgfx-waves-bold__orb--b {
          width: 40vw;
          height: 40vw;
          bottom: -16%;
          left: -10%;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-cobalt-rgb), 0.36) 0%, rgba(var(--color-cobalt-rgb), 0) 70%);
          animation: bgfx-waves-bold-drift-b 34s ease-in-out infinite;
        }

        /* Layered SVG waves anchored to bottom */
        .bgfx-waves-bold__waves {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          display: block;
        }
        .bgfx-waves-bold__wave {
          transform-box: view-box;
          transform-origin: center bottom;
          will-change: transform, opacity;
        }
        .bgfx-waves-bold__wave--1 { animation: bgfx-waves-bold-w1 22s ease-in-out infinite; }
        .bgfx-waves-bold__wave--2 { animation: bgfx-waves-bold-w2 28s ease-in-out infinite; }
        .bgfx-waves-bold__wave--3 { animation: bgfx-waves-bold-w3 19s ease-in-out infinite; }
        .bgfx-waves-bold__wave--4 { animation: bgfx-waves-bold-w4 25s ease-in-out infinite; }

        /* Static low-opacity grain */
        .bgfx-waves-bold__grain {
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.05;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        }

        @keyframes bgfx-waves-bold-sweep {
          0%, 100% { transform: translate3d(0, 0, 0) rotate(-3deg); opacity: 0.9; }
          50% { transform: translate3d(4%, 2%, 0) rotate(-1deg); opacity: 1; }
        }
        @keyframes bgfx-waves-bold-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.95; }
          50% { transform: translate3d(-5%, 4%, 0) scale(1.08); opacity: 1; }
        }
        @keyframes bgfx-waves-bold-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); opacity: 0.9; }
          50% { transform: translate3d(6%, -4%, 0) scale(1.1); opacity: 1; }
        }
        @keyframes bgfx-waves-bold-w1 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-3.5%, 1.4%, 0); }
        }
        @keyframes bgfx-waves-bold-w2 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(3.5%, -1.6%, 0); }
        }
        @keyframes bgfx-waves-bold-w3 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(-2.6%, 1%, 0); }
        }
        @keyframes bgfx-waves-bold-w4 {
          0%, 100% { transform: translate3d(0, 0, 0); }
          50% { transform: translate3d(2.4%, -0.9%, 0); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-waves-bold * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-waves-bold__topsweep" />
      <div className="bgfx-waves-bold__orb bgfx-waves-bold__orb--a" />
      <div className="bgfx-waves-bold__orb bgfx-waves-bold__orb--b" />

      <svg
        className="bgfx-waves-bold__waves"
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMax slice"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <linearGradient id="bgfxWavesBoldG1" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(var(--color-cobalt-rgb), 0.34)" />
            <stop offset="55%" stopColor="rgba(var(--color-mint-rgb), 0.30)" />
            <stop offset="100%" stopColor="rgba(var(--color-teal-rgb), 0.34)" />
          </linearGradient>
          <linearGradient id="bgfxWavesBoldG2" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(var(--color-teal-rgb), 0.42)" />
            <stop offset="60%" stopColor="rgba(var(--color-mint-rgb), 0.36)" />
            <stop offset="100%" stopColor="rgba(var(--color-cobalt-rgb), 0.38)" />
          </linearGradient>
          <linearGradient id="bgfxWavesBoldG3" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(var(--color-mint-rgb), 0.40)" />
            <stop offset="100%" stopColor="rgba(var(--color-teal-rgb), 0.46)" />
          </linearGradient>
          <linearGradient id="bgfxWavesBoldG4" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="rgba(var(--color-cobalt-rgb), 0.48)" />
            <stop offset="100%" stopColor="rgba(var(--color-teal-rgb), 0.50)" />
          </linearGradient>
        </defs>

        <path
          className="bgfx-waves-bold__wave bgfx-waves-bold__wave--1"
          fill="url(#bgfxWavesBoldG1)"
          d="M0,470 C220,360 420,560 720,470 C1010,385 1230,540 1440,440 L1440,900 L0,900 Z"
        />
        <path
          className="bgfx-waves-bold__wave bgfx-waves-bold__wave--2"
          fill="url(#bgfxWavesBoldG2)"
          d="M0,580 C260,490 460,660 760,575 C1060,490 1250,640 1440,560 L1440,900 L0,900 Z"
        />
        <path
          className="bgfx-waves-bold__wave bgfx-waves-bold__wave--3"
          fill="url(#bgfxWavesBoldG3)"
          d="M0,690 C240,615 480,760 780,685 C1070,615 1260,740 1440,670 L1440,900 L0,900 Z"
        />
        <path
          className="bgfx-waves-bold__wave bgfx-waves-bold__wave--4"
          fill="url(#bgfxWavesBoldG4)"
          d="M0,790 C260,735 500,840 800,790 C1080,745 1270,820 1440,775 L1440,900 L0,900 Z"
        />
      </svg>

      <div className="bgfx-waves-bold__grain" />
    </div>
  );
}
