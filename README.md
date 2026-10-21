# Aura UI

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4-42b883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.2-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/license-MIT-ffd700?style=flat-square" alt="MIT" />
  <img src="https://img.shields.io/badge/dependencies-0-06d6a0?style=flat-square" alt="Zero runtime dependencies" />
</p>

<p align="center">
  A Vue 3 component library crafted for silky micro-interactions and modern motion.<br />
  Zero runtime dependencies · Fully typed · Dark by default, light included · Bilingual docs.
</p>

<p align="center">
  <a href="https://liuzhengming.github.io/aura-ui/">Live Demo &amp; Documentation</a>
</p>

---

## Introduction

Aura UI is a collection of Vue 3 components built around **micro-interactions and motion**. It
gives interfaces a refined, "alive" feel with almost no effort: magnetic buttons, tilt cards,
glow borders, a command palette, canvas confetti, and dozens more — all driven by native CSS
and modern Web APIs, with **zero runtime dependencies** beyond Vue 3 itself.

Every component ships with complete TypeScript typings, respects `prefers-reduced-motion`,
and adapts to both dark and light themes through a single set of CSS custom properties. The
live demo on this site doubles as the documentation: pick a component from the left menu and
you get a live example, copy-paste usage, and the full prop reference — in either English or
中文.

## Features

- **46 components** across 8 categories: micro-interactions, motion, data entry, data display, feedback, overlay, navigation, and utilities
- **Zero runtime dependencies** (only Vue 3 itself)
- **100% TypeScript** with complete `props` / `emits` typings
- **Composition API** (`<script setup>`) throughout
- **Theming by design**: dark is the default, light is one attribute away, every component adapts automatically
- **Accessible**: built-in `prefers-reduced-motion` support and keyboard-navigable overlays
- **Bilingual documentation** (English / 中文) with live demos on every page
- **Tree-shakable**: import only what you use

## Installation

```bash
npm install aura-ui
# or
pnpm add aura-ui
# or
yarn add aura-ui
```

## Quick Start

Import the components you need and the bundled stylesheet once at your app entry:

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'aura-ui/dist/style.css'
import { MagneticButton, GlowCard, useToast, fireConfetti } from 'aura-ui'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { MagneticButton, RippleButton, GlowCard } from 'aura-ui'
</script>

<template>
  <GlowCard>
    <MagneticButton>Get Started</MagneticButton>
    <RippleButton variant="solid">Click me</RippleButton>
  </GlowCard>
</template>
```

Toast and Notification use a composable API. Mount their containers once near your app root:

```vue
<script setup lang="ts">
import { ToastContainer, Notification, useToast, useNotification } from 'aura-ui'

const toast = useToast()
const notify = useNotification()
</script>

<template>
  <ToastContainer />
  <Notification />

  <button @click="toast.success('Saved!')">Notify</button>
  <button @click="notify.success('Deployed', 'Build finished in 12s')">Deploy</button>
</template>
```

## Components

| Category | Components |
| --- | --- |
| Micro-interactions | `MagneticButton`, `RippleButton`, `GlowCard`, `TiltCard`, `Spotlight` |
| Motion &amp; display | `GradientText`, `ScrollReveal`, `CountUp`, `Typewriter`, `AuroraBackground`, `Skeleton`, `BlurText`, `Marquee` |
| Data entry | `Input`, `Checkbox`, `RadioGroup`, `Radio`, `Switch`, `Slider`, `Select`, `Segmented`, `Rate` |
| Data display | `Badge`, `Tag`, `Avatar`, `Progress`, `Carousel`, `Timeline` |
| Feedback | `Dialog`, `Drawer`, `Alert`, `ToastContainer`, `Notification`, `Spinner` |
| Overlay | `Tooltip`, `Popover`, `Dropdown`, `CommandPalette` |
| Navigation | `Tabs`, `Tab`, `Accordion`, `AccordionItem`, `Breadcrumb`, `Steps` |
| Utilities | `Kbd`, `CopyButton` |

The library also exports composables and helpers: `useToast`, `useNotification`, `pushToast`,
`pushNotification`, `fireConfetti`, plus their TypeScript types.

## Highlights

The snippets below reflect the real component APIs (the same ones the demo site documents).

**MagneticButton** — the button gently follows the cursor when hovered.

```vue
<MagneticButton>Get Started</MagneticButton>
<MagneticButton variant="ghost">Ghost</MagneticButton>
<MagneticButton :strength="0.7">Stronger pull</MagneticButton>
```

**GlowCard / TiltCard** — surfaces that react to the pointer.

```vue
<GlowCard>
  <h3>Hover me</h3>
  <p>A soft light follows your cursor.</p>
</GlowCard>

<TiltCard :max="20">
  <h3>3D Tilt</h3>
  <p>Move your pointer to tilt the card.</p>
