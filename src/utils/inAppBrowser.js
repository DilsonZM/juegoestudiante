// Detección heurística de navegadores "in-app" (LinkedIn, Instagram, Facebook, TikTok, etc.)
// Útil para evitar popups de Google Auth y recomendar abrir en el navegador del sistema.

export function getInAppBrowserInfo() {
  if (typeof navigator === 'undefined') return { isInApp: false, ua: '', label: '' }
  const ua = navigator.userAgent || navigator.vendor || ''
  const isAndroid = /Android/i.test(ua)
  const isIOS = /iPhone|iPad|iPod/i.test(ua)

  const appMatchers = [
    { re: /LinkedInApp|LIAPP/i, label: 'LinkedIn' },
    { re: /FBAN|FBAV|Facebook/i, label: 'Facebook' },
    { re: /Instagram/i, label: 'Instagram' },
    { re: /Twitter/i, label: 'Twitter' },
    { re: /Snapchat/i, label: 'Snapchat' },
    { re: /Line/i, label: 'LINE' },
    { re: /MicroMessenger|WeChat/i, label: 'WeChat' },
    { re: /KAKAOTALK/i, label: 'KakaoTalk' },
    { re: /TikTok/i, label: 'TikTok' }
  ]

  let label = ''
  for (const m of appMatchers) {
    if (m.re.test(ua)) { label = m.label; break }
  }

  // Indicadores genéricos de WebView / InAppBrowser
  const genericWV = /\bwv\b|; wv\)|\bInAppBrowser\b|\bWebView\b/i.test(ua)

  const isInApp = Boolean(label) || genericWV || (isAndroid && /\bwv\b/i.test(ua)) || false

  return { isInApp, ua, label, isAndroid, isIOS }
}

export function isInAppBrowser() {
  return getInAppBrowserInfo().isInApp
}
