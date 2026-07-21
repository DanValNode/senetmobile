import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { AppScreen, HomeSection } from './src/types/navigation';

const DEFAULT_SECTION: HomeSection = 'noticias y eventos';

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('login');
  const [selectedSection, setSelectedSection] = useState<HomeSection>(DEFAULT_SECTION);

  const goToHome = () => setScreen('home');
  const goToRegister = () => setScreen('register');
  const goToLogin = () => setScreen('login');
  const handleLogout = () => {
    setSelectedSection(DEFAULT_SECTION);
    setScreen('login');
  };

  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <View style={styles.container}>
        {screen === 'login' && <LoginScreen onLoginPress={goToHome} onRegisterPress={goToRegister} />}
        {screen === 'register' && (
          <RegisterScreen onSavePress={goToLogin} onBackPress={goToLogin} />
        )}
        {screen === 'home' && (
          <HomeScreen
            selectedSection={selectedSection}
            onSectionPress={setSelectedSection}
            onLogoutPress={handleLogout}
          />
        )}
      </View>
      <StatusBar style='auto' />
    </ApplicationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
