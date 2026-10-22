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
  零运行时依赖 · 完整类型 · 默认暗色、内置亮色 · 移动端就绪 · 中英双语文档。
</p>

<p align="center">
  <a href="https://liuzhengming.github.io/aura-ui/">在线演示与文档</a>
</p>

---

## 项目简介

Aura UI 是一套包含 **80 个 Vue 3 组件**的集合，围绕**微交互、动效与完整的 UI 覆盖**构建。
它用极低的成本为界面注入精致的"生命力"：磁吸按钮、3D 倾斜卡片、跟随光晕、命令面板、Canvas 礼花，
以及成熟库（如 Element Plus）所具备的一整套生产级基础组件（表格、表单、导航、布局）——全部由原生
CSS 与现代 Web API 驱动，**除 Vue 3 本身外零运行时依赖**。

每个组件都提供完整的 TypeScript 类型，尊重系统的 `prefers-reduced-motion` 设置，借助一组 CSS 自定义
属性同时适配暗色与亮色主题，并且开箱即用地做好了响应式（触控友好的尺寸、24 栅格、对移动端安全区的
支持）。本项目的在线演示同时就是文档：从左侧菜单选择组件，即可看到实时示例、可直接复制的用法以及
完整的属性说明——支持中文与 English 切换。

## 特性

- **80 个组件**，覆盖 10 大分类：微交互、动效、数据录入、数据展示、反馈、浮层、导航、布局、工具、全局配置
- **零运行时依赖**（仅依赖 Vue 3 本身）
- **100% TypeScript**，完整的 `props` / `emits` 类型
- 全程使用 **Composition API**（`<script setup>`）
- **开箱即用**：`app.use(AuraUI)` 全局注册全部组件，或使用 `AuraUIResolver` 实现按需自动引入
- **移动端就绪**：响应式 24 栅格、触控友好的点击区域、对 `env(safe-area-inset-*)` 的支持
- **主题化设计**：默认暗色，亮色仅一步之遥，每个组件自动适配
- **无障碍**：内置减弱动效支持，浮层支持键盘导航，并带 ARIA 角色
- **中英双语文档**，每个页面均带实时演示
- **按需引入**：仅打包你用到的组件

## 安装

```bash
npm install @zhengming365/aura-ui
# 或
pnpm add @zhengming365/aura-ui
# 或
yarn add @zhengming365/aura-ui
```

## 快速上手

**方式 A —— 显式引入（按需、推荐）：**

在应用入口引入所需组件并引入一次样式：

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import '@zhengming365/aura-ui/dist/style.css'
import { MagneticButton, GlowCard, useToast, fireConfetti } from '@zhengming365/aura-ui'

createApp(App).mount('#app')
```

```vue
<script setup lang="ts">
import { MagneticButton, RippleButton, GlowCard } from '@zhengming365/aura-ui'
</script>

<template>
  <GlowCard>
    <MagneticButton>开始使用</MagneticButton>
    <RippleButton variant="solid">点我</RippleButton>
  </GlowCard>
</template>
```

**方式 B —— 全局注册（开箱即用）：**

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import AuraUI from '@zhengming365/aura-ui'
import '@zhengming365/aura-ui/dist/style.css'

createApp(App).use(AuraUI).mount('#app')
```

```vue
<template>
  <!-- 组件已全局可用，无需 import -->
  <MagneticButton>开始使用</MagneticButton>
</template>
```

**方式 C —— 按需自动引入（无需全局注册、无需手动 import）：**

```ts
// vite.config.ts
import Components from 'unplugin-vue-components/vite'
import { AuraUIResolver } from '@zhengming365/aura-ui'

export default {
  plugins: [
    Components({ resolvers: [AuraUIResolver()] })
  ]
}
```

Toast 与 Notification 采用组合式 API，在应用根节点附近挂载一次容器即可（所有方式都需要）：

```vue
<script setup lang="ts">
import { ToastContainer, Notification, useToast, useNotification } from '@zhengming365/aura-ui'

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
| 动效与展示 | `GradientText`、`Typewriter`、`BlurText`、`ScrollReveal`、`AuroraBackground`、`Marquee`、`CountUp`、`Skeleton` |
| 数据录入 | `Input`、`Checkbox`、`RadioGroup`、`Radio`、`Switch`、`Slider`、`Select`、`Segmented`、`Rate`、`Form`、`FormItem`、`DatePicker`、`Upload` |
| 数据展示 | `Badge`、`Tag`、`Avatar`、`Progress`、`Carousel`、`Timeline`、`Table`、`Pagination`、`Tree`、`Calendar`、`Descriptions`、`Empty`、`Image`、`Result`、`Link`、`Card`、`List`、`ListItem` |
| 反馈 | `Dialog`、`Drawer`、`Alert`、`ToastContainer`、`Notification`、`Spinner`、`Collapse`、`Loading`、`Backtop`、`Popconfirm` |
| 浮层 | `Tooltip`、`Popover`、`Dropdown`、`CommandPalette` |
| 导航 | `Tabs`、`Tab`、`Accordion`、`AccordionItem`、`Breadcrumb`、`Steps`、`Menu`、`MenuItem` |
| 布局 | `Container`、`Header`、`Aside`、`Main`、`Footer`、`Row`、`Col`、`Space`、`Divider` |
| 工具 | `Kbd`、`CopyButton`、`Confetti` |
| 全局配置 | `ConfigProvider` |

库另导出组合式与工具：`useToast`、`useNotification`、`pushToast`、`pushNotification`、`fireConfetti`、
`useBreakpoint`，以及对应的 TypeScript 类型（`ToastType`、`NotificationType`、`TableColumn`、
`AuraTreeItem`、`DescItem`、`SelectOption`、`Breakpoint`、`ConfettiOptions`、`FormRule`）。

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

**Tabs / Accordion / Collapse** —— 可切换与可折叠的面板。

```vue
<Tabs>
  <Tab name="overview" label="概览">...</Tab>
  <Tab name="api" label="API">...</Tab>
