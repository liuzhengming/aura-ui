<script setup lang="ts">
withDefaults(defineProps<{ height?: string }>(), { height: 'auto' })
</script>

<template>
  <footer class="aura-footer" :style="{ height }">
    <slot />
  </footer>
</template>

<style scoped>
.aura-footer {
  flex: none;
  box-sizing: border-box;
  padding: 16px 20px;
  border-top: 1px solid var(--aura-border);
  background: var(--aura-bg-soft);
}
</style>
