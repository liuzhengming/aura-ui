<script setup lang="ts">
import { ref } from 'vue'

const props = withDefaults(
  defineProps<{ modelValue?: boolean; label?: string; disabled?: boolean }>(),
  { modelValue: false, disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: boolean): void }>()

const checkRef = ref<SVGPathElement | null>(null)

function toggle() {
  if (props.disabled) return
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <label class="aura-checkbox" :class="{ 'is-checked': modelValue, disabled }">
    <input
      class="aura-checkbox__native"
      type="checkbox"
      :checked="modelValue"
      :disabled="disabled"
      @change="toggle"
    />
    <span class="aura-checkbox__box" @click="toggle">
      <svg viewBox="0 0 24 24" class="aura-checkbox__svg">
        <path
          ref="checkRef"
          d="M5 12.5 L10 17.5 L19 7"
          fill="none"
          stroke="currentColor"
          stroke-width="2.6"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="aura-checkbox__tick"
          :class="{ 'is-on': modelValue }"
        />
      </svg>
    </span>
    <span v-if="label || $slots.default" class="aura-checkbox__label" @click="toggle">
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>

<style scoped>
.aura-checkbox {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  user-select: none;
}
.aura-checkbox.disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
.aura-checkbox__native {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
}
.aura-checkbox__box {
  position: relative;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  background: var(--aura-surface);
  border: 1.5px solid var(--aura-border-strong);
  color: #fff;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: background 0.25s var(--aura-ease), border-color 0.25s var(--aura-ease),
    transform 0.3s var(--aura-ease-spring);
}
.aura-checkbox.is-checked .aura-checkbox__box {
  background: var(--aura-gradient);
  border-color: transparent;
}
.aura-checkbox.is-checked:active .aura-checkbox__box {
  transform: scale(0.88);
}
.aura-checkbox__svg {
  width: 18px;
  height: 18px;
}
.aura-checkbox__tick {
  stroke-dasharray: 26;
  stroke-dashoffset: 26;
  transition: stroke-dashoffset 0.35s var(--aura-ease-spring);
}
.aura-checkbox__tick.is-on {
  stroke-dashoffset: 0;
}
.aura-checkbox__label {
  font-size: 0.95rem;
  color: var(--aura-text);
}
</style>
