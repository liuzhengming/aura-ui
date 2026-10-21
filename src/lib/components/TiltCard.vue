<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{ max?: number; glare?: boolean }>(),
  { max: 12, glare: true }
)

const el = ref<HTMLElement | null>(null)
const rotX = ref(0)
const rotY = ref(0)
const gx = ref('50%')
const gy = ref('50%')
const active = ref(false)

function onMove(e: MouseEvent) {
  const node = el.value
  if (!node) return
  const rect = node.getBoundingClientRect()
  const px = (e.clientX - rect.left) / rect.width
  const py = (e.clientY - rect.top) / rect.height
  rotY.value = (px - 0.5) * props.max * 2
  rotX.value = -(py - 0.5) * props.max * 2
  gx.value = `${px * 100}%`
  gy.value = `${py * 100}%`
  active.value = true
}

function onLeave() {
  rotX.value = 0
  rotY.value = 0
  active.value = false
}
</script>

<template>
  <div class="aura-tilt-wrap">
    <div
      ref="el"
      class="aura-tilt"
      :class="{ 'is-on': active }"
      :style="{ transform: `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg)` }"
      @mousemove="onMove"
      @mouseleave="onLeave"
    >
      <div class="aura-tilt__content"><slot /></div>
      <div
        v-if="glare"
        class="aura-tilt__glare"
        :style="{
          background: `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35), transparent 50%)`,
          opacity: active ? 1 : 0
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.aura-tilt-wrap {
  perspective: 900px;
}
.aura-tilt {
  position: relative;
  border-radius: var(--aura-radius-lg);
  background: var(--aura-bg-soft);
  border: 1px solid var(--aura-border);
  transform-style: preserve-3d;
  transition: transform 0.18s var(--aura-ease);
  will-change: transform;
}
.aura-tilt.is-on {
  transition: none;
}
.aura-tilt__content {
  padding: 1.7rem;
  position: relative;
  z-index: 1;
}
.aura-tilt__glare {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
  transition: opacity 0.2s var(--aura-ease);
  mix-blend-mode: overlay;
}
</style>
