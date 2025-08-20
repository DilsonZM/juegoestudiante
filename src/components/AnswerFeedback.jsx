import React, { useEffect } from 'react'

export default function AnswerFeedback({ open, correct, explain, onClose, durationMs = 10000, dismissable = true, pointsDelta = 0 }) {
  useEffect(() => {
    if (!open) return
    const id = setTimeout(() => onClose?.(), durationMs)
    return () => clearTimeout(id)
  }, [open, onClose, durationMs])

  if (!open) return null

  return (
    <div
      onClick={dismissable ? onClose : undefined}
      style={{position:'fixed', inset:0, display:'grid', placeItems:'center', zIndex:60,
        background:'linear-gradient(180deg, rgba(0,0,0,0.25), rgba(0,0,0,0.55))'}}
    >
      {/* Confeti / ramilletes al ganar */}
      {correct && (
        <div aria-hidden className="confetti-overlay" style={{position:'fixed', inset:0, pointerEvents:'none', overflow:'hidden'}}>
          {Array.from({ length: 42 }).map((_, i) => {
            const angle = (i / 42) * Math.PI * 2
            const base = 160 + (i % 4) * 40
            const dx = Math.cos(angle) * base
            const dy = Math.sin(angle) * base
            const rot = (i * 33) % 180 - 90
            const delay = (i % 7) * 20
            const colors = ['#ff6b6b','#ffd166','#06d6a0','#5ecbff','#b794f4','#8be9e3']
            const color = colors[i % colors.length]
            const w = 8 + (i % 3) * 4
            const h = 10 + ((i+2) % 4) * 6
            return (
              <span key={i} className="confetti-piece" style={{
                position:'absolute', left:'50%', top:'40%', width:w, height:h,
                background: color, borderRadius:2, transform:'translate(-50%, -50%)',
                animation: `confettiFly 900ms ease-out ${delay}ms forwards`,
                boxShadow:'0 2px 6px rgba(0,0,0,.35)',
                '--dx': `${dx}px`, '--dy': `${dy}px`, '--rot': `${rot}deg`
              }} />
            )
          })}
          <style>{`
            @keyframes confettiFly {
              0%   { transform: translate(-50%, -50%) scale(1) rotate(0deg); opacity: 1 }
              35%  { transform: translate(calc(-50% + var(--dx)*.4), calc(-50% + var(--dy)*.4)) scale(1.05) rotate(var(--rot)); opacity: 1 }
              100% { transform: translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(1) rotate(var(--rot)); opacity: 0 }
            }
          `}</style>
        </div>
      )}
      <div onClick={(e)=>e.stopPropagation()} style={{
        background: correct ? 'linear-gradient(135deg, #34d399, #10b981)' : 'linear-gradient(135deg, #f87171, #ef4444)',
        color:'#0b0b0b',
        padding:'18px 20px',
        borderRadius:16,
        boxShadow:'0 14px 40px rgba(0,0,0,0.45)',
        maxWidth:'min(560px, 92vw)',
        transform:'translateY(0)',
        animation: correct ? 'af-bounce .5s ease-out' : 'af-shake .4s ease-out'
      }}>
        <style>{`
          @keyframes af-bounce { 0% { transform: scale(.9); opacity:.6 } 50% { transform: scale(1.06); opacity:1 } 100% { transform: scale(1); opacity:1 } }
          @keyframes af-shake { 0% { transform: translateX(0) } 25% { transform: translateX(-6px) rotate(-1deg) } 50% { transform: translateX(6px) rotate(1deg) } 75% { transform: translateX(-4px) rotate(-1deg) } 100% { transform: translateX(0) }
          }
        `}</style>
        <div style={{display:'flex', alignItems:'center', gap:12, marginBottom:6}}>
          <span aria-hidden style={{fontSize:20}}>{correct ? '✅' : '❌'}</span>
          <div style={{fontWeight:900, fontSize:18}}>{correct ? '¡Correcto!' : 'Incorrecto'}</div>
        </div>
        <div style={{fontSize:14, opacity:.95, marginBottom:4}}>
          {correct ? `Ganaste +${Math.abs(pointsDelta)} puntos` : `Perdiste -${Math.abs(pointsDelta)} puntos`}
        </div>
        {!correct && explain && (
          <div style={{fontSize:14, opacity:.95}}>{explain}</div>
        )}
        {dismissable && (
          <div style={{display:'flex', justifyContent:'flex-end', marginTop:10}}>
            <button onClick={onClose} style={{border:'1px solid rgba(0,0,0,.2)', background:'#0b0b0b', color:'#f5f5f5', borderRadius:8, padding:'6px 10px'}}>Cerrar</button>
          </div>
        )}
      </div>
    </div>
  )
}
