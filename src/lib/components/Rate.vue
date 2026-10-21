<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: number
    count?: number
    allowHalf?: boolean
    disabled?: boolean
  }>(),
  { modelValue: 0, count: 5, allowHalf: false, disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: number): void }>()

const hover = ref(0)
const stars = computed(() => Array.from({ length: props.count }, (_, i) => i + 1))

function fillFor(star: number): number {
  const v = hover.value || props.modelValue
  return Math.min(1, Math.max(0, v - (star - 1)))
}
function onMove(e: MouseEvent, star: number) {
  if (props.disabled) return
  if (props.allowHalf) {
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const half = e.clientX - rect.left < rect.width / 2
    hover.value = star - (half ? 0.5 : 0)
  } else {
    hover.value = star
  }
}
function onLeave() {
  hover.value = 0
}
function pick() {
  if (props.disabled) return
  emit('update:modelValue', hover.value || props.modelValue)
}
</script>

<template>
  <div class="aura-rate" :class="{ 'is-disabled': disabled }" @mouseleave="onLeave">
    <span
      v-for="star in stars"
      :key="star"
      class="aura-rate__star"
      @mousemove="onMove($event, star)"
      @click="pick"
    >
      <span class="aura-rate__star-bg">★</span>
      <span class="aura-rate__star-fill" :style="{ width: fillFor(star) * 100 + '%' }">★</span>
    </span>
  </div>
</template>

<style scoped>
.aura-rate {
  display: inline-flex;
  gap: 4px;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
}
.aura-rate.is-disabled {
  opacity: 0.6;
  pointer-events: none;
}
.aura-rate__star {
  position: relative;
  display: inline-block;
  width: 1em;
  height: 1em;
}
.aura-rate__star-bg {
  color: var(--aura-surface-2);
}
.aura-rate__star-fill {
  position: absolute;
  left: 0;
  top: 0;
  overflow: hidden;
  white-space: nowrap;
  color: #ffb020;
  transition: width 0.2s var(--aura-ease);
}
</style>