</Tabs>

<Accordion>
  <AccordionItem id="a" title="Aura UI 是什么？">一套动效优先的 Vue 组件库。</AccordionItem>
  <AccordionItem id="b" title="免费吗？">是的，采用 MIT 协议。</AccordionItem>
</Accordion>

<Collapse :model-value="['a']">
  <CollapseItem name="a" title="Aura UI 是什么？">一套动效优先的 Vue 组件库。</CollapseItem>
  <CollapseItem name="b" title="免费吗？">是的，采用 MIT 协议。</CollapseItem>
</Collapse>
```

**CommandPalette** —— 支持全键盘导航的 `Cmd/Ctrl + K` 命令面板。

```vue
<CommandPalette v-model="open" :commands="commands" @select="run" />
```

**Table / Pagination / Tree / Calendar** —— 生产级数据展示。

```vue
<Table :columns="columns" :data="rows" striped hover bordered />
<Pagination v-model="page" :total="120" :page-size="10" />
<Tree :data="treeData" default-expand-all />
<Calendar v-model="date" />
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

**布局栅格（响应式）** —— 24 栅格与布局容器。

```vue
<Row :gutter="16">
  <Col :span="8"><div>span 8</div></Col>
  <Col :span="8"><div>span 8</div></Col>
  <Col :span="8"><div>span 8</div></Col>
</Row>

<!-- 响应式：移动端整行，桌面端占三分之一 -->
<Row :gutter="16">
  <Col :xs="24" :md="12" :lg="8"><div>响应式</div></Col>
  <Col :xs="24" :md="12" :lg="8"><div>响应式</div></Col>
  <Col :xs="24" :md="12" :lg="8"><div>响应式</div></Col>
</Row>
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

**Image（懒加载 + 预览）/ Result / Empty** —— 精致的展示状态。

```vue
<Image src="/photo.jpg" width="200px" height="120px" radius="12px" preview />
<Result status="success" title="成功" subtitle="操作已完成。" />
<Empty description="暂无数据" />
```

**Backtop / Loading** —— 反馈辅助组件。

```vue
<Backtop :visibility-height="200" />
<Loading :loading="loading" tip="加载中..."><p>内容</p></Loading>
```

**Confetti** —— 可在任意位置触发的轻量 Canvas 礼花。

```ts
import { fireConfetti } from '@zhengming365/aura-ui'
fireConfetti()
fireConfetti({ count: 160, spread: 90 })
```

**Form / FormItem / DatePicker / Upload** —— 完整类型、零依赖的表单体系。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Form, FormItem, DatePicker, Upload } from '@zhengming365/aura-ui'
import type { FormRule } from '@zhengming365/aura-ui'

const model = ref({ name: '', date: '', files: [] })
const rules: Record<string, FormRule[]> = {
  name: [{ required: true, message: '请输入名称' }]
}
</script>

<template>
  <Form :model="model" :rules="rules">
    <FormItem label="名称" prop="name">
      <Input v-model="model.name" />
    </FormItem>
    <FormItem label="日期" prop="date">
      <DatePicker v-model="model.date" />
    </FormItem>
    <FormItem label="文件" prop="files">
      <Upload v-model="model.files" multiple accept="image/*" />
    </FormItem>
  </Form>
</template>
```

**ConfigProvider** —— 在单一根节点统一下发主题、尺寸与语言。

```vue
<script setup lang="ts">
import { ConfigProvider } from '@zhengming365/aura-ui'
</script>

<template>
  <ConfigProvider theme="dark" size="lg" locale="zh">
    <YourApp />
  </ConfigProvider>
</template>
```

## 移动端与响应式

Aura UI 以移动端优先为设计原则：

- 响应式的 `useBreakpoint()` 组合式（`xs / sm / md / lg / xl / xxl`）驱动 `Row` / `Col` 栅格——按断点设置列宽，布局自动重排。
- 点击区域采用 `--aura-tap-min` 变量，在触控屏上同样舒适。
- `Backtop`、浮层与固定元素均尊重 `env(safe-area-inset-*)`，避开刘海与底部 home 指示条。
- 所有组件流畅缩放，文档站点本身也是响应式的。

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
- 交互组件在合适处使用语义化元素与 ARIA 角色。

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
│   │   ├── breakpoint.ts # useBreakpoint / pickResponsive
│   │   ├── index.ts     # 公开入口 / barrel（含 install 与 resolver）
│   │   └── ...
│   ├── docs/            # 文档站点（也是在线演示）
│   ├── App.vue          # 文档外壳：侧边栏 + 内容 + 目录
│   ├── style.css        # 设计变量（默认暗色 + 亮色 + 响应式）
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
