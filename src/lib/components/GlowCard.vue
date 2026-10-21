<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)

function onMove(e: MouseEvent) {
  const node = el.value
  if (!node) return
  const rect = node.getBoundingClientRect()
  node.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  node.style.setProperty('--my', `${e.clientY - rect.top}px`)
}
</script>

<template>
  <div ref="el" class="aura-glow" @mousemove="onMove">
    <div class="aura-glow__border" />
    <div class="aura-glow__content"><slot /></div>
  </div>
</template>

<style scoped>
.aura-glow {
  position: relative;
  border-radius: var(--aura-radius-lg);
  padding: 1.6rem;
  background: var(--aura-bg-soft);
  overflow: hidden;
  isolation: isolate;
  transition: transform 0.3s var(--aura-ease);
}
.aura-glow::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    360px circle at var(--mx, 50%) var(--my, 50%),
    rgba(124, 92, 255, 0.22),
    transparent 60%
  );
  opacity: 0;
  transition: opacity 0.3s var(--aura-ease);
  z-index: 0;
}
.aura-glow:hover::before {
  opacity: 1;
}
.aura-glow__border {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  padding: 1px;
  background: radial-gradient(
    360px circle at var(--mx, 50%) var(--my, 50%),
    rgba(124, 92, 255, 0.65),
    transparent 60%
  );
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  opacity: 0;
  transition: opacity 0.3s var(--aura-ease);
  z-index: 1;
}
.aura-glow:hover .aura-glow__border {
  opacity: 1;
}
.aura-glow__content {
  position: relative;
  z-index: 2;
}
</style>
