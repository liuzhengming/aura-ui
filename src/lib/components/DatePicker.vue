<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    placeholder?: string
    disabled?: boolean
  }>(),
  { modelValue: '', placeholder: 'Select date', disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const open = ref(false)
const triggerRef = ref<HTMLElement | null>(null)
const today = new Date()
const viewYear = ref(today.getFullYear())
const viewMonth = ref(today.getMonth())

const monthName = computed(
  () => `${viewYear.value}-${String(viewMonth.value + 1).padStart(2, '0')}`
)

const days = computed(() => {
  const first = new Date(viewYear.value, viewMonth.value, 1)
  const startWeekday = first.getDay()
  const daysInMonth = new Date(viewYear.value, viewMonth.value + 1, 0).getDate()
  const cells: {
    day: number | null
    dateStr: string
    isToday: boolean
    isSelected: boolean
  }[] = []
  for (let i = 0; i < startWeekday; i++) {
    cells.push({ day: null, dateStr: '', isToday: false, isSelected: false })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const ds = `${viewYear.value}-${String(viewMonth.value + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const isToday =
      today.getFullYear() === viewYear.value &&
      today.getMonth() === viewMonth.value &&
      today.getDate() === d
    const isSelected = props.modelValue === ds
    cells.push({ day: d, dateStr: ds, isToday, isSelected })
  }
  return cells
})

const display = computed(() => props.modelValue || props.placeholder)

function prevMonth() {
  if (viewMonth.value === 0) {
    viewMonth.value = 11
    viewYear.value--
  } else viewMonth.value--
}
function nextMonth() {
  if (viewMonth.value === 11) {
    viewMonth.value = 0
    viewYear.value++
  } else viewMonth.value++
}
function pick(ds: string) {
  emit('update:modelValue', ds)
  open.value = false
}

function onDocClick(e: MouseEvent) {
  if (!open.value) return
  const t = e.target as Node
  if (triggerRef.value && !triggerRef.value.contains(t)) open.value = false
}

onMounted(() => document.addEventListener('click', onDocClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocClick))
</script>

<template>
  <div ref="triggerRef" class="aura-datepicker" :class="{ 'is-disabled': disabled }">
    <button
      type="button"
      class="aura-datepicker__trigger"
      :disabled="disabled"
      @click.stop="open = !open"
    >
      <span :class="{ 'is-placeholder': !modelValue }">{{ display }}</span>
      <svg class="aura-datepicker__icon" viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
        <rect x="3" y="4" width="18" height="17" rx="2" fill="none" stroke="currentColor" stroke-width="1.6" />
        <path d="M3 9h18M8 2v4M16 2v4" stroke="currentColor" stroke-width="1.6" />
      </svg>
    </button>
    <transition name="aura-pop">
      <div v-if="open" class="aura-datepicker__panel aura-glass" @click.stop>
        <div class="aura-datepicker__header">
          <button type="button" class="aura-datepicker__nav" @click="prevMonth">‹</button>
          <span class="aura-datepicker__title">{{ monthName }}</span>
          <button type="button" class="aura-datepicker__nav" @click="nextMonth">›</button>
        </div>
        <div class="aura-datepicker__grid aura-datepicker__weekdays">
          <span v-for="w in ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']" :key="w">{{ w }}</span>
        </div>
        <div class="aura-datepicker__grid">
          <button
            v-for="(c, i) in days"
            :key="i"
            type="button"
            class="aura-datepicker__cell"
            :class="{
              'is-empty': c.day === null,
              'is-today': c.isToday,
              'is-selected': c.isSelected
            }"
            :disabled="c.day === null"
            @click="c.day && pick(c.dateStr)"
          >
            {{ c.day ?? '' }}
          </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.aura-datepicker {
  position: relative;
  display: inline-block;
}
.aura-datepicker.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.aura-datepicker__trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  min-width: 200px;
  min-height: var(--aura-tap-min);
  padding: 0 14px;
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text);
  font-size: 0.92rem;
  cursor: pointer;
  transition: border-color 0.2s var(--aura-ease);
}
.aura-datepicker__trigger:hover {
  border-color: var(--aura-border-strong);
}
.aura-datepicker__trigger .is-placeholder {
  color: var(--aura-text-faint);
}
.aura-datepicker__icon {
  color: var(--aura-text-dim);
}
.aura-datepicker__panel {
  position: absolute;
  z-index: 1000;
  top: 100%;
  left: 0;
  margin-top: 8px;
  width: 280px;
  padding: 14px;
  border-radius: var(--aura-radius-sm);
  box-shadow: var(--aura-shadow);
}
.aura-datepicker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.aura-datepicker__title {
  font-size: 0.95rem;
  font-weight: 600;
}
.aura-datepicker__nav {
  width: 30px;
  height: 30px;
  border: 1px solid var(--aura-border);
  border-radius: 8px;
  background: var(--aura-surface);
  color: var(--aura-text);
  cursor: pointer;
  font-size: 1.1rem;
  line-height: 1;
}
.aura-datepicker__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.aura-datepicker__weekdays {
  margin-bottom: 4px;
  color: var(--aura-text-faint);
  font-size: 0.72rem;
  text-align: center;
}
.aura-datepicker__cell {
  aspect-ratio: 1;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--aura-text);
  font-size: 0.85rem;
  cursor: pointer;
  transition: background 0.15s var(--aura-ease);
}
.aura-datepicker__cell:hover:not(.is-empty):not(:disabled) {
  background: var(--aura-surface-2);
}
.aura-datepicker__cell.is-empty {
  cursor: default;
}
.aura-datepicker__cell.is-today {
  box-shadow: inset 0 0 0 1px var(--aura-primary);
}
.aura-datepicker__cell.is-selected {
  background: var(--aura-gradient);
  color: #fff;
}
@media (max-width: 640px) {
  .aura-datepicker__panel {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto;
    width: 100%;
    margin: 0;
    border-radius: var(--aura-radius-lg) var(--aura-radius-lg) 0 0;
  }
}
</style>
