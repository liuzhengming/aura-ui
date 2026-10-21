<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    speed?: number
    direction?: 'left' | 'right'
    pauseOnHover?: boolean
    gap?: number
  }>(),
  { speed: 50, direction: 'left', pauseOnHover: true, gap: 16 }
)

const trackRef = ref<HTMLElement | null>(null)
const copyWidth = ref(0)
let ro: ResizeObserver | null = null

onMounted(() => {
  if (trackRef.value) {
    copyWidth.value = trackRef.value.scrollWidth / 2
    ro = new ResizeObserver(() => {
      if (trackRef.value) copyWidth.value = trackRef.value.scrollWidth / 2
    })
    ro.observe(trackRef.value)
  }
})
onBeforeUnmount(() => ro?.disconnect())

const duration = computed(() =>
  copyWidth.value > 0 ? `${copyWidth.value / props.speed}s` : '20s'
)
</script>

<template>
  <div class="aura-marquee" :class="{ 'aura-marquee--pausable': pauseOnHover }">
    <div
      ref="trackRef"
      class="aura-marquee__track"
      :style="{
        gap: `${gap}px`,
        animationDuration: duration,
        animationName: direction === 'left' ? 'aura-marquee-left' : 'aura-marquee-right'
      }"
    >
      <div class="aura-marquee__copy"><slot /></div>
      <div class="aura-marquee__copy" aria-hidden="true"><slot /></div>
    </div>
  </div>
</template>

<style scoped>
.aura-marquee {
  width: 100%;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
}
.aura-marquee__track {
  display: flex;
  width: max-content;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
  animation-play-state: running;
}
.aura-marquee__copy {
  display: flex;
  align-items: center;
  gap: inherit;
  flex: none;
}
.aura-marquee--pausable:hover .aura-marquee__track {
  animation-play-state: paused;
}
</style>

<style>
@keyframes aura-marquee-left {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}
@keyframes aura-marquee-right {
  from {
    transform: translateX(-50%);
  }
  to {
    transform: translateX(0);
  }
}
</style>
