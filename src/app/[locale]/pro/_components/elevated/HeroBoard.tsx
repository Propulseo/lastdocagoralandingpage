"use client";

import { useTranslations } from "next-intl";

/* ============================================================
   Aperçu produit ILLUSTRATIF : dashboard DocAgora Pro reconstitué
   en couleurs de la LP (dark cobalt/teal, tokens --v2-*), pensé
   pour « flotter » dans le hero. Données de démo (pill « Aperçu »).
   Compo A+B+C : 3 KPIs + agenda actif + activité de la semaine.
   Préfixe CSS « hepro-app- ». Aucune donnée réelle, aucun bouton
   d'action (page marketing, pas l'app). Couleurs via --v2-*.
   ============================================================ */

const STATS = [
  { key: "statRdv", val: "12", accent: "cobalt", delta: "↑ +3" },
  { key: "statPresence", val: "96%", accent: "teal", delta: "" },
  { key: "statPatients", val: "248", accent: "teal", delta: "" },
] as const;

const APPTS = [
  { time: "09:00", ini: "SD", name: "Susanna D.", typeKey: "apptType1" },
  { time: "10:30", ini: "JP", name: "João P.", typeKey: "apptType2" },
] as const;

export default function HeroBoard() {
  const t = useTranslations("pro");

  return (
    <aside className="hepro-board hepro-reveal" style={{ animationDelay: "200ms" }}>
      <style>{`
        .hepro-board { position: relative; display: flex; }
        /* DA (déclinée du patient) : liseré dégradé teal→cobalt autour du board
           (anneau 1.5px via masque), posé sur le wrapper pour ne pas être rogné
           par l'overflow:hidden du panneau. */
        .hepro-board::before {
          content:""; position:absolute; inset:0; border-radius:20px; padding:1.5px;
          pointer-events:none; z-index:2;
          background:linear-gradient(135deg, color-mix(in srgb, var(--v2-accent) 90%, transparent), color-mix(in srgb, var(--v2-accent-2) 65%, transparent) 55%, rgba(255,255,255,0.14));
          -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite:xor;
          mask-composite:exclude;
        }
        .hepro-app {
          flex:1; min-width:0; border-radius:20px; overflow:hidden;
          background:var(--v2-panel-bg); border:0;
          /* Panneau plein (lisibilité des données) + halo lumineux teal/cobalt. */
          box-shadow:
            var(--v2-shadow-lg),
            0 0 70px -14px color-mix(in srgb, var(--v2-accent) 38%, transparent),
            0 0 130px -42px color-mix(in srgb, var(--v2-accent-2) 50%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.10);
          font-family:var(--font-montserrat),"Montserrat",sans-serif; color:var(--v2-text-body);
          -webkit-font-smoothing:antialiased;
        }
        .hepro-app__bar { display:flex; align-items:center; gap:10px; padding:11px 14px;
          border-bottom:1px solid var(--v2-border); background:rgba(255,255,255,.02); }
        .hepro-app__dots { display:inline-flex; gap:5px; }
        .hepro-app__dots i { width:8px; height:8px; border-radius:50%; background:rgba(255,255,255,.2); }
        .hepro-app__dots i:first-child { background:var(--v2-accent); }
        .hepro-app__crumb { font-size:12px; font-weight:600; color:var(--v2-text-muted); }
        .hepro-app__pill { margin-left:auto; font-size:10px; font-weight:700; letter-spacing:.06em;
          text-transform:uppercase; color:var(--v2-accent-text);
          background:color-mix(in srgb, var(--v2-accent) 15%, transparent); border-radius:999px; padding:4px 9px; }
        .hepro-app__body { display:flex; flex-direction:column; gap:9px; padding:12px; }
        .hepro-app__gt strong { display:block; color:var(--v2-text); font-size:14px; font-weight:700; letter-spacing:-.01em; }
        .hepro-app__gt span { display:block; color:var(--v2-text-muted); font-size:11px; margin-top:2px; }
        .hepro-app__stats { display:grid; grid-template-columns:repeat(3,1fr); gap:8px; }
        .hepro-app__stat { background:var(--v2-surface); border:1px solid var(--v2-border);
          border-top:2.5px solid var(--v2-accent); border-radius:11px; padding:7px 9px; }
        .hepro-app__stat.is-cobalt { border-top-color:var(--v2-accent-2); }
        .hepro-app__stat .lbl { display:block; font-size:9px; font-weight:700; letter-spacing:.04em;
          text-transform:uppercase; color:var(--v2-text-muted);
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .hepro-app__stat .val { display:block; color:var(--v2-text); font-size:19px; font-weight:800; letter-spacing:-.02em; margin-top:4px; }
        .hepro-app__stat .delta { display:block; font-size:9.5px; font-weight:700; color:var(--v2-accent-text); margin-top:2px; }
        .hepro-app__card { background:var(--v2-surface); border:1px solid var(--v2-border); border-radius:12px; padding:10px; }
        .hepro-app__ahead { display:flex; align-items:center; justify-content:space-between; margin-bottom:8px; }
        .hepro-app__ahead b { color:var(--v2-text); font-size:12px; font-weight:700; }
        .hepro-app__ahead > span { font-size:10.5px; color:var(--v2-text-muted); font-weight:600; }
        .hepro-app__appt { display:flex; align-items:center; gap:9px; padding:5px 0; }
        .hepro-app__appt + .hepro-app__appt { border-top:1px solid var(--v2-border); }
        .hepro-app__t { font-size:12px; font-weight:700; color:var(--v2-accent-text); min-width:36px; }
        .hepro-app__ini { width:26px; height:26px; border-radius:8px; flex-shrink:0; display:grid; place-items:center;
          font-size:9.5px; font-weight:700; color:var(--v2-accent-text);
          background:color-mix(in srgb, var(--v2-accent) 15%, transparent); }
        .hepro-app__who { flex:1; min-width:0; }
        .hepro-app__who b { display:block; color:var(--v2-text); font-size:11.5px; font-weight:600;
          white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
        .hepro-app__who em { display:block; font-size:10px; font-style:normal; color:var(--v2-text-muted); margin-top:1px; }
        .hepro-app__ok { flex-shrink:0; font-size:9.5px; font-weight:700; color:var(--v2-accent-text);
          background:color-mix(in srgb, var(--v2-accent) 15%, transparent); border-radius:999px; padding:3px 8px; }
        .hepro-app__chart .hepro-app__ahead { margin-bottom:6px; }
        .hepro-app__up { font-size:10.5px; font-weight:700; color:var(--v2-accent-text); }
        .hepro-app__spark { width:100%; height:auto; display:block; }
        .hepro-app__spark .line { stroke:var(--v2-accent); stroke-width:2.4; fill:none; stroke-linecap:round; }
        .hepro-app__spark .area { fill:url(#hepro-spark-g); }
        .hepro-app__spark .s0 { stop-color:var(--v2-accent); stop-opacity:.26; }
        .hepro-app__spark .s1 { stop-color:var(--v2-accent); stop-opacity:0; }
      `}</style>

      <div className="hepro-app">
        <div className="hepro-app__bar">
          <span className="hepro-app__dots" aria-hidden="true"><i /><i /><i /></span>
          <span className="hepro-app__crumb">{t("hero.board.title")}</span>
          <span className="hepro-app__pill">{t("hero.board.pill")}</span>
        </div>

        <div className="hepro-app__body">
          <div className="hepro-app__gt">
            <strong>{t("hero.board.greeting")}</strong>
            <span>{t("hero.board.date")}</span>
          </div>

          <div className="hepro-app__stats">
            {STATS.map((s) => (
              <div key={s.key} className={`hepro-app__stat is-${s.accent}`}>
                <span className="lbl">{t(`hero.board.${s.key}`)}</span>
                <b className="val">{s.val}</b>
                {s.delta ? <em className="delta">{s.delta}</em> : null}
              </div>
            ))}
          </div>

          <div className="hepro-app__card">
            <div className="hepro-app__ahead">
              <b>{t("hero.board.today")}</b>
              <span>{t("hero.board.appointmentCount")}</span>
            </div>
            {APPTS.map((a) => (
              <div className="hepro-app__appt" key={a.time}>
                <span className="hepro-app__t">{a.time}</span>
                <span className="hepro-app__ini" aria-hidden="true">{a.ini}</span>
                <span className="hepro-app__who">
                  <b>{a.name}</b>
                  <em>{t(`hero.board.${a.typeKey}`)}</em>
                </span>
                <span className="hepro-app__ok">{t("hero.board.confirmed")}</span>
              </div>
            ))}
          </div>

          <div className="hepro-app__card hepro-app__chart">
            <div className="hepro-app__ahead">
              <b>{t("hero.board.activity")}</b>
              <span className="hepro-app__up">↑ +48%</span>
            </div>
            <svg className="hepro-app__spark" viewBox="0 0 300 60" fill="none" aria-hidden="true">
              <defs>
                <linearGradient id="hepro-spark-g" x1="0" y1="0" x2="0" y2="1">
                  <stop className="s0" offset="0" />
                  <stop className="s1" offset="1" />
                </linearGradient>
              </defs>
              <path
                className="area"
                d="M6,48 C46,46 66,36 108,30 C150,24 176,10 232,10 C266,10 282,9 294,8 L294,60 L6,60 Z"
              />
              <path
                className="line"
                d="M6,48 C46,46 66,36 108,30 C150,24 176,10 232,10 C266,10 282,9 294,8"
              />
            </svg>
          </div>
        </div>
      </div>
    </aside>
  );
}
