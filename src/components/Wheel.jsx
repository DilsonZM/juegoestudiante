import React, { useRef, useState } from 'react'
import { sfxSpin, sfxSpinTicks } from '../utils/sfx'
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

export default function Wheel({ onResult, disabled, onBeforeFirstSpin, soundOn = true }) {
  const [spinning, setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)
  const [started, setStarted] = useState(false)
  const [spinDuration, setSpinDuration] = useState(3800)
  const [isHolding, setIsHolding] = useState(false)
  const [showFlames, setShowFlames] = useState(false)
  const holdRef = useRef({ start: 0, handledClick: false })
  const holdVibeRef = useRef(null)
  const audioRef = useRef({ ctx: null, osc: null, gain: null })
  const holdTimeoutRef = useRef(null)

  const segAngle = 360 / SEGMENTS.length
  const RAD_TEXT = 36

  const spin = async (power = 0) => {
    if (spinning || disabled) return
    if (!started && onBeforeFirstSpin) {
      try { onBeforeFirstSpin() } catch { /* ignore */ }
      setStarted(true)
    }
    setSpinning(true)
    try {
      sfxSpin(soundOn)
    } catch { /* noop */ }
    // 1) Elegir segmento objetivo y calcular centro absoluto de ese segmento
    //    Ajustar vueltas y duración según potencia (press & hold)
  const minTurns = 5
  const maxTurns = 12 // más potencia ⇒ más vueltas visibles
    const clampedPower = Math.max(0, Math.min(1, power))
  const turns = Math.round(minTurns + (maxTurns - minTurns) * clampedPower)
  const durationMs = Math.round(4200 + 1800 * clampedPower) // hasta ~6s
    setSpinDuration(durationMs)
    const idx = Math.floor(Math.random() * SEGMENTS.length)
    const epsilon = 0.1 // pequeño sesgo para evitar caída exacta en la línea por redondeos
    const targetCenterAbs = (SEGMENTS.length - idx) * segAngle - (segAngle / 2) + epsilon

    // 2) Normalizar ángulo actual (0..359.999) y calcular delta exacta al centro
    const normalized = ((angle % 360) + 360) % 360
    const deltaToCenter = ((targetCenterAbs - normalized + 360) % 360)
    const finalDeg = turns * 360 + deltaToCenter

    // Aproximar cantidad de ticks (cruces de divisores) durante el giro
    const approxTicks = Math.max(8, Math.floor(finalDeg / segAngle))

    const newAngle = angle + finalDeg
    setAngle(newAngle)
    setTimeout(() => {
      setSpinning(false)
      // Entregar el resultado directamente con el índice elegido para evitar desviaciones por redondeo
      onResult?.(SEGMENTS[idx])
    }, durationMs)
  // Reproducir ticks desacelerando durante todo el giro
  try { sfxSpinTicks(soundOn, { durationMs, totalTicks: approxTicks }) } catch { /* noop */ }
  }

  // Tap por teclado
  const handleWheelTap = () => { spin(0) }

  // Pointer (press & hold)
  const HOLD_MIN_MS = 120
  const HOLD_MAX_MS = 3500 // límite solicitado (3.5s)
  const startChargeSound = () => {
    if (!soundOn) return
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const ctx = new AudioCtx()
      // Dos osciladores para dar sensación de motor
      const osc1 = ctx.createOscillator()
      const osc2 = ctx.createOscillator()
      const filter = ctx.createBiquadFilter()
      const gain = ctx.createGain()
      osc1.type = 'triangle'
      osc2.type = 'triangle'
      osc1.frequency.setValueAtTime(80, ctx.currentTime)
      osc2.frequency.setValueAtTime(120, ctx.currentTime)
      // rampas de pitch suaves tipo "motor acelerando"
      const rampEnd = ctx.currentTime + HOLD_MAX_MS/1000
      osc1.frequency.linearRampToValueAtTime(220, rampEnd)
      osc2.frequency.linearRampToValueAtTime(320, rampEnd)
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(300, ctx.currentTime)
      filter.frequency.linearRampToValueAtTime(1200, rampEnd)
      gain.gain.setValueAtTime(0.02, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(0.06, rampEnd)
      // Ruta: osc1+osc2 -> filtro -> gain -> destino
      osc1.connect(filter)
      osc2.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)
      osc1.start(); osc2.start()
      audioRef.current = { ctx, osc: [osc1, osc2], gain }
    } catch { /* noop */ }
  }
  const stopChargeSound = () => {
    try {
      const { ctx, osc, gain } = audioRef.current || {}
  if (Array.isArray(osc)) { osc.forEach(o=>{ try{ o.stop(); o.disconnect() } catch { /* noop */ } }) }
      else if (osc) { osc.stop(); osc.disconnect() }
      if (gain) { gain.disconnect() }
      if (ctx && ctx.state !== 'closed') { ctx.close() }
    } catch { /* noop */ }
    audioRef.current = { ctx: null, osc: null, gain: null }
  }

  const onPointerDown = () => {
    if (spinning || disabled) return
    holdRef.current.start = Date.now()
    holdRef.current.handledClick = true // evitamos que el click nativo dispare además
    setIsHolding(true)
    try { if (navigator?.vibrate) navigator.vibrate(10) } catch { /* noop */ }
    // vibración periódica suave mientras sostienes
    try {
      holdVibeRef.current = setInterval(() => { try { if (navigator?.vibrate) navigator.vibrate(5) } catch { /* noop */ } }, 220)
    } catch { /* noop */ }
    // sonido de carga
    startChargeSound()
    // Límite hard de 3.5s: auto-dispara el spin
    try {
      if (holdTimeoutRef.current) clearTimeout(holdTimeoutRef.current)
      holdTimeoutRef.current = setTimeout(() => {
        // No uses estado capturado: verifica si el hold sigue activo con el ref
        if (holdRef.current.start) { endHoldAndSpin() }
      }, HOLD_MAX_MS + 30)
    } catch { /* noop */ }
  }
  const endHoldAndSpin = () => {
    const now = Date.now()
    const start = holdRef.current.start || now
    const heldMs = now - start
    setIsHolding(false)
    // detener vibración y carga
    if (holdVibeRef.current) { clearInterval(holdVibeRef.current); holdVibeRef.current = null }
    if (holdTimeoutRef.current) { clearTimeout(holdTimeoutRef.current); holdTimeoutRef.current = null }
    stopChargeSound()
    holdRef.current.start = 0
    // Tap corto ⇒ comportamiento actual
    if (heldMs < HOLD_MIN_MS) { spin(0); return }
    const clamped = Math.min(heldMs, HOLD_MAX_MS)
    const power = Math.max(0, Math.min(1, (clamped - HOLD_MIN_MS) / (HOLD_MAX_MS - HOLD_MIN_MS)))
    // mostrar anillo de "fuego" breve
    setShowFlames(true)
    setTimeout(() => setShowFlames(false), 900)
    spin(power)
  }
  const onPointerUp = () => { if (spinning || disabled) return; endHoldAndSpin() }
  const onPointerCancel = () => { setIsHolding(false); if (holdVibeRef.current) { clearInterval(holdVibeRef.current); holdVibeRef.current = null } if (holdTimeoutRef.current) { clearTimeout(holdTimeoutRef.current); holdTimeoutRef.current = null } stopChargeSound(); holdRef.current.start = 0 }
  const onPointerLeave = () => { if (isHolding) { setIsHolding(false); if (holdVibeRef.current) { clearInterval(holdVibeRef.current); holdVibeRef.current = null } if (holdTimeoutRef.current) { clearTimeout(holdTimeoutRef.current); holdTimeoutRef.current = null } stopChargeSound(); holdRef.current.start = 0 } }

  return (
    <div style={{ display: 'grid', placeItems: 'center', gap: 12 }}>
      <div className="wheel-legend">
        {SEGMENTS.map(s => (
          <div key={s.label} className="legend-item">
            <span className="legend-swatch" style={{ background: s.color }} />
            <span className="legend-label">{s.label}</span>
            <span className="legend-points">+{s.points}</span>
          </div>
        ))}
      </div>

      <div
        className={`wheel-wrap ${isHolding ? 'hold' : ''}`}
        role="button"
        aria-label="Ruleta: tocar o presionar para girar"
        aria-disabled={spinning || disabled}
        tabIndex={0}
  onContextMenu={(e)=>{ e.preventDefault(); e.stopPropagation(); }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerCancel}
        onPointerLeave={onPointerLeave}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleWheelTap() }
        }}
        style={{ cursor: (spinning || disabled) ? 'not-allowed' : 'pointer', pointerEvents: (spinning || disabled) ? 'none' : 'auto' }}
      >
        {isHolding && (
          <div className="hold-ring" aria-hidden />
        )}
        {showFlames && (
          <div className="flame-ring" aria-hidden />
        )}
        <div style={{
          position: 'absolute', left: '50%', top: -8, transform: 'translateX(-50%)',
          width: 0, height: 0, borderLeft: '12px solid transparent', borderRight: '12px solid transparent',
          borderBottom: '18px solid #f5f5f4', zIndex: 2
        }} />
        <svg
          viewBox="0 0 100 100"
          style={{
            width: '100%', height: '100%', borderRadius: '50%',
            transform: `rotate(${angle}deg)`,
            transition: `transform ${spinDuration}ms cubic-bezier(.17,.67,.35,1)`,
            background: '#0c0c0c'
          }}
        >
          {SEGMENTS.map((s, i) => {
            const startAngle = i * (360 / SEGMENTS.length)
            const endAngle = startAngle + (360 / SEGMENTS.length)
            const largeArc = endAngle - startAngle <= 180 ? 0 : 1
            const start = polarToCartesian(50, 50, 49, endAngle)
            const end = polarToCartesian(50, 50, 49, startAngle)
            const d = [`M 50 50`, `L ${start.x} ${start.y}`, `A 49 49 0 ${largeArc} 0 ${end.x} ${end.y}`, `Z`].join(' ')
            const mid = midPointOnArc(50, 50, RAD_TEXT + 1.5, startAngle + (360 / SEGMENTS.length) / 2)
            const fs = calcWheelFontSize(s.label, segAngle, RAD_TEXT)
            return (
              <g key={s.label}>
                <path d={d} fill={s.color} stroke="#0b0b0b" strokeWidth="0.6" />
                <text x={mid.x} y={mid.y} fontSize={fs} fill="#0b0b0b" textAnchor="middle" dominantBaseline="middle">
                  {s.label}
                </text>
              </g>
            )
          })}
          <circle cx="50" cy="50" r="8" fill="#111827" stroke="#d4d4d8" strokeWidth="1.2" />
        </svg>
      </div>

  <button onClick={spin} disabled={spinning || disabled} style={{ padding: '10px 16px', borderRadius: 10, border: '1px solid #3f3f46', background: '#18181b', color: '#fafafa', opacity: (spinning || disabled) ? .7 : 1 }}>
        {spinning ? 'Girando…' : '🎡 ¡Girar ruleta!'}
      </button>
    </div>
  )
}
 
