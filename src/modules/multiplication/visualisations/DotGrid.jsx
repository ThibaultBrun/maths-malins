import { motion } from 'framer-motion'

// Affiche `rows` rangées de `cols` points colorés.
// Si `removeCols` est défini, la dernière colonne (de largeur removeCols) apparaît barrée/rouge.
export default function DotGrid({ rows, cols, removeCols = 0, animate = false, color = 'bg-orange-400', removedColor = 'bg-red-300' }) {
  const r = Math.max(1, rows)
  const c = Math.max(1, cols)
  const dotSize = c * r > 60 ? 'w-3 h-3' : c * r > 30 ? 'w-4 h-4' : 'w-5 h-5'
  const gap = c * r > 60 ? 'gap-1' : 'gap-1.5'

  return (
    <div className={`inline-flex flex-col ${gap}`}>
      {Array.from({ length: r }).map((_, ri) => (
        <div key={ri} className={`flex ${gap}`}>
          {Array.from({ length: c }).map((_, ci) => {
            const isRemoved = ci >= c - removeCols
            const Tag = animate ? motion.div : 'div'
            const animProps = animate
              ? {
                  initial: { scale: 0 },
                  animate: { scale: 1 },
                  transition: { delay: (ri * c + ci) * 0.02, type: 'spring', stiffness: 400 },
                }
              : {}
            return (
              <Tag
                key={ci}
                className={`${dotSize} rounded-full shadow-sm ${
                  isRemoved ? `${removedColor} opacity-40 line-through` : color
                }`}
                {...animProps}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
