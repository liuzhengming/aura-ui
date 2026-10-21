<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue'

export interface CarouselSlide {
  title?: string
  text?: string
  image?: string
  gradient?: string
}

const props = withDefaults(
  defineProps<{
    slides: CarouselSlide[]
    autoplay?: boolean
    interval?: number
    height?: number
  }>(),
  { autoplay: false, interval: 3500, height: 220 }
)

const index = ref(0)
const offset = ref(0)
const dragging = ref(false)
let startX = 0
let timer: number | undefined

const trackStyle = computed(() => ({
  transform: `translateX(calc(${-index.value * 100}% + ${offset.value}px))`
}))

function next() {
  index.value = (index.value + 1) % props.slides.length
}
function prev() {
  index.value = (index.value - 1 + props.slides.length) % props.slides.length
}
function goTo(i: number) {
  index.value = i
}

function startAuto() {
  if (!props.autoplay || props.slides.length <= 1) return
  stopAuto()
  timer = window.setInterval(next, props.interval)
}
function stopAuto() {
  if (timer) window.clearInterval(timer)
  timer = undefined
}

function onDown(e: PointerEvent) {
  dragging.value = true
  startX = e.clientX
  stopAuto()
}
function onMove(e: PointerEvent) {
  if (dragging.value) offset.value = e.clientX - startX
}
function onUp() {
  if (!dragging.value) return
  dragging.value = false
  const width = (document.querySelector('.aura-carousel__viewport') as HTMLElement)?.offsetWidth || 1
  if (Math.abs(offset.value) > width * 0.2) {
    offset.value < 0 ? next() : prev()
  }
  offset.value = 0
  startAuto()
}

onMounted(startAuto)
onBeforeUnmount(stopAuto)
watch(() => props.autoplay, startAuto)
</script>

<template>
  <div
    class="aura-carousel"
    :style="{ height: height + 'px' }"
    @mouseenter="stopAuto"
    @mouseleave="startAuto"
  >
    <div
      class="aura-carousel__viewport"
      @pointerdown="onDown"
      @pointermove="onMove"
      @pointerup="onUp"
      @pointerleave="onUp"
    >
      <div class="aura-carousel__track" :style="trackStyle">
        <div
          v-for="(s, i) in slides"
          :key="i"
          class="aura-carousel__slide"
          :style="s.gradient ? { background: s.gradient } : undefined"
        >
          <img v-if="s.image" :src="s.image" class="aura-carousel__img" alt="" />
          <div v-if="s.title || s.text" class="aura-carousel__caption">
            <h4 v-if="s.title">{{ s.title }}</h4>
            <p v-if="s.text">{{ s.text }}</p>
          </div>
        </div>
      </div>
    </div>

    <button v-if="slides.length > 1" class="aura-carousel__arrow aura-carousel__arrow--prev" type="button" @click="prev">‹</button>
    <button v-if="slides.length > 1" class="aura-carousel__arrow aura-carousel__arrow--next" type="button" @click="next">›</button>

    <div v-if="slides.length > 1" class="aura-carousel__dots">
      <button
        v-for="(s, i) in slides"
        :key="i"
        type="button"
        class="aura-carousel__dot"
        :class="{ 'is-active': i === index }"
        :aria-label="`go to slide ${i + 1}`"
        @click="goTo(i)"
      />
    </div>
  </div>
</template>

<style scoped>
.aura-carousel {
  position: relative;
  width: 100%;
  border-radius: var(--aura-radius);
  overflow: hidden;
  background: var(--aura-surface);
  border: 1px solid var(--aura-border);
  touch-action: pan-y;
}
.aura-carousel__viewport {
  width: 100%;
  height: 100%;
  overflow: hidden;
  cursor: grab;
}
.aura-carousel__viewport:active {
  cursor: grabbing;
}
.aura-carousel__track {
  display: flex;
  height: 100%;
  transition: transform 0.45s var(--aura-ease);
}
.aura-carousel.dragging .aura-carousel__track {
  transition: none;
}
.aura-carousel__slide {
  position: relative;
  flex: 0 0 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;
  background: var(--aura-gradient);
}
.aura-carousel__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.aura-carousel__caption {
  position: relative;
  z-index: 1;
  padding: 22px;
  color: #fff;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.55), transparent);
  width: 100%;
}
.aura-carousel__caption h4 {
  font-size: 1.15rem;
  margin-bottom: 4px;
}
.aura-carousel__caption p {
  font-size: 0.9rem;
  opacity: 0.9;
}
.aura-carousel__arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background: rgba(0, 0, 0, 0.35);
  color: #fff;
  font-size: 1.4rem;
  line-height: 1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s var(--aura-ease);
}
.aura-carousel__arrow:hover {
  background: rgba(0, 0, 0, 0.6);
}
.aura-carousel__arrow--prev { left: 12px; }
.aura-carousel__arrow--next { right: 12px; }
.aura-carousel__dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 7px;
}
.aura-carousel__dot {
  width: 8px;
  height: 8px;
  padding: 0;
  border-radius: 50%;
  border: none;
  background: rgba(255, 255, 255, 0.5);
  cursor: pointer;
  transition: width 0.25s var(--aura-ease), background 0.25s var(--aura-ease);
}
.aura-carousel__dot.is-active {
  width: 22px;
  border-radius: 999px;
  background: #fff;
}
</style>
