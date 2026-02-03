// Fonts - Cairo supports both English and Arabic
export const fonts = {
  regular: 'Cairo_400Regular',
  medium: 'Cairo_500Medium',
  semibold: 'Cairo_600SemiBold',
  bold: 'Cairo_700Bold',
} as const;

export const colors = {
  primary: '#000000',
  secondary: '#6B7280',
  background: '#FFFFFF',
  surface: '#F9FAFB',
  text: {
    primary: '#111827',
    secondary: '#6B7280',
    inverse: '#FFFFFF',
  },
  border: '#E5E7EB',
  error: '#EF4444',
  success: '#10B981',
} as const;

// Base spacing values (will be scaled by useResponsive)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
} as const;

export const borderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  full: 9999,
} as const;

// Base typography sizes (will be scaled by useResponsive)
export const typography = {
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 24,
    xxl: 32,
    display: 40,
  },
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

// Button sizes based on screen category
export const buttonSizes = {
  sm: {
    height: 40,
    paddingHorizontal: 16,
    fontSize: 14,
  },
  md: {
    height: 48,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  lg: {
    height: 56,
    paddingHorizontal: 24,
    fontSize: 18,
  },
} as const;
