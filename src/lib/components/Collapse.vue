<script setup lang="ts">
import { ref, provide, watch, type Ref } from 'vue'

const props = withDefaults(
  defineProps<{ modelValue?: (string | number)[]; accordion?: boolean }>(),
  { modelValue: () => [], accordion: false }
)

const emit = defineEmits<{ (e: 'update:modelValue', v: (string | number)[]): void }>()

const active = ref<(string | number)[]>([...props.modelValue])

// expose reactive state + handlers to CollapseItem via provide/inject
provide('aura-collapse', {
  active: active as Ref<(string | number)[]>,
  isActive: (name: string | number) => active.value.includes(name),
  toggle: (name: string | number) => {
    if (props.accordion) {
      active.value = active.value.includes(name) ? [] : [name]
    } else {
      const i = active.value.indexOf(name)
      if (i > -1) active.value.splice(i, 1)
      else active.value.push(name)
    }
    emit('update:modelValue', [...active.value])
  }
})

watch(
  () => props.modelValue,
  (v) => {
    active.value = [...(v || [])]
  }
)
</script>

<template>
  <div class="aura-collapse">
    <slot />
  </div>
</template>

<style scoped>
.aura-collapse {
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  overflow: hidden;
}
</style>
