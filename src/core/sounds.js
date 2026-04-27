// Sons générés via Web Audio API : pas de fichiers à charger, instantané.
let ctx = null
function getCtx() {
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext
    if (AC) ctx = new AC()
  }
  return ctx
}

function tone(freq, duration, type = 'sine', vol = 0.15) {
  const c = getCtx()
  if (!c) return
  const osc = c.createOscillator()
  const gain = c.createGain()
  osc.type = type
  osc.frequency.value = freq
  gain.gain.setValueAtTime(vol, c.currentTime)
  gain.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration)
  osc.connect(gain).connect(c.destination)
  osc.start()
  osc.stop(c.currentTime + duration)
}

function sequence(notes) {
  const c = getCtx()
  if (!c) return
  let t = 0
  notes.forEach(([freq, dur, vol = 0.15]) => {
    setTimeout(() => tone(freq, dur, 'triangle', vol), t * 1000)
    t += dur * 0.7
  })
}

export function playSound(name) {
  if (typeof window === 'undefined') return
  switch (name) {
    case 'correct':
      sequence([[660, 0.1], [880, 0.15]])
      break
    case 'wrong':
      sequence([[300, 0.15], [200, 0.25]])
      break
    case 'win':
      sequence([[523, 0.1], [659, 0.1], [784, 0.1], [1046, 0.3]])
      break
    case 'done':
      sequence([[523, 0.15], [659, 0.2]])
      break
    default:
      break
  }
}
