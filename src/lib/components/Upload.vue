<script setup lang="ts">
import { ref } from 'vue'

interface UploadFile {
  name: string
  size: number
  url?: string
  type: string
}

const props = withDefaults(
  defineProps<{
    multiple?: boolean
    accept?: string
    disabled?: boolean
    maxSize?: number
  }>(),
  { multiple: false, accept: '', disabled: false, maxSize: 0 }
)

const emit = defineEmits<{
  (e: 'change', files: UploadFile[]): void
  (e: 'exceed', file: File): void
}>()

const files = ref<UploadFile[]>([])
const dragging = ref(false)
const inputRef = ref<HTMLInputElement | null>(null)

function addFiles(list: FileList | null) {
  if (!list) return
  for (const f of Array.from(list)) {
    if (props.maxSize && f.size > props.maxSize * 1024 * 1024) {
      emit('exceed', f)
      continue
    }
    const item: UploadFile = { name: f.name, size: f.size, type: f.type }
    if (f.type.startsWith('image/')) item.url = URL.createObjectURL(f)
    files.value.push(item)
  }
  emit('change', files.value)
}

function onInput(e: Event) {
  const t = e.target as HTMLInputElement
  addFiles(t.files)
  t.value = ''
}

function onDrop(e: DragEvent) {
  e.preventDefault()
  dragging.value = false
  if (props.disabled) return
  addFiles(e.dataTransfer?.files || null)
}

function remove(i: number) {
  const f = files.value[i]
  if (f.url) URL.revokeObjectURL(f.url)
  files.value.splice(i, 1)
  emit('change', files.value)
}

function fmt(n: number) {
  return n < 1024
    ? n + 'B'
    : n < 1048576
      ? (n / 1024).toFixed(1) + 'KB'
      : (n / 1048576).toFixed(1) + 'MB'
}

function openPicker() {
  if (!props.disabled) inputRef.value?.click()
}
</script>

<template>
  <div class="aura-upload" :class="{ 'is-disabled': disabled }">
    <div
      class="aura-upload__drop"
      :class="{ 'is-drag': dragging }"
      role="button"
      tabindex="0"
      @click="openPicker"
      @keydown.enter.prevent="openPicker"
      @dragover.prevent="dragging = true"
      @dragleave.prevent="dragging = false"
      @drop="onDrop"
    >
      <input
        ref="inputRef"
        type="file"
        class="aura-upload__input"
        :multiple="multiple"
        :accept="accept"
        :disabled="disabled"
        @change="onInput"
      />
      <div class="aura-upload__hint">
        <span class="aura-upload__plus">+</span>
        <span>Click or drag file to upload</span>
      </div>
    </div>
    <ul v-if="files.length" class="aura-upload__list">
      <li v-for="(f, i) in files" :key="i" class="aura-upload__file">
        <img v-if="f.url" :src="f.url" class="aura-upload__thumb" alt="" />
        <span v-else class="aura-upload__fileicon">F</span>
        <span class="aura-upload__name">{{ f.name }}</span>
        <span class="aura-upload__size">{{ fmt(f.size) }}</span>
        <button
          type="button"
          class="aura-upload__remove"
          aria-label="Remove"
          @click="remove(i)"
        >
          ×
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.aura-upload {
  width: 100%;
}
.aura-upload__drop {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 110px;
  padding: 16px;
  border: 1.5px dashed var(--aura-border-strong);
  border-radius: var(--aura-radius);
  background: var(--aura-surface);
  cursor: pointer;
  transition: border-color 0.2s var(--aura-ease), background 0.2s var(--aura-ease);
}
.aura-upload__drop:hover,
.aura-upload__drop.is-drag {
  border-color: var(--aura-primary);
  background: var(--aura-surface-2);
}
.aura-upload.is-disabled .aura-upload__drop {
  opacity: 0.5;
  pointer-events: none;
}
.aura-upload__input {
  display: none;
}
.aura-upload__hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: var(--aura-text-dim);
  font-size: 0.88rem;
}
.aura-upload__plus {
  font-size: 1.8rem;
  line-height: 1;
  color: var(--aura-primary);
}
.aura-upload__list {
  list-style: none;
  margin: 12px 0 0;
  padding: 0;
}
.aura-upload__file {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 8px 10px;
  border-radius: var(--aura-radius-sm);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  margin-bottom: 8px;
}
.aura-upload__thumb {
  width: 36px;
  height: 36px;
  object-fit: cover;
  border-radius: 8px;
  flex: none;
}
.aura-upload__fileicon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 8px;
  background: var(--aura-surface-2);
  color: var(--aura-text-dim);
  font-size: 0.8rem;
  flex: none;
}
.aura-upload__name {
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.88rem;
  color: var(--aura-text);
}
.aura-upload__size {
  color: var(--aura-text-faint);
  font-size: 0.78rem;
  flex: none;
}
.aura-upload__remove {
  width: 26px;
  height: 26px;
  border: none;
  border-radius: 50%;
  background: var(--aura-surface-2);
  color: var(--aura-text-dim);
  cursor: pointer;
  font-size: 1rem;
  line-height: 1;
  flex: none;
}
.aura-upload__remove:hover {
  background: var(--aura-danger);
  color: #fff;
}
</style>
