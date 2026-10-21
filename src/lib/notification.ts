import { reactive } from 'vue'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface NotificationItem {
  id: number
  type: NotificationType
  title: string
  message?: string
}

const state = reactive<{ items: NotificationItem[] }>({ items: [] })
let seed = 0

export function pushNotification(
  type: NotificationType,
  title: string,
  message?: string,
  duration = 4000
): number {
  const id = ++seed
  state.items.push({ id, type, title, message })
  if (duration > 0) {
    window.setTimeout(() => removeNotification(id), duration)
  }
  return id
}

export function removeNotification(id: number): void {
  const index = state.items.findIndex((n) => n.id === id)
  if (index > -1) state.items.splice(index, 1)
}

export function useNotification() {
  return {
    success: (title: string, message?: string, duration?: number) =>
      pushNotification('success', title, message, duration),
    error: (title: string, message?: string, duration?: number) =>
      pushNotification('error', title, message, duration),
    info: (title: string, message?: string, duration?: number) =>
      pushNotification('info', title, message, duration),
    warning: (title: string, message?: string, duration?: number) =>
      pushNotification('warning', title, message, duration),
    remove: removeNotification
  }
}

export function useNotificationState() {
  return state
}
