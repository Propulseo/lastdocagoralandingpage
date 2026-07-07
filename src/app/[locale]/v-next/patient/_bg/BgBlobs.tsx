export default function BgBlobs() {
  return (
    <div className="bgfx-blobs">
      <style>{`
        .bgfx-blobs {
          position: absolute;
          inset: 0;
          background:
            radial-gradient(120% 120% at 50% 0%, var(--color-light-1) 0%, var(--color-light-2) 55%, var(--color-light-3) 100%);
          overflow: hidden;
          isolation: isolate;
        }

        /* Organic blurred blobs */
        .bgfx-blobs__blob {
          position: absolute;
          border-radius: 50%;
          will-change: transform;
        }

        .bgfx-blobs__b1 {
          top: -14%;
          left: -10%;
          width: 56vw;
          height: 56vw;
          max-width: 760px;
          max-height: 760px;
          background: radial-gradient(circle at 38% 38%, rgba(var(--color-teal-rgb), 0.34), rgba(var(--color-teal-rgb), 0) 68%);
          filter: blur(80px);
          opacity: 0.85;
          animation: bgfx-blobs-float1 26s ease-in-out infinite;
        }

        .bgfx-blobs__b2 {
          top: -6%;
          right: -14%;
          width: 52vw;
          height: 52vw;
          max-width: 700px;
          max-height: 700px;
          background: radial-gradient(circle at 60% 40%, rgba(var(--color-cobalt-rgb), 0.26), rgba(var(--color-cobalt-rgb), 0) 70%);
          filter: blur(90px);
          opacity: 0.8;
          animation: bgfx-blobs-float2 32s ease-in-out infinite;
        }

        .bgfx-blobs__b3 {
          bottom: -20%;
          left: 8%;
          width: 58vw;
          height: 58vw;
          max-width: 780px;
          max-height: 780px;
          background: radial-gradient(circle at 45% 55%, rgba(var(--color-mint-rgb), 0.28), rgba(var(--color-mint-rgb), 0) 68%);
          filter: blur(95px);
          opacity: 0.78;
          animation: bgfx-blobs-float3 30s ease-in-out infinite;
        }

        .bgfx-blobs__b4 {
          bottom: -24%;
          right: -8%;
          width: 50vw;
          height: 50vw;
          max-width: 680px;
          max-height: 680px;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-navy-rgb), 0.16), rgba(var(--color-navy-rgb), 0) 70%);
          filter: blur(100px);
          opacity: 0.7;
          animation: bgfx-blobs-float4 36s ease-in-out infinite;
        }

        .bgfx-blobs__b5 {
          top: 34%;
          left: 40%;
          width: 38vw;
          height: 38vw;
          max-width: 520px;
          max-height: 520px;
          background: radial-gradient(circle at 50% 50%, rgba(var(--color-teal-rgb), 0.18), rgba(var(--color-cobalt-rgb), 0.05) 55%, rgba(var(--color-teal-rgb), 0) 72%);
          filter: blur(70px);
          opacity: 0.7;
          animation: bgfx-blobs-float5 28s ease-in-out infinite;
        }

        /* Soft light wash to keep the center luminous and navy text legible */
        .bgfx-blobs__wash {
          position: absolute;
          inset: 0;
          background: radial-gradient(85% 75% at 50% 42%, rgba(252, 254, 254, 0.62), rgba(252, 254, 254, 0) 70%);
          pointer-events: none;
        }

        /* Static film-grain overlay for editorial depth */
        .bgfx-blobs__grain {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          mix-blend-mode: multiply;
          pointer-events: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 160px 160px;
        }

        @keyframes bgfx-blobs-float1 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(3%, 4%, 0) scale(1.06); }
        }
        @keyframes bgfx-blobs-float2 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-4%, 3%, 0) scale(1.05); }
        }
        @keyframes bgfx-blobs-float3 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(4%, -3%, 0) scale(1.07); }
        }
        @keyframes bgfx-blobs-float4 {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50% { transform: translate3d(-3%, -4%, 0) scale(1.04); }
        }
        @keyframes bgfx-blobs-float5 {
          0%, 100% { transform: translate3d(-50%, -50%, 0) scale(1); }
          50% { transform: translate3d(-46%, -54%, 0) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .bgfx-blobs * { animation: none !important; }
        }
      `}</style>

      <div className="bgfx-blobs__blob bgfx-blobs__b1" />
      <div className="bgfx-blobs__blob bgfx-blobs__b2" />
      <div className="bgfx-blobs__blob bgfx-blobs__b3" />
      <div className="bgfx-blobs__blob bgfx-blobs__b4" />
      <div className="bgfx-blobs__blob bgfx-blobs__b5" />
      <div className="bgfx-blobs__wash" />
      <div className="bgfx-blobs__grain" />
    </div>
  );
}
