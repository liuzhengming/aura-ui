<script setup lang="ts">
import { provide, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    multiple?: boolean
    modelValue?: string[]
  }>(),
  { multiple: false, modelValue: () => [] }
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string[]): void }>()

const open = ref<string[]>([...props.modelValue])

provide('aura-accordion', {
  multiple: props.multiple,
  isOpen: (id: string) => open.value.includes(id),
  toggle: (id: string) => {
    if (open.value.includes(id)) {
      open.value = open.value.filter((i) => i !== id)
    } else {
      open.value = props.multiple ? [...open.value, id] : [id]
    }
    emit('update:modelValue', [...open.value])
  }
})
</script>

<template>
  <div class="aura-accordion">
    <slot />
  </div>
</template>

<style scoped>
.aura-accordion {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
}
</style>
