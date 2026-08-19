/**
 * Genere `src/styles/medically.css` a partir des feuilles du template Medically.
 *
 * Le template utilise des selecteurs globaux (html, body, h1..h6, p, a, *) qui
 * ecraseraient le header, le footer et la DA du landing. Ce script prefixe donc
 * chaque selecteur par `.med`, de sorte que rien ne fuit hors des pages qui
 * portent cette classe. Les @font-face, @keyframes et @import restent au niveau
 * racine : les prefixer n'aurait aucun sens et casserait le chargement.
 *
 * Les chemins d'assets (../../images, ../fonts...) sont reecrits vers
 * /medically/... , ou les fichiers ont ete copies dans public/.
 *
 * Usage : node scripts/build-medically-css.cjs <dossier-src-du-template>
 */
const fs = require("fs");
const path = require("path");
const postcss = require("postcss");

const SCOPE = ".med";

// Ordre volontaire : les icones et animations d'abord, la feuille du theme
// ensuite, pour que ses regles gagnent en cas de conflit.
const SOURCES = [
  "css/font-awesome.min.css",
  "css/themify-icons.css",
  "css/flaticon_medically.css",
  "css/animate.css",
  "sass/style.css",
];

/** Selecteurs racine : deviennent `.med` lui-meme, pas `.med html`. */
const ROOT_SELECTORS = new Set(["html", "body", ":root", "*", "html body"]);

function scopeSelector(selector) {
  const trimmed = selector.trim();
  if (!trimmed) return trimmed;
  if (trimmed.startsWith(SCOPE)) return trimmed;
  if (ROOT_SELECTORS.has(trimmed)) return SCOPE;

  // `body .x` / `html .x` -> `.med .x`
  const rooted = trimmed.match(/^(?:html|body)\s+(.*)$/);
  if (rooted) return `${SCOPE} ${rooted[1]}`;

  // Les pseudo-elements globaux (`*::before`) restent portes par le scope.
  if (trimmed.startsWith("*")) return `${SCOPE} ${trimmed}`;

  return `${SCOPE} ${trimmed}`;
}

/** Prefixe tout, sauf ce qui vit hors cascade (keyframes, font-face, page). */
const KEEP_AS_IS = new Set(["keyframes", "font-face", "import", "charset", "page"]);

function isInsideKeyframes(rule) {
  let parent = rule.parent;
  while (parent) {
    if (parent.type === "atrule" && /keyframes$/.test(parent.name)) return true;
    parent = parent.parent;
  }
  return false;
}

const scopePlugin = {
  postcssPlugin: "scope-medically",
  Once(root) {
    root.walkRules((rule) => {
      if (isInsideKeyframes(rule)) return;
      const parent = rule.parent;
      if (parent && parent.type === "atrule" && KEEP_AS_IS.has(parent.name.toLowerCase())) return;
      rule.selectors = rule.selectors.map(scopeSelector);
    });
  },
};

/**
 * Fraunces occupe nettement plus de largeur que Katibeh a taille egale : les
 * titres du template debordaient de leurs encadres (« Médecine générale » sur
 * deux lignes dans une carte prevue pour « Dental Care »). On reduit donc les
 * tailles de titre a la generation, comme pour les couleurs — les redefinir une
 * a une representerait des dizaines de surcharges.
 *
 * La hauteur de ligne n'est volontairement PAS reduite : un serif a besoin de
 * plus d'interligne qu'un display condense.
 */
const HEADING_SCALE = 0.88;
const HEADING_SELECTOR = /\bh[1-6]\b|section_title|widget-title|entry-details|_title\b/;

const scaleHeadingsPlugin = {
  postcssPlugin: "scale-medically-headings",
  Once(root) {
    root.walkRules((rule) => {
      if (!HEADING_SELECTOR.test(rule.selector)) return;
      rule.walkDecls("font-size", (decl) => {
        decl.value = decl.value.replace(/(\d+(?:\.\d+)?)px/g, (match, px) => {
          const scaled = Math.round(parseFloat(px) * HEADING_SCALE);
          // En dessous de 20px, la reduction se voit plus qu'elle ne sert.
          return parseFloat(px) < 20 ? match : `${scaled}px`;
        });
      });
    });
  },
};

