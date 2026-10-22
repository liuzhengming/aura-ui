<script setup lang="ts">
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    desc?: string
    disabled?: boolean
  }>(),
  { title: '', desc: '', disabled: false }
)

const slots = useSlots()
</script>

<template>
  <div class="aura-list-item" :class="{ 'is-disabled': disabled }">
    <span v-if="slots.avatar" class="aura-list-item__avatar">
      <slot name="avatar" />
    </span>
    <div class="aura-list-item__main">
      <div class="aura-list-item__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div v-if="desc || slots.desc" class="aura-list-item__desc">
        <slot name="desc">{{ desc }}</slot>
      </div>
    </div>
    <div v-if="slots.extra" class="aura-list-item__extra">
      <slot name="extra" />
    </div>
    <div v-if="slots.action" class="aura-list-item__action">
      <slot name="action" />
    </div>
  </div>
</template>

<style scoped>
.aura-list-item {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  transition: background 0.2s var(--aura-ease);
}
.aura-list.has-split .aura-list-item:not(:last-child) {
  border-bottom: 1px solid var(--aura-border);
}
.aura-list-item:hover {
  background: var(--aura-surface-2);
}
.aura-list-item.is-disabled {
  opacity: 0.45;
  pointer-events: none;
}
.aura-list-item__avatar {
  display: inline-flex;
  flex: none;
}
.aura-list-item__main {
  flex: 1;
  min-width: 0;
}
.aura-list-item__title {
  font-size: 0.95rem;
  color: var(--aura-text);
}
.aura-list-item__desc {
  margin-top: 3px;
  font-size: 0.83rem;
  color: var(--aura-text-faint);
}
.aura-list-item__extra {
  flex: none;
  color: var(--aura-text-dim);
}
.aura-list-item__action {
  flex: none;
}
</style>
