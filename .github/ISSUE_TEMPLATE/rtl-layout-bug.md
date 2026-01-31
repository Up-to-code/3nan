---
name: RTL layout not applied when Arabic selected on English device
about: Layout stays left-aligned (LTR) when app language is Arabic on an English (LTR) system device
title: "[Bug] RTL layout not applied when Arabic is selected on English device"
labels: bug, i18n, RTL
assignees: ''
---

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

- `I18nManager.forceRTL()` may require a **full native app restart** to take effect on iOS; JS-only reload may not apply RTL.
- UI might be reading layout direction from system or from a non-reactive source instead of from the app’s stored language (e.g. store-derived `isRTL`).
- Root or screen-level `direction` / RTL styles might not be applied or might be overridden.

## 🔗 Related

- RTL/LTR is driven by app language (storage), not system language.
- Toast already informs user to restart the app when language (and thus direction) changes; after restart, RTL may still not apply on some setups.
