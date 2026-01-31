# Open GitHub issue: RTL layout not applied when Arabic selected on English device

## 🔗 Link to create the issue

**[Open new issue on GitHub →](https://github.com/Up-to-code/3nan/issues/new)**

## 📋 Copy-paste for the issue

**Title:**
```
[Bug] RTL layout not applied when Arabic is selected on English device
```

**Body:**
```markdown
## 📝 Description

When the user selects **Arabic** as the app language on a device that has **English** (or another LTR language) as the system language, the layout remains **left-to-right (LTR)** instead of switching to **right-to-left (RTL)**.

**Expected:** The entire UI (text alignment, flex direction, navigation) should flip to RTL when Arabic is selected, regardless of system language.

**Actual:** The layout stays on the left side; only the translated text changes to Arabic, but alignment and flow remain LTR.

## 📋 Steps to reproduce

1. Set device system language to English (or keep default LTR).
2. Open the app.
3. Go to the screen where language can be changed (e.g. Home / profile).
4. Select **Arabic** as the app language.
5. Observe: text is in Arabic but layout is still left-aligned (LTR).

## 📱 Environment

- Device: iOS / Android (English or LTR system)
- App: React Native (Expo)
- App language: Arabic selected
- System language: English (LTR)

## 🔍 Possible causes

- `I18nManager.forceRTL()` may require a full native app restart to take effect on iOS.
- UI might be reading layout direction from system or from a non-reactive source instead of from the app's stored language.
- Root or screen-level RTL styles might not be applied or might be overridden.
```
