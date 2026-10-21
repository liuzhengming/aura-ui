<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = withDefaults(
  defineProps<{
    text?: string
    stagger?: number
    as?: string
  }>(),
  { text: '', stagger: 28, as: 'span' }
)

const el = ref<HTMLElement | null>(null)
const revealed = ref(false)

onMounted(() => {
  const target = el.value
  if (!target) return
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealed.value = true
          obs.disconnect()
        }
      })
    },
    { threshold: 0.2 }
  )
  obs.observe(target)
})

const chars = computed(() => Array.from(props.text))
</script>

<template>
  <component :is="as" ref="el" class="aura-blur-text" :class="{ 'is-revealed': revealed }">
    <span
      v-for="(c, i) in chars"
      :key="i"
      class="aura-blur-text__char"
      :style="{ transitionDelay: `${i * stagger}ms` }"
      >{{ c === ' ' ? ' ' : c }}</span
    >
  </component>
</template>

<style scoped>
.aura-blur-text {
  display: inline-block;
}
.aura-blur-text__char {
  display: inline-block;
  opacity: 0;
  filter: blur(10px);
  transform: translateY(10px);
  transition: opacity 0.6s ease, filter 0.6s ease, transform 0.6s ease;
  white-space: pre;
}
.aura-blur-text.is-revealed .aura-blur-text__char {
  opacity: 1;
  filter: blur(0);
  transform: translateY(0);
}
</style>
