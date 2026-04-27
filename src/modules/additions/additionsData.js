// Définition des leçons pour le module Additions.
// Chaque leçon a un id, un titre, une description, et un générateur de questions.

export const ADDITION_LESSONS = [
  {
    id: 'comp10',
    title: 'Compléments à 10',
    emoji: '🔟',
    description: 'Trouve le nombre qui manque pour faire 10 !',
    generate: () =>
      Array.from({ length: 11 }, (_, i) => makeAdd(i, 10 - i)),
  },
  {
    id: 'sum20',
    title: 'Sommes jusqu’à 20',
    emoji: '🎈',
    description: 'Additionne deux petits nombres.',
    generate: () => {
      const out = []
      for (let a = 2; a <= 9; a++) {
        for (let b = 2; b <= 9; b++) {
          out.push(makeAdd(a, b))
        }
      }
      return out
    },
  },
  {
    id: 'comp100',
    title: 'Compléments à 100',
    emoji: '💯',
    description: 'Trouve le nombre qui manque pour faire 100 (par dizaines).',
    generate: () =>
      Array.from({ length: 9 }, (_, i) => {
        const a = (i + 1) * 10
        return makeAdd(a, 100 - a)
      }),
  },
  {
    id: 'carry',
    title: 'Additions à 2 chiffres',
    emoji: '🚀',
    description: 'Avec et sans retenue. Place les unités et les dizaines !',
    generate: () => {
      const out = []
      // Sélection variée : sans retenue + avec retenue
      const pairs = [
        [12, 23], [34, 25], [41, 17], [55, 32], [28, 11],
        [27, 35], [48, 26], [56, 37], [19, 24], [33, 49],
        [67, 28], [45, 38], [29, 36], [54, 17], [62, 19],
      ]
      for (const [a, b] of pairs) out.push(makeAdd(a, b))
      return out
    },
  },
]

function makeAdd(a, b) {
  return { a, b, op: '+', result: a + b, key: `add:${a}+${b}` }
}

export function getLesson(id) {
  return ADDITION_LESSONS.find((l) => l.id === id)
}

// Indice ciblé pour une addition ratée.
export function getHintFor(question) {
  const { a, b, result } = question
  // Compléments à 10 : trouver le partenaire
  if (a + b === 10) {
    return {
      title: 'Les amis de 10',
      text: `Mémorise les paires : 1+9, 2+8, 3+7, 4+6, 5+5. ${a}+${b}=10, ce sont des amis !`,
    }
  }
  // Si l'un des deux passe par 10
  if (a + b > 10 && a + b <= 20) {
    const bigger = Math.max(a, b)
    const smaller = Math.min(a, b)
    const toTen = 10 - bigger
    if (toTen > 0 && toTen < smaller) {
      return {
        title: 'Passe par 10 !',
        text: `${bigger}+${smaller} : casse le ${smaller} en ${toTen}+${smaller - toTen}. ${bigger}+${toTen}=10, puis +${smaller - toTen} = ${result}.`,
      }
    }
  }
  // Doubles
  if (a === b) {
    return {
      title: 'Un double, c’est facile',
      text: `${a}+${a} = ${result}. Les doubles sont à savoir par cœur, ils servent partout !`,
    }
  }
  // Presque double (a et b se suivent)
  if (Math.abs(a - b) === 1) {
    const small = Math.min(a, b)
    return {
      title: 'Presque un double',
      text: `${a}+${b}, c’est ${small}+${small} (=${small * 2}) plus 1 = ${result}.`,
    }
  }
  // Additions à 2 chiffres
  if (a >= 10 || b >= 10) {
    const da = Math.floor(a / 10) * 10
    const ua = a - da
    const db = Math.floor(b / 10) * 10
    const ub = b - db
    return {
      title: 'Dizaines puis unités',
      text: `${a}+${b} : dizaines ${da}+${db}=${da + db}, unités ${ua}+${ub}=${ua + ub}. Total : ${result}.`,
    }
  }
  // Compléments à 100 par dizaines
  if (a + b === 100 && a % 10 === 0) {
    return {
      title: 'Amis de 100',
      text: `${a}+${b}=100. Comme les amis de 10, mais en dizaines : 10+90, 20+80, 30+70...`,
    }
  }
  return { title: 'À retenir', text: `${a}+${b} = ${result}` }
}

export const TRICKS = {
  comp10: [
    {
      title: 'Les amis de 10',
      text: 'Apprends-les par cœur : 1+9, 2+8, 3+7, 4+6, 5+5. Ils servent TOUT le temps !',
      featured: true,
    },
  ],
  sum20: [
    {
      title: 'Passe par 10',
      text: 'Pour 8+5 : casse le 5 en 2+3. 8+2=10, puis +3 = 13. Comme un escalier !',
      featured: true,
    },
    {
      title: 'Les doubles',
      text: 'Apprends 1+1, 2+2, 3+3... jusqu’à 9+9. Ce sont des points d’appui géniaux.',
    },
    {
      title: 'On peut tourner',
      text: '7+2 ou 2+7, c’est pareil. Commence toujours par le plus grand !',
    },
  ],
  comp100: [
    {
      title: 'Comme les amis de 10, en dizaines',
      text: '10+90, 20+80, 30+70, 40+60, 50+50. Tu connais 3+7=10 ? Alors 30+70=100 !',
      featured: true,
    },
  ],
  carry: [
    {
      title: 'Sépare dizaines et unités',
      text: 'Pour 27+35 : dizaines 20+30=50, unités 7+5=12. Total : 50+12 = 62.',
      featured: true,
    },
    {
      title: 'La retenue',
      text: 'Si les unités font plus de 9, tu gardes les unités et tu rajoutes 1 dans les dizaines.',
    },
  ],
}
