import React, { useState } from 'react'
import { calcWheelFontSize, midPointOnArc, polarToCartesian } from '../utils/wheelMath'

const SEGMENTS = [
  { label: 'Calidad',           points: 10, color: '#60a5fa' },
  { label: 'Seguridad',         points: 9,  color: '#f59e0b' },
  { label: 'Privacidad',        points: 9,  color: '#10b981' },
  { label: 'Catálogo',          points: 8,  color: '#a78bfa' },
  { label: 'Propiedad',         points: 8,  color: '#f472b6' },
  { label: 'Trazabilidad',      points: 7,  color: '#34d399' },
  { label: 'Políticas',         points: 7,  color: '#f87171' },
  { label: 'Interoperabilidad', points: 6,  color: '#22d3ee' },
]

export default function Wheel({ onResult }) {
  const [spinning,setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)

  const segAngle = 360 / SEGMENTS.length
  const RAD_TEXT = 36

  const spin = () => {
    if(spinning) return
    setSpinning(true)
    const turns = 5 + Math.floor(Math.random()*4)
    const idx = Math.floor(Math.random()*SEGMENTS.length)
    const finalDeg = turns*360 + (SEGMENTS.length - idx) * segAngle - segAngle/2
    const newAngle = angle + finalDeg
    setAngle(newAngle)
    setTimeout(()=> {
      setSpinning(false)
      const normalized = (newAngle % 360 + 360) % 360
      const pickedIndex = (SEGMENTS.length - Math.floor((normalized + segAngle/2) / segAngle)) % SEGMENTS.length
      const result = SEGMENTS[pickedIndex]
      onResult?.(result)
    }, 3800)
  }

  return (
    <div style={{display:'grid',placeItems:'center',gap:12}}>
      <div className="wheel-legend">
        {SEGMENTS.map(s=>(
          <div key={s.label} className="legend-item">
            <span className="legend-swatch" style={{ background: s.color }} />
            <span className="legend-label">{s.label}</span>
            <span className="legend-points">+{s.points}</span>
          </div>
        ))}
      </div>

      <div className="wheel-wrap">
        <div style={{
          position:'absolute', left:'50%', top:-8, transform:'translateX(-50%)',
          width:0, height:0, borderLeft:'12px solid transparent', borderRight:'12px solid transparent',
          borderBottom:'18px solid #f5f5f4', zIndex:2
        }} />
        <svg
          viewBox="0 0 100 100"
          style={{
            width:'100%', height:'100%', borderRadius:'50%',
            transform:`rotate(${angle}deg)`,
            transition:'transform 3.8s cubic-bezier(.17,.67,.35,1)',
            background:'#0c0c0c'
          }}
        >
          {SEGMENTS.map((s, i) => {
            const startAngle = i * (360 / SEGMENTS.length)
            const endAngle = startAngle + (360 / SEGMENTS.length)
            const largeArc = endAngle - startAngle <= 180 ? 0 : 1
            const start = polarToCartesian(50, 50, 49, endAngle)
            const end = polarToCartesian(50, 50, 49, startAngle)
            const d = [`M 50 50`,`L ${start.x} ${start.y}`,`A 49 49 0 ${largeArc} 0 ${end.x} ${end.y}`,`Z`].join(' ')
            const mid = midPointOnArc(50, 50, RAD_TEXT + 1.5, startAngle + (360 / SEGMENTS.length)/2)
            const fs = calcWheelFontSize(s.label, segAngle, RAD_TEXT)
            return (
              <g key={s.label}>
                <path d={d} fill={s.color} stroke="#0b0b0b" strokeWidth="0.6"/>
                <text x={mid.x} y={mid.y} fontSize={fs} fill="#0b0b0b" textAnchor="middle" dominantBaseline="middle">
                  {s.label}
                </text>
              </g>
            )
          })}
          <circle cx="50" cy="50" r="8" fill="#111827" stroke="#d4d4d8" strokeWidth="1.2"/>
        </svg>
      </div>

      <button onClick={spin} disabled={spinning} style={{padding:'10px 16px',borderRadius:10, border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa'}}>
        {spinning ? 'Girando…' : '🎡 ¡Girar ruleta!'}
      </button>
    </div>
  )
}
