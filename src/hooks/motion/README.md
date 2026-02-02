# Motion

Hooks for layout values used in motion and animation. Use when you need screen dimensions, safe area insets, or derived layout metrics (e.g. content center) for Reanimated or other animation logic. **Read this—you don't need to open the hook files.**

---

## Folder structure

```
motion/
├── README.md
├── index.ts
└── useMotionScreen.ts
```

---

## useMotionScreen

**What it does:** Wraps `useWindowDimensions` and `useSafeAreaInsets` and adds derived values useful for animations: content height (excluding safe area) and content center Y. Used by Avatar transitions and any animation that needs to position elements relative to the visible content area.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `insets` | `{ top, right, bottom, left }` | Safe area insets |
| `width` | `number` | Screen width |
| `height` | `number` | Screen height |
| `contentHeight` | `number` | `height - insets.top - insets.bottom` (visible content area height) |
| `contentCenterY` | `number` | `insets.top + contentHeight / 2` (Y of content area center) |

**Why these values?**

- **contentHeight** – Height of the area between top and bottom safe areas. Use when animating full-screen content or calculating overlay heights.
- **contentCenterY** – Y coordinate of the center of that content area. Use when centering elements or animating from center to top (e.g. Avatar transition).

**Examples:**

```ts
import { useMotionScreen } from '@/hooks';

function AvatarTransition() {
  const { insets, contentHeight, contentCenterY } = useMotionScreen();

  // Animate circle from center to top edge
  const targetY = insets.top + circleRadius / 2 - contentCenterY;
  translateY.value = withTiming(targetY);

  // Full-screen overlay height
  const overlayHeight = contentHeight;
}
```

```ts
// Layout diagram:
// ┌─────────────────────┐
// │   insets.top        │
// ├─────────────────────┤
// │                     │
// │   contentHeight     │  contentCenterY = insets.top + contentHeight/2
// │                     │
// ├─────────────────────┤
// │   insets.bottom     │
// └─────────────────────┘
```

**Used by:** Avatar `useTransitionMotions` for viewer content positioning.

---

## Naming

- **useMotionScreen** – Screen/layout metrics for motion; not for general UI layout (use `useScreenSize` / `useResponsive` for that).