</TiltCard>
```

**Switch / Slider / Rate** — animated, fully typed form controls.

```vue
<Switch v-model="on" size="lg" />
<Slider v-model="volume" :min="0" :max="200" :step="5" />
<Rate v-model="score" :allow-half="true" />
```

**Select / Segmented** — custom, keyboard-friendly pickers.

```vue
<Select v-model="fruit" :options="[
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' }
]" />

<Segmented v-model="seg" :options="['Day', 'Week', 'Month']" />
```

**Dialog / Drawer** — overlays with a springy entrance and backdrop blur.

```vue
<Dialog v-model="open" title="Confirm">
  Are you sure you want to continue?
  <template #footer>
    <button @click="open = false">Cancel</button>
    <button @click="open = false">Confirm</button>
  </template>
</Dialog>

<Drawer v-model="open" title="Settings" side="right">
  Panel content goes here.
</Drawer>
```

**Tabs / Accordion** — switchable and collapsible panels.

```vue
<Tabs>
  <Tab name="overview" label="Overview">...</Tab>
  <Tab name="api" label="API">...</Tab>
</Tabs>

<Accordion>
  <AccordionItem id="a" title="What is Aura UI?">A motion-first Vue library.</AccordionItem>
  <AccordionItem id="b" title="Is it free?">Yes, MIT licensed.</AccordionItem>
</Accordion>
```

**CommandPalette** — a `Cmd/Ctrl + K` palette with full keyboard navigation.

```vue
<CommandPalette v-model="open" :commands="commands" @select="run" />
```

**Tooltip / Popover / Dropdown** — rich overlays anchored to a trigger.

```vue
<Tooltip text="Hello from the top" side="top">
  <RippleButton>Hover me</RippleButton>
</Tooltip>

<Popover title="Account">
  <template #trigger><RippleButton>Open</RippleButton></template>
  Manage your profile and settings here.
</Popover>

<Dropdown :items="items" @select="onSelect">
  <RippleButton>Menu</RippleButton>
</Dropdown>
```

**Progress / CountUp / Skeleton** — lively data display.

```vue
<Progress :value="65" show-label striped />
<CountUp :value="1280" />
<CountUp :value="99.9" :decimals="1" suffix="%" />
<Skeleton width="100%" height="16px" />
```

**GradientText / BlurText / Typewriter / ScrollReveal** — text and motion effects.

```vue
<GradientText>Flowing gradient text</GradientText>
<BlurText text="Reveal me letter by letter" />
<Typewriter text="Built with Vue 3 and TypeScript." />
<ScrollReveal :delay="200" :y="40"><h2>Visible on scroll</h2></ScrollReveal>
```

**Confetti** — a lightweight canvas burst you can fire from anywhere.

```ts
import { fireConfetti } from 'aura-ui'
fireConfetti()
fireConfetti({ count: 160, spread: 90 })
```

## Theming

Aura UI is built on CSS custom properties. The **dark theme is the default**; switching to
light is a single attribute on the root element and every component re-skins itself
automatically — no per-component theme code required:

```ts
document.documentElement.dataset.theme = 'light' // or 'dark'
```

Override any design token in your own stylesheet to match your brand:

```css
:root {
  --aura-accent: #7c5cff;
  --aura-radius: 14px;
}
```

## Accessibility

- Every animation is wrapped in `prefers-reduced-motion` guards, so users who request reduced
  motion get a calm, static experience.
- Overlays (Tooltip, Popover, Dropdown, CommandPalette) support keyboard navigation and
  focus management, and dismiss on `Esc` or outside click.

## Project Structure

```
aura-ui/
├── .github/workflows/   # GitHub Pages auto-deploy
├── src/
│   ├── lib/             # the component library (this is the package)
│   │   ├── components/  # all .vue components
│   │   ├── toast.ts     # useToast store
│   │   ├── notification.ts # useNotification store
│   │   ├── confetti.ts  # fireConfetti util
│   │   └── index.ts     # public entry / barrel
│   ├── docs/            # the documentation site (also the live demo)
│   ├── App.vue          # docs shell: sidebar + content + TOC
│   ├── style.css        # design tokens (dark default + light)
│   └── main.ts
├── index.html
├── vite.config.ts
└── package.json
```

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the documentation site locally |
| `npm run build` | Build the documentation site for production (deploys to GitHub Pages) |
| `npm run type-check` | Run `vue-tsc` type checking |
| `npm run preview` | Preview the production build |

## Live Demo

The live documentation is deployed to GitHub Pages:
**https://liuzhengming.github.io/aura-ui/**

To enable it on your fork: go to **Settings → Pages → Source → GitHub Actions**.

## Contributing

Contributions are welcome — open an issue or a pull request. When adding or changing a
component, please keep it framework-light, fully typed, reduced-motion friendly, and covered
by the type checker. New components should also get a documentation page and a prop table.

## License

[MIT](./LICENSE)
