<script setup lang="ts">
import { ref, computed, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{ modelValue?: string; weekdays?: string[] }>(),
  { weekdays: () => ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'] }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void; (e: 'select', v: string): void }>()

const today = new Date()
const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`
const view = ref({ y: today.getFullYear(), m: today.getMonth() })
const selected = ref(props.modelValue || todayStr)

function pad(n: number) {
  return n < 10 ? '0' + n : '' + n
}
function ymd(y: number, m: number, d: number) {
  return `${y}-${pad(m + 1)}-${pad(d)}`
}

const weeks = computed<({ day: number; date: string; inMonth: boolean } | null)[][]>(() => {
  const first = new Date(view.value.y, view.value.m, 1)
  const startDay = first.getDay()
  const daysInMonth = new Date(view.value.y, view.value.m + 1, 0).getDate()
  const cells: ({ day: number; date: string; inMonth: boolean } | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, date: ymd(view.value.y, view.value.m, d), inMonth: true })
  while (cells.length % 7 !== 0) cells.push(null)
  const res: ({ day: number; date: string; inMonth: boolean } | null)[][] = []
  for (let i = 0; i < cells.length; i += 7) res.push(cells.slice(i, i + 7))
  return res
})

const monthLabel = computed(() => `${view.value.y} / ${view.value.m + 1}`)

function prev() {
  if (view.value.m === 0) {
    view.value = { y: view.value.y - 1, m: 11 }
  } else {
    view.value = { y: view.value.y, m: view.value.m - 1 }
  }
}
function next() {
  if (view.value.m === 11) {
    view.value = { y: view.value.y + 1, m: 0 }
  } else {
    view.value = { y: view.value.y, m: view.value.m + 1 }
  }
}
function select(date: string) {
  selected.value = date
  emit('update:modelValue', date)
  emit('select', date)
}
</script>

<template>
  <div class="aura-calendar">
    <div class="aura-calendar__head">
      <button class="aura-cal-btn" type="button" aria-label="Previous month" @click="prev">‹</button>
      <span class="aura-calendar__label">{{ monthLabel }}</span>
      <button class="aura-cal-btn" type="button" aria-label="Next month" @click="next">›</button>
    </div>
    <div class="aura-calendar__grid aura-calendar__weekdays">
      <span v-for="(w, i) in weekdays" :key="i" class="aura-cal-cell aura-cal-weekday">{{ w }}</span>
    </div>
    <div class="aura-calendar__grid">
      <template v-for="(week, wi) in weeks" :key="wi">
        <span
          v-for="(cell, ci) in week"
          :key="ci"
          class="aura-cal-cell"
          :class="{
            'is-empty': !cell,
            'is-today': cell && cell.date === todayStr,
            'is-selected': cell && cell.date === selected
          }"
          @click="cell && select(cell.date)"
        >
          {{ cell ? cell.day : '' }}
        </span>
      </template>
    </div>
  </div>
</template>

<style scoped>
.aura-calendar {
  width: 100%;
  max-width: 340px;
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  padding: 14px;
  box-sizing: border-box;
}
.aura-calendar__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
}
.aura-calendar__label {
  font-weight: 600;
  font-size: 0.95rem;
}
.aura-cal-btn {
  width: var(--aura-tap-min);
  height: var(--aura-tap-min);
  border-radius: 10px;
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text);
  font-size: 1.1rem;
  cursor: pointer;
  transition: border-color 0.2s var(--aura-ease);
}
.aura-cal-btn:hover {
  border-color: var(--aura-border-strong);
}
.aura-calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 2px;
}
.aura-cal-weekday {
  color: var(--aura-text-faint);
  font-size: 0.78rem;
  font-weight: 600;
  text-align: center;
  padding: 4px 0;
}
.aura-cal-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 38px;
  border-radius: 9px;
  font-size: 0.88rem;
  color: var(--aura-text);
  cursor: pointer;
  transition: background 0.18s var(--aura-ease), color 0.18s var(--aura-ease);
}
.aura-cal-cell:not(.is-empty):hover {
  background: var(--aura-surface-2);
}
.aura-cal-cell.is-empty {
  cursor: default;
}
.aura-cal-cell.is-today {
  color: var(--aura-primary-2);
  font-weight: 700;
}
.aura-cal-cell.is-selected {
  background: var(--aura-gradient);
  color: #fff;
  font-weight: 600;
}
</style>
