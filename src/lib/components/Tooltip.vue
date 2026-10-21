<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{
    side?: 'top' | 'bottom' | 'left' | 'right'
    text?: string
  }>(),
  { side: 'top', text: '' }
)

const visible = ref(false)
</script>

<template>
  <span
    class="aura-tooltip"
    @mouseenter="visible = true"
    @mouseleave="visible = false"
    @focusin="visible = true"
    @focusout="visible = false"
  >
    <span class="aura-tooltip__trigger" tabindex="0"><slot /></span>
    <Transition name="aura-tooltip-pop">
      <span v-if="visible" class="aura-tooltip__bubble" :class="`aura-tooltip__bubble--${side}`" role="tooltip">
        <slot name="content">{{ text }}</slot>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.aura-tooltip {
  position: relative;
  display: inline-flex;
}
.aura-tooltip__trigger {
  display: inline-flex;
  outline: none;
}
.aura-tooltip__bubble {
  position: absolute;
  z-index: 50;
  padding: 6px 10px;
  font-size: 13px;
  line-height: 1.4;
  white-space: nowrap;
  color: #fff;
  background: rgba(20, 22, 34, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  pointer-events: none;
}
.aura-tooltip__bubble::after {
  content: '';
  position: absolute;
  width: 8px;
  height: 8px;
  background: rgba(20, 22, 34, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transform: rotate(45deg);
}
.aura-tooltip__bubble--top {
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
.aura-tooltip__bubble--top::after {
  top: 100%;
  left: 50%;
  margin-left: -4px;
  margin-top: -4px;
  border-top: none;
  border-left: none;
}
.aura-tooltip__bubble--bottom {
  top: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
}
.aura-tooltip__bubble--bottom::after {
  bottom: 100%;
  left: 50%;
  margin-left: -4px;
  margin-bottom: -4px;
  border-bottom: none;
  border-right: none;
}
.aura-tooltip__bubble--left {
  right: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}
.aura-tooltip__bubble--left::after {
  left: 100%;
  top: 50%;
  margin-top: -4px;
  margin-left: -4px;
  border-bottom: none;
  border-left: none;
}
.aura-tooltip__bubble--right {
  left: calc(100% + 8px);
  top: 50%;
  transform: translateY(-50%);
}
.aura-tooltip__bubble--right::after {
  right: 100%;
  top: 50%;
  margin-top: -4px;
  margin-right: -4px;
  border-top: none;
  border-right: none;
}
.aura-tooltip-pop-enter-active,
.aura-tooltip-pop-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.aura-tooltip-pop-enter-from,
.aura-tooltip-pop-leave-to {
  opacity: 0;
}
.aura-tooltip-pop-enter-from.aura-tooltip__bubble--top,
.aura-tooltip-pop-leave-to.aura-tooltip__bubble--top {
  transform: translateX(-50%) translateY(4px);
}
.aura-tooltip-pop-enter-from.aura-tooltip__bubble--bottom,
.aura-tooltip-pop-leave-to.aura-tooltip__bubble--bottom {
  transform: translateX(-50%) translateY(-4px);
}
.aura-tooltip-pop-enter-from.aura-tooltip__bubble--left,
.aura-tooltip-pop-leave-to.aura-tooltip__bubble--left,
.aura-tooltip-pop-enter-from.aura-tooltip__bubble--right,
.aura-tooltip-pop-leave-to.aura-tooltip__bubble--right {
  transform: translateY(-50%) translateX(4px);
}
</style>
