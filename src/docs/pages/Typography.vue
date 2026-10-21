<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import GradientText from '../../lib/components/GradientText.vue'
import BlurText from '../../lib/components/BlurText.vue'
import Typewriter from '../../lib/components/Typewriter.vue'

const gradientCode = `<GradientText>Flowing gradient text</GradientText>

<!-- slower animation -->
<GradientText :speed="10">Slow and smooth</GradientText>`

const blurCode = `<BlurText text="Reveal me letter by letter" />

<!-- faster stagger -->
<BlurText text="Fast reveal" :stagger="10" />`

const typeCode = `<Typewriter text="Built with Vue 3 and TypeScript." />

<!-- slower typing -->
<Typewriter text="Hello world" :speed="140" />`

const gradientRows = [
  { name: 'speed', type: 'number', default: '6', desc: 'Animation duration in seconds (one full cycle).' }
]
const blurRows = [
  { name: 'text', type: 'string', default: "''", desc: 'The text to reveal.' },
  { name: 'stagger', type: 'number', default: '28', desc: 'Delay between letters, in milliseconds.' },
  { name: 'as', type: 'string', default: "'span'", desc: 'Root element tag.' }
]
const typeRows = [
  { name: 'text', type: 'string', default: "''", desc: 'The sentence to type out.' },
  { name: 'speed', type: 'number', default: '70', desc: 'Milliseconds per character.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'gradientText'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('gradientText') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('gradientText') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('gradientText')" :code="gradientCode">
        <div style="display: flex; flex-direction: column; gap: 16px; align-items: center">
          <GradientText style="font-size: 2rem; font-weight: 800">Flowing gradient text</GradientText>
          <GradientText :speed="10" style="font-size: 1.4rem; font-weight: 700">Slow and smooth</GradientText>
        </div>
      </DemoBlock>
      <PropsTable :rows="gradientRows" />
    </section>

    <section :id="'blurText'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('blurText') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('blurText') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('blurText')" :code="blurCode">
        <BlurText text="Reveal me letter by letter" style="font-size: 1.4rem; font-weight: 600" />
      </DemoBlock>
      <PropsTable :rows="blurRows" />
    </section>

    <section :id="'typewriter'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('typewriter') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('typewriter') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('typewriter')" :code="typeCode">
        <div style="font-size: 1.3rem">
          <Typewriter text="Built with Vue 3 and TypeScript." />
        </div>
      </DemoBlock>
      <PropsTable :rows="typeRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
