<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'

export interface Command {
  id: string
  title: string
  group?: string
  icon?: string
}

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    commands: Command[]
    placeholder?: string
  }>(),
  { placeholder: 'Type a command or search...' }
)

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', command: Command): void
}>()

const query = ref('')
const activeIndex = ref(0)
const inputRef = ref<HTMLInputElement | null>(null)

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return props.commands
  return props.commands.filter(
    (c) =>
      c.title.toLowerCase().includes(q) ||
      (c.group ?? '').toLowerCase().includes(q)
  )
})

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      query.value = ''
      activeIndex.value = 0
      nextTick(() => inputRef.value?.focus())
    }
  }
)
watch(filtered, () => {
  activeIndex.value = 0
})

function onKey(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (filtered.value.length) {
      activeIndex.value = (activeIndex.value + 1) % filtered.value.length
    }
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (filtered.value.length) {
      activeIndex.value = (activeIndex.value - 1 + filtered.value.length) % filtered.value.length
    }
  } else if (e.key === 'Enter') {
    e.preventDefault()
    select(filtered.value[activeIndex.value])
  } else if (e.key === 'Escape') {
    close()
  }
}

function select(cmd?: Command) {
  if (!cmd) return
  emit('select', cmd)
  close()
}

function close() {
  emit('update:modelValue', false)
}
</script>

<template>
  <Teleport to="body">
    <Transition name="aura-palette">
      <div v-if="modelValue" class="aura-palette" @click.self="close">
        <div class="aura-palette__box">
          <div class="aura-palette__input-row">
            <span class="aura-palette__search">⌕</span>
            <input
              ref="inputRef"
              v-model="query"
              class="aura-palette__input"
              :placeholder="placeholder"
              @keydown="onKey"
            />
            <kbd class="aura-palette__esc">ESC</kbd>
          </div>
          <ul class="aura-palette__list">
            <li
              v-for="(c, i) in filtered"
              :key="c.id"
              class="aura-palette__item"
              :class="{ 'is-active': i === activeIndex }"
              @mouseenter="activeIndex = i"
              @click="select(c)"
            >
              <span class="aura-palette__icon">{{ c.icon || '›' }}</span>
              <span class="aura-palette__title">{{ c.title }}</span>
              <span v-if="c.group" class="aura-palette__group">{{ c.group }}</span>
            </li>
            <li v-if="filtered.length === 0" class="aura-palette__empty">No results found</li>
          </ul>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.aura-palette {
  position: fixed;
  inset: 0;
  z-index: 10001;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding-top: 14vh;
  background: rgba(6, 8, 16, 0.6);
  backdrop-filter: blur(4px);
}
.aura-palette__box {
  width: min(92vw, 560px);
  border-radius: 16px;
  background: rgba(18, 20, 32, 0.96);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.55);
  overflow: hidden;
}
.aura-palette__input-row {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 18px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}
.aura-palette__search {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.5);
}
.aura-palette__input {
  flex: 1;
  border: none;
  background: none;
  color: #fff;
  font-size: 16px;
  outline: none;
}
.aura-palette__input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}
.aura-palette__esc {
  font-size: 11px;
  padding: 2px 6px;
  border-radius: 6px;
  color: rgba(255, 255, 255, 0.5);
  background: rgba(255, 255, 255, 0.08);
}
.aura-palette__list {
  list-style: none;
  margin: 0;
  padding: 8px;
  max-height: 320px;
  overflow-y: auto;
}
.aura-palette__item {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 11px 12px;
  border-radius: 10px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.85);
}
.aura-palette__item.is-active {
  background: linear-gradient(135deg, rgba(124, 92, 255, 0.35), rgba(74, 217, 255, 0.25));
}
.aura-palette__icon {
  width: 22px;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}
.aura-palette__title {
  flex: 1;
}
.aura-palette__group {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}
.aura-palette__empty {
  padding: 18px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
}
.aura-palette-enter-active,
.aura-palette-leave-active {
  transition: opacity 0.2s ease;
}
.aura-palette-enter-from,
.aura-palette-leave-to {
  opacity: 0;
}
.aura-palette-enter-active .aura-palette__box {
  animation: aura-palette-pop 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
}
@keyframes aura-palette-pop {
  from {
    transform: translateY(-12px) scale(0.97);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
}
</style>
