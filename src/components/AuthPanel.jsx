import React, { useCallback, useEffect, useMemo, useState } from 'react'
import Swal from 'sweetalert2'
import { createUserWithEmailAndPassword, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, serverTimestamp, setDoc } from 'firebase/firestore'
import { loginWithGoogle } from '../services/auth'
import { getFirebaseErrorMsg } from '../firebaseErrorMap'
import { showErrorSwal } from '../swal'
import { getInAppBrowserInfo } from '../utils/inAppBrowser'

export default function AuthPanel({ auth, db, onReady, onStartAuth }) {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [displayName, setDisplayName] = useState('')
  const [gender, setGender] = useState('X')
  const [city, setCity] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPwd, setShowPwd] = useState(false)
  const inAppInfo = useMemo(() => getInAppBrowserInfo(), [])

  const openInExternal = useCallback(async () => {
    const { isAndroid, isIOS, label } = inAppInfo
    const cleanUrl = window.location.href.split('#')[0]
    const prot = window.location.protocol.replace(':','') || 'https'
    try {
      // Toast informativo breve
      await Swal.fire({
        toast: true,
        position: 'bottom',
        timer: 1800,
        showConfirmButton: false,
        icon: 'info',
        title: 'Saliendo al navegador…'
      })
    } catch (e) { void e }
    try {
      if (isAndroid) {
        const intentUrl = `intent://${window.location.host}${window.location.pathname}${window.location.search}#Intent;scheme=${prot};package=com.android.chrome;S.browser_fallback_url=${encodeURIComponent(cleanUrl)};end`
        // Copia el enlace primero para que el usuario pueda pegarlo en Chrome si el intento es bloqueado
        try { await navigator.clipboard.writeText(cleanUrl) } catch (e) { void e }
        // Programa un fallback: si seguimos visibles después de intentar abrir intent://, muestra instrucciones
        setTimeout(() => {
          if (document.visibilityState === 'visible') {
            Swal.fire({
              icon: 'info',
              title: 'No se pudo abrir automáticamente',
              html: `<div style="text-align:left">`+
                    `<p>LinkedIn puede bloquear la salida directa.</p>`+
                    `<p>El enlace ya fue <b>copiado</b>. Abre <b>Chrome</b> y pégalo en la barra de direcciones.</p>`+
                    `<p>O toca el menú (⋯) y elige <b>"Abrir en navegador"</b>.</p>`+
                    `</div>`,
              confirmButtonText: 'Entendido',
              confirmButtonColor: '#1dd1c6',
              background: '#131a3a',
              color: '#e8ecf4'
            })
          }
        }, 1200)
        // Intento con intent://
        // Crear un enlace y hacer click programático puede funcionar mejor que location.href
        const a = document.createElement('a')
        a.href = intentUrl
        document.body.appendChild(a)
        a.click()
        a.remove()
        return
      } else if (isIOS) {
        const chromeUrl = cleanUrl.replace(/^https?:\/\//, 'googlechrome://')
        window.location.href = chromeUrl
        return
      } else {
        window.open(cleanUrl, '_blank', 'noopener,noreferrer')
        return
      }
    } catch (err) {
      console.warn('Abrir externo falló', err)
    }
    // Fallback de instrucciones
    Swal.fire({
      icon: 'info',
      title: 'Abrir en navegador',
      html: `<div style="text-align:left">`+
            `<p>Estás dentro de ${label || 'un navegador embebido'}.</p>`+
            `<p>Para continuar con Google:</p>`+
            `<ol style="padding-left:18px;line-height:1.4">`+
            `<li>Toca el menú (⋯) o el ícono de compartir.</li>`+
            `<li>Elige <b>"Abrir en navegador"</b> o <b>"Abrir en Chrome/Safari"</b>.</li>`+
            `</ol>`+
            `<p>O pulsa <b>Copiar enlace</b> y pégalo en tu navegador.</p>`+
            `</div>`,
      confirmButtonText: 'Entendido',
      confirmButtonColor: '#1dd1c6',
      background: '#131a3a',
      color: '#e8ecf4'
    })
  }, [inAppInfo])

  useEffect(() => {
    // Mostrar prompt automático una sola vez si detectamos in-app (LinkedIn, etc.)
    if (!inAppInfo.isInApp) return
    try {
      if (sessionStorage.getItem('inAppWarned')) return
      sessionStorage.setItem('inAppWarned', '1')
  } catch (e) { void e }
    Swal.fire({
      icon: 'warning',
      title: 'Estás en un navegador embebido',
      text: 'Para iniciar sesión con Google, es mejor abrir este juego en tu navegador (Chrome/Safari).',
      showDenyButton: true,
      confirmButtonText: 'Abrir en navegador',
      denyButtonText: 'Seguir aquí',
      confirmButtonColor: '#1dd1c6',
      background: '#131a3a',
      color: '#e8ecf4'
    }).then(res => {
      if (res.isConfirmed) openInExternal()
    })
  }, [inAppInfo, openInExternal])

  const saveProfile = useCallback(async (uid, profile) => {
    await setDoc(doc(db, 'users', uid), { ...profile, createdAt: serverTimestamp() }, { merge: true })
  }, [db])

  const doRegister = async () => {
    setLoading(true); setError('')
    try {
  try { sessionStorage.setItem('wantSplashLogin','1') } catch { /* ignore */ }
  onStartAuth?.()
      const name = (displayName || '').trim()
      if (!name) {
        await Swal.fire({
          icon: 'warning',
          title: 'Falta tu nombre',
          text: 'Por favor escribe tu primer nombre antes de registrarte.',
          confirmButtonColor: '#1dd1c6',
          background: '#131a3a',
          color: '#e8ecf4'
        })
        return
      }
      const cred = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(cred.user, { displayName: name })
      await saveProfile(cred.user.uid, { displayName: name, gender, city })
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
  try { sessionStorage.setItem('wantSplashLogin','1') } catch { /* ignore */ }
  onStartAuth?.()
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

      {inAppInfo.isInApp && (
        <div className="alert" role="status" style={{ marginTop: 10, background:'#2c1f00', border:'1px solid #6b4e00', color:'#f3e8c3' }}>
          <b>Estás dentro de {inAppInfo.label || 'un navegador embebido'}.</b>
          <div style={{ marginTop: 6, fontSize: 13, opacity: .95 }}>
            Para iniciar con Google, abre este juego en tu navegador (Chrome/Safari) y vuelve a intentar.
          </div>
          <div style={{ display:'flex', gap:8, marginTop:8, flexWrap:'wrap' }}>
            <button
              type="button"
              className="btn"
              onClick={openInExternal}
              style={{ border:'1px solid #3f3f46', background:'#18181b', color:'#fafafa', borderRadius:10, padding:'8px 10px' }}
            >Abrir en navegador</button>
            {inAppInfo.isInApp && (
              <a
                href={typeof window!=='undefined' ? window.location.href.split('#')[0] : '#'}
                style={{ fontSize:12, color:'#fbbf24', marginLeft:8 }}
              >Enlace directo</a>
            )}
            <button
              type="button"
              className="btn"
              onClick={async () => {
                try {
                  await navigator.clipboard.writeText(window.location.href)
                  await Swal.fire({
                    toast: true,
                    position: 'bottom',
                    timer: 1800,
                    showConfirmButton: false,
                    icon: 'success',
                    title: 'Enlace copiado. Pégalo en tu navegador.'
                  })
                } catch (err) {
                  console.warn('No se pudo copiar enlace al portapapeles', err)
                }
              }}
              style={{ border:'1px solid #3f3f46', background:'#0f152d', color:'#e8ecf4', borderRadius:10, padding:'8px 10px' }}
            >Copiar enlace</button>
          </div>
        </div>
      )}

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
        onSubmit={(e) => {
          e.preventDefault()
          const form = e.currentTarget
          if (!form.checkValidity()) {
            form.reportValidity()
            return
          }
          action()
        }}
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
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  rowGap: 6,
                  flexWrap: 'wrap',
                  background: 'rgba(255,255,255,.08)',
                  borderRadius: 12,
                  padding: '4px 6px',
                  border: '1px solid var(--stroke)',
                  alignItems: 'center',
                  marginTop: 2
                }}
              >
                {['M','F','X'].map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={()=>setGender(g)}
                    style={{
                      background: gender===g ? 'linear-gradient(90deg, var(--brand), var(--brand-2))' : 'transparent',
                      color: gender===g ? '#08211f' : 'var(--text)',
                      border: 'none',
                      borderRadius: 8,
                      padding: '6px 10px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      boxShadow: gender===g ? '0 4px 12px rgba(0,0,0,.10)' : 'none',
                      fontSize: 14,
                      lineHeight: 1.2,
                      whiteSpace: 'normal',
                      minWidth: 0,
                      flex: '1 1 120px'
                    }}
                  >
                    {g === 'M' ? 'Masculino' : g === 'F' ? 'Femenino' : 'Prefiero no decir'}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}

        <button className="btn" disabled={loading}>
          {loading ? 'Procesando…' : mode === 'login' ? 'Ingresar' : mode === 'register' ? 'Crear cuenta' : 'Enviar correo'}
        </button>

    {mode === 'login' && (
          <button
            type="button"
            onClick={() => { try{ sessionStorage.setItem('wantSplashLogin','1') } catch { /* ignore */ } loginWithGoogle(auth) }}
            style={{
              marginTop: 10,
              width:'100%', height:46,
              borderRadius:12, border:'1px solid var(--stroke)',
              background:'#0f152d', color:'#e8ecf4',
              fontWeight:800, letterSpacing: 0.3, cursor:'pointer',
              display:'flex', alignItems:'center', justifyContent:'center', gap:8
            }}
            aria-label="Continuar con Google"
          >
            <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
              <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12 s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C33.03,6.053,28.715,4,24,4C12.955,4,4,12.955,4,24 s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"/>
              <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,16.146,18.961,14,24,14c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657 C33.03,6.053,28.715,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"/>
              <path fill="#4CAF50" d="M24,44c4.646,0,8.902-1.785,12.102-4.689l-5.586-4.727C28.471,36.977,26.345,38,24,38 c-5.202,0-9.607-3.317-11.264-7.946l-6.493,5.013C9.556,39.556,16.227,44,24,44z"/>
              <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.236-2.231,4.166-4.187,5.584l0.003-0.002l5.586,4.727 C35.971,38.495,44,32,44,24C44,22.659,43.862,21.35,43.611,20.083z"/>
            </svg>
            Continuar con Google
          </button>
        )}

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
