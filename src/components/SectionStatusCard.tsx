import { StyleSheet } from 'react-native';
import { Card, Text } from '@ui-kitten/components';
import { HomeSection } from '../types/navigation';

type SectionStatusCardProps = {
  section: HomeSection;
};

export function SectionStatusCard({ section }: SectionStatusCardProps) {
  return (
    <Card style={styles.card}>
      <Text category='h6' status='warning' style={styles.title}>
        {section}
      </Text>
      <Text appearance='hint'>en construcción</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginVertical: 12,
  },
  title: {
    textTransform: 'capitalize',
    marginBottom: 8,
  },
});
