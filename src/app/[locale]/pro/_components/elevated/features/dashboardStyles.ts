/* ============================================================
   CSS de DashboardScreen (injectée via <style>). Extraite du
   composant pour tenir sous ~200 lignes, le tableau de bord étant
   le plus dense des 6 écrans (2 colonnes + sidebar de widgets).
   Couleurs uniquement via tokens --v2-* (+ color-mix). Préfixe
   « hef-dash__ ».
   ============================================================ */

export const dashboardCss = `
  .hef-dash__greet strong { display: block; color: var(--v2-text); font-size: 15px; font-weight: 700; letter-spacing: -0.01em; }
  .hef-dash__greet span { display: block; color: var(--v2-text-muted); font-size: 11.5px; margin-top: 2px; }

  .hef-dash__stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin: 16px 0 0; }
  .hef-dash__stat { background: var(--v2-surface); border: 1px solid var(--v2-border);
    border-top: 2.5px solid var(--v2-accent); border-radius: 12px; padding: 10px 11px; min-width: 0; }
  .hef-dash__stat.is-cobalt { border-top-color: var(--v2-accent-2); }
  .hef-dash__stat .l { display: block; font-size: 9.5px; font-weight: 700; letter-spacing: 0.03em;
    text-transform: uppercase; color: var(--v2-text-muted); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hef-dash__stat .v { display: block; color: var(--v2-text); font-size: 20px; font-weight: 800;
    letter-spacing: -0.02em; margin-top: 4px; }
  .hef-dash__stat .d { display: block; font-size: 10px; font-weight: 700; color: var(--v2-accent-text); margin-top: 2px; }

  .hef-dash__cols { display: grid; grid-template-columns: 1.55fr 1fr; gap: 12px; margin-top: 12px; align-items: start; }
  .hef-dash__main { display: flex; flex-direction: column; gap: 12px; }

  .hef-dash__card { background: var(--v2-surface); border: 1px solid var(--v2-border); border-radius: 12px; padding: 13px; }
  .hef-dash__cardhead { display: flex; align-items: center; justify-content: space-between; margin-bottom: 9px; }
  .hef-dash__cardhead b { color: var(--v2-text); font-size: 12.5px; font-weight: 700; }
  .hef-dash__cardhead > span { font-size: 11px; font-weight: 700; color: var(--v2-text-muted); }
  .hef-dash__cardhead .up { color: var(--v2-accent-text); }

  .hef-dash__appt { display: flex; align-items: center; gap: 10px; padding: 7px 0; }
  .hef-dash__appt + .hef-dash__appt { border-top: 1px solid var(--v2-border); }
  .hef-dash__appt .t { font-size: 12px; font-weight: 700; color: var(--v2-accent-text); min-width: 38px; }
  .hef-dash__appt .ini { width: 27px; height: 27px; border-radius: 8px; flex-shrink: 0; display: grid;
    place-items: center; font-size: 10px; font-weight: 700; color: var(--v2-accent-text);
    background: color-mix(in srgb, var(--v2-accent) 15%, transparent); }
  .hef-dash__appt .who { flex: 1; min-width: 0; font-size: 12px; font-weight: 600; color: var(--v2-text);
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .hef-dash__appt .ok { flex-shrink: 0; font-size: 10px; font-weight: 700; color: var(--v2-accent-text);
    background: color-mix(in srgb, var(--v2-accent) 15%, transparent); border-radius: 999px; padding: 3px 9px; }

  .hef-dash__spark { width: 100%; height: auto; display: block; }
  .hef-dash__spark .line { stroke: var(--v2-accent); stroke-width: 2.4; fill: none; stroke-linecap: round; }
  .hef-dash__spark .area { fill: url(#hef-dash-spark-g); }
  .hef-dash__spark .s0 { stop-color: var(--v2-accent); stop-opacity: 0.26; }
  .hef-dash__spark .s1 { stop-color: var(--v2-accent); stop-opacity: 0; }

  .hef-dash__side { display: flex; flex-direction: column; gap: 10px; }
  .hef-dash__widget { background: var(--v2-surface); border: 1px solid var(--v2-border); border-radius: 12px; padding: 11px 12px; }
  .hef-dash__widget .wl { display: block; font-size: 9.5px; font-weight: 700; text-transform: uppercase;
    letter-spacing: 0.03em; color: var(--v2-text-muted); }
  .hef-dash__widget .wv { display: block; font-size: 15px; font-weight: 800; color: var(--v2-text);
    margin-top: 3px; letter-spacing: -0.01em; }
  .hef-dash__widget .wv--teal { color: var(--v2-accent-text); }
  .hef-dash__widget .ws { display: block; font-size: 11.5px; font-weight: 700; color: var(--v2-accent-text); margin-top: 4px; }
  .hef-dash__chips { display: flex; flex-wrap: wrap; gap: 5px; margin-top: 6px; }
  .hef-dash__chip { font-size: 10px; font-weight: 700; color: var(--v2-accent-text);
    background: color-mix(in srgb, var(--v2-accent) 14%, transparent); border-radius: 999px; padding: 3px 8px; }

  @media (max-width: 720px) {
    .hef-dash__stats { grid-template-columns: repeat(2, 1fr); }
    .hef-dash__cols { grid-template-columns: 1fr; }
  }
`;
