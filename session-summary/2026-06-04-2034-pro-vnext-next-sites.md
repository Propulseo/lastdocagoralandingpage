# Session du 2026-06-04 20:34

## Mission
Créer deux directions comparables pour la LP Pro v-next DocAgora :
une version intégrée dans le projet Next `landing/`, et une version autonome avec
le plugin Sites (`vinext-starter`).

## Travail effectué
- Ajout route Next : `src/app/[locale]/v-next/pro/`.
- Ajout CSS scoppé : `src/styles/vnext-pro.css`.
- Ajout namespace i18n `proVNext` dans `fr.json`, `en.json`, `pt.json`.
- Ajout prototype Sites : `../sites/docagora-pro-vnext/`.
- Correction build Sites Windows : `scripts/copy-appgen-meta.mjs` + script `npm run build`.
- Installation outils/dépendances : `rg` via winget, puis `npm ci` dans le prototype Sites.

## Décisions techniques prises
- Next v-next Pro utilise `HeaderV4 variant="pro"` et `FooterPro` pour comparer dans
  le vrai shell DocAgora.
- Sites reste autonome, statique, sans D1/R2/auth, pour servir de concept plus libre.
- Palette Pro : dark premium + accent cobalt unique, avec signaux RGPD/Portugal/PT-FR-EN.
- Aucun import croisé entre `landing/` et `sites/`.

## Code review effectué
- Recherche ciblée `TODO|FIXME|console|alert|href=#` sur les nouveaux fichiers : OK.
- Vérification JSON des 3 locales : OK.
- `landing`: `npx tsc --noEmit` OK.
- `landing`: ESLint ciblé sur `v-next/pro` OK.
- `sites/docagora-pro-vnext`: ESLint ciblé OK.
- `sites/docagora-pro-vnext`: `npm run build` OK.

## État final
- Next local : `http://localhost:3000/fr/v-next/pro` répond 200.
- Sites local : `http://localhost:3002/` répond 200.
- `npx next typegen` a timeout sur Windows, mais la route compile au dev server et `tsc --noEmit` passe.
- `npm run lint` global a timeout dans `landing` et Sites ; lint ciblé passé.

## Blockers
- Aucun bloquant fonctionnel.
- Attention : ne pas lancer `npm run build` Next pendant qu’un `next dev` tourne.

## À faire ensuite
- Comparer visuellement les deux directions.
- Choisir la direction à approfondir ou mixer.
- Si promotion envisagée : passer le copy final dans l’i18n prod et faire build complet hors dev server.

## Contexte minimal pour reprendre
- Route Next : `/fr/v-next/pro`.
- Prototype Sites : `sites/docagora-pro-vnext`.
- Serveurs lancés : landing `:3000`, Sites `:3002`.
- Progress durable mis à jour dans `.planning/PROGRESS_lp-vnext.md`.
