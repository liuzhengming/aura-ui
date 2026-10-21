<script setup lang="ts">
import { ref } from 'vue'
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
  Dialog
} from './lib'

const dialogOpen = ref(false)
const copied = ref(false)
const timer = ref(0)

const installCode = `npm install aura-ui`
const quickStart = `<script setup lang="ts">
import { MagneticButton } from 'aura-ui'
<\/script>

<template>
  <MagneticButton>丝滑一下</MagneticButton>
<\/template>`

function copy(text: string) {
  navigator.clipboard?.writeText(text).then(() => {
    copied.value = true
    clearTimeout(timer.value)
    timer.value = window.setTimeout(() => (copied.value = false), 1600)
  })
}

const features = [
  {
    title: '零运行时依赖',
    desc: '只依赖 Vue 3 本身，所有动效由原生 CSS 与现代 Web API 驱动，体积小、可控强。'
  },
  {
    title: '全量 TypeScript',
    desc: '每个组件都提供完整的 props / emits 类型定义，编辑器里即有智能提示与类型校验。'
  },
  {
    title: '开箱即用的丝滑',
    desc: '精心调校的缓动曲线与微交互，复制即用，无需再为"手感"反复调试。'
  },
  {
    title: '无障碍与降级',
    desc: '内置 prefers-reduced-motion 适配，尊重系统的减弱动效设置。'
  },
  {
    title: '组合式 API',
    desc: '基于 <script setup> 与 Composition API，逻辑清晰、易于扩展。'
  },
  {
    title: '演示即文档',
    desc: '这个页面本身就是活文档，所见即所得，降低上手成本。'
  }
]
</script>

