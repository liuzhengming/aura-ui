<script setup lang="ts">
withDefaults(
  defineProps<{
    loading?: boolean
    tip?: string
    size?: 'sm' | 'md' | 'lg'
    fullscreen?: boolean
  }>(),
  { loading: true, size: 'md', fullscreen: false }
)
</script>

<template>
  <div class="aura-loading-wrap">
    <slot />
    <div v-if="loading" class="aura-loading-overlay" :class="{ 'is-fullscreen': fullscreen }">
      <div class="aura-loading-inner">
        <span class="aura-loading-spin" :class="`is-${size}`" />
        <span v-if="tip" class="aura-loading-tip">{{ tip }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aura-loading-wrap {
  position: relative;
  display: inline-block;
  width: 100%;
}
.aura-loading-overlay {
  position: absolute;
  inset: 0;
  z-index: 50;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(8, 8, 13, 0.45);
  backdrop-filter: blur(2px);
  border-radius: inherit;
}
.aura-loading-overlay.is-fullscreen {
  position: fixed;
  z-index: 2000;
  background: rgba(8, 8, 13, 0.6);
}
.aura-loading-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}
.aura-loading-spin {
  display: block;
  border-radius: 50%;
  border: 3px solid var(--aura-surface-2);
  border-top-color: var(--aura-primary);
  animation: aura-spin 0.8s linear infinite;
}
.aura-loading-spin.is-sm {
  width: 18px;
  height: 18px;
  border-width: 2px;
}
.aura-loading-spin.is-md {
  width: 30px;
  height: 30px;
}
.aura-loading-spin.is-lg {
  width: 46px;
  height: 46px;
  border-width: 4px;
}
.aura-loading-tip {
  color: var(--aura-text);
  font-size: 0.9rem;
}
@keyframes aura-spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
