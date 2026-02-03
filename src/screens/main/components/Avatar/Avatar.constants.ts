export const OPENING_SIZE = 24;
export const ASSISTANT_VIEW_SIZE = 150;
export const BREATH_SIZE = 158; // Apple-style: subtle delta (was 170)

// State-based breathing ranges (listening, speaking, silent)
export const LISTENING_SIZE_MIN = 142; // ASSISTANT_VIEW_SIZE - 8
export const LISTENING_SIZE_MAX = 150; // ASSISTANT_VIEW_SIZE
export const SPEAKING_SIZE_MIN = 150; // ASSISTANT_VIEW_SIZE
export const SPEAKING_SIZE_MAX = 158; // BREATH_SIZE
export const SILENT_SIZE_MIN = 150;
export const SILENT_SIZE_MAX = 154;

export const VIEWER_CONTENT_CIRCLE_MIN = 48;
export const VIEWER_CONTENT_CIRCLE_MAX = 56;

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
