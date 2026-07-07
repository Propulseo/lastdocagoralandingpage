export default function BgAurora() {
  return (
    <div className="bgfx-aurora">
      <style>{`
        .bgfx-aurora {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 50% 0%, var(--color-light-1) 0%, var(--color-light-2) 55%, var(--color-light-3) 100%);
          isolation: isolate;
        }

        .bgfx-aurora__glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(64px);
          will-change: transform;
          transform-origin: center;
          mix-blend-mode: multiply;
        }

        /* Teal glow, top-right corner */
        .bgfx-aurora__glow--teal {
          top: -22%;
          right: -16%;
          width: 62vw;
          height: 62vw;
          background: radial-gradient(circle at 50% 50%,
            rgba(var(--color-teal-rgb), 0.18) 0%,
            rgba(var(--color-teal-rgb), 0.10) 42%,
            rgba(var(--color-teal-rgb), 0) 70%);
          animation: bgfx-aurora-drift-a 34s ease-in-out infinite;
        }

        /* Cobalt glow, bottom-left corner */
        .bgfx-aurora__glow--cobalt {
          bottom: -26%;
          left: -18%;
          width: 66vw;
          height: 66vw;
          background: radial-gradient(circle at 50% 50%,
            rgba(var(--color-cobalt-rgb), 0.15) 0%,
            rgba(var(--color-cobalt-rgb), 0.08) 44%,
            rgba(var(--color-cobalt-rgb), 0) 72%);
          animation: bgfx-aurora-drift-b 40s ease-in-out infinite;
        }

        /* Mint glow, mid-left edge */
        .bgfx-aurora__glow--mint {
          top: 26%;
          left: -14%;
          width: 50vw;
          height: 50vw;
          background: radial-gradient(circle at 50% 50%,
            rgba(var(--color-mint-rgb), 0.14) 0%,
            rgba(var(--color-mint-rgb), 0.07) 46%,
            rgba(var(--color-mint-rgb), 0) 74%);
          animation: bgfx-aurora-drift-c 28s ease-in-out infinite;
        }

        /* Soft navy accent, lower-right edge (kept very faint) */
        .bgfx-aurora__glow--navy {
          bottom: -12%;
          right: 6%;
          width: 44vw;
          height: 44vw;
          background: radial-gradient(circle at 50% 50%,
            rgba(var(--color-navy-rgb), 0.10) 0%,
            rgba(var(--color-navy-rgb), 0.05) 48%,
            rgba(var(--color-navy-rgb), 0) 75%);
          animation: bgfx-aurora-drift-d 22s ease-in-out infinite;
        }

        /* Light wash on top to guarantee navy text legibility */
        .bgfx-aurora__wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(140% 100% at 50% 42%,
              rgba(var(--color-light-1-rgb, 252, 254, 254), 0) 0%,
              rgba(252, 254, 254, 0.32) 70%,
              rgba(252, 254, 254, 0.55) 100%);
          pointer-events: none;
        }

        /* Static, ultra-low grain to avoid banding */
        .bgfx-aurora::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='120' height='120' filter='url(%23n)'/%3E%3C/svg%3E");
          mix-blend-mode: multiply;
        }

        @keyframes bgfx-aurora-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-4%, 5%, 0) scale(1.08); }
        }
        @keyframes bgfx-aurora-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(5%, -4%, 0) scale(1.1); }
        }
        @keyframes bgfx-aurora-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1.04); }
          50% { transform: translate3d(6%, 3%, 0) scale(1); }
        }
        @keyframes bgfx-aurora-drift-d {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-5%, -3%, 0) scale(1.06); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-aurora * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-aurora__glow bgfx-aurora__glow--teal" />
      <div className="bgfx-aurora__glow bgfx-aurora__glow--cobalt" />
      <div className="bgfx-aurora__glow bgfx-aurora__glow--mint" />
      <div className="bgfx-aurora__glow bgfx-aurora__glow--navy" />
      <div className="bgfx-aurora__wash" />
    </div>
  );
}
