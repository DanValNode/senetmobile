import { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { Button, Input, Layout, Text } from '@ui-kitten/components';
import { ImageOverlay } from '../components/ImageOverlay';

type RegisterScreenProps = {
  onSavePress: () => void;
  onBackPress: () => void;
};

export function RegisterScreen({ onSavePress, onBackPress }: RegisterScreenProps) {
  const [correo, setCorreo] = useState('');
  const [cedula, setCedula] = useState('');
  const [nombre, setNombre] = useState('');
  const [celular, setCelular] = useState('');

  const handleSavePress = () => {
    setCorreo('');
    setCedula('');
    setNombre('');
    setCelular('');
    onSavePress();
  };

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
              REGISTRO
            </Text>
            <Button appearance='ghost' status='control' onPress={onBackPress}>
              Volver
            </Button>
          </View>

          <View style={styles.formContainer}>
            <Input
              status='control'
              label='CORREO'
              placeholder='correo@ejemplo.com'
              value={correo}
              onChangeText={setCorreo}
              autoCapitalize='none'
              style={styles.input}
            />
            <Input
              status='control'
              label='CÉDULA'
              placeholder='Número de cédula'
              value={cedula}
              onChangeText={setCedula}
              keyboardType='number-pad'
              style={styles.input}
            />
            <Input
              status='control'
              label='NOMBRE'
              placeholder='Nombre completo'
              value={nombre}
              onChangeText={setNombre}
              style={styles.input}
            />
            <Input
              status='control'
              label='CELULAR'
              placeholder='Número de celular'
              value={celular}
              onChangeText={setCelular}
              keyboardType='phone-pad'
              style={styles.input}
            />
          </View>

          <Button status='control' size='large' onPress={handleSavePress}>
            Guardar
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
  formContainer: {
    flex: 1,
    marginTop: 40,
  },
  input: {
    marginBottom: 12,
  },
});
