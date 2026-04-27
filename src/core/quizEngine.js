// Moteur de quiz partagé entre les modules.
// Une "question" est un objet { a, b, op, result, key }.
// Chaque module fournit son générateur de questions (toutes les questions possibles d'une "table"/leçon)
// et ses paramètres de difficulté (range pour les distracteurs).

const QUESTIONS_PER_SESSION = 10

export function buildSession(allQuestions, mastery) {
  const weighted = allQuestions.map((q) => ({ ...q, weight: 6 - (mastery[q.key] || 0) }))
  const session = []
  const pool = [...weighted]
  while (session.length < QUESTIONS_PER_SESSION && pool.length > 0) {
    const total = pool.reduce((s, p) => s + p.weight, 0)
    let r = Math.random() * total
    let pickedIdx = 0
    for (let i = 0; i < pool.length; i++) {
      r -= pool[i].weight
      if (r <= 0) {
        pickedIdx = i
        break
      }
    }
    session.push(pool[pickedIdx])
    if (pool.length > 3) pool.splice(pickedIdx, 1)
  }
  return session
}

export function buildChoices(question, count, distractorRange = 4) {
  if (!question || count === 0) return []
  const correct = question.result
  const set = new Set([correct])
  let safety = 0
  while (set.size < count && safety < 50) {
    const offset = Math.floor(Math.random() * (distractorRange * 2 + 1)) - distractorRange
    const candidate = correct + (offset === 0 ? 1 : offset)
    if (candidate >= 0 && candidate !== correct) set.add(candidate)
    safety++
  }
  return [...set].sort(() => Math.random() - 0.5)
}

export function computeStars(ratio) {
  if (ratio === 1) return 3
  if (ratio >= 0.8) return 2
  if (ratio >= 0.6) return 1
  return 0
}
