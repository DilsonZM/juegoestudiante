import React, { useCallback, useEffect, useRef, useState } from 'react'
import { onAuthStateChanged, signOut, getRedirectResult } from 'firebase/auth'
import { doc, setDoc, getDoc, serverTimestamp, onSnapshot } from 'firebase/firestore'
import { useFirebase } from './hooks/useFirebase'
import { useIsMobile } from './hooks/useIsMobile'
import { submitSpinAndAccumulate } from './services/firestore'
import QuestionModal from './components/QuestionModal'
import { getRandomQuestion } from './questions/bank'
import { persistQuizOutcome } from './services/gameplay'
import './index.css'
import unirLogo from './assets/unir.png'
import Modal from './components/Modal'
import Logo from './components/Logo'
import Wheel from './components/Wheel'
import Leaderboard from './components/Leaderboard'
import AuthPanel from './components/AuthPanel'
import AnswerFeedback from './components/AnswerFeedback'
import Splash from './components/Splash'

// (componentes inline eliminados; ahora se importan desde ./components)

/* ====== APP ====== */
export default function App(){
  const { auth, db } = useFirebase()
  const isMobile = useIsMobile(900)
  const [user,setUser] = useState(null)
  const [profileReady,setProfileReady] = useState(false)
  const [profileError,setProfileError] = useState(null)
  const [lastResult,setLastResult] = useState(null)
  const [showLbModal, setShowLbModal] = useState(false)
  const [myStats, setMyStats] = useState(null)
  const [quizOpen, setQuizOpen] = useState(false)
  const [quizQuestion, setQuizQuestion] = useState(null)
  const [pendingSpin, setPendingSpin] = useState(null)
  const [usedQuestionIds, setUsedQuestionIds] = useState(new Set())
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackOk, setFeedbackOk] = useState(false)
  const [feedbackExplain, setFeedbackExplain] = useState('')
  const [showSplash, setShowSplash] = useState(true)
  const [splashMsg, setSplashMsg] = useState({ title: 'Bienvenidos', sub: 'al juego de la Ruleta de Datos' })
  const [splashClickThrough, setSplashClickThrough] = useState(false)
  const splashTimerRef = useRef(null)
  const splashIdRef = useRef(0)

  const showSplashFor = useCallback((ms, title, sub, clickThrough = false) => {
    // Cancela timer previo y genera un id; solo el último id puede ocultar el splash
    if (splashTimerRef.current) { clearTimeout(splashTimerRef.current); splashTimerRef.current = null }
    const myId = (splashIdRef.current = (splashIdRef.current + 1) % Number.MAX_SAFE_INTEGER)
    if (title || sub) setSplashMsg({ title: title ?? splashMsg.title, sub: sub ?? splashMsg.sub })
    setSplashClickThrough(!!clickThrough)
    setShowSplash(true)
    splashTimerRef.current = setTimeout(() => {
      if (splashIdRef.current === myId) {
        setShowSplash(false)
        setSplashClickThrough(false)
      }
      splashTimerRef.current = null
    }, ms)
  }, [splashMsg.title, splashMsg.sub])

  useEffect(() => {
    // Splash inicial (~2.5s) usando el controlador centralizado
    showSplashFor(2500)
    return () => { if (splashTimerRef.current) { clearTimeout(splashTimerRef.current); splashTimerRef.current = null } }
  }, [showSplashFor])

  // Google redirect result (solo si el flag indica que venimos de Google)
  useEffect(() => {
    try {
      const want = sessionStorage.getItem('wantSplashLogin')
      if (!want) return
      getRedirectResult(auth).then((res) => {
        if (res && res.user) {
          showSplashFor(3000, 'Cargando…', 'Preparando tu juego')
        }
      }).catch((e) => {
        if (e) console.error('Google redirect error:', e)
      })
    } catch { /* ignore */ }
  }, [auth, showSplashFor])

  // Sesión + perfil mínimo
  useEffect(()=> onAuthStateChanged(auth, async (u)=>{
    setUser(u)
    if(!u){ setProfileReady(false); setMyStats(null); return }
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
      // Si se inició un flujo de auth (login/registro/google), mantener/mostrar splash y cerrarlo luego de 3s
      try {
        if (sessionStorage.getItem('wantSplashLogin')) {
          showSplashFor(3000, 'Cargando…', 'Preparando tu juego')
          try { sessionStorage.removeItem('wantSplashLogin') } catch { /* ignore */ }
        }
      } catch { /* ignore */ }
      // Splash si venimos de login con Google (popup o redirect)
      try {
        if (sessionStorage.getItem('wantSplashLogin')) {
          setSplashMsg({ title: 'Cargando…', sub: 'Preparando tu juego' })
          setShowSplash(true)
          setTimeout(() => {
            setShowSplash(false)
            try { sessionStorage.removeItem('wantSplashLogin') } catch { /* ignore */ }
          }, 3000)
        }
      } catch { /* ignore */ }
    }catch(err){
      console.error('Perfil/Firestore no disponible:', err)
      setProfileError('⚠️ Error conectando con Firestore. Se podrá girar, pero no se guardarán resultados.')
      setProfileReady(true)
    }
  }), [auth, db, showSplashFor])

  // Suscripción a tu doc de puntuación
  useEffect(() => {
    if (!user) return undefined
    const ref = doc(db, 'userstats', user.uid)
    const unsub = onSnapshot(ref, (snap) => {
      setMyStats(snap.exists() ? snap.data() : null)
    }, (err) => console.error('myStats error:', err))
    return () => unsub()
  }, [db, user])

  const onSpinResult = useCallback(async (res)=>{
    setLastResult(res)
    // Abrir pregunta basada en la categoría de la ruleta
  const q = getRandomQuestion(res.label, usedQuestionIds)
    if (q && user) {
      setPendingSpin(res)
      setQuizQuestion(q)
      setQuizOpen(true)
    } else if (user && !profileError) {
      // Fallback: si no hay pregunta, sumar directo como antes
      await submitSpinAndAccumulate(db, user.uid, user.displayName || user.email, { label: res.label, points: res.points })
      window.dispatchEvent(new Event('reload-top10'))
    }
  }, [db, user, profileError, usedQuestionIds])

  const handleQuizAnswer = useCallback(async (answer) => {
    if (!quizQuestion || !pendingSpin || !user) { setQuizOpen(false); return }
    const wasTimeout = typeof answer === 'object' && answer?.timeout
    const normalized = quizQuestion.type === 'tf' ? Boolean(answer) : String(answer).toLowerCase()
    const correctAnswer = quizQuestion.type === 'tf' ? Boolean(quizQuestion.answer) : String(quizQuestion.answer).toLowerCase()
    const isCorrect = !wasTimeout && (normalized === correctAnswer)
    try {
      await persistQuizOutcome(db, user.uid, user.displayName || user.email, pendingSpin, quizQuestion, isCorrect)
      window.dispatchEvent(new Event('reload-top10'))
  // Feedback visual
  setFeedbackOk(isCorrect)
  setFeedbackExplain(isCorrect ? '' : (quizQuestion.explain || ''))
  setShowFeedback(true)
      setQuizOpen(false)
      setQuizQuestion(null)
      setPendingSpin(null)
      // Refrescar myStats de forma optimista
      setMyStats((prev)=>{
        const delta = isCorrect ? pendingSpin.points : -pendingSpin.points
        return prev ? { ...prev, totalScore: (prev.totalScore||0) + delta, totalSpins: (prev.totalSpins||0)+1 } : prev
      })
      setUsedQuestionIds(prev => new Set(prev).add(quizQuestion.id))
    } catch (e) {
      console.error('persistQuizOutcome failed', e)
      setQuizOpen(false)
      setQuizQuestion(null)
      setPendingSpin(null)
    }
  }, [db, user, quizQuestion, pendingSpin])

  const salir = async ()=>{
    showSplashFor(2500, '¡Gracias!', 'por participar en la actividad de Gobierno del Dato')
    try{ await signOut(auth) } catch(e){ console.error(e) }
  }

  return (
    <div style={{minHeight:'100vh',background:'#0b0b0b',color:'#eaeaea',padding:16,fontFamily:'system-ui, sans-serif'}}>
  {showSplash && <Splash title={splashMsg.title} sub={splashMsg.sub} clickThrough={splashClickThrough} />}
      <header className="app-header">
        <div className="brand-title">
          <span className="app-emoji" aria-hidden>🎡</span>
          <h1 className="app-title">Ruleta de Datos</h1>
        </div>

        {user ? (
          <div className="user-strip">
            <span className="user-label">Conectado como</span>
            <b className="user-email">{user.email}</b>
            <button
              onClick={salir}
              className="logout-icon"
              title="Salir"
              aria-label="Salir"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/>
                <line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        ) : (
          <div className="ga-strip">
            <span className="ga-title">ACTIVIDAD GOOGLE ANALYTICS</span>
            <a href="https://campusvirtual.colombia.unir.net/my/" target="_blank" rel="noopener noreferrer" className="ga-badge">
              <img src={unirLogo} alt="UNIR" />
            </a>
          </div>
        )}
      </header>

      <main style={{maxWidth:1200,margin:'0 auto'}}>
        {!user && (
          isMobile
          ? (
            <div style={{display:'grid',gap:12}}>
        <AuthPanel
                auth={auth}
                db={db}
                onStartAuth={()=>{
          showSplashFor(3000, 'Cargando…', 'Preparando tu juego')
                }}
                onReady={()=>{
                  // El cierre del splash se maneja al completar la sesión en onAuthStateChanged
                }}
              />
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
                <div style={{flex:1,display:'flex',flexDirection:'column',marginTop:24,background:'rgba(30,32,60,0.55)',border:'1px solid var(--stroke)',borderRadius:'16px',boxShadow:'0 4px 24px #0003',padding:'18px 10px',minHeight:0}}>
                  <h2 style={{color:'#fff',textAlign:'center',fontWeight:800,letterSpacing:0.3,margin:'0 0 12px 0',fontSize:22}}>Top 10 jugadores</h2>
                  <div style={{flex:1,display:'flex',flexDirection:'column',minHeight:0}}>
                    <Leaderboard db={db} />
                  </div>
                </div>
              </aside>
              <main className="auth-main">
        <AuthPanel
                  auth={auth}
                  db={db}
                  onStartAuth={()=>{
          showSplashFor(3000, 'Cargando…', 'Preparando tu juego')
                  }}
                  onReady={()=>{
                    // cierre del splash via onAuthStateChanged
                  }}
                />
              </main>
            </div>
          )
        )}

        {user && profileReady && (
          isMobile
          ? (
            <>
              <div style={{border:'1px solid #222',borderRadius:12,padding:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8,flexWrap:'wrap',rowGap:6}}>
                  <b>Gobierno del dato</b>
                  <div style={{display:'flex',alignItems:'center',gap:10}}>
                    <span style={{fontSize:14,opacity:.9}}>Puntaje: <b>{myStats?.totalScore ?? 0}</b></span>
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

                <Wheel
                  onResult={onSpinResult}
                  disabled={quizOpen}
                  onBeforeFirstSpin={async ()=>{
                    showSplashFor(3000, '¡A jugar!', 'Que te diviertas 🎉', true)
                  }}
                />

                {lastResult && (
                  <div style={{marginTop:12, padding:10, border:'1px dashed #3f3f46', borderRadius:10}}>
                    Último resultado: <b>{lastResult.label}</b> · Puntos: <b>{lastResult.points}</b>
                  </div>
                )}
              </div>

              <Modal open={showLbModal} title="Top 10 jugadores" onClose={()=>setShowLbModal(false)}>
                <Leaderboard db={db} currentUser={user} myStats={myStats} />
              </Modal>

              <QuestionModal
                open={quizOpen}
                onClose={()=>setQuizOpen(false)}
                question={quizQuestion}
                points={pendingSpin?.points}
                category={pendingSpin?.label}
                onAnswer={handleQuizAnswer}
              />
            </>
          )
          : (
            <div className="grid-main">
              <div style={{border:'1px solid #222',borderRadius:12,padding:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                  <b>Gobierno del dato</b>
                  {profileError && <div style={{background:'#332b00',border:'1px solid #665500',borderRadius:8,padding:8,marginBottom:8,fontSize:12,marginLeft:8}}>{profileError}</div>}
                </div>

                <Wheel
                  onResult={onSpinResult}
                  disabled={quizOpen}
                  onBeforeFirstSpin={async ()=>{
                    showSplashFor(3000, '¡A jugar!', 'Que te diviertas 🎉', true)
                  }}
                />

                {lastResult && (
                  <div style={{marginTop:12, padding:10, border:'1px dashed #3f3f46', borderRadius:10}}>
                    Último resultado: <b>{lastResult.label}</b> · Puntos: <b>{lastResult.points}</b>
                  </div>
                )}
              </div>

              {/* Derecha: Top10; si no estás en top, aparece tu fila con posición global */}
              <Leaderboard db={db} currentUser={user} myStats={myStats} />

              <QuestionModal
                open={quizOpen}
                onClose={()=>setQuizOpen(false)}
                question={quizQuestion}
                points={pendingSpin?.points}
                category={pendingSpin?.label}
                onAnswer={handleQuizAnswer}
              />
            </div>
          )
        )}
        <AnswerFeedback
          open={showFeedback}
          correct={feedbackOk}
          explain={feedbackExplain}
          onClose={()=>setShowFeedback(false)}
          durationMs={feedbackOk ? 2000 : 10000}
          dismissable={!feedbackOk}
          pointsDelta={lastResult?.points || 0}
        />
      </main>
    </div>
  )
}




