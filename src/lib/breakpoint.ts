import { ref, onMounted, onBeforeUnmount } from 'vue'

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'

/** Element-style breakpoint thresholds (px). */
export const auraScreens: Record<Breakpoint, number> = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1920
}

export const auraBreakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']

function resolve(width: number): Breakpoint {
  if (width >= auraScreens.xxl) return 'xxl'
  if (width >= auraScreens.xl) return 'xl'
  if (width >= auraScreens.lg) return 'lg'
  if (width >= auraScreens.md) return 'md'
  if (width >= auraScreens.sm) return 'sm'
  return 'xs'
}

const current = ref<Breakpoint>(typeof window !== 'undefined' ? resolve(window.innerWidth) : 'xl')
let listeners = 0

function onResize() {
  current.value = resolve(window.innerWidth)
}

/**
 * Reactive current breakpoint. Drives responsive layout (Row/Col, etc.).
 * Safe to call from any setup(); shared singleton, auto-managed listeners.
 */
export function useBreakpoint() {
  onMounted(() => {
    listeners++
    if (listeners === 1) window.addEventListener('resize', onResize)
  })
  onBeforeUnmount(() => {
    listeners--
    if (listeners <= 0) {
      window.removeEventListener('resize', onResize)
      listeners = 0
    }
  })
  return current
}

/** Pick the value for the active breakpoint from a responsive prop map. */
export function pickResponsive<T>(
  bp: Breakpoint,
  base: T | undefined,
  responsive: Partial<Record<Breakpoint, T>> | undefined
): T | undefined {
  if (!responsive) return base
  const order = auraBreakpointOrder.slice(0, auraBreakpointOrder.indexOf(bp) + 1)
  for (let i = order.length - 1; i >= 0; i--) {
    const key = order[i]
    if (responsive[key] !== undefined) return responsive[key]
  }
  return base
}
