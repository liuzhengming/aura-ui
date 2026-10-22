<script setup lang="ts">
import { provide, ref, computed, watch } from 'vue'
import { useBreakpoint } from '../breakpoint'

const props = withDefaults(
  defineProps<{
    mode?: 'horizontal' | 'vertical'
    collapsible?: boolean
    defaultActive?: string
  }>(),
  { mode: 'vertical', collapsible: false, defaultActive: '' }
)

const bp = useBreakpoint()
const isMobile = computed(() => bp.value === 'xs' || bp.value === 'sm')

const active = ref(props.defaultActive)
const collapsed = ref(false)

watch(
  isMobile,
  v => {
    if (props.collapsible) collapsed.value = v
  },
  { immediate: true }
)

function select(key: string) {
  active.value = key
  if (isMobile.value) collapsed.value = true
}
function toggle() {
  collapsed.value = !collapsed.value
}

provide('aura-menu', { active, select, collapsed })

const listVisible = computed(() => (props.collapsible ? !collapsed.value : true))
</script>

<template>
  <nav
    class="aura-menu"
    :class="[`aura-menu--${mode}`, { 'is-collapsed': collapsible && collapsed }]"
  >
    <button
      v-if="collapsible"
      type="button"
      class="aura-menu__toggle"
      :aria-expanded="!collapsed"
      :aria-label="collapsed ? 'Expand menu' : 'Collapse menu'"
      @click="toggle"
    >
      <span></span><span></span><span></span>
    </button>
    <ul v-show="listVisible" class="aura-menu__list">
      <slot />
    </ul>
  </nav>
</template>

<style scoped>
.aura-menu {
  display: block;
}
.aura-menu__list {
  list-style: none;
  margin: 0;
  padding: 0;
}
.aura-menu--horizontal .aura-menu__list {
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.aura-menu__toggle {
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  gap: 4px;
  width: 40px;
  height: 40px;
  margin-bottom: 8px;
  padding: 0 9px;
  border: 1px solid var(--aura-border);
  border-radius: var(--aura-radius-sm);
  background: var(--aura-surface);
  cursor: pointer;
}
.aura-menu__toggle span {
  display: block;
  height: 2px;
  border-radius: 2px;
  background: var(--aura-text);
}
</style>
