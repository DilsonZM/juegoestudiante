import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from 'firebase/auth'
import { showErrorSwal } from '../swal'
import { getFirebaseErrorMsg } from '../firebaseErrorMap'

const googleProvider = new GoogleAuthProvider()

export async function loginWithGoogle(auth) {
  try {
    await signInWithPopup(auth, googleProvider)
  } catch (e) {
    if (
      e.code === 'auth/popup-blocked' ||
      e.code === 'auth/cancelled-popup-request' ||
      e.code === 'auth/operation-not-supported-in-this-environment'
    ) {
      await signInWithRedirect(auth, googleProvider)
    } else {
      showErrorSwal(getFirebaseErrorMsg(e))
    }
  }
}
