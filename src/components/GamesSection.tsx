import { useMemo, useState } from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageSourcePropType,
  ListRenderItemInfo,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import {
  Button,
  Card,
  Input,
  Layout,
  List,
  Radio,
  RadioGroup,
  Text,
} from '@ui-kitten/components';

type Game = {
  id: string;
  title: string;
  category: string;
  image: ImageSourcePropType;
  price: number;
  subtitle: string;
  description: string;
  size: string;
  colors: { name: string; value: string }[];
  comments: { author: string; text: string; date: string }[];
};

const GAMES: Game[] = [
  {
    id: '1',
    title: 'Pink Chair',
    category: 'Aventura',
    image: require('../../assets/games/image-product-1.png'),
    price: 130,
    subtitle: 'Edicion Especial',
    description:
      'Juego de aventura en mundo abierto con desafios cooperativos y eventos semanales.',
    size: '25 GB',
    colors: [
      { name: 'blue', value: '#3366FF' },
      { name: 'pink', value: '#FF708D' },
      { name: 'orange', value: '#FFC94D' },
    ],
    comments: [
      { author: 'Hubert Franck', text: 'Gran jugabilidad y buenos graficos.', date: 'Hoy 11:10 am' },
      { author: 'Mark Volter', text: 'Muy recomendado para jugar en equipo.', date: 'Hoy 11:45 am' },
    ],
  },
  {
    id: '2',
    title: 'White Chair',
    category: 'Estrategia',
    image: require('../../assets/games/image-product-2.jpg'),
    price: 150,
    subtitle: 'Modo Competitivo',
    description:
      'Juego tactico por turnos con ranking global y temporadas con recompensas.',
    size: '18 GB',
    colors: [
      { name: 'blue', value: '#3366FF' },
      { name: 'pink', value: '#FF708D' },
      { name: 'orange', value: '#FFC94D' },
    ],
    comments: [
      { author: 'Jennifer Green', text: 'Sistema de progreso muy completo.', date: 'Ayer 4:20 pm' },
    ],
  },
  {
    id: '3',
    title: 'Black Lamp',
    category: 'Accion',
    image: require('../../assets/games/image-product-3.jpg'),
    price: 80,
    subtitle: 'Misiones Diarias',
    description:
      'Juego de accion con partidas rapidas, eventos de clan y desafios por tiempo limitado.',
    size: '12 GB',
    colors: [
      { name: 'blue', value: '#3366FF' },
      { name: 'pink', value: '#FF708D' },
      { name: 'orange', value: '#FFC94D' },
    ],
    comments: [
      { author: 'Hubert Franck', text: 'Perfecto para sesiones cortas.', date: 'Hoy 8:00 am' },
    ],
  },
];

type GamesSectionProps = {
  onCloseSessionPress: () => void;
};

