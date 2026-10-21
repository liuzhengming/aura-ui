<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(defineProps<{ variant?: 'solid' | 'outline' }>(), {
  variant: 'solid'
})

interface Ripple {
  id: number
  x: number
  y: number
  size: number
}
const ripples = ref<Ripple[]>([])
let uid = 0

function onClick(e: MouseEvent) {
  const el = e.currentTarget as HTMLElement
  const rect = el.getBoundingClientRect()
  const size = Math.max(rect.width, rect.height) * 2
  ripples.value.push({
    id: uid++,
    x: e.clientX - rect.left - size / 2,
    y: e.clientY - rect.top - size / 2,
    size
  })
}

function remove(id: number) {
  ripples.value = ripples.value.filter((r) => r.id !== id)
}
</script>

<template>
  <button class="aura-ripple" :class="`aura-ripple--${variant}`" @click="onClick">
    <span class="aura-ripple__label"><slot /></span>
    <span
      v-for="r in ripples"
      :key="r.id"
      class="aura-ripple__wave"
      :style="{ left: r.x + 'px', top: r.y + 'px', width: r.size + 'px', height: r.size + 'px' }"
      @animationend="remove(r.id)"
    />
  </button>
</template>

<style scoped>
.aura-ripple {
  position: relative;
  overflow: hidden;
  border: none;
  cursor: pointer;
  padding: 0.85rem 1.7rem;
  border-radius: var(--aura-radius-pill);
  font-weight: 600;
  font-size: 0.95rem;
  color: #fff;
  background: var(--aura-gradient);
  transition: box-shadow 0.25s var(--aura-ease), border-color 0.25s var(--aura-ease);
}
.aura-ripple--outline {
  background: transparent;
  border: 1px solid var(--aura-border-strong);
  color: var(--aura-text);
}
.aura-ripple--outline:hover {
  border-color: var(--aura-primary);
}
.aura-ripple:hover {
  box-shadow: 0 16px 44px -12px rgba(0, 212, 255, 0.6);
}
.aura-ripple__label {
  position: relative;
  z-index: 1;
}
.aura-ripple__wave {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.45);
  transform: scale(0);
  animation: aura-ripple-anim 0.6s var(--aura-ease);
  pointer-events: none;
}
@keyframes aura-ripple-anim {
  to {
    transform: scale(1);
    opacity: 0;
  }
}
</style>
