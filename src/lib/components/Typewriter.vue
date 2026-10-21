<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    text?: string
    speed?: number
  }>(),
  { text: '', speed: 70 }
)

const displayed = ref('')
let charIndex = 0
let timer = 0

function tick() {
  charIndex++
  displayed.value = props.text.slice(0, charIndex)
  if (charIndex < props.text.length) {
    timer = window.setTimeout(tick, props.speed)
  }
}

onMounted(() => {
  timer = window.setTimeout(tick, props.speed)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="aura-type">{{ displayed }}<span class="aura-type__caret" /></span>
</template>

<style scoped>
.aura-type {
  display: inline-flex;
  align-items: center;
  color: var(--aura-primary-2);
}
.aura-type__caret {
  display: inline-block;
  width: 2px;
  height: 1.05em;
  margin-left: 3px;
  background: var(--aura-primary-2);
  animation: aura-blink 1s steps(2, start) infinite;
}
@keyframes aura-blink {
  50% {
    opacity: 0;
  }
}
</style>
