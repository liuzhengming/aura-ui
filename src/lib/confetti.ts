export interface ConfettiOptions {
  particleCount?: number
  spread?: number
  startVelocity?: number
  originX?: number
  originY?: number
  colors?: string[]
  gravity?: number
  decay?: number
  duration?: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  rotation: number
  vr: number
  color: string
  alpha: number
}

const DEFAULT_COLORS = ['#7c5cff', '#4ad9ff', '#ff7ac6', '#ffd166', '#06d6a0']

export function fireConfetti(options: ConfettiOptions = {}): void {
  if (typeof window === 'undefined') return
  const prefersReduced =
    window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (prefersReduced) return

  const {
    particleCount = 140,
    spread = 70,
    startVelocity = 32,
    originX = 0.5,
    originY = 0.4,
    colors = DEFAULT_COLORS,
    gravity = 0.9,
    decay = 0.92,
    duration = 2600
  } = options

  const canvas = document.createElement('canvas')
  const dpr = window.devicePixelRatio || 1
  canvas.width = window.innerWidth * dpr
  canvas.height = window.innerHeight * dpr
  canvas.style.position = 'fixed'
  canvas.style.inset = '0'
  canvas.style.width = '100%'
  canvas.style.height = '100%'
  canvas.style.pointerEvents = 'none'
  canvas.style.zIndex = '9999'
  document.body.appendChild(canvas)

  const ctx = canvas.getContext('2d')
  if (!ctx) {
    canvas.remove()
    return
  }
  ctx.scale(dpr, dpr)

  const particles: Particle[] = []
  const cx = originX * window.innerWidth
  const cy = originY * window.innerHeight

  for (let i = 0; i < particleCount; i++) {
    const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * (spread / 100)
    const velocity = startVelocity * (0.7 + Math.random() * 0.6)
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * velocity,
      vy: Math.sin(angle) * velocity - 6,
      size: 6 + Math.random() * 6,
      rotation: Math.random() * 360,
      vr: (Math.random() - 0.5) * 14,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1
    })
  }

  const start = performance.now()
  let last = start

  function frame(now: number) {
    const delta = Math.min((now - last) / 16.67, 2)
    last = now
    ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)

    particles.forEach((p) => {
      p.vy += gravity * delta
      p.vx *= Math.pow(decay, delta)
      p.vy *= Math.pow(decay, delta)
      p.x += p.vx * delta
      p.y += p.vy * delta
      p.rotation += p.vr * delta
      p.alpha = Math.max(0, 1 - (now - start) / duration)

      ctx!.save()
      ctx!.globalAlpha = p.alpha
      ctx!.translate(p.x, p.y)
      ctx!.rotate((p.rotation * Math.PI) / 180)
      ctx!.fillStyle = p.color
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6)
      ctx!.restore()
    })

    if (now - start < duration) {
      requestAnimationFrame(frame)
    } else {
      canvas.remove()
    }
  }

  requestAnimationFrame(frame)
}
