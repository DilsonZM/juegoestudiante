import React from 'react'

export default function Splash(){
  return (
    <div className="splash-overlay" role="dialog" aria-label="Bienvenido">
      <div className="splash-card">
        <div className="splash-wheel" aria-hidden>
          <svg viewBox="0 0 100 100">
            <defs>
              <radialGradient id="g" cx="50%" cy="50%" r="60%">
                <stop offset="0%" stopColor="#0b0b0b"/>
                <stop offset="100%" stopColor="#171717"/>
              </radialGradient>
            </defs>
            <circle cx="50" cy="50" r="48" fill="url(#g)" stroke="#303030" strokeWidth="1.5"/>
            { ["#60a5fa","#f59e0b","#10b981","#a78bfa","#f472b6","#34d399","#f87171","#22d3ee"].map((c, i)=>{
              const a = i * 45
              const rad = (deg)=> (deg-90) * Math.PI/180
              const x1 = 50 + 48*Math.cos(rad(a))
              const y1 = 50 + 48*Math.sin(rad(a))
              const x2 = 50 + 48*Math.cos(rad(a+45))
              const y2 = 50 + 48*Math.sin(rad(a+45))
              const d = `M 50 50 L ${x1} ${y1} A 48 48 0 0 1 ${x2} ${y2} Z`
              return <path key={i} d={d} fill={c} opacity=".9"/>
            })}
            <circle cx="50" cy="50" r="10" fill="#0e0e0e" stroke="#e5e7eb" strokeWidth="1"/>
          </svg>
          <span className="splash-pin" />
        </div>
        <h1 className="splash-title">Bienvenidos</h1>
        <p className="splash-sub">al juego de la Ruleta de Datos</p>
        <div className="splash-loading" aria-label="Cargando" />
      </div>
    </div>
  )
}
