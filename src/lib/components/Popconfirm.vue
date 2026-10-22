<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    confirmText?: string
    cancelText?: string
    placement?: 'top' | 'bottom' | 'left' | 'right'
  }>(),
  { title: 'Are you sure?', confirmText: 'Confirm', cancelText: 'Cancel', placement: 'top' }
)

const emit = defineEmits<{ (e: 'confirm'): void; (e: 'cancel'): void }>()

const visible = ref(false)
const triggerRef = ref<HTMLElement | null>(null)

function toggle() {
  visible.value = !visible.value
}
function confirm() {
  visible.value = false
  emit('confirm')
}
function cancel() {
  visible.value = false
  emit('cancel')
}

function onDocClick(e: MouseEvent) {
  if (!visible.value) return
  const t = e.target as Node
  if (triggerRef.value && !triggerRef.value.contains(t)) visible.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="triggerRef" class="aura-popconfirm">
    <div class="aura-popconfirm__trigger" @click.stop="toggle">
      <slot />
    </div>
    <transition name="aura-pop">
      <div
        v-if="visible"
        class="aura-popconfirm__pop aura-glass"
        :class="`placement-${placement}`"
        @click.stop
      >
        <p class="aura-popconfirm__title">{{ title }}</p>
        <div class="aura-popconfirm__actions">
          <button type="button" class="aura-popconfirm__btn is-cancel" @click="cancel">
            {{ cancelText }}
          </button>
          <button type="button" class="aura-popconfirm__btn is-confirm" @click="confirm">
            {{ confirmText }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.aura-popconfirm {
  position: relative;
  display: inline-block;
}
.aura-popconfirm__pop {
  position: absolute;
  z-index: 1000;
  min-width: 200px;
  padding: 14px 16px;
  border-radius: var(--aura-radius-sm);
  box-shadow: var(--aura-shadow);
}
.aura-popconfirm__pop.placement-top {
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 10px;
}
.aura-popconfirm__pop.placement-bottom {
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 10px;
}
.aura-popconfirm__pop.placement-left {
  right: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-right: 10px;
}
.aura-popconfirm__pop.placement-right {
  left: 100%;
  top: 50%;
  transform: translateY(-50%);
  margin-left: 10px;
}
.aura-popconfirm__title {
  margin: 0 0 12px;
  font-size: 0.9rem;
  color: var(--aura-text);
}
.aura-popconfirm__actions {
  display: flex;
  justify-content: flex-end;
  gap: 8px;
}
.aura-popconfirm__btn {
  min-height: 32px;
  padding: 0 14px;
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text-dim);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.2s var(--aura-ease);
}
.aura-popconfirm__btn.is-confirm {
  border-color: transparent;
  background: var(--aura-gradient);
  color: #fff;
}
.aura-popconfirm__btn:hover {
  filter: brightness(1.08);
}
.aura-pop-enter-active,
.aura-pop-leave-active {
  transition: opacity 0.18s var(--aura-ease), transform 0.18s var(--aura-ease);
}
.aura-pop-enter-from,
.aura-pop-leave-to {
  opacity: 0;
}
.aura-pop-enter-from.placement-top,
.aura-pop-leave-to.placement-top {
  transform: translateX(-50%) translateY(6px);
}
.aura-pop-enter-from.placement-bottom,
.aura-pop-leave-to.placement-bottom {
  transform: translateX(-50%) translateY(-6px);
}
</style>
