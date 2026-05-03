# Maths Malins

Application web ludique pour apprendre les mathématiques aux enfants : additions, soustractions, multiplications, divisions et fractions.

## Jouer en ligne

https://thibaultbrun.github.io/maths-malins/

## Démarrer

```bash
npm install
npm run dev
```

Ouvre http://localhost:5173/

## Construire pour la production

```bash
npm run build
```

Le résultat est dans `dist/`, prêt à être déployé en statique avec GitHub Pages.

## Architecture

- **Vite + React + Tailwind + Framer Motion**, 100 % front, aucun backend
- Progression de l'enfant en `localStorage`
- Sons générés via Web Audio API, sans fichier audio
- Modules indépendants dans `src/modules/<module>/`
- Composant de quiz partagé : `src/components/Quiz.jsx`
