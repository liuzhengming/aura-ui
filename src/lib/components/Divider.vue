<script setup lang="ts">
withDefaults(
  defineProps<{
    direction?: 'horizontal' | 'vertical'
    orientation?: 'left' | 'center' | 'right'
    text?: string
  }>(),
  { direction: 'horizontal', orientation: 'center' }
)
</script>

<template>
  <div
    class="aura-divider"
    :class="[`is-${direction}`, text ? `has-text is-${orientation}` : '']"
    role="separator"
  >
    <span v-if="text && direction === 'horizontal'" class="aura-divider__text">{{ text }}</span>
  </div>
</template>

<style scoped>
.aura-divider {
  box-sizing: border-box;
  color: var(--aura-text-dim);
}
.aura-divider.is-horizontal {
  display: flex;
  align-items: center;
  width: 100%;
  margin: 18px 0;
  border-top: 1px solid var(--aura-border);
  line-height: 1;
}
.aura-divider.is-vertical {
  display: inline-block;
  height: 1em;
  width: 1px;
  margin: 0 12px;
  vertical-align: middle;
  background: var(--aura-border);
  border: none;
}
.aura-divider.has-text::before,
.aura-divider.has-text::after {
  content: '';
  flex: 1;
  border-top: 1px solid var(--aura-border);
}
.aura-divider.is-left::before {
  max-width: 32px;
  flex: none;
}
.aura-divider.is-right::after {
  max-width: 32px;
  flex: none;
}
.aura-divider__text {
  padding: 0 14px;
  font-size: 0.86rem;
  white-space: nowrap;
}
</style>
