<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    value: number
    duration?: number
    decimals?: number
    prefix?: string
    suffix?: string
  }>(),
  { duration: 1600, decimals: 0, prefix: '', suffix: '' }
)

const display = ref(0)
const el = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null
let raf = 0

function run() {
  const start = performance.now()
  const from = 0
  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / props.duration)
    const eased = 1 - Math.pow(1 - t, 3)
    display.value = from + (props.value - from) * eased
    if (t < 1) raf = requestAnimationFrame(tick)
  }
  raf = requestAnimationFrame(tick)
}

onMounted(() => {
  if (!el.value) return
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          run()
          io?.disconnect()
        }
      })
    },
    { threshold: 0.4 }
  )
  io.observe(el.value)
})

onBeforeUnmount(() => {
  io?.disconnect()
  cancelAnimationFrame(raf)
})
</script>

<template>
  <span ref="el" class="aura-count">
    {{ prefix }}{{ display.toFixed(decimals) }}{{ suffix }}
  </span>
</template>

<style scoped>
.aura-count {
  font-variant-numeric: tabular-nums;
}
</style>
