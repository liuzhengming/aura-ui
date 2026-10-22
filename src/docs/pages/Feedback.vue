<script setup lang="ts">
import { ref } from 'vue'
import { compName, compDesc, t } from '../i18n'
import DemoBlock from '../components/DemoBlock.vue'
import PropsTable from '../components/PropsTable.vue'
import Dialog from '../../lib/components/Dialog.vue'
import Drawer from '../../lib/components/Drawer.vue'
import Alert from '../../lib/components/Alert.vue'
import Spinner from '../../lib/components/Spinner.vue'
import ToastContainer from '../../lib/components/ToastContainer.vue'
import Notification from '../../lib/components/Notification.vue'
import Collapse from '../../lib/components/Collapse.vue'
import CollapseItem from '../../lib/components/CollapseItem.vue'
import Loading from '../../lib/components/Loading.vue'
import Backtop from '../../lib/components/Backtop.vue'
import { useToast } from '../../lib/toast'
import { useNotification } from '../../lib/notification'

const loadingOn = ref(true)
const collapseCode = `<Collapse :model-value="['a']">
  <CollapseItem name="a" title="What is Aura UI?">
    A Vue 3 component library focused on motion and micro-interactions.
  </CollapseItem>
  <CollapseItem name="b" title="Is it free?">Yes, MIT licensed.</CollapseItem>
</Collapse>

<!-- accordion: only one panel open at a time -->
<Collapse accordion>
  <CollapseItem name="1" title="One">First panel</CollapseItem>
  <CollapseItem name="2" title="Two">Second panel</CollapseItem>
</Collapse>`

const loadingCode = `<Loading :loading="loading" tip="Loading...">
  <p>Content being loaded</p>
</Loading>

<!-- fullscreen mask -->
<Loading fullscreen :loading="showGlobal" tip="Uploading" />`

const backtopCode = `<!-- tracks window scroll by default -->
<Backtop :visibility-height="200" />

<!-- or bind to a scroll container -->
<div class="scroll-box" style="height: 200px; overflow: auto">
  <div style="height: 600px">tall content</div>
  <Backtop target=".scroll-box" :visibility-height="40" />
</div>`

const collapseRows = [
  { name: 'modelValue', type: '(string | number)[]', default: '[]', desc: 'Active panel names (v-model).' },
  { name: 'accordion', type: 'boolean', default: 'false', desc: 'Only one panel open at a time.' },
  { name: 'CollapseItem.name', type: 'string | number', default: '—', desc: 'Unique panel id.' },
  { name: 'CollapseItem.title', type: 'string', default: "''", desc: 'Header title.' },
  { name: 'CollapseItem.disabled', type: 'boolean', default: 'false', desc: 'Disable this panel.' }
]
const loadingRows = [
  { name: 'loading', type: 'boolean', default: 'true', desc: 'Show the mask.' },
  { name: 'tip', type: 'string', default: "''", desc: 'Text under the spinner.' },
  { name: 'size', type: "'sm'|'md'|'lg'", default: "'md'", desc: 'Spinner size.' },
  { name: 'fullscreen', type: 'boolean', default: 'false', desc: 'Cover the whole viewport.' }
]
const backtopRows = [
  { name: 'visibilityHeight', type: 'number', default: '200', desc: 'Scroll offset before showing.' },
  { name: 'right', type: 'string', default: "'24px'", desc: 'Distance from the right edge.' },
  { name: 'bottom', type: 'string', default: "'24px'", desc: 'Distance from the bottom edge.' },
  { name: 'target', type: 'string', default: 'window', desc: 'Selector of a scroll container.' }
]

const dialogOpen = ref(false)
const drawerOpen = ref(false)
const toast = useToast()
const notify = useNotification()

const dialogCode = `<Dialog v-model="open" title="Confirm">
  Are you sure you want to continue?
  <template #footer>
    <button @click="open=false">Cancel</button>
    <button @click="open=false">Confirm</button>
  </template>
</Dialog>`

const drawerCode = `<Drawer v-model="open" title="Settings" side="right">
  Drawer content goes here.
</Drawer>`

const alertCode = `<Alert type="success" title="Saved">Your changes are safe.</Alert>
<Alert type="warning" closable>Please review before submitting.</Alert>
<Alert type="error">Something went wrong.</Alert>`

