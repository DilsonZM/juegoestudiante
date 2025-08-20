import React from 'react'

export default function Modal({ open, title, onClose, children, hideClose = false }) {
  if (!open) return null
  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={title}
      style={{
        position:'fixed', inset:0, zIndex:1000,
        background:'rgba(0,0,0,.55)', display:'grid', placeItems:'center', padding:'12px'
      }}
      onClick={onClose}
    >
      <div
        style={{
          width:'min(560px, 96vw)', maxHeight:'90vh', overflow:'auto',
          background:'#0f1115', color:'#eaeaea',
          border:'1px solid #333', borderRadius:12, boxShadow:'0 20px 60px rgba(0,0,0,.55)'
        }}
        onClick={(e)=>e.stopPropagation()}
      >
        <div style={{display:'flex',alignItems:'center',gap:8,padding:'10px 12px',borderBottom:'1px solid #222'}}>
          <strong style={{fontSize:16}}>{title}</strong>
          {!hideClose && (
            <button
              onClick={onClose}
              className="btn btn-sm"
              style={{marginLeft:'auto',borderRadius:8,border:'1px solid var(--stroke)',background:'#18181b',color:'#fafafa',padding:'6px 10px'}}
            >Cerrar</button>
          )}
        </div>
        <div style={{padding:12}}>
          {children}
        </div>
      </div>
    </div>
  )
}
