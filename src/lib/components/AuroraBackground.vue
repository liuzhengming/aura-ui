<template>
  <div class="aura-aurora" aria-hidden="true">
    <span class="b1" />
    <span class="b2" />
    <span class="b3" />
  </div>
</template>

<style scoped>
.aura-aurora {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}
.aura-aurora span {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
  mix-blend-mode: screen;
}
.b1 {
  width: 46vw;
  height: 46vw;
  left: -8vw;
  top: -12vw;
  background: #7c5cff;
  animation: aura-float1 18s ease-in-out infinite;
}
.b2 {
  width: 42vw;
  height: 42vw;
  right: -6vw;
  top: 4vw;
  background: #00d4ff;
  animation: aura-float2 22s ease-in-out infinite;
}
.b3 {
  width: 40vw;
  height: 40vw;
  left: 18vw;
  bottom: -18vw;
  background: #ff5c8a;
  animation: aura-float3 20s ease-in-out infinite;
}
@keyframes aura-float1 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(6vw, 4vw) scale(1.15); }
}
@keyframes aura-float2 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-5vw, 6vw) scale(1.1); }
}
@keyframes aura-float3 {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(4vw, -5vw) scale(1.2); }
}
</style>
