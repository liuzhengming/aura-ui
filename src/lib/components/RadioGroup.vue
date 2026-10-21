<script setup lang="ts">
import { provide, ref, watch, toRef } from 'vue'

const props = withDefaults(
  defineProps<{ modelValue?: string | number | null; disabled?: boolean; vertical?: boolean }>(),
  { modelValue: null, disabled: false, vertical: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: string | number): void }>()

const value = ref<string | number | null>(props.modelValue)
watch(
  () => props.modelValue,
  (v) => (value.value = v)
)

provide('auraRadioGroup', {
  value,
  set: (v: string | number) => {
    value.value = v
    emit('update:modelValue', v)
  },
  disabled: toRef(props, 'disabled')
})
</script>

<template>
  <div class="aura-radio-group" :class="{ 'is-vertical': vertical }" role="radiogroup">
    <slot />
  </div>
</template>

<style scoped>
.aura-radio-group {
  display: inline-flex;
  flex-wrap: wrap;
  gap: 10px 18px;
}
.aura-radio-group.is-vertical {
  flex-direction: column;
  align-items: flex-start;
}
</style>
