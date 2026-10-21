<script setup lang="ts">
import { ref } from 'vue'
import { t } from '../i18n'
import CodeBlock from './CodeBlock.vue'

defineProps<{
  title?: string
  description?: string
  code: string
}>()

const showCode = ref(false)
</script>

<template>
  <section class="demo-block">
    <header v-if="title || description" class="demo-block__head">
      <h3 v-if="title" class="demo-block__title">{{ title }}</h3>
      <p v-if="description" class="demo-block__desc">{{ description }}</p>
    </header>

    <div class="demo-block__preview aura-glass">
      <slot />
    </div>

    <div class="demo-block__bar">
      <button class="demo-block__toggle" type="button" @click="showCode = !showCode">
        {{ showCode ? t('ui.hideCode') : t('ui.showCode') }}
      </button>
    </div>

    <Transition name="demo-code">
      <div v-if="showCode" class="demo-block__code">
        <CodeBlock :code="code" />
      </div>
    </Transition>
  </section>
</template>

<style scoped>
.demo-block {
  margin-bottom: 2.4rem;
}
.demo-block__head {
  margin-bottom: 0.9rem;
}
.demo-block__title {
  font-size: 1.05rem;
  font-weight: 650;
}
.demo-block__desc {
  margin-top: 0.35rem;
  color: var(--aura-text-dim);
  font-size: 0.92rem;
  line-height: 1.6;
}
.demo-block__preview {
  border-radius: var(--aura-radius);
  padding: 2.2rem 1.6rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 96px;
}
.demo-block__bar {
  display: flex;
  justify-content: flex-end;
  margin-top: 0.6rem;
}
.demo-block__toggle {
  padding: 6px 14px;
  font-size: 13px;
  border-radius: 9px;
  cursor: pointer;
  color: var(--aura-text-dim);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  transition: color 0.2s var(--aura-ease), border-color 0.2s var(--aura-ease);
}
.demo-block__toggle:hover {
  color: var(--aura-text);
  border-color: var(--aura-border-strong);
}
.demo-block__code {
  margin-top: 0.8rem;
}
.demo-code-enter-active,
.demo-code-leave-active {
  transition: opacity 0.25s var(--aura-ease), transform 0.25s var(--aura-ease);
}
.demo-code-enter-from,
.demo-code-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
