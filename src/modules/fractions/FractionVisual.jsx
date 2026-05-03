const COLORS = ['#fb7185', '#f97316', '#22c55e', '#38bdf8', '#a78bfa', '#facc15']

export default function FractionVisual({ numerator, denominator, type = 'circle', size = 'md' }) {
  const visualSize = size === 'sm' ? 'w-24 h-24' : 'w-44 h-44 sm:w-56 sm:h-56'
  if (type === 'bar') return <FractionBar numerator={numerator} denominator={denominator} size={size} />
  return (
    <div className={`${visualSize} mx-auto rounded-full shadow-lg bg-white p-2`}>
      <svg viewBox="0 0 120 120" className="w-full h-full">
        <circle cx="60" cy="60" r="54" fill="#fde68a" stroke="#fb923c" strokeWidth="4" />
        {Array.from({ length: denominator }).map((_, index) => (
          <path
            key={index}
            d={slicePath(60, 60, 54, index, denominator)}
            fill={index < numerator ? COLORS[index % COLORS.length] : '#fff7ed'}
            stroke="#ffffff"
            strokeWidth="3"
          />
        ))}
        <circle cx="42" cy="43" r="4" fill="#ef4444" opacity=".75" />
        <circle cx="77" cy="47" r="4" fill="#ef4444" opacity=".75" />
        <circle cx="64" cy="80" r="4" fill="#ef4444" opacity=".75" />
      </svg>
    </div>
  )
}

function FractionBar({ numerator, denominator, size }) {
  const height = size === 'sm' ? 'h-16' : 'h-28'
  return (
    <div className={`mx-auto ${height} w-full max-w-sm rounded-2xl bg-amber-100 border-4 border-amber-300 shadow-lg overflow-hidden grid`} style={{ gridTemplateColumns: `repeat(${denominator}, minmax(0, 1fr))` }}>
      {Array.from({ length: denominator }).map((_, index) => (
        <div
          key={index}
          className="border-r-4 last:border-r-0 border-white"
          style={{ backgroundColor: index < numerator ? COLORS[index % COLORS.length] : '#fff7ed' }}
        />
      ))}
    </div>
  )
}

function slicePath(cx, cy, radius, index, total) {
  const start = -90 + (360 / total) * index
  const end = -90 + (360 / total) * (index + 1)
  const startPoint = polarToCartesian(cx, cy, radius, start)
  const endPoint = polarToCartesian(cx, cy, radius, end)
  const largeArc = end - start <= 180 ? 0 : 1
  return [`M ${cx} ${cy}`, `L ${startPoint.x} ${startPoint.y}`, `A ${radius} ${radius} 0 ${largeArc} 1 ${endPoint.x} ${endPoint.y}`, 'Z'].join(' ')
}

function polarToCartesian(cx, cy, radius, angle) {
  const radians = (angle * Math.PI) / 180
  return {
    x: cx + radius * Math.cos(radians),
    y: cy + radius * Math.sin(radians),
  }
}
