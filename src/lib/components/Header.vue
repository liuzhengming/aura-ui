<script setup lang="ts">
withDefaults(defineProps<{ height?: string }>(), { height: '60px' })
</script>

<template>
  <header class="aura-header" :style="{ height }">
    <slot />
  </header>
</template>

<style scoped>
.aura-header {
  display: flex;
  align-items: center;
  padding: 0 20px;
  flex: none;
  box-sizing: border-box;
  border-bottom: 1px solid var(--aura-border);
  background: var(--aura-bg-soft);
}
</style>
