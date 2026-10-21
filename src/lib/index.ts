// Micro-interactions
export { default as MagneticButton } from './components/MagneticButton.vue'
export { default as RippleButton } from './components/RippleButton.vue'
export { default as GlowCard } from './components/GlowCard.vue'
export { default as TiltCard } from './components/TiltCard.vue'
export { default as Spotlight } from './components/Spotlight.vue'

// Motion & display
export { default as GradientText } from './components/GradientText.vue'
export { default as ScrollReveal } from './components/ScrollReveal.vue'
export { default as CountUp } from './components/CountUp.vue'
export { default as Typewriter } from './components/Typewriter.vue'
export { default as AuroraBackground } from './components/AuroraBackground.vue'
export { default as Skeleton } from './components/Skeleton.vue'
export { default as BlurText } from './components/BlurText.vue'
export { default as Marquee } from './components/Marquee.vue'

// UI primitives
export { default as Dialog } from './components/Dialog.vue'
export { default as Switch } from './components/Switch.vue'
export { default as Progress } from './components/Progress.vue'
export { default as Tooltip } from './components/Tooltip.vue'
export { default as Accordion } from './components/Accordion.vue'
export { default as AccordionItem } from './components/AccordionItem.vue'
export { default as Tabs } from './components/Tabs.vue'
export { default as Tab } from './components/Tab.vue'
export { default as ToastContainer } from './components/ToastContainer.vue'
export { default as CommandPalette } from './components/CommandPalette.vue'
export type { Command } from './components/CommandPalette.vue'

// Composables & utilities
export { useToast, useToastState, pushToast, removeToast } from './toast'
export type { ToastType, ToastItem } from './toast'
export { fireConfetti } from './confetti'
export type { ConfettiOptions } from './confetti'
