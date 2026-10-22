<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { FormRule } from '../../lib/components/FormItem.vue'
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
import Form from '../../lib/components/Form.vue'
import FormItem from '../../lib/components/FormItem.vue'
import DatePicker from '../../lib/components/DatePicker.vue'
import Upload from '../../lib/components/Upload.vue'

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

const formModel = reactive({ name: '', email: '', plan: 'pro', newsletter: true })
const formRules: Record<string, FormRule[]> = {
  name: [{ required: true, message: 'Please enter your name' }],
  email: [{ required: true, type: 'email', message: 'Enter a valid email address' }]
}
const formRef = ref<any>(null)
const submitted = ref('')
async function submitForm() {
  const ok = await formRef.value?.validate()
  submitted.value = ok ? 'Form is valid — submitted.' : 'Please fix the highlighted errors.'
}
function resetForm() {
  formRef.value?.resetFields()
  submitted.value = ''
}
const formCode = `<Form ref="formRef" :model="model" :rules="rules">
  <FormItem prop="name" label="Name">
    <Input v-model="model.name" placeholder="Type here" />
  </FormItem>
  <FormItem prop="email" label="Email">
    <Input v-model="model.email" type="email" />
  </FormItem>
  <FormItem>
    <button @click="formRef.validate()">Submit</button>
  </FormItem>
</Form>`
const formRows = [
  { name: 'model', type: 'Record<string, any>', default: '—', desc: 'Form data object (reactive).' },
  { name: 'rules', type: 'Record<string, FormRule[]>', default: '{}', desc: 'Validation rules keyed by prop.' },
  { name: 'labelPosition', type: "'top' | 'left'", default: "'top'", desc: 'Label placement.' },
  { name: 'FormItem.prop', type: 'string', default: '—', desc: 'Field key to bind rules.' },
  { name: 'FormItem.label', type: 'string', default: "''", desc: 'Field label.' },
  { name: 'FormItem.rules', type: 'FormRule[]', default: '[]', desc: 'Per-field rules override.' }
]

const pickedDate = ref('')
const dateCode = `<DatePicker v-model="pickedDate" placeholder="Pick a date" />`
const dateRows = [
  { name: 'modelValue', type: 'string', default: "''", desc: 'Selected date YYYY-MM-DD (v-model).' },
  { name: 'placeholder', type: 'string', default: "'Select date'", desc: 'Trigger placeholder.' },
  { name: 'disabled', type: 'boolean', default: 'false', desc: 'Disable the picker.' }
]

const uploadCode = `<Upload multiple accept="image/*" :max-size="5" @change="onFiles" />
<!-- drag and drop is supported automatically -->`
const uploadRows = [
  { name: 'multiple', type: 'boolean', default: 'false', desc: 'Allow selecting multiple files.' },
  { name: 'accept', type: 'string', default: "''", desc: 'Native accept filter.' },
  { name: 'maxSize', type: 'number', default: '0', desc: 'Max file size in MB (0 = no limit).' },
  { name: '@change', type: '(files) => void', default: '—', desc: 'Emitted with the managed file list.' }
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

    <section :id="'form'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('form') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('form') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('form')" :code="formCode">
        <Form ref="formRef" :model="formModel" :rules="formRules" style="max-width: 440px">
          <FormItem prop="name" label="Name">
            <Input v-model="formModel.name" label="Your name" placeholder="Type here" />
          </FormItem>
          <FormItem prop="email" label="Email">
            <Input v-model="formModel.email" label="Email" type="email" placeholder="you@example.com" />
          </FormItem>
          <FormItem prop="plan" label="Plan">
            <RadioGroup v-model="formModel.plan">
              <Radio value="free" label="Free" />
              <Radio value="pro" label="Pro" />
            </RadioGroup>
          </FormItem>
          <FormItem>
            <div style="display: flex; gap: 10px">
              <button class="demo-btn" type="button" @click="submitForm">Submit</button>
              <button class="demo-btn demo-btn--ghost" type="button" @click="resetForm">Reset</button>
            </div>
          </FormItem>
          <p v-if="submitted" style="margin: 4px 0 0; color: var(--aura-text-dim)">{{ submitted }}</p>
        </Form>
      </DemoBlock>
      <PropsTable :rows="formRows" />
    </section>

    <section :id="'datePicker'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('datePicker') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('datePicker') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('datePicker')" :code="dateCode">
        <DatePicker v-model="pickedDate" />
      </DemoBlock>
      <PropsTable :rows="dateRows" />
    </section>

    <section :id="'upload'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('upload') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('upload') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('upload')" :code="uploadCode">
        <Upload multiple accept="image/*" :max-size="5" style="max-width: 460px" />
      </DemoBlock>
      <PropsTable :rows="uploadRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
</style>
