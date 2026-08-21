import { readFileSync } from "node:fs";

/**
 * Refuse de laisser passer un emplacement `[[...]]` non rempli dans les
 * textes du site.
 *
 * Les mentions légales et la politique de confidentialité ont été rédigées
 * avec des marqueurs voyants en attendant les informations de la société
 * (raison sociale, NIPC, adresse, hébergeur, délais de conservation). Ce
 * script existe pour qu'un de ces marqueurs ne parte jamais en production
 * sans qu'on s'en aperçoive.
 *
 * Usage : npm run check:legal
 */
const LOCALES = ["pt", "fr", "en"];
const PATTERN = /\[\[[A-Z_]+\]\]/g;

let total = 0;

for (const locale of LOCALES) {
  const path = `src/i18n/locales/${locale}.json`;
  const raw = readFileSync(path, "utf8");
  const found = [...new Set(raw.match(PATTERN) ?? [])];

  if (found.length > 0) {
    total += found.length;
    console.error(`\n${path} — ${found.length} emplacement(s) a remplir :`);
    for (const marker of found.sort()) console.error(`  ${marker}`);
  }
}

if (total > 0) {
  console.error(
    "\nCes marqueurs s'afficheraient tels quels sur le site public.\n" +
      "Remplacez-les par les informations reelles avant la mise en ligne.\n",
  );
  process.exit(1);
}

console.log("Aucun emplacement a remplir : les textes legaux sont complets.");
