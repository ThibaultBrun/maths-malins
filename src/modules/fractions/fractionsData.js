export const FRACTION_LESSONS = [
  {
    id: 'half',
    title: 'Les moitiés',
    emoji: '🍪',
    description: 'Un objet coupé en 2 parts égales.',
    denominators: [2],
  },
  {
    id: 'thirds',
    title: 'Les tiers',
    emoji: '🍫',
    description: 'Un objet coupé en 3 parts égales.',
    denominators: [3],
  },
  {
    id: 'quarters',
    title: 'Les quarts',
    emoji: '🍕',
    description: 'Un objet coupé en 4 parts égales.',
    denominators: [4],
  },
  {
    id: 'mix',
    title: 'Le grand mélange',
    emoji: '🌈',
    description: 'Moitiés, tiers, quarts, cinquièmes et sixièmes.',
    denominators: [2, 3, 4, 5, 6],
  },
]

export function getLesson(id) {
  return FRACTION_LESSONS.find((lesson) => lesson.id === id)
}

export function generateQuestions(lesson) {
  const questions = []
  for (const denominator of lesson.denominators) {
    for (let numerator = 1; numerator <= denominator; numerator++) {
      questions.push(makeFraction(numerator, denominator))
    }
  }
  return questions
}

export function makeFraction(numerator, denominator) {
  return {
    numerator,
    denominator,
    label: `${numerator}/${denominator}`,
    key: `fraction:${numerator}/${denominator}`,
  }
}

export function fractionLabel(numerator, denominator) {
  if (numerator === denominator) return 'un entier'
  if (denominator === 2) return numerator === 1 ? 'une moitié' : 'deux moitiés'
  if (denominator === 3) return numerator === 1 ? 'un tiers' : `${numerator} tiers`
  if (denominator === 4) return numerator === 1 ? 'un quart' : `${numerator} quarts`
  return `${numerator} parts sur ${denominator}`
}

export function getHintFor(question) {
  return {
    title: 'Regarde les parts coloriées',
    text: `Le nombre du bas dit combien il y a de parts en tout. Le nombre du haut dit combien de parts sont coloriées : ${question.label}.`,
  }
}
