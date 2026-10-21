<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    words: string[]
    typeSpeed?: number
    deleteSpeed?: number
    pause?: number
  }>(),
  { typeSpeed: 90, deleteSpeed: 45, pause: 1400 }
)

const text = ref('')
let wordIndex = 0
let charIndex = 0
let deleting = false
let timer = 0

function loop() {
  const word = props.words[wordIndex % props.words.length]
  if (!deleting) {
    charIndex++
    text.value = word.slice(0, charIndex)
    if (charIndex === word.length) {
      deleting = true
      timer = window.setTimeout(loop, props.pause)
    } else {
      timer = window.setTimeout(loop, props.typeSpeed)
    }
  } else {
    charIndex--
    text.value = word.slice(0, charIndex)
    if (charIndex === 0) {
      deleting = false
      wordIndex++
      timer = window.setTimeout(loop, 320)
    } else {
      timer = window.setTimeout(loop, props.deleteSpeed)
    }
  }
}

onMounted(() => {
  timer = window.setTimeout(loop, props.pause)
})
onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <span class="aura-type">{{ text }}<span class="aura-type__caret" /></span>
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
