# Aura UI

> 为 Vue 注入丝滑灵魂 —— 一套注重微交互与动效的 Vue 3 组件库。

[![Vue 3](https://img.shields.io/badge/Vue-3-42b883?style=flat-square)](https://vuejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-100%25-3178c6?style=flat-square)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](./LICENSE)
[![Stars](https://img.shields.io/github/stars/liuzhengming/aura-ui?style=flat-square)](https://github.com/liuzhengming/aura-ui)

Aura UI 不是又一个"大而全"的组件库，而是把**丝滑的手感**做到极致：磁吸按钮、3D 倾斜卡片、光标聚光、流动渐变文字、滚动入场、丝滑弹窗……每一个组件都能直接复制使用，无需再为"动效调参"反复折腾。

## 特性

- **零运行时依赖**：仅依赖 Vue 3 本身，动效由原生 CSS 与现代 Web API 驱动。
- **全量 TypeScript**：每个组件都提供完整的 `props` / `emits` 类型定义，编辑器内即有提示与校验。
- **12 个精选组件**：覆盖微交互、3D、动效、加载与弹窗等高频场景。
- **无障碍降级**：内置 `prefers-reduced-motion` 适配，尊重系统的"减弱动效"设置。
- **现代写法**：基于 `<script setup>` 与 Composition API，逻辑清晰、易扩展。
- **演示即文档**：仓库内的演示站本身就是活文档，所见即所得。

## 在线演示

> 将仓库部署到 GitHub Pages 后，把链接贴到这里：
> `https://your-name.github.io/aura-ui/`

## 快速开始

```bash
npm install aura-ui
```

```vue
<script setup lang="ts">
import { MagneticButton } from 'aura-ui'
</script>

<template>
  <MagneticButton>丝滑一下</MagneticButton>
</template>
```

## 组件一览

| 组件 | 说明 |
| --- | --- |
| `MagneticButton` | 磁吸按钮，悬停时元素向光标偏移 |
| `RippleButton` | 点击触发水波纹扩散 |
| `GlowCard` | 光标跟随的边框与光晕卡片 |
| `TiltCard` | 3D 倾斜卡片（带高光） |
| `Spotlight` | 光标聚光层，常用于 Hero 区 |
| `GradientText` | 流动渐变文字 |
| `ScrollReveal` | 进入视口时滚动入场 |
| `CountUp` | 进入视口时数字滚动到目标值 |
| `Typewriter` | 循环打字机文字效果 |
| `AuroraBackground` | 极光渐变流动背景 |
| `Skeleton` | 骨架屏加载占位 |
| `Dialog` | 弹簧过渡弹窗（支持 ESC / 遮罩关闭） |

## 本地开发

```bash
git clone https://github.com/liuzhengming/aura-ui.git
cd aura-ui
npm install
npm run dev
```

## 构建演示站

```bash
npm run build      # 输出到 dist/
npm run preview    # 本地预览构建产物
```

> 已配置 `base: './'`，可直接部署到 GitHub Pages 等静态托管。

## 技术栈

Vue 3 · TypeScript · Vite · 原生 CSS 动画 · `IntersectionObserver` / `requestAnimationFrame`

## 目录结构

```
aura-ui/
├── index.html
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── style.css          # 设计 token 与全局样式
│   ├── App.vue            # 演示站（作品集级首页）
│   └── lib/
│       ├── index.ts       # 组件统一出口
│       └── components/    # 12 个组件
```

## 贡献

欢迎提交 Issue 与 Pull Request。组件设计遵循"丝滑优先、零依赖、全类型"的原则。

## License

[MIT](./LICENSE)
