<script setup lang="ts">
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    bordered?: boolean
    split?: boolean
    loading?: boolean
    emptyText?: string
  }>(),
  { bordered: true, split: true, loading: false, emptyText: 'No data' }
)

const slots = useSlots()
</script>

<template>
  <div class="aura-list" :class="{ 'is-bordered': bordered, 'has-split': split }">
    <div v-if="loading" class="aura-list__loading">
      <span class="aura-list__spinner" />
    </div>
    <template v-else>
      <slot />
      <div v-if="!slots.default" class="aura-list__empty">{{ emptyText }}</div>
    </template>
  </div>
</template>

<style scoped>
.aura-list {
  border-radius: var(--aura-radius);
  background: var(--aura-surface);
  overflow: hidden;
}
.aura-list.is-bordered {
  border: 1px solid var(--aura-border);
}
.aura-list__loading {
  display: flex;
  justify-content: center;
  padding: 28px;
}
.aura-list__spinner {
  width: 22px;
  height: 22px;
  border: 2px solid var(--aura-border-strong);
  border-top-color: var(--aura-primary);
  border-radius: 50%;
  animation: aura-list-spin 0.7s linear infinite;
}
@keyframes aura-list-spin {
  to {
    transform: rotate(360deg);
  }
}
.aura-list__empty {
  padding: 28px;
  text-align: center;
  color: var(--aura-text-faint);
  font-size: 0.9rem;
}
</style>
