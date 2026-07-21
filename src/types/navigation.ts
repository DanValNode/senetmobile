export type AppScreen = 'login' | 'register' | 'home';

export type HomeSection =
  | 'noticias y eventos'
  | 'misiones'
  | 'reservas'
  | 'ranking'
  | 'juegos'
  | 'mi perfil';

export const HOME_SECTIONS: HomeSection[] = [
  'noticias y eventos',
  'misiones',
  'reservas',
  'ranking',
  'juegos',
  'mi perfil',
];