<template>
  <div class="site">
    <!-- 顶部导航 -->
    <header class="nav aura-glass">
      <div class="nav__inner">
        <a class="brand" href="#top">
          <span class="brand__dot" /> Aura UI
        </a>
        <nav class="nav__links">
          <a href="#features">特性</a>
          <a href="#components">组件</a>
          <a href="#install">安装</a>
        </nav>
        <RippleButton variant="outline" class="nav__gh">GitHub</RippleButton>
      </div>
    </header>

    <!-- Hero -->
    <section id="top" class="hero">
      <AuroraBackground />
      <Spotlight class="hero__spot">
        <div class="hero__content">
          <span class="hero__badge">Vue 3 · TypeScript · 零运行时依赖</span>
          <h1 class="hero__title">
            <GradientText>为 Vue 注入</GradientText><br />
            <GradientText>丝滑的灵魂</GradientText>
          </h1>
          <p class="hero__sub">
            一套注重<strong>微交互</strong>与<strong>动效</strong>的组件库 ——
            <Typewriter :words="['磁吸按钮', '3D 倾斜卡片', '极光背景', '滚动入场', '丝滑弹窗']" />
          </p>
          <div class="hero__cta">
            <MagneticButton @click="dialogOpen = true">查看组件</MagneticButton>
            <RippleButton variant="outline">在 GitHub 上 Star</RippleButton>
          </div>
          <div class="hero__stats">
            <div>
              <CountUp :value="12" suffix="+" />
              <small>精选组件</small>
            </div>
            <div>
              <CountUp :value="0" suffix=" 个" />
              <small>运行时依赖</small>
            </div>
            <div>
              <CountUp :value="100" suffix="%" />
              <small>TypeScript</small>
            </div>
          </div>
        </div>
      </Spotlight>
    </section>

    <!-- 特性 -->
    <section id="features" class="section">
      <ScrollReveal>
        <h2 class="section__title">为什么是 <GradientText>Aura UI</GradientText></h2>
        <p class="section__lead">不是为了堆组件数量，而是把"丝滑"这件事做到极致。</p>
      </ScrollReveal>
      <div class="grid grid--3">
        <ScrollReveal v-for="(f, i) in features" :key="f.title" :delay="i * 90">
          <GlowCard>
            <div class="feature">
              <div class="feature__no">{{ String(i + 1).padStart(2, '0') }}</div>
              <h3>{{ f.title }}</h3>
              <p>{{ f.desc }}</p>
            </div>
          </GlowCard>
        </ScrollReveal>
      </div>
    </section>

    <!-- 组件画廊 -->
    <section id="components" class="section">
      <ScrollReveal>
        <h2 class="section__title">组件画廊</h2>
        <p class="section__lead">悬停、点击、滚动 —— 每一个都能直接玩。</p>
      </ScrollReveal>
      <div class="grid grid--2">
        <!-- 磁吸按钮 -->
        <GlowCard>
          <div class="demo">
            <div class="demo__head"><span class="demo__name">MagneticButton</span><span class="demo__tag">微交互</span></div>
            <div class="demo__preview"><MagneticButton>悬停试试</MagneticButton></div>
            <pre class="demo__code"><code>&lt;MagneticButton&gt;悬停试试&lt;/MagneticButton&gt;</code></pre>
          </div>
        </GlowCard>

        <!-- 水波纹 -->
        <GlowCard>
          <div class="demo">
            <div class="demo__head"><span class="demo__name">RippleButton</span><span class="demo__tag">微交互</span></div>
            <div class="demo__preview"><RippleButton variant="outline">点击看波纹</RippleButton></div>
            <pre class="demo__code"><code>&lt;RippleButton variant="outline"&gt;点击看波纹&lt;/RippleButton&gt;</code></pre>
          </div>
        </GlowCard>

        <!-- 倾斜卡片 -->
        <GlowCard>
          <div class="demo">
            <div class="demo__head"><span class="demo__name">TiltCard</span><span class="demo__tag">3D</span></div>
            <div class="demo__preview">
              <TiltCard :max="16">
                <div class="tilt-demo">移动光标，我将倾斜</div>
              </TiltCard>
            </div>
            <pre class="demo__code"><code>&lt;TiltCard :max="16"&gt;...&lt;/TiltCard&gt;</code></pre>
          </div>
        </GlowCard>

        <!-- 光标聚光 -->
        <GlowCard>
          <div class="demo">
            <div class="demo__head"><span class="demo__name">GlowCard</span><span class="demo__tag">光标跟随</span></div>
            <div class="demo__preview preview--tall">
              <p class="muted">把光标移到这张卡片上 —— 边框与光晕会跟着你走。</p>
            </div>
          </div>
        </GlowCard>

        <!-- 数字滚动 -->
        <GlowCard>
          <div class="demo">
            <div class="demo__head"><span class="demo__name">CountUp</span><span class="demo__tag">动效</span></div>
            <div class="demo__preview"><CountUp :value="2026" :duration="1800" /></div>
            <pre class="demo__code"><code>&lt;CountUp :value="2026" /&gt;</code></pre>
          </div>
        </GlowCard>

        <!-- 骨架屏 -->
        <GlowCard>
          <div class="demo">
            <div class="demo__head"><span class="demo__name">Skeleton</span><span class="demo__tag">加载</span></div>
            <div class="demo__preview skeleton-demo">
              <Skeleton width="56px" height="56px" circle />
              <div class="skeleton-demo__lines">
                <Skeleton width="70%" height="14px" />
                <Skeleton width="90%" height="14px" />
                <Skeleton width="40%" height="14px" />
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
    </section>

    <!-- 安装 -->
    <section id="install" class="section">
      <ScrollReveal>
        <h2 class="section__title">三行代码，丝滑起来</h2>
      </ScrollReveal>
      <div class="install">
        <div class="install__block">
          <div class="install__label">
            <span>1 · 安装</span>
            <button class="copy-btn" type="button" @click="copy(installCode)">
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>
          <pre class="install__code"><code>{{ installCode }}</code></pre>
        </div>
        <div class="install__block">
          <div class="install__label">
            <span>2 · 使用</span>
            <button class="copy-btn" type="button" @click="copy(quickStart)">
              {{ copied ? '已复制' : '复制' }}
            </button>
          </div>
          <pre class="install__code"><code>{{ quickStart }}</code></pre>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="footer__inner">
        <span class="brand"><span class="brand__dot" /> Aura UI</span>
        <p class="muted">为 Vue 注入丝滑灵魂 · 用 Vue 3 + TypeScript 构建</p>
      </div>
    </footer>

    <Dialog v-model="dialogOpen" title="组件一览">
      <p>本演示站展示了 Aura UI 的核心组件：磁吸按钮、水波纹、3D 倾斜卡片、光标聚光、渐变文字、滚动入场、数字滚动、打字机、极光背景、骨架屏与丝滑弹窗。</p>
      <p class="muted">把仓库 clone 下来跑 <code>npm run dev</code>，即可逐个体验。</p>
    </Dialog>
  </div>
</template>

<style scoped>
.site {
  min-height: 100vh;
}

/* 导航 */
.nav {
  position: sticky;
  top: 0;
  z-index: 100;
  border-left: none;
  border-right: none;
  border-top: none;
}
.nav__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 0.9rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1.5rem;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 700;
  font-size: 1.05rem;
}
.brand__dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: var(--aura-gradient);
  box-shadow: 0 0 16px rgba(124, 92, 255, 0.8);
}
.nav__links {
  display: flex;
  gap: 1.4rem;
  margin-left: auto;
  color: var(--aura-text-dim);
  font-size: 0.95rem;
}
.nav__links a:hover {
  color: var(--aura-text);
}
.nav__gh {
  font-size: 0.85rem;
  padding: 0.55rem 1.1rem;
}

