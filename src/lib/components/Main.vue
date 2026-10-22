<script setup lang="ts">
withDefaults(defineProps<{ padding?: string }>(), { padding: '20px' })
</script>

<template>
  <main class="aura-main" :style="{ padding }">
    <slot />
  </main>
</template>

<style scoped>
.aura-main {
  flex: 1;
  min-width: 0;
  min-height: 0;
  box-sizing: border-box;
  overflow: auto;
}
</style>
