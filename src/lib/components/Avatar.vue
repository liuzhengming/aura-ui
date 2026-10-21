<script setup lang="ts">
import { ref, computed } from 'vue'

const props = withDefaults(
  defineProps<{
    src?: string
    alt?: string
    name?: string
    size?: 'sm' | 'md' | 'lg' | number
    status?: 'online' | 'offline' | 'away' | 'busy'
  }>(),
  { size: 'md' }
)

const failed = ref(false)
const sizePx = computed(() => (typeof props.size === 'number' ? props.size + 'px' : null))
const initials = computed(() => {
  if (!props.name) return '?'
  return props.name
    .split(/\s+/)
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
})
const showImage = computed(() => props.src && !failed.value)
</script>

<template>
  <span
    class="aura-avatar"
    :class="[`aura-avatar--${typeof size === 'string' ? size : 'custom'}`, { 'has-status': status }]"
    :style="sizePx ? { width: sizePx, height: sizePx } : undefined"
  >
    <img v-if="showImage" class="aura-avatar__img" :src="src" :alt="alt || name" @error="failed = true" />
    <span v-else class="aura-avatar__fallback">{{ initials }}</span>
    <span v-if="status" class="aura-avatar__status" :class="`is-${status}`" />
  </span>
</template>

<style scoped>
.aura-avatar {
  position: relative;
  display: inline-block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  overflow: visible;
  background: var(--aura-surface-2);
  border: 1px solid var(--aura-border);
  flex: none;
}
.aura-avatar--sm {
  width: 32px;
  height: 32px;
}
.aura-avatar--lg {
  width: 64px;
  height: 64px;
}
.aura-avatar__img,
.aura-avatar__fallback {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  color: var(--aura-text);
  background: var(--aura-gradient);
}
.aura-avatar__fallback {
  color: #fff;
  font-size: 0.9rem;
}
.aura-avatar__status {
  position: absolute;
  right: -1px;
  bottom: -1px;
  width: 30%;
  height: 30%;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
  border: 2px solid var(--aura-bg);
}
.aura-avatar__status.is-online {
  background: #2ecc71;
}
.aura-avatar__status.is-offline {
  background: #888;
}
.aura-avatar__status.is-away {
  background: #f1c40f;
}
.aura-avatar__status.is-busy {
  background: #ff5c5c;
}
</style>
