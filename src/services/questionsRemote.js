import { collection, getDocs, query, where } from 'firebase/firestore'

// Estructura esperada en Firestore (colección 'questions'):
// { id, category: 'Calidad' | 'Seguridad' | ..., type: 'tf'|'short', text: '...', answer: true|false|string, enabled: true }
export async function fetchQuestionsByCategory(db, category) {
  const col = collection(db, 'questions')
  const q = query(col, where('enabled', '==', true), where('category', '==', category))
  const snap = await getDocs(q)
  return snap.docs.map(d => ({ id: d.id, ...d.data() }))
}
