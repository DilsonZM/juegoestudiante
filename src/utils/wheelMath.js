export function polarToCartesian(cx, cy, r, angleDeg){
  const rad = (angleDeg-90) * Math.PI / 180
  return { x: cx + (r * Math.cos(rad)), y: cy + (r * Math.sin(rad)) }
}

export const midPointOnArc = polarToCartesian

export function calcWheelFontSize(label, segAngle, radiusText = 36) {
  const theta = (segAngle * Math.PI) / 180
  const maxWidth = 2 * radiusText * Math.sin(theta / 2) * 0.9
  const estimateFactor = 0.6
  const MAX_FS = 5.2
  const fs = Math.min(MAX_FS, maxWidth / (estimateFactor * Math.max(1, label.length)))
  return Math.max(3.2, fs)
}
