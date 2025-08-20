import React from 'react'

export default function MobileStatsBar({ streak, score, onOpenTop10, profileError }){
  return (
    <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,flexWrap:'wrap',rowGap:6}}>
      <div style={{display:'flex',alignItems:'center',gap:10,flexWrap:'wrap'}}>
        <span style={{fontSize:14,opacity:.9}}>Racha: <b>{streak}</b></span>
        <span style={{fontSize:14,opacity:.9}}>Puntaje: <b>{score}</b></span>
      </div>
      <div style={{display:'flex',alignItems:'center',gap:10}}>
        <button
          className="btn btn-sm"
          onClick={onOpenTop10}
          style={{border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', padding:'4px 10px', borderRadius:8}}
        >
          Top 10
        </button>
      </div>
      {profileError && (
        <div style={{background:'#332b00',border:'1px solid #665500',borderRadius:8,padding:6,fontSize:12,marginLeft:0,marginTop:6}}>
          {profileError}
        </div>
      )}
    </div>
  )
}
