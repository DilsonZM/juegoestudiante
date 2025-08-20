import { addDoc, collection, serverTimestamp, runTransaction, doc } from 'firebase/firestore'

export async function persistQuizOutcome(db, uid, displayName, spinResult, question, isCorrect) {
  // Guarda el evento del quiz por trazabilidad (best-effort)
  try {
    const col = collection(db, 'quizEvents')
    await addDoc(col, {
      uid,
      category: spinResult.label,
      points: spinResult.points,
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
  const delta = isCorrect ? spinResult.points : -spinResult.points

  await addDoc(spinsCol, {
    uid,
    label: `${spinResult.label}${isCorrect ? '' : ' (fallo)'}`,
    points: delta,
    createdAt: serverTimestamp(),
  })

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
}
