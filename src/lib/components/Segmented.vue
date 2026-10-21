<script setup lang="ts">
import { ref, computed } from 'vue'

type Option = string | number | { label: string; value: string | number }

const props = withDefaults(
  defineProps<{ modelValue?: string | number; options: Option[]; disabled?: boolean }>(),
  { modelValue: '', disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()

function norm(o: Option): { label: string; value: string | number } {
  return typeof o === 'object' ? o : { label: String(o), value: o }
}
const items = computed(() => props.options.map(norm))
const currentIndex = computed(() => Math.max(0, items.value.findIndex((i) => i.value === props.modelValue)))

function select(v: string | number) {
  if (props.disabled) return
  emit('update:modelValue', v)
}
</script>

<template>
  <div class="aura-segmented" :class="{ 'is-disabled': disabled }" role="tablist">
    <span
      class="aura-segmented__pill"
      :style="{ width: 100 / items.length + '%', transform: `translateX(${currentIndex * 100}%)` }"
    />
    <button
      v-for="item in items"
      :key="String(item.value)"
      type="button"
      class="aura-segmented__item"
      :class="{ 'is-active': item.value === modelValue }"
      :disabled="disabled"
      role="tab"
      :aria-selected="item.value === modelValue"
      @click="select(item.value)"
    >
      {{ item.label }}
    </button>
  </div>
</template>

<style scoped>
.aura-segmented {
  position: relative;
  display: inline-flex;
  padding: 4px;
  border-radius: var(--aura-radius-pill);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
}
.aura-segmented.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.aura-segmented__pill {
  position: absolute;
  top: 4px;
  left: 4px;
  bottom: 4px;
  border-radius: var(--aura-radius-pill);
  background: var(--aura-gradient);
  box-shadow: var(--aura-shadow-glow);
  transition: transform 0.35s var(--aura-ease-spring);
}
.aura-segmented__item {
  position: relative;
  z-index: 1;
  flex: 1;
  border: none;
  background: transparent;
  color: var(--aura-text-dim);
  font-size: 0.9rem;
  font-family: inherit;
  padding: 7px 16px;
  border-radius: var(--aura-radius-pill);
  cursor: pointer;
  transition: color 0.25s var(--aura-ease);
  white-space: nowrap;
}
.aura-segmented__item.is-active {
  color: #fff;
  font-weight: 600;
}
</style>
