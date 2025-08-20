import React from 'react'

export default function Legend({ items, className = '' }) {
  return (
    <div className={`wheel-legend ${className}`}>
      {items.map((s) => (
        <div key={s.label} className="legend-item">
          <span className="legend-swatch" style={{ background: s.color }} />
          <span className="legend-label">{s.label}</span>
          <span className="legend-points">+{s.points}</span>
        </div>
      ))}
    </div>
  )
}
