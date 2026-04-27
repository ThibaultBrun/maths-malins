# Maths Malins

Application web ludique pour apprendre les mathématiques aux enfants (additions, soustractions, multiplications, divisions).

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

Le résultat est dans `dist/`, prêt à être déployé en statique (GitHub Pages, Netlify, Vercel...).

## Architecture

- **Vite + React + Tailwind + Framer Motion**, 100 % front, aucun backend
- Progression de l'enfant en `localStorage`
- Sons générés via Web Audio API (pas de fichier audio)
- Modules indépendants dans `src/modules/<module>/`
- Composant de quiz partagé : `src/components/Quiz.jsx`
