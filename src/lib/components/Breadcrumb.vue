<script setup lang="ts">
export interface BreadcrumbItem {
  label: string
  href?: string
}

withDefaults(
  defineProps<{
    items: BreadcrumbItem[]
    separator?: string
  }>(),
  { separator: '/' }
)
</script>

<template>
  <nav class="aura-breadcrumb" aria-label="breadcrumb">
    <template v-for="(item, i) in items" :key="i">
      <a v-if="item.href && i < items.length - 1" class="aura-breadcrumb__link" :href="item.href">{{ item.label }}</a>
      <span v-else class="aura-breadcrumb__current" :aria-current="i === items.length - 1 ? 'page' : undefined">{{ item.label }}</span>
      <span v-if="i < items.length - 1" class="aura-breadcrumb__sep">{{ separator }}</span>
    </template>
  </nav>
</template>

<style scoped>
.aura-breadcrumb {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 0.92rem;
}
.aura-breadcrumb__link {
  color: var(--aura-text-dim);
  transition: color 0.2s var(--aura-ease);
}
.aura-breadcrumb__link:hover {
  color: var(--aura-primary-2);
}
.aura-breadcrumb__current {
  color: var(--aura-text);
  font-weight: 500;
}
.aura-breadcrumb__sep {
  color: var(--aura-text-faint);
}
</style>
