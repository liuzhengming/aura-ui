<script setup lang="ts">
export interface StepItem {
  title: string
  desc?: string
}

const props = withDefaults(
  defineProps<{
    items: StepItem[]
    current?: number
  }>(),
  { current: 0 }
)

function statusOf(i: number): 'done' | 'active' | 'todo' {
  if (i < props.current) return 'done'
  if (i === props.current) return 'active'
  return 'todo'
}
</script>

<template>
  <ol class="aura-steps">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="aura-steps__item"
      :class="[`is-${statusOf(i)}`, { 'is-last': i === items.length - 1 }]"
    >
      <span class="aura-steps__node">
        <span v-if="statusOf(i) === 'done'" class="aura-steps__check">✓</span>
        <span v-else>{{ i + 1 }}</span>
      </span>
      <div class="aura-steps__text">
        <span class="aura-steps__title">{{ item.title }}</span>
        <span v-if="item.desc" class="aura-steps__desc">{{ item.desc }}</span>
      </div>
    </li>
  </ol>
</template>

<style scoped>
.aura-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.aura-steps__item {
  position: relative;
  display: flex;
  align-items: flex-start;
  gap: 12px;
  flex: 1;
  min-width: 140px;
}
.aura-steps__item:not(.is-last)::before {
  content: '';
  position: absolute;
  left: 16px;
  top: 32px;
  width: calc(100% - 16px);
  height: 2px;
  background: var(--aura-border);
}
.aura-steps__item.is-done:not(.is-last)::before {
  background: var(--aura-primary);
}
.aura-steps__node {
  position: relative;
  z-index: 1;
  flex: none;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  background: var(--aura-bg-elev);
  border: 2px solid var(--aura-border);
  color: var(--aura-text-faint);
  transition: all 0.3s var(--aura-ease);
}
.aura-steps__item.is-active .aura-steps__node {
  background: var(--aura-gradient);
  border-color: transparent;
  color: #fff;
  box-shadow: var(--aura-shadow-glow);
}
.aura-steps__item.is-done .aura-steps__node {
  background: rgba(124, 92, 255, 0.18);
  border-color: var(--aura-primary);
  color: #b9a6ff;
}
.aura-steps__check { font-size: 1rem; }
.aura-steps__text {
  display: flex;
  flex-direction: column;
  padding-top: 4px;
}
.aura-steps__title {
  font-weight: 600;
  color: var(--aura-text);
}
.aura-steps__desc {
  font-size: 0.82rem;
  color: var(--aura-text-faint);
  margin-top: 2px;
}
</style>
