<script setup lang="ts">
import { computed } from 'vue'
import { useBreakpoint, pickResponsive, type Breakpoint } from '../breakpoint'

const props = withDefaults(
  defineProps<{
    span?: number
    offset?: number
    xs?: number
    sm?: number
    md?: number
    lg?: number
    xl?: number
    xxl?: number
    xsOffset?: number
    smOffset?: number
    mdOffset?: number
    lgOffset?: number
    xlOffset?: number
    xxlOffset?: number
  }>(),
  { span: 24, offset: 0 }
)

const bp = useBreakpoint()

const spanResp = computed(() => ({
  xs: props.xs,
  sm: props.sm,
  md: props.md,
  lg: props.lg,
  xl: props.xl,
  xxl: props.xxl
}))
const offsetResp = computed(() => ({
  xs: props.xsOffset,
  sm: props.smOffset,
  md: props.mdOffset,
  lg: props.lgOffset,
  xl: props.xlOffset,
  xxl: props.xxlOffset
}))

const span = computed(() => pickResponsive(bp.value, props.span, spanResp.value) ?? 24)
const offset = computed(() => pickResponsive(bp.value, props.offset, offsetResp.value) ?? 0)

const style = computed(() => ({
  width: `${(span.value / 24) * 100}%`,
  marginLeft: `${(offset.value / 24) * 100}%`,
  paddingLeft: 'calc(var(--aura-gutter, 0px) / 2)',
  paddingRight: 'calc(var(--aura-gutter, 0px) / 2)'
}))
</script>

<template>
  <div class="aura-col" :style="style">
    <slot />
  </div>
</template>

<style scoped>
.aura-col {
  box-sizing: border-box;
  min-height: 1px;
}
</style>
