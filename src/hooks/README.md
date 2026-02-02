# Hooks

Global React hooks organized by category. Each folder has a single purpose: when you open it, you know exactly what hooks it contains. **Read this and the category READMEs—you should never need to open a hook file to understand it.**

---

## Structure

```text
hooks/
├── README.md           # This file – overview and navigation
├── index.ts            # Barrel export (re-exports all hooks)
├── language/           # RTL, translation, text direction, i18n
├── screen/             # Dimensions, breakpoints, responsive calculations
├── motion/             # Layout values for motion/animation
├── performance/        # Performance, profiling (placeholder)
└── interaction/        # Haptic, tactile feedback
```

---

## Categories at a Glance

| Category | Hooks | Purpose |
|----------|-------|---------|
| **language** | `useAppTranslation`, `useIsRTL`, `useLayoutDirection` | Translation, RTL detection, layout direction for text and flex |
| **screen** | `useScreenSize`, `useResponsive` | Screen dimensions, breakpoints, responsive scaling (wp, hp, fontSize, spacing) |
| **motion** | `useMotionScreen` | Layout metrics for animations (insets, contentHeight, contentCenterY) |
| **performance** | `useMotionPerformance` | FPS counter, frame timing |
| **debugger** | `useDebugFPS`, `useDebugMemory`, `useDebugPerformance` | Debug metrics, console logging |
| **interaction** | `useHapticFeedback` | Haptic feedback (selection, light, medium, heavy, success, etc.) |

---

## Which Hook Do I Need?

| Need | Use |
|------|-----|
| Translate a string | `useAppTranslation` → `t('key')` |
| Switch app language | `useAppTranslation` → `changeLanguage('ar')` |
| Check if RTL (e.g. Arabic) | `useIsRTL` → `isRTL` |
| Text/View that flips in RTL | `useLayoutDirection` → `textAlign`, `rowDirection`, `textStyle` |
| Raw screen width/height | `useScreenSize` → `width`, `height` |
| Device type (phone/tablet) | `useScreenSize` → `isPhone`, `isTablet` |
| Breakpoint (xs–xxl) | `useScreenSize` → `category` |
| Width as % of screen | `useResponsive` → `wp(50)` |
| Height as % of screen | `useResponsive` → `hp(20)` |
| Responsive font size | `useResponsive` → `fontSize(18)` |
| Responsive spacing | `useResponsive` → `spacing(16)` |
| Layout for animations | `useMotionScreen` → `insets`, `contentHeight`, `contentCenterY` |
| Haptic on button press | `useHapticFeedback` → `trigger('light')` |
| Haptic on success/error | `useHapticFeedback` → `trigger('success')` |
| FPS / performance monitoring | `useMotionPerformance` → `fps`, `isLow` |
| Debug FPS (throttled, real-time) | `useDebugFPS` → `fps`, `isLow` |
| Debug performance + console log | `useDebugPerformance` → `fps`, `memory`, logs to terminal |

---

## Import

**Barrel (recommended):**

```ts
import { useAppTranslation, useScreenSize, useHapticFeedback } from '@/hooks';
```

**By category:**

```ts
import { useAppTranslation } from '@/hooks/language';
import { useScreenSize, useResponsive } from '@/hooks/screen';
import { useMotionScreen } from '@/hooks/motion';
import { useHapticFeedback } from '@/hooks/interaction';
```

---

## Principle

**Single-purpose folders**: Each category folder contains only hooks for that domain. If you need language/RTL hooks, go to `language/`. If you need screen dimensions, go to `screen/`. No mixing.

---

## Next Steps

Open the README in each category folder for full details, return values, examples, and types. No need to open the hook files themselves.
