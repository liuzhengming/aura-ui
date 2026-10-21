<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import {
  MagneticButton,
  RippleButton,
  GlowCard,
  TiltCard,
  Spotlight,
  GradientText,
  ScrollReveal,
  CountUp,
  Typewriter,
  AuroraBackground,
  Skeleton,
  BlurText,
  Marquee,
  Dialog,
  Switch,
  Progress,
  Tooltip,
  Accordion,
  AccordionItem,
  Tabs,
  Tab,
  ToastContainer,
  CommandPalette,
  type Command
} from './lib'
import { useToast, fireConfetti } from './lib'

const toast = useToast()

const installCmd = `npm install aura-ui
# or
pnpm add aura-ui`

const usageSnippet = `<script setup lang="ts">
import { MagneticButton } from 'aura-ui'
<\/script>

<template>
  <MagneticButton>Get Started</MagneticButton>
</template>`

const copied = ref(false)
const timer = ref<number | undefined>(undefined)
function copy(text: string) {
  navigator.clipboard?.writeText(text).then(() => {
    copied.value = true
    clearTimeout(timer.value)
    timer.value = window.setTimeout(() => (copied.value = false), 1600)
  })
}

const features = [
  {
    title: 'Zero runtime dependencies',
    desc: 'Only Vue 3 itself. Every motion is driven by native CSS and modern Web APIs — small footprint, full control.'
  },
  {
    title: 'Fully typed with TypeScript',
    desc: 'Complete props and emits typings for every component. Smart hints and type-checking right in your editor.'
  },
  {
    title: 'Silky out of the box',
    desc: 'Carefully tuned easing curves and micro-interactions. Copy and use — no more fiddling for the "feel".'
  },
  {
    title: 'Accessible & graceful',
    desc: 'Built-in prefers-reduced-motion support that respects the system reduced-motion setting.'
  },
  {
    title: 'Composition API',
    desc: 'Built on <script setup> and the Composition API — clean logic that is easy to extend.'
  },
  {
    title: 'The demo is the docs',
    desc: 'This very page is living documentation. What you see is what you get, lowering the onboarding cost.'
  }
]

// Interactive demo state
const switchOn = ref(true)
const progress = ref(35)
function bumpProgress() {
  progress.value = Math.min(100, progress.value + 18)
}

const dialogOpen = ref(false)

const paletteOpen = ref(false)
const commands: Command[] = [
  { id: 'home', title: 'Go to Home', group: 'Navigation', icon: '⌂' },
  { id: 'docs', title: 'Open Documentation', group: 'Navigation', icon: '❏' },
  { id: 'confetti', title: 'Launch Confetti', group: 'Playground', icon: '✦' },
  { id: 'toast', title: 'Show a Toast', group: 'Playground', icon: '☕' },
  { id: 'theme', title: 'Toggle Theme', group: 'Settings', icon: '◐' },
  { id: 'github', title: 'View on GitHub', group: 'Links', icon: '⌨' }
]
function onCommand(cmd: Command) {
  if (cmd.id === 'confetti') fireConfetti()
  else if (cmd.id === 'toast') toast.success(`Command triggered: ${cmd.title}`)
  else toast.info(`Selected: ${cmd.title}`)
}

const marqueeTags = ['Vue 3', 'TypeScript', 'Vite', 'Animation', 'Micro-interaction', 'Composition API', 'Canvas', 'Teleport']

function onGlobalKey(e: KeyboardEvent) {
  if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
    e.preventDefault()
    paletteOpen.value = !paletteOpen.value
  }
}
onMounted(() => window.addEventListener('keydown', onGlobalKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onGlobalKey))
</script>

