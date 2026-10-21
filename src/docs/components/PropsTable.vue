<script setup lang="ts">
import { t } from '../i18n'

export interface PropRow {
  name: string
  type: string
  default?: string
  desc: string
}

defineProps<{ rows: PropRow[] }>()
</script>

<template>
  <div class="props-table-wrap">
    <table class="props-table">
      <thead>
        <tr>
          <th>{{ t('ui.propName') }}</th>
          <th>{{ t('ui.propType') }}</th>
          <th>{{ t('ui.propDefault') }}</th>
          <th>{{ t('ui.propDesc') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.name">
          <td><code>{{ row.name }}</code></td>
          <td><code class="props-table__type">{{ row.type }}</code></td>
          <td><code v-if="row.default">{{ row.default }}</code><span v-else>—</span></td>
          <td>{{ row.desc }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.props-table-wrap {
  overflow-x: auto;
  border-radius: var(--aura-radius);
  border: 1px solid var(--aura-border);
}
.props-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}
.props-table th,
.props-table td {
  text-align: left;
  padding: 11px 14px;
  border-bottom: 1px solid var(--aura-border);
  vertical-align: top;
}
.props-table th {
  background: var(--aura-surface);
  color: var(--aura-text-dim);
  font-weight: 600;
  white-space: nowrap;
}
.props-table tr:last-child td {
  border-bottom: none;
}
.props-table code {
  font-family: var(--aura-mono);
  font-size: 0.82rem;
  color: var(--aura-primary-2);
  background: var(--aura-surface);
  padding: 1px 6px;
  border-radius: 6px;
}
.props-table__type {
  color: var(--aura-accent) !important;
}
</style>
