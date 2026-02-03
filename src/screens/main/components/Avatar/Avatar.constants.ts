export const OPENING_SIZE = 24;

// Reference size for viewBox/line coords (design units)
export const ASSISTANT_VIEW_SIZE = 150;
export const BREATH_SIZE = 158;

// Avatar takes ~65% of screen width at max scale
export const AVATAR_SCREEN_RATIO = 0.65;

/** Base size so that at BREATH_SCALE_MAX the avatar is AVATAR_SCREEN_RATIO of screen width */
export function getAvatarBaseSize(screenWidth: number): number {
  return (screenWidth * AVATAR_SCREEN_RATIO) / BREATH_SCALE_MAX;
}

// State-based breathing ranges (ratios of base size)
const LISTENING_RATIO_MIN = 142 / 150;
const LISTENING_RATIO_MAX = 150 / 150;
const SPEAKING_RATIO_MIN = 150 / 150;
const SPEAKING_RATIO_MAX = 158 / 150;
const SILENT_RATIO_MIN = 150 / 150;
const SILENT_RATIO_MAX = 154 / 150;

export function getAvatarRanges(screenWidth: number) {
  const base = getAvatarBaseSize(screenWidth);
  return {
    listening: { min: base * LISTENING_RATIO_MIN, max: base * LISTENING_RATIO_MAX },
    speaking: { min: base * SPEAKING_RATIO_MIN, max: base * SPEAKING_RATIO_MAX },
    silent: { min: base * SILENT_RATIO_MIN, max: base * SILENT_RATIO_MAX },
  };
}

// Legacy constants for transition motion (uses fixed sizes)
export const LISTENING_SIZE_MIN = 142;
export const LISTENING_SIZE_MAX = 150;
export const SPEAKING_SIZE_MIN = 150;
export const SPEAKING_SIZE_MAX = 158;
export const SILENT_SIZE_MIN = 150;
export const SILENT_SIZE_MAX = 154;

export const VIEWER_CONTENT_CIRCLE_MIN = 48;
export const VIEWER_CONTENT_CIRCLE_MAX = 56;

// Scale-based breathing (linear timing)
export const BREATH_SCALE_MIN = 1;
export const BREATH_SCALE_MAX = 1.1;
export const BREATH_PHASE_DURATION = 1500; // ~3s total (1.5s up + 1.5s down)

// Apple-aligned durations (milliseconds)
export const OPENING_DURATION = 300;
export const BREATH_DURATION = 800;
export const TRANSITION_DURATION = 250;
export const CONTENT_FADE_DURATION = 200;
export const LINE_ANIM_DURATION = 250;

// Apple-style spring presets (duration + dampingRatio)
export const APPLE_SPRING_SNAPPY = { duration: 250, dampingRatio: 1 } as const;
export const APPLE_SPRING_SUBTLE = { duration: 280, dampingRatio: 0.9 } as const;
export const APPLE_SPRING_BREATHING = {
  duration: BREATH_DURATION,
  dampingRatio: 1,
} as const;
export const LINE_OPACITY = 0.25;
export const LINE_STROKE_WIDTH = 4;

export const LINE_PAD = 0.15;

/**
 * Computes translateY so the circle center sits at content top edge (half circle above, half below).
 * Target: circle center at insets.top + circleRadius.
 * @param insetsTop - Safe area top inset
 * @param circleSize - Circle diameter
 * @param parentCenterY - Y position of the Avatar's parent center (from layout)
 */
export function getViewerContentTranslateY(
  insetsTop: number,
  circleSize: number,
  parentCenterY: number
): number {
  const targetCenterY = insetsTop + circleSize / 2;
  return targetCenterY - parentCenterY;
}

export function getLineCoords(size: number) {
  const x1 = size * LINE_PAD;
  const y1 = size * (1 - LINE_PAD);
  const x2 = size * (1 - LINE_PAD);
  const y2 = size * LINE_PAD;
  const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  return { x1, y1, x2, y2, length };
}
