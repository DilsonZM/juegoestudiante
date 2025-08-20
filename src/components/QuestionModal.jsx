import React, { useEffect, useMemo, useRef, useState } from 'react'
import t from '../i18n'
import { vibrate } from '../utils/sfx'

export default function QuestionModal({ open, question, points, onAnswer, category }) {
  const [value, setValue] = useState('')
  const isTF = question?.type === 'tf'
  const isShort = question?.type === 'short'
  const [seconds, setSeconds] = useState(20)
  const [locked, setLocked] = useState(false)
  const [clicked, setClicked] = useState(null) // 'true' | 'false'
  const [skipping, setSkipping] = useState(false) // cerrar con X
  const timerRef = useRef(null)

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
    setSkipping(false)
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null }
    timerRef.current = setInterval(() => {
      setSeconds((s) => s - 1)
    }, 1000)
    return () => { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null } }
  }, [open, question?.id])

  // Al bloquear (se respondió/omitió), detener el temporizador
  useEffect(() => {
    if (locked && timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }, [locked])

  useEffect(() => {
    if (seconds === 0 && !locked) {
      // Si se acaba el tiempo, penalizar como incorrecto para cualquier tipo
      onAnswer?.({ timeout: true, secondsLeft: 0 })
    }
  }, [seconds, locked, onAnswer])

  // Aviso al cruzar a 5s: vibración leve
  useEffect(() => {
    if (!open) return
    if (seconds === 5) {
      try { vibrate(25) } catch { /* ignore */ }
    }
  }, [open, seconds])

  if (!open) return null

  const Spinner = () => (
    <span aria-hidden style={{display:'inline-flex',alignItems:'center',justifyContent:'center'}}>
      <svg width="20" height="20" viewBox="0 0 50 50" role="img">
        <title>cargando</title>
        <circle cx="25" cy="25" r="20" stroke="#94a3b8" strokeWidth="4" fill="none" opacity=".25"/>
        <path d="M25 5 a20 20 0 0 1 0 40" fill="none" stroke="#8be9e3" strokeWidth="4" strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.9s" repeatCount="indefinite"/>
        </path>
      </svg>
    </span>
  )

  const submit = (e) => {
    e?.preventDefault?.()
    if (!canSubmit) return
    const normalized = isTF ? (value === 'true') : value.trim().toLowerCase()
    onAnswer?.(normalized)
    setValue('')
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" style={{position:'fixed',inset:0,background:'rgba(0,0,0,.55)',display:'grid',placeItems:'center',zIndex:50}}>
      <div className="modal-card" aria-busy={locked} style={{width:'min(560px, 92vw)',background:'#111827',border:'1px solid #3f3f46',borderRadius:12,boxShadow:'0 10px 30px #0006',overflow:'hidden', position:'relative'}}>
        <header style={{padding:'12px 16px',borderBottom:'1px solid #27272a',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h3 style={{margin:0,fontSize:18}}>{t('questionForPoints', points)}</h3>
          <button
            disabled={locked}
            onClick={() => { if (locked) return; setSkipping(true); setLocked(true); onAnswer?.({ timeout: true }) }}
            aria-label="Cerrar"
            style={{background:'transparent',border:0,color:'#e5e7eb',cursor: locked? 'not-allowed' : 'pointer', opacity: locked? .6 : 1}}
          >✕</button>
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
                onClick={()=>{ setClicked('true'); setLocked(true); onAnswer?.({ choice: true, secondsLeft: seconds }) }}
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
                onClick={()=>{ setClicked('false'); setLocked(true); onAnswer?.({ choice: false, secondsLeft: seconds }) }}
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

      {locked && (
            <div style={{
              display:'flex', alignItems:'center', gap:10,
              padding:'8px 10px', border:'1px dashed #334155', borderRadius:8,
              background:'rgba(15,23,42,.35)'
            }}>
              <Spinner />
              <span style={{fontSize:13, color:'#cbd5e1'}}>{skipping ? 'Omitiendo pregunta…' : 'Procesando respuesta…'}</span>
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
          <span style={{opacity:.95, color: seconds <= 5 ? '#ef4444' : '#e5e7eb', fontWeight: seconds <= 5 ? 700 : 500}}>{t('time', seconds)}</span>
          {isShort && (
            <button className="btn" onClick={(e)=>{ e?.preventDefault?.(); if(!canSubmit) return; setLocked(true); onAnswer?.({ value: value.trim().toLowerCase(), secondsLeft: seconds }) }} disabled={!canSubmit} style={{border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', padding:'8px 12px', borderRadius:8}}>{t('reply')}</button>
          )}
        </footer>
      </div>
    </div>
  )
}
