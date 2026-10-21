<script setup lang="ts">
import { provide, ref } from 'vue'

interface TabMeta {
  id: string
  label: string
}

const props = withDefaults(
  defineProps<{
    modelValue?: string
  }>(),
  { modelValue: '' }
)

const emit = defineEmits<{ (e: 'update:modelValue', value: string): void }>()

const active = ref(props.modelValue)
const tabs = ref<TabMeta[]>([])

provide('aura-tabs', {
  active,
  register: (id: string, label: string) => {
    if (!tabs.value.find((t) => t.id === id)) {
      tabs.value.push({ id, label })
      if (!active.value) active.value = id
    }
  },
  select: (id: string) => {
    active.value = id
    emit('update:modelValue', id)
  }
})

function select(id: string) {
  active.value = id
  emit('update:modelValue', id)
}
</script>

<template>
  <div class="aura-tabs">
    <div class="aura-tabs__nav" role="tablist">
      <button
        v-for="t in tabs"
        :key="t.id"
        class="aura-tabs__tab"
        :class="{ 'is-active': active === t.id }"
        type="button"
        role="tab"
        :aria-selected="active === t.id"
        @click="select(t.id)"
      >
        {{ t.label }}
      </button>
    </div>
    <div class="aura-tabs__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.aura-tabs {
  width: 100%;
}
.aura-tabs__nav {
  display: flex;
  gap: 4px;
  padding: 4px;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.06);
  width: fit-content;
}
.aura-tabs__tab {
  padding: 8px 16px;
  border: none;
  border-radius: 9px;
  background: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.25s ease;
}
.aura-tabs__tab.is-active {
  background: linear-gradient(135deg, #7c5cff, #4ad9ff);
  color: #fff;
  box-shadow: 0 6px 16px rgba(124, 92, 255, 0.35);
}
.aura-tabs__body {
  margin-top: 16px;
}
</style>
