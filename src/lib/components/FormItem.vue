<script setup lang="ts">
import { inject, ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export interface FormRule {
  required?: boolean
  type?: 'string' | 'number' | 'boolean' | 'array' | 'email' | 'url'
  min?: number
  max?: number
  len?: number
  pattern?: RegExp
  message?: string
  trigger?: 'change' | 'blur' | 'submit'
  validator?: (rule: FormRule, value: any) => boolean | string | Promise<boolean | string>
}

const props = withDefaults(
  defineProps<{ prop?: string; label?: string; rules?: FormRule[] }>(),
  { label: '', rules: () => [] }
)

interface FormCtx {
  model: Record<string, any>
  rules: Record<string, FormRule[]>
  labelWidth?: string
  labelPosition?: 'top' | 'left'
  addField: (f: any) => void
  removeField: (f: any) => void
}

const form = inject<FormCtx | null>('aura-form', null)
const error = ref('')
const validating = ref(false)

const fieldRules = computed<FormRule[]>(() => {
  const key = props.prop
  const fromForm = (key && form?.rules && form.rules[key]) || []
  const fromItem = props.rules || []
  return [...fromForm, ...fromItem]
})
const isRequired = computed(() => fieldRules.value.some(r => r.required))

function getValue(): any {
  const key = props.prop
  return key && form?.model ? form.model[key] : undefined
}

function isEmpty(v: any): boolean {
  if (v === null || v === undefined) return true
  if (typeof v === 'string') return v.trim() === ''
  if (Array.isArray(v)) return v.length === 0
  if (typeof v === 'boolean') return v === false
  return false
}

function typeCheck(rule: FormRule, v: any): string | true {
  if (!rule.type) return true
  switch (rule.type) {
    case 'string':
      return typeof v === 'string' ? true : 'must be a string'
    case 'number':
      return typeof v === 'number' && !isNaN(v) ? true : 'must be a number'
    case 'boolean':
      return typeof v === 'boolean' ? true : 'must be a boolean'
    case 'array':
      return Array.isArray(v) ? true : 'must be an array'
    case 'email':
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? true : 'must be a valid email'
    case 'url':
      try {
        new URL(v)
        return true
      } catch {
        return 'must be a valid URL'
      }
  }
  return true
}

async function runRule(rule: FormRule, value: any): Promise<string | true> {
  if (rule.required && isEmpty(value)) return rule.message || 'This field is required'
  if (isEmpty(value)) return true
  const t = typeCheck(rule, value)
  if (t !== true) return rule.message || t
  if (rule.min !== undefined || rule.max !== undefined || rule.len !== undefined) {
    const l = typeof value === 'string' || Array.isArray(value) ? value.length : Number(value)
    if (rule.len !== undefined && l !== rule.len) return rule.message || `length must be ${rule.len}`
    if (rule.min !== undefined && l < rule.min) return rule.message || `minimum is ${rule.min}`
    if (rule.max !== undefined && l > rule.max) return rule.message || `maximum is ${rule.max}`
  }
  if (rule.pattern && !rule.pattern.test(String(value))) return rule.message || 'invalid format'
  if (rule.validator) {
    const r = await rule.validator(rule, value)
    if (r !== true) return typeof r === 'string' ? r : rule.message || 'invalid'
  }
  return true
}

async function validate(): Promise<boolean> {
  const rules = fieldRules.value
  if (!rules.length) {
    error.value = ''
    return true
  }
  validating.value = true
  try {
    const value = getValue()
    for (const rule of rules) {
      const res = await runRule(rule, value)
      if (res !== true) {
        error.value = res
        return false
      }
    }
    error.value = ''
    return true
  } finally {
    validating.value = false
  }
}

function reset() {
  error.value = ''
}

function runTrigger(t: 'change' | 'blur') {
  const rules = fieldRules.value.filter(r => (r.trigger || 'submit') === t)
  if (rules.length) validate()
}

function onFocusOut() {
  runTrigger('blur')
}

watch(getValue, () => {
  if (error.value) validate()
  else runTrigger('change')
})

onMounted(() =>
  form?.addField?.({ validate, reset, prop: props.prop })
)
onBeforeUnmount(() =>
  form?.removeField?.({ validate, reset, prop: props.prop })
)

defineExpose({ validate, reset })
</script>

<template>
  <div
    class="aura-form-item"
    :class="[
      `aura-form-item--${form?.labelPosition || 'top'}`,
      { 'is-error': !!error, 'is-required': isRequired, 'is-validating': validating }
    ]"
    :style="{ '--aura-label-width': form?.labelWidth }"
    @focusout="onFocusOut"
  >
    <label v-if="label" class="aura-form-item__label">{{ label }}</label>
    <div class="aura-form-item__content">
      <slot />
      <transition name="aura-fade">
        <p v-if="error" class="aura-form-item__error">{{ error }}</p>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.aura-form-item {
  margin-bottom: 18px;
}
.aura-form-item--top .aura-form-item__label {
  display: block;
  margin-bottom: 6px;
  font-size: 0.85rem;
  color: var(--aura-text-dim);
}
.aura-form-item--left {
  display: flex;
  align-items: flex-start;
}
.aura-form-item--left .aura-form-item__label {
  width: var(--aura-label-width);
  flex: none;
  padding-top: 12px;
}
.aura-form-item--left .aura-form-item__content {
  flex: 1;
}
.aura-form-item.is-required .aura-form-item__label::after {
  content: '*';
  color: var(--aura-danger);
  margin-left: 4px;
}
.aura-form-item__error {
  margin-top: 5px;
  font-size: 0.8rem;
  color: var(--aura-danger);
}
.aura-form-item.is-error :deep(.aura-input) {
  border-color: var(--aura-danger);
}
.aura-form-item.is-error :deep(.aura-select__control) {
  border-color: var(--aura-danger);
}
.aura-form-item.is-error :deep(.aura-input__label) {
  color: var(--aura-danger);
}
.aura-fade-enter-active,
.aura-fade-leave-active {
  transition: opacity 0.2s, transform 0.2s;
}
.aura-fade-enter-from,
.aura-fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
