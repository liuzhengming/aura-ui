<script setup lang="ts">
import { useToastState, removeToast } from '../toast'
import type { ToastType } from '../toast'

const state = useToastState()

const icons: Record<ToastType, string> = {
  success: '✓',
  error: '✕',
  info: 'i',
  warning: '!'
}
</script>

<template>
  <Teleport to="body">
    <div class="aura-toast-wrap">
      <TransitionGroup name="aura-toast">
        <div
          v-for="t in state.items"
          :key="t.id"
          class="aura-toast"
          :class="`aura-toast--${t.type}`"
          @click="removeToast(t.id)"
        >
          <span class="aura-toast__icon">{{ icons[t.type] }}</span>
          <span class="aura-toast__msg">{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.aura-toast-wrap {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  gap: 10px;
  pointer-events: none;
}
.aura-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 220px;
  max-width: 340px;
  padding: 12px 16px;
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
  background: rgba(20, 22, 34, 0.92);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.45);
  backdrop-filter: blur(8px);
}
.aura-toast__icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  font-size: 13px;
  font-weight: 700;
  flex: none;
}
.aura-toast--success .aura-toast__icon {
  background: #06d6a0;
}
.aura-toast--error .aura-toast__icon {
  background: #ff5c7c;
}
.aura-toast--info .aura-toast__icon {
  background: #4ad9ff;
}
.aura-toast--warning .aura-toast__icon {
  background: #ffd166;
  color: #1a1a1a;
}
.aura-toast-enter-active,
.aura-toast-leave-active {
  transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1);
}
.aura-toast-enter-from {
  opacity: 0;
  transform: translateX(40px);
}
.aura-toast-leave-to {
  opacity: 0;
  transform: translateX(40px);
}
.aura-toast-leave-active {
  position: absolute;
}
</style>
