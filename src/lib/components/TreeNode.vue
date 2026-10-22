<script setup lang="ts">
import { ref } from 'vue'
import type { AuraTreeItem } from './Tree.vue'
import TreeNode from './TreeNode.vue'

const props = withDefaults(
  defineProps<{ node: AuraTreeItem; level?: number; defaultExpandAll?: boolean }>(),
  { level: 0, defaultExpandAll: false }
)

const open = ref(props.defaultExpandAll || props.node.expanded || false)
const hasChildren = !!(props.node.children && props.node.children.length)

function toggle() {
  if (props.node.disabled || !hasChildren) return
  open.value = !open.value
}
</script>

<template>
  <div class="aura-tree-node">
    <div
      class="aura-tree-row"
      :class="{ 'is-disabled': node.disabled }"
      :style="{ paddingLeft: level * 18 + 10 + 'px' }"
      @click="toggle"
    >
      <span v-if="hasChildren" class="aura-tree-arrow" :class="{ open }">▸</span>
      <span v-else class="aura-tree-dot" />
      <span class="aura-tree-label">{{ node.label }}</span>
    </div>
    <div v-if="hasChildren" class="aura-tree-children" :class="{ open }">
      <div class="aura-tree-children-inner">
        <TreeNode
          v-for="c in node.children"
          :key="c.key"
          :node="c"
          :level="level + 1"
          :default-expand-all="defaultExpandAll"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.aura-tree-row {
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
  padding-right: 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.18s var(--aura-ease);
}
.aura-tree-row:hover {
  background: var(--aura-surface);
}
.aura-tree-row.is-disabled {
  opacity: 0.45;
  cursor: not-allowed;
}
.aura-tree-arrow {
  display: inline-flex;
  width: 16px;
  justify-content: center;
  color: var(--aura-text-faint);
  transition: transform 0.2s var(--aura-ease);
  font-size: 0.7rem;
}
.aura-tree-arrow.open {
  transform: rotate(90deg);
}
.aura-tree-dot {
  display: inline-block;
  width: 5px;
  height: 5px;
  margin: 0 5px;
  border-radius: 50%;
  background: var(--aura-text-faint);
}
.aura-tree-label {
  color: var(--aura-text);
}
.aura-tree-children {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.25s var(--aura-ease);
}
.aura-tree-children.open {
  grid-template-rows: 1fr;
}
.aura-tree-children-inner {
  overflow: hidden;
  min-height: 0;
}
</style>
