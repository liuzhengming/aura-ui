<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: string
    label?: string
    placeholder?: string
    type?: string
    rows?: number
    disabled?: boolean
  }>(),
  { modelValue: '', placeholder: '', type: 'text', rows: 3, disabled: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string): void }>()

const focused = ref(false)
const hasValue = computed(() => props.modelValue.length > 0)
const floated = computed(() => focused.value || hasValue.value)
const isTextarea = computed(() => props.type === 'textarea')

function onInput(e: Event) {
  emit('update:modelValue', (e.target as HTMLInputElement | HTMLTextAreaElement).value)
}
</script>

<template>
  <div
    class="aura-input"
    :class="{
      'is-focused': focused,
      'is-filled': hasValue,
      'is-disabled': disabled,
      'is-textarea': isTextarea
    }"
  >
    <label v-if="label" class="aura-input__label" :class="{ 'is-float': floated }">
      {{ label }}
    </label>
    <textarea
      v-if="isTextarea"
      class="aura-input__field aura-input__textarea"
      :value="modelValue"
      :rows="rows"
      :placeholder="floated ? placeholder : ''"
      :disabled="disabled"
      @focus="focused = true"
      @blur="focused = false"
      @input="onInput"
    />
    <input
      v-else
      class="aura-input__field"
      :type="type"
      :value="modelValue"
      :placeholder="floated ? placeholder : ''"
      :disabled="disabled"
      @focus="focused = true"
      @blur="focused = false"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.aura-input {
  position: relative;
  display: block;
  padding: 18px 14px 10px;
  border-radius: var(--aura-radius-sm);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  transition: border-color 0.25s var(--aura-ease), box-shadow 0.25s var(--aura-ease),
    background 0.25s var(--aura-ease);
}
.aura-input.is-focused {
  border-color: var(--aura-primary);
  box-shadow: 0 0 0 4px rgba(124, 92, 255, 0.18);
  background: var(--aura-surface-2);
}
.aura-input.is-disabled {
  opacity: 0.5;
  pointer-events: none;
}
.aura-input__label {
  position: absolute;
  left: 14px;
  top: 16px;
  font-size: 0.95rem;
  color: var(--aura-text-faint);
  pointer-events: none;
  transform-origin: left center;
  transition: transform 0.22s var(--aura-ease), color 0.22s var(--aura-ease);
}
.aura-input__label.is-float {
  transform: translateY(-12px) scale(0.8);
  color: var(--aura-primary);
}
.aura-input__field {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: var(--aura-text);
  font-size: 0.95rem;
  font-family: inherit;
}
.aura-input__field::placeholder {
  color: var(--aura-text-faint);
}
.aura-input__textarea {
  display: block;
  min-height: 84px;
  line-height: 1.55;
  resize: vertical;
  padding: 2px 0;
}
</style>
