<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

const props = defineProps<{ name: string | number; title?: string; disabled?: boolean }>()

interface CollapseCtx {
  active: Ref<(string | number)[]>
  isActive: (name: string | number) => boolean
  toggle: (name: string | number) => void
}

const ctx = inject<CollapseCtx>('aura-collapse')!
const open = computed(() => ctx.isActive(props.name))
</script>

<template>
  <div class="aura-collapse-item" :class="{ 'is-open': open, 'is-disabled': disabled }">
    <button class="aura-collapse-head" type="button" :disabled="disabled" @click="ctx.toggle(name)">
      <span class="aura-collapse-title">
        <slot name="title">{{ title }}</slot>
      </span>
      <span class="aura-collapse-arrow" :class="{ open }">▾</span>
    </button>
    <div class="aura-collapse-body" :class="{ open }">
      <div class="aura-collapse-body-inner">
        <slot />
      </div>
    </div>
  </div>
</template>

<style scoped>
.aura-collapse-item + .aura-collapse-item {
  border-top: 1px solid var(--aura-border);
}
.aura-collapse-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 14px 16px;
  background: transparent;
  border: none;
  color: var(--aura-text);
  font-size: 0.95rem;
  font-family: inherit;
  font-weight: 550;
  text-align: left;
  cursor: pointer;
}
.aura-collapse-head:disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.aura-collapse-arrow {
  color: var(--aura-text-faint);
  transition: transform 0.25s var(--aura-ease);
  font-size: 0.9rem;
}
.aura-collapse-arrow.open {
  transform: rotate(180deg);
}
.aura-collapse-body {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.28s var(--aura-ease);
}
.aura-collapse-body.open {
  grid-template-rows: 1fr;
}
.aura-collapse-body-inner {
  overflow: hidden;
  min-height: 0;
}
.aura-collapse-item :deep(.aura-collapse-body-inner) > * {
  padding: 0 16px 16px;
}
</style>
