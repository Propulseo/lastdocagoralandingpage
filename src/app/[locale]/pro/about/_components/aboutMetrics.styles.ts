/* ============================================================
   CSS de la barre de métriques de /pro/about (chiffre no-shows
   ILLUSTRATIF, footnote dédiée). Préfixe « pa2- ».
   Section DENSE du rythme de la page : les trois chiffres sont
   serrés dans une seule boîte, entre deux sections aérées.
   ============================================================ */

export const aboutMetricsCss = `
  .pa2-metrics-section { padding-block: clamp(34px, 5vh, 52px); }
  .pa2-metrics {
    display: grid; grid-template-columns: repeat(3, 1fr);
    border: 1px solid rgba(255,255,255,0.10); border-radius: 22px;
    background: rgba(255,255,255,0.04); overflow: hidden;
    margin-top: clamp(24px, 3.5vh, 34px);
  }
  .pa2-metric { padding: clamp(18px, 2.4vh, 26px) clamp(18px, 2.4vw, 28px); }
  .pa2-metric + .pa2-metric { border-left: 1px solid rgba(255,255,255,0.10); }
  /* display:block indispensable : ce sont des <span>, donc inline par défaut —
     le libellé se collait au chiffre sur la même ligne et le chevauchait. */
  .pa2-metric-num {
    display: block;
    font-weight: 800; font-size: clamp(26px, 3vw, 38px); color: #67CBC7;
    letter-spacing: -0.02em; line-height: 1;
    font-variant-numeric: tabular-nums; font-feature-settings: "tnum" 1;
  }
  .pa2-metric-num sup { font-size: 0.45em; color: rgba(255,255,255,0.50); font-weight: 700; }
  .pa2-metric-label {
    display: block;
    margin-top: 10px; font-size: 13.5px; font-weight: 600; color: rgba(255,255,255,0.55);
  }
  .pa2-footnote { margin-top: 14px; font-size: 12.5px; color: rgba(255,255,255,0.42); }

  @media (max-width: 760px) {
    .pa2-metrics { grid-template-columns: 1fr; }
    .pa2-metric + .pa2-metric { border-left: 0; border-top: 1px solid rgba(255,255,255,0.10); }
  }
`;
