<script setup lang="ts">
withDefaults(
  defineProps<{
    width?: string
    height?: string
    radius?: string
    circle?: boolean
  }>(),
  { width: '100%', height: '1rem', radius: '8px', circle: false }
)
</script>

<template>
  <span class="aura-skel" :class="{ circle }" :style="{ width, height, borderRadius: radius }" />
</template>

<style scoped>
.aura-skel {
  display: block;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.06),
    rgba(255, 255, 255, 0.14),
    rgba(255, 255, 255, 0.06)
  );
  background-size: 200% 100%;
  animation: aura-shimmer 1.4s infinite;
}
.aura-skel.circle {
  border-radius: 50% !important;
}
@keyframes aura-shimmer {
  to {
    background-position: -200% 0;
  }
}
</style>
