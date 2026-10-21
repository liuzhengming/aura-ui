<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'ring' | 'dots' | 'pulse'
    size?: number
  }>(),
  { variant: 'ring', size: 28 }
)
</script>

<template>
  <span class="aura-spinner" :class="`is-${variant}`" :style="{ width: size + 'px', height: size + 'px' }">
    <span v-if="variant === 'ring'" class="aura-spinner__ring" />
    <template v-else-if="variant === 'dots'">
      <span class="aura-spinner__dot" /><span class="aura-spinner__dot" /><span class="aura-spinner__dot" />
    </template>
    <span v-else class="aura-spinner__pulse" />
  </span>
</template>

<style scoped>
.aura-spinner {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.aura-spinner__ring {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 3px solid var(--aura-surface-2);
  border-top-color: var(--aura-primary);
  animation: aura-spin 0.8s linear infinite;
}
.aura-spinner__dot {
  width: 26%;
  height: 26%;
  margin: 0 5%;
  border-radius: 50%;
  background: var(--aura-primary);
  animation: aura-bounce 1s var(--aura-ease) infinite;
}
.aura-spinner__dot:nth-child(2) { animation-delay: 0.15s; }
.aura-spinner__dot:nth-child(3) { animation-delay: 0.3s; }
.aura-spinner__pulse {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: var(--aura-primary);
  animation: aura-pulse 1.1s var(--aura-ease) infinite;
}
@keyframes aura-spin { to { transform: rotate(360deg); } }
@keyframes aura-bounce {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(-30%); opacity: 1; }
}
@keyframes aura-pulse {
  0% { transform: scale(0.4); opacity: 0.6; }
  100% { transform: scale(1); opacity: 0; }
}
</style>
