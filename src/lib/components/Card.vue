<script setup lang="ts">
import { useSlots } from 'vue'

const props = withDefaults(
  defineProps<{
    title?: string
    bordered?: boolean
    hoverable?: boolean
    shadow?: 'none' | 'sm' | 'md' | 'lg'
    padding?: string
  }>(),
  { bordered: true, hoverable: false, shadow: 'md', padding: '20px' }
)

const slots = useSlots()
const hasHeader = () => !!props.title || !!slots.header
</script>

<template>
  <div
    class="aura-card"
    :class="[
      { 'is-bordered': bordered, 'is-hoverable': hoverable },
      `aura-card--shadow-${shadow}`
    ]"
    :style="{ padding }"
  >
    <div v-if="hasHeader()" class="aura-card__header">
      <slot name="header">
        <h3 class="aura-card__title">{{ title }}</h3>
      </slot>
    </div>
    <div class="aura-card__body">
      <slot />
    </div>
    <div v-if="slots.footer" class="aura-card__footer">
      <slot name="footer" />
    </div>
  </div>
</template>

<style scoped>
.aura-card {
  position: relative;
  border-radius: var(--aura-radius);
  background: var(--aura-surface);
  border: 1px solid transparent;
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  transition: transform 0.3s var(--aura-ease), box-shadow 0.3s var(--aura-ease),
    border-color 0.3s var(--aura-ease);
}
.aura-card.is-bordered {
  border-color: var(--aura-border);
}
.aura-card.is-hoverable {
  cursor: pointer;
}
.aura-card.is-hoverable:hover {
  transform: translateY(-4px);
  border-color: var(--aura-border-strong);
}
.aura-card--shadow-none {
  box-shadow: none;
}
.aura-card--shadow-sm {
  box-shadow: 0 6px 20px -10px rgba(0, 0, 0, 0.45);
}
.aura-card--shadow-md {
  box-shadow: var(--aura-shadow);
}
.aura-card--shadow-lg {
  box-shadow: 0 30px 80px -24px rgba(0, 0, 0, 0.6);
}
.aura-card__header {
  margin: calc(-1 * var(--aura-card-pad, 0px));
  margin-bottom: 14px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--aura-border);
}
.aura-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--aura-text);
}
.aura-card__footer {
  margin-top: 16px;
  padding-top: 14px;
  border-top: 1px solid var(--aura-border);
}
</style>
