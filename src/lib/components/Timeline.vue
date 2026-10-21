<script setup lang="ts">
export interface TimelineItem {
  title?: string
  time?: string
  desc?: string
  color?: string
  icon?: string
}

withDefaults(defineProps<{ items: TimelineItem[] }>(), { items: () => [] })
</script>

<template>
  <ul class="aura-timeline">
    <li
      v-for="(item, i) in items"
      :key="i"
      class="aura-timeline__item"
      :class="{ 'is-last': i === items.length - 1 }"
    >
      <span
        class="aura-timeline__node"
        :style="item.color ? { background: item.color, borderColor: item.color } : undefined"
      >
        <span v-if="item.icon" class="aura-timeline__icon">{{ item.icon }}</span>
      </span>
      <div class="aura-timeline__content">
        <div class="aura-timeline__head">
          <span class="aura-timeline__title">{{ item.title }}</span>
          <span v-if="item.time" class="aura-timeline__time">{{ item.time }}</span>
        </div>
        <p v-if="item.desc" class="aura-timeline__desc">{{ item.desc }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.aura-timeline {
  list-style: none;
  margin: 0;
  padding: 0;
}
.aura-timeline__item {
  position: relative;
  display: flex;
  gap: 16px;
  padding-bottom: 1.6rem;
}
.aura-timeline__item::before {
  content: '';
  position: absolute;
  left: 11px;
  top: 24px;
  bottom: 0;
  width: 2px;
  background: var(--aura-border);
}
.aura-timeline__item.is-last::before {
  display: none;
}
.aura-timeline__node {
  position: relative;
  z-index: 1;
  flex: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--aura-gradient);
  border: 3px solid var(--aura-bg);
  box-shadow: 0 0 0 2px var(--aura-border);
  display: flex;
  align-items: center;
  justify-content: center;
}
.aura-timeline__icon {
  font-size: 0.7rem;
  color: #fff;
}
.aura-timeline__content {
  padding-top: 1px;
}
.aura-timeline__head {
  display: flex;
  align-items: baseline;
  gap: 10px;
  flex-wrap: wrap;
}
.aura-timeline__title {
  font-weight: 600;
  color: var(--aura-text);
}
.aura-timeline__time {
  font-size: 0.8rem;
  color: var(--aura-text-faint);
}
.aura-timeline__desc {
  margin-top: 4px;
  color: var(--aura-text-dim);
  font-size: 0.9rem;
  line-height: 1.6;
}
</style>
