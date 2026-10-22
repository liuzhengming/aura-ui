<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Container from '../../lib/components/Container.vue'
import Header from '../../lib/components/Header.vue'
import Aside from '../../lib/components/Aside.vue'
import Main from '../../lib/components/Main.vue'
import Footer from '../../lib/components/Footer.vue'
import Row from '../../lib/components/Row.vue'
import Col from '../../lib/components/Col.vue'
import Space from '../../lib/components/Space.vue'
import Divider from '../../lib/components/Divider.vue'

const gridCode = `<Row :gutter="16">
  <Col :span="8"><div class="box">span 8</div></Col>
  <Col :span="8"><div class="box">span 8</div></Col>
  <Col :span="8"><div class="box">span 8</div></Col>
</Row>

<!-- responsive: full width on mobile, half on tablet, third on desktop -->
<Row :gutter="16">
  <Col :xs="24" :md="12" :lg="8"><div class="box">responsive</div></Col>
  <Col :xs="24" :md="12" :lg="8"><div class="box">responsive</div></Col>
  <Col :xs="24" :md="12" :lg="8"><div class="box">responsive</div></Col>
</Row>`

const spaceCode = `<Space :size="12">
  <MagneticButton>One</MagneticButton>
  <RippleButton>Two</RippleButton>
  <Tag>Three</Tag>
</Space>

<Space direction="vertical" :size="8">
  <Tag>A</Tag>
  <Tag>B</Tag>
</Space>`

const dividerCode = `<Divider />
<Divider orientation="left" text="Section" />
<Divider orientation="right" text="End" />
<span>left<Divider direction="vertical" />right</span>`

const containerCode = `<Container style="height: 260px; border: 1px solid var(--aura-border); border-radius: 12px;">
  <Header>Header</Header>
  <Container>
    <Aside width="120px">Aside</Aside>
    <Main>Main content</Main>
  </Container>
  <Footer>Footer</Footer>
</Container>`

const rowRows = [
  { name: 'gutter', type: 'number', default: '0', desc: 'Horizontal gap between columns (px).' },
  { name: 'justify', type: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'", default: "'start'", desc: 'Main-axis alignment.' },
  { name: 'align', type: "'top' | 'middle' | 'bottom' | 'stretch'", default: "'top'", desc: 'Cross-axis alignment.' }
]
const colRows = [
  { name: 'span', type: 'number', default: '24', desc: 'Column span out of 24.' },
  { name: 'offset', type: 'number', default: '0', desc: 'Left offset in spans.' },
  { name: 'xs / sm / md / lg / xl / xxl', type: 'number', default: '—', desc: 'Responsive span for each breakpoint.' },
  { name: 'xsOffset / smOffset / ... / xxlOffset', type: 'number', default: '—', desc: 'Responsive offset per breakpoint.' }
]
const spaceRows = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Layout direction.' },
  { name: 'size', type: "number | 'sm' | 'md' | 'lg'", default: "'md'", desc: 'Gap between items.' },
  { name: 'align', type: "'start' | 'center' | 'end' | 'baseline' | 'stretch'", default: "'center'", desc: 'Cross-axis alignment.' },
  { name: 'wrap', type: 'boolean', default: 'true', desc: 'Whether items wrap.' }
]
const dividerRows = [
  { name: 'direction', type: "'horizontal' | 'vertical'", default: "'horizontal'", desc: 'Orientation.' },
  { name: 'orientation', type: "'left' | 'center' | 'right'", default: "'center'", desc: 'Text position (horizontal only).' },
  { name: 'text', type: 'string', default: '—', desc: 'Centered / side text.' }
]
const layoutRows = [
  { name: 'Container', type: '—', default: '—', desc: 'Flex column that turns horizontal when an Aside is inside.' },
  { name: 'Header.height', type: 'string', default: "'60px'", desc: 'Header height.' },
  { name: 'Aside.width', type: 'string', default: "'240px'", desc: 'Aside width (auto-shrinks to 200px on mobile).' },
  { name: 'Main.padding', type: 'string', default: "'20px'", desc: 'Content padding.' },
  { name: 'Footer.height', type: 'string', default: "'auto'", desc: 'Footer height.' }
]
</script>

