import { getFirebaseErrorMsg } from './firebaseErrorMap'
import Swal from 'sweetalert2'
import { showErrorSwal } from './swal'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { initializeApp, getApps } from 'firebase/app'
import {
  getAuth, onAuthStateChanged, createUserWithEmailAndPassword,
  signInWithEmailAndPassword, signOut, sendPasswordResetEmail, updateProfile
} from 'firebase/auth'
import {
  getFirestore, doc, setDoc, getDoc, serverTimestamp,
  collection, addDoc, query, orderBy, limit, getDocs, runTransaction
} from 'firebase/firestore'
import './index.css'
import unirLogo from './assets/unir.png'

const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyDH1Hkp68MR3-o-s_J_LbaEPnUcTVFuZHQ',
  authDomain: 'actgobiernodatos.firebaseapp.com',
  projectId: 'actgobiernodatos',
  storageBucket: 'actgobiernodatos.appspot.com',
  messagingSenderId: '320299764635',
  appId: '1:320299764635:web:1e2a033995c8485ef62f3e',
}

function useFirebase() {
  const app = useMemo(() => (getApps().length ? getApps()[0] : initializeApp(FIREBASE_CONFIG)), [])
  const auth = useMemo(() => getAuth(app), [app])
  const db = useMemo(() => getFirestore(app), [app])
  return { app, auth, db }
}