const toastCode = `import { useToast } from 'aura-ui'

const toast = useToast()
toast.success('Saved successfully')
toast.error('Something went wrong')
toast.info('New version available')`

const notificationCode = `import { useNotification, Notification } from 'aura-ui'

// mount once at app root:
<Notification />

const notify = useNotification()
notify.success('Deployed', 'Build finished in 12s')`

const spinnerCode = `<Spinner />
<Spinner variant="dots" :size="24" />
<Spinner variant="pulse" />`

const dialogRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Open state (v-model).' },
  { name: 'title', type: 'string', default: "''", desc: 'Dialog title.' },
  { name: '#footer', type: 'slot', default: '—', desc: 'Footer action area.' }
]
const drawerRows = [
  { name: 'modelValue', type: 'boolean', default: 'false', desc: 'Open state (v-model).' },
  { name: 'title', type: 'string', default: "''", desc: 'Drawer title.' },
  { name: 'side', type: "'left'|'right'|'top'|'bottom'", default: "'right'", desc: 'Edge to slide from.' }
]
const alertRows = [
  { name: 'type', type: "'info'|'success'|'warning'|'error'", default: "'info'", desc: 'Semantic style.' },
  { name: 'title', type: 'string', default: "''", desc: 'Bold title line.' },
  { name: 'closable', type: 'boolean', default: 'false', desc: 'Show a close button.' }
]
const toastRows = [
  { name: 'useToast()', type: "() => { success, error, info, warning }", default: '—', desc: 'Composable that returns trigger methods.' }
]
const notificationRows = [
  { name: 'Notification (component)', type: 'component', default: '—', desc: 'Mount once; renders the stacked list.' },
  { name: 'useNotification()', type: "() => { success, error, info, warning }", default: '—', desc: 'Trigger notifications anywhere.' }
]
const spinnerRows = [
  { name: 'variant', type: "'ring'|'dots'|'pulse'", default: "'ring'", desc: 'Spinner style.' },
  { name: 'size', type: 'number', default: '28', desc: 'Size in pixels.' }
]
</script>

