# 2026-07-07 13:20 - About visual previews

## Mission

Creer plusieurs previews pour remplacer l'image floue de la section patient "Trouvez votre medecin au Portugal", sans modifier encore la section de production.

## Travail effectue

- Ajout de la route interne `src/app/[locale]/(patient)/about-visual-preview/page.tsx`.
- Creation de 3 directions visuelles :
  - mockup recherche + profils verifies ;
  - carte Portugal + reseau de soins ;
  - stack de profils professionnels verifies.
- Ajout des textes FR/EN/PT dans `aboutVisualPreview`.

## Decisions techniques prises

- Route preview separee pour permettre une validation visuelle avant de toucher `AboutPatient`.
- Previews en HTML/CSS natif plutot qu'une image statique, pour pouvoir reutiliser directement la direction choisie dans le composant final.
- Textes externalises dans i18n pour respecter les regles du projet.

## Code review effectue

- Pas de modification de la section de production.
- Pas de nouvelle dependance.
- Pas de string visible hors i18n.
- Les blocs sont responsive avec une version mobile simplifiee.

## Etat final

- `npm exec tsc -- --noEmit` : OK
- `npm exec eslint -- "src/app/[locale]/(patient)/about-visual-preview/page.tsx"` : OK
- JSON FR/EN/PT parse : OK
- `npm run build` : OK
- Routes locales verifiees :
  - `/fr/about-visual-preview`
  - `/en/about-visual-preview`
  - `/about-visual-preview`

## Blockers

- Aucun.

## A faire ensuite

- Choisir une direction.
- Extraire la direction retenue dans `AboutPatient` pour remplacer `/assets/images/about/2.jpg`.
- Relancer build puis push/deploiement si validation.

## Contexte minimal pour reprendre

- La page prod patient utilise `AboutPatient` depuis `src/app/[locale]/v-next/patient/_components/AboutPatient.tsx`.
- L'image floue actuelle est `/assets/images/about/2.jpg`.
- La route de preview n'est pas liee dans la navigation.
- L'option 1 est la plus orientee conversion ; option 2 plus territoriale ; option 3 plus humaine/profils.
