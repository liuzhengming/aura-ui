<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue: number
    total: number
    pageSize?: number
    maxButtons?: number
  }>(),
  { pageSize: 10, maxButtons: 7 }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: number): void }>()

const pageCount = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const pages = computed<(number | '...')[]>(() => {
  const total = pageCount.value
  const max = Math.min(props.maxButtons, total)
  const cur = props.modelValue
  if (total <= max) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }
  const left = Math.max(2, cur - Math.floor((max - 2) / 2))
  const right = Math.min(total - 1, left + max - 3)
  const start = Math.max(2, right - (max - 3))
  const res: (number | '...')[] = [1]
  if (start > 2) res.push('...')
  for (let i = start; i <= right; i++) res.push(i)
  if (right < total - 1) res.push('...')
  res.push(total)
  return res
})

function go(p: number) {
  if (p >= 1 && p <= pageCount.value && p !== props.modelValue) {
    emit('update:modelValue', p)
  }
}
</script>

<template>
  <nav class="aura-pagination" :aria-label="'Pagination'">
    <button class="aura-page-btn" type="button" :disabled="modelValue <= 1" @click="go(modelValue - 1)">
      ‹
    </button>
    <template v-for="(p, i) in pages" :key="i">
      <span v-if="p === '...'" class="aura-page-ellipsis">…</span>
      <button
        v-else
        class="aura-page-btn"
        type="button"
        :class="{ 'is-active': p === modelValue }"
        @click="go(p)"
      >
        {{ p }}
      </button>
    </template>
    <button class="aura-page-btn" type="button" :disabled="modelValue >= pageCount" @click="go(modelValue + 1)">
      ›
    </button>
  </nav>
</template>

<style scoped>
.aura-pagination {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.aura-page-btn {
  min-width: var(--aura-tap-min);
  height: var(--aura-tap-min);
  padding: 0 10px;
  border-radius: 10px;
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text);
  font-size: 0.9rem;
  font-family: inherit;
  cursor: pointer;
  transition: border-color 0.2s var(--aura-ease), background 0.2s var(--aura-ease), color 0.2s var(--aura-ease);
}
.aura-page-btn:hover:not(:disabled):not(.is-active) {
  border-color: var(--aura-border-strong);
  color: var(--aura-text);
}
.aura-page-btn.is-active {
  background: var(--aura-gradient);
  border-color: transparent;
  color: #fff;
  font-weight: 600;
}
.aura-page-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
.aura-page-ellipsis {
  padding: 0 4px;
  color: var(--aura-text-faint);
}
</style>
