<script setup lang="ts">
defineProps<{ keys?: string }>()
</script>

<template>
  <span class="aura-kbd">
    <slot>{{ keys }}</slot>
  </span>
</template>

<style scoped>
.aura-kbd {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 22px;
  padding: 3px 8px;
  font-family: var(--aura-mono);
  font-size: 0.78rem;
  color: var(--aura-text);
  background: var(--aura-surface-2);
  border: 1px solid var(--aura-border);
  border-bottom-width: 2px;
  border-radius: 7px;
  line-height: 1;
}
</style>
