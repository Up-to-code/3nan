# 3nan

React Native (Expo) app with Arabic/English (RTL/LTR) support, i18n, and Convex.

## Setup

- **Runtime:** Node 18+
- **Package manager:** [Bun](https://bun.sh)

```bash
bun install
bun run start
```

## Scripts

| Command        | Description              |
|----------------|--------------------------|
| `bun run start` | Start Expo dev server    |
| `bun run ios`   | Run on iOS simulator     |
| `bun run android` | Run on Android emulator |

## Features

- **i18n:** Arabic and English via `react-i18next`; translations in `src/locales/`
- **RTL/LTR:** Layout direction follows app language (Arabic = RTL). Use `useIsRTL()` or `useLayoutDirection()` in components
- **Language switch:** Stored in AsyncStorage; toast prompts user to restart app when direction changes (required on iOS)
- **Navigation:** Expo Router with RTL-aware slide animations; see `.cursor/rules/performance.mdc` for patterns

## Recommendations

1. **RTL:** After changing to/from Arabic, close and reopen the app so native RTL applies
2. **Performance:** Prefer FlashList for long lists; use Zustand selectors; see `.cursor/rules/performance.mdc`
3. **Env:** Copy `.env.example` to `.env.local` if needed; never commit secrets

## Push to GitHub

If you created a new repo on GitHub:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Or with SSH:

```bash
git remote add origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

Replace `YOUR_USERNAME` and `YOUR_REPO` with your GitHub username and repository name.
