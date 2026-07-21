import { Image, StyleSheet, View } from 'react-native';

type LogoHeaderProps = {
  width?: number;
  height?: number;
};

export function LogoHeader({ width = 300, height = 190 }: LogoHeaderProps) {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/Logo Recto negro.png')}
        style={{ width, height }}
        resizeMode='contain'
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 110,
    marginTop:90
  },
});
