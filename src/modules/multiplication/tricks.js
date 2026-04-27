// Astuces pédagogiques par table.
// Règle d'écriture : ton direct ("tu"), vocabulaire concret (paquets, presque, on enlève),
// une seule opération à la fois, AUCUNE formule avec des lettres.
export const TRICKS = {
  2: [
    {
      type: 'double',
      title: 'C\'est juste le double',
      text: 'Multiplier par 2, c\'est compter le nombre deux fois. 2×7, c\'est 7 et encore 7, ça fait 14 !',
      featured: true,
    },
    {
      type: 'commute',
      title: 'On peut tourner le calcul',
      text: '2×8 ou 8×2, c\'est pareil ! Si l\'ordre te semble plus facile dans un sens, vas-y.',
    },
  ],
  3: [
    {
      type: 'triple',
      title: 'Le double, et encore une fois',
      text: '3×6, c\'est 6 et 6 (ça fait 12), et encore 6 → 18.',
      featured: true,
    },
    {
      type: 'sum3',
      title: 'La somme des chiffres se divise par 3',
      text: 'Tous les résultats de la table de 3 ont leurs chiffres qui font une somme divisible par 3. Ex : 24 → 2+4=6 ✅',
    },
  ],
  4: [
    {
      type: 'doubledouble',
      title: 'Double, puis encore double',
      text: 'Pour 4×7 : 7 doublé = 14. Et 14 doublé = 28. Voilà !',
      featured: true,
    },
    {
      type: 'half8',
      title: 'C\'est la moitié de 8 fois',
      text: 'Si tu connais ta table de 8 : 4×6, c\'est la moitié de 8×6 (=48). Donc 24 !',
    },
  ],
  5: [
    {
      type: 'half10',
      title: 'C\'est la moitié de 10 fois',
      text: 'Pour 5×8, pense à 10×8 = 80. La moitié, c\'est 40. C\'est ça, 5×8 !',
      featured: true,
    },
    {
      type: 'finishes05',
      title: 'Ça finit toujours par 0 ou 5',
      text: 'Tous les résultats de la table de 5 finissent par 0 (si pair) ou par 5 (si impair). Trop pratique !',
    },
    {
      type: 'clock',
      title: 'Comme l\'horloge !',
      text: 'Sur une horloge, chaque chiffre vaut 5 minutes. Le 3 → 15 min, le 7 → 35 min. C\'est la table de 5 !',
    },
  ],
  6: [
    {
      type: 'plus5',
      title: '5 fois, et on en rajoute un',
      text: 'Pour 6×7 : tu sais que 5×7 = 35. Il faut juste rajouter un 7 de plus → 42.',
      featured: true,
    },
    {
      type: 'even',
      title: 'Toujours pair, toujours pair',
      text: 'La table de 6 ne donne que des nombres pairs (qui finissent par 0, 2, 4, 6 ou 8). Si tu trouves un nombre impair, c\'est faux !',
    },
    {
      type: 'six_even',
      title: 'Avec un nombre pair, c\'est magique',
      text: '6×4, 6×6, 6×8 : le résultat finit par le même chiffre que le nombre ! 6×4=2[4], 6×6=3[6], 6×8=4[8].',
    },
  ],
  7: [
    {
      type: 'plus5',
      title: '5 fois, et on en rajoute deux',
      text: 'Pour 7×6 : 5×6 = 30. On rajoute encore 6 et 6 (=12). Total : 42.',
      featured: true,
    },
    {
      type: 'commute',
      title: 'Inverse pour aller plus vite',
      text: '7×3, c\'est 3×7. Si tu connais mieux la table de 3, retourne le calcul !',
    },
  ],
  8: [
    {
      type: 'minus10',
      title: 'Le truc du presque 10',
      text: '8×9, c\'est presque 8×10. 8×10 = 80 (facile !). Mais on a compté une fois 8 en trop. On enlève 8 → 72.',
      featured: true,
    },
    {
      type: 'doubletriple',
      title: 'Double, double, double',
      text: 'Pour 8×3 : 3 doublé = 6. 6 doublé = 12. 12 doublé = 24. Trois fois le double !',
    },
    {
      type: 'even',
      title: 'Que des nombres pairs',
      text: 'Comme la table de 6, la table de 8 ne donne que des résultats pairs. Si tu trouves un nombre impair, recommence !',
    },
  ],
  9: [
    {
      type: 'minus1',
      title: '9, c\'est 10 moins 1',
      text: 'Pour 9×7 : commence par 10×7 = 70 (facile, tu rajoutes un zéro !). Puis on enlève un 7. Résultat : 63.',
      featured: true,
    },
    {
      type: 'fingers',
      title: 'L\'astuce magique des doigts',
      text: 'Pour 9×4 : pose tes mains, plie ton 4ᵉ doigt. Tu as 3 doigts à gauche, 6 doigts à droite → 36 ! Magique 🪄',
    },
    {
      type: 'sum9',
      title: 'Les deux chiffres font 9',
      text: 'Regarde : 9×6 = 54 (5+4=9). 9×7 = 63 (6+3=9). C\'est toujours vrai !',
    },
    {
      type: 'firstdigit',
      title: 'Le premier chiffre, c\'est presque le numéro',
      text: '9×3 → commence par 2 (3 moins 1). 9×7 → commence par 6 (7 moins 1). Le 2ᵉ chiffre complète pour faire 9 !',
    },
  ],
  10: [
    {
      type: 'add0',
      title: 'On colle un zéro à la fin',
      text: '10×7 ? Tu prends 7 et tu colles un 0 derrière → 70. C\'est tout !',
      featured: true,
    },
  ],
}

