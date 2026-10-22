<script setup lang="ts">
import { ref, provide } from 'vue'

const hasAside = ref(false)
provide('aura-container-has-aside', hasAside)
</script>

<template>
  <section class="aura-container" :class="{ 'has-aside': hasAside }">
    <slot />
  </section>
</template>

<style scoped>
.aura-container {
  display: flex;
  flex-direction: column;
  flex: 1;
  min-height: 0;
  box-sizing: border-box;
  width: 100%;
}
.aura-container.has-aside {
  flex-direction: row;
}
</style>
