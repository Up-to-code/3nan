import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from '@/components/ui';
import { spacing } from '@/theme';
import type { AvatarStateType } from './hooks/useAvatarState';

export interface AvatarAnimationTestPanelProps {
  onTransitionToViewerContent: () => void;
  onTransitionToAssistantView: () => void;
  onPlayHappy: () => void;
  onPlaySad: () => void;
  onPlayCalm: () => void;
  onPlayNeutral?: () => void;
  onSetState?: (state: AvatarStateType) => void;
  onScheduleDemo?: () => void;
}

export function AvatarAnimationTestPanel({
  onTransitionToViewerContent,
  onTransitionToAssistantView,
  onPlayHappy,
  onPlaySad,
  onPlayCalm,
  onPlayNeutral,
  onSetState,
  onScheduleDemo,
}: AvatarAnimationTestPanelProps) {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Button
          variant="outline"
          label="Viewer Content"
          onPress={onTransitionToViewerContent}
          style={styles.button}
        />
        <Button
          variant="outline"
          label="Assistant View"
          onPress={onTransitionToAssistantView}
          style={styles.button}
        />
      </View>
      <View style={styles.row}>
        <Button variant="outline" label="Happy" onPress={onPlayHappy} style={styles.button} />
        <Button variant="outline" label="Sad" onPress={onPlaySad} style={styles.button} />
        <Button variant="outline" label="Calm" onPress={onPlayCalm} style={styles.button} />
        {onPlayNeutral && (
          <Button variant="outline" label="Neutral" onPress={onPlayNeutral} style={styles.button} />
        )}
      </View>
      {onSetState && (
        <View style={styles.row}>
          <Button
            variant="outline"
            label="Listening"
            onPress={() => onSetState('listening')}
            style={styles.button}
          />
          <Button
            variant="outline"
            label="Speaking"
            onPress={() => onSetState('speaking')}
            style={styles.button}
          />
          <Button
            variant="outline"
            label="Silent"
            onPress={() => onSetState('silent')}
            style={styles.button}
          />
        </View>
      )}
      {onScheduleDemo && (
        <View style={styles.row}>
          <Button
            variant="outline"
            label="Demo TOON"
            onPress={onScheduleDemo}
            style={styles.demoButton}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    gap: spacing.md,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    justifyContent: 'center',
  },
  button: {
    minWidth: 80,
  },
  demoButton: {
    minWidth: 120,
  } as const,
});
