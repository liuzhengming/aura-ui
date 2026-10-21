<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../i18n'

defineProps<{ code: string }>()

const copied = ref(false)
let timer: number | undefined

function copy(text: string) {
  navigator.clipboard?.writeText(text).then(() => {
    copied.value = true
    window.clearTimeout(timer)
    timer = window.setTimeout(() => (copied.value = false), 1600)
  })
}
</script>

<template>
  <div class="code-block">
    <button class="code-block__copy" type="button" @click="copy(code)">
      {{ copied ? t('ui.copied') : t('ui.copy') }}
    </button>
    <pre class="code-block__pre"><code>{{ code }}</code></pre>
  </div>
</template>

<style scoped>
.code-block {
  position: relative;
  border-radius: 14px;
  background: var(--aura-bg-soft);
  border: 1px solid var(--aura-border);
  overflow: hidden;
}
.code-block__copy {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 2;
  padding: 5px 12px;
  font-size: 12px;
  border-radius: 8px;
  cursor: pointer;
  color: var(--aura-text-dim);
  background: var(--aura-surface-2);
  border: 1px solid var(--aura-border);
  transition: color 0.2s var(--aura-ease), background 0.2s var(--aura-ease);
}
.code-block__copy:hover {
  color: var(--aura-text);
  background: var(--aura-surface);
}
.code-block__pre {
  margin: 0;
  padding: 18px 18px;
  overflow-x: auto;
  font-family: var(--aura-mono);
  font-size: 13px;
  line-height: 1.65;
  color: var(--aura-text);
}
</style>
