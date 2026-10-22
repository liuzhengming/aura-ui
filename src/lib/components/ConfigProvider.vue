<script setup lang="ts">
import { provide, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    theme?: 'dark' | 'light'
    size?: 'sm' | 'md' | 'lg'
    locale?: string
  }>(),
  { theme: 'dark', size: 'md', locale: 'en' }
)

provide('aura-config', { size: props.size, locale: props.locale })

watch(
  () => props.theme,
  v => {
    if (typeof document !== 'undefined') document.documentElement.dataset.theme = v
  },
  { immediate: true }
)
</script>

<template>
  <slot />
</template>
