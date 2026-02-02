# Tone

Hooks for parsing TOON (Token-Oriented Object Notation) strings from LLM responses into avatar motion timelines. TOON is token-efficient (~40% fewer tokens than JSON). Use when the LLM returns a motion timeline in TOON format.

---

## Folder structure

```
tone/
├── README.md
├── index.ts
├── types.ts
├── useToneParse.ts
└── useToneToTimeline.ts
```

---

## Hooks overview

| Hook | Returns | When to use |
|------|---------|-------------|
| `useToneParse` | `parse`, `error`, `clearError` | Raw TOON decode; low-level parsing |
| `useToneToTimeline` | `timeline`, `parseFromToon`, `error`, `clearError` | Parse TOON → normalized MotionTimeline |

---

## TOON schema (for LLM prompt)

```
states[N]{st,f,to}:  st=listen|speak|idle, f=fromMs, to=toMs
emotions[N]{e,f,to}: e=h|s|c|n (happy|sad|calm|neutral), f=fromMs, to=toMs

Example:
states[2]{st,f,to}:listen,0,2000speak,2000,5000
emotions[2]{e,f,to}:n,0,2000h,2000,5000
```

---

## useToneParse

**What it does:** Decodes a TOON string into a raw JavaScript value. No normalization.

**Returns:** `parse(toon: string) => unknown`, `error`, `clearError`

---

## useToneToTimeline

**What it does:** Parses TOON into a normalized `MotionTimeline` with `states` and `emotions` arrays. Validates and filters invalid segments.

**Returns:** `timeline`, `parseFromToon(toon)`, `error`, `clearError`

**Example:**

```ts
const { parseFromToon, timeline } = useToneToTimeline();
const t = parseFromToon('states[1]{st,f,to}:speak,0,3000\nemotions[1]{e,f,to}:h,0,3000');
// t.states = [{ st: 'speak', f: 0, to: 3000 }]
// t.emotions = [{ e: 'h', f: 0, to: 3000 }]
```
