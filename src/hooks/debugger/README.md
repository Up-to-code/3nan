# Debugger

Hooks for debugging: FPS, memory, and performance metrics. Use when you need to understand performance, find jank, or monitor resource usage. **Read this—you don't need to open the hook files.**

---

## Folder structure

```text
debugger/
├── README.md
├── index.ts
├── useDebugFPS.ts
├── useDebugMemory.ts
└── useDebugPerformance.ts
```

---

## Hooks

| Hook | Returns | When to use |
|------|---------|-------------|
| `useDebugFPS` | `fps`, `isLow` | FPS counter with throttled UI updates |
| `useDebugMemory` | `usedMB`, `totalMB`, `available` | Memory (stub; add native module for real data) |
| `useDebugPerformance` | `fps`, `isLow`, `memory` | Combined + console logging to terminal |

---

## useDebugFPS

- Throttled UI updates (500ms) so numbers change visibly without 60 re-renders/sec
- Returns `{ fps, isLow }` (isLow when fps < 30)

---

## useDebugMemory

- **Limitation:** Expo does not expose memory. Returns `{ usedMB: null, totalMB: null, available: false }`
- Add `react-native-device-info` for real RAM metrics

---

## useDebugPerformance

- Composes FPS + memory
- **Console logging:** Logs `[Perf] FPS: 58 | RAM: N/A` to terminal every 1.5s (when `enableConsoleLog` is true, default in __DEV__)
- Use for real-time terminal debugging

---

## CPU

CPU usage is not available from JavaScript in React Native. Requires native code. Omitted for now.
