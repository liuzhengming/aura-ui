<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical'
    size?: number | 'sm' | 'md' | 'lg'
    align?: 'start' | 'center' | 'end' | 'baseline' | 'stretch'
    justify?: 'start' | 'center' | 'end' | 'between' | 'around'
    wrap?: boolean
  }>(),
  { direction: 'horizontal', size: 'md', align: 'center', justify: 'start', wrap: true }
)

const gapMap: Record<string, number> = { sm: 8, md: 16, lg: 24 }
const alignMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  baseline: 'baseline',
  stretch: 'stretch'
}
const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  between: 'space-between',
  around: 'space-around'
}

const style = computed(() =>
  ({
    display: 'flex',
    flexDirection: props.direction === 'vertical' ? 'column' : 'row',
    gap: `${(typeof props.size === 'number' ? props.size : gapMap[props.size])}px`,
    alignItems: alignMap[props.align],
    justifyContent: justifyMap[props.justify],
    flexWrap: props.wrap ? 'wrap' : 'nowrap'
  }) as any
)
</script>

<template>
  <div class="aura-space" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.aura-space {
  box-sizing: border-box;
}
</style>
