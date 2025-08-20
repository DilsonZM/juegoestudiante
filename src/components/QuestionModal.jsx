import React, { useEffect, useMemo, useState } from 'react'
import t from '../i18n'

export default function QuestionModal({ open, onClose, question, points, onAnswer, category }) {
  const [value, setValue] = useState('')
  const isTF = question?.type === 'tf'
  const isShort = question?.type === 'short'
  const [seconds, setSeconds] = useState(20)
  const [locked, setLocked] = useState(false)
  const [clicked, setClicked] = useState(null) // 'true' | 'false'

  const canSubmit = useMemo(() => {
    if (!question) return false
    if (isTF) return value === 'true' || value === 'false'
    if (isShort) return value.trim().length > 0
    return false
  }, [question, isTF, isShort, value])

  useEffect(() => {
    if (!open) return
    setSeconds(20)
  setLocked(false)
  setValue('')
  setClicked(null)
    const id = setInterval(() => setSeconds((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [open, question?.id])

  useEffect(() => {
    if (seconds === 0) {
      // Si se acaba el tiempo y es TF, marcamos como incorrecto
      if (isTF) onAnswer?.({ timeout: true })
      else onClose?.()
    }
  }, [seconds, isTF, onAnswer, onClose])

  if (!open) return null

  const submit = (e) => {
    e?.preventDefault?.()
    if (!canSubmit) return
    const normalized = isTF ? (value === 'true') : value.trim().toLowerCase()
    onAnswer?.(normalized)
    setValue('')
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',display:'grid',placeItems:'center',zIndex:50}}>
      <div className="modal-card" style={{width:'min(560px, 92vw)',background:'#111827',border:'1px solid #3f3f46',borderRadius:12,boxShadow:'0 10px 30px #0006',overflow:'hidden'}}>
        <header style={{padding:'12px 16px',borderBottom:'1px solid #27272a',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0,fontSize:18}}>{t('questionForPoints', points)}</h3>
          <button onClick={onClose} aria-label="Cerrar" style={{background:'transparent',border:0,color:'#e5e7eb',cursor:'pointer'}}>✕</button>
        </header>
        <div style={{padding:16,display:'grid',gap:12}}>
          {category && (
            <div style={{fontSize:12, opacity:.85}}>
              Relacionada con la ruleta: <b>{category}</b>
            </div>
          )}
          <p style={{margin:'4px 0 8px 0'}}>{question?.text}</p>

      {isTF && open && (
            <div style={{display:'flex',gap:8}}>
              <button
                className="btn"
        disabled={locked}
                onClick={()=>{ setClicked('true'); setLocked(true); onAnswer?.(true) }}
                style={{
                  border:'1px solid #3f3f46',
                  background: clicked==='true' ? '#16a34a' : '#14532d',
                  color:'#fafafa', padding:'8px 12px', borderRadius:8,
                  opacity: locked? .9 : 1,
                  transition:'transform .12s ease, background .2s ease',
                  transform: clicked==='true' ? 'scale(1.04)' : 'scale(1)'
                }}
              >{t('true')}</button>
              <button
                className="btn"
        disabled={locked}
                onClick={()=>{ setClicked('false'); setLocked(true); onAnswer?.(false) }}
                style={{
                  border:'1px solid #3f3f46',
                  background: clicked==='false' ? '#dc2626' : '#7f1d1d',
                  color:'#fafafa', padding:'8px 12px', borderRadius:8,
                  opacity: locked? .9 : 1,
                  transition:'transform .12s ease, background .2s ease',
                  transform: clicked==='false' ? 'scale(1.04)' : 'scale(1)'
                }}
              >{t('false')}</button>
            </div>
          )}

          {isShort && (
            <form onSubmit={submit}>
              <input
                autoFocus
                value={value}
                onChange={e=>setValue(e.target.value)}
                placeholder={t('answerShortPlaceholder')}
                style={{width:'100%',padding:'10px 12px',borderRadius:8,border:'1px solid #3f3f46',background:'#0b0b0b',color:'#e5e7eb'}}
              />
            </form>
          )}
        </div>
  <footer style={{padding:16,borderTop:'1px solid #27272a',display:'flex',justifyContent:'space-between',gap:8,alignItems:'center'}}>
          <span style={{opacity:.85}}>{t('time', seconds)}</span>
          {isShort && (
            <button className="btn" onClick={submit} disabled={!canSubmit} style={{border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', padding:'8px 12px', borderRadius:8}}>{t('reply')}</button>
          )}
        </footer>
      </div>
    </div>
  )
}
