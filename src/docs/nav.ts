export interface NavItem {
  key: string
  page: string
}

export interface NavGroup {
  titleKey: string
  items: NavItem[]
}

// page values map to components registered in docs/registry.ts
export const nav: NavGroup[] = [
  {
    titleKey: 'gettingStarted',
    items: [{ key: 'gettingStarted', page: 'GettingStarted' }]
  },
  {
    titleKey: 'buttons',
    items: [
      { key: 'magnetic', page: 'Buttons' },
      { key: 'ripple', page: 'Buttons' },
      { key: 'glowCard', page: 'Surfaces' },
      { key: 'tiltCard', page: 'Surfaces' },
      { key: 'spotlight', page: 'Surfaces' }
    ]
  },
  {
    titleKey: 'typography',
    items: [
      { key: 'gradientText', page: 'Typography' },
      { key: 'blurText', page: 'Typography' },
      { key: 'typewriter', page: 'Typography' }
    ]
  },
  {
    titleKey: 'forms',
    items: [
      { key: 'input', page: 'Forms' },
      { key: 'checkbox', page: 'Forms' },
      { key: 'radio', page: 'Forms' },
      { key: 'switch', page: 'Forms' },
      { key: 'slider', page: 'Forms' },
      { key: 'select', page: 'Forms' },
      { key: 'segmented', page: 'Forms' },
      { key: 'rate', page: 'Forms' }
    ]
  },
  {
    titleKey: 'dataDisplay',
    items: [
      { key: 'badge', page: 'DataDisplay' },
      { key: 'tag', page: 'DataDisplay' },
      { key: 'avatar', page: 'DataDisplay' },
      { key: 'progress', page: 'DataDisplay' },
      { key: 'skeleton', page: 'DataDisplay' },
      { key: 'countUp', page: 'DataDisplay' },
      { key: 'carousel', page: 'DataDisplay' },
      { key: 'timeline', page: 'DataDisplay' },
      { key: 'table', page: 'DataDisplay' },
      { key: 'pagination', page: 'DataDisplay' },
      { key: 'tree', page: 'DataDisplay' },
      { key: 'calendar', page: 'DataDisplay' },
      { key: 'descriptions', page: 'DataDisplay' },
      { key: 'empty', page: 'DataDisplay' },
      { key: 'image', page: 'DataDisplay' },
      { key: 'result', page: 'DataDisplay' },
      { key: 'link', page: 'DataDisplay' }
    ]
  },
  {
    titleKey: 'feedback',
    items: [
      { key: 'dialog', page: 'Feedback' },
      { key: 'drawer', page: 'Feedback' },
      { key: 'alert', page: 'Feedback' },
      { key: 'toast', page: 'Feedback' },
      { key: 'notification', page: 'Feedback' },
      { key: 'spinner', page: 'Feedback' },
      { key: 'collapse', page: 'Feedback' },
      { key: 'loading', page: 'Feedback' },
      { key: 'backtop', page: 'Feedback' }
    ]
  },
  {
    titleKey: 'overlay',
    items: [
      { key: 'tooltip', page: 'Overlay' },
      { key: 'popover', page: 'Overlay' },
      { key: 'dropdown', page: 'Overlay' },
      { key: 'commandPalette', page: 'Overlay' }
    ]
  },
  {
    titleKey: 'navigation',
    items: [
      { key: 'tabs', page: 'Navigation' },
      { key: 'accordion', page: 'Navigation' },
      { key: 'breadcrumb', page: 'Navigation' },
      { key: 'steps', page: 'Navigation' },
      { key: 'marquee', page: 'Navigation' }
    ]
  },
  {
    titleKey: 'motion',
    items: [
      { key: 'scrollReveal', page: 'Motion' },
      { key: 'aurora', page: 'Motion' },
      { key: 'confetti', page: 'Motion' }
    ]
  },
  {
    titleKey: 'layout',
    items: [
      { key: 'container', page: 'Layout' },
      { key: 'header', page: 'Layout' },
      { key: 'aside', page: 'Layout' },
      { key: 'main', page: 'Layout' },
      { key: 'footer', page: 'Layout' },
      { key: 'row', page: 'Layout' },
      { key: 'col', page: 'Layout' },
      { key: 'space', page: 'Layout' },
      { key: 'divider', page: 'Layout' }
    ]
  },
  {
    titleKey: 'utilities',
    items: [
      { key: 'kbd', page: 'Utilities' },
      { key: 'copyButton', page: 'Utilities' }
    ]
  }
]

export function findItem(key: string): NavItem | undefined {
  for (const g of nav) {
    const it = g.items.find((i) => i.key === key)
    if (it) return it
  }
  return undefined
}
