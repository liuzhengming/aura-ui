import type { App, Component } from 'vue'

// Design tokens (:root variables + light theme + utilities).
// Imported here so the publishable dist/style.css ships the tokens that every
// component references via var(); without this, consumers must vendor the tokens
// themselves (see issue with 0.1.x packages missing :root definitions).
import '../tokens.css'

// Micro-interactions
import MagneticButton from './components/MagneticButton.vue'
import RippleButton from './components/RippleButton.vue'
import GlowCard from './components/GlowCard.vue'
import TiltCard from './components/TiltCard.vue'
import Spotlight from './components/Spotlight.vue'

// Motion & display
import GradientText from './components/GradientText.vue'
import ScrollReveal from './components/ScrollReveal.vue'
import CountUp from './components/CountUp.vue'
import Typewriter from './components/Typewriter.vue'
import AuroraBackground from './components/AuroraBackground.vue'
import Skeleton from './components/Skeleton.vue'
import BlurText from './components/BlurText.vue'
import Marquee from './components/Marquee.vue'

// Data entry
import Input from './components/Input.vue'
import Checkbox from './components/Checkbox.vue'
import CheckboxGroup from './components/CheckboxGroup.vue'
import RadioGroup from './components/RadioGroup.vue'
import Radio from './components/Radio.vue'
import Switch from './components/Switch.vue'
import Slider from './components/Slider.vue'
import Select from './components/Select.vue'
import Segmented from './components/Segmented.vue'
import Rate from './components/Rate.vue'

// Data display
import Badge from './components/Badge.vue'
import Tag from './components/Tag.vue'
import Avatar from './components/Avatar.vue'
import Progress from './components/Progress.vue'
import Carousel from './components/Carousel.vue'
import Timeline from './components/Timeline.vue'
import Table from './components/Table.vue'
import Pagination from './components/Pagination.vue'
import Tree from './components/Tree.vue'
import TreeNode from './components/TreeNode.vue'
import Calendar from './components/Calendar.vue'
import Descriptions from './components/Descriptions.vue'
import Empty from './components/Empty.vue'
import Image from './components/Image.vue'
import Result from './components/Result.vue'
import Link from './components/Link.vue'

// Feedback
import Dialog from './components/Dialog.vue'
import Drawer from './components/Drawer.vue'
import Alert from './components/Alert.vue'
import ToastContainer from './components/ToastContainer.vue'
import Notification from './components/Notification.vue'
import Spinner from './components/Spinner.vue'
import Collapse from './components/Collapse.vue'
import CollapseItem from './components/CollapseItem.vue'
import Loading from './components/Loading.vue'
import Backtop from './components/Backtop.vue'

// Overlay
import Tooltip from './components/Tooltip.vue'
import Popover from './components/Popover.vue'
import Dropdown from './components/Dropdown.vue'
import CommandPalette from './components/CommandPalette.vue'

// Navigation
import Tabs from './components/Tabs.vue'
import Tab from './components/Tab.vue'
import Accordion from './components/Accordion.vue'
import AccordionItem from './components/AccordionItem.vue'
import Breadcrumb from './components/Breadcrumb.vue'
import Steps from './components/Steps.vue'

// Layout
import Container from './components/Container.vue'
import Header from './components/Header.vue'
import Aside from './components/Aside.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'
import Row from './components/Row.vue'
import Col from './components/Col.vue'
import Space from './components/Space.vue'
import Divider from './components/Divider.vue'

// Utilities
import Kbd from './components/Kbd.vue'
import CopyButton from './components/CopyButton.vue'

// Form
import Form from './components/Form.vue'
import FormItem from './components/FormItem.vue'

// Navigation
import Menu from './components/Menu.vue'
import MenuItem from './components/MenuItem.vue'

// Data display
import Card from './components/Card.vue'
import List from './components/List.vue'
import ListItem from './components/ListItem.vue'

// Data entry
import DatePicker from './components/DatePicker.vue'
import Upload from './components/Upload.vue'

// Feedback
import Popconfirm from './components/Popconfirm.vue'

// Global
import ConfigProvider from './components/ConfigProvider.vue'

// Re-export every component
export {
  MagneticButton, RippleButton, GlowCard, TiltCard, Spotlight,
  GradientText, ScrollReveal, CountUp, Typewriter, AuroraBackground, Skeleton, BlurText, Marquee,
  Input, Checkbox, CheckboxGroup, RadioGroup, Radio, Switch, Slider, Select, Segmented, Rate,
  Badge, Tag, Avatar, Progress, Carousel, Timeline, Table, Pagination, Tree, TreeNode,
  Calendar, Descriptions, Empty, Image, Result, Link,
  Dialog, Drawer, Alert, ToastContainer, Notification, Spinner, Collapse, CollapseItem, Loading, Backtop,
  Tooltip, Popover, Dropdown, CommandPalette,
  Tabs, Tab, Accordion, AccordionItem, Breadcrumb, Steps,
  Container, Header, Aside, Main, Footer, Row, Col, Space, Divider,
  Kbd, CopyButton,
  Form, FormItem, Menu, MenuItem, Card, List, ListItem,
  DatePicker, Upload, Popconfirm, ConfigProvider
}

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
export { useBreakpoint, pickResponsive } from './breakpoint'
export type { Breakpoint } from './breakpoint'

// Types
export type { TableColumn } from './components/Table.vue'
export type { AuraTreeItem } from './components/Tree.vue'
export type { DescItem } from './components/Descriptions.vue'
export type { SelectOption } from './components/Select.vue'
export type { FormRule } from './components/FormItem.vue'

// ---------------------------------------------------------------------------
// Out-of-the-box: app.use(AuraUI) registers every component globally.
// ---------------------------------------------------------------------------
const componentMap: Record<string, Component> = {
  MagneticButton, RippleButton, GlowCard, TiltCard, Spotlight,
  GradientText, ScrollReveal, CountUp, Typewriter, AuroraBackground, Skeleton, BlurText, Marquee,
  Input, Checkbox, CheckboxGroup, RadioGroup, Radio, Switch, Slider, Select, Segmented, Rate,
  Badge, Tag, Avatar, Progress, Carousel, Timeline, Table, Pagination, Tree, TreeNode,
  Calendar, Descriptions, Empty, Image, Result, Link,
  Dialog, Drawer, Alert, ToastContainer, Notification, Spinner, Collapse, CollapseItem, Loading, Backtop,
  Tooltip, Popover, Dropdown, CommandPalette,
  Tabs, Tab, Accordion, AccordionItem, Breadcrumb, Steps,
  Container, Header, Aside, Main, Footer, Row, Col, Space, Divider,
  Kbd, CopyButton,
  Form, FormItem, Menu, MenuItem, Card, List, ListItem,
  DatePicker, Upload, Popconfirm, ConfigProvider
}

export function install(app: App): void {
  Object.entries(componentMap).forEach(([name, comp]) => {
    app.component(name, comp)
  })
}

const AuraUI = { install }

export default AuraUI

/**
 * Resolver for unplugin-vue-components (on-demand auto-import, no global registration).
 * Add to your vite.config: components: [AuraUIResolver()]
 */
export function AuraUIResolver() {
  const names = new Set(Object.keys(componentMap))
  return {
    type: 'component' as const,
    resolve: (name: string) => {
      if (names.has(name)) {
        return { name, from: 'aura-ui' }
      }
      return undefined
    }
  }
}
