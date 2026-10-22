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
  Zero runtime dependencies · Fully typed · Dark by default, light included · Mobile-ready · Bilingual docs.
</p>

<p align="center">
  <a href="https://liuzhengming.github.io/aura-ui/">Live Demo &amp; Documentation</a>
</p>

---

## Introduction

Aura UI is a collection of **69 Vue 3 components** built around **micro-interactions, motion and
complete UI coverage**. It gives interfaces a refined, "alive" feel with almost no effort — magnetic
buttons, tilt cards, glow borders, a command palette, canvas confetti, plus the full set of
production-grade primitives (tables, forms, navigation, layout) you expect from a mature library
such as Element Plus — all driven by native CSS and modern Web APIs, with **zero runtime
dependencies** beyond Vue 3 itself.

Every component ships with complete TypeScript typings, respects `prefers-reduced-motion`, adapts
to both dark and light themes through a single set of CSS custom properties, and is responsive out
of the box (touch-friendly sizing, a 24-column grid, and safe-area support for mobile). The live
demo on this site doubles as the documentation: pick a component from the left menu and you get a
live example, copy-paste usage, and the full prop reference — in either English or 中文.

## Features

- **69 components** across 9 categories: micro-interactions, motion &amp; effects, data entry, data display, feedback, overlay, navigation, layout, and utilities
- **Zero runtime dependencies** (only Vue 3 itself)
- **100% TypeScript** with complete `props` / `emits` typings
- **Composition API** (`<script setup>`) throughout
- **Out of the box**: `app.use(AuraUI)` registers everything globally, or use the `AuraUIResolver` for on-demand auto-import
- **Mobile-ready**: responsive 24-column grid, touch-friendly tap targets, and `env(safe-area-inset-*)` support
- **Theming by design**: dark is the default, light is one attribute away, every component adapts automatically
- **Accessible**: built-in `prefers-reduced-motion` support, keyboard-navigable overlays, ARIA roles
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

**Option A — explicit imports (tree-shakable, recommended):**

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

**Option B — global registration (out of the box):**

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import AuraUI from 'aura-ui'
import 'aura-ui/dist/style.css'

createApp(App).use(AuraUI).mount('#app')
```

```vue
<template>
  <!-- components are globally available; no imports needed -->
  <MagneticButton>Get Started</MagneticButton>
</template>
```

**Option C — on-demand auto-import (no global registration, no manual imports):**

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { AuraUIResolver } from 'aura-ui'

export default {
  plugins: [
    Components({ resolvers: [AuraUIResolver()] })
  ]
}
```

Toast and Notification use a composable API. Mount their containers once near your app root
(required in every install mode):

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
| Motion &amp; effects | `GradientText`, `Typewriter`, `BlurText`, `ScrollReveal`, `AuroraBackground`, `Marquee`, `CountUp`, `Skeleton` |
| Data entry | `Input`, `Checkbox`, `RadioGroup`, `Radio`, `Switch`, `Slider`, `Select`, `Segmented`, `Rate` |
| Data display | `Badge`, `Tag`, `Avatar`, `Progress`, `Carousel`, `Timeline`, `Table`, `Pagination`, `Tree`, `Calendar`, `Descriptions`, `Empty`, `Image`, `Result`, `Link` |
| Feedback | `Dialog`, `Drawer`, `Alert`, `ToastContainer`, `Notification`, `Spinner`, `Collapse`, `Loading`, `Backtop` |
| Overlay | `Tooltip`, `Popover`, `Dropdown`, `CommandPalette` |
| Navigation | `Tabs`, `Tab`, `Accordion`, `AccordionItem`, `Breadcrumb`, `Steps` |
| Layout | `Container`, `Header`, `Aside`, `Main`, `Footer`, `Row`, `Col`, `Space`, `Divider` |
| Utilities | `Kbd`, `CopyButton`, `Confetti` |

The library also exports composables and helpers: `useToast`, `useNotification`, `pushToast`,
`pushNotification`, `fireConfetti`, `useBreakpoint`, plus their TypeScript types
(`ToastType`, `NotificationType`, `TableColumn`, `AuraTreeItem`, `DescItem`, `SelectOption`,
`Breakpoint`, `ConfettiOptions`).

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

**Tabs / Accordion / Collapse** — switchable and collapsible panels.

```vue
<Tabs>
  <Tab name="overview" label="Overview">...</Tab>
  <Tab name="api" label="API">...</Tab>
</Tabs>

<Accordion>
  <AccordionItem id="a" title="What is Aura UI?">A motion-first Vue library.</AccordionItem>
  <AccordionItem id="b" title="Is it free?">Yes, MIT licensed.</AccordionItem>
</Accordion>

<Collapse :model-value="['a']">
  <CollapseItem name="a" title="What is Aura UI?">A motion-first Vue library.</CollapseItem>
  <CollapseItem name="b" title="Is it free?">Yes, MIT licensed.</CollapseItem>
</Collapse>
```

**CommandPalette** — a `Cmd/Ctrl + K` palette with full keyboard navigation.

```vue
<CommandPalette v-model="open" :commands="commands" @select="run" />
```

**Table / Pagination / Tree / Calendar** — production-grade data display.

```vue
<Table :columns="columns" :data="rows" striped hover bordered />
<Pagination v-model="page" :total="120" :page-size="10" />
<Tree :data="treeData" default-expand-all />
<Calendar v-model="date" />
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

**Layout grid (responsive)** — a 24-column grid plus layout containers.

```vue
<Row :gutter="16">
  <Col :span="8"><div>span 8</div></Col>
  <Col :span="8"><div>span 8</div></Col>
  <Col :span="8"><div>span 8</div></Col>
</Row>

<!-- responsive: full width on mobile, third on desktop -->
<Row :gutter="16">
  <Col :xs="24" :md="12" :lg="8"><div>responsive</div></Col>
  <Col :xs="24" :md="12" :lg="8"><div>responsive</div></Col>
  <Col :xs="24" :md="12" :lg="8"><div>responsive</div></Col>
</Row>
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

**Image (lazy + preview) / Result / Empty** — polished content states.

```vue
<Image src="/photo.jpg" width="200px" height="120px" radius="12px" preview />
<Result status="success" title="Success" subtitle="Operation completed." />
<Empty description="No results found" />
```

**Backtop / Loading** — feedback helpers.

```vue
<Backtop :visibility-height="200" />
<Loading :loading="loading" tip="Loading..."><p>Content</p></Loading>
```

**Confetti** — a lightweight canvas burst you can fire from anywhere.

```ts
import { fireConfetti } from 'aura-ui'
fireConfetti()
fireConfetti({ count: 160, spread: 90 })
```

## Mobile &amp; Responsive

Aura UI is built mobile-first:

- A reactive `useBreakpoint()` composable (`xs / sm / md / lg / xl / xxl`) powers the responsive `Row` / `Col` grid — set a span per breakpoint and the layout reflows automatically.
- Tap targets use a `--aura-tap-min` token so buttons and controls are comfortable on touch screens.
- `Backtop`, overlays and fixed elements respect `env(safe-area-inset-*)` so they clear notches and home indicators.
- All components scale fluidly and the documentation site itself is responsive.

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
- Interactive primitives use semantic elements and ARIA roles where appropriate.

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
│   │   ├── breakpoint.ts # useBreakpoint / pickResponsive
│   │   ├── index.ts     # public entry / barrel (install + resolver)
│   │   └── ...
│   ├── docs/            # the documentation site (also the live demo)
│   ├── App.vue          # docs shell: sidebar + content + TOC
│   ├── style.css        # design tokens (dark default + light + responsive)
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
