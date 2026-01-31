import { useLanguageStore } from '../store/useLanguageStore';

export type LayoutDirection = 'rtl' | 'ltr';

/** Text alignment for current app direction */
export type TextAlignRTL = 'left' | 'right' | 'center';

interface UseLayoutDirectionReturn {
  direction: LayoutDirection;
  isRTL: boolean;
  /** Style props for Text: textAlign + writingDirection from app language */
  textStyle: { textAlign: TextAlignRTL; writingDirection: LayoutDirection };
  /** textAlign: right in RTL, left in LTR */
  textAlign: TextAlignRTL;
  /** textAlign: center (for titles/buttons) */
  textAlignCenter: TextAlignRTL;
  /** flexDirection: 'row-reverse' in RTL, 'row' in LTR */
  rowDirection: 'row' | 'row-reverse';
  /** alignItems: 'flex-end' in RTL, 'flex-start' in LTR */
  alignStart: 'flex-start' | 'flex-end';
}

export function useLayoutDirection(): UseLayoutDirectionReturn {
  const { isRTL } = useLanguageStore();
  return {
    direction: isRTL ? 'rtl' : 'ltr',
    isRTL,
    textStyle: {
      textAlign: isRTL ? 'right' : 'left',
      writingDirection: isRTL ? 'rtl' : 'ltr',
    },
    textAlign: isRTL ? 'right' : 'left',
    textAlignCenter: 'center',
    rowDirection: isRTL ? 'row-reverse' : 'row',
    alignStart: isRTL ? 'flex-end' : 'flex-start',
  };
}
