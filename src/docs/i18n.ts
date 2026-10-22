import { reactive } from 'vue'

export type Lang = 'en' | 'zh'

const state = reactive<{ lang: Lang }>({ lang: 'en' })

export function useLang() {
  return state
}

export function setLang(lang: Lang) {
  state.lang = lang
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
  }
}

export function toggleLang() {
  setLang(state.lang === 'en' ? 'zh' : 'en')
}

type Dict = Record<string, any>

const en: Dict = {
  ui: {
    search: 'Search components',
    components: 'Components',
    getStarted: 'Get Started',
    viewOnGithub: 'View on GitHub',
    themeLight: 'Light',
    themeDark: 'Dark',
    language: 'Language',
    copy: 'Copy',
    copied: 'Copied',
    showCode: 'Show code',
    hideCode: 'Hide code',
    props: 'Props',
    propName: 'Name',
    propType: 'Type',
    propDefault: 'Default',
    propDesc: 'Description',
    events: 'Events',
    slots: 'Slots',
    examples: 'Examples',
    usage: 'Usage',
    install: 'Install',
    quickStart: 'Quick Start',
    importNote: 'Import the styles once at your app entry, then use components anywhere.',
    backToTop: 'Back to top',
    onThisPage: 'On this page',
    builtWith: 'Built with Vue 3, TypeScript and a lot of care.',
    totalComponents: 'components',
    zeroDeps: 'Zero runtime dependencies'
  },
  cat: {
    gettingStarted: 'Getting Started',
    buttons: 'Buttons & Actions',
    surfaces: 'Cards & Surfaces',
    typography: 'Typography',
    forms: 'Forms & Inputs',
    dataDisplay: 'Data Display',
    feedback: 'Feedback',
    overlay: 'Overlay',
    navigation: 'Navigation',
    motion: 'Motion & Backgrounds',
    layout: 'Layout',
    utilities: 'Utilities',
    components: 'Components'
  },
  comp: {
    magnetic: { name: 'Magnetic Button', desc: 'A button that is gently attracted to the cursor for a tactile, playful feel.' },
    ripple: { name: 'Ripple Button', desc: 'Material-style ripple effect triggered on every click.' },
    glowCard: { name: 'Glow Card', desc: 'A card with a soft light that follows your cursor across its surface.' },
    tiltCard: { name: 'Tilt Card', desc: 'A 3D parallax tilt card that reacts to pointer movement with a moving highlight.' },
    spotlight: { name: 'Spotlight', desc: 'An overlay layer that reveals a radial glow tracking the pointer.' },
    gradientText: { name: 'Gradient Text', desc: 'Text filled with an animated, flowing gradient.' },
    blurText: { name: 'Blur Text', desc: 'Letters fade and blur into place one by one on mount.' },
    typewriter: { name: 'Typewriter', desc: 'A single-line typewriter effect with a blinking caret.' },
    input: { name: 'Input', desc: 'Text field with an animated focus ring and floating label support.' },
    checkbox: { name: 'Checkbox', desc: 'An animated checkbox with a springy check mark.' },
    radio: { name: 'Radio Group', desc: 'A set of mutually exclusive options with a smooth indicator.' },
    switch: { name: 'Switch', desc: 'An animated on/off toggle with a sliding thumb.' },
    slider: { name: 'Slider', desc: 'A draggable range slider with a filled track and value bubble.' },
    select: { name: 'Select', desc: 'A custom dropdown select with keyboard navigation and click-outside.' },
    segmented: { name: 'Segmented', desc: 'A segmented control with a sliding active pill.' },
    rate: { name: 'Rate', desc: 'A star rating input with hover preview and half-star support.' },
    badge: { name: 'Badge', desc: 'A small status descriptor, with dot and count variants.' },
    tag: { name: 'Tag', desc: 'Compact labels for categorization, with closable and colored variants.' },
    avatar: { name: 'Avatar', desc: 'User avatar with image fallback and status dot.' },
    progress: { name: 'Progress', desc: 'A linear progress bar with gradient fill and optional label.' },
    skeleton: { name: 'Skeleton', desc: 'Loading placeholders with a shimmer animation.' },
    countUp: { name: 'Count Up', desc: 'Animated number that counts up to its target value.' },
    carousel: { name: 'Carousel', desc: 'A swipeable, auto-playing content carousel.' },
    timeline: { name: 'Timeline', desc: 'A vertical timeline for ordered events with custom dots.' },
    dialog: { name: 'Dialog', desc: 'A modal dialog with a springy entrance and backdrop blur.' },
    drawer: { name: 'Drawer', desc: 'A side panel that slides in from any edge.' },
    alert: { name: 'Alert', desc: 'Contextual feedback messages with four semantic types.' },
    toast: { name: 'Toast', desc: 'Transient notifications via a composable API.' },
    notification: { name: 'Notification', desc: 'Stacked corner notifications with title, icon and auto-dismiss.' },
    spinner: { name: 'Spinner', desc: 'A collection of lightweight loading indicators.' },
    tooltip: { name: 'Tooltip', desc: 'A hover/focus tooltip positioned on any side.' },
    popover: { name: 'Popover', desc: 'A rich content popover anchored to a trigger.' },
    dropdown: { name: 'Dropdown', desc: 'A menu of actions triggered from a button.' },
    commandPalette: { name: 'Command Palette', desc: 'A Cmd/Ctrl+K command palette with full keyboard navigation.' },
    tabs: { name: 'Tabs', desc: 'Switchable panels with an animated active underline.' },
    accordion: { name: 'Accordion', desc: 'Stacked collapsible sections with smooth height transitions.' },
    breadcrumb: { name: 'Breadcrumb', desc: 'A navigation trail showing the current location.' },
    steps: { name: 'Steps', desc: 'A wizard-style progress indicator across sequential steps.' },
    marquee: { name: 'Marquee', desc: 'A seamless infinite horizontal scroller.' },
    scrollReveal: { name: 'Scroll Reveal', desc: 'Reveal content with a fade/slide as it enters the viewport.' },
    aurora: { name: 'Aurora Background', desc: 'An animated aurora gradient backdrop.' },
    confetti: { name: 'Confetti', desc: 'A canvas confetti burst you can fire from anywhere.' },
    kbd: { name: 'Keyboard Key', desc: 'Render keyboard shortcuts as styled key caps.' },
    copyButton: { name: 'Copy Button', desc: 'A button that copies given text and shows feedback.' },
    container: { name: 'Container', desc: 'A flex layout container that switches to horizontal when an Aside is present.' },
    header: { name: 'Header', desc: 'Top layout section for titles, navigation and actions.' },
    aside: { name: 'Aside', desc: 'Side layout section, typically a navigation rail.' },
    main: { name: 'Main', desc: 'The primary content area of a layout.' },
    footer: { name: 'Footer', desc: 'Bottom layout section for footnotes and links.' },
    row: { name: 'Row', desc: 'A 24-column responsive grid row with gutter, justify and align.' },
    col: { name: 'Col', desc: 'A responsive grid column with span and offset per breakpoint.' },
    space: { name: 'Space', desc: 'A flex wrapper that lays out children with consistent gaps.' },
    divider: { name: 'Divider', desc: 'A horizontal or vertical separator, with optional centered text.' },
    table: { name: 'Table', desc: 'A data table with per-cell slots, plus striped, bordered and hover states.' },
    pagination: { name: 'Pagination', desc: 'A page navigator with compact ellipsis and v-model support.' },
    tree: { name: 'Tree', desc: 'A hierarchical, expandable tree with smooth height transitions.' },
    calendar: { name: 'Calendar', desc: 'A month-view date calendar with selection and easy navigation.' },
    descriptions: { name: 'Descriptions', desc: 'A label/content definition list with responsive columns.' },
    empty: { name: 'Empty', desc: 'A placeholder for empty states with a custom image and actions.' },
    image: { name: 'Image', desc: 'An image with lazy loading and a tap-to-zoom preview overlay.' },
    result: { name: 'Result', desc: 'A success/error/info result page with icon, title and actions.' },
    link: { name: 'Link', desc: 'An accessible text link with type, underline and disabled states.' },
    collapse: { name: 'Collapse', desc: 'Stacked collapsible panels with accordion and multi-expand modes.' },
    backtop: { name: 'Backtop', desc: 'A floating button that scrolls the page back to top once scrolled.' },
    loading: { name: 'Loading', desc: 'A spinner overlay that blocks content, or a fullscreen mask.' }
  }
}

