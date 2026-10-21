<script setup lang="ts">
defineProps<{
  type?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'default'
  size?: 'sm' | 'md'
  closable?: boolean
}>()

const emit = defineEmits<{ (e: 'close'): void }>()
</script>

<template>
  <span class="aura-tag" :class="[`is-${type || 'default'}`, `is-${size || 'md'}`]">
    <slot />
    <button v-if="closable" class="aura-tag__close" type="button" aria-label="close" @click="emit('close')">
      ×
    </button>
  </span>
</template>

<style scoped>
.aura-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 4px 10px;
  border-radius: var(--aura-radius-pill);
  font-size: 0.82rem;
  font-weight: 500;
  line-height: 1.4;
  border: 1px solid transparent;
}
.aura-tag.is-sm {
  padding: 2px 8px;
  font-size: 0.76rem;
}
.is-default {
  background: var(--aura-surface-2);
  border-color: var(--aura-border);
  color: var(--aura-text-dim);
}
.is-primary {
  background: rgba(124, 92, 255, 0.16);
  color: #b9a6ff;
}
.is-success {
  background: rgba(46, 204, 113, 0.16);
  color: #6fe0a0;
}
.is-warning {
  background: rgba(241, 196, 15, 0.16);
  color: #f4d35e;
}
.is-error {
  background: rgba(255, 92, 92, 0.16);
  color: #ff9a9a;
}
.is-info {
  background: rgba(0, 212, 255, 0.16);
  color: #7ee3ff;
}
.aura-tag__close {
  border: none;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  opacity: 0.7;
  transition: opacity 0.2s var(--aura-ease);
}
.aura-tag__close:hover {
  opacity: 1;
}
</style>
