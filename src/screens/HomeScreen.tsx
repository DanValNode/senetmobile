import { useMemo, useState } from 'react';
import { ListRenderItemInfo, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import {
  Avatar,
  Button,
  Card,
  Divider,
  Layout,
  List,
  ListItem,
  Text,
  TopNavigation,
  TopNavigationAction,
  useTheme,
} from '@ui-kitten/components';
import { GamesSection } from '../components/GamesSection';
import { ImageOverlay } from '../components/ImageOverlay';
import { MissionsSection } from '../components/MissionsSection';
import { HOME_SECTIONS, HomeSection } from '../types/navigation';

type HomeScreenProps = {
  selectedSection: HomeSection;
  onSectionPress: (section: HomeSection) => void;
  onLogoutPress: () => void;
};

type SectionCardItem = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
};

type ProfileInfo = {
  firstName: string;
  lastName: string;
  description: string;
  email: string;
  gender: string;
  age: string;
  weight: string;
  height: string;
};

const PROFILE_INFO: ProfileInfo = {
  firstName: 'Jennifer',
  lastName: 'Green',
  description:
    "Hi! My name is Jennifer. I'm 25 and I live in Berlin. I'm interested in computer science, music, sport and fantasy literature.",
  email: 'jen.green@gmail.com',
  gender: 'Female',
  age: '25',
  weight: '48 kg',
  height: '174 cm',
};

export function HomeScreen({ selectedSection, onSectionPress, onLogoutPress }: HomeScreenProps) {
  const theme = useTheme();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const cardsData = useMemo(() => buildSectionCards(selectedSection), [selectedSection]);

  const toggleDrawer = () => setIsDrawerOpen((open) => !open);

  const renderSectionHeader = (info: ListRenderItemInfo<SectionCardItem>) => (
    <ImageOverlay
      style={styles.sectionHeader}
      source={require('../../assets/auth/image-background.jpg')}
      resizeMode='cover'
    >
      <View style={styles.sectionHeaderDetails}>
        <Text category='h5' status='control'>
          {info.item.title}
        </Text>
        <Text category='s1' status='control'>
          {info.item.subtitle}
        </Text>
      </View>
    </ImageOverlay>
  );

  const renderSectionFooter = () => (
    <View style={styles.sectionFooter}>
      <Button appearance='ghost' status='warning' size='small'>
        Ver más
      </Button>
      <Button appearance='ghost' status='warning' size='small'>
        Actualizar
      </Button>
    </View>
  );

  const renderSection = (info: ListRenderItemInfo<SectionCardItem>) => (
    <Card
      style={styles.sectionCard}
      header={() => renderSectionHeader(info)}
      footer={renderSectionFooter}
    >
      <Layout style={styles.sectionStatusContainer} level='2'>
        <Text category='s1' status='warning'>
          Estado de la sección
        </Text>
      </Layout>
      <Text style={styles.sectionDescription} category='s1'>
        {info.item.description}
      </Text>
    </Card>
  );

  const renderProfileSetting = (hint: string, value: string) => (
    <View key={hint}>
      <Layout style={styles.profileSetting} level='1'>
        <Text appearance='hint' category='s1'>
          {hint}
        </Text>
        <Text category='s1'>{value}</Text>
      </Layout>
      <Divider />
    </View>
  );

  const renderProfileSection = () => (
    <ScrollView style={styles.profileContainer} contentContainerStyle={styles.profileContent}>
      <Layout style={styles.profilePhotoSection} level='1'>
        <View style={styles.profileAvatarContainer}>
          <Avatar
            style={styles.profileAvatar}
            source={require('../../assets/profile/image-profile.jpg')}
          />
          <Button style={styles.profilePhotoButton} size='small' status='warning'>
            📷
          </Button>
        </View>
        <View style={styles.profileNameSection}>
          <Layout style={styles.profileSetting} level='1'>
            <Text category='s1'>{PROFILE_INFO.firstName}</Text>
          </Layout>
          <Divider />
          <Layout style={styles.profileSetting} level='1'>
            <Text category='s1'>{PROFILE_INFO.lastName}</Text>
          </Layout>
          <Divider />
        </View>
      </Layout>

      <Text style={styles.profileDescription} appearance='hint'>
        {PROFILE_INFO.description}
      </Text>

      <View style={styles.profileDetailsGroup}>
        {renderProfileSetting('Email', PROFILE_INFO.email)}
        {renderProfileSetting('Gender', PROFILE_INFO.gender)}
        {renderProfileSetting('Age', PROFILE_INFO.age)}
        {renderProfileSetting('Weight', PROFILE_INFO.weight)}
        {renderProfileSetting('Height', PROFILE_INFO.height)}
      </View>

      <Button style={styles.profileDoneButton} status='warning'>
        DONE
      </Button>
    </ScrollView>
  );

  const renderMenuHeader = () => (
    <View>
      <Text style={styles.menuHeaderTitle} category='s2' appearance='hint'>
        Navega por las secciones principales de la app.
      </Text>
      <Divider style={styles.menuHeaderDivider} />
    </View>
  );

  const renderMenuItem = (info: ListRenderItemInfo<HomeSection>) => {
    const isSelected = info.item === selectedSection;
    return (
      <ListItem
        style={styles.menuItem}
        accessoryLeft={() => (
          <Text style={styles.menuIcon} status={isSelected ? 'warning' : 'basic'}>
            {getSectionIcon(info.item)}
          </Text>
        )}
        title={() => (
          <Text status={isSelected ? 'warning' : 'basic'} category='s1'>
            {capitalizeLabel(info.item)}
          </Text>
        )}
        description={isSelected ? 'Sección activa' : 'En construcción'}
        accessoryRight={() => (
          <Text appearance='hint' style={styles.menuArrow}>
            ›
          </Text>
        )}
        onPress={() => {
          onSectionPress(info.item);
          setIsDrawerOpen(false);
        }}
      />
    );
  };

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment='center'
        title='Inicio'
        accessoryLeft={() => (
          <TopNavigationAction
            onPress={toggleDrawer}
            icon={() => (
              <View style={styles.hamburgerIcon}>
                <View style={[styles.hamburgerLine, { backgroundColor: theme['color-warning-500'] }]} />
                <View style={[styles.hamburgerLine, { backgroundColor: theme['color-warning-500'] }]} />
                <View style={[styles.hamburgerLine, { backgroundColor: theme['color-warning-500'] }]} />
              </View>
            )}
          />
        )}
      />

      {selectedSection === 'juegos' ? (
        <GamesSection onCloseSessionPress={onLogoutPress} />
      ) : selectedSection === 'misiones' ? (
        <MissionsSection onCloseSessionPress={onLogoutPress} />
      ) : selectedSection === 'mi perfil' ? (
        renderProfileSection()
      ) : (
        <List
          style={styles.list}
          contentContainerStyle={styles.listContent}
          data={cardsData}
          keyExtractor={(item) => item.id}
          renderItem={renderSection}
        />
      )}

      {selectedSection !== 'juegos' && selectedSection !== 'misiones' && (
        <Layout style={styles.bottomBar} level='1'>
          <Button status='warning' appearance='ghost' onPress={onLogoutPress}>
            Cerrar sesión
          </Button>
        </Layout>
      )}

      {isDrawerOpen && <Pressable style={styles.backdrop} onPress={() => setIsDrawerOpen(false)} />}

      <Layout
        style={[
          styles.drawer,
          { borderRightColor: theme['color-warning-500'] },
          isDrawerOpen ? styles.drawerOpen : styles.drawerClosed,
        ]}
        level='1'
      >
        <List
          contentContainerStyle={styles.menuListContent}
          data={HOME_SECTIONS}
          renderItem={renderMenuItem}
          ListHeaderComponent={renderMenuHeader}
        />
      </Layout>
    </Layout>
  );
}

