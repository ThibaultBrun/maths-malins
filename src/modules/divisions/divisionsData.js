// Pour un enfant de 8 ans, on présente la division comme l'inverse de la multiplication.
// On limite aux divisions exactes (sans reste) avec petits diviseurs.

export const DIVISION_LESSONS = [
  {
    id: '2',
    title: 'Diviser par 2',
    emoji: '✌️',
    description: 'Couper en deux. C’est trouver la moitié !',
    divisor: 2,
  },
  {
    id: '3',
    title: 'Diviser par 3',
    emoji: '🍀',
    description: 'Trois parts égales.',
    divisor: 3,
  },
  {
    id: '4',
    title: 'Diviser par 4',
    emoji: '🍕',
    description: 'Quatre parts égales — comme une pizza !',
    divisor: 4,
  },
  {
    id: '5',
    title: 'Diviser par 5',
    emoji: '🖐️',
    description: 'Cinq parts égales.',
    divisor: 5,
  },
  {
    id: '10',
    title: 'Diviser par 10',
    emoji: '🔟',
    description: 'On enlève juste le zéro à la fin !',
    divisor: 10,
  },
].map((l) => ({
  ...l,
  generate() {
    return Array.from({ length: 10 }, (_, i) => {
      const quotient = i + 1
      const dividend = quotient * l.divisor
      return {
        a: dividend,
        b: l.divisor,
        op: '÷',
        result: quotient,
        key: `div:${dividend}/${l.divisor}`,
      }
    })
  },
}))

export function getLesson(id) {
  return DIVISION_LESSONS.find((l) => l.id === id)
}

export function getHintFor(question) {
  const { a, b, result } = question
  if (b === 10) {
    return {
      title: 'Diviser par 10, c’est facile',
      text: `${a} ÷ 10 : enlève juste le 0 à la fin → ${result}.`,
    }
  }
  if (b === 2) {
    return {
      title: 'Diviser par 2 = couper en deux',
      text: `${a} ÷ 2, c’est la moitié de ${a}. Si tu connais le double : ${result}+${result}=${a}, donc ${a}÷2=${result}.`,
    }
  }
  if (b === 5) {
    return {
      title: 'Diviser par 5',
      text: `Tu sais que 5×${result}=${a}. Donc ${a}÷5=${result}. La division, c’est l’inverse de la multiplication !`,
    }
  }
  if (b === 4) {
    return {
      title: 'Diviser par 4 = couper en deux, deux fois',
      text: `${a}÷4 : moitié de ${a} = ${a / 2}. Encore la moitié = ${result}.`,
    }
  }
  return {
    title: 'L’inverse d’une multiplication',
    text: `${b} × ? = ${a}. La réponse est ${result}, donc ${a} ÷ ${b} = ${result}.`,
  }
}

export const TRICKS = {
  2: [
    {
      title: 'Diviser par 2 = la moitié',
      text: 'Pour 14÷2 : pense à un nombre qui, doublé, fait 14. C’est 7 ! Donc 14÷2=7.',
      featured: true,
    },
    {
      title: 'Pour les nombres pairs, c’est facile',
      text: 'Si le nombre finit par 0, 2, 4, 6 ou 8, on peut toujours diviser par 2 sans reste.',
    },
  ],
  3: [
    {
      title: 'L’inverse de la table de 3',
      text: 'Si tu sais que 3×6=18, alors 18÷3=6. La division, c’est juste la multiplication à l’envers !',
      featured: true,
    },
    {
      title: 'Astuce : la somme des chiffres',
      text: 'Un nombre est divisible par 3 si la somme de ses chiffres l’est. 24 → 2+4=6 ✅',
    },
  ],
  4: [
    {
      title: 'Deux fois la moitié',
      text: 'Pour 28÷4 : moitié de 28 = 14. Encore la moitié = 7. Donc 28÷4=7.',
      featured: true,
    },
  ],
  5: [
    {
      title: 'L’inverse de la table de 5',
      text: 'Si 5×7=35, alors 35÷5=7. Les multiples de 5 finissent par 0 ou 5, ils sont faciles à repérer !',
      featured: true,
    },
  ],
  10: [
    {
      title: 'On enlève le zéro',
      text: '70÷10 ? Tu enlèves le 0 à la fin → 7. Magique. Marche pour tous les nombres ronds !',
      featured: true,
    },
  ],
}
