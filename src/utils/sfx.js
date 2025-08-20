// Utilidades de sonido (WebAudio) y vibración (Vibration API)
let audioCtx

function ensureAudio() {
  if (typeof window === 'undefined') return null
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    // Si el contexto está suspendido (política de autoplay), intenta reanudar en la primera interacción
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume().catch(() => {})
    }
  } catch { /* ignore */ }
  return audioCtx
}

export function vibrate(pattern) {
  try {
    if (navigator?.vibrate) navigator.vibrate(pattern)
  } catch { /* ignore */ }
}

function beep({ freq = 660, duration = 120, type = 'sine', volume = 0.03 } = {}) {
  const ctx = ensureAudio()
  if (!ctx) return
  const fire = () => {
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = type
    osc.frequency.value = freq
    gain.gain.value = volume
    osc.connect(gain)
    gain.connect(ctx.destination)
    const t0 = ctx.currentTime
    osc.start(t0)
    osc.stop(t0 + duration / 1000)
  }
  if (ctx.state !== 'running') {
    try { ctx.resume().then(fire).catch(() => {}) } catch { /* ignore */ }
  } else {
    fire()
  }
}

// Presets
export function sfxSpin(soundOn = true) {
  vibrate(12)
  if (!soundOn) return
  beep({ freq: 480, duration: 60, type: 'triangle', volume: 0.025 })
}

// Tick corto tipo "clack" para ruleta, suavizado con ruido filtrado
function tick({ volume = 0.028 } = {}) {
  const ctx = ensureAudio()
  if (!ctx) return
  const fire = () => {
    const dur = 0.04 // ~40ms
    // Fuente de ruido blanco
    const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * dur), ctx.sampleRate)
    const data = buffer.getChannelData(0)
    for (let i = 0; i < data.length; i++) {
      // Ruido blanco leve
      data[i] = (Math.random() * 2 - 1) * 0.6
    }
    const src = ctx.createBufferSource()
    src.buffer = buffer

    // Filtro bandpass para enfocar el "clack" en medios-altos
    const band = ctx.createBiquadFilter()
    band.type = 'bandpass'
    // Pequeña aleatoriedad para que no suene robotizado
    band.frequency.value = 1600 + Math.random() * 300
    band.Q.value = 5

    // Filtro highpass para evitar graves molestos
    const hip = ctx.createBiquadFilter()
    hip.type = 'highpass'
    hip.frequency.value = 500
    hip.Q.value = 0.7

    const gain = ctx.createGain()
    gain.gain.value = 0.0001

    src.connect(band)
    band.connect(hip)
    hip.connect(gain)
    gain.connect(ctx.destination)

    const t0 = ctx.currentTime
    // Envolvente percutiva muy corta y suave (ataque rápido, caída breve)
    gain.gain.exponentialRampToValueAtTime(volume, t0 + 0.004)
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.032)

    src.start(t0)
    src.stop(t0 + dur)

    // Añadir un click tonal muy corto para definición (no metálico)
    const osc = ctx.createOscillator()
    const og = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = 1900 + Math.random() * 150
    og.gain.value = 0.0001
    osc.connect(og)
    og.connect(ctx.destination)
    og.gain.exponentialRampToValueAtTime(volume * 0.6, t0 + 0.003)
    og.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.02)
    osc.start(t0)
    osc.stop(t0 + 0.022)
  }
  if (ctx.state !== 'running') {
    try { ctx.resume().then(fire).catch(() => {}) } catch { /* ignore */ }
  } else {
    fire()
  }
}

// Programa una secuencia de ticks que desacelera a lo largo de durationMs
export function sfxSpinTicks(soundOn = true, { durationMs = 3800, totalTicks = 40 } = {}) {
  // No vibramos aquí para no duplicar la sensación (ya vibra en sfxSpin)
  if (!soundOn) return
  const total = Math.max(10, totalTicks)
    const startInterval = 24   // ms, muy rápido al inicio (igual)
    const endInterval = 2000    // ms, mucho más lento al final (menos frecuencia)
  // easing: ease-out cúbico para ir ensanchando hacia el final como antes
  const ease = (t) => 1 - Math.pow(1 - t, 3)
  // Construye tiempos acumulados que caben en durationMs
  const times = []
  let acc = 0
  for (let i = 0; i < total; i++) {
    const t = i / (total - 1)
    const interval = startInterval + (endInterval - startInterval) * ease(t)
    acc += interval
    times.push(acc)
  }
  // Normalizar a durationMs
  const scale = durationMs / acc
  times.forEach((t, idx) => {
    // Volumen suave, con un ligero pico hacia el último tercio
    const p = idx / (total - 1)
    const vol = 0.022 + (p > 0.66 ? 0.01 * (p - 0.66) / 0.34 : 0) // ~0.022 → 0.032
    setTimeout(() => tick({ volume: vol }), Math.floor(t * scale))
  })
}

export function sfxCorrect(soundOn = true) {
  vibrate([12, 60, 12])
  if (!soundOn) return
  beep({ freq: 680, duration: 90, type: 'sine', volume: 0.035 })
  setTimeout(() => beep({ freq: 820, duration: 80, type: 'sine', volume: 0.035 }), 90)
}

export function sfxWrong(soundOn = true) {
  vibrate(70)
  if (!soundOn) return
  beep({ freq: 180, duration: 150, type: 'sawtooth', volume: 0.03 })
}

export function sfxStreak(soundOn = true, level = 1) {
  vibrate([20, 40, 20])
  if (!soundOn) return
  const base = 520
  const step = 120
  const tones = Math.min(3, 1 + level)
  for (let i = 0; i < tones; i++) {
    setTimeout(() => beep({ freq: base + i * step, duration: 90, type: 'sine', volume: 0.04 }), i * 100)
  }
}

export default { sfxSpin, sfxCorrect, sfxWrong, sfxStreak, sfxSpinTicks, vibrate }
