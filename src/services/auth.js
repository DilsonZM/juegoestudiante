import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { showErrorSwal } from '../swal'
import { getFirebaseErrorMsg } from '../firebaseErrorMap'
import { isInAppBrowser } from '../utils/inAppBrowser'

const googleProvider = new GoogleAuthProvider()

export async function loginWithGoogle(auth) {
  try {
    // En navegadores in-app (LinkedIn, Instagram, etc.), forzar redirect.
    if (isInAppBrowser()) {
      try { sessionStorage.setItem('wantSplashLogin','1') } catch { /* ignore */ }
      await signInWithRedirect(auth, googleProvider)
      return
    }
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
}
