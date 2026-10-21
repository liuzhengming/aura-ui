import { reactive } from 'vue'

export type Theme = 'dark' | 'light'

const state = reactive<{ theme: Theme }>({ theme: 'dark' })

export function useTheme() {
  return state
}

export function setTheme(theme: Theme) {
  state.theme = theme
  if (typeof document !== 'undefined') {
    document.documentElement.dataset.theme = theme
  }
}

export function toggleTheme() {
  setTheme(state.theme === 'dark' ? 'light' : 'dark')
}

export function initTheme() {
  setTheme(state.theme)
}