function capitalizeLabel(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getSectionIcon(section: HomeSection): string {
  const iconsBySection: Record<HomeSection, string> = {
    'noticias y eventos': '📰',
    misiones: '🎯',
    reservas: '📅',
    ranking: '🏆',
    juegos: '🎮',
    'mi perfil': '👤',
  };

  return iconsBySection[section];
}

function buildSectionCards(section: HomeSection): SectionCardItem[] {
  const sectionLabel = capitalizeLabel(section);

  return [
    {
      id: `${section}-1`,
      title: sectionLabel,
      subtitle: 'Destacado',
      description: `Novedades de ${sectionLabel.toLowerCase()} - en construcción.`,
    },
    {
      id: `${section}-2`,
      title: `${sectionLabel} - Actualización`,
      subtitle: 'Próximamente',
      description: `Estamos preparando mejoras para ${sectionLabel.toLowerCase()} - en construcción.`,
    },
    {
      id: `${section}-3`,
      title: `${sectionLabel} - Recomendado`,
      subtitle: 'Beta interna',
      description: `Más contenido de ${sectionLabel.toLowerCase()} estará disponible pronto - en construcción.`,
    },
  ];
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    marginTop: '16%',
    marginLeft:5
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  hamburgerIcon: {
    width: 20,
    gap: 3,
  },
  hamburgerLine: {
    width: 20,
    height: 2,
    borderRadius: 2,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 10,
  },
  drawer: {
    position: 'absolute',
    top: 20,
    bottom: 0,
    left: 0,
    zIndex: 20,
    backgroundColor: '#fff',
    paddingTop: 48,
    borderRightWidth: 2,
  },
  drawerOpen: {
    width: 280,
  },
  drawerClosed: {
    width: 0,
    overflow: 'hidden',
  },
  menuListContent: {
    padding: 8,
  },
  menuHeaderTitle: {
    paddingHorizontal: 8,
  },
  menuHeaderDivider: {
    marginVertical: 8,
  },
  menuItem: {
    marginVertical: 4,
  },
  menuIcon: {
    fontSize: 18,
    marginLeft: 4,
  },
  menuArrow: {
    fontSize: 24,
    lineHeight: 24,
    marginRight: 4,
  },
  sectionCard: {
    marginVertical: 8,
  },
  sectionHeader: {
    minHeight: 220,
    padding: 24,
  },
  sectionHeaderDetails: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionStatusContainer: {
    borderRadius: 6,
    marginHorizontal: -8,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  sectionDescription: {
    marginHorizontal: -8,
    marginTop: 16,
  },
  sectionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileContainer: {
    flex: 1,
    backgroundColor: '#eef1f7',
  },
  profileContent: {
    paddingBottom: 24,
  },
  profilePhotoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileAvatarContainer: {
    width: 76,
    height: 76,
  },
  profileAvatar: {
    width: 76,
    height: 76,
  },
  profilePhotoButton: {
    position: 'absolute',
    right: -4,
    bottom: -4,
    width: 32,
    height: 32,
    borderRadius: 16,
    paddingHorizontal: 0,
  },
  profileNameSection: {
    flex: 1,
    marginHorizontal: 8,
  },
  profileDescription: {
    padding: 24,
    backgroundColor: '#ffffff',
  },
  profileDetailsGroup: {
    marginTop: 24,
  },
  profileSetting: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  profileDoneButton: {
    marginHorizontal: 24,
    marginTop: 24,
  },
});