<template>
  <div class="doc-page">
    <ToastContainer />
    <Notification />

    <section :id="'dialog'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('dialog') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('dialog') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('dialog')" :code="dialogCode">
        <button class="demo-btn" type="button" @click="dialogOpen = true">Open Dialog</button>
      </DemoBlock>
      <Dialog v-model="dialogOpen" title="Confirm action">
        <p>Are you sure you want to continue? This cannot be undone.</p>
        <template #footer>
          <button class="demo-btn demo-btn--ghost" type="button" @click="dialogOpen = false">Cancel</button>
          <button class="demo-btn" type="button" @click="dialogOpen = false">Confirm</button>
        </template>
      </Dialog>
      <PropsTable :rows="dialogRows" />
    </section>

    <section :id="'drawer'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('drawer') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('drawer') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('drawer')" :code="drawerCode">
        <button class="demo-btn" type="button" @click="drawerOpen = true">Open Drawer</button>
      </DemoBlock>
      <Drawer v-model="drawerOpen" title="Settings" side="right">
        <p>Slide-in panels work from any edge: left, right, top or bottom.</p>
      </Drawer>
      <PropsTable :rows="drawerRows" />
    </section>

    <section :id="'alert'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('alert') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('alert') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('alert')" :code="alertCode">
        <div style="display: flex; flex-direction: column; gap: 12px; width: 100%; max-width: 460px">
          <Alert type="info" title="Heads up">New version available.</Alert>
          <Alert type="success" title="Saved">Your changes are safe.</Alert>
          <Alert type="warning" closable>Please review before submitting.</Alert>
          <Alert type="error">Something went wrong.</Alert>
        </div>
      </DemoBlock>
      <PropsTable :rows="alertRows" />
    </section>

    <section :id="'toast'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('toast') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('toast') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('toast')" :code="toastCode">
        <div style="display: flex; gap: 10px; flex-wrap: wrap">
          <button class="demo-btn demo-btn--ghost" type="button" @click="toast.success('Saved successfully')">Success</button>
          <button class="demo-btn demo-btn--ghost" type="button" @click="toast.error('Something went wrong')">Error</button>
          <button class="demo-btn demo-btn--ghost" type="button" @click="toast.info('New version available')">Info</button>
        </div>
      </DemoBlock>
      <PropsTable :rows="toastRows" />
    </section>

    <section :id="'notification'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('notification') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('notification') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('notification')" :code="notificationCode">
        <div style="display: flex; gap: 10px; flex-wrap: wrap">
          <button class="demo-btn demo-btn--ghost" type="button" @click="notify.success('Deployed', 'Build finished in 12s')">Success</button>
          <button class="demo-btn demo-btn--ghost" type="button" @click="notify.warning('Low storage', 'Only 5% left')">Warning</button>
          <button class="demo-btn demo-btn--ghost" type="button" @click="notify.error('Failed', 'Could not connect')">Error</button>
        </div>
      </DemoBlock>
      <PropsTable :rows="notificationRows" />
    </section>

    <section :id="'spinner'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('spinner') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('spinner') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('spinner')" :code="spinnerCode">
        <div style="display: flex; gap: 28px; align-items: center">
          <Spinner />
          <Spinner variant="dots" :size="24" />
          <Spinner variant="pulse" :size="32" />
        </div>
      </DemoBlock>
      <PropsTable :rows="spinnerRows" />
    </section>

    <section :id="'collapse'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('collapse') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('collapse') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('collapse')" :code="collapseCode">
        <div style="max-width: 520px">
          <Collapse :model-value="['a']">
            <CollapseItem name="a" title="What is Aura UI?">
              A Vue 3 component library focused on motion and micro-interactions.
            </CollapseItem>
            <CollapseItem name="b" title="Is it free?">Yes, MIT licensed.</CollapseItem>
            <CollapseItem name="c" title="Mobile ready?" disabled>Coming soon.</CollapseItem>
          </Collapse>
        </div>
      </DemoBlock>
      <PropsTable :rows="collapseRows" />
    </section>

    <section :id="'loading'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('loading') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('loading') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('loading')" :code="loadingCode">
        <div style="border: 1px solid var(--aura-border); border-radius: 12px; overflow: hidden; max-width: 520px">
          <Loading :loading="loadingOn" tip="Loading..." style="height: 120px">
            <div style="padding: 20px">Loaded content sits here. Toggle loading to mask it.</div>
          </Loading>
          <div style="padding: 12px; display: flex; gap: 10px">
            <button class="demo-btn demo-btn--ghost" type="button" @click="loadingOn = !loadingOn">Toggle loading</button>
          </div>
        </div>
      </DemoBlock>
      <PropsTable :rows="loadingRows" />
    </section>

    <section :id="'backtop'" class="doc-sec">
      <h2 class="doc-sec__title">{{ compName('backtop') }}</h2>
      <p class="doc-sec__desc">{{ compDesc('backtop') }}</p>
      <DemoBlock :title="t('ui.examples')" :description="compDesc('backtop')" :code="backtopCode">
        <div class="aura-backtop-demo" style="position: relative; height: 170px; overflow: auto; border: 1px solid var(--aura-border); border-radius: 12px; background: var(--aura-surface)">
          <div style="height: 420px; padding: 16px; color: var(--aura-text-dim)">
            Scroll down inside this box — the back-to-top button appears at the bottom-right corner once you pass the visibility height, then smoothly scrolls back up.
          </div>
          <Backtop target=".aura-backtop-demo" :visibility-height="40" />
        </div>
      </DemoBlock>
      <PropsTable :rows="backtopRows" />
    </section>
  </div>
</template>

<style scoped>
.doc-page { max-width: 860px; }
.doc-sec { margin-bottom: 3rem; scroll-margin-top: 24px; }
.doc-sec__title { font-size: 1.6rem; margin-bottom: 0.4rem; }
.doc-sec__desc { color: var(--aura-text-dim); margin-bottom: 1.4rem; line-height: 1.6; }
.demo-btn {
  padding: 9px 16px;
  border-radius: 10px;
  border: none;
  background: var(--aura-gradient);
  color: #fff;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
}
.demo-btn--ghost {
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  color: var(--aura-text);
}
</style>
