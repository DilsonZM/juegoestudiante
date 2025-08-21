import { addDoc, collection, serverTimestamp, runTransaction, doc } from 'firebase/firestore'

export async function persistQuizOutcome(db, uid, displayName, spinResult, question, isCorrect) {
  if (!db) { console.warn('persistQuizOutcome: db no definido'); return }
  if (!uid) { console.warn('persistQuizOutcome: uid vacío'); return }
  if (!spinResult) { console.warn('persistQuizOutcome: spinResult null'); return }
  const safePoints = Number.isFinite(spinResult.points) ? spinResult.points : 0
  // Guarda el evento del quiz por trazabilidad (best-effort)
  try {
    const col = collection(db, 'quizEvents')
    await addDoc(col, {
      uid,
      category: spinResult.label,
      points: safePoints,
      questionId: question?.id || null,
      correct: !!isCorrect,
      createdAt: serverTimestamp(),
    })
  } catch (e) {
    // No bloquear puntuación si no se puede escribir en quizEvents
    console.warn('quizEvents not persisted:', e?.message || e)
  }

  // Actualiza el acumulado y registra un spin con puntos ajustados
  const statsRef = doc(db, 'userstats', uid)
  const spinsCol = collection(db, 'spins')
  const deltaBase = safePoints
  const delta = isCorrect ? deltaBase : -deltaBase

  try {
    await addDoc(spinsCol, {
      uid,
      label: `${spinResult.label}${isCorrect ? '' : ' (fallo)'}`,
      points: delta,
      createdAt: serverTimestamp(),
    })
  } catch(e) {
    console.error('addDoc spins error:', e?.code, e?.message)
  }

  try {
    await runTransaction(db, async (tx) => {
      const snap = await tx.get(statsRef)
      const prev = snap.exists() ? snap.data() : { totalScore: 0, totalSpins: 0, displayName: displayName || 'Anónimo' }
      const next = {
        displayName: displayName || prev.displayName || 'Anónimo',
        totalScore: (prev.totalScore || 0) + delta,
        totalSpins: (prev.totalSpins || 0) + 1,
        updatedAt: serverTimestamp(),
      }
      tx.set(statsRef, next, { merge: true })
    })
  } catch(e){
    console.error('runTransaction stats error:', e?.code, e?.message)
  }
}
