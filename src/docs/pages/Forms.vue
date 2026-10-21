<script setup lang="ts">
import { ref } from 'vue'
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Input from '../../lib/components/Input.vue'
import Checkbox from '../../lib/components/Checkbox.vue'
import RadioGroup from '../../lib/components/RadioGroup.vue'
import Radio from '../../lib/components/Radio.vue'
import Switch from '../../lib/components/Switch.vue'
import Slider from '../../lib/components/Slider.vue'
import Select from '../../lib/components/Select.vue'
import Segmented from '../../lib/components/Segmented.vue'
import Rate from '../../lib/components/Rate.vue'

const name = ref('')
const agree = ref(true)
const plan = ref('pro')
const on = ref(true)
const volume = ref(40)
const fruit = ref('apple')
const seg = ref('day')
const score = ref(4)

const selectOptions = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true },
  { label: 'Durian', value: 'durian' }
]

const inputCode = `<Input v-model="name" label="Your name" placeholder="Type here" />
<Input v-model="email" label="Email" type="email" />
<Input :disabled="true" model-value="Read only" label="Disabled" />`

const checkboxCode = `<Checkbox v-model="agree" label="I agree to the terms" />
<Checkbox :model-value="true" label="Checked" />
<Checkbox :disabled="true" label="Disabled" />`

const radioCode = `<RadioGroup v-model="plan">
  <Radio value="free" label="Free" />
  <Radio value="pro" label="Pro" />
  <Radio value="team" label="Team" />
</RadioGroup>

<!-- vertical -->
<RadioGroup v-model="plan" vertical> ... </RadioGroup>`

const switchCode = `<Switch v-model="on" />
<Switch v-model="on" size="lg" />
<Switch :disabled="true" :model-value="true" />`

const sliderCode = `<Slider v-model="volume" />
<Slider v-model="value" :min="0" :max="200" :step="5" />`

const selectCode = `<Select v-model="fruit" :options="[
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Cherry', value: 'cherry', disabled: true }
]" />`

const segmentedCode = `<Segmented v-model="seg" :options="['Day', 'Week', 'Month']" />
<Segmented v-model="seg" :options="[
  { label: 'Grid', value: 'grid' },
  { label: 'List', value: 'list' }
]" />`

const rateCode = `<Rate v-model="score" />
<Rate v-model="score" :allow-half="true" />
<Rate v-model="score" :count="10" />`

const inputRows = [
  { name: 'modelValue', type: 'string', default: "''", desc: 'The input value (v-model).' },
  { name: 'label', type: 'string', default: "''", desc: 'Floating label text.' },
  { name: 'placeholder', type: 'string', default: "''", desc: 'Placeholder shown when unfocused.' },
  { name: 'type', type: 'string', default: "'text'", desc: 'Native input type.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the field.' }
]
const checkboxRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Checked state (v-model).' },
  { name: 'label', type: 'string', default: "''", desc: 'Label next to the box.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the checkbox.' }
]
const radioRows = [
  { name: 'RadioGroup.modelValue', type: 'string | number', default: 'null', desc: 'Selected value (v-model).' },
  { name: 'Radio.value', type: 'string | number', default: '—', desc: 'Value of this option.' },
  { name: 'Radio.label', type: 'string', default: "''", desc: 'Option label.' }
]
const switchRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'On/off state (v-model).' },
  { name: 'size', type: "'sm' | 'md' | 'lg'", default: "'md'", desc: 'Switch size.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the switch.' }
]
const sliderRows = [
  { name: 'modelValue', type: 'number', default: '0', desc: 'Current value (v-model).' },
  { name: 'min', type: 'number', default: '0', desc: 'Minimum value.' },
  { name: 'max', type: 'number', default: '100', desc: 'Maximum value.' },
  { name: 'step', type: 'number', default: '1', desc: 'Step increment.' }
]
const selectRows = [
  { name: 'modelValue', type: 'string | number', default: 'null', desc: 'Selected value (v-model).' },
  { name: 'options', type: "Array<{label,value} | string>", default: '[]', desc: 'Options to display.' },
  { name: 'placeholder', type: 'string', default: "'Please select'", desc: 'Placeholder text.' }
]
const segmentedRows = [
  { name: 'modelValue', type: 'string | number', default: "''", desc: 'Active value (v-model).' },
  { name: 'options', type: "Array<string | {label,value}>", default: '[]', desc: 'Segment options.' }
]
const rateRows = [
  { name: 'modelValue', type: 'number', default: '0', desc: 'Current rating (v-model).' },
  { name: 'count', type: 'number', default: '5', desc: 'Number of stars.' },
  { name: 'allowHalf', type: 'boolean', default: 'false', desc: 'Allow half-star selection.' }
]
</script>

<template>
  <div class="doc-page">
    <section :id="'input'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('input') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('input') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('input')" :code="inputCode">
        <div style="display: flex; flex-direction: column; gap: 16px; width: 280px">
          <Input v-model="name" label="Your name" placeholder="Type here" />
          <Input model-value="readonly@example.com" label="Email" type="email" disabled />
        </div>
      </DemoBlock>
      <PropsTable :rows="inputRows" />
    </section>

    <section :id="'checkbox'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('checkbox') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('checkbox') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('checkbox')" :code="checkboxCode">
        <div style="display: flex; flex-direction: column; gap: 12px; align-items: flex-start">
          <Checkbox v-model="agree" label="I agree to the terms" />
          <Checkbox :model-value="true" label="Already checked" />
          <Checkbox :disabled="true" label="Disabled" />
        </div>
      </DemoBlock>
      <PropsTable :rows="checkboxRows" />
    </section>

    <section :id="'radio'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('radio') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('radio') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('radio')" :code="radioCode">
        <RadioGroup v-model="plan">
          <Radio value="free" label="Free" />
          <Radio value="pro" label="Pro" />
          <Radio value="team" label="Team" />
        </RadioGroup>
      </DemoBlock>
      <PropsTable :rows="radioRows" />
    </section>

    <section :id="'switch'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('switch') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('switch') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('switch')" :code="switchCode">
        <div style="display: flex; gap: 18px; align-items: center">
          <Switch v-model="on" />
          <Switch v-model="on" size="lg" />
          <Switch :disabled="true" :model-value="true" />
        </div>
      </DemoBlock>
      <PropsTable :rows="switchRows" />
    </section>

    <section :id="'slider'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('slider') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('slider') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('slider')" :code="sliderCode">
        <div style="width: 320px">
          <Slider v-model="volume" />
          <p style="margin: 14px 0 0; color: var(--aura-text-dim)">Value: {{ volume }}</p>
        </div>
      </DemoBlock>
      <PropsTable :rows="sliderRows" />
    </section>

    <section :id="'select'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('select') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('select') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('select')" :code="selectCode">
        <Select v-model="fruit" :options="selectOptions" />
      </DemoBlock>
      <PropsTable :rows="selectRows" />
    </section>

    <section :id="'segmented'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('segmented') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('segmented') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('segmented')" :code="segmentedCode">
        <Segmented v-model="seg" :options="['Day', 'Week', 'Month']" />
      </DemoBlock>
      <PropsTable :rows="segmentedRows" />
    </section>

    <section :id="'rate'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('rate') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('rate') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('rate')" :code="rateCode">
        <div style="display: flex; flex-direction: column; gap: 14px; align-items: flex-start">
          <Rate v-model="score" />
          <Rate v-model="score" :allow-half="true" />
          <Rate v-model="score" :count="10" />
        </div>
      </DemoBlock>
      <PropsTable :rows="rateRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
