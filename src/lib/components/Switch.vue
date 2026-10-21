<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    modelValue?: boolean
    disabled?: boolean
    size?: 'sm' | 'md' | 'lg'
    label?: string
  }>(),
  { modelValue: false, disabled: false, size: 'md', label: '' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'change', value: boolean): void
}>()

function toggle() {
  if (props.disabled) return
  const next = !props.modelValue
  emit('update:modelValue', next)
  emit('change', next)
}
</script>

<template>
  <button
    type="button"
    class="aura-switch"
    :class="[`aura-switch--${size}`, { 'is-on': modelValue, 'is-disabled': disabled }]"
    role="switch"
    :aria-checked="modelValue"
    :aria-label="label || undefined"
    :disabled="disabled"
    @click="toggle"
  >
    <span class="aura-switch__track">
      <span class="aura-switch__thumb"></span>
    </span>
  </button>
</template>

<style scoped>
.aura-switch {
  --w: 46px;
  --h: 26px;
  --pad: 3px;
  display: inline-flex;
  align-items: center;
  padding: 0;
  border: none;
  background: none;
  cursor: pointer;
}
.aura-switch--sm {
  --w: 36px;
  --h: 20px;
  --pad: 2px;
}
.aura-switch--lg {
  --w: 58px;
  --h: 32px;
  --pad: 4px;
}
.aura-switch__track {
  position: relative;
  width: var(--w);
  height: var(--h);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.12);
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  transition: background 0.3s ease;
}
.aura-switch__thumb {
  position: absolute;
  top: var(--pad);
  left: var(--pad);
  width: calc(var(--h) - 2 * var(--pad));
  height: calc(var(--h) - 2 * var(--pad));
  border-radius: 50%;
  background: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
  transition: transform 0.32s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.aura-switch.is-on .aura-switch__track {
  background: linear-gradient(135deg, #7c5cff, #4ad9ff);
  box-shadow: inset 0 0 0 1px rgba(124, 92, 255, 0.4);
}
.aura-switch.is-on .aura-switch__thumb {
  transform: translateX(calc(var(--w) - var(--h)));
}
.aura-switch.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
</style>
