<script setup lang="ts">
import { ref, computed, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { nav, findItem } from './docs/nav'
import { useLang, toggleLang, compName, t } from './docs/i18n'
import { useTheme, toggleTheme, initTheme } from './docs/theme'

import GettingStarted from './docs/pages/GettingStarted.vue'
import Buttons from './docs/pages/Buttons.vue'
import Surfaces from './docs/pages/Surfaces.vue'
import Typography from './docs/pages/Typography.vue'
import Forms from './docs/pages/Forms.vue'
import DataDisplay from './docs/pages/DataDisplay.vue'
import Feedback from './docs/pages/Feedback.vue'
import Overlay from './docs/pages/Overlay.vue'
import Navigation from './docs/pages/Navigation.vue'
import Motion from './docs/pages/Motion.vue'
import Layout from './docs/pages/Layout.vue'
import Utilities from './docs/pages/Utilities.vue'
import Advanced from './docs/pages/Advanced.vue'

const pages: Record<string, any> = {
  GettingStarted,
  Buttons,
  Surfaces,
  Typography,
  Forms,
  DataDisplay,
  Feedback,
  Overlay,
  Navigation,
  Motion,
  Layout,
  Utilities,
  Advanced
}

const lang = useLang()
const theme = useTheme()
const currentPage = ref('GettingStarted')
const activeKey = ref('gettingStarted')
const query = ref('')

function match(itemKey: string): boolean {
  if (!query.value) return true
  const q = query.value.trim().toLowerCase()
  return compName(itemKey).toLowerCase().includes(q) || itemKey.includes(q)
}

const filteredNav = computed(() =>
  nav
    .map((g) => ({ ...g, items: g.items.filter((i) => match(i.key)) }))
    .filter((g) => g.items.length > 0)
)

const toc = computed(() =>
  nav
    .flatMap((g) => g.items)
    .filter((i) => i.page === currentPage.value)
    .map((i) => ({ key: i.key, name: compName(i.key) }))
)

const categoryTitle = computed(() => t(`cat.${nav.find((g) => g.items.some((i) => i.key === activeKey.value))?.titleKey || 'components'}`))

function go(key: string) {
  const it = findItem(key)
  if (!it) return
  currentPage.value = it.page
  activeKey.value = key
  nextTick(() => {
    if (key !== 'gettingStarted') {
      document.getElementById(key)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else {
      const c = document.querySelector('.docs-content')
      if (c) c.scrollTop = 0
    }
  })
}

function syncFromHash() {
  const h = decodeURIComponent(location.hash.replace('#', ''))
  if (h && findItem(h)) {
    if (h !== activeKey.value) go(h)
  }
}

onMounted(() => {
  initTheme()
  syncFromHash()
  window.addEventListener('hashchange', syncFromHash)
})
onBeforeUnmount(() => window.removeEventListener('hashchange', syncFromHash))

watch(activeKey, (k) => {
  if (k) location.hash = k
})
</script>

<template>
  <div class="docs">
    <aside class="docs-sidebar">
      <div class="docs-brand">
        <span class="docs-brand__mark">A</span>
        <span class="docs-brand__name">Aura UI</span>
      </div>
      <div class="docs-search">
        <input v-model="query" class="docs-search__input" :placeholder="t('ui.search')" />
      </div>
      <nav class="docs-nav">
        <div v-for="group in filteredNav" :key="group.titleKey" class="docs-nav__group">
          <div class="docs-nav__title">{{ t(`cat.${group.titleKey}`) }}</div>
          <button
            v-for="item in group.items"
            :key="item.key"
            class="docs-nav__item"
            :class="{ 'is-active': item.key === activeKey }"
            type="button"
            @click="go(item.key)"
          >
            {{ compName(item.key) }}
          </button>
        </div>
      </nav>
    </aside>

    <div class="docs-main">
      <header class="docs-topbar">
        <div class="docs-topbar__crumb">
          <span class="docs-topbar__brand">Aura UI</span>
          <span class="docs-topbar__sep">/</span>
          <span class="docs-topbar__cat">{{ categoryTitle }}</span>
        </div>
        <div class="docs-topbar__actions">
          <a class="docs-btn" :href="'https://github.com/liuzhengming/aura-ui'" target="_blank" rel="noopener">
            {{ t('ui.viewOnGithub') }}
          </a>
          <button class="docs-btn docs-btn--icon" type="button" :aria-label="t('ui.language')" @click="toggleLang">
            {{ lang.lang === 'en' ? '中文' : 'EN' }}
          </button>
          <button class="docs-btn docs-btn--icon" type="button" :aria-label="t('ui.themeDark')" @click="toggleTheme">
            <svg v-if="theme.theme === 'dark'" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z" /></svg>
            <svg v-else viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></svg>
          </button>
        </div>
      </header>

      <main class="docs-content">
        <component :is="pages[currentPage]" />
        <footer class="docs-footer">
          <p>{{ t('ui.builtWith') }}</p>
        </footer>
      </main>
    </div>

    <aside class="docs-toc">
      <div class="docs-toc__title">{{ t('ui.onThisPage') }}</div>
      <button
        v-for="entry in toc"
        :key="entry.key"
        class="docs-toc__item"
        :class="{ 'is-active': entry.key === activeKey }"
        type="button"
        @click="go(entry.key)"
      >
        {{ entry.name }}
      </button>
    </aside>
  </div>
</template>

<style scoped>
.docs {
  display: flex;
  height: 100vh;
  overflow: hidden;
}
.docs-sidebar {
  width: 268px;
  flex: none;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--aura-border);
  background: var(--aura-bg-soft);
}
.docs-brand {
  display: flex;
  align-items: center;
  gap: 11px;
  padding: 22px 22px 14px;
}
.docs-brand__mark {
  width: 32px;
  height: 32px;
  border-radius: 9px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  color: #fff;
  background: var(--aura-gradient);
  box-shadow: var(--aura-shadow-glow);
}
.docs-brand__name {
  font-size: 1.15rem;
  font-weight: 700;
  letter-spacing: 0.3px;
}
.docs-search {
  padding: 0 18px 14px;
}
.docs-search__input {
  width: 100%;
  padding: 9px 12px;
  border-radius: 10px;
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text);
  font-size: 0.88rem;
  font-family: inherit;
  outline: none;
  transition: border-color 0.2s var(--aura-ease), box-shadow 0.2s var(--aura-ease);
}
.docs-search__input:focus {
  border-color: var(--aura-primary);
  box-shadow: 0 0 0 3px rgba(124, 92, 255, 0.16);
}
.docs-nav {
  flex: 1;
  overflow-y: auto;
  padding: 6px 12px 24px;
}
.docs-nav__group {
  margin-bottom: 14px;
}
.docs-nav__title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--aura-text-faint);
  padding: 6px 10px;
  font-weight: 600;
}
.docs-nav__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 8px 10px;
  border: none;
  background: transparent;
  color: var(--aura-text-dim);
  font-size: 0.9rem;
  font-family: inherit;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.18s var(--aura-ease), color 0.18s var(--aura-ease);
}
.docs-nav__item:hover {
  background: var(--aura-surface);
  color: var(--aura-text);
}
.docs-nav__item.is-active {
  background: rgba(124, 92, 255, 0.16);
  color: #b9a6ff;
  font-weight: 600;
}
.docs-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.docs-topbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  border-bottom: 1px solid var(--aura-border);
  background: var(--aura-bg-soft);
  backdrop-filter: blur(10px);
}
.docs-topbar__crumb {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 0.92rem;
}
.docs-topbar__brand {
  font-weight: 700;
}
.docs-topbar__sep {
  color: var(--aura-text-faint);
}
.docs-topbar__cat {
  color: var(--aura-text-dim);
}
.docs-topbar__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}
.docs-btn {
  padding: 8px 14px;
  border-radius: 10px;
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
  color: var(--aura-text-dim);
  font-size: 0.86rem;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.2s var(--aura-ease), border-color 0.2s var(--aura-ease);
}
.docs-btn:hover {
  color: var(--aura-text);
  border-color: var(--aura-border-strong);
}
.docs-btn--icon {
  width: 38px;
  height: 38px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}
