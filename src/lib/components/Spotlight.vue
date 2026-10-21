<script setup lang="ts">
import { ref } from 'vue'

const el = ref<HTMLElement | null>(null)
const x = ref(0)
const y = ref(0)

function onMove(e: MouseEvent) {
  const node = el.value
  if (!node) return
  const rect = node.getBoundingClientRect()
  x.value = e.clientX - rect.left
  y.value = e.clientY - rect.top
}
</script>

<template>
  <div ref="el" class="aura-spotlight" @mousemove="onMove">
    <div class="aura-spotlight__light" :style="{ transform: `translate(${x}px, ${y}px)` }" />
    <div class="aura-spotlight__content"><slot /></div>
  </div>
</template>

<style scoped>
.aura-spotlight {
  position: relative;
  overflow: hidden;
}
.aura-spotlight__light {
  position: absolute;
  top: 0;
  left: 0;
  width: 560px;
  height: 560px;
  margin: -280px 0 0 -280px;
  background: radial-gradient(circle, rgba(124, 92, 255, 0.22), transparent 60%);
  pointer-events: none;
  transition: transform 0.12s ease-out;
}
.aura-spotlight__content {
  position: relative;
  z-index: 1;
}
</style>
