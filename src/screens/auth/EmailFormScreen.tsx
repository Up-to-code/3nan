import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { BlurView } from 'expo-blur';
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { colors, spacing } from '../../theme';
import { useResponsive, useAppTranslation, useHapticFeedback } from '../../hooks';
import { Button } from '../../components/ui';
import { useCreateAuth } from './hooks/useCreateAuth';
import { styles } from './EmailFormScreen.styles';

type ViewMode = 'sign_in' | 'sign_up';

const LOGO_HEIGHT_RATIO = 0.13;

export function EmailFormScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { wp, fontSize } = useResponsive();
  const { t } = useAppTranslation();
  const { trigger } = useHapticFeedback();
  const { isLoading, onEmailSignIn, onEmailSignUp, error, clearError } = useCreateAuth();
  const canDismiss = router.canGoBack();

  const [view, setView] = useState<ViewMode>('sign_in');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const logoHeight = Dimensions.get('window').height * LOGO_HEIGHT_RATIO;

  const handleLogIn = () => {
    onEmailSignIn({ email: email.trim(), password });
  };

  const handleCreateAccountSubmit = () => {
    onEmailSignUp({ name: name.trim(), email: email.trim(), password });
  };

  const goToSignUp = () => {
    clearError();
    setView('sign_up');
  };

  const goToSignIn = () => {
    clearError();
    setView('sign_in');
    setPassword('');
  };

  const rootStyle = [
    styles.rootContainer,
    {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  ];

  const closeButton = (
    <Pressable
      onPress={() => {
        trigger('selection');
        router.back();
      }}
      accessibilityRole="button"
      accessibilityLabel={t('auth.close')}
      hitSlop={styles.closeIconHitSlop}
    >
      <AntDesign name="close" size={18} color={colors.text.primary} />
    </Pressable>
  );

  const closeButtonWrapped =
    Platform.OS === 'ios' ? (
      <BlurView intensity={50} tint="light" style={styles.closeCircle}>
        {closeButton}
      </BlurView>
    ) : (
      <View style={[styles.closeCircle, styles.closeCircleFallback]}>{closeButton}</View>
    );

  const logoSection = (
    <View style={[styles.logoContainer, { height: logoHeight }]}>
      <Image
        source={require('../../../assets/icons/3nan-icon.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );

  const busy = isLoading.emailSignIn || isLoading.emailSignUp;

  return (
    <View style={rootStyle} accessibilityLabel={t('auth.emailFormA11y')}>
      {canDismiss &&
        (Platform.OS === 'ios' ? (
          <BlurView intensity={50} tint="light" style={styles.topBar}>
            {closeButtonWrapped}
          </BlurView>
        ) : (
          <View style={[styles.topBar, styles.topBarFallback]}>{closeButtonWrapped}</View>
        ))}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}
      >
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{ paddingHorizontal: wp(6), paddingVertical: spacing.xl }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {logoSection}

          {view === 'sign_in' && (
            <>
              <View style={styles.field}>
                <Text style={[styles.label, { fontSize: fontSize(14) }]}>{t('auth.emailLabel')}</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t('auth.emailPlaceholder')}
                  placeholderTextColor={colors.text.secondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!busy}
                />
              </View>
              <View style={styles.field}>
                <Text style={[styles.label, { fontSize: fontSize(14) }]}>
                  {t('auth.passwordLabel')}
                </Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('auth.passwordPlaceholder')}
                  placeholderTextColor={colors.text.secondary}
                  secureTextEntry
                  editable={!busy}
                />
              </View>
              {error ? (
                <Text style={[styles.errorLabel, { fontSize: fontSize(14) }]}>{error}</Text>
              ) : null}
              <View style={styles.actions}>
                <Button
                  variant="primary"
                  label={t('auth.logIn')}
                  onPress={handleLogIn}
                  disabled={busy}
                />
                <Button
                  variant="outline"
                  label={t('auth.createAccount')}
                  onPress={goToSignUp}
                  disabled={busy}
                />
              </View>
            </>
          )}

          {view === 'sign_up' && (
            <>
              <View style={styles.field}>
                <Text style={[styles.label, { fontSize: fontSize(14) }]}>{t('auth.name')}</Text>
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder={t('auth.namePlaceholder')}
                  placeholderTextColor={colors.text.secondary}
                  autoCapitalize="words"
                  autoCorrect={false}
                  editable={!busy}
                />
              </View>
              <View style={styles.field}>
                <Text style={[styles.label, { fontSize: fontSize(14) }]}>{t('auth.emailLabel')}</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  placeholder={t('auth.emailPlaceholder')}
                  placeholderTextColor={colors.text.secondary}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!busy}
                />
              </View>
              <View style={styles.field}>
                <Text style={[styles.label, { fontSize: fontSize(14) }]}>
                  {t('auth.passwordLabel')}
                </Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={t('auth.passwordPlaceholder')}
                  placeholderTextColor={colors.text.secondary}
                  secureTextEntry
                  editable={!busy}
                />
              </View>
              {error ? (
                <Text style={[styles.errorLabel, { fontSize: fontSize(14) }]}>{error}</Text>
              ) : null}
              <View style={styles.actions}>
                <Button
                  variant="primary"
                  label={t('auth.createAccount')}
                  onPress={handleCreateAccountSubmit}
                  disabled={busy}
                />
                <Pressable
                  onPress={() => {
                    trigger('selection');
                    goToSignIn();
                  }}
                >
                  <Text style={styles.linkText}>{t('auth.alreadyHaveAccount')}</Text>
                </Pressable>
              </View>
            </>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
