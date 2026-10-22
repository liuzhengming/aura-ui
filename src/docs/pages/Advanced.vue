<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import { useTheme, toggleTheme } from '../theme'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import ConfigProvider from '../../lib/components/ConfigProvider.vue'
import Card from '../../lib/components/Card.vue'
import Tag from '../../lib/components/Tag.vue'

const theme = useTheme()

const configCode = `<!-- Set a theme, size and locale for the whole subtree -->
<ConfigProvider theme="light" size="md" locale="zh">
  <App />
</ConfigProvider>

<!-- reactive theme: bind to your own theme state -->
<ConfigProvider :theme="theme">
  <App />
</ConfigProvider>`
const configRows = [
  { name: 'theme', type: "'dark'|'light'", default: "'dark'", desc: 'Theme applied to the subtree (sets data-theme).' },
  { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: 'Default size injected for children.' },
  { name: 'locale', type: 'string', default: "'en'", desc: 'Locale injected for children.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'configProvider'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('configProvider') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('configProvider') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('configProvider')" :code="configCode">
        <ConfigProvider :theme="theme.theme" size="md" locale="en">
          <Card title="Configured subtree" style="max-width: 380px">
            <p style="margin: 0 0 14px; color: var(--aura-text-dim)">
              Everything inside ConfigProvider inherits the theme, size and locale you set here — flip the
              switch below and the subtree reacts instantly.
            </p>
            <div style="display: flex; gap: 10px; align-items: center">
              <Tag type="primary">Theme: {{ theme.theme }}</Tag>
              <button class="demo-btn demo-btn--ghost" type="button" @click="toggleTheme">
                Toggle theme
              </button>
            </div>
          </Card>
        </ConfigProvider>
      </DemoBlock>
      <PropsTable :rows="configRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page {
  max-width: 860px;
}
.doc-sec {
  margin-bottom: 3rem;
  scroll-margin-top: 24px;
}
.doc-sec__title {
  font-size: 1.6rem;
  margin-bottom: 0.4rem;
}
.doc-sec__desc {
  color: var(--aura-text-dim);
  margin-bottom: 1.4rem;
  line-height: 1.6;
}
.demo-btn {
  padding: 9px 16px;
  border-radius: 10px;
  border: none;
  background: var(--aura-gradient);
  color: #fff;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}
.demo-btn--ghost {
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  color: var(--aura-text);
}
</style>
