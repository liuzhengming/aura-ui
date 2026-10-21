<script setup lang="ts">
import { ref } from 'vue'
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Badge from '../../lib/components/Badge.vue'
import Tag from '../../lib/components/Tag.vue'
import Avatar from '../../lib/components/Avatar.vue'
import Progress from '../../lib/components/Progress.vue'
import Skeleton from '../../lib/components/Skeleton.vue'
import CountUp from '../../lib/components/CountUp.vue'
import Carousel from '../../lib/components/Carousel.vue'
import Timeline from '../../lib/components/Timeline.vue'

const tags = ref(['Vue', 'TypeScript', 'Motion'])
function removeTag(i: number) {
  tags.value.splice(i, 1)
}

const slides = [
  { title: 'Aurora', text: 'Calm gradients for focus', gradient: 'linear-gradient(135deg,#7c5cff,#00d4ff)' },
  { title: 'Sunset', text: 'Warm tones for energy', gradient: 'linear-gradient(135deg,#ff5c8a,#ffb020)' },
  { title: 'Forest', text: 'Natural greens for calm', gradient: 'linear-gradient(135deg,#2ecc71,#00d4ff)' }
]

const timeline = [
  { title: 'Project created', time: '09:30', desc: 'Initialized the repository.' },
  { title: 'First component', time: '11:12', desc: 'Shipped MagneticButton.' },
  { title: 'Docs site', time: '14:05', desc: 'Launched the documentation.' },
  { title: 'Released', time: '18:40', desc: 'Tagged v0.1.0.' }
]

const badgeCode = `<Badge :value="5"><Avatar name="A B" /></Badge>
<Badge :value="120" :max="99"><Avatar name="X Y" /></Badge>
<Badge dot><Avatar name="Z W" status="online" /></Badge>`

const tagCode = `<Tag>Default</Tag>
<Tag type="success">Success</Tag>
<Tag type="warning">Warning</Tag>
<Tag type="error" closable>Closable</Tag>`

const avatarCode = `<Avatar name="Liu Zhengming" status="online" />
<Avatar size="lg" src="/me.jpg" />
<Avatar size="sm" name="AB" />`

const progressCode = `<Progress :value="65" show-label />
<Progress :value="40" variant="solid" color="#2ecc71" />
<Progress :value="80" striped />`

const skeletonCode = `<Skeleton width="100%" height="16px" />
<Skeleton width="60%" height="16px" />
<Skeleton circle width="48px" height="48px" />`

const countUpCode = `<CountUp :value="1280" />
<CountUp :value="99.9" :decimals="1" suffix="%" />`

const carouselCode = `<Carousel :slides="slides" autoplay :interval="3000" :height="200" />`

const timelineCode = `<Timeline :items="items" />`

