import { useMemo } from 'react'
import { getFirebaseAuth, getFirebaseDb, initFirebaseApp } from '../services/firebase'

export function useFirebase() {
  // Memoizamos para evitar recrear instancias
  const app = useMemo(() => initFirebaseApp(), [])
  const auth = useMemo(() => getFirebaseAuth(), [])
  const db = useMemo(() => getFirebaseDb(), [])
  return { app, auth, db }
}
