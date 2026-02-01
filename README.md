# 3nan

React Native (Expo) app with Arabic/English (RTL/LTR) support, i18n, Convex, and Better Auth.

## 🚀 Setup

- **Runtime:** Node 18+
- **Package manager:** [Bun](https://bun.sh)

```bash
bun install
bun run start
```

## 📜 Scripts

| Command        | Description              |
|----------------|--------------------------|
| `bun run start` | Start Expo dev server    |
| `bun run ios`   | Run on iOS simulator     |
| `bun run android` | Run on Android emulator |

## ✨ Features

- **i18n:** Arabic and English via `react-i18next`; translations in `src/locales/`
- **RTL/LTR:** Layout direction follows app language (Arabic = RTL). Use `useIsRTL()` or `useLayoutDirection()` in components
- **Language switch:** Stored in AsyncStorage; a native Alert prompts the user to restart the app when direction changes (required on iOS)
- **Auth:** Better Auth with Convex; email/password and optional social sign-in. Session-based routing: index redirects to (main) when signed in, (auth) when not; (main) is protected, (auth) is public
- **Navigation:** Expo Router with `Stack.Protected` for private/public screens and RTL-aware slide animations; see `.cursor/rules/performance.mdc` for patterns
- **Haptics:** `useHapticFeedback()` hook and Button `hapticType` for tap feedback (e.g. selection on iOS)
- **No toasts:** Auth errors shown as inline labels; language restart uses Alert

## 💡 Recommendations

1. **RTL:** After changing to/from Arabic, close and reopen the app so native RTL applies
2. **Performance:** Prefer FlashList for long lists; use Zustand selectors; see `.cursor/rules/performance.mdc`
3. **Env:** Set `EXPO_PUBLIC_CONVEX_URL` and Convex/Better Auth env as needed; never commit secrets

## 📤 First push to GitHub

Configuration for pushing this repo to GitHub for the first time.

### 1. Create the repository on GitHub first

**You must create the repo before pushing.** Otherwise you get `Repository not found`.

- Go to [github.com/new](https://github.com/new)
- **Repository name:** `3nan` (must match the remote URL below)
- **Visibility:** Public or Private
- Do **not** add a README, .gitignore, or license (this repo already has them)
- Click **Create repository**
- Then run the push commands in step 2

### 2. Add remote and push

If `origin` is already set (you saw "remote origin already exists"), skip `git remote add` and run only `git push -u origin main` after creating the repo in step 1.

From the project root (repo: [Up-to-code/3nan](https://github.com/Up-to-code/3nan)):

**HTTPS:**

```bash
git remote add origin https://github.com/Up-to-code/3nan.git
git branch -M main
git push -u origin main
```

**SSH:**

```bash
git remote add origin git@github.com:Up-to-code/3nan.git
git branch -M main
git push -u origin main
```

### 3. If you already added a remote

To point `origin` at this repo:

```bash
git remote remove origin
git remote add origin https://github.com/Up-to-code/3nan.git
git push -u origin main
```
