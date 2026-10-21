<script setup lang="ts">
import { inject, computed, onMounted } from 'vue'

const props = defineProps<{
  name: string
  label: string
}>()

interface TabsApi {
  active: { value: string }
  register: (id: string, label: string) => void
  select: (id: string) => void
}

const tabs = inject<TabsApi>('aura-tabs')
onMounted(() => tabs?.register(props.name, props.label))

const isActive = computed(() => tabs?.active.value === props.name)
</script>

<template>
  <div v-show="isActive" class="aura-tab-pane" role="tabpanel">
    <slot />
  </div>
</template>

<style scoped>
.aura-tab-pane {
  animation: aura-tab-fade 0.3s ease;
}
@keyframes aura-tab-fade {
  from {
    opacity: 0;
    transform: translateY(6px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
