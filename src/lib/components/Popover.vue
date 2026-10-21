<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    side?: 'top' | 'bottom' | 'left' | 'right'
    title?: string
  }>(),
  { side: 'bottom' }
)

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)

function toggle() {
  open.value ? close() : openMenu()
}
function openMenu() {
  open.value = true
  document.addEventListener('click', onDocClick)
}
function close() {
  open.value = false
  document.removeEventListener('click', onDocClick)
}
function onDocClick(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) close()
}
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <span ref="rootRef" class="aura-popover">
    <span class="aura-popover__trigger" @click="toggle"><slot name="trigger" /></span>
    <Transition name="aura-popover-pop">
      <div v-if="open" class="aura-popover__panel aura-glass" :class="`is-${side}`" role="dialog">
        <div v-if="title" class="aura-popover__title">{{ title }}</div>
        <div class="aura-popover__content"><slot /></div>
      </div>
    </Transition>
  </span>
</template>

<style scoped>
.aura-popover {
  position: relative;
  display: inline-block;
}
.aura-popover__trigger {
  display: inline-flex;
  cursor: pointer;
}
.aura-popover__panel {
  position: absolute;
  z-index: 80;
  width: max-content;
  max-width: 280px;
  padding: 12px 14px;
  border-radius: var(--aura-radius-sm);
  background: var(--aura-bg-elev);
  border: 1px solid var(--aura-border);
  box-shadow: var(--aura-shadow);
  color: var(--aura-text-dim);
  font-size: 0.9rem;
  line-height: 1.6;
}
.aura-popover__title {
  font-weight: 600;
  color: var(--aura-text);
  margin-bottom: 4px;
}
.aura-popover__panel.is-bottom { top: calc(100% + 10px); left: 50%; transform: translateX(-50%); }
.aura-popover__panel.is-top { bottom: calc(100% + 10px); left: 50%; transform: translateX(-50%); }
.aura-popover__panel.is-left { right: calc(100% + 10px); top: 50%; transform: translateY(-50%); }
.aura-popover__panel.is-right { left: calc(100% + 10px); top: 50%; transform: translateY(-50%); }
.aura-popover-pop-enter-active,
.aura-popover-pop-leave-active {
  transition: opacity 0.2s var(--aura-ease), transform 0.2s var(--aura-ease);
}
.aura-popover-pop-enter-from,
.aura-popover-pop-leave-to {
  opacity: 0;
}
.aura-popover-pop-enter-from.is-bottom,
.aura-popover-pop-leave-to.is-bottom { transform: translateX(-50%) translateY(-6px); }
.aura-popover-pop-enter-from.is-top,
.aura-popover-pop-leave-to.is-top { transform: translateX(-50%) translateY(6px); }
.aura-popover-pop-enter-from.is-left,
.aura-popover-pop-leave-to.is-left { transform: translateY(-50%) translateX(6px); }
.aura-popover-pop-enter-from.is-right,
.aura-popover-pop-leave-to.is-right { transform: translateY(-50%) translateX(-6px); }
</style>
