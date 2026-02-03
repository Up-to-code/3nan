/**
 * WHY: Separate styles from logic; single place for layout.
 * HOW: Exported styles used by HomeScreen and layers.
 * EDIT: Change container/layer layout here.
 * RELATED: HomeScreen, HomeMenuLayer, HomeMainContent
 */
import { StyleSheet } from 'react-native';
import { colors } from '@/theme';

// Layout
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  wrapper: {
    flex: 1,
  },
  menuLayer: {
    zIndex: 0,
    backgroundColor: colors.background,
  },
  mainLayer: {
    zIndex: 1,
    backgroundColor: colors.background,
  },
  mainArea: {
    flex: 1,
  },
  avatarContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeHint: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.03)',
    zIndex: 1,
  },
  swipeHintLeft: {
    left: 0,
  },
  swipeHintRight: {
    right: 0,
  },
});
