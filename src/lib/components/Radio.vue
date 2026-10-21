<script setup lang="ts">
import { inject, computed } from 'vue'

const props = defineProps<{ value: string | number; label?: string; disabled?: boolean }>()

const group = inject<{
  value: { value: string | number | null }
  set: (v: string | number) => void
  disabled: { value: boolean }
}>('auraRadioGroup')

const checked = computed(() => !!group && group.value.value === props.value)
const disabled = computed(() => props.disabled || (!!group && group.disabled.value))

function select() {
  if (disabled.value) return
  group?.set(props.value)
}
</script>

<template>
  <label class="aura-radio" :class="{ 'is-checked': checked, disabled }">
    <input
      class="aura-radio__native"
      type="radio"
      :checked="checked"
      :disabled="disabled"
      @change="select"
    />
    <span class="aura-radio__dot" @click="select">
      <span class="aura-radio__inner" :class="{ 'is-on': checked }" />
    </span>
    <span v-if="label || $slots.default" class="aura-radio__label" @click="select">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.aura-radio {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  cursor: pointer;
  user-select: none;
}
.aura-radio.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.aura-radio__native {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.aura-radio__dot {
  position: relative;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--aura-surface);
  border: 1.5px solid var(--aura-border-strong);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: border-color 0.2s var(--aura-ease);
}
.aura-radio.is-checked .aura-radio__dot {
  border-color: var(--aura-primary);
}
.aura-radio__inner {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--aura-gradient);
  transform: scale(0);
  transition: transform 0.3s var(--aura-ease-spring);
}
.aura-radio__inner.is-on {
  transform: scale(1);
}
.aura-radio__label {
  font-size: 0.95rem;
  color: var(--aura-text);
}
</style>
