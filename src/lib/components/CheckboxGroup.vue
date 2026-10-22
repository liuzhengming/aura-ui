<script setup lang="ts">
import { provide, ref, watch, toRef } from 'vue'

const props = withDefaults(
  defineProps<{
    modelValue?: (string | number)[]
    disabled?: boolean
    vertical?: boolean
  }>(),
  { modelValue: () => [], disabled: false, vertical: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: (string | number)[]): void }>()

const value = ref<(string | number)[]>(props.modelValue ?? [])
watch(
  () => props.modelValue,
  (v) => {
    value.value = v ?? []
  }
)

provide('auraCheckboxGroup', {
  value,
  includes: (v: string | number) => value.value.includes(v),
  toggle: (v: string | number) => {
    const idx = value.value.indexOf(v)
    if (idx >= 0) value.value.splice(idx, 1)
    else value.value.push(v)
    emit('update:modelValue', [...value.value])
  },
  disabled: toRef(props, 'disabled')
})
</script>

<template>
  <div class="aura-checkbox-group" :class="{ 'is-vertical': vertical }" role="group">
    <slot />
  </div>
</template>

<style scoped>
.aura-checkbox-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px 18px;
}
.aura-checkbox-group.is-vertical {
  flex-direction: column;
  align-items: flex-start;
}
</style>
