import { ImageSourcePropType, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Button, Card, Layout, List, Text } from '@ui-kitten/components';
import { ImageOverlay } from './ImageOverlay';

type MissionArticle = {
  id: string;
  title: string;
  description: string;
  image: ImageSourcePropType;
  comments: number;
  likes: number;
};

const MISSIONS: MissionArticle[] = [
  {
    id: '1',
    title: 'Como completar misiones diarias',
    description: '10 tips utiles',
    image: require('../../assets/missions/image-article-background-1.jpg'),
    comments: 3,
    likes: 2,
  },
  {
    id: '2',
    title: 'Por que tus misiones importan',
    description: 'Consejos para progresar',
    image: require('../../assets/missions/image-article-background-2.jpg'),
    comments: 5,
    likes: 4,
  },
  {
    id: '3',
    title: '5 reglas para misiones semanales',
    description: 'Ejercicios y recompensas',
    image: require('../../assets/missions/image-article-background-3.jpg'),
    comments: 2,
    likes: 6,
  },
];

type MissionsSectionProps = {
  onCloseSessionPress: () => void;
};

export function MissionsSection({ onCloseSessionPress }: MissionsSectionProps) {
  const renderMissionItem = (info: ListRenderItemInfo<MissionArticle>) => (
    <Card style={styles.item}>
      <ImageOverlay style={styles.itemImage} source={info.item.image}>
        <Text style={styles.itemTitle} category='h2' status='control'>
          {info.item.title}
        </Text>
        <Text style={styles.itemDescription} category='s1' status='control'>
          {info.item.description}
        </Text>
        <View style={styles.itemFooter}>
          <Button style={styles.iconButton} appearance='ghost' status='control' size='small'>
            {`💬 ${info.item.comments}`}
          </Button>
          <Button style={styles.iconButton} appearance='ghost' status='control' size='small'>
            {`❤ ${info.item.likes}`}
          </Button>
        </View>
      </ImageOverlay>
    </Card>
  );

  return (
    <Layout style={styles.container}>
      <List
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={MISSIONS}
        keyExtractor={(item) => item.id}
        renderItem={renderMissionItem}
      />
      <Layout style={styles.bottomBar} level='1'>
        <Button status='warning' appearance='ghost' onPress={onCloseSessionPress}>
          Cerrar sesion
        </Button>
      </Layout>
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef1f7',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  item: {
    marginVertical: 8,
    height: 220,
  },
  itemImage: {
    ...StyleSheet.absoluteFillObject,
    height: 220,
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  itemTitle: {
    zIndex: 1,
  },
  itemDescription: {
    zIndex: 1,
    marginVertical: 16,
  },
  itemFooter: {
    position: 'absolute',
    flexDirection: 'row',
    left: 8,
    bottom: 8,
  },
  iconButton: {
    paddingHorizontal: 0,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
