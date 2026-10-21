<script setup lang="ts">
import { ref } from 'vue'
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Tooltip from '../../lib/components/Tooltip.vue'
import Popover from '../../lib/components/Popover.vue'
import Dropdown from '../../lib/components/Dropdown.vue'
import CommandPalette from '../../lib/components/CommandPalette.vue'
import RippleButton from '../../lib/components/RippleButton.vue'
import MagneticButton from '../../lib/components/MagneticButton.vue'
import Kbd from '../../lib/components/Kbd.vue'

const paletteOpen = ref(false)
const lastCmd = ref('')

const commands = [
  { id: 'home', title: 'Go to Home', group: 'Navigation', icon: '⌂' },
  { id: 'docs', title: 'Open Docs', group: 'Navigation', icon: '❯' },
  { id: 'theme', title: 'Toggle Theme', group: 'Preferences', icon: '◐' },
  { id: 'new', title: 'New Component', group: 'Actions', icon: '＋' },
  { id: 'deploy', title: 'Deploy', group: 'Actions', icon: '▲' }
]

const dropItems = [
  { label: 'Edit', icon: '✎' },
  { label: 'Duplicate', icon: '⧉' },
  { label: 'Delete', icon: '🗑' }
]

const tooltipCode = `<Tooltip text="Hello from the top" side="top">
  <RippleButton>Hover me</RippleButton>
</Tooltip>`

const popoverCode = `<Popover title="Account">
  <template #trigger><RippleButton>Open</RippleButton></template>
  Manage your profile and settings here.
</Popover>`

const dropdownCode = `<Dropdown :items="items" @select="onSelect">
  <RippleButton>Menu</RippleButton>
</Dropdown>`

const commandPaletteCode = `<CommandPalette v-model="open" :commands="commands" @select="run" />

<!-- open with Cmd/Ctrl + K -->
<MagneticButton @click="open = true">Open Palette</MagneticButton>`

const tooltipRows = [
  { name: 'text', type: 'string', default: "''", desc: 'Tooltip text.' },
  { name: 'side', type: "'top'|'bottom'|'left'|'right'", default: "'top'", desc: 'Position relative to trigger.' },
  { name: '#content', type: 'slot', default: '—', desc: 'Custom content (overrides text).' }
]
const popoverRows = [
  { name: 'title', type: 'string', default: "''", desc: 'Popover heading.' },
  { name: 'side', type: "'top'|'bottom'|'left'|'right'", default: "'bottom'", desc: 'Position relative to trigger.' },
  { name: '#trigger', type: 'slot', default: '—', desc: 'Trigger element.' }
]
const dropdownRows = [
  { name: 'items', type: "Array<{label,icon?,disabled?,divided?}>", default: '[]', desc: 'Menu entries.' },
  { name: '@select', type: '(item) => void', default: '—', desc: 'Emitted when an item is chosen.' }
]
const commandPaletteRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Open state (v-model).' },
  { name: 'commands', type: "Array<{id,title,group?,icon?}>", default: '[]', desc: 'Available commands.' },
  { name: '@select', type: '(command) => void', default: '—', desc: 'Emitted when a command runs.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'tooltip'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('tooltip') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('tooltip') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('tooltip')" :code="tooltipCode">
        <Tooltip text="Hello from the top" side="top"><RippleButton>Hover top</RippleButton></Tooltip>
        <Tooltip text="Bottom tip" side="bottom"><RippleButton>Bottom</RippleButton></Tooltip>
        <Tooltip text="Left tip" side="left"><RippleButton>Left</RippleButton></Tooltip>
        <Tooltip text="Right tip" side="right"><RippleButton>Right</RippleButton></Tooltip>
      </DemoBlock>
      <PropsTable :rows="tooltipRows" />
    </section>

    <section :id="'popover'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('popover') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('popover') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('popover')" :code="popoverCode">
        <Popover title="Account">
          <template #trigger><RippleButton>Open</RippleButton></template>
          Manage your profile and settings here.
        </Popover>
      </DemoBlock>
      <PropsTable :rows="popoverRows" />
    </section>

    <section :id="'dropdown'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('dropdown') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('dropdown') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('dropdown')" :code="dropdownCode">
        <Dropdown :items="dropItems" @select="(i) => (lastCmd = i.label)">
          <RippleButton>Menu</RippleButton>
        </Dropdown>
        <span v-if="lastCmd" style="color: var(--aura-text-dim)">Selected: {{ lastCmd }}</span>
      </DemoBlock>
      <PropsTable :rows="dropdownRows" />
    </section>

    <section :id="'commandPalette'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('commandPalette') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('commandPalette') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('commandPalette')" :code="commandPaletteCode">
        <MagneticButton @click="paletteOpen = true">Open Palette</MagneticButton>
        <span style="color: var(--aura-text-dim); display: inline-flex; align-items: center; gap: 8px">
          or press <Kbd>Ctrl</Kbd> + <Kbd>K</Kbd>
        </span>
        <span v-if="lastCmd" style="color: var(--aura-text-dim)">Ran: {{ lastCmd }}</span>
      </DemoBlock>
      <CommandPalette v-model="paletteOpen" :commands="commands" @select="(c) => (lastCmd = c.title)" />
      <PropsTable :rows="commandPaletteRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
