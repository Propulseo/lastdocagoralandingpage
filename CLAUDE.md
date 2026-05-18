# CLAUDE.md — DocAgora Landing

> Ce projet vit dans `./landing/` du monorepo DocAgora. Voir `AGENTS.md` a la racine pour le contexte global.

---

## 6. Routes

| Route | Page | Source HTML d'origine |
|-------|------|----------------------|
| `/` | Home (PT par défaut) | index.html |
| `/about` | About (PT) | about-us.html |
| `/specialties` | Specialties (PT) | services.html |
| `/blog` | Blog (PT) | blog.html |
| `/contact` | Contact (PT) | contact-us.html |
| `/en/*` | Mêmes pages en anglais | — |
| `/fr/*` | Mêmes pages en français | — |

Locale par défaut : `pt`. Routing `localePrefix: "as-needed"` (PT sans préfixe, EN et FR préfixés).

## 7. i18n

- Toutes les strings via `useTranslations()` de next-intl.
- Clés organisées par page/section dans `en.json` : `home.hero.title`, `home.features.smartSearch.label`, etc.
- 3 locales complètes : `en.json` (anglais), `pt.json` (portugais PT-PT), `fr.json` (français FR-FR) — 418 clés chacune.
- Locale par défaut : `pt` (configuré dans `src/i18n/config.ts`).
- Routing : `src/i18n/routing.ts` via `defineRouting` de next-intl avec `localePrefix: "as-needed"`.
- Proxy i18n : `src/proxy.ts` (Next.js 16 proxy, remplace middleware.ts).
- Sélecteur de langue : `src/components/layout/LanguageSwitcher.tsx` (PT | EN | FR) intégré dans la navbar.
- Metadata SEO localisée par page (title, description, OpenGraph, Twitter) via `generateMetadata`.

## 8. Bootstrap et structure des sections

Toutes les sections suivent la structure Bootstrap stricte :

```tsx
<section className="...">
  <div className="container">
    <div className="row">
      <div className="col-lg-X">...</div>
    </div>
  </div>
</section>
```

Bootstrap 5.3.8 installé via npm. Le `.container` Bootstrap est obligatoire pour le centrage horizontal. Ne jamais le remplacer par `.container-fluid` sauf intention explicite (hero pleine largeur, par exemple).

## 9. jQuery et plugins

- jQuery (3.5.1) + plugins chargés via **DOM manipulation manuelle** (`document.createElement("script")`) dans `src/lib/jquery-loader.tsx`.
- Plugins utilisés : **Slick** (carousels), **Magnific Popup** (galeries/vidéos), **NiceSelect** (select stylisés).
- Les composants utilisant ces plugins (HeroSlider, SpecialtiesCarousel, TeamCarousel, CitiesGallery, WorkProcess, Gallery) sont `'use client'`.
- `jquery-loader.tsx` contient deux `useEffect` : un pour charger les scripts (une seule fois via ref), un pour réinitialiser les widgets à chaque changement de route (dépendance `pathname`).

## 10. Workflow de session

À la fin de chaque session de travail :

### Étape 1 — Code review

Relire le travail produit et corriger immédiatement :
- Erreurs de logique
- Code dupliqué à factoriser
- Types TypeScript faibles
- Composants trop gros (> 250 lignes utiles) à découper
- Strings en dur oubliées
- console.log oubliés
- Imports inutilisés
- Commentaires TODO/FIXME laissés
- Risques de régression

### Étape 2 — Rapport de session

Créer `session-summary/YYYY-MM-DD-HHmm-<slug-de-la-mission>.md` :

```markdown
# Session du <date>

## Mission
Résumé 3-5 lignes.

## Travail effectué
Fichiers créés, modifiés, dépendances ajoutées.

## Décisions techniques prises
Choix non triviaux + justification.

## Code review effectué
Problèmes identifiés + corrections appliquées.

## État final
Build, lint, ce qui marche, ce qui ne marche pas.

## Blockers
Problèmes non résolus.

## À faire ensuite
Recommandations courtes.

## Contexte minimal pour reprendre
5-10 infos clés pour redémarrer la prochaine session sans recompresser tout le code.
```

### Étape 3 — Index

Mettre à jour `session-summary/INDEX.md` avec une nouvelle entrée en tête :

```markdown
[YYYY-MM-DD HH:mm] <slug> — <résumé 1 ligne> → [voir détails](./YYYY-MM-DD-HHmm-<slug>.md)
```

## 11. Workflow de début de session

Si une nouvelle session est lancée sur ce projet et qu'un dossier `session-summary/` existe :

1. Lire `session-summary/INDEX.md`.
2. Lire les 1-3 derniers fichiers de session selon la pertinence.
3. Ne pas relire tout le code à froid — utiliser la section "Contexte minimal pour reprendre" des sessions précédentes.
4. Ne pas demander à Étienne de réexpliquer le contexte si présent dans les session-summaries.

## 12. Sources de vérité

À consulter en priorité avant toute modification :

- `src/i18n/locales/en.json` (toutes les clés textuelles)
- `src/app/[locale]/layout.tsx` (structure globale)
- Composants existants dans `src/components/`
- Tag Git `backup-before-legacy-removal-*` (HTML d'origine si référence visuelle nécessaire)

## 13. Avant commit

Vérifier :

- `npm run build` : 0 erreur TypeScript
- `npm run lint` : 0 erreur ESLint
- Aucune string en dur ajoutée
- Aucune survente DocAgora (téléconsultation, paiement, etc.)
- Rendu visuel cohérent avec le template d'origine
- Mobile 375px et desktop 1024px+ testés
- Aucun `console.log` oublié
- Aucun import inutilisé
- Card "Get In Touch" du footer : intouchée si la session ne la concerne pas spécifiquement

## 14. Hors scope (à ne pas faire sans validation)

- Migration Tailwind (Bootstrap reste pour cette phase)
- Création de vraies pages articles blog (`/blog/<slug>`)
- Connexion du formulaire de contact à un backend
- Déploiement Vercel
- Ajout de schema markup SEO (Article, FAQPage, LocalBusiness) — à faire en session dédiée
- Modification du logo, des images, des couleurs de marque (en attente d'assets DocAgora officiels)