/* Hero */
.hero {
  position: relative;
  min-height: 86vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.hero__spot {
  width: 100%;
}
.hero__content {
  max-width: 820px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
  text-align: center;
}
.hero__badge {
  display: inline-block;
  padding: 0.45rem 1rem;
  border-radius: var(--aura-radius-pill);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text-dim);
  font-size: 0.85rem;
  margin-bottom: 1.8rem;
}
.hero__title {
  font-size: clamp(2.6rem, 7vw, 5rem);
  line-height: 1.05;
  font-weight: 800;
  letter-spacing: -0.02em;
}
.hero__sub {
  margin: 1.6rem auto 0;
  max-width: 560px;
  color: var(--aura-text-dim);
  font-size: 1.1rem;
  line-height: 1.7;
}
.hero__sub strong {
  color: var(--aura-text);
}
.hero__cta {
  margin-top: 2.4rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}
.hero__stats {
  margin-top: 3.5rem;
  display: flex;
  gap: 3rem;
  justify-content: center;
  flex-wrap: wrap;
}
.hero__stats > div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.hero__stats :deep(.aura-count) {
  font-size: 2.2rem;
  font-weight: 800;
  background: var(--aura-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero__stats small {
  margin-top: 0.3rem;
  color: var(--aura-text-faint);
  font-size: 0.85rem;
}

/* 通用区块 */
.section {
  max-width: 1120px;
  margin: 0 auto;
  padding: 6rem 1.5rem;
}
.section__title {
  font-size: clamp(1.8rem, 4vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.01em;
}
.section__lead {
  margin-top: 0.9rem;
  color: var(--aura-text-dim);
  font-size: 1.05rem;
}
.grid {
  margin-top: 2.6rem;
  display: grid;
  gap: 1.4rem;
}
.grid--3 {
  grid-template-columns: repeat(3, 1fr);
}
.grid--2 {
  grid-template-columns: repeat(2, 1fr);
}

/* 特性 */
.feature__no {
  font-family: var(--aura-mono);
  color: var(--aura-primary);
  font-size: 0.9rem;
  margin-bottom: 0.8rem;
}
.feature h3 {
  font-size: 1.2rem;
  margin-bottom: 0.6rem;
}
.feature p {
  color: var(--aura-text-dim);
  line-height: 1.7;
  font-size: 0.95rem;
}

/* 演示卡片 */
.demo {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
.demo__head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.demo__name {
  font-family: var(--aura-mono);
  font-size: 0.95rem;
  color: var(--aura-text);
}
.demo__tag {
  font-size: 0.72rem;
  padding: 0.2rem 0.6rem;
  border-radius: var(--aura-radius-pill);
  border: 1px solid var(--aura-border);
  color: var(--aura-text-faint);
}
.demo__preview {
  min-height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--aura-radius);
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid var(--aura-border);
}
.demo__preview.preview--tall {
  align-items: center;
  padding: 1.2rem;
  text-align: center;
}
.demo__code {
  margin: 0;
  padding: 0.8rem 1rem;
  border-radius: var(--aura-radius-sm);
  background: #0c0c14;
  border: 1px solid var(--aura-border);
  font-family: var(--aura-mono);
  font-size: 0.82rem;
  color: var(--aura-text-dim);
  overflow-x: auto;
  white-space: pre;
}
.tilt-demo {
  padding: 1.6rem 2rem;
  border-radius: var(--aura-radius);
  background: var(--aura-gradient);
  color: #fff;
  font-weight: 600;
}
.skeleton-demo {
  gap: 1rem;
  align-items: center;
  justify-content: flex-start;
}
.skeleton-demo__lines {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.muted {
  color: var(--aura-text-dim);
}

/* 安装 */
.install {
  margin-top: 2.4rem;
  display: grid;
  gap: 1.4rem;
  grid-template-columns: repeat(2, 1fr);
}
.install__block {
  border-radius: var(--aura-radius);
  border: 1px solid var(--aura-border);
  background: var(--aura-bg-soft);
  overflow: hidden;
}
.install__label {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 1rem;
  border-bottom: 1px solid var(--aura-border);
  color: var(--aura-text-dim);
  font-size: 0.85rem;
}
.copy-btn {
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  color: var(--aura-text-dim);
  border-radius: var(--aura-radius-sm);
  padding: 0.25rem 0.7rem;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.2s var(--aura-ease);
}
.copy-btn:hover {
  color: var(--aura-text);
  border-color: var(--aura-primary);
}
.install__code {
  margin: 0;
  padding: 1.1rem 1.2rem;
  font-family: var(--aura-mono);
  font-size: 0.88rem;
  color: var(--aura-primary-2);
  white-space: pre-wrap;
  line-height: 1.6;
}

/* 页脚 */
.footer {
  border-top: 1px solid var(--aura-border);
  margin-top: 4rem;
}
.footer__inner {
  max-width: 1120px;
  margin: 0 auto;
  padding: 2.4rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}
.footer .muted {
  font-size: 0.9rem;
}

@media (max-width: 860px) {
  .grid--3,
  .grid--2,
  .install {
    grid-template-columns: 1fr;
  }
  .nav__links {
    display: none;
  }
}
</style>
