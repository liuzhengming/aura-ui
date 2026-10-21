# Aura UI

<p align="center">
  <img src="https://img.shields.io/badge/Vue-3.4-42b883?style=flat-square&logo=vue.js&logoColor=white" alt="Vue" />
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178c6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-5.2-646cff?style=flat-square&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/license-MIT-ffd700?style=flat-square" alt="MIT" />
  <img src="https://img.shields.io/badge/dependencies-0-06d6a0?style=flat-square" alt="零运行时依赖" />
</p>

<p align="center">
  一套为丝滑微交互与现代动效而生的 Vue 3 组件库。<br />
  零运行时依赖 · 完整类型 · 默认暗色、内置亮色 · 中英双语文档。
</p>

<p align="center">
  <a href="https://liuzhengming.github.io/aura-ui/">在线演示与文档</a>
</p>

---

## 项目简介

Aura UI 是一套围绕**微交互与动效**构建的 Vue 3 组件库。它用极低的成本为界面注入精致的
"生命力"：磁吸按钮、3D 倾斜卡片、跟随光晕、命令面板、Canvas 礼花等——全部由原生 CSS
与现代 Web API 驱动，**除 Vue 3 本身外零运行时依赖**。

每个组件都提供完整的 TypeScript 类型，尊重系统的 `prefers-reduced-motion` 设置，并借助
一组 CSS 自定义属性同时适配暗色与亮色主题。本项目的在线演示同时就是文档：从左侧菜单选择
组件，即可看到实时示例、可直接复制的用法，以及完整的属性说明——支持中文与 English 切换。

## 特性

- **46 个组件**，覆盖 8 大分类：微交互、动效、数据录入、数据展示、反馈、浮层、导航、工具
- **零运行时依赖**（仅依赖 Vue 3 本身）
- **100% TypeScript**，完整的 `props` / `emits` 类型
- 全程使用 **Composition API**（`<script setup>`）
- **主题化设计**：默认暗色，亮色仅一步之遥，每个组件自动适配
- **无障碍**：内置减弱动效支持，浮层支持键盘导航
- **中英双语文档**，每个页面均带实时演示
- **按需引入**：仅打包你用到的组件

## 安装

```bash
npm install aura-ui
# 或
pnpm add aura-ui
# 或
yarn add aura-ui
```

## 快速上手

按需引入组件，并在应用入口引入一次样式：

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
    <MagneticButton>开始使用</MagneticButton>
    <RippleButton variant="solid">点我</RippleButton>
  </GlowCard>
</template>
```

Toast 与 Notification 采用组合式 API，在应用根节点附近挂载一次容器即可：

```vue
<script setup lang="ts">
import { ToastContainer, Notification, useToast, useNotification } from 'aura-ui'

const toast = useToast()
const notify = useNotification()
</script>

<template>
  <ToastContainer />
  <Notification />

  <button @click="toast.success('已保存')">通知</button>
  <button @click="notify.success('已部署', '构建耗时 12 秒')">部署</button>
</template>
```

## 组件一览

| 分类 | 组件 |
| --- | --- |
| 微交互 | `MagneticButton`、`RippleButton`、`GlowCard`、`TiltCard`、`Spotlight` |
| 动效与展示 | `GradientText`、`ScrollReveal`、`CountUp`、`Typewriter`、`AuroraBackground`、`Skeleton`、`BlurText`、`Marquee` |
| 数据录入 | `Input`、`Checkbox`、`RadioGroup`、`Radio`、`Switch`、`Slider`、`Select`、`Segmented`、`Rate` |
| 数据展示 | `Badge`、`Tag`、`Avatar`、`Progress`、`Carousel`、`Timeline` |
| 反馈 | `Dialog`、`Drawer`、`Alert`、`ToastContainer`、`Notification`、`Spinner` |
| 浮层 | `Tooltip`、`Popover`、`Dropdown`、`CommandPalette` |
| 导航 | `Tabs`、`Tab`、`Accordion`、`AccordionItem`、`Breadcrumb`、`Steps` |
| 工具 | `Kbd`、`CopyButton` |

库另导出组合式与工具：`useToast`、`useNotification`、`pushToast`、`pushNotification`、
`fireConfetti`，以及对应的 TypeScript 类型。

## 组件精选

以下片段对应组件真实的 API（与文档站点一致）。

**MagneticButton** —— 悬停时按钮轻柔跟随光标。

```vue
<MagneticButton>开始使用</MagneticButton>
<MagneticButton variant="ghost">幽灵</MagneticButton>
<MagneticButton :strength="0.7">更强吸附</MagneticButton>
```

**GlowCard / TiltCard** —— 随指针变化的表面。

```vue
<GlowCard>
  <h3>悬停我</h3>
  <p>一束柔光跟随光标。</p>
</GlowCard>

<TiltCard :max="20">
  <h3>3D 倾斜</h3>
  <p>移动指针即可倾斜卡片。</p>
