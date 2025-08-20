// Mini i18n helper (es por defecto)
const dict = {
  es: {
    questionForPoints: (n)=>`Pregunta por ${n} puntos`,
    true: 'Verdadero',
    false: 'Falso',
    time: (s)=>`Tiempo: ${s}s`,
    answerShortPlaceholder: 'Escribe tu respuesta corta',
    reply: 'Responder',
  },
}

export function t(key, ...args) {
  const lang = 'es'
  const v = dict[lang][key]
  return typeof v === 'function' ? v(...args) : v
}

export default t
