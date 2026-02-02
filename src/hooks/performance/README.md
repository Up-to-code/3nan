# Performance

Hooks for performance monitoring, profiling, and optimization. Use when you need frame rate, animation profiling, or similar metrics. **Read this—you don't need to open the hook files.**

---

## Folder structure

```
performance/
├── README.md
├── index.ts
└── useMotionPerformance.ts
```

---

## useMotionPerformance

**What it does:** Lightweight FPS counter for motion/animation performance. Uses `requestAnimationFrame` to measure frame timing and returns approximate FPS over recent frames.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `fps` | `number` | Approximate frames per second (capped at 60) |
| `isLow` | `boolean` | `true` when fps < 30 (indicates jank) |

**Examples:**

```ts
import { useMotionPerformance } from '@/hooks';

function MyScreen() {
  const { fps, isLow } = useMotionPerformance();

  return (
    <View>
      <Text style={{ color: isLow ? 'red' : 'green' }}>{fps} FPS</Text>
    </View>
  );
}
```

---

## Principle

Keep this folder for profiling, FPS, and optimization only—not for general app performance patterns.
