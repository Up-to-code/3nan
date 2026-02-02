# Screen

Hooks for screen dimensions, breakpoints, and responsive calculations. Use when you need to adapt layout, font sizes, or spacing to different screen sizes. **Read this—you don't need to open the hook files.**

---

## Folder structure

```text
screen/
├── README.md
├── index.ts
├── useScreenSize.ts
└── useResponsive.ts
```

---

## Hooks Overview

| Hook | Returns | When to use |
|------|---------|-------------|
| `useScreenSize` | `width`, `height`, `category`, `isPhone`, `isTablet`, `isLandscape`, etc. | Raw dimensions, breakpoint, device type |
| `useResponsive` | `wp`, `hp`, `fontSize`, `spacing`, `ms`, `scaleFactor`, `multiplier` | Responsive scaling helpers |

---

## useScreenSize

**What it does:** Raw screen dimensions from `useWindowDimensions`, plus derived values: breakpoint category (xs–xxl), phone/tablet, landscape.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `width` | `number` | Screen width in px |
| `height` | `number` | Screen height in px |
| `fontScale` | `number` | User's font scale (accessibility) |
| `scale` | `number` | Pixel ratio |
| `category` | `ScreenCategory` | Breakpoint: xs, sm, md, lg, xl, xxl |
| `isPhone` | `boolean` | `width < 600` |
| `isTablet` | `boolean` | `width >= 600` |
| `isLandscape` | `boolean` | `width > height` |

**Breakpoints (ScreenCategory):**

| Category | Width (portrait) | Example devices |
|----------|------------------|-----------------|
| xs | 0–320 | iPhone SE 1st gen |
| sm | 321–375 | iPhone SE 2/3, iPhone 8 |
| md | 376–414 | iPhone 12/13/14, most Android |
| lg | 415–428 | iPhone Pro Max |
| xl | 429–768 | Small tablets |
| xxl | 769+ | iPad, Android tablets |

**Examples:**

```ts
import { useScreenSize } from '@/hooks';

function MyScreen() {
  const { width, height, category, isPhone, isTablet, isLandscape } = useScreenSize();

  return (
    <View>
      {isPhone && <CompactLayout />}
      {isTablet && <TabletLayout />}
      {category === 'xs' && <ExtraSmallAdjustments />}
    </View>
  );
}
```

---

## useResponsive

**What it does:** Helper functions that scale values by screen size. Base design is iPhone 12/13/14 (375×812). Use `wp`, `hp`, `fontSize`, `spacing`, `ms` to build layouts that adapt.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `wp` | `(percent: number) => number` | Width as % of screen (e.g. `wp(50)` → half width) |
| `hp` | `(percent: number) => number` | Height as % of screen (e.g. `hp(20)` → 20% height) |
| `fontSize` | `(size: number) => number` | Scaled font size, clamped 80%–130% |
| `spacing` | `(size: number) => number` | Scaled spacing (padding, margin, gap) |
| `ms` | `(size: number, factor?) => number` | Moderate scale (less aggressive; default factor 0.5) |
| `scaleFactor` | `number` | `width / 375` (base width) |
| `multiplier` | `number` | Category-based (xs: 0.85, md: 1, xxl: 1.3) |

**Examples:**

```ts
import { useResponsive } from '@/hooks';

function Card() {
  const { wp, hp, fontSize, spacing, ms } = useResponsive();

  return (
    <View
      style={{
        width: wp(90),           // 90% of screen width
        height: hp(30),          // 30% of screen height
        padding: spacing(16),   // scales with screen (e.g. 14 on xs, 18 on lg)
        gap: spacing(12),
      }}
    >
      <Text style={{ fontSize: fontSize(18) }}>Title</Text>
      <Text style={{ fontSize: fontSize(14) }}>Body</Text>
      <View style={{ marginTop: ms(8) }} />  {/* Moderate scale */}
    </View>
  );
}
```

```ts
// wp(50) on 375px screen → 187.5
// wp(50) on 414px screen → 207
// fontSize(18) → clamped between 14.4 and 23.4
// spacing(16) → scales linearly with width
```

**When to use which:**

- `wp` / `hp` – Layout dimensions (width, height, percentages)
- `fontSize` – Text sizes (clamped to avoid too small/large)
- `spacing` – Padding, margin, gap
- `ms` – When you want gentler scaling than `fontSize` or `spacing`

---

## Naming

- **useScreenSize** – Raw screen size and derived categories
- **useResponsive** – Responsive scaling functions

---

## Types

- `ScreenCategory` – `'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl'`
