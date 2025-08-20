import React from 'react'

export default function StreakModal({ open, level, streak, onClose }){
  if (!open) return null
  return (
    <div onClick={onClose} style={{position:'fixed', inset:0, background:'rgba(0,0,0,.5)', display:'grid', placeItems:'center', zIndex:70}}>
      <div onClick={e=>e.stopPropagation()} style={{
        background:'#0b0b0b', border:'1px solid #3f3f46', borderRadius:16, padding:20,
        boxShadow: '0 14px 40px rgba(0,0,0,.45)', textAlign:'center', width:'min(520px, 92vw)'
      }}>
        <div style={{fontSize:22, fontWeight:900, marginBottom:6}}>
          {level === 1 && '🔥 ¡Racha de 3!'}
          {level === 2 && '⚡ ¡Racha de 7!'}
          {level === 3 && (streak >= 10 ? '🏆 ¡Racha 10+!' : '🏆 ¡Racha de 10!')}
        </div>
        <div style={{opacity:.9, marginBottom:12}}>¡Sigue así! Racha actual: <b>{streak}</b></div>
        <button onClick={onClose} style={{border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', borderRadius:10, padding:'8px 12px'}}>Continuar</button>
      </div>
    </div>
  )
}
