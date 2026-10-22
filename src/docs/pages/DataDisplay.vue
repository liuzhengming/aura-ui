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
import Table from '../../lib/components/Table.vue'
import Pagination from '../../lib/components/Pagination.vue'
import Tree from '../../lib/components/Tree.vue'
import Calendar from '../../lib/components/Calendar.vue'
import Descriptions from '../../lib/components/Descriptions.vue'
import Empty from '../../lib/components/Empty.vue'
import AuraImage from '../../lib/components/Image.vue'
import Result from '../../lib/components/Result.vue'
import Link from '../../lib/components/Link.vue'

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

const tableCols = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status', align: 'center' as const }
]
const tableData = [
  { name: 'Aura', role: 'Core', status: 'Active' },
  { name: 'Nova', role: 'Theme', status: 'Beta' },
  { name: 'Pulse', role: 'Motion', status: 'Stable' }
]
const tableCode = `const columns = [
  { key: 'name', title: 'Name' },
  { key: 'role', title: 'Role' },
  { key: 'status', title: 'Status', align: 'center' }
]
const data = [
  { name: 'Aura', role: 'Core', status: 'Active' }
]
<Table :columns="columns" :data="data" striped hover bordered />`

const paginationPage = ref(3)
const paginationCode = `<script setup>
import { ref } from 'vue'
import { Pagination } from 'aura-ui'

const page = ref(1)
<\/script>

<template>
  <Pagination v-model="page" :total="120" :page-size="10" />
</template>`

const treeData = [
  {
    key: 1,
    label: 'Components',
    children: [
      { key: 11, label: 'Buttons' },
      { key: 12, label: 'Forms' }
    ]
  },
  { key: 2, label: 'Documentation' }
]
const treeCode = `const data = [
  {
    key: 1,
    label: 'Components',
    children: [
      { key: 11, label: 'Buttons' },
      { key: 12, label: 'Forms' }
    ]
  },
  { key: 2, label: 'Documentation' }
]
<Tree :data="data" default-expand-all />`

const calDate = ref('')
const calendarCode = `<script setup>
import { ref } from 'vue'
import { Calendar } from 'aura-ui'

const date = ref('')
<\/script>

<template>
  <Calendar v-model="date" />
</template>`

const descItems = [
  { label: 'Name', content: 'Liu Zhengming' },
  { label: 'Role', content: 'Frontend Engineer' },
  { label: 'City', content: 'Shenzhen', span: 2 }
]
const descCode = `const items = [
  { label: 'Name', content: 'Liu Zhengming' },
  { label: 'Role', content: 'Frontend Engineer' },
  { label: 'City', content: 'Shenzhen', span: 2 }
]
<Descriptions :items="items" :column="2" border title="Profile" />`

const emptyCode = `<Empty description="No results found" />
<!-- with slot actions -->
<Empty description="No data">
  <Button>Create</Button>
</Empty>`

const imageCode = `<Image src="/photo.jpg" width="200px" height="120px" radius="12px" />
<Image src="/photo.jpg" width="200px" height="120px" preview />`

const resultCode = `<Result status="success" title="Success" subtitle="Operation completed." />
<Result status="error" title="Failed" subtitle="Please try again." />
<Result status="404" title="Not Found" subtitle="Page missing." />`

const linkCode = `<Link href="https://github.com" target="_blank" type="primary">GitHub</Link>
<Link type="success">Success</Link>
<Link type="error" underline="always">Error</Link>
<Link disabled>Disabled</Link>`

