/**
 * WHY: Avoid long SharedValue<number> imports across screens.
 * HOW: Type alias re-exported for Avatar content opacity.
 * EDIT: Add more Reanimated aliases here if needed.
 * RELATED: useViewerContent, Avatar, ViewerContentLayout
 */
import type { SharedValue } from 'react-native-reanimated';

export type OpacitySharedValue = SharedValue<number>;
