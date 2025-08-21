import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { showErrorSwal } from '../swal'
import { getFirebaseErrorMsg } from '../firebaseErrorMap'

const googleProvider = new GoogleAuthProvider()
// Evitar múltiples llamadas simultáneas
let googleLoginInFlight = false
// Config clásico: pedir email y perfil básico (scope por defecto). Se puede forzar select_account.
googleProvider.setCustomParameters?.({ prompt: 'select_account' })

export async function loginWithGoogle(auth) {
  try {
  if (googleLoginInFlight) return
  googleLoginInFlight = true
  // Estrategia nativa estándar: intentar popup primero; si es bloqueado => fallback redirect.
  // Esto evita loops de redirect en algunos contextos y mantiene UX "de fábrica".
  await signInWithPopup(auth, googleProvider)
  } catch (e) {
    if (
      e.code === 'auth/popup-blocked' ||
      e.code === 'auth/cancelled-popup-request' ||
      e.code === 'auth/operation-not-supported-in-this-environment'
    ) {
      try { sessionStorage.setItem('wantSplashLogin','1') } catch { /* ignore */ }
      await signInWithRedirect(auth, googleProvider)
    } else {
  // Si el navegador bloquea cookies de terceros o popups, informar y sugerir abrir en el navegador del sistema
  const msg = getFirebaseErrorMsg(e)
  showErrorSwal(msg + '\nSi el problema persiste, intenta abrir el juego en tu navegador predeterminado (Chrome/Safari).')
    }
  }
  finally {
    googleLoginInFlight = false
  }
}
