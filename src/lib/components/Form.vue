<script setup lang="ts">
import { provide, reactive, watch } from 'vue'
import type { FormRule } from './FormItem.vue'

const props = withDefaults(
  defineProps<{
    model: Record<string, any>
    rules?: Record<string, FormRule[]>
    labelWidth?: string
    labelPosition?: 'top' | 'left'
  }>(),
  { rules: () => ({}), labelWidth: '120px', labelPosition: 'top' }
)

export interface FormFieldApi {
  validate: () => Promise<boolean>
  reset: () => void
  prop: string
}

const fields = new Set<FormFieldApi>()

const ctx = reactive({
  model: props.model as Record<string, any>,
  rules: props.rules as Record<string, FormRule[]>,
  labelWidth: props.labelWidth,
  labelPosition: props.labelPosition as 'top' | 'left',
  addField: (f: FormFieldApi) => void fields.add(f),
  removeField: (f: FormFieldApi) => void fields.delete(f)
})

watch(() => props.labelWidth, v => (ctx.labelWidth = v))
watch(
  () => props.labelPosition,
  v => (ctx.labelPosition = v as 'top' | 'left')
)
watch(
  () => props.rules,
  v => (ctx.rules = v as Record<string, FormRule[]>)
)
watch(
  () => props.model,
  v => (ctx.model = v as Record<string, any>)
)

async function validate(): Promise<boolean> {
  const results = await Promise.all(Array.from(fields).map(f => f.validate()))
  return results.every(Boolean)
}

function resetFields() {
  fields.forEach(f => f.reset())
}

defineExpose({ validate, resetFields })
provide('aura-form', ctx)
</script>

<template>
  <form class="aura-form" novalidate @submit.prevent>
    <slot />
  </form>
</template>

<style scoped>
.aura-form {
  display: block;
}
</style>
