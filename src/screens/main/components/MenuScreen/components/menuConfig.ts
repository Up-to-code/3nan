export const MENU_GROUPS = [
  {
    id: 'services',
    labelKey: 'menu.services',
    items: [
      { id: 'contact', icon: 'person-outline' as const, labelKey: 'menu.contact' },
      { id: 'orders', icon: 'receipt-outline' as const, labelKey: 'menu.orders' },
    ],
  },
  {
    id: 'chats',
    labelKey: 'menu.chats',
    items: [
      { id: 'chatHistory', icon: 'chatbubbles-outline' as const, labelKey: 'menu.chatHistory' },
    ],
  },
] as const;
