import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { showErrorSwal } from '../swal'
import { getFirebaseErrorMsg } from '../firebaseErrorMap'
import { isInAppBrowser } from '../utils/inAppBrowser'

const googleProvider = new GoogleAuthProvider()
// Evitar múltiples llamadas simultáneas
let googleLoginInFlight = false

export async function loginWithGoogle(auth) {
  try {
  if (googleLoginInFlight) return
  googleLoginInFlight = true
  const host = (typeof window !== 'undefined' && window.location.hostname) || ''
  const isLocal = ['localhost','127.0.0.1','::1'].includes(host)
  // Siempre redirect fuera de localhost para evitar warnings COOP (Chrome) de window.closed en popups
  // y para minimizar bloqueos de terceros / ITP en Safari / WebViews.
  const forceRedirect = !isLocal
    // En navegadores in-app o producción => redirect.
  if (isInAppBrowser() || forceRedirect) {
      try { sessionStorage.setItem('wantSplashLogin','1') } catch { /* ignore */ }
      await signInWithRedirect(auth, googleProvider)
      return
    }
    // Solo modo dev local intenta popup (más cómodo durante desarrollo)
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
