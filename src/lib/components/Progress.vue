<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: number
    max?: number
    variant?: 'gradient' | 'solid'
    color?: string
    height?: number
    showLabel?: boolean
    striped?: boolean
  }>(),
  { value: 0, max: 100, variant: 'gradient', color: '', height: 10, showLabel: false, striped: false }
)

const pct = computed(() => {
  const v = Math.min(Math.max(props.value, 0), props.max)
  return (v / props.max) * 100
})

const barStyle = computed(() => {
  const style: Record<string, string> = { width: `${pct.value}%` }
  if (props.variant === 'solid' && props.color) style.background = props.color
  return style
})
</script>

<template>
  <div class="aura-progress" :style="{ height: `${height}px` }">
    <div class="aura-progress__bar" :class="{ 'is-striped': striped }" :style="barStyle"></div>
    <span v-if="showLabel" class="aura-progress__label">{{ Math.round(pct) }}%</span>
  </div>
</template>

<style scoped>
.aura-progress {
  position: relative;
  width: 100%;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 999px;
  overflow: hidden;
}
.aura-progress__bar {
  height: 100%;
  border-radius: 999px;
  background: linear-gradient(90deg, #7c5cff, #4ad9ff);
  transition: width 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
}
.aura-progress__bar.is-striped::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.18) 0,
    rgba(255, 255, 255, 0.18) 10px,
    transparent 10px,
    transparent 20px
  );
  animation: aura-progress-stripes 1s linear infinite;
}
.aura-progress__label {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
  color: #fff;
  mix-blend-mode: difference;
}
@keyframes aura-progress-stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 28px 0;
  }
}
</style>
