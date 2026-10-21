<script setup lang="ts">
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Tabs from '../../lib/components/Tabs.vue'
import Tab from '../../lib/components/Tab.vue'
import Accordion from '../../lib/components/Accordion.vue'
import AccordionItem from '../../lib/components/AccordionItem.vue'
import Breadcrumb from '../../lib/components/Breadcrumb.vue'
import Steps from '../../lib/components/Steps.vue'
import Marquee from '../../lib/components/Marquee.vue'
import Tag from '../../lib/components/Tag.vue'

const crumbs = [
  { label: 'Home', href: '#' },
  { label: 'Components', href: '#' },
  { label: 'Navigation' }
]
const steps = [
  { title: 'Clone', desc: 'Get the repo' },
  { title: 'Install', desc: 'npm install' },
  { title: 'Build', desc: 'npm run build' },
  { title: 'Ship', desc: 'Deploy' }
]

const tabsCode = `<Tabs>
  <Tab name="overview" label="Overview">...</Tab>
  <Tab name="api" label="API">...</Tab>
</Tabs>`

const accordionCode = `<Accordion>
  <AccordionItem id="a" title="What is Aura UI?">...</AccordionItem>
  <AccordionItem id="b" title="Is it free?">...</AccordionItem>
</Accordion>`

const breadcrumbCode = `<Breadcrumb :items="[
  { label: 'Home', href: '/' },
  { label: 'Components' },
  { label: 'Navigation' }
]" />`

const stepsCode = `<Steps :items="steps" :current="2" />`

const marqueeCode = `<Marquee>
  <Tag>Vue 3</Tag><Tag>TypeScript</Tag><Tag>Motion</Tag>
</Marquee>`

const tabsRows = [
  { name: 'Tabs.modelValue', type: 'string', default: "''", desc: 'Active tab name (v-model).' },
  { name: 'Tab.name', type: 'string', default: '—', desc: 'Unique tab identifier.' },
  { name: 'Tab.label', type: 'string', default: '—', desc: 'Text shown in the tab bar.' }
]
const accordionRows = [
  { name: 'Accordion.multiple', type: 'boolean', default: 'false', desc: 'Allow multiple panels open.' },
  { name: 'AccordionItem.id', type: 'string', default: 'auto', desc: 'Unique panel identifier.' },
  { name: 'AccordionItem.title', type: 'string', default: "''", desc: 'Panel heading.' }
]
const breadcrumbRows = [
  { name: 'items', type: "Array<{label,href?}>", default: '[]', desc: 'Trail entries; last is current.' },
  { name: 'separator', type: 'string', default: "'/'", desc: 'Separator between entries.' }
]
const stepsRows = [
  { name: 'items', type: "Array<{title,desc?}>", default: '[]', desc: 'Step entries.' },
  { name: 'current', type: 'number', default: '0', desc: 'Index of the active step.' }
]
const marqueeRows = [
  { name: 'speed', type: 'number', default: '50', desc: 'Pixels per second.' },
  { name: 'direction', type: "'left'|'right'", default: "'left'", desc: 'Scroll direction.' },
  { name: 'pauseOnHover', type: 'boolean', default: 'true', desc: 'Pause on hover.' },
  { name: 'gap', type: 'number', default: '16', desc: 'Gap between items in px.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'tabs'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('tabs') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('tabs') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('tabs')" :code="tabsCode">
        <Tabs>
          <Tab name="overview" label="Overview">
            <p style="color: var(--aura-text-dim)">An animated, accessible tab group with a sliding indicator.</p>
          </Tab>
          <Tab name="api" label="API">
            <p style="color: var(--aura-text-dim)">Each Tab registers itself with a name and a label.</p>
          </Tab>
          <Tab name="examples" label="Examples">
            <p style="color: var(--aura-text-dim)">Drop any content inside a Tab pane.</p>
          </Tab>
        </Tabs>
      </DemoBlock>
      <PropsTable :rows="tabsRows" />
    </section>

    <section :id="'accordion'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('accordion') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('accordion') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('accordion')" :code="accordionCode">
        <Accordion>
          <AccordionItem id="a" title="What is Aura UI?">
            A Vue 3 collection of micro-interaction and motion components with zero runtime dependencies.
          </AccordionItem>
          <AccordionItem id="b" title="Is it free?">
            Yes, released under the MIT license.
          </AccordionItem>
          <AccordionItem id="c" title="Does it support TypeScript?">
            Fully. Every component ships complete prop and emit types.
          </AccordionItem>
        </Accordion>
      </DemoBlock>
      <PropsTable :rows="accordionRows" />
    </section>

    <section :id="'breadcrumb'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('breadcrumb') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('breadcrumb') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('breadcrumb')" :code="breadcrumbCode">
        <Breadcrumb :items="crumbs" />
      </DemoBlock>
      <PropsTable :rows="breadcrumbRows" />
    </section>

    <section :id="'steps'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('steps') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('steps') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('steps')" :code="stepsCode">
        <Steps :items="steps" :current="2" />
      </DemoBlock>
      <PropsTable :rows="stepsRows" />
    </section>

    <section :id="'marquee'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('marquee') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('marquee') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('marquee')" :code="marqueeCode">
        <Marquee>
          <Tag type="primary">Vue 3</Tag>
          <Tag type="success">TypeScript</Tag>
          <Tag type="info">Motion</Tag>
          <Tag type="warning">Zero deps</Tag>
          <Tag>Accessible</Tag>
        </Marquee>
      </DemoBlock>
      <PropsTable :rows="marqueeRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
