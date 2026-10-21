<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    type?: 'info' | 'success' | 'warning' | 'error'
    title?: string
    closable?: boolean
  }>(),
  { type: 'info', closable: false }
)

const visible = ref(true)
const icons: Record<string, string> = {
  info: 'M12 8v5m0 3h.01',
  success: 'M5 13l4 4L19 7',
  warning: 'M12 3l9 16H3zM12 10v4',
  error: 'M6 6l12 12M18 6L6 18'
}
</script>

<template>
  <Transition name="aura-alert">
    <div v-if="visible" class="aura-alert" :class="`is-${type}`" role="alert">
      <span class="aura-alert__icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path :d="icons[type]" />
        </svg>
      </span>
      <div class="aura-alert__body">
        <div v-if="title" class="aura-alert__title">{{ title }}</div>
        <div class="aura-alert__content"><slot /></div>
      </div>
      <button v-if="closable" class="aura-alert__close" type="button" aria-label="close" @click="visible = false">×</button>
    </div>
  </Transition>
</template>

<style scoped>
.aura-alert {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 13px 15px;
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  border-left-width: 3px;
  background: var(--aura-surface);
}
.is-info { border-left-color: var(--aura-primary-2); }
.is-success { border-left-color: #2ecc71; }
.is-warning { border-left-color: #f1c40f; }
.is-error { border-left-color: #ff5c5c; }
.aura-alert__icon {
  flex: none;
  width: 20px;
  height: 20px;
  margin-top: 1px;
}
.aura-alert__icon svg { width: 100%; height: 100%; }
.is-info .aura-alert__icon { color: var(--aura-primary-2); }
.is-success .aura-alert__icon { color: #2ecc71; }
.is-warning .aura-alert__icon { color: #f1c40f; }
.is-error .aura-alert__icon { color: #ff5c5c; }
.aura-alert__body { flex: 1; }
.aura-alert__title {
  font-weight: 600;
  margin-bottom: 2px;
  color: var(--aura-text);
}
.aura-alert__content {
  color: var(--aura-text-dim);
  font-size: 0.9rem;
  line-height: 1.6;
}
.aura-alert__close {
  flex: none;
  border: none;
  background: transparent;
  color: var(--aura-text-faint);
  font-size: 1.2rem;
  line-height: 1;
  cursor: pointer;
}
.aura-alert__close:hover { color: var(--aura-text); }
.aura-alert-enter-active,
.aura-alert-leave-active {
  transition: opacity 0.25s var(--aura-ease), transform 0.25s var(--aura-ease);
}
.aura-alert-enter-from,
.aura-alert-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
