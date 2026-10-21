<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    value?: number | string
    dot?: boolean
    max?: number
    type?: 'primary' | 'success' | 'warning' | 'error' | 'info'
  }>(),
  { max: 99, type: 'error' }
)

const display = computed(() => {
  if (props.dot) return ''
  if (typeof props.value === 'number' && props.value > props.max) return props.max + '+'
  return props.value
})
</script>

<template>
  <span class="aura-badge">
    <slot />
    <span
      v-if="dot"
      class="aura-badge__dot"
      :class="`is-${type}`"
    />
    <span
      v-else-if="value !== undefined && value !== ''"
      class="aura-badge__count"
      :class="`is-${type}`"
    >{{ display }}</span>
  </span>
</template>

<style scoped>
.aura-badge {
  position: relative;
  display: inline-flex;
  vertical-align: middle;
}
.aura-badge__dot {
  position: absolute;
  top: 0;
  right: 0;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  border: 2px solid var(--aura-bg);
  transform: translate(35%, -35%);
}
.aura-badge__count {
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(50%, -50%);
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  font-size: 11px;
  line-height: 18px;
  text-align: center;
  font-weight: 600;
  color: #fff;
  border-radius: 999px;
  border: 2px solid var(--aura-bg);
  box-sizing: content-box;
}
.is-primary { background: var(--aura-primary); }
.is-success { background: #2ecc71; }
.is-warning { background: #f1c40f; color: #1a1a1a; }
.is-error { background: #ff5c5c; }
.is-info { background: #00d4ff; color: #06222b; }
</style>
