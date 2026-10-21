<script setup lang="ts">
import { ref, computed, watch, onBeforeUnmount } from 'vue'

export interface SelectOption {
  label: string
  value: string | number
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{
    modelValue?: string | number | null
    options: (SelectOption | string)[]
    placeholder?: string
    disabled?: boolean
  }>(),
  { modelValue: null, placeholder: 'Please select', disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()

function normalize(o: SelectOption | string): SelectOption {
  return typeof o === 'string' ? { label: o, value: o } : o
}
const normalized = computed(() => props.options.map(normalize))
const selected = computed(() => normalized.value.find((o) => o.value === props.modelValue))

const open = ref(false)
const rootRef = ref<HTMLElement | null>(null)
const activeIndex = ref(0)

function toggle() {
  if (props.disabled) return
  open.value ? close() : openMenu()
}
function openMenu() {
  open.value = true
  const idx = normalized.value.findIndex((o) => o.value === props.modelValue)
  activeIndex.value = idx >= 0 ? idx : 0
  document.addEventListener('click', onDocClick)
}
function close() {
  open.value = false
  document.removeEventListener('click', onDocClick)
}
function onDocClick(e: MouseEvent) {
  if (rootRef.value && !rootRef.value.contains(e.target as Node)) close()
}
function pick(o: SelectOption) {
  if (o.disabled) return
  emit('update:modelValue', o.value)
  close()
}
function onKey(e: KeyboardEvent) {
  if (!open.value) {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      e.preventDefault()
      openMenu()
    }
    return
  }
  if (e.key === 'Escape') close()
  else if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % normalized.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + normalized.value.length) % normalized.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    const o = normalized.value[activeIndex.value]
    if (o && !o.disabled) pick(o)
  }
}

watch(open, (v) => {
  if (!v) document.removeEventListener('click', onDocClick)
})
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="rootRef" class="aura-select" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <button
      type="button"
      class="aura-select__trigger"
      :disabled="disabled"
      @click="toggle"
      @keydown="onKey"
    >
      <span :class="{ 'is-placeholder': !selected }">{{ selected ? selected.label : placeholder }}</span>
      <span class="aura-select__caret" :class="{ 'is-open': open }">▾</span>
    </button>
    <Transition name="aura-select-pop">
      <ul v-if="open" class="aura-select__list" role="listbox">
        <li
          v-for="(o, i) in normalized"
          :key="String(o.value)"
          class="aura-select__item"
          :class="{ 'is-active': i === activeIndex, 'is-selected': o.value === modelValue, 'is-disabled': o.disabled }"
          role="option"
          :aria-selected="o.value === modelValue"
          @mouseenter="activeIndex = i"
          @click="pick(o)"
        >
          {{ o.label }}
        </li>
        <li v-if="normalized.length === 0" class="aura-select__empty">No options</li>
      </ul>
    </Transition>
  </div>
</template>

<style scoped>
.aura-select {
  position: relative;
  display: inline-block;
  min-width: 200px;
}
.aura-select__trigger {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  width: 100%;
  padding: 11px 14px;
  border-radius: var(--aura-radius-sm);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  color: var(--aura-text);
  font-size: 0.95rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s var(--aura-ease), box-shadow 0.2s var(--aura-ease);
}
.aura-select.is-open .aura-select__trigger,
.aura-select__trigger:focus {
  outline: none;
  border-color: var(--aura-primary);
  box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.18);
}
.aura-select.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.aura-select__trigger .is-placeholder {
  color: var(--aura-text-faint);
}
.aura-select__caret {
  transition: transform 0.25s var(--aura-ease);
  color: var(--aura-text-dim);
}
.aura-select__caret.is-open {
  transform: rotate(180deg);
}
.aura-select__list {
  position: absolute;
  z-index: 60;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  margin: 0;
  padding: 6px;
  list-style: none;
  border-radius: var(--aura-radius-sm);
  background: var(--aura-bg-elev);
  border: 1px solid var(--aura-border);
  box-shadow: var(--aura-shadow);
  max-height: 260px;
  overflow-y: auto;
}
.aura-select__item {
  padding: 9px 12px;
  border-radius: 8px;
  font-size: 0.92rem;
  cursor: pointer;
  color: var(--aura-text);
}
.aura-select__item.is-active {
  background: var(--aura-surface-2);
}
.aura-select__item.is-selected {
  color: var(--aura-primary-2);
  font-weight: 600;
}
.aura-select__item.is-disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.aura-select__empty {
  padding: 12px;
  text-align: center;
  color: var(--aura-text-faint);
  font-size: 0.9rem;
}
.aura-select-pop-enter-active,
.aura-select-pop-leave-active {
  transition: opacity 0.18s var(--aura-ease), transform 0.18s var(--aura-ease);
}
.aura-select-pop-enter-from,
.aura-select-pop-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
