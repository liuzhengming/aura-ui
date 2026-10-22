<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    gutter?: number
    justify?: 'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
    align?: 'top' | 'middle' | 'bottom' | 'stretch'
  }>(),
  { gutter: 0, justify: 'start', align: 'top' }
)

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  center: 'center',
  end: 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly'
}
const alignMap: Record<string, string> = {
  top: 'flex-start',
  middle: 'center',
  bottom: 'flex-end',
  stretch: 'stretch'
}

const style = computed(() => ({
  '--aura-gutter': `${props.gutter}px`,
  justifyContent: justifyMap[props.justify],
  alignItems: alignMap[props.align]
}))
</script>

<template>
  <div class="aura-row" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.aura-row {
  display: flex;
  flex-wrap: wrap;
  margin-left: calc(var(--aura-gutter, 0px) / -2);
  margin-right: calc(var(--aura-gutter, 0px) / -2);
}
</style>
