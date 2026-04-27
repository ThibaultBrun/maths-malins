export const SOUSTRACTION_LESSONS = [
  {
    id: 'from10',
    title: 'Soustractions à 10',
    emoji: '🔟',
    description: '10 moins quelque chose. C’est l’inverse des amis de 10 !',
    generate: () =>
      Array.from({ length: 11 }, (_, i) => makeSub(10, i)),
  },
  {
    id: 'small',
    title: 'Petites soustractions',
    emoji: '🎈',
    description: 'Soustractions jusqu’à 20.',
    generate: () => {
      const out = []
      for (let a = 5; a <= 20; a++) {
        for (let b = 1; b <= Math.min(9, a); b++) {
          if (a - b >= 0 && a - b <= 15) out.push(makeSub(a, b))
        }
      }
      // Limite à 30 pour ne pas saturer
      return out.slice(0, 30)
    },
  },
  {
    id: 'from100',
    title: 'Soustractions à 100',
    emoji: '💯',
    description: '100 moins une dizaine. Comme à l’épicerie !',
    generate: () =>
      Array.from({ length: 9 }, (_, i) => makeSub(100, (i + 1) * 10)),
  },
  {
    id: 'borrow',
    title: 'Soustractions à 2 chiffres',
    emoji: '🚀',
    description: 'Avec et sans retenue. Attention aux unités !',
    generate: () => {
      const pairs = [
        [35, 12], [48, 23], [56, 14], [29, 11], [67, 25],
        [42, 18], [53, 27], [71, 24], [85, 38], [62, 35],
        [44, 19], [73, 46], [91, 27], [60, 23], [80, 35],
      ]
      return pairs.map(([a, b]) => makeSub(a, b))
    },
  },
]

function makeSub(a, b) {
  return { a, b, op: '−', result: a - b, key: `sub:${a}-${b}` }
}

export function getLesson(id) {
  return SOUSTRACTION_LESSONS.find((l) => l.id === id)
}

export function getHintFor(question) {
  const { a, b, result } = question
  if (a === 10) {
    return {
      title: 'L’inverse des amis de 10',
      text: `Si tu sais que ${b}+${result}=10, alors 10−${b}=${result}. C’est la même chose à l’envers !`,
    }
  }
  if (a === 100 && b % 10 === 0) {
    return {
      title: 'L’inverse des amis de 100',
      text: `${b}+${result}=100, donc 100−${b}=${result}.`,
    }
  }
  // Compter en avant : pour 13-8, on part de 8 et on monte jusqu'à 13
  if (a < 20 && b < 10 && a - b < 10) {
    const toTen = 10 - b
    const after = a - 10
    if (toTen > 0 && after >= 0) {
      return {
        title: 'Compte en avançant',
        text: `${a}−${b} : pars de ${b}, monte de ${toTen} pour faire 10, puis encore ${after} → ${result}.`,
      }
    }
  }
  // 2 chiffres : sépare dizaines/unités
  if (a >= 20 && b >= 10) {
    const da = Math.floor(a / 10) * 10
    const ua = a - da
    const db = Math.floor(b / 10) * 10
    const ub = b - db
    if (ua >= ub) {
      return {
        title: 'Dizaines puis unités',
        text: `${a}−${b} : dizaines ${da}−${db}=${da - db}, unités ${ua}−${ub}=${ua - ub}. Total : ${result}.`,
      }
    }
    return {
      title: 'Attention à la retenue',
      text: `${a}−${b} : les unités (${ua}) sont trop petites pour enlever ${ub}. Emprunte une dizaine !`,
    }
  }
  return { title: 'À retenir', text: `${a}−${b} = ${result}` }
}

export const TRICKS = {
  from10: [
    {
      title: 'L’inverse des additions',
      text: 'Si tu sais 3+7=10, alors tu sais aussi 10−3=7 et 10−7=3. Une addition = deux soustractions gratuites !',
      featured: true,
    },
  ],
  small: [
    {
      title: 'Compte en avançant',
      text: 'Pour 13−8 : pars de 8, monte jusqu’à 10 (+2), puis jusqu’à 13 (+3). Réponse : 5.',
      featured: true,
    },
    {
      title: 'La soustraction n’est PAS commutative',
      text: '10−3 ≠ 3−10. Toujours commencer par le plus grand !',
    },
    {
      title: 'Soustraire 0',
      text: 'Si tu enlèves 0, le nombre ne change pas. 7−0 = 7.',
    },
  ],
  from100: [
    {
      title: 'Comme les amis de 10',
      text: '100−30 ? Tu sais que 3+7=10, donc 30+70=100, donc 100−30=70. Facile !',
      featured: true,
    },
  ],
  borrow: [
    {
      title: 'Sépare en dizaines et unités',
      text: 'Pour 48−23 : dizaines 40−20=20, unités 8−3=5. Total : 25.',
      featured: true,
    },
    {
      title: 'L’emprunt',
      text: 'Si les unités du haut sont plus petites que celles du bas, emprunte 1 à la dizaine du haut. Elle devient 10 unités !',
    },
  ],
}
