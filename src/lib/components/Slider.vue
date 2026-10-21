<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    min?: number
    max?: number
    step?: number
    disabled?: boolean
  }>(),
  { min: 0, max: 100, step: 1, disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: number): void }>()

const trackRef = ref<HTMLElement | null>(null)
const dragging = ref(false)
const hovering = ref(false)

const pct = computed(() =>
  Math.min(100, Math.max(0, ((props.modelValue - props.min) / (props.max - props.min)) * 100))
)

function setFromClientX(clientX: number) {
  if (props.disabled || !trackRef.value) return
  const rect = trackRef.value.getBoundingClientRect()
  let ratio = (clientX - rect.left) / rect.width
  ratio = Math.min(1, Math.max(0, ratio))
  let val = props.min + ratio * (props.max - props.min)
  val = Math.round(val / props.step) * props.step
  val = Math.min(props.max, Math.max(props.min, val))
  emit('update:modelValue', val)
}

function onDown(e: PointerEvent) {
  if (props.disabled) return
  dragging.value = true
  setFromClientX(e.clientX)
  window.addEventListener('pointermove', onMove)
  window.addEventListener('pointerup', onUp)
}
function onMove(e: PointerEvent) {
  if (dragging.value) setFromClientX(e.clientX)
}
function onUp() {
  dragging.value = false
  window.removeEventListener('pointermove', onMove)
  window.removeEventListener('pointerup', onUp)
}
</script>

<template>
  <div
    class="aura-slider"
    :class="{ 'is-disabled': disabled, 'is-active': dragging || hovering }"
    @pointerdown="onDown"
    @mouseenter="hovering = true"
    @mouseleave="hovering = false"
  >
    <div ref="trackRef" class="aura-slider__track">
      <div class="aura-slider__fill" :style="{ width: pct + '%' }" />
      <div class="aura-slider__thumb" :style="{ left: pct + '%' }">
        <span v-if="dragging || hovering" class="aura-slider__bubble">{{ modelValue }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.aura-slider {
  padding: 14px 6px;
  cursor: pointer;
  touch-action: none;
}
.aura-slider.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.aura-slider__track {
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: var(--aura-surface-2);
}
.aura-slider__fill {
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  border-radius: 999px;
  background: var(--aura-gradient);
}
.aura-slider__thumb {
  position: absolute;
  top: 50%;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  border: 3px solid var(--aura-primary);
  transform: translate(-50%, -50%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.15s var(--aura-ease);
}
.aura-slider.is-active .aura-slider__thumb {
  transform: translate(-50%, -50%) scale(1.15);
}
.aura-slider__bubble {
  position: absolute;
  bottom: calc(100% + 10px);
  left: 50%;
  transform: translateX(-50%);
  padding: 2px 8px;
  font-size: 12px;
  border-radius: 7px;
  color: #fff;
  background: var(--aura-primary);
  white-space: nowrap;
}
</style>
