export default function BgBlobsBold() {
  return (
    <div className="bgfx-blobs-bold">
      <style>{`
        .bgfx-blobs-bold {
          position: absolute;
          inset: 0;
          overflow: hidden;
          background:
            radial-gradient(120% 90% at 80% -10%, var(--color-light-1) 0%, var(--color-light-2) 45%, var(--color-light-3) 100%);
          isolation: isolate;
        }

        /* Color blobs share a multiply field so overlaps deepen instead of wash out */
        .bgfx-blobs-bold__field {
          position: absolute;
          inset: -12%;
          filter: blur(2px);
          will-change: transform;
        }

        .bgfx-blobs-bold__blob {
          position: absolute;
          border-radius: 48% 52% 56% 44% / 54% 46% 54% 46%;
          mix-blend-mode: multiply;
          opacity: 0.5;
          will-change: transform;
          transform: translateZ(0);
        }

        /* Massive teal blob, top-left, dominant */
        .bgfx-blobs-bold__blob--teal {
          top: -14%;
          left: -10%;
          width: 58vw;
          height: 58vw;
          background:
            radial-gradient(closest-side at 40% 38%,
              rgba(var(--color-teal-rgb), 0.5) 0%,
              rgba(var(--color-teal-rgb), 0.32) 48%,
              rgba(var(--color-teal-rgb), 0) 78%);
          animation: bgfx-bb-floatA 26s ease-in-out infinite;
        }

        /* Cobalt blob, lower-right, large counterweight */
        .bgfx-blobs-bold__blob--cobalt {
          bottom: -22%;
          right: -14%;
          width: 64vw;
          height: 64vw;
          border-radius: 56% 44% 48% 52% / 46% 56% 44% 54%;
          background:
            radial-gradient(closest-side at 58% 56%,
              rgba(var(--color-cobalt-rgb), 0.46) 0%,
              rgba(var(--color-cobalt-rgb), 0.28) 50%,
              rgba(var(--color-cobalt-rgb), 0) 80%);
          animation: bgfx-bb-floatB 32s ease-in-out infinite;
        }

        /* Mint blob, center-right, mid mass overlapping cobalt */
        .bgfx-blobs-bold__blob--mint {
          top: 18%;
          right: 4%;
          width: 42vw;
          height: 42vw;
          border-radius: 44% 56% 52% 48% / 58% 42% 58% 42%;
          background:
            radial-gradient(closest-side at 46% 44%,
              rgba(var(--color-mint-rgb), 0.48) 0%,
              rgba(var(--color-mint-rgb), 0.3) 50%,
              rgba(var(--color-mint-rgb), 0) 78%);
          animation: bgfx-bb-floatC 22s ease-in-out infinite;
        }

        /* Navy blob, bottom-left, anchors the asymmetric base (kept soft for readability) */
        .bgfx-blobs-bold__blob--navy {
          bottom: -16%;
          left: 6%;
          width: 40vw;
          height: 40vw;
          border-radius: 52% 48% 44% 56% / 48% 52% 48% 52%;
          opacity: 0.34;
          background:
            radial-gradient(closest-side at 50% 50%,
              rgba(var(--color-navy-rgb), 0.42) 0%,
              rgba(var(--color-navy-rgb), 0.22) 52%,
              rgba(var(--color-navy-rgb), 0) 80%);
          animation: bgfx-bb-floatD 28s ease-in-out infinite;
        }

        /* Small accent teal-to-mint spark, top-right, high energy */
        .bgfx-blobs-bold__blob--spark {
          top: -6%;
          right: 22%;
          width: 24vw;
          height: 24vw;
          border-radius: 58% 42% 50% 50% / 50% 58% 42% 50%;
          opacity: 0.45;
          background:
            radial-gradient(closest-side at 50% 50%,
              rgba(var(--color-teal-rgb), 0.5) 0%,
              rgba(var(--color-mint-rgb), 0.28) 55%,
              rgba(var(--color-mint-rgb), 0) 82%);
          animation: bgfx-bb-floatE 19s ease-in-out infinite;
        }

        /* Light wash keeps the upper-center luminous where headline text sits */
        .bgfx-blobs-bold__wash {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(82% 58% at 50% 20%,
              rgba(252, 254, 254, 0) 0%,
              rgba(252, 254, 254, 0.7) 66%,
              rgba(252, 254, 254, 0.9) 100%);
          mix-blend-mode: screen;
          pointer-events: none;
        }

        /* Static grain, single low-opacity pseudo element */
        .bgfx-blobs-bold::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          opacity: 0.04;
          mix-blend-mode: multiply;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 180px 180px;
        }

        @keyframes bgfx-bb-floatA {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(5%, 4%, 0) scale(1.08) rotate(8deg); }
        }
        @keyframes bgfx-bb-floatB {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(-6%, -5%, 0) scale(1.1) rotate(-7deg); }
        }
        @keyframes bgfx-bb-floatC {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(-5%, 6%, 0) scale(0.92) rotate(10deg); }
        }
        @keyframes bgfx-bb-floatD {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(7%, -4%, 0) scale(1.06) rotate(-6deg); }
        }
        @keyframes bgfx-bb-floatE {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1) rotate(0deg); }
          50% { transform: translate3d(-8%, 7%, 0) scale(1.14) rotate(12deg); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-blobs-bold * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-blobs-bold__field">
        <span className="bgfx-blobs-bold__blob bgfx-blobs-bold__blob--teal" />
        <span className="bgfx-blobs-bold__blob bgfx-blobs-bold__blob--cobalt" />
        <span className="bgfx-blobs-bold__blob bgfx-blobs-bold__blob--mint" />
        <span className="bgfx-blobs-bold__blob bgfx-blobs-bold__blob--navy" />
        <span className="bgfx-blobs-bold__blob bgfx-blobs-bold__blob--spark" />
      </div>

      <div className="bgfx-blobs-bold__wash" />
    </div>
  );
}
