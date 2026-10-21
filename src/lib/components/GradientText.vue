<script setup lang="ts">
withDefaults(defineProps<{ speed?: number }>(), { speed: 6 })
</script>

<template>
  <span class="aura-gtext" :style="{ animationDuration: speed + 's' }"><slot /></span>
</template>

<style scoped>
.aura-gtext {
  background: linear-gradient(110deg, #7c5cff, #00d4ff, #ff5c8a, #7c5cff);
  background-size: 250% 100%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: aura-gtext-move 6s linear infinite;
  display: inline-block;
}
@keyframes aura-gtext-move {
  to {
    background-position: 250% 0;
  }
}
</style>