const badgeRows = [
  { name: 'value', type: 'number | string', default: '—', desc: 'Badge content or count.' },
  { name: 'dot', type: 'boolean', default: 'false', desc: 'Render as a small dot.' },
  { name: 'max', type: 'number', default: '99', desc: 'Cap for numeric value.' },
  { name: 'type', type: "'primary'|'success'|'warning'|'error'|'info'", default: "'error'", desc: 'Color theme.' }
]
const tagRows = [
  { name: 'type', type: "'default'|'primary'|'success'|'warning'|'error'|'info'", default: "'default'", desc: 'Color theme.' },
  { name: 'size', type: "'sm'|'md'", default: "'md'", desc: 'Tag size.' },
  { name: 'closable', type: 'boolean', default: 'false', desc: 'Show a close button.' }
]
const avatarRows = [
  { name: 'src', type: 'string', default: '—', desc: 'Image URL (falls back to initials).' },
  { name: 'name', type: 'string', default: "''", desc: 'Used for initials and alt.' },
  { name: 'size', type: "'sm'|'md'|'lg'|number", default: "'md'", desc: 'Avatar size.' },
  { name: 'status', type: "'online'|'offline'|'away'|'busy'", default: '—', desc: 'Status dot.' }
]
const progressRows = [
  { name: 'value', type: 'number', default: '0', desc: 'Current value.' },
  { name: 'max', type: 'number', default: '100', desc: 'Maximum value.' },
  { name: 'variant', type: "'gradient'|'solid'", default: "'gradient'", desc: 'Bar style.' },
  { name: 'showLabel', type: 'boolean', default: 'false', desc: 'Show percentage label.' },
  { name: 'striped', type: 'boolean', default: 'false', desc: 'Animated stripes.' }
]
const skeletonRows = [
  { name: 'width', type: 'string', default: "'100%'", desc: 'Width of the placeholder.' },
  { name: 'height', type: 'string', default: "'1rem'", desc: 'Height of the placeholder.' },
  { name: 'circle', type: 'boolean', default: 'false', desc: 'Render as a circle.' }
]
const countUpRows = [
  { name: 'value', type: 'number', default: '0', desc: 'Target number to count to.' },
  { name: 'duration', type: 'number', default: '1600', desc: 'Animation duration in ms.' },
  { name: 'decimals', type: 'number', default: '0', desc: 'Decimal places.' },
  { name: 'prefix / suffix', type: 'string', default: "''", desc: 'Text before/after the number.' }
]
const carouselRows = [
  { name: 'slides', type: "Array<{title?,text?,image?,gradient?}>", default: '[]', desc: 'Slide content.' },
  { name: 'autoplay', type: 'boolean', default: 'false', desc: 'Auto-advance slides.' },
  { name: 'interval', type: 'number', default: '3500', desc: 'Autoplay interval in ms.' },
  { name: 'height', type: 'number', default: '220', desc: 'Carousel height in px.' }
]
const timelineRows = [
  { name: 'items', type: "Array<{title?,time?,desc?,color?,icon?}>", default: '[]', desc: 'Timeline entries.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'badge'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('badge') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('badge') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('badge')" :code="badgeCode">
        <div style="display: flex; gap: 22px; align-items: center">
          <Badge :value="5"><Avatar name="A B" /></Badge>
          <Badge :value="120" :max="99"><Avatar name="X Y" /></Badge>
          <Badge dot><Avatar name="Z W" status="online" /></Badge>
        </div>
      </DemoBlock>
      <PropsTable :rows="badgeRows" />
    </section>

    <section :id="'tag'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('tag') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('tag') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('tag')" :code="tagCode">
        <div style="display: flex; gap: 10px; flex-wrap: wrap">
          <Tag>Default</Tag>
          <Tag type="success">Success</Tag>
          <Tag type="warning">Warning</Tag>
          <Tag type="info">Info</Tag>
          <Tag v-for="(tg, i) in tags" :key="tg" type="primary" closable @close="removeTag(i)">{{ tg }}</Tag>
        </div>
      </DemoBlock>
      <PropsTable :rows="tagRows" />
    </section>

    <section :id="'avatar'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('avatar') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('avatar') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('avatar')" :code="avatarCode">
        <div style="display: flex; gap: 16px; align-items: center">
          <Avatar name="Liu Zhengming" status="online" />
          <Avatar size="lg" name="Jane Doe" status="busy" />
          <Avatar size="sm" name="AB" />
        </div>
      </DemoBlock>
      <PropsTable :rows="avatarRows" />
    </section>

    <section :id="'progress'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('progress') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('progress') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('progress')" :code="progressCode">
        <div style="width: 340px; display: flex; flex-direction: column; gap: 16px">
          <Progress :value="65" show-label />
          <Progress :value="40" variant="solid" color="#2ecc71" />
          <Progress :value="80" striped />
        </div>
      </DemoBlock>
      <PropsTable :rows="progressRows" />
    </section>

    <section :id="'skeleton'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('skeleton') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('skeleton') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('skeleton')" :code="skeletonCode">
        <div style="display: flex; gap: 16px; align-items: center">
          <div style="flex: 1">
            <Skeleton width="100%" height="16px" />
            <div style="height: 8px" />
            <Skeleton width="70%" height="16px" />
          </div>
          <Skeleton circle width="48px" height="48px" />
        </div>
      </DemoBlock>
      <PropsTable :rows="skeletonRows" />
    </section>

    <section :id="'countUp'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('countUp') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('countUp') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('countUp')" :code="countUpCode">
        <div style="font-size: 2rem; font-weight: 800">
          <CountUp :value="1280" />
          <span style="margin-left: 24px"><CountUp :value="99.9" :decimals="1" suffix="%" /></span>
        </div>
      </DemoBlock>
      <PropsTable :rows="countUpRows" />
    </section>

    <section :id="'carousel'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('carousel') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('carousel') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('carousel')" :code="carouselCode">
        <div style="width: 100%; max-width: 460px">
          <Carousel :slides="slides" autoplay :interval="3000" :height="200" />
        </div>
      </DemoBlock>
      <PropsTable :rows="carouselRows" />
    </section>

    <section :id="'timeline'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('timeline') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('timeline') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('timeline')" :code="timelineCode">
        <div style="max-width: 380px">
          <Timeline :items="timeline" />
        </div>
      </DemoBlock>
      <PropsTable :rows="timelineRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
