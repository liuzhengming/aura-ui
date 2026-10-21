<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import ScrollReveal from '../../lib/components/ScrollReveal.vue'
import AuroraBackground from '../../lib/components/AuroraBackground.vue'
import RippleButton from '../../lib/components/RippleButton.vue'
import { fireConfetti } from '../../lib/confetti'

const revealCode = `<ScrollReveal>
  <h2>Visible on scroll</h2>
</ScrollReveal>

<!-- with delay + distance -->
<ScrollReveal :delay=\"200\" :y=\"40\">...</ScrollReveal>`

const auroraCode = `<div style="position:relative;height:240px;overflow:hidden">
  <AuroraBackground />
  <div class="content">Layered over the aurora</div>
</div>`

const confettiCode = `import { fireConfetti } from 'aura-ui'

fireConfetti()
fireConfetti({ count: 160, spread: 90 })`
</script>

<template>
  <div class="doc-page">
    <section :id="'scrollReveal'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('scrollReveal') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('scrollReveal') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('scrollReveal')" :code="revealCode">
        <ScrollReveal>
          <div style="padding: 24px; text-align: center">
            <h3 style="margin: 0 0 6px">Fade in on scroll</h3>
            <p style="margin: 0; color: var(--aura-text-dim)">This block reveals as it enters the viewport.</p>
          </div>
        </ScrollReveal>
      </DemoBlock>
      <PropsTable
        :rows="[
          { name: 'delay', type: 'number', default: '0', desc: 'Reveal delay in milliseconds.' },
          { name: 'y', type: 'number', default: '26', desc: 'Vertical travel distance in px.' },
          { name: 'once', type: 'boolean', default: 'true', desc: 'Reveal only the first time.' }
        ]"
      />
    </section>

    <section :id="'aurora'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('aurora') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('aurora') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('aurora')" :code="auroraCode">
        <div style="position: relative; height: 220px; border-radius: 16px; overflow: hidden; border: 1px solid var(--aura-border)">
          <AuroraBackground />
          <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 1.3rem">
            Layered over the aurora
          </div>
        </div>
      </DemoBlock>
      <PropsTable :rows="[{ name: '—', type: '—', desc: 'No props. Place inside a positioned container.' }]" />
    </section>

    <section :id="'confetti'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('confetti') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('confetti') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('confetti')" :code="confettiCode">
        <RippleButton @click="fireConfetti()">Launch Confetti</RippleButton>
      </DemoBlock>
      <PropsTable
        :rows="[
          { name: 'fireConfetti(options?)', type: '(opts?: {count, spread, originX, originY}) => void', default: '—', desc: 'Fire a canvas confetti burst anywhere.' }
        ]"
      />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
