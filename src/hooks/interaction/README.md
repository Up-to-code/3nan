# Interaction

Hooks for tactile and haptic feedback. Use when you need to trigger haptic feedback on user actions (button press, selection, success, error). **Read this—you don't need to open the hook files.**

---

## Folder structure

```text
interaction/
├── README.md
├── index.ts
└── useHapticFeedback.ts
```

---

## useHapticFeedback

**What it does:** Triggers device haptic (vibration) feedback. Returns a `trigger` function that accepts a feedback type. No-op on iOS Simulator and web.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `trigger` | `(type: HapticFeedbackType) => Promise<void>` | Fire haptic feedback |

---

## HapticFeedbackType – When to Use Each

| Type | Feel | Use for |
|------|------|---------|
| `selection` | Light tick | Picker/segmented control selection |
| `light` | Soft tap | Button press, toggle |
| `medium` | Medium tap | Important action |
| `heavy` | Strong tap | Destructive or critical action |
| `soft` | Soft impact | Subtle feedback |
| `rigid` | Rigid impact | Firm feedback |
| `success` | Success pattern | Operation succeeded |
| `warning` | Warning pattern | Caution |
| `error` | Error pattern | Operation failed |

---

## Examples

```ts
import { useHapticFeedback } from '@/hooks';

function ButtonExample() {
  const { trigger } = useHapticFeedback();

  return (
    <Pressable onPress={() => trigger('light')}>
      <Text>Tap me</Text>
    </Pressable>
  );
}
```

```ts
// On form submit success
const handleSubmit = async () => {
  await submitForm();
  trigger('success');
};
```

```ts
// On validation error
if (!isValid) {
  trigger('error');
  return;
}
```

```ts
// Double-tap to toggle (e.g. Avatar line visibility)
const onDoubleTap = () => {
  trigger('light');
  setLineShown((prev) => !prev);
};
```

```ts
// Picker / segmented control
<Picker
  onValueChange={(value) => {
    trigger('selection');
    setValue(value);
  }}
/>
```

---

## Naming

- **useHapticFeedback** – Haptic (tactile) feedback; device vibration patterns.

---

## Types

- `HapticFeedbackType` – `'selection' | 'light' | 'medium' | 'heavy' | 'soft' | 'rigid' | 'success' | 'warning' | 'error'`

---

## Notes

- No-op on iOS Simulator and unsupported platforms (e.g. web). Safe to call everywhere.
- Uses `expo-haptics` under the hood.