// Astuces transverses (pas liées à une table en particulier)
export const GENERAL_TRICKS = [
  {
    title: 'On peut toujours retourner',
    text: '7×8, c\'est pareil que 8×7. Si l\'un te paraît plus facile, choisis-le !',
  },
  {
    title: 'Multiplier par 1, c\'est lui-même',
    text: '6×1 = 6. 9×1 = 9. Le nombre ne change pas.',
  },
  {
    title: 'Multiplier par 0, c\'est zéro',
    text: 'Peu importe le nombre, dès qu\'il y a un 0, le résultat est 0 !',
  },
  {
    title: 'Les carrés sont à connaître par cœur',
    text: '4×4=16, 6×6=36, 7×7=49, 8×8=64. Ce sont des points d\'appui pour deviner les autres !',
  },
]

export function getMultiplicationsForTable(table) {
  return Array.from({ length: 10 }, (_, i) => ({
    a: table,
    b: i + 1,
    op: '×',
    result: table * (i + 1),
    key: `${table}x${i + 1}`,
  }))
}

// Pour chaque facteur "stratégique", on a une fonction qui produit l'astuce ciblée
// quand l'autre facteur vaut `n`. Ordre = priorité (le premier match gagne).
const HINT_BUILDERS = [
  {
    match: (a, b) => a === b,
    build: (a, _b, r) => ({
      title: 'Un carré à retenir',
      text: `${a}×${a} = ${r}. Les carrés sont des nombres "spéciaux" à connaître par cœur, ils servent souvent !`,
    }),
  },
  {
    match: (a, b) => a === 1 || b === 1,
    build: (a, b, r) => ({
      title: 'Multiplier par 1',
      text: `${a}×${b} = ${r}. Multiplier par 1, ça ne change rien !`,
    }),
  },
  {
    match: (a, b) => a === 0 || b === 0,
    build: () => ({
      title: 'Multiplier par 0',
      text: 'Dès qu’il y a un 0, le résultat est 0 !',
    }),
  },
  {
    match: (a, b) => a === 10 || b === 10,
    build: (a, b, r) => {
      const n = a === 10 ? b : a
      return {
        title: 'On colle un zéro',
        text: `10×${n} : tu prends ${n} et tu colles un 0 derrière → ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 9 || b === 9,
    build: (a, b, r) => {
      const n = a === 9 ? b : a
      return {
        title: '9, c’est 10 moins 1',
        text: `Pense à 10×${n} = ${n * 10}. Puis enlève ${n} → ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 8 || b === 8,
    build: (a, b, r) => {
      const n = a === 8 ? b : a
      if (n >= 6) {
        return {
          title: 'Le truc du presque 10',
          text: `8×${n} : pense à 8×10 = 80. Tu as compté ${10 - n} fois 8 en trop, donc enlève ${(10 - n) * 8} → ${r}.`,
        }
      }
      return {
        title: 'Double, double, double',
        text: `Pour 8×${n} : ${n} doublé = ${n * 2}. Encore doublé = ${n * 4}. Encore doublé = ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 5 || b === 5,
    build: (a, b, r) => {
      const n = a === 5 ? b : a
      return {
        title: 'La moitié de 10 fois',
        text: `5×${n}, c’est la moitié de 10×${n} = ${n * 10}. La moitié, c’est ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 4 || b === 4,
    build: (a, b, r) => {
      const n = a === 4 ? b : a
      return {
        title: 'Double, puis encore double',
        text: `Pour 4×${n} : ${n} doublé = ${n * 2}. Encore doublé = ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 2 || b === 2,
    build: (a, b, r) => {
      const n = a === 2 ? b : a
      return {
        title: 'Juste le double',
        text: `2×${n}, c’est ${n} et encore ${n}. Ça fait ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 6 || b === 6,
    build: (a, b, r) => {
      const n = a === 6 ? b : a
      return {
        title: '5 fois et on rajoute un',
        text: `6×${n} = (5×${n}) + ${n} = ${5 * n} + ${n} = ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 7 || b === 7,
    build: (a, b, r) => {
      const n = a === 7 ? b : a
      return {
        title: '5 fois et on rajoute deux',
        text: `7×${n} = (5×${n}) + (2×${n}) = ${5 * n} + ${2 * n} = ${r}.`,
      }
    },
  },
  {
    match: (a, b) => a === 3 || b === 3,
    build: (a, b, r) => {
      const n = a === 3 ? b : a
      return {
        title: 'Le double, et encore une fois',
        text: `3×${n} : ${n}+${n} = ${n * 2}, et encore ${n} → ${r}.`,
      }
    },
  },
]

// Génère un indice ciblé pour une multiplication précise (utilisé quand l'enfant se trompe).
export function getHintFor(a, b) {
  const r = a * b
  for (const { match, build } of HINT_BUILDERS) {
    if (match(a, b)) {
      const hint = build(a, b, r)
      if (hint) return hint
    }
  }
  return { title: 'À retenir', text: `${a}×${b} = ${r}` }
}