.docs-content {
  flex: 1;
  overflow-y: auto;
  padding: 36px 40px 60px;
  scroll-behavior: smooth;
}
.docs-footer {
  margin-top: 60px;
  padding-top: 24px;
  border-top: 1px solid var(--aura-border);
  color: var(--aura-text-faint);
  font-size: 0.85rem;
  text-align: center;
}
.docs-toc {
  width: 200px;
  flex: none;
  padding: 36px 18px;
  border-left: 1px solid var(--aura-border);
  overflow-y: auto;
  display: none;
}
.docs-toc__title {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--aura-text-faint);
  font-weight: 600;
  margin-bottom: 10px;
}
.docs-toc__item {
  display: block;
  width: 100%;
  text-align: left;
  padding: 6px 10px;
  border: none;
  background: transparent;
  color: var(--aura-text-dim);
  font-size: 0.84rem;
  font-family: inherit;
  border-radius: 7px;
  cursor: pointer;
  transition: color 0.18s var(--aura-ease), background 0.18s var(--aura-ease);
}
.docs-toc__item:hover {
  color: var(--aura-text);
}
.docs-toc__item.is-active {
  color: #b9a6ff;
  font-weight: 600;
}
@media (min-width: 1180px) {
  .docs-toc {
    display: block;
  }
}
@media (max-width: 720px) {
  .docs-sidebar {
    width: 210px;
  }
  .docs-content {
    padding: 24px 18px 50px;
  }
}
</style>
