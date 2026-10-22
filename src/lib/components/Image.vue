<script setup lang="ts">
import { ref, onBeforeUnmount } from 'vue'

const props = withDefaults(
  defineProps<{
    src: string
    alt?: string
    width?: string
    height?: string
    radius?: string
    lazy?: boolean
    preview?: boolean
    fit?: string
  }>(),
  { lazy: false, preview: false, fit: 'cover' }
)

const open = ref(false)

function onKey(e: KeyboardEvent) {
  if (e.key === 'Escape') open.value = false
}
function openPreview() {
  if (!props.preview) return
  open.value = true
  document.addEventListener('keydown', onKey)
}
function closePreview() {
  open.value = false
  document.removeEventListener('keydown', onKey)
}
onBeforeUnmount(() => document.removeEventListener('keydown', onKey))
</script>

<template>
  <span class="aura-image" :style="{ width, height, borderRadius: radius }">
    <img
      class="aura-image__img"
      :class="{ 'is-previewable': preview }"
      :src="src"
      :alt="alt"
      :loading="lazy ? 'lazy' : 'eager'"
      :style="{ objectFit: fit as any }"
      @click="openPreview"
    />
  </span>

  <Teleport to="body">
    <Transition name="aura-image-fade">
      <div v-if="open" class="aura-image-preview" @click="closePreview">
        <img class="aura-image-preview__img" :src="src" :alt="alt" @click.stop />
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.aura-image {
  display: inline-block;
  overflow: hidden;
  vertical-align: middle;
}
.aura-image__img {
  display: block;
  width: 100%;
  height: 100%;
}
.aura-image__img.is-previewable {
  cursor: zoom-in;
  transition: transform 0.3s var(--aura-ease);
}
.aura-image__img.is-previewable:hover {
  transform: scale(1.02);
}
.aura-image-preview {
  position: fixed;
  inset: 0;
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.78);
  backdrop-filter: blur(4px);
  padding: 24px;
}
.aura-image-preview__img {
  max-width: 92vw;
  max-height: 92vh;
  border-radius: 8px;
  cursor: zoom-out;
  box-shadow: 0 30px 80px -20px rgba(0, 0, 0, 0.6);
}
.aura-image-fade-enter-active,
.aura-image-fade-leave-active {
  transition: opacity 0.25s var(--aura-ease);
}
.aura-image-fade-enter-from,
.aura-image-fade-leave-to {
  opacity: 0;
}
</style>
