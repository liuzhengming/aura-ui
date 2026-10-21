import { reactive } from 'vue'

export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastItem {
  id: number
  type: ToastType
  message: string
  duration: number
}

const state = reactive<{ items: ToastItem[] }>({ items: [] })
let seed = 0

export function pushToast(type: ToastType, message: string, duration = 3000): number {
  const id = ++seed
  state.items.push({ id, type, message, duration })
  if (duration > 0) {
    window.setTimeout(() => removeToast(id), duration)
  }
  return id
}

export function removeToast(id: number): void {
  const index = state.items.findIndex((t) => t.id === id)
  if (index > -1) state.items.splice(index, 1)
}

export function useToast() {
  return {
    success: (message: string, duration?: number) => pushToast('success', message, duration),
    error: (message: string, duration?: number) => pushToast('error', message, duration),
    info: (message: string, duration?: number) => pushToast('info', message, duration),
    warning: (message: string, duration?: number) => pushToast('warning', message, duration),
    remove: removeToast
  }
}

export function useToastState() {
  return state
}