export function GamesSection({ onCloseSessionPress }: GamesSectionProps) {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedColorIndex, setSelectedColorIndex] = useState<number>(0);
  const [comment, setComment] = useState('');
  const [bookmarked, setBookmarked] = useState(false);

  const selectedGame = useMemo(
    () => GAMES.find((game) => game.id === selectedGameId) ?? null,
    [selectedGameId],
  );

  const onGamePress = (gameId: string) => {
    setSelectedGameId(gameId);
    setSelectedColorIndex(0);
    setComment('');
  };

  const onBackToList = () => setSelectedGameId(null);

  const renderGameFooter = (info: ListRenderItemInfo<Game>) => (
    <View style={styles.gameItemFooter}>
      <Text category='s1'>${info.item.price}</Text>
      <Button
        status='warning'
        size='small'
        appearance='outline'
        onPress={() => onGamePress(info.item.id)}
      >
        Ver
      </Button>
    </View>
  );

  const renderGameHeader = (info: ListRenderItemInfo<Game>) => (
    <ImageBackground style={styles.gameItemHeader} source={info.item.image} />
  );

  const renderGameItem = (info: ListRenderItemInfo<Game>) => (
    <Card
      style={styles.gameItem}
      header={() => renderGameHeader(info)}
      footer={() => renderGameFooter(info)}
      onPress={() => onGamePress(info.item.id)}
    >
      <Text category='s1'>{info.item.title}</Text>
      <Text appearance='hint' category='c1'>
        {info.item.category}
      </Text>
    </Card>
  );

  if (!selectedGame) {
    return (
      <Layout style={styles.container}>
        <Text category='h6' style={styles.sectionTitle}>
          Lista de juegos
        </Text>
        <List
          contentContainerStyle={styles.gameList}
          data={GAMES}
          numColumns={2}
          keyExtractor={(item) => item.id}
          renderItem={renderGameItem}
        />
        <Layout style={styles.bottomBar} level='1'>
          <Button status='warning' appearance='ghost' onPress={onCloseSessionPress}>
            Cerrar sesion
          </Button>
        </Layout>
      </Layout>
    );
  }

  return (
    <Layout style={styles.container}>
      <Layout style={styles.detailsTopBar} level='1'>
        <Button appearance='ghost' status='warning' onPress={onBackToList}>
          Volver a juegos
        </Button>
        <Button appearance='ghost' status='warning' onPress={() => setBookmarked((value) => !value)}>
          {bookmarked ? 'Guardado' : 'Guardar'}
        </Button>
      </Layout>
      <ScrollView style={styles.detailsContainer} contentContainerStyle={styles.detailsContent}>
        <ImageBackground
          style={styles.detailsImage}
          source={require('../../assets/games/image-product.png')}
        />
        <Layout style={styles.detailsBody} level='1'>
          <Text category='h6'>{selectedGame.title}</Text>
          <Text style={styles.detailsSubtitle} appearance='hint' category='p2'>
            {selectedGame.subtitle}
          </Text>
          <Text style={styles.detailsPrice} category='h4'>
            ${selectedGame.price}
          </Text>
          <Text style={styles.detailsDescription} appearance='hint'>
            {selectedGame.description}
          </Text>
          <Text style={styles.detailsLabel} category='h6'>
            Tamano:
          </Text>
          <Text style={styles.detailsSize} appearance='hint'>
            {selectedGame.size}
          </Text>
          <Text style={styles.detailsLabel} category='h6'>
            Color:
          </Text>
          <RadioGroup
            style={styles.colorGroup}
            selectedIndex={selectedColorIndex}
            onChange={setSelectedColorIndex}
          >
            {selectedGame.colors.map((color) => (
              <Radio key={color.name} style={styles.colorRadio}>
                {(evaProps) => (
                  <Text {...evaProps} style={[styles.colorText, { color: color.value }]}>
                    {color.name.toUpperCase()}
                  </Text>
                )}
              </Radio>
            ))}
          </RadioGroup>
          <View style={styles.actionContainer}>
            <Button style={styles.actionButton} size='giant' status='warning'>
              Comprar
            </Button>
            <Button style={styles.actionButton} size='giant' status='warning' appearance='outline'>
              Agregar
            </Button>
          </View>
        </Layout>
        <Input
          style={styles.commentInput}
          status='warning'
          label='Comentarios'
          placeholder='Escribe tu comentario'
          value={comment}
          onChangeText={setComment}
        />
        <Layout style={styles.commentsContainer} level='1'>
          {selectedGame.comments.map((item) => (
            <View key={`${item.author}-${item.date}`} style={styles.commentItem}>
              <Text category='s2'>{item.author}</Text>
              <Text appearance='hint' category='c1'>
                {item.date}
              </Text>
              <Text category='s1'>{item.text}</Text>
            </View>
          ))}
        </Layout>
      </ScrollView>
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
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 12,
  },
  gameList: {
    paddingHorizontal: 8,
    paddingVertical: 16,
  },
  gameItem: {
    flex: 1,
    margin: 8,
    maxWidth: Dimensions.get('window').width / 2 - 24,
  },
  gameItemHeader: {
    height: 140,
  },
  gameItemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  detailsTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  detailsContainer: {
    flex: 1,
    backgroundColor: '#eef1f7',
  },
  detailsContent: {
    paddingBottom: 16,
  },
  detailsImage: {
    width: '100%',
    height: 340,
  },
  detailsBody: {
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  detailsSubtitle: {
    marginTop: 4,
  },
  detailsPrice: {
    position: 'absolute',
    top: 24,
    right: 16,
  },
  detailsDescription: {
    marginVertical: 16,
  },
  detailsLabel: {
    marginVertical: 8,
  },
  detailsSize: {
    marginBottom: 16,
  },
  colorGroup: {
    flexDirection: 'row',
    marginHorizontal: -8,
  },
  colorRadio: {
    marginHorizontal: 8,
  },
  colorText: {
    marginLeft: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    marginHorizontal: -8,
    marginTop: 24,
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 8,
  },
  commentInput: {
    marginHorizontal: 16,
    marginBottom: 24,
  },
  commentsContainer: {
    marginHorizontal: 16,
    borderRadius: 8,
    padding: 12,
  },
  commentItem: {
    marginBottom: 12,
    gap: 2,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
});
