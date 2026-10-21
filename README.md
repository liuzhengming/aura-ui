# Aura UI

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4-42b883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.2-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/license-MIT-ffd700?style=flat-square" alt="MIT" />
  <img src="https://img.shields.io/badge/dependencies-0-06d6a0?style=flat-square" alt="Zero deps" />
</p>

<p align="center">
  A Vue 3 component library focused on micro-interactions and motion.<br />
  Zero runtime dependencies · Fully typed · Silky out of the box.
</p>

<p align="center">
  <a href="https://liuzhengming.github.io/aura-ui/">Live Demo</a> ·
  <a href="#english">English</a> ·
  <a href="#中文">中文</a>
</p>

---

## English

### What is Aura UI

Aura UI is a set of Vue 3 components built around **micro-interactions and motion**.
It gives your interface a refined, "alive" feel with almost no effort: magnetic buttons,
tilt cards, glow borders, a command palette, canvas confetti, and more — all driven by
native CSS and modern Web APIs, with **zero runtime dependencies**.

Every component ships with complete TypeScript typings, respects
`prefers-reduced-motion`, and is tree-shakable.

### Features

- **23 components** across micro-interactions, motion, and UI primitives
- **Zero runtime dependencies** (only Vue 3 itself)
- **100% TypeScript** with full `props` / `emits` typings
- **Composition API** (`<script setup>`) throughout
- **Accessible**: built-in `prefers-reduced-motion` support
- **The demo is the docs**: this site is living documentation

### Install

```bash
npm install aura-ui
# or
pnpm add aura-ui
```

### Quick start

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'aura-ui/dist/style.css' // if a bundled stylesheet is provided

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { MagneticButton, useToast, fireConfetti } from 'aura-ui'

const toast = useToast()
</script>

<template>
  <MagneticButton @click="fireConfetti()">Celebrate</MagneticButton>
  <MagneticButton @click="toast.success('Saved!')">Notify</MagneticButton>
</template>
```

### Components

| Category | Components |
| --- | --- |
| Micro-interactions | `MagneticButton`, `RippleButton`, `GlowCard`, `TiltCard`, `Spotlight` |
| Motion & display | `GradientText`, `ScrollReveal`, `CountUp`, `Typewriter`, `AuroraBackground`, `Skeleton`, `BlurText`, `Marquee` |
| UI primitives | `Dialog`, `Switch`, `Progress`, `Tooltip`, `Accordion`, `AccordionItem`, `Tabs`, `Tab`, `ToastContainer`, `CommandPalette` |
| Composables & utils | `useToast`, `fireConfetti` |

### Component highlights

**MagneticButton** — the button gently follows the cursor when hovered.

```vue
<MagneticButton>Get Started</MagneticButton>
```

**Switch** — an animated toggle with sizes and disabled state.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Switch } from 'aura-ui'
const on = ref(true)
</script>

<template>
  <Switch v-model="on" />
</template>
```

**Progress** — animated progress bar with optional stripes and label.

```vue
<Progress :value="64" :height="12" show-label striped />
```

**Tooltip** — hover/focus tooltip with four placement sides.

```vue
<Tooltip text="Hello!" side="top">
  <Button>Hover me</Button>
</Tooltip>
```

**Accordion / AccordionItem** — collapsible panels via provide/inject.

```vue
<Accordion>
  <AccordionItem title="What is Aura UI?" id="q1">A motion-first Vue library.</AccordionItem>
  <AccordionItem title="Zero deps?" id="q2">Yes, only Vue 3.</AccordionItem>
</Accordion>
```

**Tabs / Tab** — tab switcher with a sliding indicator.

```vue
<Tabs>
  <Tab name="a" label="Overview">Content A</Tab>
  <Tab name="b" label="Motion">Content B</Tab>
</Tabs>
```

**CommandPalette** — a `Cmd/Ctrl + K` command palette, fully keyboard navigable.

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { CommandPalette, type Command } from 'aura-ui'

const open = ref(false)
const commands: Command[] = [
  { id: 'home', title: 'Go to Home', group: 'Navigation' },
  { id: 'star', title: 'Star on GitHub', group: 'Links' }
]
</script>

<template>
  <CommandPalette v-model="open" :commands="commands" @select="(c) => console.log(c)" />
</template>
```

**Toast** — push notifications through the `useToast` composable.

```ts
import { useToast } from 'aura-ui'
const toast = useToast()
toast.success('Saved successfully')
toast.error('Something went wrong')
```

Mount `<ToastContainer />` once near your app root.

**Confetti** — a lightweight canvas confetti burst.

```ts
import { fireConfetti } from 'aura-ui'
fireConfetti()
```

**BlurText** — reveal text letter by letter on scroll.

```vue
<BlurText text="Revealed on scroll" :stagger="34" />
```

**Marquee** — seamless infinite scroll, speed and direction configurable.

```vue
<Marquee :speed="48" :gap="14">
  <span class="chip">Vue 3</span>
  <span class="chip">TypeScript</span>
