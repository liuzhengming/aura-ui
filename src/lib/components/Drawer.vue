<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    title?: string
    side?: 'left' | 'right' | 'top' | 'bottom'
  }>(),
  { side: 'right' }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

function close() {
  emit('update:modelValue', false)
}
function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') close()
}
watch(
  () => props.modelValue,
  (v) => {
    if (v) window.addEventListener('keydown', onKey)
    else window.removeEventListener('keydown', onKey)
  }
)
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>

<template>
  <Teleport to="body">
    <Transition :name="`aura-drawer-${side}`">
      <div v-if="modelValue" class="aura-drawer__mask" @click.self="close">
        <aside class="aura-drawer__panel aura-glass" :class="`is-${side}`" role="dialog" aria-modal="true">
          <header class="aura-drawer__head">
            <h3>{{ title }}</h3>
            <button class="aura-drawer__x" type="button" aria-label="close" @click="close">×</button>
          </header>
          <div class="aura-drawer__body">
            <slot />
          </div>
        </aside>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.aura-drawer__mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.aura-drawer__panel {
  position: absolute;
  background: var(--aura-bg-elev);
  box-shadow: var(--aura-shadow);
  display: flex;
  flex-direction: column;
}
.aura-drawer__panel.is-left,
.aura-drawer__panel.is-right {
  top: 0;
  bottom: 0;
  width: min(420px, 90vw);
}
.aura-drawer__panel.is-left { left: 0; }
.aura-drawer__panel.is-right { right: 0; }
.aura-drawer__panel.is-top,
.aura-drawer__panel.is-bottom {
  left: 0;
  right: 0;
  height: min(60vh, 420px);
}
.aura-drawer__panel.is-top { top: 0; }
.aura-drawer__panel.is-bottom { bottom: 0; }
.aura-drawer__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.3rem;
  border-bottom: 1px solid var(--aura-border);
}
.aura-drawer__head h3 {
  margin: 0;
  font-size: 1.1rem;
}
.aura-drawer__x {
  border: none;
  background: transparent;
  color: var(--aura-text-dim);
  font-size: 1.4rem;
  cursor: pointer;
}
.aura-drawer__x:hover { color: var(--aura-text); }
.aura-drawer__body {
  padding: 1.3rem;
  overflow-y: auto;
  color: var(--aura-text-dim);
  line-height: 1.7;
}

/* transitions */
.aura-drawer-right-enter-active,
.aura-drawer-right-leave-active,
.aura-drawer-left-enter-active,
.aura-drawer-left-leave-active,
.aura-drawer-top-enter-active,
.aura-drawer-top-leave-active,
.aura-drawer-bottom-enter-active,
.aura-drawer-bottom-leave-active {
  transition: opacity 0.3s var(--aura-ease);
}
.aura-drawer-right-enter-active .aura-drawer__panel,
.aura-drawer-right-leave-active .aura-drawer__panel,
.aura-drawer-left-enter-active .aura-drawer__panel,
.aura-drawer-left-leave-active .aura-drawer__panel,
.aura-drawer-top-enter-active .aura-drawer__panel,
.aura-drawer-top-leave-active .aura-drawer__panel,
.aura-drawer-bottom-enter-active .aura-drawer__panel,
.aura-drawer-bottom-leave-active .aura-drawer__panel {
  transition: transform 0.35s var(--aura-ease-spring);
}
.aura-drawer-right-enter-from .aura-drawer__panel,
.aura-drawer-right-leave-to .aura-drawer__panel { transform: translateX(100%); }
.aura-drawer-left-enter-from .aura-drawer__panel,
.aura-drawer-left-leave-to .aura-drawer__panel { transform: translateX(-100%); }
.aura-drawer-top-enter-from .aura-drawer__panel,
.aura-drawer-top-leave-to .aura-drawer__panel { transform: translateY(-100%); }
.aura-drawer-bottom-enter-from .aura-drawer__panel,
.aura-drawer-bottom-leave-to .aura-drawer__panel { transform: translateY(100%); }
</style>