<template>
  <div class="docs-page">
    <h1 class="docs-h1">{{ t('cat.layout') }}</h1>
    <p class="docs-lead">{{ t('ui.builtWith') }}</p>

    <section :id="'row'" class="docs-section">
      <h2 class="docs-h2">{{ compName('row') }}</h2>
      <p class="docs-desc">{{ compDesc('row') }}</p>
      <DemoBlock :title="compName('col')" :description="compDesc('col')" :code="gridCode">
        <Row :gutter="16">
          <Col :span="8"><div class="box">span 8</div></Col>
          <Col :span="8"><div class="box">span 8</div></Col>
          <Col :span="8"><div class="box">span 8</div></Col>
        </Row>
        <Row :gutter="16" style="margin-top: 16px">
          <Col :xs="24" :md="12" :lg="8"><div class="box">xs24 md12 lg8</div></Col>
          <Col :xs="24" :md="12" :lg="8"><div class="box">xs24 md12 lg8</div></Col>
          <Col :xs="24" :md="12" :lg="8"><div class="box">xs24 md12 lg8</div></Col>
        </Row>
      </DemoBlock>
      <PropsTable :rows="rowRows" />
      <PropsTable :rows="colRows" />
    </section>

    <section :id="'space'" class="docs-section">
      <h2 class="docs-h2">{{ compName('space') }}</h2>
      <p class="docs-desc">{{ compDesc('space') }}</p>
      <DemoBlock :title="compName('space')" :description="compDesc('space')" :code="spaceCode">
        <Space :size="12">
          <span class="box">One</span>
          <span class="box">Two</span>
          <span class="box">Three</span>
        </Space>
        <Space direction="vertical" :size="8" style="margin-top: 16px; max-width: 160px">
          <span class="box">A</span>
          <span class="box">B</span>
        </Space>
      </DemoBlock>
      <PropsTable :rows="spaceRows" />
    </section>

    <section :id="'divider'" class="docs-section">
      <h2 class="docs-h2">{{ compName('divider') }}</h2>
      <p class="docs-desc">{{ compDesc('divider') }}</p>
      <DemoBlock :title="compName('divider')" :description="compDesc('divider')" :code="dividerCode">
        <Divider />
        <Divider orientation="left" text="Section" />
        <Divider orientation="right" text="End" />
        <p>left<Divider direction="vertical" />right</p>
      </DemoBlock>
      <PropsTable :rows="dividerRows" />
    </section>

    <section :id="'container'" class="docs-section">
      <h2 class="docs-h2">{{ compName('container') }}</h2>
      <p class="docs-desc">{{ compDesc('container') }}</p>
      <DemoBlock :title="compName('container')" :description="compDesc('header') + ' / ' + compDesc('aside') + ' / ' + compDesc('main') + ' / ' + compDesc('footer')" :code="containerCode">
        <Container style="height: 260px; border: 1px solid var(--aura-border); border-radius: 12px; overflow: hidden">
          <Header style="height: 44px">Header</Header>
          <Container>
            <Aside width="96px" style="display: flex; align-items: center; justify-content: center">Aside</Aside>
            <Main style="display: flex; align-items: center; justify-content: center">Main content</Main>
          </Container>
          <Footer style="text-align: center">Footer</Footer>
        </Container>
      </DemoBlock>
      <PropsTable :rows="layoutRows" />
    </section>
  </div>
</template>

<style scoped>
.docs-page {
  max-width: 920px;
}
.docs-h1 {
  font-size: 2rem;
  font-weight: 750;
  margin-bottom: 6px;
}
.docs-lead {
  color: var(--aura-text-dim);
  margin-bottom: 28px;
}
.docs-section {
  margin-bottom: 38px;
  scroll-margin-top: 20px;
}
.docs-h2 {
  font-size: 1.4rem;
  font-weight: 680;
  margin-bottom: 6px;
}
.docs-desc {
  color: var(--aura-text-dim);
  margin-bottom: 16px;
  line-height: 1.6;
}
.box {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 10px;
  background: var(--aura-surface-2);
  border: 1px solid var(--aura-border);
  font-size: 0.85rem;
  color: var(--aura-text);
}
</style>
