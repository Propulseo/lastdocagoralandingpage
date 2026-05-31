# Session du 2026-05-30 (19:44)

## Mission
Retravailler les 2 landing pages (patient B2C + pro B2B) pour un « effet wouah » à l'arrivée.
Demande d'Étienne : **5 variantes par landing, radicalement différentes**, codées et cliquables,
en s'appuyant sur les skills/plugins disponibles. Objectif : montrer la qualité du produit DocAgora
dès la première impression.

## Travail effectué
**Cadrage (réponses d'Étienne via AskUserQuestion)**
- Format : pages réelles codées & cliquables (pas mockups).
- Stack : **rester dans la stack actuelle** (Bootstrap + tokens + Framer Motion) — la refonte
  Tailwind/shadcn a été déconseillée et écartée (conflit reset Bootstrap/Tailwind preflight,
  codebase à deux systèmes, gain wouah nul vs le framework CSS).
- Répartition : 5 directions très différentes par page.
- Univers visuel : « tente tout, choque-moi » → spectre large.

**Phase 1 — Audit (workflow, 5 agents Explore en parallèle)**
Cartographie : page patient, page pro, design system, contenu/positionnement, stack technique.

**Phase 2 — Build (workflow, 10 agents Opus `frontend-developer` en parallèle)**
10 pages réelles auto-suffisantes créées sous `src/app/[locale]/variants/` :
- Hub : `src/app/[locale]/variants/page.tsx` (galerie des 10, écrite manuellement).
- Patient : `variants/patient/{1..5}/page.tsx`
  1. **Clínica Clara** — premium clinique lumineux (Doctolib/Alan), console de recherche sereine + cartão verificado animé. (~1175 l.)
  2. **Histórias de Saúde** — éditorial magazine, Fraunces XXL, duotone `/assets/images/about/2.jpg`, index éditorial des spécialités. (~1143 l.)
  3. **Sinal Vital** — immersif dark, mesh animé + tracé ECG SVG + mot multilingue cross-fade. (~720 l.)
  4. **Bento Saúde** — mosaïque bento, carte du Portugal SVG, compteurs tabular-nums. (~960 l.)
  5. **Pesquisa Viva** — product-led, console de recherche FONCTIONNELLE (chips + typewriter + résultats live illustratifs). (~1627 l.)
- Pro : `variants/pro/{1..5}/page.tsx`
  1. **Painel** — SaaS clean, mockup navigateur CSS avec tabs Agenda/Pacientes/Marcações/Painel pilotés en useState. (~870 l.)
  2. **Confiança** — autorité éditoriale sobre, navy + serif, « 04 razões » sticky + IntersectionObserver. (~660 l.)
  3. **Órbita** — dark glassmorphism, orbes flottants + compteurs KPI animés (rAF). (~720 l.)
  4. **Retorno** — ROI numbers-first, antes/depois + grandes métriques illustratives animées. (~1559 l.)
  5. **Fundadores** — carte de membership 3D (tilt souris + foil teal + shine). (~660 l.)

**Skills utilisés** : `frontend-design` (principes anti-slop, engagement bold, atmosphère/typo/motion)
et `ui-ux-pro-max` (accessibilité, layout, animation, palettes) — principes distillés dans le contrat
des agents.

## Décisions techniques prises
- **Route isolée `/variants` sous `[locale]`** : hérite des CSS/fonts globales du layout, PT par défaut
  (`/variants`), site de prod jamais touché. Permet click-through + comparaison live.
- **Chaque variante = 1 fichier `"use client"` auto-suffisant** (sous-composants locaux autorisés),
  classes CSS **toutes préfixées** (`pat1-`…`pro5-`) pour zéro collision avec le CSS legacy global
  (style.css agressif) ; reset explicite (box-sizing, font-family, text-transform) sur chaque racine.
- **Animations CSS-first** (keyframes + animation-delay) plutôt que framer-motion, pour l'auto-suffisance ;
  React `useState/useEffect` uniquement pour les variantes interactives (pat5, pro1, pro3, pro4).
- **Garde-fous contenu** : copy PT-PT, **aucune survente** (marcação « em breve », pas de
  téléconsulta/paiement/ordonnance/remboursement), tous chiffres/témoignages marqués `*ilustrativo`,
  CTA en ancres internes (`#`), couleurs 100% tokens de marque.
- **i18n** : copy inline pour les prototypes ; les strings de la/les variante(s) gagnante(s)
  seront externalisées en i18n avant go-live.
- **Langue showcase** : généré d'abord en PT-PT, puis **basculé en FR** à la demande d'Étienne pour
  la revue (11 fichiers traduits via 11 agents). Le marché réel reste le Portugal → l'i18n final sera
  PT/FR/EN. Fix post-traduction : apostrophes droites dans des chaînes JS `'...'` (cassaient le build)
  converties en apostrophe typographique ’ (script regex `lettre'lettre`→`lettre’lettre`, 98 occurrences) ;
  un « France » à la place de « Portugal » corrigé dans patient/3.

## Code review effectué
- Vérif SSR-safety par grep : tous les `window`/`document`/`matchMedia` sont gardés par
  `typeof window === "undefined"` ou placés dans `useEffect` → pas de crash de pré-rendu.
- Build complet `npm run build` lancé sur tout le projet.

## État final
- ✅ `npm run build` : **exit 0**. Compilé en 1.8s, TypeScript clean, **74/74 pages** générées.
- ✅ Les **11 nouvelles routes** prérendues en SSG (pt/en/fr) : `/variants` + 10 variantes.
- ✅ Aucune route de production modifiée (site live intact).
- ✅ Serveur dev déjà actif sur `:3000` (le nouveau lancement a échoué EADDRINUSE — normal) →
  variantes accessibles sur le serveur existant : `http://localhost:3000/variants`.
- ⏳ **Non fait** : QA visuelle (screenshots/rendu animé) ; revue ligne-à-ligne approfondie des
  10 fichiers (build + lint + SSR vérifiés, mais pas d'inspection visuelle).

## Blockers
Aucun. Build vert.

## À faire ensuite
1. Étienne ouvre `/variants`, clique, choisit la/les direction(s) « wouah » (patient + pro).
2. (Optionnel) Passe QA visuelle screenshots (desktop/mobile, reduced-motion pour frames stables).
3. Affiner la/les gagnante(s), puis **promouvoir** vers les vraies pages + **externaliser l'i18n** (PT/FR/EN)
   et **supprimer le scaffolding `/variants`** (même pattern que la session `pro-sections-redesign-variants`).

## Contexte minimal pour reprendre
- Showcase : `src/app/[locale]/variants/` — hub `page.tsx` + `patient/{1..5}` + `pro/{1..5}`.
- Pattern de chaque variante : `"use client"`, `<style>` inline scopé préfixé, tokens de marque,
  CSS anim + reduced-motion, responsive 1280/768/375, zéro `<img>` incertain (visuels CSS/SVG).
- 10 directions : Patient = Clínica Clara / Histórias de Saúde / Sinal Vital / Bento Saúde / Pesquisa Viva ;
  Pro = Painel / Confiança / Órbita / Retorno / Fundadores.
- Contraintes respectées : Bootstrap stack (pas de Tailwind), pas de survente, i18n à externaliser au moment de promouvoir.
- Build vérifié vert ; dev sur `:3000`.