function rewriteUrls(css) {
  return css.replace(/url\((['"]?)([^)'"]+)\1\)/g, (match, quote, url) => {
    if (/^(https?:|data:|\/)/.test(url)) return match;
    const cleaned = url.replace(/^(\.\.\/)+/, "");
    if (/^images\//.test(cleaned)) return `url("/medically/${cleaned}")`;
    if (/^fonts\//.test(cleaned)) return `url("/medically/${cleaned}")`;
    // Chemin relatif inattendu : on le rattache aux polices, ou vivent les
    // icones, plutot que de le laisser pointer dans le vide.
    return `url("/medically/fonts/${path.basename(cleaned)}")`;
  });
}

/**
 * Bouclier d'isolation — l'etancheite dans l'AUTRE sens.
 *
 * Prefixer les selecteurs par `.med` empeche le template de deborder sur le
 * site. Mais l'inverse restait ouvert : le landing definit lui aussi des
 * classes generiques, et notre balisage porte les memes noms. Cas vecu :
 * `public/assets/css/style.css` declare
 * `.widget { padding: 40px; border-radius: 10px; background-color: #def8f6 }`,
 * ce qui transformait les widgets de sidebar en encadres vert d'eau absents du
 * template.
 *
 * Les douze classes ci-dessous sont l'intersection exacte entre les classes
 * definies par le landing et celles employees par le template (Bootstrap exclu,
 * qui est legitimement partage). Le bloc est emis EN TETE de la feuille : a
 * specificite egale, les regles du template qui suivent l'emportent, et seules
 * les proprietes que personne ne redefinit retombent sur des valeurs neutres.
 */
const COLLIDING_CLASSES = [
  "contact-info",
  "current",
  "error",
  "gallery",
  "preloader",
  "price",
  "slick-active",
  "slick-dots",
  "slick-slide",
  "slider-nav",
  "tab-content",
  "widget",
];

const ISOLATION_SHIELD = `/* ── Bouclier : neutralise ce que le CSS du landing impose a ces classes ──
   Voir COLLIDING_CLASSES dans scripts/build-medically-css.cjs. */
${COLLIDING_CLASSES.map((c) => `.med .${c}`).join(",\n")} {
  background: none;
  border: 0;
  border-radius: 0;
  box-shadow: none;
  padding: 0;
  margin: 0;
  overflow: visible;
}
${COLLIDING_CLASSES.map((c) => `.med .${c}::before,\n.med .${c}::after`).join(",\n")} {
  content: none;
}

`;

/**
 * Habillage DocAgora : on garde la STRUCTURE du template, on remplace son
 * identite. Substitution a la generation plutot qu'une pile de surcharges —
 * ces couleurs apparaissent des dizaines de fois chacune, les surcharger une a
 * une reviendrait a reecrire la feuille.
 *
 * Correspondances etablies depuis tokens.css, pour que la page parle exactement
 * la meme langue que les deux pages d'accueil validees.
 */
const DA_SUBSTITUTIONS = [
  // ── Typographie ──────────────────────────────────────────────────────────
  // Katibeh (titres) -> Fraunces ; Poppins (corps) -> Montserrat.
  // Les @font-face du template utilisent des apostrophes simples : les cibler
  // en guillemets doubles ne touche que les usages, pas les declarations.
  [/font-family: "Katibeh";/g, 'font-family: var(--font-fraunces), "Fraunces", Georgia, serif;'],
  [
    /font-family: "Poppins", sans-serif;/g,
    'font-family: var(--font-montserrat), "Montserrat", sans-serif;',
  ],

  // ── Couleurs ─────────────────────────────────────────────────────────────
  [/#000B47/gi, "#244882"], // titres : navy Medically -> navy DocAgora
  [/#687693/gi, "rgba(36, 72, 130, 0.82)"], // corps de texte
  [/#767676/gi, "rgba(36, 72, 130, 0.82)"],
  [/#585858/gi, "rgba(36, 72, 130, 0.72)"],
  [/#0080D2/gi, "#4A7CC7"], // bleu clair -> cobalt
  [/#fafbfe/gi, "#F8FAFD"], // fond de section -> light-2
  [/#D5DCE1/gi, "#e5e8ea"], // filets
  [/#D9D9D9/gi, "#e5e8ea"],

  // Degrade d'accent : le bleu -> cyan du template devient navy -> teal.
  [/#1E63FF/gi, "#244882"],
  [/#187CFF/gi, "#33639E"],
  [/#128FFF/gi, "#4A7CC7"],
  [/#0CA9FF/gi, "#5AA2AA"],
  [/#06C2FF/gi, "#67CBC7"],
  [/#00DBFF/gi, "#8ADAD6"],
];

function applyDocAgoraSkin(css) {
  return DA_SUBSTITUTIONS.reduce((acc, [pattern, value]) => acc.replace(pattern, value), css);
}

/**
 * Corrections rendues necessaires par le scoping lui-meme.
 *
 * Le template pose plusieurs decors en `z-index: -1` (fleche pointillee du
 * process, degrade bleu de la bande de chiffres). Sur le site d'origine ces
 * couches remontent jusqu'a la racine de la page et restent visibles. Ici, le
 * conteneur `.med` peint un fond opaque : les couches negatives passent
 * derriere lui et disparaissent — bande de chiffres blanche sur blanc, fleche
 * invisible. On retablit sans toucher au rendu voulu.
 */
const SCOPING_FIXES = `
/* ── Corrections de scoping (ajoutees par le script) ────────────────────── */

/* Bande de chiffres : le degrade etait pose par un ::before en z-index -1,
   avale par le fond de .med. On empile les deux fonds sur la section elle-meme
   — le motif topographique par-dessus, le degrade en dessous — ce qui donne
   exactement le rendu d'origine sans couche negative. */
.med .funfact_section,
.med .funfact_section_s2 {
  background:
    url("/medically/images/funfut-shape.png") no-repeat center/cover,
    linear-gradient(358deg, #244882 -1077.15%, #33639E -690.64%, #4A7CC7 -213.19%, #5AA2AA 218.79%, #67CBC7 764.46%, #8ADAD6 1196.44%);
}
.med .funfact_section::before,
.med .funfact_section_s2::before { content: none; }

/* Fleche pointillee du process : .work_wrapper est en position relative mais
   sans z-index, donc il ne cree pas de contexte d'empilement et son enfant en
   z-index -1 s'echappe derriere .med. Un z-index: 0 suffit a le retenir. */
.med .work_wrapper { z-index: 0; }

/* ── Habillage DocAgora : rythme vertical et fond ───────────────────────── */

/* Le template respire a 120px entre sections, la home validee a
   clamp(36px, 4vw, 60px). On se cale pres de la home sans etouffer des
   sections nettement plus chargees en contenu. */
.med .section-padding { padding-block: clamp(44px, 5vw, 72px); }
.med .wpo-breadcumb-area { padding-block: clamp(52px, 6vw, 88px); }
/* Bande de chiffres : le template la dimensionne pour une page tres aeree
   (icone 60px, chiffres 40px, 60px de padding). A notre rythme resserre elle
   formait un pave qui coupait la lecture. On reduit la bande elle-meme, pas
   seulement ses marges. */
.med .funfact_section,
.med .funfact_section_s2 {
  padding-block: clamp(22px, 2.6vw, 36px) clamp(2px, 0.8vw, 10px);
}
.med .funfact_section .item,
.med .funfact_section_s2 .item { margin-bottom: 14px; }
.med .funfact_section .item i,
.med .funfact_section_s2 .item i { font-size: 40px; }
.med .funfact_section .item h3,
.med .funfact_section_s2 .item h3 {
  font-size: 32px;
  line-height: 1.15;
  margin-bottom: 2px;
}

/* Couture process -> chiffres : le bas de la section process respirait autant
   que son haut, ce qui ajoutait un blanc juste avant la bande. */
.med .work_section_s2.section-padding { padding-bottom: clamp(14px, 1.8vw, 26px); }
.med .service_single.section-padding,
.med .wpo-blog-pg-section.section-padding,
.med .wpo-contact-pg-section.section-padding {
  padding-block: clamp(40px, 4.5vw, 64px);
}

/* Fond : l'aurora fixe des pages d'accueil traverse toute la page, au lieu du
   blanc plat du template. Meme recette que .v2pat sur la home patient. */
.med {
  background:
    radial-gradient(46% 38% at 86% 3%, rgba(var(--color-teal-rgb), 0.16), transparent 60%),
    radial-gradient(42% 46% at 2% 60%, rgba(var(--color-cobalt-rgb), 0.11), transparent 64%),
    radial-gradient(40% 40% at 70% 100%, rgba(var(--color-mint-rgb), 0.10), transparent 66%),
    var(--color-light-1);
  background-attachment: fixed;
}

/* Sections a fond blanc plat : on les rend transparentes pour que l'aurora
   traverse (technique « canvas continu » du peaufinage). Les bandes voulues
   — chiffres, teintes — gardent le leur. */
.med .about_section,
.med .work_section_s2,
.med .team_section_s2,
.med .blog_section,
.med .service_single,
.med .wpo-blog-pg-section,
.med .wpo-contact-pg-section { background: transparent; }

/* Fraunces n'a pas les metriques de Katibeh : sans ce reglage les titres
   sortent trop gras et trop espaces. */
.med h1, .med h2, .med h3, .med h4, .med h5, .med h6 {
  font-weight: var(--fw-semibold);
  letter-spacing: -0.01em;
}

/* Encadres de specialites : les intitules francais sont plus longs que les
   « Dental Care » du template. On laisse le titre respirer et on repartit la
   coupure sur deux lignes equilibrees plutot qu'un mot orphelin. */
.med .service_card .content h2 {
  font-size: clamp(17px, 1.5vw, 20px);
  line-height: 1.25;
  text-wrap: balance;
}
.med .service_card .content p {
  line-height: 1.55;
}

/* Encadres de hauteur egale : les descriptions font de une a trois lignes selon
   la specialite, ce qui donnait des cartes en escalier. Chaque colonne devient
   une boite flexible, la carte l'occupe entierement et la fleche est poussee en
   bas — les fleches s'alignent d'une carte a l'autre. */
.med .other-service .row { align-items: stretch; }
.med .other-service [class*="col-"] { display: flex; }
.med .other-service .service_card {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.med .other-service .service_card .content {
  display: flex;
  flex-direction: column;
  flex: 1;
}
.med .other-service .service_card .content p { flex: 1; }

/* ── Bandeau defilant des dix autres specialites ─────────────────────────
   Le template n'avait rien de tel : sa page ne presentait qu'un service. La
   mecanique reprend celle du carrousel de la page d'accueil — piste dupliquee
   pour une boucle invisible, arret au survol, coupure si les animations sont
   reduites. */
.med .med-marquee { margin-top: clamp(18px, 2.4vw, 32px); }
.med .med-marquee__label {
  margin: 0 0 12px;
  text-align: center;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-accent-ink);
}

/* Les bords s'estompent : les cartes naissent et disparaissent au lieu d'etre
   tranchees net par le bord du conteneur. */
.med .med-marquee__viewport {
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}

.med .med-marquee__track {
  display: flex;
  gap: 12px;
  width: max-content;
  animation: med-marquee-slide 38s linear infinite;
}
.med .med-marquee__viewport:hover .med-marquee__track,
.med .med-marquee__viewport:focus-within .med-marquee__track {
  animation-play-state: paused;
}

/* La piste contient deux copies : la translater de la moitie de sa largeur
   ramene la seconde exactement ou etait la premiere. */
@keyframes med-marquee-slide {
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
}

.med .med-marquee__item {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  flex: none;
  padding: 11px 20px;
  border: 1px solid var(--border-default);
  border-radius: 999px;
  background: #fff;
  color: var(--color-navy);
  font-size: 15px;
  font-weight: 500;
  text-decoration: none;
  white-space: nowrap;
  transition: border-color .18s ease, color .18s ease, transform .18s ease;
}
.med .med-marquee__item:hover {
  border-color: var(--color-accent);
  color: var(--color-accent-ink);
  transform: translateY(-2px);
}
.med .med-marquee__icon {
  display: grid;
  place-items: center;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: rgba(var(--color-teal-rgb), 0.14);
  color: var(--color-accent-ink);
  font-size: 15px;
}

@media (prefers-reduced-motion: reduce) {
  .med .med-marquee__track { animation: none; }
  .med .med-marquee__viewport {
    overflow-x: auto;
    -webkit-mask-image: none;
    mask-image: none;
  }
}

/* Titres de widgets : meme raison, « Restez informe » tenait sur deux lignes
   dans une colonne calibree pour « Newsletter ». */
.med .service_sidebar .widget h2 {
  font-size: clamp(18px, 1.6vw, 22px);
  line-height: 1.3;
  text-wrap: balance;
}
`;

async function main() {
  const srcRoot = process.argv[2];
  if (!srcRoot) {
    console.error("Usage : node scripts/build-medically-css.cjs <dossier-src-du-template>");
    process.exit(1);
  }

  const chunks = [];
  for (const rel of SOURCES) {
    const file = path.join(srcRoot, rel);
    if (!fs.existsSync(file)) {
      console.error(`Introuvable, ignore : ${rel}`);
      continue;
    }
    const raw = fs.readFileSync(file, "utf8");
    const result = await postcss([scaleHeadingsPlugin, scopePlugin]).process(raw, { from: file });
    chunks.push(`/* ── ${rel} ── */\n${result.css}`);
    console.error(`OK ${rel} (${Math.round(raw.length / 1024)} Ko)`);
  }

  let out = chunks.join("\n\n");
  out = rewriteUrls(out);

  // Les feuilles du template referencent leurs .map, restees dans le paquet
  // d'origine : le navigateur les chercherait en vain et logguerait un 404.
  out = out.replace(/\/\*#\s*sourceMappingURL=[^*]*\*\//g, "");

  out = applyDocAgoraSkin(out);

  // Poppins n'est plus utilisee apres substitution : inutile d'aller la
  // chercher chez Google a chaque chargement de page.
  out = out.replace(/@import\s+url\(["']?https:\/\/fonts\.googleapis[^)]*\)[^;]*;/g, "");

  // Les @import doivent preceder toute regle : on les remonte en tete.
  // On borne sur la parenthese fermante, pas sur le premier `;` : l'URL des
  // Google Fonts en contient (la liste des graisses), ce qui tronquerait l'URL.
  const imports = [];
  out = out.replace(/@import\s+url\((['"]?)[^)]*\1\)[^;]*;/g, (m) => {
    imports.push(m);
    return "";
  });

  const header =
    "/* GENERE PAR scripts/build-medically-css.cjs — NE PAS EDITER A LA MAIN.\n" +
    "   Feuilles du template Medically, chaque selecteur prefixe par `.med`\n" +
    "   pour ne pas contaminer le header, le footer et la DA du landing. */\n";

  const dest = path.join(__dirname, "..", "src", "styles", "medically.css");
  fs.writeFileSync(
    dest,
    `${header}${[...new Set(imports)].join("\n")}\n\n${ISOLATION_SHIELD}${out}\n${SCOPING_FIXES}`,
    "utf8",
  );
  console.error(`\nEcrit : ${dest} (${Math.round(fs.statSync(dest).size / 1024)} Ko)`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
