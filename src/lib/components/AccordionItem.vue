<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{
  title: string
  id?: string
}>()

interface AccordionApi {
  multiple: boolean
  isOpen: (id: string) => boolean
  toggle: (id: string) => void
}

const accordion = inject<AccordionApi>('aura-accordion')
const uid = props.id ?? `acc-${Math.random().toString(36).slice(2)}`
const isOpen = computed(() => accordion?.isOpen(uid) ?? false)

function onClick() {
  accordion?.toggle(uid)
}
</script>

<template>
  <div class="aura-accordion-item" :class="{ 'is-open': isOpen }">
    <button class="aura-accordion__header" type="button" :aria-expanded="isOpen" @click="onClick">
      <span class="aura-accordion__title">{{ title }}</span>
      <span class="aura-accordion__icon" aria-hidden="true"></span>
    </button>
    <div class="aura-accordion__panel" :style="{ gridTemplateRows: isOpen ? '1fr' : '0fr' }">
      <div class="aura-accordion__panel-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.aura-accordion-item {
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.03);
  overflow: hidden;
  transition: border-color 0.3s ease, background 0.3s ease;
}
.aura-accordion-item.is-open {
  border-color: rgba(124, 92, 255, 0.45);
  background: rgba(124, 92, 255, 0.06);
}
.aura-accordion__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 16px 18px;
  border: none;
  background: none;
  color: inherit;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  text-align: left;
}
.aura-accordion__icon {
  position: relative;
  width: 14px;
  height: 14px;
  flex: none;
}
.aura-accordion__icon::before,
.aura-accordion__icon::after {
  content: '';
  position: absolute;
  background: currentColor;
  border-radius: 2px;
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.aura-accordion__icon::before {
  top: 6px;
  left: 0;
  width: 14px;
  height: 2px;
}
.aura-accordion__icon::after {
  top: 0;
  left: 6px;
  width: 2px;
  height: 14px;
}
.aura-accordion-item.is-open .aura-accordion__icon::after {
  transform: scaleY(0);
  opacity: 0;
}
.aura-accordion__panel {
  display: grid;
  transition: grid-template-rows 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.aura-accordion__panel-inner {
  overflow: hidden;
  min-height: 0;
}
.aura-accordion__panel-inner > :deep(*) {
  padding: 0 18px 18px;
  margin: 0;
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.7;
}
</style>
