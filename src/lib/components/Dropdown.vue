<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

export interface DropdownItem {
  label: string
  icon?: string
  disabled?: boolean
  divided?: boolean
}

const props = defineProps<{ items: DropdownItem[] }>()
const emit = defineEmits<{ (e: 'select', item: DropdownItem): void }>()

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
function pick(item: DropdownItem) {
  if (item.disabled) return
  emit('select', item)
  close()
}
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <span ref="rootRef" class="aura-dropdown">
    <span class="aura-dropdown__trigger" @click="toggle"><slot /></span>
    <Transition name="aura-dropdown-pop">
      <ul v-if="open" class="aura-dropdown__menu" role="menu">
        <template v-for="(item, i) in items" :key="i">
          <li v-if="item.divided && i > 0" class="aura-dropdown__divider" />
          <li
            class="aura-dropdown__item"
            :class="{ 'is-disabled': item.disabled }"
            role="menuitem"
            @click="pick(item)"
          >
            <span v-if="item.icon" class="aura-dropdown__icon">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </li>
        </template>
      </ul>
    </Transition>
  </span>
</template>

<style scoped>
.aura-dropdown {
  position: relative;
  display: inline-block;
}
.aura-dropdown__trigger {
  display: inline-flex;
  cursor: pointer;
}
.aura-dropdown__menu {
  position: absolute;
  z-index: 80;
  top: calc(100% + 8px);
  left: 0;
  min-width: 180px;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: var(--aura-radius-sm);
  background: var(--aura-bg-elev);
  border: 1px solid var(--aura-border);
  box-shadow: var(--aura-shadow);
}
.aura-dropdown__item {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 0.9rem;
  color: var(--aura-text);
  cursor: pointer;
}
.aura-dropdown__item:hover {
  background: var(--aura-surface-2);
}
.aura-dropdown__item.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.aura-dropdown__icon {
  color: var(--aura-text-dim);
}
.aura-dropdown__divider {
  height: 1px;
  margin: 5px 8px;
  background: var(--aura-border);
}
.aura-dropdown-pop-enter-active,
.aura-dropdown-pop-leave-active {
  transition: opacity 0.18s var(--aura-ease), transform 0.18s var(--aura-ease);
}
.aura-dropdown-pop-enter-from,
.aura-dropdown-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
