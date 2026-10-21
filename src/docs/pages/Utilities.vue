<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Kbd from '../../lib/components/Kbd.vue'
import CopyButton from '../../lib/components/CopyButton.vue'

const kbdCode = `<p>Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the palette.</p>`

const copyCode = `<CopyButton text="npm install aura-ui" label="Copy install" />`

const snippet = `npm install aura-ui`

const kbdRows = [
  { name: 'keys', type: 'string', default: '—', desc: 'Shortcut text, or use the default slot.' }
]

const copyButtonRows = [
  { name: 'text', type: 'string', default: "''", desc: 'Text to copy to the clipboard.' },
  { name: 'label', type: 'string', default: "'Copy'", desc: 'Button label.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'kbd'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('kbd') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('kbd') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('kbd')" :code="kbdCode">
        <p style="color: var(--aura-text-dim)">
          Press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd> to open the command palette, or <Kbd>Esc</Kbd> to close.
        </p>
      </DemoBlock>
      <PropsTable :rows="kbdRows" />
    </section>

    <section :id="'copyButton'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('copyButton') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('copyButton') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('copyButton')" :code="copyCode">
        <CopyButton :text="snippet" label="Copy install" />
      </DemoBlock>
      <PropsTable :rows="copyButtonRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
