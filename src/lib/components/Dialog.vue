<script setup lang="ts">
import { watch, onBeforeUnmount } from 'vue'

const props = defineProps<{ modelValue: boolean; title?: string }>()
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
    <Transition name="aura-dialog">
      <div v-if="modelValue" class="aura-dialog__mask" @click.self="close">
        <div class="aura-dialog__panel aura-glass" role="dialog" aria-modal="true">
          <header class="aura-dialog__head">
            <h3>{{ title }}</h3>
            <button class="aura-dialog__x" type="button" @click="close" aria-label="关闭">×</button>
          </header>
          <div class="aura-dialog__body">
            <slot />
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.aura-dialog__mask {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
.aura-dialog__panel {
  width: min(520px, 100%);
  border-radius: var(--aura-radius-lg);
  padding: 1.6rem;
  box-shadow: var(--aura-shadow);
}
.aura-dialog__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.aura-dialog__head h3 {
  margin: 0;
  font-size: 1.2rem;
}
.aura-dialog__x {
  background: transparent;
  border: none;
  color: var(--aura-text-dim);
  font-size: 1.5rem;
  line-height: 1;
  cursor: pointer;
  transition: color 0.2s var(--aura-ease);
}
.aura-dialog__x:hover {
  color: var(--aura-text);
}
.aura-dialog__body {
  color: var(--aura-text-dim);
  line-height: 1.7;
}
.aura-dialog-enter-active,
.aura-dialog-leave-active {
  transition: opacity 0.25s var(--aura-ease);
}
.aura-dialog-enter-active .aura-dialog__panel,
.aura-dialog-leave-active .aura-dialog__panel {
  transition: transform 0.35s var(--aura-ease-spring);
}
.aura-dialog-enter-from,
.aura-dialog-leave-to {
  opacity: 0;
}
.aura-dialog-enter-from .aura-dialog__panel,
.aura-dialog-leave-to .aura-dialog__panel {
  transform: scale(0.9) translateY(10px);
}
</style>
