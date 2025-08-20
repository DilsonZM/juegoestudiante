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