</TiltCard>
```

**Switch / Slider / Rate** —— 带动画的、完整类型化的表单控件。

```vue
<Switch v-model="on" size="lg" />
<Slider v-model="volume" :min="0" :max="200" :step="5" />
<Rate v-model="score" :allow-half="true" />
```

**Select / Segmented** —— 自定义、键盘友好的选择器。

```vue
<Select v-model="fruit" :options="[
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' }
]" />

<Segmented v-model="seg" :options="['Day', 'Week', 'Month']" />
```

**Dialog / Drawer** —— 带弹簧入场与背景模糊的浮层。

```vue
<Dialog v-model="open" title="确认">
  确定要继续执行吗？
  <template #footer>
    <button @click="open = false">取消</button>
    <button @click="open = false">确认</button>
  </template>
</Dialog>

<Drawer v-model="open" title="设置" side="right">
  面板内容放在这里。
</Drawer>
```

**Tabs / Accordion** —— 可切换与可折叠的面板。

```vue
<Tabs>
  <Tab name="overview" label="概览">...</Tab>
  <Tab name="api" label="API">...</Tab>
</Tabs>

<Accordion>
  <AccordionItem id="a" title="Aura UI 是什么？">一套动效优先的 Vue 组件库。</AccordionItem>
  <AccordionItem id="b" title="免费吗？">是的，采用 MIT 协议。</AccordionItem>
</Accordion>
```

**CommandPalette** —— 支持全键盘导航的 `Cmd/Ctrl + K` 命令面板。

```vue
<CommandPalette v-model="open" :commands="commands" @select="run" />
```

**Tooltip / Popover / Dropdown** —— 锚定到触发元素的富内容浮层。

```vue
<Tooltip text="来顶部打个招呼" side="top">
  <RippleButton>悬停我</RippleButton>
</Tooltip>

<Popover title="账户">
  <template #trigger><RippleButton>打开</RippleButton></template>
  在此管理你的个人资料与设置。
</Popover>

<Dropdown :items="items" @select="onSelect">
  <RippleButton>菜单</RippleButton>
</Dropdown>
```

**Progress / CountUp / Skeleton** —— 生动的数据展示。

```vue
<Progress :value="65" show-label striped />
<CountUp :value="1280" />
<CountUp :value="99.9" :decimals="1" suffix="%" />
<Skeleton width="100%" height="16px" />
```

**GradientText / BlurText / Typewriter / ScrollReveal** —— 文字与动效。

```vue
<GradientText>流动的渐变文字</GradientText>
<BlurText text="逐字揭开我" />
<Typewriter text="使用 Vue 3 与 TypeScript 构建。" />
<ScrollReveal :delay="200" :y="40"><h2>滚动进入视口时显现</h2></ScrollReveal>
```

**Confetti** —— 可在任意位置触发的轻量 Canvas 礼花。

```ts
import { fireConfetti } from 'aura-ui'
fireConfetti()
fireConfetti({ count: 160, spread: 90 })
```

## 主题

Aura UI 基于 CSS 自定义属性构建，**默认暗色主题**；切换到亮色只需在根元素设置一个属性，
所有组件便自动换肤——无需任何逐组件的样式代码：

```ts
document.documentElement.dataset.theme = 'light' // 或 'dark'
```

在你的样式表中覆盖任意设计变量即可匹配品牌：

```css
:root {
  --aura-accent: #7c5cff;
  --aura-radius: 14px;
}
```

## 无障碍

- 所有动画都包裹在 `prefers-reduced-motion` 判断中，开启"减弱动效"的用户会获得平静、静态的体验。
- 浮层（Tooltip、Popover、Dropdown、CommandPalette）支持键盘导航与焦点管理，并可在 `Esc` 或点击外部时关闭。

## 目录结构

```
aura-ui/
├── .github/workflows/   # GitHub Pages 自动部署
├── src/
│   ├── lib/             # 组件库（即发布的包）
│   │   ├── components/  # 所有 .vue 组件
│   │   ├── toast.ts     # useToast 状态
│   │   ├── notification.ts # useNotification 状态
│   │   ├── confetti.ts  # fireConfetti 工具
│   │   └── index.ts     # 公开入口 / barrel
│   ├── docs/            # 文档站点（也是在线演示）
│   ├── App.vue          # 文档外壳：侧边栏 + 内容 + 目录
│   ├── style.css        # 设计变量（默认暗色 + 亮色）
│   └── main.ts
├── index.html
├── vite.config.ts
└── package.json
```

## 脚本

| 脚本 | 说明 |
| --- | --- |
| `npm run dev` | 本地启动文档站点 |
| `npm run build` | 生产构建文档站点（部署至 GitHub Pages） |
| `npm run type-check` | 运行 `vue-tsc` 类型检查 |
| `npm run preview` | 预览生产构建 |

## 在线演示

已通过 GitHub Pages 部署：
**https://liuzhengming.github.io/aura-ui/**

在你的 Fork 中开启：进入 **Settings → Pages → Source → GitHub Actions**。

## 贡献

欢迎提交 Issue 或 Pull Request。新增或修改组件时，请保持轻量、完整类型、兼容减弱动效，
并通过类型检查；新组件还需配套文档页面与属性说明表。

## 许可证

[MIT](./LICENSE)
