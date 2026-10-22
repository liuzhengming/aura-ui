<script setup lang="ts">
withDefaults(
  defineProps<{
    type?: 'default' | 'primary' | 'success' | 'warning' | 'error' | 'info'
    href?: string
    target?: string
    underline?: 'hover' | 'always' | 'never'
    disabled?: boolean
  }>(),
  { type: 'default', underline: 'hover', disabled: false }
)
</script>

<template>
  <component
    :is="href && !disabled ? 'a' : 'span'"
    class="aura-link"
    :class="[`is-${type}`, `underline-${underline}`, { 'is-disabled': disabled }]"
    :href="href && !disabled ? href : undefined"
    :target="target"
    :rel="target === '_blank' ? 'noopener noreferrer' : undefined"
  >
    <slot />
  </component>
</template>

<style scoped>
.aura-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--aura-primary-2);
  cursor: pointer;
  font-size: inherit;
  text-decoration: none;
  transition: color 0.2s var(--aura-ease), opacity 0.2s var(--aura-ease);
}
.aura-link.is-default {
  color: var(--aura-text);
}
.aura-link.is-primary {
  color: var(--aura-primary);
}
.aura-link.is-success {
  color: #2ecc71;
}
.aura-link.is-warning {
  color: #f1c40f;
}
.aura-link.is-error {
  color: #ff5c5c;
}
.aura-link.is-info {
  color: var(--aura-primary-2);
}
.aura-link.underline-hover:hover {
  text-decoration: underline;
}
.aura-link.underline-always {
  text-decoration: underline;
}
.aura-link.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}
</style>