</Marquee>
```

### Design tokens

Aura UI is built on CSS custom properties. The dark theme is the default; tokens live in
`src/style.css` and are easy to override for your own brand.

### Project structure

```
aura-ui/
├── .github/workflows/   # GitHub Pages auto-deploy
├── src/
│   ├── lib/             # the component library (this is the package)
│   │   ├── components/  # all .vue components
│   │   ├── toast.ts     # useToast store
│   │   ├── confetti.ts  # fireConfetti util
│   │   └── index.ts     # public entry / barrel
│   ├── App.vue          # the demo site (also the documentation)
│   └── main.ts
├── index.html
├── vite.config.ts
└── package.json
```

### Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the demo site locally |
| `npm run build` | Build the demo site for production |
| `npm run type-check` | Run `vue-tsc` type checking |
| `npm run preview` | Preview the production build |

### Online demo

The live demo is deployed to GitHub Pages:
**https://liuzhengming.github.io/aura-ui/**

To enable it on your fork: go to **Settings → Pages → Source → GitHub Actions**.

### Contributing

Contributions are welcome. Please open an issue or a pull request. Keep components
framework-light, fully typed, and reduced-motion friendly.

### License

[MIT](./LICENSE)

---

## 中文

### Aura UI 是什么

Aura UI 是一套围绕**微交互与动效**构建的 Vue 3 组件库。它用极低的成本为你的界面注入
精致的"生命力"：磁吸按钮、3D 倾斜卡片、跟随光晕、命令面板、Canvas 礼花等——全部由
原生 CSS 与现代 Web API 驱动，**零运行时依赖**。

每个组件都提供完整的 TypeScript 类型，尊重系统的 `prefers-reduced-motion` 设置，
并且完全支持 Tree-shaking。

### 特性

- **23 个组件**，覆盖微交互、动效与基础 UI
- **零运行时依赖**（仅依赖 Vue 3 本身）
- **100% TypeScript**，完整的 `props` / `emits` 类型
- 全程使用 **Composition API**（`<script setup>`）
- **无障碍**：内置减弱动效支持
- **演示即文档**：本站点就是活文档

### 安装

```bash
npm install aura-ui
# 或
pnpm add aura-ui
```

### 快速上手

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import 'aura-ui/dist/style.css' // 若提供打包样式

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { MagneticButton, useToast, fireConfetti } from 'aura-ui'
const toast = useToast()
</script>

<template>
  <MagneticButton @click="fireConfetti()">庆祝一下</MagneticButton>
  <MagneticButton @click="toast.success('已保存')">通知</MagneticButton>
</template>
```

### 组件一览

| 分类 | 组件 |
| --- | --- |
| 微交互 | `MagneticButton`、`RippleButton`、`GlowCard`、`TiltCard`、`Spotlight` |
| 动效与展示 | `GradientText`、`ScrollReveal`、`CountUp`、`Typewriter`、`AuroraBackground`、`Skeleton`、`BlurText`、`Marquee` |
| 基础 UI | `Dialog`、`Switch`、`Progress`、`Tooltip`、`Accordion`、`AccordionItem`、`Tabs`、`Tab`、`ToastContainer`、`CommandPalette` |
| 组合式与工具 | `useToast`、`fireConfetti` |

用法示例与英文版一致，可参考上方各组件的代码片段。

### 设计变量

Aura UI 基于 CSS 自定义属性构建，默认暗色主题，变量集中在 `src/style.css`，便于按品牌覆盖。

### 目录结构

```
aura-ui/
├── .github/workflows/   # GitHub Pages 自动部署
├── src/
│   ├── lib/             # 组件库（即发布的包）
│   │   ├── components/  # 所有 .vue 组件
│   │   ├── toast.ts     # useToast 状态
│   │   ├── confetti.ts  # fireConfetti 工具
│   │   └── index.ts     # 公开入口 / barrel
│   ├── App.vue          # 演示站（也是文档）
│   └── main.ts
├── index.html
├── vite.config.ts
└── package.json
```

### 脚本

| 脚本 | 说明 |
| --- | --- |
| `npm run dev` | 本地启动演示站 |
| `npm run build` | 生产构建演示站 |
| `npm run type-check` | 运行 `vue-tsc` 类型检查 |
| `npm run preview` | 预览生产构建 |

### 在线演示

已通过 GitHub Pages 部署：
**https://liuzhengming.github.io/aura-ui/**

在你的 Fork 中开启：进入 **Settings → Pages → Source → GitHub Actions**。

### 贡献

欢迎提交 Issue 或 Pull Request。组件请保持轻量、完整类型、并兼容减弱动效。

### 许可证

[MIT](./LICENSE)
