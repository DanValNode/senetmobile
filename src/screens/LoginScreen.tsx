import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../components/ImageOverlay';
import { LogoHeader } from '../components/LogoHeader';

type LoginScreenProps = {
  onLoginPress: () => void;
  onRegisterPress: () => void;
};

export function LoginScreen({ onLoginPress, onRegisterPress }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 24 : 0}
    >
      <ImageOverlay
        style={styles.background}
        source={require('../../assets/auth/image-background.jpg')}
        resizeMode='cover'
      >
        <Layout style={styles.content} level='1'>
          <View style={styles.headerRow}>
            <Text category='h4' status='control' style={styles.title}>
              INICIAR SESIÓN
            </Text>
            <Button
              appearance='ghost'
              status='control'
              style={styles.registerButton}
              onPress={onRegisterPress}
            >
              Registrarse
            </Button>
          </View>

          <View style={styles.formContainer}>
            <LogoHeader />
            <Input
              status='control'
              label='CORREO'
              placeholder='correo@ejemplo.com'
              value={email}
              onChangeText={setEmail}
              autoCapitalize='none'
            />
            <Input
              status='control'
              style={styles.passwordInput}
              label='CONTRASEÑA'
              placeholder='Contraseña'
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              autoCapitalize='none'
            />
          </View>

          <Button status='control' size='large' onPress={onLoginPress}>
            Iniciar sesión
          </Button>
        </Layout>
      </ImageOverlay>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  content: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
  },
  title: {
    flex: 1,
  },
  registerButton: {
    paddingHorizontal: 0,
  },
  formContainer: {
    flex: 1,
    marginTop: 48,
  },
  passwordInput: {
    marginTop: 16,
  },
});
