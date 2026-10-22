<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import GlowCard from '../../lib/components/GlowCard.vue'
import TiltCard from '../../lib/components/TiltCard.vue'
import Spotlight from '../../lib/components/Spotlight.vue'
import Card from '../../lib/components/Card.vue'

const glowCode = `<GlowCard>
  <h3>Hover me</h3>
  <p>A soft light follows your cursor.</p>
</GlowCard>`

const tiltCode = `<TiltCard>
  <h3>3D Tilt</h3>
  <p>Move your pointer to tilt the card.</p>
</TiltCard>

<!-- disable the glare -->
<TiltCard :glare="false">No glare</TiltCard>

<!-- stronger tilt -->
<TiltCard :max="20">Max tilt 20deg</TiltCard>`

const spotlightCode = `<Spotlight>
  <div class="my-content">A radial glow tracks the pointer.</div>
</Spotlight>`

const glowRows = [{ name: '—', type: '—', desc: 'No props. Content goes through the default slot.' }]
const tiltRows = [
  { name: 'max', type: 'number', default: '12', desc: 'Maximum tilt angle in degrees.' },
  { name: 'glare', type: 'boolean', default: 'true', desc: 'Show the moving highlight.' }
]
const spotlightRows = [{ name: '—', type: '—', desc: 'No props. Content goes through the default slot.' }]

const cardCode = `<Card title="Project Aurora">
  <p>Built with Vue 3 and TypeScript.</p>
</Card>

<Card title="Hover me" hoverable shadow="lg">
  Lift on hover with a stronger shadow.
</Card>`
const cardRows = [
  { name: 'title', type: 'string', default: "''", desc: 'Header title (or use #header slot).' },
  { name: 'bordered', type: 'boolean', default: 'true', desc: 'Show the border.' },
  { name: 'hoverable', type: 'boolean', default: 'false', desc: 'Lift and highlight on hover.' },
  { name: 'shadow', type: "'none'|'sm'|'md'|'lg'", default: "'md'", desc: 'Elevation level.' },
  { name: 'padding', type: 'string', default: "'20px'", desc: 'Inner padding.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'glowCard'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('glowCard') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('glowCard') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('glowCard')" :code="glowCode">
        <GlowCard style="max-width: 280px">
          <h3 style="margin: 0 0 6px">Hover me</h3>
          <p style="margin: 0; color: var(--aura-text-dim)">A soft light follows your cursor across the surface.</p>
        </GlowCard>
      </DemoBlock>
      <PropsTable :rows="glowRows" />
    </section>

    <section :id="'tiltCard'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('tiltCard') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('tiltCard') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('tiltCard')" :code="tiltCode">
        <TiltCard style="max-width: 240px">
          <h3 style="margin: 0 0 6px">3D Tilt</h3>
          <p style="margin: 0; color: var(--aura-text-dim)">Move your pointer to tilt the card.</p>
        </TiltCard>
        <TiltCard :max="20" style="max-width: 240px">
          <h3 style="margin: 0 0 6px">Max 20deg</h3>
          <p style="margin: 0; color: var(--aura-text-dim)">Stronger tilt angle.</p>
        </TiltCard>
      </DemoBlock>
      <PropsTable :rows="tiltRows" />
    </section>

    <section :id="'spotlight'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('spotlight') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('spotlight') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('spotlight')" :code="spotlightCode">
        <Spotlight>
          <div style="padding: 30px; text-align: center; border: 1px dashed var(--aura-border); border-radius: 16px">
            Move your pointer — a radial glow tracks it.
          </div>
        </Spotlight>
      </DemoBlock>
      <PropsTable :rows="spotlightRows" />
    </section>

    <section :id="'card'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('card') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('card') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('card')" :code="cardCode">
        <div style="display: flex; gap: 16px; flex-wrap: wrap">
          <Card title="Project Aurora" style="max-width: 240px">
            <p style="margin: 0; color: var(--aura-text-dim)">Built with Vue 3 and TypeScript.</p>
          </Card>
          <Card title="Hover me" hoverable shadow="lg" style="max-width: 240px">
            <p style="margin: 0; color: var(--aura-text-dim)">Lift on hover with a stronger shadow.</p>
          </Card>
        </div>
      </DemoBlock>
      <PropsTable :rows="cardRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
