import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'
import { fetchLeaderboard, subscribeLeaderboard, subscribeUserRankByScore } from '../services/firestore'

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
  const isMobile = useIsMobile(980)
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [myRank, setMyRank] = useState(null)
  const prevRowsRef = useRef([])
  const highlightMapRef = useRef(new Map())
  const riseMapRef = useRef(new Map())
  const firstLoadRef = useRef(true)

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
    // Suscripción en tiempo real al Top 10 con detección de cambios para resaltar filas
    setLoading(true)
    const unsub = subscribeLeaderboard(db, (data) => {
      // En el primer snapshot no resaltamos, solo primamos el estado
      if (firstLoadRef.current) {
        prevRowsRef.current = data
        setRows(data)
        setLoading(false)
        firstLoadRef.current = false
        return
      }
      const prev = prevRowsRef.current
      const idToIndexPrev = new Map(prev.map((r, i) => [r.id, { i, r }]))
      const now = Date.now()
      data.forEach((r, idx) => {
        const prevInfo = idToIndexPrev.get(r.id)
        const changedScore = !!prevInfo && (prevInfo.r.totalScore !== r.totalScore)
        const changedPos = !!prevInfo && (prevInfo.i !== idx)
        if (changedScore || changedPos) {
          highlightMapRef.current.set(r.id, now)
        }
        if (changedPos && prevInfo.i > idx) {
          // Subió de posición: animación de subida
          riseMapRef.current.set(r.id, now)
        }
      })
      setRows(data)
      prevRowsRef.current = data
      setLoading(false)
    }, (err) => {
      console.error('Realtime Top10 failed; fallback to manual refresh.', err)
      setLoading(false)
    })
    const h = () => load()
    window.addEventListener('reload-top10', h)
    return () => { window.removeEventListener('reload-top10', h); unsub && unsub() }
  }, [db, load])

  useEffect(() => {
    if (!currentUser) { setMyRank(null); return undefined }
    const inTop = rows.some(r => r.id === currentUser.uid)
    if (inTop) { setMyRank(null); return undefined }
    // Suscribirse al rango personal en tiempo real
    const unsub = subscribeUserRankByScore(db, myStats?.totalScore || 0, (rank) => {
      setMyRank(rank)
    }, (err) => {
      console.error('rank error:', err)
    })
    return () => { unsub && unsub() }
  }, [db, rows, currentUser, myStats?.totalScore])

  const isLogged = !!currentUser
  const userInTopIndex = isLogged ? rows.findIndex(r => r.id === currentUser.uid) : -1
  const userInTop = userInTopIndex >= 0
  const myRowData = isLogged ? {
    id: currentUser.uid,
    displayName: myStats?.displayName || currentUser.displayName || currentUser.email,
    totalScore: myStats?.totalScore || 0,
    totalSpins: myStats?.totalSpins || 0
  } : null

  const renderRow = (r, i, opts={}) => {
    const now = Date.now()
    const highlighted = highlightMapRef.current.has(r.id) && (now - (highlightMapRef.current.get(r.id) || 0) < 2200)
    const rose = riseMapRef.current.has(r.id) && (now - (riseMapRef.current.get(r.id) || 0) < 900)
    const trClass = `${highlighted ? 'lb-row-highlight' : ''} ${rose ? 'lb-rise' : ''}`.trim()
    return (
      <tr key={opts.key || r.id} className={trClass} style={{borderBottom:'1px solid #222'}}>
        <td style={{padding:'6px 8px 6px 8px', width:'2.8ch', textAlign:'right'}}>#{i}</td>
        <td style={{padding: isMobile ? '6px 14px 6px 10px' : '6px 24px 6px 10px'}}>
          <div style={{ display:'inline-flex', alignItems:'center', minWidth:0 }}>
            <MedalBadge rank={i} />
            <span className={highlighted ? 'lb-text-pop' : ''} style={{
              display:'inline-block',
              maxWidth: 'unset',
              overflow: 'visible',
              textOverflow: 'clip',
              whiteSpace: 'nowrap',
              wordBreak: 'keep-all',
              overflowWrap: 'normal'
            }}>{r.displayName || r.id}</span>
          </div>
        </td>
        <td style={{padding:'6px 8px', textAlign:'center'}}><b className={highlighted ? 'lb-text-pop' : ''}>{r.totalScore || 0}</b></td>
        <td style={{padding:'6px 8px', textAlign:'center'}}>{r.totalSpins || 0}</td>
      </tr>
    )
  }

  return (
    <div style={{border:'1px solid #333',borderRadius:12,padding:16, maxWidth: 1024, margin: '0 auto'}}>
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
              <th style={{padding: isMobile ? '6px 14px 6px 10px' : '6px 24px 6px 10px',borderBottom:'1px solid #333'}}>Nombre</th>
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