/* ==== Helper: detectar móvil por ancho (breakpoint 900px) ==== */
function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint}px)`)
    const handler = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [breakpoint])
  return isMobile
}

/* ==== Modal básico accesible (solo móvil lo usamos) ==== */
function Modal({ open, title, onClose, children }) {
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
          <button
            onClick={onClose}
            className="btn btn-sm"
            style={{marginLeft:'auto',borderRadius:8,border:'1px solid #3f3f46',background:'#18181b',color:'#fafafa',padding:'6px 10px'}}
          >Cerrar</button>
        </div>
        <div style={{padding:12}}>
          {children}
        </div>
      </div>
    </div>
  )
}

function Logo() {
  return (
    <div className="brand">
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 2l4 7-4 2-4-2 4-7zm0 20l-4-7 4-2 4 2-4 7z" />
      </svg>
      <span>Gobierno del Dato y toma de decisiones</span>
    </div>
  )
}

const Eye = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden style={{fill:'#888',stroke:'#888'}}>
    <path d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7zm0 11a4 4 0 110-8 4 4 0 010 8z" />
  </svg>
)
const EyeOff = (
  <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden style={{fill:'#888',stroke:'#888'}}>
    <path d="M2 5l2-2 17 17-2 2-3.1-3.1A11.8 11.8 0 0112 19C5 19 2 12 2 12a20.9 20.9 0 013.7-5.6L2 5zm8.6 3.2L8.7 6.3A4.9 4.9 0 007 10a5 5 0 007 4.7l-1.8-1.8A3 3 0 009 10c0-.6.2-1.2.6-1.8zM12 5c2.2 0 4 .6 5.7 1.7A17.6 17.6 0 0122 12s-3 7-10 7c-.9 0-1.7-.1-2.5-.3l2.3-2.3c.1 0 .1 0 .2.1A5 5 0 0017 10a4.8 4.8 0 00-.4-2l1.6-1.6A13.3 13.3 0 0012 5z" />
  </svg>
)

function AuthPanel({ auth, db, onReady }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [gender, setGender] = useState('X')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const saveProfile = async (uid, profile) => {
    await setDoc(doc(db, 'users', uid), { ...profile, createdAt: serverTimestamp() }, { merge: true })
  }

  const doRegister = async () => {
    setLoading(true); setError('')
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName })
      await saveProfile(cred.user.uid, { displayName, gender, city })
      onReady?.()
    } catch (e) {
      showErrorSwal(getFirebaseErrorMsg(e))
    } finally {
      setLoading(false)
    }
  }

  const doLogin = async () => {
    setLoading(true); setError('')
    try {
      await signInWithEmailAndPassword(auth, email, password)
      onReady?.()
    } catch (e) {
      showErrorSwal(getFirebaseErrorMsg(e))
    } finally {
      setLoading(false)
    }
  }

  const doReset = async () => {
    setLoading(true); setError('')
    try {
      await sendPasswordResetEmail(auth, email)
      Swal.fire({
        icon:'success',
        title:'Solicitud enviada',
        text:'Si el correo está registrado, recibirás un enlace para restablecer tu contraseña.',
        confirmButtonColor:'#1dd1c6',
        background:'#131a3a',
        color:'#e8ecf4'
      })
    } catch (e) {
      showErrorSwal(getFirebaseErrorMsg(e))
    } finally {
      setLoading(false)
    }
  }

  const action = mode === 'login' ? doLogin : mode === 'register' ? doRegister : doReset

  return (
    <section className="auth-card">
      <header className="card-head">
        <h1>{mode === 'login' ? 'Bienvenido' : mode === 'register' ? 'Crear cuenta' : 'Recuperar acceso'}</h1>
        <p className="muted">
          {mode === 'login'
            ? 'Inicia sesión para continuar'
            : mode === 'register'
            ? 'Completa tus datos para registrarte'
            : 'Te enviaremos un correo para restablecer tu contraseña'}
        </p>
      </header>

      <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
        {['login', 'register', 'reset'].map(m => (
          <button
            key={m}
            type="button"
            onClick={() => setMode(m)}
            style={{
              padding: '6px 10px',
              borderRadius: 10,
              border: '1px solid var(--stroke)',
              background: m === mode ? 'linear-gradient(90deg, var(--brand), var(--brand-2))' : 'transparent',
              color: m === mode ? '#08211f' : 'var(--text)',
              fontWeight: 700,
              cursor: 'pointer',
              boxShadow: m === mode ? '0 8px 20px rgba(0,0,0,.18)' : 'none',
              transition: 'background .2s, color .2s'
            }}
          >
            {m === 'login' ? 'Login' : m === 'register' ? 'Registro' : 'Reset'}
          </button>
        ))}
      </div>

      {error && <div className="alert" style={{ marginTop: 10 }}>{error}</div>}

      <form
        className="form"
        onSubmit={(e) => { e.preventDefault(); action(); }}
        noValidate
        style={{ marginTop: 12 }}
      >
        <div className="field">
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="tucorreo@dominio.com"
            autoComplete="email"
            required
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>

        {mode !== 'reset' && (
          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <div className="pwd">
              <input
                id="password"
                name="password"
                type={showPwd ? 'text' : 'password'}
                placeholder="••••••••"
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="icon-btn"
                aria-label={showPwd ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                onClick={() => setShowPwd(s => !s)}
                style={{ background: 'transparent' }}
              >
                {showPwd ? EyeOff : Eye}
              </button>
            </div>
          </div>
        )}

        {mode === 'register' && (
          <>
            <div className="field">
              <label htmlFor="displayName">Nombre</label>
              <input
                id="displayName"
                name="displayName"
                placeholder="Solo tu primer nombre"
                value={displayName}
                onChange={e => {
                  const val = e.target.value.replace(/\s.*/, '')
                  setDisplayName(val)
                }}
                required
                pattern="^[^\s]+$"
                title="Solo tu primer nombre, sin espacios"
              />
            </div>
            <div className="field">
              <label htmlFor="city">Ciudad</label>
              <input
                id="city"
                name="city"
                placeholder="Ciudad (opcional)"
                value={city}
                onChange={e => setCity(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="gender">Género</label>
              <div style={{
                display: 'flex',
                gap: 10,
                background: 'rgba(255,255,255,.08)',
                borderRadius: 12,
                padding: '4px 6px',
                border: '1px solid var(--stroke)',
                alignItems: 'center',
                marginTop: 2
              }}>
                <button type="button" onClick={()=>setGender('M')} style={{
                  background: gender==='M' ? 'linear-gradient(90deg, var(--brand), var(--brand-2))' : 'transparent',
                  color: gender==='M' ? '#08211f' : 'var(--text)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: gender==='M' ? '0 4px 12px rgba(0,0,0,.10)' : 'none',
                  fontSize: 15
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:5}}><circle cx="12" cy="12" r="10"/><path d="M16 8v-4h-4"/><line x1="16" y1="8" x2="21" y2="3"/></svg>
                  Masculino
                </button>
                <button type="button" onClick={()=>setGender('F')} style={{
                  background: gender==='F' ? 'linear-gradient(90deg, var(--brand), var(--brand-2))' : 'transparent',
                  color: gender==='F' ? '#08211f' : 'var(--text)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: gender==='F' ? '0 4px 12px rgba(0,0,0,.10)' : 'none',
                  fontSize: 15
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:5}}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M9 20h6"/></svg>
                  Femenino
                </button>
                <button type="button" onClick={()=>setGender('X')} style={{
                  background: gender==='X' ? 'linear-gradient(90deg, var(--brand), var(--brand-2))' : 'transparent',
                  color: gender==='X' ? '#08211f' : 'var(--text)',
                  border: 'none',
                  borderRadius: 8,
                  padding: '6px 12px',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  boxShadow: gender==='X' ? '0 4px 12px rgba(0,0,0,.10)' : 'none',
                  fontSize: 15
                }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:5}}><circle cx="12" cy="12" r="10"/><path d="M8 12h8"/><path d="M12 8v8"/></svg>
                  Prefiero no decir
                </button>
              </div>
            </div>
          </>
        )}

        <button className="btn" disabled={loading}>
          {loading ? 'Procesando…' : mode === 'login' ? 'Ingresar' : mode === 'register' ? 'Crear cuenta' : 'Enviar correo'}
        </button>

        {mode === 'login' && (
          <p className="muted center mt-16">
            ¿No tienes cuenta?{' '}
            <a className="link" href="#" onClick={(ev) => { ev.preventDefault(); setMode('register') }}>
              Crear cuenta
            </a>
            {' '}·{' '}
            <a className="link" href="#" onClick={(ev) => { ev.preventDefault(); setMode('reset') }}>
              ¿Olvidaste tu contraseña?
            </a>
          </p>
        )}
      </form>
    </section>
  )
}

async function submitSpinAndAccumulate(db, uid, displayName, result){
  const spinsCol = collection(db, 'spins')
  const statsRef = doc(db, 'userstats', uid)
  await addDoc(spinsCol, { uid, ...result, createdAt: serverTimestamp() })
  await runTransaction(db, async (tx)=>{
    const snap = await tx.get(statsRef)
    const prev = snap.exists() ? snap.data() : { totalScore: 0, totalSpins: 0, displayName: displayName || 'Anónimo' }
    const next = {
      displayName: displayName || prev.displayName || 'Anónimo',
      totalScore: (prev.totalScore || 0) + (result.points || 0),
      totalSpins: (prev.totalSpins || 0) + 1,
      updatedAt: serverTimestamp(),
    }
    tx.set(statsRef, next, { merge:true })
  })
}

async function fetchLeaderboard(db){
  const q = query(collection(db,'userstats'), orderBy('totalScore','desc'), limit(10))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// --- Badge oro/plata/bronce siempre visible ---
function MedalBadge({ rank }) {
  const bg =
    rank === 1 ? '#fbbf24' :
    rank === 2 ? '#d1d5db' :
    rank === 3 ? '#cd7f32' : null
  if (!bg) return null
  return (
    <span
      style={{
        width: 18, height: 18,
        display: 'inline-grid', placeItems: 'center',
        borderRadius: '50%',
        background: bg,
        color: '#0b0b0b', fontSize: 12, fontWeight: 900,
        marginRight: 8,
        boxShadow: '0 0 0 1px #0b0b0b inset, 0 1px 2px rgba(0,0,0,.35)'
      }}
      aria-hidden
    >
      ★
    </span>
  )
}

function Leaderboard({ db }){
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

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
              <th style={{padding:'6px 8px',borderBottom:'1px solid #333'}}>#</th>
              <th style={{padding:'6px 8px',borderBottom:'1px solid #333'}}>Nombre</th>
              <th style={{padding:'6px 8px',borderBottom:'1px solid #333'}}>Score total</th>
              <th style={{padding:'6px 8px',borderBottom:'1px solid #333'}}>Giros totales</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r,i)=>(
              <tr key={r.id} style={{borderBottom:'1px solid #222'}}>
                <td style={{padding:'6px 8px'}}>#{i+1}</td>
                <td style={{padding:'6px 8px'}}>
                  <div style={{ display:'inline-flex', alignItems:'center' }}>
                    <MedalBadge rank={i+1} />
                    <span>{r.displayName || r.id}</span>
                  </div>
                </td>
                <td style={{padding:'6px 8px',textAlign:'center'}}><b>{r.totalScore || 0}</b></td>
                <td style={{padding:'6px 8px',textAlign:'center'}}>{r.totalSpins || 0}</td>
              </tr>
            ))}
            {!rows.length && !loading && !error && (
              <tr><td colSpan={4} style={{padding:'8px',opacity:.7}}>Aún no hay acumulados.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const SEGMENTS = [
  { label: 'Calidad',           points: 10, color: '#60a5fa' },
  { label: 'Seguridad',         points: 9,  color: '#f59e0b' },
  { label: 'Privacidad',        points: 9,  color: '#10b981' },
  { label: 'Catálogo',          points: 8,  color: '#a78bfa' },
  { label: 'Propiedad',         points: 8,  color: '#f472b6' },
  { label: 'Trazabilidad',      points: 7,  color: '#34d399' },
  { label: 'Políticas',         points: 7,  color: '#f87171' },
  { label: 'Interoperabilidad', points: 6,  color: '#22d3ee' },
]

function polarToCartesian(cx, cy, r, angleDeg){
  const rad = (angleDeg-90) * Math.PI / 180
  return { x: cx + (r * Math.cos(rad)), y: cy + (r * Math.sin(rad)) }
}
function midPointOnArc(cx, cy, r, angleDeg){
  const rad = (angleDeg-90) * Math.PI / 180
  return { x: cx + (r * Math.cos(rad)), y: cy + (r * Math.sin(rad)) }
}

function Wheel({ onResult }) {
  const [spinning,setSpinning] = useState(false)
  const [angle, setAngle] = useState(0)

  const segAngle = 360 / SEGMENTS.length
  const RAD_TEXT = 36

  function calcFontSize(label) {
    const theta = (segAngle * Math.PI) / 180
    const maxWidth = 2 * RAD_TEXT * Math.sin(theta / 2) * 0.9
    const estimateFactor = 0.6
    const MAX_FS = 5.2
    const fs = Math.min(MAX_FS, maxWidth / (estimateFactor * Math.max(1, label.length)))
    return Math.max(3.2, fs)
  }

  const spin = () => {
    if(spinning) return
    setSpinning(true)
    const turns = 5 + Math.floor(Math.random()*4)
    const idx = Math.floor(Math.random()*SEGMENTS.length)
    const finalDeg = turns*360 + (SEGMENTS.length - idx) * segAngle - segAngle/2
    const newAngle = angle + finalDeg
    setAngle(newAngle)
    setTimeout(()=> {
      setSpinning(false)
      const normalized = (newAngle % 360 + 360) % 360
      const pickedIndex = (SEGMENTS.length - Math.floor((normalized + segAngle/2) / segAngle)) % SEGMENTS.length
      const result = SEGMENTS[pickedIndex]
      onResult?.(result)
    }, 3800)
  }

  return (
    <div style={{display:'grid',placeItems:'center',gap:12}}>
      <div className="wheel-legend">
        {SEGMENTS.map(s=>(
          <div key={s.label} className="legend-item">
            <span className="legend-swatch" style={{ background: s.color }} />
            <span className="legend-label">{s.label}</span>
            <span className="legend-points">+{s.points}</span>
          </div>
        ))}
      </div>


      <div className="wheel-wrap">
        <div style={{
          position:'absolute', left:'50%', top:-8, transform:'translateX(-50%)',
          width:0, height:0, borderLeft:'12px solid transparent', borderRight:'12px solid transparent',
          borderBottom:'18px solid #f5f5f4', zIndex:2
        }} />
        <svg
          viewBox="0 0 100 100"
          style={{
            width:'100%', height:'100%', borderRadius:'50%',
            transform:`rotate(${angle}deg)`,
            transition:'transform 3.8s cubic-bezier(.17,.67,.35,1)',
            background:'#0c0c0c'
          }}
        >
          {SEGMENTS.map((s, i) => {
            const startAngle = i * (360 / SEGMENTS.length)
            const endAngle = startAngle + (360 / SEGMENTS.length)
            const largeArc = endAngle - startAngle <= 180 ? 0 : 1
            const start = polarToCartesian(50, 50, 49, endAngle)
            const end = polarToCartesian(50, 50, 49, startAngle)
            const d = [`M 50 50`,`L ${start.x} ${start.y}`,`A 49 49 0 ${largeArc} 0 ${end.x} ${end.y}`,`Z`].join(' ')
            const mid = midPointOnArc(50, 50, RAD_TEXT + 1.5, startAngle + (360 / SEGMENTS.length)/2)
            const fs = calcFontSize(s.label)
            return (
              <g key={s.label}>
                <path d={d} fill={s.color} stroke="#0b0b0b" strokeWidth="0.6"/>
                <text x={mid.x} y={mid.y} fontSize={fs} fill="#0b0b0b" textAnchor="middle" dominantBaseline="middle">
                  {s.label}
                </text>
              </g>
            )
          })}
          <circle cx="50" cy="50" r="8" fill="#111827" stroke="#d4d4d8" strokeWidth="1.2"/>
        </svg>
      </div>

      <button onClick={spin} disabled={spinning} style={{padding:'10px 16px',borderRadius:10, border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa'}}>
        {spinning ? 'Girando…' : '🎡 ¡Girar ruleta!'}
      </button>
    </div>
  )
}

export default function App(){
  const { auth, db } = useFirebase()
  const isMobile = useIsMobile(900)
  const [user,setUser] = useState(null)
  const [profileReady,setProfileReady] = useState(false)
  const [profileError,setProfileError] = useState(null)
  const [lastResult,setLastResult] = useState(null)
  const [showLbModal, setShowLbModal] = useState(false) // modal Top 10 (solo móvil)

  useEffect(()=> onAuthStateChanged(auth, async (u)=>{
    setUser(u)
    if(!u){ setProfileReady(false); return }
    try{
      const ref = doc(db,'users',u.uid)
      const snap = await getDoc(ref)
      if(!snap.exists()){
        await setDoc(ref, {
          displayName: u.displayName || u.email,
          gender: 'X',
          city: 'N/A',
          createdAt: serverTimestamp()
        }, { merge:true })
      }
      setProfileReady(true)
      setProfileError(null)
    }catch(err){
      console.error('Perfil/Firestore no disponible:', err)
      setProfileError('⚠️ Error conectando con Firestore. Se podrá girar, pero no se guardarán resultados.')
      setProfileReady(true)
    }
  }), [auth, db])

  const onSpinResult = useCallback(async (res)=>{
    setLastResult(res)
    if(user && !profileError){
      await submitSpinAndAccumulate(db, user.uid, user.displayName || user.email, { label: res.label, points: res.points })
      window.dispatchEvent(new Event('reload-top10'))
    }
  }, [db, user, profileError])

  const salir = async ()=>{ try{ await signOut(auth) } catch(e){ console.error(e) } }

  return (
    <div style={{minHeight:'100vh',background:'#0b0b0b',color:'#eaeaea',padding:16,fontFamily:'system-ui, sans-serif'}}>
      <header style={{maxWidth:1024,margin:'0 auto 16px',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{fontSize:'2.3rem',lineHeight:1,display:'block'}}>🎡</span>
          <h1 className="app-title" style={{margin:0}}>Ruleta de Datos</h1>
        </div>
        <div style={{fontSize:14,opacity:.85}}>
          {user ? (
            <>Conectado como <b>{user.email}</b> ·
              <button
                onClick={salir}
                style={{
                  background: 'linear-gradient(90deg, var(--brand), var(--brand-2))',
                  color: '#08211f',
                  border: '1px solid var(--stroke)',
                  borderRadius: 8,
                  padding: '4px 8px',
                  fontSize: 16,
                  display: 'inline-flex',
                  alignItems: 'center',
                  boxShadow: '0 8px 20px rgba(0,0,0,.18)',
                  cursor: 'pointer',
                  marginLeft: 8
                }}
                title="Salir"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:2}}>
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </>
          ) : (
            <div style={{display:'flex',alignItems:'center',gap:10}}>
              <span style={{fontWeight:700,letterSpacing:0.5,fontSize:15,display:'inline-block'}}>ACTIVIDAD GOOGLE ANALYTICS</span>
              <a href="https://campusvirtual.colombia.unir.net/my/" target="_blank" rel="noopener noreferrer">
                <img src={unirLogo} alt="UNIR" style={{height:32,marginLeft:6,borderRadius:8,verticalAlign:'middle',cursor:'pointer'}} />
              </a>
            </div>
          )}
        </div>
      </header>

      <main style={{maxWidth:1200,margin:'0 auto'}}>
        {!user && (
          isMobile
          ? (
            <div style={{display:'grid',gap:12}}>
              <AuthPanel auth={auth} db={db} onReady={()=>{}} />
              <button
                onClick={()=>setShowLbModal(true)}
                className="btn"
                style={{border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', borderRadius:10, padding:'10px 14px'}}
              >
                Ver Top 10
              </button>

              <Modal open={showLbModal} title="Top 10 jugadores" onClose={()=>setShowLbModal(false)}>
                <Leaderboard db={db} />
              </Modal>
            </div>
          )
          : (
            <div className="auth-shell">
              <aside className="auth-art" style={{display:'flex',flexDirection:'column',height:'100%'}}>
                <Logo />
                <div className="top10-pane" style={{flex:1,display:'flex',flexDirection:'column',/* quita marginTop:24 */ background:'rgba(30,32,60,0.55)',border:'1px solid var(--stroke)',borderRadius:'16px',boxShadow:'0 4px 24px #0003',padding:'18px 10px',minHeight:0}}>
                  <h2 style={{color:'#fff',textAlign:'center',fontWeight:800,letterSpacing:0.5,margin:'0 0 12px 0',fontSize:22}}>Top 10 jugadores</h2>
                  <div style={{flex:1,display:'flex',flexDirection:'column',minHeight:0}}>
                    <Leaderboard db={db} />
                  </div>
                </div>
              </aside>
              <main className="auth-main">
                <AuthPanel auth={auth} db={db} onReady={()=>{}} />
              </main>
            </div>
          )
        )}

        {user && profileReady && (
          isMobile
          ? (
            <>
              <div style={{border:'1px solid #222',borderRadius:12,padding:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <b>Actividad</b>
                  <div style={{display:'flex',gap:8}}>
                    <button
                      className="btn btn-sm"
                      onClick={()=>setShowLbModal(true)}
                      style={{border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', padding:'4px 10px', borderRadius:8}}
                    >
                      Top 10
                    </button>
                    {profileError && (
                      <div style={{background:'#332b00',border:'1px solid #665500',borderRadius:8,padding:6,fontSize:12,marginLeft:8}}>
                        {profileError}
                      </div>
                    )}
                  </div>
                </div>

                <Wheel onResult={onSpinResult} />

                {lastResult && (
                  <div style={{marginTop:12, padding:10, border:'1px dashed #3f3f46', borderRadius:10}}>
                    Último resultado: <b>{lastResult.label}</b> · Puntos: <b>{lastResult.points}</b>
                  </div>
                )}
              </div>

              <Modal open={showLbModal} title="Top 10 jugadores" onClose={()=>setShowLbModal(false)}>
                <Leaderboard db={db} />
              </Modal>
            </>
          )
          : (
            <div className="grid-main">
              <div style={{border:'1px solid #222',borderRadius:12,padding:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <b>Actividad</b>
                  {profileError && <div style={{background:'#332b00',border:'1px solid #665500',borderRadius:8,padding:8,marginBottom:8,fontSize:12,marginLeft:8}}>{profileError}</div>}
                </div>

                <Wheel onResult={onSpinResult} />

                {lastResult && (
                  <div style={{marginTop:12, padding:10, border:'1px dashed #3f3f46', borderRadius:10}}>
                    Último resultado: <b>{lastResult.label}</b> · Puntos: <b>{lastResult.points}</b>
                  </div>
                )}
              </div>

              <Leaderboard db={db} />
            </div>
          )
        )}
      </main>
    </div>
  )
}
