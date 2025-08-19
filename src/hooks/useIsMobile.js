import { useEffect, useState } from 'react'

export function useIsMobile(breakpoint = 900) {
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint}px)`)
    const handler = (e) => setIsMobile(e.matches)
    setIsMobile(mq.matches)
    if (mq.addEventListener) mq.addEventListener('change', handler)
    else mq.addListener(handler)
    return () => {
      if (mq.removeEventListener) mq.removeEventListener('change', handler)
      else mq.removeListener(handler)
    }
  }, [breakpoint])
  return isMobile
}
