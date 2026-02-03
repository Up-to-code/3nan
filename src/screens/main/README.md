# HomeScreen

## Overview

HomeScreen = menu layer (background) + main content (slides over menu) + gesture strips. User swipes from edge to open menu, swipes on content to close.

## Data Flow

- **isViewerContent** → When true, triggers avatar transition to viewer mode
- **avatarParentCenterY** → Used for viewer content overlay positioning
- **contentOpacity** → SharedValue from Avatar, drives ViewerContentLayout overlay opacity
- **useMenuSwipe** → Provides pan gestures, animated style, open/close state

## File Map

| File | Why | Related | Edit when |
|------|-----|---------|-----------|
| HomeScreen.tsx | Compose layers | All layers, hooks | Add/remove layers |
| HomeScreen.styles | Layout styles | Layers | Change layout |
| useHomeScreen | Wire hooks | useAvatarLayout, useViewerContent | Add sub-hooks |
| useAvatarLayout | Avatar center Y | useViewerContent | Change layout calc |
| useViewerContent | Viewer state + transition | Avatar, useAvatarLayout | Change transition |
| HomeMenuLayer | Menu + hint | MenuScreen | Change menu UI |
| HomeMainContent | Avatar + overlay | Avatar, ViewerContentLayout | Change content |
| HomeGestureStrips | Gesture strips | useMenuSwipe | Change gestures |

## How to Edit

- **Menu** → HomeMenuLayer, MenuScreen
- **Gestures** → HomeGestureStrips, useMenuSwipe
- **Avatar/content** → HomeMainContent, useViewerContent, Avatar, ViewerContentLayout
