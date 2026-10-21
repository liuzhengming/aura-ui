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

// Data entry
export { default as Input } from './components/Input.vue'
export { default as Checkbox } from './components/Checkbox.vue'
export { default as RadioGroup } from './components/RadioGroup.vue'
export { default as Radio } from './components/Radio.vue'
export { default as Switch } from './components/Switch.vue'
export { default as Slider } from './components/Slider.vue'
export { default as Select } from './components/Select.vue'
export { default as Segmented } from './components/Segmented.vue'
export { default as Rate } from './components/Rate.vue'

// Data display
export { default as Badge } from './components/Badge.vue'
export { default as Tag } from './components/Tag.vue'
export { default as Avatar } from './components/Avatar.vue'
export { default as Progress } from './components/Progress.vue'
export { default as Carousel } from './components/Carousel.vue'
export { default as Timeline } from './components/Timeline.vue'

// Feedback
export { default as Dialog } from './components/Dialog.vue'
export { default as Drawer } from './components/Drawer.vue'
export { default as Alert } from './components/Alert.vue'
export { default as ToastContainer } from './components/ToastContainer.vue'
export { default as Notification } from './components/Notification.vue'
export { default as Spinner } from './components/Spinner.vue'

// Overlay
export { default as Tooltip } from './components/Tooltip.vue'
export { default as Popover } from './components/Popover.vue'
export { default as Dropdown } from './components/Dropdown.vue'
export { default as CommandPalette } from './components/CommandPalette.vue'

// Navigation
export { default as Tabs } from './components/Tabs.vue'
export { default as Tab } from './components/Tab.vue'
export { default as Accordion } from './components/Accordion.vue'
export { default as AccordionItem } from './components/AccordionItem.vue'
export { default as Breadcrumb } from './components/Breadcrumb.vue'
export { default as Steps } from './components/Steps.vue'

// Utilities
export { default as Kbd } from './components/Kbd.vue'
export { default as CopyButton } from './components/CopyButton.vue'

// Composables & utilities
export {
  useToast,
  useToastState,
  pushToast,
  removeToast
} from './toast'
export type { ToastType, ToastItem } from './toast'
export {
  useNotification,
  useNotificationState,
  pushNotification,
  removeNotification
} from './notification'
export type { NotificationType, NotificationItem } from './notification'
export { fireConfetti } from './confetti'
export type { ConfettiOptions } from './confetti'
