<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{ delay?: number; y?: number; once?: boolean }>(),
  { delay: 0, y: 26, once: true }
)

const el = ref<HTMLElement | null>(null)
let io: IntersectionObserver | null = null

onMounted(() => {
  if (!el.value) return
  io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          if (props.once && io) io.unobserve(entry.target)
        } else if (!props.once) {
          entry.target.classList.remove('is-visible')
        }
      })
    },
    { threshold: 0.15 }
  )
  io.observe(el.value)
})

onBeforeUnmount(() => io?.disconnect())
</script>

<template>
  <div
    ref="el"
    class="aura-reveal"
    :style="{ transitionDelay: delay + 'ms', '--ry': y + 'px' }"
  >
    <slot />
  </div>
</template>

<style scoped>
.aura-reveal {
  opacity: 0;
  transform: translateY(var(--ry));
  transition: opacity 0.7s var(--aura-ease), transform 0.7s var(--aura-ease);
}
.aura-reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
