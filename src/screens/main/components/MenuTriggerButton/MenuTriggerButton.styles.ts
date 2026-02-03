import { StyleSheet } from 'react-native';
import { borderRadius } from '@/theme';

const PADDING = 4;

export const HIT_SLOP = { top: 8, bottom: 8, left: 8, right: 8 };

export const styles = StyleSheet.create({
  trigger: {
    padding: PADDING,
    minWidth: 22 + PADDING * 2,
    minHeight: 22 + PADDING * 2,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  triggerFallback: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  pressable: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 22 + PADDING * 2,
    height: 22 + PADDING * 2,
  },
});