<template>
  <div class="page">
    <!-- Hero -->
    <header class="hero">
      <AuroraBackground />
      <Spotlight class="hero__spotlight" />
      <nav class="nav">
        <span class="nav__logo">Aura<span>UI</span></span>
        <div class="nav__links">
          <a href="#components">Components</a>
          <a href="#playground">Playground</a>
          <a href="#install">Install</a>
          <a href="https://github.com/liuzhengming/aura-ui" target="_blank" rel="noopener">GitHub</a>
        </div>
      </nav>
      <div class="hero__inner">
        <ScrollReveal>
          <span class="hero__badge">Vue 3 · TypeScript · Zero dependencies</span>
        </ScrollReveal>
        <ScrollReveal :delay="80">
          <h1 class="hero__title">
            <GradientText>Aura UI</GradientText> <br />
            <span class="hero__sub">Inject silky motion into Vue</span>
          </h1>
        </ScrollReveal>
        <ScrollReveal :delay="160">
          <p class="hero__type">
            <Typewriter text="A micro-interaction & animation component library for Vue 3." :speed="38" />
          </p>
        </ScrollReveal>
        <ScrollReveal :delay="240">
          <div class="hero__actions">
            <MagneticButton @click="paletteOpen = true">Open Command Palette</MagneticButton>
            <RippleButton variant="outline" @click="fireConfetti()">Launch Confetti</RippleButton>
          </div>
        </ScrollReveal>
        <ScrollReveal :delay="320">
          <div class="hero__stats">
            <div class="hero__stat"><CountUp :value="23" /><span>components</span></div>
            <div class="hero__stat"><CountUp :value="0" /><span>runtime deps</span></div>
            <div class="hero__stat"><CountUp :value="100" suffix="%" /><span>TypeScript</span></div>
          </div>
        </ScrollReveal>
      </div>
    </header>

    <!-- Components gallery -->
    <main class="container" id="components">
      <ScrollReveal>
        <h2 class="section-title">Components</h2>
        <p class="section-desc">Every component is interactive. Hover, click, and scroll to feel the motion.</p>
      </ScrollReveal>

      <!-- Buttons -->
      <section class="grid">
        <GlowCard class="demo-card">
          <h3>Magnetic & Ripple Button</h3>
          <div class="row">
            <MagneticButton>Get Started</MagneticButton>
            <RippleButton>Ripple</RippleButton>
            <RippleButton variant="outline">Outline</RippleButton>
          </div>
        </GlowCard>

        <GlowCard class="demo-card">
          <h3>Tooltip</h3>
          <div class="row">
            <Tooltip text="Hello from the top" side="top"><RippleButton variant="outline">Top</RippleButton></Tooltip>
            <Tooltip text="Bottom tip" side="bottom"><RippleButton variant="outline">Bottom</RippleButton></Tooltip>
            <Tooltip text="Left tip" side="left"><RippleButton variant="outline">Left</RippleButton></Tooltip>
            <Tooltip text="Right tip" side="right"><RippleButton variant="outline">Right</RippleButton></Tooltip>
          </div>
        </GlowCard>
      </section>

      <!-- Cards -->
      <section class="grid grid--3">
        <TiltCard class="demo-card tilt">
          <h3>Tilt Card</h3>
          <p>Move your cursor over me — I tilt in 3D with a moving highlight.</p>
        </TiltCard>
        <GlowCard class="demo-card">
          <h3>Glow Card</h3>
          <p>A soft glow follows your cursor across the surface.</p>
        </GlowCard>
        <GlowCard class="demo-card">
          <h3>Spotlight</h3>
          <p>Wrap content in a spotlight layer for a focused light effect.</p>
        </GlowCard>
      </section>

      <!-- Text & motion -->
      <section class="grid">
        <GlowCard class="demo-card">
          <h3>Gradient & Typewriter & Blur Text</h3>
          <p class="big"><GradientText>Flowing gradient</GradientText></p>
          <p><Typewriter text="Typing out a sentence, character by character." :speed="45" /></p>
          <p class="big"><BlurText text="Revealed letter by letter on scroll" :stagger="34" /></p>
        </GlowCard>
        <GlowCard class="demo-card">
          <h3>CountUp & Marquee</h3>
          <p class="count"><CountUp :value="128450" :duration="2" /></p>
          <p class="muted">Downloads this month</p>
          <div class="marquee-box">
            <Marquee :speed="48" :gap="14">
              <span v-for="t in marqueeTags" :key="t" class="chip">{{ t }}</span>
            </Marquee>
          </div>
        </GlowCard>
      </section>

      <!-- Feedback controls -->
      <section class="grid">
        <GlowCard class="demo-card">
          <h3>Switch</h3>
          <div class="row">
            <Switch v-model="switchOn" label="Enable" />
            <Switch size="sm" v-model="switchOn" />
            <Switch size="lg" :model-value="false" disabled />
            <span class="muted">state: {{ switchOn ? 'on' : 'off' }}</span>
          </div>
        </GlowCard>
        <GlowCard class="demo-card">
          <h3>Progress</h3>
          <Progress :value="progress" :height="12" show-label striped />
          <div class="row" style="margin-top: 14px">
            <RippleButton variant="outline" @click="bumpProgress">Advance +18</RippleButton>
            <RippleButton variant="outline" @click="progress = 0">Reset</RippleButton>
          </div>
        </GlowCard>
      </section>

      <!-- Layout -->
      <section class="grid">
        <GlowCard class="demo-card">
          <h3>Accordion</h3>
          <Accordion>
            <AccordionItem title="What is Aura UI?" id="a1">
              <p>A Vue 3 component library focused on micro-interactions and motion, with zero runtime dependencies.</p>
            </AccordionItem>
            <AccordionItem title="Is it tree-shakable?" id="a2">
              <p>Yes. Every component is exported independently and fully tree-shakable via the ESM build.</p>
            </AccordionItem>
            <AccordionItem title="Does it support TypeScript?" id="a3">
              <p>Completely. All props and emits are typed, and the demo is the documentation.</p>
            </AccordionItem>
          </Accordion>
        </GlowCard>
        <GlowCard class="demo-card">
          <h3>Tabs</h3>
          <Tabs>
            <Tab name="overview" label="Overview">
              <p>Aura UI ships 20+ components covering buttons, cards, text, feedback and layout.</p>
            </Tab>
            <Tab name="motion" label="Motion">
              <p>Spring transitions, tilt, glow, marquee and canvas confetti are all included.</p>
            </Tab>
            <Tab name="a11y" label="Accessibility">
              <p>prefers-reduced-motion is respected across the library.</p>
            </Tab>
          </Tabs>
        </GlowCard>
      </section>

      <!-- Dialog & Toast & Skeleton -->
      <section class="grid">
        <GlowCard class="demo-card">
          <h3>Dialog & Toast</h3>
          <div class="row">
            <RippleButton @click="dialogOpen = true">Open Dialog</RippleButton>
            <RippleButton variant="outline" @click="toast.success('Saved successfully')">Success</RippleButton>
            <RippleButton variant="outline" @click="toast.error('Something went wrong')">Error</RippleButton>
            <RippleButton variant="outline" @click="toast.info('New version available')">Info</RippleButton>
          </div>
        </GlowCard>
        <GlowCard class="demo-card">
          <h3>Skeleton</h3>
          <div class="skeleton-row">
            <Skeleton :circle="true" :width="'48px'" :height="'48px'" />
            <div style="flex: 1">
              <Skeleton :width="'70%'" :height="'12px'" style="margin-bottom: 8px" />
              <Skeleton :width="'100%'" :height="'12px'" />
            </div>
          </div>
        </GlowCard>
      </section>
    </main>

    <!-- Playground -->
    <section class="container" id="playground">
      <ScrollReveal>
        <h2 class="section-title">Command Palette</h2>
        <p class="section-desc">
          Press <kbd>Cmd</kbd>/<kbd>Ctrl</kbd> + <kbd>K</kbd> anywhere, or click the button. Fully keyboard navigable.
        </p>
      </ScrollReveal>
      <ScrollReveal :delay="120">
        <GlowCard class="demo-card">
          <div class="row">
            <MagneticButton @click="paletteOpen = true">Open Palette</MagneticButton>
            <RippleButton variant="outline" @click="fireConfetti()">Fire Confetti</RippleButton>
          </div>
        </GlowCard>
      </ScrollReveal>
    </section>

    <!-- Install -->
    <section class="container" id="install">
      <ScrollReveal>
        <h2 class="section-title">Install</h2>
      </ScrollReveal>
      <ScrollReveal :delay="100">
        <GlowCard class="demo-card code-card">
          <div class="code-head">
            <span>Terminal</span>
            <button class="copy-btn" @click="copy(installCmd)">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ installCmd }}</code></pre>
        </GlowCard>
      </ScrollReveal>
      <ScrollReveal :delay="160">
        <GlowCard class="demo-card code-card">
          <div class="code-head">
            <span>Usage</span>
            <button class="copy-btn" @click="copy(usageSnippet)">{{ copied ? 'Copied' : 'Copy' }}</button>
          </div>
          <pre><code>{{ usageSnippet }}</code></pre>
        </GlowCard>
      </ScrollReveal>
    </section>

    <!-- Features -->
    <section class="container">
      <ScrollReveal>
        <h2 class="section-title">Why Aura UI</h2>
      </ScrollReveal>
      <div class="features">
        <ScrollReveal v-for="(f, i) in features" :key="i" :delay="i * 60">
          <GlowCard class="feature-card">
            <h3>{{ f.title }}</h3>
            <p>{{ f.desc }}</p>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>

    <footer class="footer">
      <p>Aura UI — Inject silky motion into Vue.</p>
      <p class="muted">MIT License · Built with Vue 3 + TypeScript + Vite</p>
    </footer>

    <!-- Overlays -->
    <Dialog v-model="dialogOpen" title="Aura UI Dialog">
      <p>This dialog uses a spring-like transition with Teleport and ESC / overlay close.</p>
      <p class="muted">Try pressing ESC or clicking the overlay to dismiss.</p>
      <template #footer>
        <RippleButton @click="dialogOpen = false">Got it</RippleButton>
      </template>
    </Dialog>

    <CommandPalette v-model="paletteOpen" :commands="commands" @select="onCommand" />
    <ToastContainer />
  </div>
