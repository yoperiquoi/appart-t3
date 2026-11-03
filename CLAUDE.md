# Appartement T3 (62,6 m²) — rendu 3D interactif

Projet : visualiser l'appartement (Avant / Projet de rénovation) puis comparer des ameublements. Langue de travail : français.

## Lancer
`python3 -m http.server 8000` puis ouvrir http://localhost:8000 (three.js r128 chargé via CDN).
Le fichier `index.html` est autonome ; `src/widget-fragment.html` est le même code sans enveloppe (pour affichage inline dans Claude).

## Géométrie
- Échelle : S=68 px/m, origine ox=157, oz=15 ; X(p)=(p-ox)/S, Z(p)=(p-oz)/S (coordonnées = pixels du plan). Hauteur H=2,5 m.
- Murs : extérieurs E=0,2 m, intérieurs I=0,1 m. `wall(dir,c,a0,a1,t,ouvertures)` ; ouvertures k = 'win' | 'pf' | 'door' (vantail fermé) | 'open' (sans vantail, ajouter `leaf()`).
- Groupes : wallGroup (échelle Y en « vue maquette »), floorGroup, fixGroup, tallGroup (rideaux, meubles hauts : visibles murs complets).
- Peinture : `paints` (propositions ; `f` = couleurs des textiles lues par `theme()`), `paintWalls` (murs d'accent par pièce), `paintGroup` (suit l'échelle des murs), `applyPaint()` reconstruit au changement de mode ou de proposition.
- Meubles : furnGroup (bas), furnWall (hauts, suit l'échelle des murs), furnTall (visibles murs complets) ; masqués ensemble par « Cacher les meubles ». Étiquette de meuble : 6e élément = 1.
- Modes : `modes.avant` et `modes.projet` (build() + liste des étiquettes).
- Caméra : `focus` (centre + distance par pièce), `goTo(pièce, dessus)` anime vers la vue ; un glisser ou la molette interrompt l'animation.

## État actuel (validé par l'utilisateur au fil des retours)
- Avant : lino jaunâtre (séjour, chambres, entrée), lino gris foncé (SDB/WC), entrée et fond de couloir grands ouverts, porte d'entrée dans l'entrée, placard d'entrée existant, fresque jungle chambre 1 à partir de x≥437 (retirée dans le Projet).
- Projet : couloir transformé en placard 2,00 × 0,60 m (rails coulissants, mur côté entrée qui dépasse de quelques cm), carrelage beige clair (séjour/entrée), carrelage gris foncé (SDB/WC), plancher flottant (chambres), porte SDB + WC conservées, nouvelle porte chambre 1.
- Portes en bleu (#3b82c4) + encadrements bleu foncé, pour la lisibilité seulement (réelles : blanches).
- Approximations connues : cuisine, teinte du lino SDB/WC, espace devant le placard ≈ 35 cm, chambre 1 ≈ 11,5 m².

## Prochaine étape
Ameublement : comparer des variantes (séjour ou chambres en premier — choix en attente). Ajouter un mode/sélecteur de variantes de meubles dans `modes.projet`, avec cotes réelles des meubles.

## Conventions
- Pas de commentaires dans le code JS ; variables CSS pour le thème clair/sombre.
- Vérif visuelle : playwright chromium, capture puis contrôle de la console (pas d'erreur JS).

## Références
- `HISTORIQUE.md` : toutes les demandes, décisions et erreurs déjà corrigées — à lire en premier.
- `ref/plans/` : plan original et plan du projet ; `ref/photos/` : photos de l'appartement ; `ref/captures/` : rendus de référence.
- `tools/check-console.js` : test headless (erreurs JS). Il bloque three.js depuis un fichier local : adapter le chemin (`npm i three@0.128.0`).
