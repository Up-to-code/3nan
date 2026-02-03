# Avatar

Animated circle component with state-based breathing, emotion bursts, and gesture support.

## How It Works

- **States**: `listening`, `speaking`, `silent` — each drives a different breathing loop (see `motions/states`).
- **Emotions**: `happy`, `sad`, `calm` — one-shot scale bursts (see `motions/emotions`).
- **Transitions**: `transitionToViewerContent` / `transitionToAssistantView` — shrink/grow + fade.
- **Gestures**: Double-tap toggles silent ↔ speaking; touch pauses breathing.

## File Map

| Folder / File | Purpose |
|---------------|---------|
| `Avatar.tsx` | Main component; composes hooks, delegates to AvatarCircleView |
| `components/` | |
| `components/AvatarCircleView.tsx` | Animated circle + line overlay |
| `config/` | |
| `config/constants.ts` | Sizes, durations, springs, layout helpers |
| `config/types.ts` | AvatarRef, AvatarProps, AvatarRole, AvatarStateType |
| `config/avatarRoles.ts` | Role → motion mapping (add role = add motion) |
| `styles/Avatar.styles.ts` | Circle and line SVG styles |
| `hooks/` | |
| `hooks/useAvatarMotions.ts` | Composes loop, transitions, state, emotion scheduler |
| `hooks/useAvatarLoopMotions.ts` | SharedValues + breathing/emotion triggers |
| `hooks/useAvatarState.ts` | listening/speaking/silent state switching |
| `hooks/useTransitionMotions.ts` | viewer ↔ assistant transitions |
| `hooks/useEmotionScheduler.ts` | Timeline-based state/emotion scheduling |
| `hooks/useAvatarGestures.ts` | Double-tap, touch gestures |
| `hooks/useAvatarLineVisibility.ts` | Line visibility sync with state |
| `hooks/useAvatarInteraction.ts` | Parent facade for ref methods |
| `motions/` | |
| `motions/breathing/` | Base breathing loop |
| `motions/emotions/` | Happy, sad, calm bursts + registry |
| `motions/states/` | Listening, speaking, silent loops |
| `motions/transitions/` | Viewer content, assistant view |

## How to Edit

- **Add a new state**: Add motion in `motions/states/`, add to `MOTIONS` in `useAvatarState.ts`, add to `config/avatarRoles.ts`.
- **Add a new emotion**: Add motion in `motions/emotions/`, add to `registry.ts`, add `playX` in `useAvatarLoopMotions.ts`.
- **Change sizes/durations**: Edit `config/constants.ts`.
- **Change gesture behavior**: Edit `hooks/useAvatarGestures.ts`; use `gestureMode` prop for none/doubleTap/full.
- **Add a new prop**: Add to `config/types.ts` (AvatarProps), use in `Avatar.tsx`.
