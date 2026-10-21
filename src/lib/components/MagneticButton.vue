<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    tag?: string
    variant?: 'solid' | 'ghost' | 'outline'
    strength?: number
  }>(),
  { tag: 'button', variant: 'solid', strength: 0.4 }
)

const inner = ref<HTMLElement | null>(null)

function onMove(e: MouseEvent) {
  const el = inner.value
  if (!el) return
  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  el.style.transform = `translate(${x * props.strength}px, ${y * props.strength}px)`
}

function onLeave() {
  const el = inner.value
  if (el) el.style.transform = 'translate(0, 0)'
}
</script>

<template>
  <component
    :is="tag"
    class="aura-magnetic"
    :class="`aura-magnetic--${variant}`"
    @mousemove="onMove"
    @mouseleave="onLeave"
  >
    <span ref="inner" class="aura-magnetic__inner"><slot /></span>
  </component>
</template>

<style scoped>
.aura-magnetic {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.85rem 1.7rem;
  border-radius: var(--aura-radius-pill);
  font-weight: 600;
  font-size: 0.95rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  border: none;
  color: #fff;
  position: relative;
  transition: box-shadow 0.25s var(--aura-ease), background 0.25s var(--aura-ease),
    border-color 0.25s var(--aura-ease);
  will-change: transform;
}
.aura-magnetic__inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.18s var(--aura-ease);
  will-change: transform;
  pointer-events: none;
}
.aura-magnetic--solid {
  background: var(--aura-gradient);
  box-shadow: 0 12px 34px -12px rgba(124, 92, 255, 0.75);
}
.aura-magnetic--solid:hover {
  box-shadow: 0 18px 46px -10px rgba(124, 92, 255, 0.9);
}
.aura-magnetic--outline {
  background: transparent;
  border: 1px solid var(--aura-border-strong);
  color: var(--aura-text);
}
.aura-magnetic--outline:hover {
  border-color: var(--aura-primary);
}
.aura-magnetic--ghost {
  background: var(--aura-surface);
  color: var(--aura-text);
}
.aura-magnetic--ghost:hover {
  background: var(--aura-surface-2);
}
</style>
