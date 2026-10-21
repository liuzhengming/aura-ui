<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{ text: string; label?: string }>(),
  { label: 'Copy' }
)

const copied = ref(false)
let timer: number | undefined

function copy() {
  navigator.clipboard?.writeText(props.text).then(() => {
    copied.value = true
    window.clearTimeout(timer)
    timer = window.setTimeout(() => (copied.value = false), 1600)
  })
}
</script>

<template>
  <button class="aura-copy-btn" type="button" :class="{ 'is-copied': copied }" @click="copy">
    <span class="aura-copy-btn__icon">{{ copied ? '✓' : '⧉' }}</span>
    <span>{{ copied ? 'Copied' : label }}</span>
  </button>
</template>

<style scoped>
.aura-copy-btn {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 8px 14px;
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text-dim);
  font-size: 0.88rem;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.2s var(--aura-ease), border-color 0.2s var(--aura-ease),
    background 0.2s var(--aura-ease);
}
.aura-copy-btn:hover {
  color: var(--aura-text);
  border-color: var(--aura-border-strong);
}
.aura-copy-btn.is-copied {
  color: #2ecc71;
  border-color: rgba(46, 204, 113, 0.5);
}
.aura-copy-btn__icon {
  font-size: 1rem;
  line-height: 1;
}
</style>