const tableRows = [
  { name: 'columns', type: 'TableColumn[]', default: '[]', desc: 'Column defs ({ key, title, width?, align?, fixed? }).' },
  { name: 'data', type: 'Record<string, any>[]', default: '[]', desc: 'Row data; use slot cell-<key> for custom cells.' },
  { name: 'striped', type: 'boolean', default: 'false', desc: 'Zebra striping.' },
  { name: 'bordered', type: 'boolean', default: 'false', desc: 'Show cell borders.' },
  { name: 'hover', type: 'boolean', default: 'true', desc: 'Highlight row on hover.' },
  { name: 'emptyText', type: 'string', default: "'No data'", desc: 'Text when data is empty.' }
]
const paginationRows = [
  { name: 'modelValue', type: 'number', default: '1', desc: 'Current page (v-model).' },
  { name: 'total', type: 'number', default: '0', desc: 'Total number of items.' },
  { name: 'pageSize', type: 'number', default: '10', desc: 'Items per page.' },
  { name: 'maxButtons', type: 'number', default: '7', desc: 'Max visible page buttons.' }
]
const treeRows = [
  { name: 'data', type: 'AuraTreeItem[]', default: '[]', desc: 'Nodes ({ key, label, children?, expanded?, disabled? }).' },
  { name: 'defaultExpandAll', type: 'boolean', default: 'false', desc: 'Expand all nodes initially.' }
]
const calendarRows = [
  { name: 'modelValue', type: 'string', default: "''", desc: 'Selected date YYYY-MM-DD (v-model).' },
  { name: 'weekdays', type: 'string[]', default: "['Su','Mo','Tu','We','Th','Fr','Sa']", desc: 'Weekday header labels.' }
]
const descRows = [
  { name: 'items', type: 'DescItem[]', default: '[]', desc: 'Label/content pairs ({ label, content, span? }).' },
  { name: 'column', type: 'number', default: '2', desc: 'Number of columns.' },
  { name: 'border', type: 'boolean', default: 'false', desc: 'Show borders.' },
  { name: 'title', type: 'string', default: "''", desc: 'Section title.' }
]
const emptyRows = [
  { name: 'description', type: 'string', default: "''", desc: 'Hint text shown under the icon.' }
]
const imageRows = [
  { name: 'src', type: 'string', default: '—', desc: 'Image URL.' },
  { name: 'alt', type: 'string', default: "''", desc: 'Alternative text.' },
  { name: 'width / height', type: 'string', default: "''", desc: 'Dimensions.' },
  { name: 'radius', type: 'string', default: "''", desc: 'Border radius.' },
  { name: 'lazy', type: 'boolean', default: 'false', desc: 'Native lazy loading.' },
  { name: 'preview', type: 'boolean', default: 'false', desc: 'Click to open fullscreen preview.' },
  { name: 'fit', type: 'string', default: "'cover'", desc: 'object-fit value.' }
]
const resultRows = [
  { name: 'status', type: "'success'|'error'|'info'|'warning'|'404'", default: "'info'", desc: 'Result type.' },
  { name: 'title', type: 'string', default: "''", desc: 'Title text.' },
  { name: 'subtitle', type: 'string', default: "''", desc: 'Subtitle / description.' }
]
const linkRows = [
  { name: 'type', type: "'default'|'primary'|'success'|'warning'|'error'|'info'", default: "'default'", desc: 'Color theme.' },
  { name: 'href', type: 'string', default: "''", desc: 'Navigates when set.' },
  { name: 'target', type: 'string', default: "''", desc: 'Anchor target (e.g. _blank).' },
  { name: 'underline', type: "'hover'|'always'|'never'", default: "'hover'", desc: 'Underline behavior.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the link.' }
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

    <section :id="'table'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('table') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('table') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('table')" :code="tableCode">
        <div style="max-width: 560px">
          <Table :columns="tableCols" :data="tableData" striped hover bordered />
        </div>
      </DemoBlock>
      <PropsTable :rows="tableRows" />
    </section>

    <section :id="'pagination'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('pagination') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('pagination') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('pagination')" :code="paginationCode">
        <Pagination v-model="paginationPage" :total="120" :page-size="10" />
      </DemoBlock>
      <PropsTable :rows="paginationRows" />
    </section>

    <section :id="'tree'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('tree') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('tree') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('tree')" :code="treeCode">
        <div style="max-width: 320px">
          <Tree :data="treeData" />
        </div>
      </DemoBlock>
      <PropsTable :rows="treeRows" />
    </section>

    <section :id="'calendar'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('calendar') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('calendar') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('calendar')" :code="calendarCode">
        <Calendar v-model="calDate" />
      </DemoBlock>
      <PropsTable :rows="calendarRows" />
    </section>

    <section :id="'descriptions'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('descriptions') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('descriptions') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('descriptions')" :code="descCode">
        <div style="max-width: 520px">
          <Descriptions :items="descItems" :column="2" border title="Profile" />
        </div>
      </DemoBlock>
      <PropsTable :rows="descRows" />
    </section>

    <section :id="'empty'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('empty') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('empty') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('empty')" :code="emptyCode">
        <Empty description="No results found" />
      </DemoBlock>
      <PropsTable :rows="emptyRows" />
    </section>

    <section :id="'image'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('image') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('image') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('image')" :code="imageCode">
        <div style="display: flex; gap: 16px; flex-wrap: wrap">
          <AuraImage src="https://picsum.photos/seed/aura1/200/120" width="200px" height="120px" radius="12px" />
          <AuraImage src="https://picsum.photos/seed/aura2/200/120" width="200px" height="120px" radius="12px" preview />
        </div>
      </DemoBlock>
      <PropsTable :rows="imageRows" />
    </section>

    <section :id="'result'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('result') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('result') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('result')" :code="resultCode">
        <div style="display: flex; gap: 28px; flex-wrap: wrap">
          <Result status="success" title="Success" subtitle="Operation completed." />
          <Result status="warning" title="Warning" subtitle="Please check." />
          <Result status="404" title="Not Found" subtitle="Page missing." />
        </div>
      </DemoBlock>
      <PropsTable :rows="resultRows" />
    </section>

    <section :id="'link'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('link') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('link') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('link')" :code="linkCode">
        <div style="display: flex; gap: 16px; flex-wrap: wrap; align-items: center">
          <Link href="#" type="primary">Primary</Link>
          <Link type="success">Success</Link>
          <Link type="error" underline="always">Error</Link>
          <Link disabled>Disabled</Link>
        </div>
      </DemoBlock>
      <PropsTable :rows="linkRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
