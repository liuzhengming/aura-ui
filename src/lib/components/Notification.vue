<script setup lang="ts">
import { useNotificationState } from '../notification'

const state = useNotificationState()

const icons: Record<string, string> = {
  info: 'M12 8v5m0 3h.01',
  success: 'M5 13l4 4L19 7',
  warning: 'M12 3l9 16H3zM12 10v4',
  error: 'M6 6l12 12M18 6L6 18'
}
</script>

<template>
  <Teleport to="body">
    <div class="aura-notify-stack" aria-live="polite">
      <TransitionGroup name="aura-notify">
        <div v-for="n in state.items" :key="n.id" class="aura-notify" :class="`is-${n.type}`">
          <span class="aura-notify__icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path :d="icons[n.type]" />
            </svg>
          </span>
          <div class="aura-notify__body">
            <div class="aura-notify__title">{{ n.title }}</div>
            <div v-if="n.message" class="aura-notify__msg">{{ n.message }}</div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.aura-notify-stack {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: min(340px, 90vw);
}
.aura-notify {
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  border-radius: var(--aura-radius);
  background: var(--aura-bg-elev);
  border: 1px solid var(--aura-border);
  border-left-width: 3px;
  box-shadow: var(--aura-shadow);
}
.aura-notify.is-info { border-left-color: var(--aura-primary-2); }
.aura-notify.is-success { border-left-color: #2ecc71; }
.aura-notify.is-warning { border-left-color: #f1c40f; }
.aura-notify.is-error { border-left-color: #ff5c5c; }
.aura-notify__icon {
  flex: none;
  width: 22px;
  height: 22px;
}
.aura-notify__icon svg { width: 100%; height: 100%; }
.is-info .aura-notify__icon { color: var(--aura-primary-2); }
.is-success .aura-notify__icon { color: #2ecc71; }
.is-warning .aura-notify__icon { color: #f1c40f; }
.is-error .aura-notify__icon { color: #ff5c5c; }
.aura-notify__title { font-weight: 600; color: var(--aura-text); }
.aura-notify__msg { margin-top: 3px; font-size: 0.88rem; color: var(--aura-text-dim); line-height: 1.5; }
.aura-notify-enter-active,
.aura-notify-leave-active {
  transition: opacity 0.3s var(--aura-ease), transform 0.3s var(--aura-ease);
}
.aura-notify-enter-from,
.aura-notify-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
</style>
