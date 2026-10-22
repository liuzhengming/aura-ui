<script setup lang="ts">
export interface DescItem {
  label: string
  content: string | number
  span?: number
}

const props = withDefaults(
  defineProps<{
    items: DescItem[]
    column?: number
    border?: boolean
    title?: string
  }>(),
  { column: 2, border: false }
)
</script>

<template>
  <div class="aura-desc" :class="{ 'is-border': border }">
    <div v-if="title" class="aura-desc__title">{{ title }}</div>
    <div class="aura-desc__grid" :style="{ gridTemplateColumns: `repeat(${column}, minmax(0, 1fr))` }">
      <template v-for="(it, i) in items" :key="i">
        <div class="aura-desc__cell aura-desc__label" :style="{ gridColumn: `span ${Math.min(it.span || 1, column)}` }">
          {{ it.label }}
        </div>
        <div class="aura-desc__cell aura-desc__content" :style="{ gridColumn: `span ${Math.min(it.span || 1, column)}` }">
          <slot :name="`content-${i}`" :item="it">{{ it.content }}</slot>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
.aura-desc {
  border-radius: var(--aura-radius-sm);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  overflow: hidden;
}
.aura-desc__title {
  padding: 12px 16px;
  font-weight: 600;
  border-bottom: 1px solid var(--aura-border);
}
.aura-desc__grid {
  display: grid;
}
.aura-desc__cell {
  padding: 11px 16px;
  font-size: 0.9rem;
  box-sizing: border-box;
}
.aura-desc__label {
  color: var(--aura-text-dim);
  background: var(--aura-bg-elev);
}
.aura-desc__content {
  color: var(--aura-text);
}
.is-border .aura-desc__cell {
  border-right: 1px solid var(--aura-border);
  border-bottom: 1px solid var(--aura-border);
}
</style>