const zh: Dict = {
  ui: {
    search: '搜索组件',
    components: '组件',
    getStarted: '开始使用',
    viewOnGithub: '在 GitHub 查看',
    themeLight: '亮色',
    themeDark: '暗色',
    language: '语言',
    copy: '复制',
    copied: '已复制',
    showCode: '显示代码',
    hideCode: '隐藏代码',
    props: '属性',
    propName: '名称',
    propType: '类型',
    propDefault: '默认值',
    propDesc: '说明',
    events: '事件',
    slots: '插槽',
    examples: '示例',
    usage: '用法',
    install: '安装',
    quickStart: '快速上手',
    importNote: '在应用入口引入一次样式，之后即可在任何地方使用组件。',
    backToTop: '回到顶部',
    onThisPage: '本页目录',
    builtWith: '使用 Vue 3、TypeScript 与十足的用心构建。',
    totalComponents: '个组件',
    zeroDeps: '零运行时依赖'
  },
  cat: {
    gettingStarted: '开始使用',
    buttons: '按钮与操作',
    surfaces: '卡片与表面',
    typography: '文字排版',
    forms: '表单与输入',
    dataDisplay: '数据展示',
    feedback: '反馈',
    overlay: '浮层',
    navigation: '导航',
    motion: '动效与背景',
    layout: '布局',
    utilities: '工具',
    components: '组件'
  },
  comp: {
    magnetic: { name: '磁吸按钮', desc: '按钮会被光标轻柔吸附，带来触感十足、俏皮灵动的体验。' },
    ripple: { name: '水波纹按钮', desc: '每次点击都会触发 Material 风格的水波纹扩散效果。' },
    glowCard: { name: '光晕卡片', desc: '卡片表面有一束柔光，跟随光标在卡面上游走。' },
    tiltCard: { name: '3D 倾斜卡片', desc: '随指针移动的视差 3D 倾斜卡片，并带有流动高光。' },
    spotlight: { name: '聚光层', desc: '一层覆盖层，用径向光晕追踪指针位置。' },
    gradientText: { name: '渐变文字', desc: '填充了流动渐变动画的文字。' },
    blurText: { name: '模糊揭示文字', desc: '文字在挂载时逐字由模糊清晰淡入。' },
    typewriter: { name: '打字机', desc: '带闪烁光标的单行打字机效果。' },
    input: { name: '输入框', desc: '带动态聚焦光环、支持浮动标签的文本输入框。' },
    checkbox: { name: '复选框', desc: '带有弹性对勾动画的复选框。' },
    radio: { name: '单选组', desc: '互斥选项组，带有平滑滑动的指示块。' },
    switch: { name: '开关', desc: '带滑块的动画开关切换组件。' },
    slider: { name: '滑块', desc: '可拖拽的滑块，带填充轨道与数值气泡。' },
    select: { name: '选择器', desc: '自定义下拉选择，支持键盘导航与点击外部关闭。' },
    segmented: { name: '分段控件', desc: '带滑动活动胶囊的分段控制器。' },
    rate: { name: '评分', desc: '星级评分输入，支持悬停预览与半星。' },
    badge: { name: '徽标', desc: '小型状态标识，支持圆点与数字变体。' },
    tag: { name: '标签', desc: '用于分类的紧凑标签，支持可关闭与彩色变体。' },
    avatar: { name: '头像', desc: '用户头像，含图片回退与状态圆点。' },
    progress: { name: '进度条', desc: '带渐变填充与可选标签的线性进度条。' },
    skeleton: { name: '骨架屏', desc: '带微光动画的加载占位符。' },
    countUp: { name: '数字滚动', desc: '数字 animated 滚动到目标值的动画组件。' },
    carousel: { name: '轮播', desc: '可滑动、自动播放的内容轮播。' },
    timeline: { name: '时间线', desc: '用于有序事件、支持自定义节点的垂直时间线。' },
    dialog: { name: '对话框', desc: '带弹簧入场与背景模糊的模态对话框。' },
    drawer: { name: '抽屉', desc: '从任意边缘滑入的侧面板。' },
    alert: { name: '警告提示', desc: '四种语义类型的上下文反馈提示。' },
    toast: { name: '轻提示', desc: '通过组合式 API 触发的瞬时通知。' },
    notification: { name: '通知', desc: '角落堆叠的通知，含标题、图标与自动消失。' },
    spinner: { name: '加载指示', desc: '一组轻量的加载动画指示器。' },
    tooltip: { name: '文字提示', desc: '悬停/聚焦触发、可向任意方向定位的提示框。' },
    popover: { name: '气泡卡片', desc: '锚定到触发元素的富内容气泡卡片。' },
    dropdown: { name: '下拉菜单', desc: '由按钮触发的操作菜单。' },
    commandPalette: { name: '命令面板', desc: '支持全键盘导航的 Cmd/Ctrl+K 命令面板。' },
    tabs: { name: '标签页', desc: '带动画活动下划线的可切换面板。' },
    accordion: { name: '手风琴', desc: '堆叠的可折叠区块，带平滑高度过渡。' },
    breadcrumb: { name: '面包屑', desc: '展示当前位置的导航路径。' },
    steps: { name: '步骤条', desc: '跨顺序步骤的向导式进度指示器。' },
    marquee: { name: '跑马灯', desc: '无缝无限横向滚动器。' },
    scrollReveal: { name: '滚动揭示', desc: '内容进入视口时以淡入/滑入方式揭示。' },
    aurora: { name: '极光背景', desc: '动画极光渐变背景。' },
    confetti: { name: '礼花', desc: '可在任意位置触发的 Canvas 礼花爆发。' },
    kbd: { name: '快捷键', desc: '将键盘快捷键渲染为时尚的按键样式。' },
    copyButton: { name: '复制按钮', desc: '复制给定文本并显示反馈的按钮。' },
    container: { name: '布局容器', desc: '弹性布局容器，包含侧边栏时自动切换为横向排列。' },
    header: { name: '顶栏', desc: '布局顶部区域，用于放置标题、导航与操作。' },
    aside: { name: '侧边栏', desc: '布局侧边区域，通常作为导航栏。' },
    main: { name: '内容区', desc: '布局的主要内容区域。' },
    footer: { name: '底栏', desc: '布局底部区域，用于页脚信息与链接。' },
    row: { name: '栅格行', desc: '24 栅格响应式行，支持间距、对齐与排布。' },
    col: { name: '栅格列', desc: '响应式栅格列，支持按断点设置跨度与偏移。' },
    space: { name: '间距容器', desc: '用统一间距排布子元素的弹性容器。' },
    divider: { name: '分割线', desc: '横向或纵向分隔线，支持可选的居中文字。' },
    table: { name: '表格', desc: '数据表格，单元格支持插槽，含斑马纹、边框与悬停态。' },
    pagination: { name: '分页', desc: '带紧凑省略号与 v-model 的页码导航。' },
    tree: { name: '树形控件', desc: '可展开的分层树，带平滑高度过渡。' },
    calendar: { name: '日历', desc: '月视图日期日历，支持选择与导航。' },
    descriptions: { name: '描述列表', desc: '标签/内容定义列表，支持响应式列数。' },
    empty: { name: '空状态', desc: '空数据占位，支持自定义图标与操作。' },
    image: { name: '图片', desc: '支持懒加载与点击放大预览的图片组件。' },
    result: { name: '结果页', desc: '成功/错误/信息结果页，含图标、标题与操作。' },
    link: { name: '链接', desc: '可访问的文本链接，支持类型、下划线与禁用态。' },
    collapse: { name: '折叠面板', desc: '可折叠的堆叠面板，支持手风琴与多展开模式。' },
    backtop: { name: '回到顶部', desc: '滚动后出现、点击平滑回到顶部的悬浮按钮。' },
    loading: { name: '加载', desc: '用于遮罩内容与全屏蒙层的加载指示器。' }
  }
}

const dict: Record<Lang, Dict> = { en, zh }

export function t(path: string): string {
  const node = path.split('.').reduce<any>((acc, key) => (acc == null ? acc : acc[key]), dict[state.lang])
  return typeof node === 'string' ? node : path
}

export function compName(key: string): string {
  return t(`comp.${key}.name`)
}

export function compDesc(key: string): string {
  return t(`comp.${key}.desc`)
}
