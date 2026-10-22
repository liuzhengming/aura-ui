<script setup lang="ts">
import { inject, onMounted, type Ref } from 'vue'

withDefaults(defineProps<{ width?: string }>(), { width: '240px' })

const hasAside = inject<Ref<boolean>>('aura-container-has-aside')
onMounted(() => {
  if (hasAside) hasAside.value = true
})
</script>

<template>
  <aside class="aura-aside" :style="{ width }">
    <slot />
  </aside>
</template>

<style scoped>
.aura-aside {
  flex: none;
  box-sizing: border-box;
  overflow: auto;
  border-right: 1px solid var(--aura-border);
  background: var(--aura-bg-soft);
  transition: width 0.25s var(--aura-ease);
}
@media (max-width: 768px) {
  .aura-aside {
    width: 200px !important;
  }
}
</style>