</template>

<style scoped>
.page {
  position: relative;
  color: #eaeaf2;
  font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', 'PingFang SC', 'Microsoft YaHei', sans-serif;
}
/* Hero */
.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #06070f;
}
.hero__spotlight {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.hero__inner {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  gap: 18px;
}
.nav {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 22px 40px;
}
.nav__logo {
  font-size: 20px;
  font-weight: 800;
  letter-spacing: 0.5px;
}
.nav__logo span {
  background: linear-gradient(135deg, #7c5cff, #4ad9ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.nav__links {
  display: flex;
  gap: 26px;
}
.nav__links a {
  color: rgba(255, 255, 255, 0.72);
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}
.nav__links a:hover {
  color: #fff;
}
.hero__badge {
  display: inline-block;
  padding: 7px 16px;
  border-radius: 999px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.85);
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
}
.hero__title {
  font-size: clamp(40px, 8vw, 86px);
  font-weight: 800;
  line-height: 1.05;
  margin: 0;
}
.hero__sub {
  font-size: clamp(20px, 3vw, 34px);
  font-weight: 600;
  background: linear-gradient(135deg, #c9c4ff, #9be7ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__type {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.7);
  min-height: 24px;
}
.hero__actions {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
  justify-content: center;
}
.hero__stats {
  display: flex;
  gap: 48px;
  margin-top: 10px;
}
.hero__stat {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero__stat :deep(.aura-count) {
  font-size: 38px;
  font-weight: 800;
  background: linear-gradient(135deg, #7c5cff, #4ad9ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__stat span {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.55);
  margin-top: 4px;
}

/* Layout */
.container {
  max-width: 1080px;
  margin: 0 auto;
  padding: 90px 24px;
}
.section-title {
  font-size: 32px;
  font-weight: 800;
  margin: 0 0 8px;
}
.section-desc {
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 36px;
  font-size: 15px;
}
.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}
.grid--3 {
  grid-template-columns: repeat(3, 1fr);
}
.demo-card {
  padding: 22px;
}
.demo-card h3 {
  margin: 0 0 14px;
  font-size: 16px;
}
.demo-card p {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin: 8px 0;
}
.demo-card .big {
  font-size: 22px;
  font-weight: 700;
  margin: 10px 0;
}
.row {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-wrap: wrap;
}
.muted {
  color: rgba(255, 255, 255, 0.5);
  font-size: 13px;
}
.count {
  font-size: 40px;
  font-weight: 800;
  margin: 0;
  background: linear-gradient(135deg, #7c5cff, #4ad9ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.marquee-box {
  margin-top: 16px;
  padding: 12px 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.06);
}
.chip {
  padding: 6px 14px;
  border-radius: 999px;
  font-size: 13px;
  background: rgba(124, 92, 255, 0.16);
  border: 1px solid rgba(124, 92, 255, 0.35);
  color: #d6ccff;
  white-space: nowrap;
}
.skeleton-row {
  display: flex;
  gap: 14px;
  align-items: center;
}
.features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}
.feature-card {
  padding: 24px;
  height: 100%;
}
.feature-card h3 {
  margin: 0 0 10px;
  font-size: 17px;
}
.feature-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.65);
  line-height: 1.65;
  font-size: 14px;
}
.code-card {
  margin-bottom: 18px;
}
.code-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}
.copy-btn {
  padding: 5px 12px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.04);
  color: #fff;
  cursor: pointer;
  font-size: 12px;
  transition: background 0.2s ease;
}
.copy-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}
pre {
  margin: 0;
  padding: 16px;
  border-radius: 10px;
  background: #0b0d18;
  overflow-x: auto;
  font-size: 13px;
  line-height: 1.6;
  color: #c8d3ff;
}
kbd {
  display: inline-block;
  padding: 2px 7px;
  border-radius: 6px;
  font-size: 12px;
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.16);
}
.footer {
  text-align: center;
  padding: 60px 20px;
  color: rgba(255, 255, 255, 0.7);
}
.footer .muted {
  margin-top: 6px;
}
@media (max-width: 760px) {
  .grid,
  .grid--3,
  .features {
    grid-template-columns: 1fr;
  }
  .hero__stats {
    gap: 28px;
  }
}
</style>
