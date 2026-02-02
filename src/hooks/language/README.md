# Language

Hooks for translation (i18n), RTL detection, and layout direction. Use when you need to render text in the app language, detect RTL, or apply direction-aware styles (textAlign, flexDirection, etc.). **Read this—you don't need to open the hook files.**

---

## Folder structure

```
language/
├── README.md
├── index.ts
├── useAppTranslation.ts
├── useIsRTL.ts
└── useLayoutDirection.ts
```

---

## Hooks Overview

| Hook | Returns | When to use |
|------|---------|-------------|
| `useAppTranslation` | `t`, `changeLanguage`, `currentLanguage` | Translate strings, switch language |
| `useIsRTL` | `isRTL`, `language` | Check if current language is RTL (e.g. Arabic) |
| `useLayoutDirection` | `direction`, `isRTL`, `textAlign`, `rowDirection`, `textStyle`, `alignStart` | Apply RTL-aware layout props to Text, View, flex |

---

## useAppTranslation

**What it does:** Wraps react-i18next with app language store. Gives you a translate function `t`, a language switcher, and the current language.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `t` | `(key: string) => string` | Translate a key from locales (e.g. `t('welcome')` → "Welcome" or "مرحبا") |
| `changeLanguage` | `(lang: SupportedLanguage) => void` | Switch app language (e.g. `changeLanguage('ar')`) |
| `currentLanguage` | `SupportedLanguage` | Current language code (e.g. `'en'`, `'ar'`) |

**Examples:**

```ts
import { useAppTranslation } from '@/hooks';

function WelcomeScreen() {
  const { t, changeLanguage, currentLanguage } = useAppTranslation();

  return (
    <View>
      <Text>{t('welcome')}</Text>
      <Text>{t('auth.signIn')}</Text>
      <Button
        title={currentLanguage === 'ar' ? 'English' : 'العربية'}
        onPress={() => changeLanguage(currentLanguage === 'ar' ? 'en' : 'ar')}
      />
    </View>
  );
}
```

```ts
// With interpolation
t('greeting', { name: 'Ahmed' })  // "Hello, Ahmed" or "مرحبا، أحمد"
```

---

## useIsRTL

**What it does:** Tells you if the current language is right-to-left (RTL). Used when you need a simple boolean or the current language code.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `isRTL` | `boolean` | `true` when language is RTL (e.g. Arabic) |
| `language` | `'ar' \| 'en'` | Current language code |

**Examples:**

```ts
import { useIsRTL } from '@/hooks';

function MyComponent() {
  const { isRTL, language } = useIsRTL();

  if (isRTL) {
    // Show RTL-specific UI
  }

  return <Text>Current: {language}</Text>;
}
```

---

## useLayoutDirection

**What it does:** Gives you ready-to-use style props that flip correctly for RTL. Use these instead of hardcoding `textAlign: 'left'` or `flexDirection: 'row'`—they automatically become `right` and `row-reverse` in RTL.

**Returns:**

| Property | Type | Meaning |
|---------|------|---------|
| `direction` | `'rtl' \| 'ltr'` | Layout direction |
| `isRTL` | `boolean` | Same as useIsRTL |
| `textAlign` | `'left' \| 'right' \| 'center'` | `right` in RTL, `left` in LTR |
| `textAlignCenter` | `'center'` | Always center (for titles, buttons) |
| `textStyle` | `{ textAlign, writingDirection }` | Object for Text component |
| `rowDirection` | `'row' \| 'row-reverse'` | `row-reverse` in RTL, `row` in LTR |
| `alignStart` | `'flex-start' \| 'flex-end'` | Start edge for flex (flips in RTL) |

**Examples:**

```ts
import { useLayoutDirection } from '@/hooks';

function FormScreen() {
  const { textAlign, rowDirection, textStyle } = useLayoutDirection();

  return (
    <View>
      {/* Text that aligns to start (left in LTR, right in RTL) */}
      <Text style={textStyle}>{t('label')}</Text>

      {/* Row of buttons that flip order in RTL */}
      <View style={{ flexDirection: rowDirection, gap: 8 }}>
        <Button title="Cancel" />
        <Button title="Save" />
      </View>

      {/* Icon + text row */}
      <View style={{ flexDirection: rowDirection, alignItems: 'center' }}>
        <Icon name="arrow" />
        <Text style={{ textAlign }}>Back</Text>
      </View>
    </View>
  );
}
```

```ts
// Centered title (doesn't flip)
const { textAlignCenter } = useLayoutDirection();
<Text style={{ textAlign: textAlignCenter }}>Settings</Text>
```

---

## Naming

- **useAppTranslation** – App-level translation; integrates with language store
- **useIsRTL** – "Is Right-to-Left"; boolean + language
- **useLayoutDirection** – Layout direction and derived style props

---

## Types

- `LayoutDirection` – `'rtl' | 'ltr'`
- `TextAlignRTL` – `'left' | 'right' | 'center'`
