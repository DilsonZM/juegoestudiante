import React, { useCallback, useEffect, useState } from 'react'
import { fetchLeaderboard, fetchUserRankByScore } from '../services/firestore'

function MedalBadge({ rank }) {
  const bg = rank === 1 ? '#fbbf24' : rank === 2 ? '#d1d5db' : rank === 3 ? '#cd7f32' : null
  if (!bg) return null
  return (
    <span
      style={{
        width: 18, height: 18, display: 'inline-grid', placeItems: 'center',
        borderRadius: '50%', background: bg, color: '#0b0b0b', fontSize: 12, fontWeight: 900,
        marginRight: 8, boxShadow: '0 0 0 1px #0b0b0b inset, 0 1px 2px rgba(0,0,0,.35)'
      }}
      aria-hidden
    >★</span>
  )
}

export default function Leaderboard({ db, currentUser, myStats }){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [myRank, setMyRank] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchLeaderboard(db)
      setRows(data)
    } catch (err) {
      console.error('Top10 load failed:', err)
      setError('Error al consultar los datos del Top 10. Verifica tu conexión o permisos de Firebase.')
      setRows([])
    } finally {
      setLoading(false)
    }
  }, [db])

  useEffect(() => {
    load()
    const h = () => load()
    window.addEventListener('reload-top10', h)
    return () => window.removeEventListener('reload-top10', h)
  }, [load])

  useEffect(() => {
    (async () => {
      if (!currentUser) { setMyRank(null); return }
      const inTop = rows.some(r => r.id === currentUser.uid)
      if (inTop) { setMyRank(null); return }
      try {
        const rank = await fetchUserRankByScore(db, myStats?.totalScore || 0)
        setMyRank(rank)
      } catch (e) {
        console.error('rank error:', e)
        setMyRank(null)
      }
    })()
  }, [db, rows, currentUser, myStats?.totalScore])

  const renderRow = (r, i, opts={}) => (
    <tr key={opts.key || r.id} style={{borderBottom:'1px solid #222', background: opts.highlight ? 'rgba(255,255,255,0.06)' : 'transparent'}}>
  <td style={{padding:'6px 8px 6px 8px', width:'2.8ch', textAlign:'right'}}>#{i}</td>
  <td style={{padding:'6px 8px 6px 10px'}}>
        <div style={{ display:'inline-flex', alignItems:'center' }}>
          <MedalBadge rank={i} />
          <span>{r.displayName || r.id}</span>
        </div>
      </td>
  <td style={{padding:'6px 8px', textAlign:'center'}}><b>{r.totalScore || 0}</b></td>
  <td style={{padding:'6px 8px', textAlign:'center'}}>{r.totalSpins || 0}</td>
    </tr>
  )

  const isLogged = !!currentUser
  const userInTopIndex = isLogged ? rows.findIndex(r => r.id === currentUser.uid) : -1
  const userInTop = userInTopIndex >= 0

  const myRowData = isLogged ? {
    id: currentUser.uid,
    displayName: myStats?.displayName || currentUser.displayName || currentUser.email,
    totalScore: myStats?.totalScore || 0,
    totalSpins: myStats?.totalSpins || 0
  } : null

  return (
    <div style={{border:'1px solid #333',borderRadius:12,padding:16}}>
      <div style={{display:'flex',alignItems:'center',marginBottom:8}}>
        <b style={{flex:1}}>Top 10 (Total Score)</b>
        <button
          className="btn btn-primary btn-sm"
          style={{fontSize:12,padding:'2px 6px',height:26,minWidth:0,borderRadius:7,width:'auto',marginLeft:'auto'}}
          onClick={load}
        >
          Actualizar
        </button>
      </div>

      {loading && <div style={{opacity:.7,fontSize:12}}>Cargando…</div>}
      {error && <div style={{color:'#ff6b6b',fontSize:13,marginBottom:8}}>{error}</div>}

      <div className="table-wrap">
        <table style={{width:'100%',borderCollapse:'collapse',fontSize:14}}>
          <thead>
            <tr style={{textAlign:'left',opacity:.9}}>
              <th style={{padding:'6px 8px 6px 8px',borderBottom:'1px solid #333', width:'2.8ch', textAlign:'right'}}>#</th>
              <th style={{padding:'6px 8px 6px 10px',borderBottom:'1px solid #333'}}>Nombre</th>
              <th style={{padding:'6px 8px',borderBottom:'1px solid #333', textAlign:'center'}}>Score total</th>
              <th style={{padding:'6px 8px',borderBottom:'1px solid #333', textAlign:'center'}}>Giros totales</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, idx)=> renderRow(r, idx+1))}
            {isLogged && !userInTop && myRowData && (
              <>
                <tr><td colSpan={4} style={{padding:4}} /></tr>
                {renderRow(
                  myRowData,
                  myRank ?? '—',
                  { key: 'me', highlight: true }
                )}
              </>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
