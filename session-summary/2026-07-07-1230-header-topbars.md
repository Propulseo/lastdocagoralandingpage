# 2026-07-07 12:30 - Header topbars Pro/Patient

## Contexte

Refonte de la ligne utilitaire au-dessus du header pour les deux audiences DocAgora :

- LP Patient : renforcer les signaux utiles avant la navigation.
- LP Pro : afficher les signaux B2B demandes par Etienne : contact, RGPD, hebergement Portugal.

## Changements

- `HeaderV4` enrichi avec deux contenus de topbar distincts selon `variant="patient"` ou `variant="pro"`.
- Version Pro :
  - badge `Early access Portugal`
  - `Conforme RGPD`
  - `Donnees hebergees au Portugal`
  - lien mail direct `hello@docagora.com`
- Version Patient :
  - `Professionnels verifies`
  - langues `PT / FR / EN`
  - `Recherche gratuite`
  - `Portugal`
- Nouveau style visuel : fond navy premium, badge, separateurs fins, chip contact, effet de sheen discret.
- Repartition pleine largeur sur desktop pour les deux topbars Pro et Patient, avec une grille en 4 zones pour centrer les informations intermediaires (`PT / FR / EN`, recherche gratuite).
- Fallback mobile compact pour eviter les debordements sur petits ecrans.
- Traductions ajoutees en FR, EN et PT dans `topbar`.

## Validation

- `npm exec tsc -- --noEmit` : OK
- JSON locales FR/EN/PT parsees : OK
- `npm exec eslint -- src/components/layout/HeaderV4.tsx` : OK
- `npm run build` : OK
- Verification locale HTML :
  - `http://localhost:3000/fr` : topbar Patient OK
  - `http://localhost:3000/fr/pro` : topbar Pro OK

## Notes

- Le lint global du dossier garde des erreurs historiques hors de ce changement (`scripts/*.cjs`, variantes pro), donc la validation a ete ciblee sur le header modifie.
