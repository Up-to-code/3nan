import React from 'react';
import { Pressable, Text, ViewStyle, TextStyle } from 'react-native';
import { typography } from '../../../theme';
import { useResponsive, useIsRTL, useHapticFeedback, type HapticFeedbackType } from '../../../hooks';
import { styles } from './Button.styles';

export type ButtonVariant = 'primary' | 'outline';

export interface ButtonProps {
  variant?: ButtonVariant;
  label?: string;
  onPress: () => void;
  disabled?: boolean;
  hapticType?: HapticFeedbackType | 'none';
  icon?: string;
  iconColor?: string;
  children?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Button({
  variant = 'outline',
  label,
  onPress,
  disabled = false,
  hapticType = 'selection',
  icon,
  iconColor,
  children,
  style,
  textStyle,
}: ButtonProps) {
  const { fontSize } = useResponsive();
  const { isRTL } = useIsRTL();
  const { trigger } = useHapticFeedback();

  const handlePress = () => {
    if (disabled) return;
    if (hapticType !== 'none') {
      trigger(hapticType).then(() => onPress());
    } else {
      onPress();
    }
  };

  const isPrimary = variant === 'primary';
  const flexDir: 'row' | 'row-reverse' = isRTL ? 'row-reverse' : 'row';
  const writingDir: 'ltr' | 'rtl' = isRTL ? 'rtl' : 'ltr';
  const buttonStyle = [
    styles.base,
    isPrimary ? styles.primary : styles.outline,
    { flexDirection: flexDir },
    disabled && { opacity: 0.6 },
    style,
  ];
  const labelStyle = [
    styles.label,
    isPrimary ? styles.primaryLabel : styles.outlineLabel,
    { fontSize: fontSize(typography.sizes.md), writingDirection: writingDir },
    textStyle,
  ];
  const iconStyle = [
    styles.icon,
    { fontSize: fontSize(18) },
    isPrimary && styles.primaryIcon,
    iconColor != null && { color: iconColor },
  ];

  const hasIcon = icon != null && icon !== '';
  const hasLabel = label != null && label !== '';
  const hasChildren = children != null;

  const renderChildren = () => {
    if (!hasChildren) return null;
    if (typeof children === 'string' || typeof children === 'number') {
      return (
        <Text style={labelStyle} numberOfLines={1}>
          {children}
        </Text>
      );
    }
    return React.Children.map(children, (child, i) =>
      typeof child === 'string' || typeof child === 'number' ? (
        <Text key={i} style={labelStyle}>
          {child}
        </Text>
      ) : (
        child
      )
    );
  };

  return (
    <Pressable
      style={buttonStyle}
      onPress={handlePress}
      disabled={disabled}
      accessibilityState={{ disabled }}
    >
      {hasIcon ? <Text style={iconStyle}>{icon}</Text> : null}
      {renderChildren()}
      {hasLabel ? (
        <Text style={labelStyle} numberOfLines={1}>
          {label}
        </Text>
      ) : null}
    </Pressable>
  );
}
