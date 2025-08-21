import {
  collection,
  addDoc,
  serverTimestamp,
  runTransaction,
  doc,
  getDocs,
  query,
  orderBy,
  limit,
  getCountFromServer,
  where,
  onSnapshot,
} from 'firebase/firestore'

export async function submitSpinAndAccumulate(db, uid, displayName, result) {
  const spinsCol = collection(db, 'spins')
  const statsRef = doc(db, 'userstats', uid)
  await addDoc(spinsCol, { uid, ...result, createdAt: serverTimestamp() })
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(statsRef)
    const prev = snap.exists() ? snap.data() : { totalScore: 0, totalSpins: 0, displayName: displayName || 'Anónimo' }
    const next = {
      displayName: displayName || prev.displayName || 'Anónimo',
      totalScore: (prev.totalScore || 0) + (result.points || 0),
      totalSpins: (prev.totalSpins || 0) + 1,
      updatedAt: serverTimestamp(),
    }
    tx.set(statsRef, next, { merge: true })
  })
}

export async function fetchLeaderboard(db) {
  const qTop = query(collection(db, 'userstats'), orderBy('totalScore', 'desc'), limit(10))
  const snap = await getDocs(qTop)
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }))
}

export async function fetchUserRankByScore(db, score) {
  const qCount = query(collection(db, 'userstats'), where('totalScore', '>', score || 0))
  const agg = await getCountFromServer(qCount)
  return (agg.data().count || 0) + 1
}

export function subscribeLeaderboard(db, onData, onError) {
  const qTop = query(collection(db, 'userstats'), orderBy('totalScore', 'desc'), limit(10))
  const unsub = onSnapshot(qTop, (snap) => {
    const rows = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
    onData?.(rows)
  }, (err) => {
    console.error('Top10 realtime error:', err)
    onError?.(err)
  })
  return unsub
}

export function subscribeUserRankByScore(db, score, onData, onError) {
  // Suscribirse a todos con score mayor al del usuario y derivar el rank como count+1
  const q = query(collection(db, 'userstats'), where('totalScore', '>', score || 0))
  const unsub = onSnapshot(q, (snap) => {
    const rank = (snap.size || 0) + 1
    onData?.(rank)
  }, (err) => {
    console.error('User rank realtime error:', err)
    onError?.(err)
  })
  return unsub
}
