<script setup lang="ts">
withDefaults(
  defineProps<{
    status?: 'success' | 'error' | 'info' | 'warning' | '404'
    title?: string
    subtitle?: string
  }>(),
  { status: 'info' }
)

const icons: Record<string, string> = {
  success: 'M5 13l4 4L19 7',
  error: 'M6 6l12 12M18 6L6 18',
  warning: 'M12 3l9 16H3zM12 10v4',
  info: 'M12 8v5m0 3h.01',
  '404': 'M9 9h.01M15 15h.01M8 16l8-8'
}
</script>

<template>
  <div class="aura-result">
    <div class="aura-result__icon" :class="`is-${status}`">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path :d="icons[status]" />
      </svg>
    </div>
    <div v-if="title" class="aura-result__title">{{ title }}</div>
    <div v-if="subtitle" class="aura-result__subtitle">{{ subtitle }}</div>
    <div v-if="$slots.default" class="aura-result__extra">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.aura-result {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 28px 16px;
}
.aura-result__icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.aura-result__icon svg {
  width: 34px;
  height: 34px;
}
.is-success {
  color: #2ecc71;
  background: rgba(46, 204, 113, 0.14);
}
.is-error {
  color: #ff5c5c;
  background: rgba(255, 92, 92, 0.14);
}
.is-warning {
  color: #f1c40f;
  background: rgba(241, 196, 15, 0.14);
}
.is-info {
  color: var(--aura-primary-2);
  background: rgba(0, 212, 255, 0.14);
}
.is-404 {
  color: var(--aura-primary);
  background: rgba(124, 92, 255, 0.14);
}
.aura-result__title {
  margin-top: 16px;
  font-size: 1.3rem;
  font-weight: 700;
}
.aura-result__subtitle {
  margin-top: 8px;
  color: var(--aura-text-dim);
  font-size: 0.95rem;
  line-height: 1.6;
}
.aura-result__extra {
  margin-top: 20px;
}
</style>
