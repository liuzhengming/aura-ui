<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import MagneticButton from '../../lib/components/MagneticButton.vue'
import RippleButton from '../../lib/components/RippleButton.vue'

const magneticCode = `<MagneticButton>Get Started</MagneticButton>
<MagneticButton variant="ghost">Ghost</MagneticButton>
<MagneticButton variant="outline">Outline</MagneticButton>

<!-- stronger pull -->
<MagneticButton :strength="0.7">Stronger</MagneticButton>`

const rippleCode = `<RippleButton>Ripple</RippleButton>
<RippleButton variant="outline">Outline</RippleButton>`

const magneticRows = [
  { name: 'variant', type: "'solid' | 'ghost' | 'outline'", default: "'solid'", desc: 'Visual style of the button.' },
  { name: 'strength', type: 'number', default: '0.4', desc: 'How strongly the button follows the cursor.' },
  { name: 'tag', type: 'string', default: "'button'", desc: 'Rendered element, e.g. "a" for links.' }
]

const rippleRows = [
  { name: 'variant', type: "'solid' | 'outline'", default: "'solid'", desc: 'Visual style of the button.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'magnetic'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('magnetic') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('magnetic') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('magnetic')" :code="magneticCode">
        <MagneticButton>Get Started</MagneticButton>
        <MagneticButton variant="ghost">Ghost</MagneticButton>
        <MagneticButton variant="outline">Outline</MagneticButton>
        <MagneticButton :strength="0.7">Stronger</MagneticButton>
      </DemoBlock>
      <PropsTable :rows="magneticRows" />
    </section>

    <section :id="'ripple'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('ripple') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('ripple') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('ripple')" :code="rippleCode">
        <RippleButton>Ripple</RippleButton>
        <RippleButton variant="outline">Outline</RippleButton>
      </DemoBlock>
      <PropsTable :rows="rippleRows" />
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
</style>
