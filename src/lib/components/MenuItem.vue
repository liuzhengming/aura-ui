<script setup lang="ts">
import { inject, ref, computed } from 'vue'
import MenuItem from './MenuItem.vue'

const props = withDefaults(
  defineProps<{
    itemKey?: string
    label?: string
    disabled?: boolean
    children?: any[]
  }>(),
  { itemKey: '', label: '', disabled: false, children: () => [] }
)

const menu = inject<any>('aura-menu', null)
const hasChildren = computed(() => Array.isArray(props.children) && props.children.length > 0)
const open = ref(false)
const isActive = computed(() => menu?.active?.value === props.itemKey)

function onClick() {
  if (props.disabled) return
  if (hasChildren.value) open.value = !open.value
  else if (props.itemKey) menu?.select?.(props.itemKey)
}
</script>

<template>
  <li
    class="aura-menu__item"
    :class="{ 'is-active': isActive, 'is-open': open, 'is-disabled': disabled }"
  >
    <div
      class="aura-menu__row"
      role="button"
      :tabindex="disabled ? -1 : 0"
      :aria-expanded="hasChildren ? open : undefined"
      @click="onClick"
      @keydown.enter.prevent="onClick"
    >
      <span v-if="$slots.icon" class="aura-menu__icon"><slot name="icon" /></span>
      <span class="aura-menu__label">{{ label }}</span>
      <span v-if="hasChildren" class="aura-menu__arrow" aria-hidden="true">›</span>
    </div>
    <ul v-if="hasChildren && open" class="aura-menu__sublist">
      <MenuItem v-for="c in children" :key="c.itemKey" v-bind="c" />
    </ul>
  </li>
</template>

<style scoped>
.aura-menu__item {
  list-style: none;
}
.aura-menu__row {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: var(--aura-tap-min);
  padding: 0 14px;
  border-radius: var(--aura-radius-sm);
  color: var(--aura-text-dim);
  cursor: pointer;
  transition: background 0.2s var(--aura-ease), color 0.2s var(--aura-ease);
  user-select: none;
}
.aura-menu__row:hover {
  background: var(--aura-surface-2);
  color: var(--aura-text);
}
.aura-menu__item.is-active > .aura-menu__row {
  color: var(--aura-text);
  background: linear-gradient(120deg, rgba(124, 92, 255, 0.22), rgba(0, 212, 255, 0.16));
  box-shadow: inset 0 0 0 1px rgba(124, 92, 255, 0.35);
}
.aura-menu__item.is-disabled > .aura-menu__row {
  opacity: 0.4;
  cursor: not-allowed;
}
.aura-menu__icon {
  display: inline-flex;
  width: 18px;
  height: 18px;
  color: inherit;
}
.aura-menu__icon :deep(svg) {
  width: 100%;
  height: 100%;
}
.aura-menu__label {
  flex: 1;
  font-size: 0.92rem;
}
.aura-menu--horizontal .aura-menu__row {
  border-radius: var(--aura-radius-pill);
}
.aura-menu__arrow {
  font-size: 1.1rem;
  line-height: 1;
  transition: transform 0.25s var(--aura-ease);
}
.aura-menu__item.is-open > .aura-menu__row .aura-menu__arrow {
  transform: rotate(90deg);
}
.aura-menu__sublist {
  list-style: none;
  margin: 2px 0 2px 14px;
  padding: 0 0 0 10px;
  border-left: 1px solid var(--aura-border);
}
</style>
