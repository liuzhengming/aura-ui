<script setup lang="ts">
import TreeNode from './TreeNode.vue'

export interface AuraTreeItem {
  key: string | number
  label: string
  children?: AuraTreeItem[]
  expanded?: boolean
  disabled?: boolean
}

const props = withDefaults(
  defineProps<{ data: AuraTreeItem[]; defaultExpandAll?: boolean }>(),
  { defaultExpandAll: false }
)
</script>

<template>
  <div class="aura-tree">
    <TreeNode v-for="n in data" :key="n.key" :node="n" :level="0" :default-expand-all="defaultExpandAll" />
  </div>
</template>

<style scoped>
.aura-tree {
  font-size: 0.92rem;
  user-select: none;
}
</style>
