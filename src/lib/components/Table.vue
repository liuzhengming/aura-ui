<script setup lang="ts">
export interface TableColumn {
  key: string
  title: string
  width?: string | number
  align?: 'left' | 'center' | 'right'
  fixed?: boolean
}

const props = withDefaults(
  defineProps<{
    columns: TableColumn[]
    data: Record<string, any>[]
    striped?: boolean
    bordered?: boolean
    hover?: boolean
    emptyText?: string
  }>(),
  { striped: false, bordered: false, hover: true, emptyText: 'No data' }
)
</script>

<template>
  <div class="aura-table-wrap">
    <table
      class="aura-table"
      :class="{ 'is-striped': striped, 'is-bordered': bordered, 'is-hover': hover }"
    >
      <thead>
        <tr>
          <th
            v-for="c in columns"
            :key="c.key"
            :style="{ width: c.width, textAlign: c.align, position: c.fixed ? 'sticky' : undefined, left: c.fixed ? 0 : undefined }"
          >
            {{ c.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, i) in data" :key="i">
          <td
            v-for="c in columns"
            :key="c.key"
            :style="{ textAlign: c.align, position: c.fixed ? 'sticky' : undefined, left: c.fixed ? 0 : undefined }"
          >
            <slot :name="`cell-${c.key}`" :row="row" :value="row[c.key]">{{ row[c.key] }}</slot>
          </td>
        </tr>
        <tr v-if="data.length === 0">
          <td :colspan="columns.length" class="aura-table__empty">{{ emptyText }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.aura-table-wrap {
  width: 100%;
  overflow-x: auto;
  border-radius: var(--aura-radius-sm);
  border: 1px solid var(--aura-border);
  background: var(--aura-surface);
}
.aura-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}
.aura-table th,
.aura-table td {
  padding: 12px 14px;
  text-align: left;
  border-bottom: 1px solid var(--aura-border);
  vertical-align: middle;
  white-space: nowrap;
}
.aura-table th {
  background: var(--aura-bg-elev);
  color: var(--aura-text-dim);
  font-weight: 600;
  position: relative;
}
.aura-table tbody tr:last-child td {
  border-bottom: none;
}
.aura-table.is-striped tbody tr:nth-child(even) {
  background: rgba(255, 255, 255, 0.025);
}
.aura-table.is-bordered th,
.aura-table.is-bordered td {
  border: 1px solid var(--aura-border);
}
.aura-table.is-hover tbody tr:hover {
  background: var(--aura-surface-2);
}
.aura-table__empty {
  text-align: center;
  color: var(--aura-text-faint);
  padding: 32px 0;
}
</style>
