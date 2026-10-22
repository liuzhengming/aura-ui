<script setup lang="ts">
import { t } from '../i18n'
import CodeBlock from '../components/CodeBlock.vue'
import GradientText from '../../lib/components/GradientText.vue'

const installCode = `# npm
npm install aura-ui

# pnpm
pnpm add aura-ui`

const pluginCode = `import { createApp } from 'vue'
import App from './App.vue'
import 'aura-ui/dist/style.css'
import { MagneticButton, GlowCard, useToast, fireConfetti } from 'aura-ui'

createApp(App).mount('#app')`

const usageCode = `<script setup>
import { MagneticButton, RippleButton, GlowCard } from 'aura-ui'
<\/script>

<template>
  <GlowCard>
    <MagneticButton>Get Started</MagneticButton>
    <RippleButton variant="solid">Click me</RippleButton>
  </GlowCard>
</template>`
</script>

<template>
  <div class="gs">
    <h1 class="gs__title">
      <GradientText>Aura UI</GradientText>
    </h1>
    <p class="gs__tagline">
      A Vue 3 component collection crafted for silky micro-interactions and modern motion.
    </p>

    <div class="gs__stats">
      <div class="gs__stat">
        <span class="gs__stat-num">80</span>
        <span class="gs__stat-label">{{ t('ui.totalComponents') }}</span>
      </div>
      <div class="gs__stat">
        <span class="gs__stat-num">0</span>
        <span class="gs__stat-label">{{ t('ui.zeroDeps') }}</span>
      </div>
      <div class="gs__stat">
        <span class="gs__stat-num">TS</span>
        <span class="gs__stat-label">TypeScript</span>
      </div>
    </div>

    <section class="gs__section">
      <h2 class="gs__h2">{{ t('ui.install') }}</h2>
      <CodeBlock :code="installCode" />
    </section>

    <section class="gs__section">
      <h2 class="gs__h2">{{ t('ui.quickStart') }}</h2>
      <p class="gs__note">{{ t('ui.importNote') }}</p>
      <CodeBlock :code="pluginCode" />
      <CodeBlock :code="usageCode" />
    </section>

    <p class="gs__hint">
      Pick a component from the menu on the left to see live demos, usage and the full prop reference.
    </p>
  </div>
</template>

<style scoped>
.gs {
  max-width: 820px;
}
.gs__title {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 0.6rem;
}
.gs__tagline {
  font-size: 1.15rem;
  color: var(--aura-text-dim);
  line-height: 1.6;
  max-width: 640px;
}
.gs__stats {
  display: flex;
  gap: 28px;
  margin: 2.4rem 0;
}
.gs__stat {
  display: flex;
  flex-direction: column;
}
.gs__stat-num {
  font-size: 2.2rem;
  font-weight: 800;
  background: var(--aura-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.gs__stat-label {
  font-size: 0.85rem;
  color: var(--aura-text-faint);
}
.gs__section {
  margin-top: 2.6rem;
}
.gs__h2 {
  font-size: 1.35rem;
  margin-bottom: 1rem;
}
.gs__note {
  color: var(--aura-text-dim);
  margin-bottom: 1rem;
  line-height: 1.6;
}
.gs__hint {
  margin-top: 2.6rem;
  padding: 16px 18px;
  border-radius: var(--aura-radius);
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  color: var(--aura-text-dim);
  font-size: 0.92rem;
}
</style>
