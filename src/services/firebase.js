// Inicialización de Firebase con variables de entorno de Vite y fallback
import { initializeApp, getApps } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

function getFirebaseConfig() {
  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyDH1Hkp68MR3-o-s_J_LbaEPnUcTVFuZHQ',
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'actgobiernodatos.firebaseapp.com',
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'actgobiernodatos',
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'actgobiernodatos.appspot.com',
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '320299764635',
    appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:320299764635:web:1e2a033995c8485ef62f3e',
  }
}

export function initFirebaseApp() {
  const apps = getApps()
  return apps.length ? apps[0] : initializeApp(getFirebaseConfig())
}

export function getFirebaseAuth() {
  const app = initFirebaseApp()
  return getAuth(app)
}

export function getFirebaseDb() {
  const app = initFirebaseApp()
  return getFirestore(app)
}
