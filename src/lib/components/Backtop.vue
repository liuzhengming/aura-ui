<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    visibilityHeight?: number
    right?: string
    bottom?: string
    target?: string
  }>(),
  { visibilityHeight: 200, right: '24px', bottom: '24px' }
)

const visible = ref(false)
let scrollEl: Window | HTMLElement | null = null

function getScrollTop(): number {
  if (!scrollEl) return 0
  if (scrollEl === window) return window.scrollY || document.documentElement.scrollTop || 0
  return (scrollEl as HTMLElement).scrollTop
}

function onScroll() {
  visible.value = getScrollTop() >= props.visibilityHeight
}

function toTop() {
  const top = 0
  if (scrollEl === window) {
    window.scrollTo({ top, behavior: 'smooth' })
  } else if (scrollEl) {
    ;(scrollEl as HTMLElement).scrollTo({ top, behavior: 'smooth' })
  }
}

onMounted(() => {
  scrollEl = props.target ? (document.querySelector(props.target) as HTMLElement | null) : window
  scrollEl?.addEventListener('scroll', onScroll)
  onScroll()
})
onBeforeUnmount(() => scrollEl?.removeEventListener('scroll', onScroll))
</script>

<template>
  <Transition name="aura-backtop">
    <button
      v-if="visible"
      class="aura-backtop"
      type="button"
      :aria-label="'Back to top'"
      :style="{ right, bottom: `calc(${bottom} + var(--aura-safe-bottom))` }"
      @click="toTop"
    >
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  </Transition>
</template>

<style scoped>
.aura-backtop {
  position: fixed;
  z-index: 90;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--aura-border);
  background: var(--aura-bg-elev);
  color: var(--aura-text);
  cursor: pointer;
  box-shadow: var(--aura-shadow);
  backdrop-filter: blur(10px);
  transition: transform 0.2s var(--aura-ease), border-color 0.2s var(--aura-ease);
}
.aura-backtop:hover {
  transform: translateY(-2px);
  border-color: var(--aura-border-strong);
}
.aura-backtop-enter-active,
.aura-backtop-leave-active {
  transition: opacity 0.25s var(--aura-ease), transform 0.25s var(--aura-ease);
}
.aura-backtop-enter-from,
.aura-backtop-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
