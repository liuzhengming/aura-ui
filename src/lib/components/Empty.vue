<script setup lang="ts">
withDefaults(defineProps<{ description?: string }>(), {})
</script>

<template>
  <div class="aura-empty">
    <div class="aura-empty__img">
      <svg viewBox="0 0 64 41" width="72" height="46" fill="none">
        <ellipse cx="32" cy="33" rx="28" ry="6" fill="var(--aura-surface-2)" />
        <path d="M8 30a24 14 0 0 1 48 0" stroke="var(--aura-border-strong)" stroke-width="2" fill="var(--aura-surface)" />
        <path d="M22 18l6 6M28 18l-6 6" stroke="var(--aura-text-faint)" stroke-width="2" stroke-linecap="round" />
        <path d="M40 16h.01M44 22h.01" stroke="var(--aura-text-faint)" stroke-width="2" stroke-linecap="round" />
      </svg>
    </div>
    <p v-if="description" class="aura-empty__desc">{{ description }}</p>
    <div v-if="$slots.default" class="aura-empty__extra">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.aura-empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 36px 16px;
  text-align: center;
}
.aura-empty__img {
  opacity: 0.9;
}
.aura-empty__desc {
  margin-top: 12px;
  color: var(--aura-text-faint);
  font-size: 0.9rem;
}
.aura-empty__extra {
  margin-top: 16px;
}
</style>
