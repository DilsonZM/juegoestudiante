import React from 'react'
import Modal from './Modal'

export default function SettingsModal({ open, onClose, soundOn, onToggleSound, onExit }){
  return (
    <Modal open={open} title="Ajustes" onClose={onClose} hideClose>
      <div style={{display:'grid', gap:16}}>
        <div style={{display:'flex', alignItems:'center', justifyContent:'space-between'}}>
          <span>Sonido</span>
          <button
            type="button"
            onClick={onToggleSound}
            className={`switch ${soundOn ? 'on' : ''}`}
            aria-pressed={soundOn}
            aria-label="Activar o desactivar sonido"
          >
            <span className="switch-knob" />
          </button>
        </div>

        <button
          onClick={() => { onClose?.(); onExit?.(); }}
          className="btn"
          style={{marginTop:4}}
        >
          Salir del juego
        </button>
      </div>
    </Modal>
  )
}
