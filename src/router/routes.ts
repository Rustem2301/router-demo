export enum RouteNames {
  Home = 'Home',
  News = 'News',
  Settings = 'Settings',
  Longread = 'Longread',
}

export type RouteConfig = Record<RouteNames, string>;

export const routes: RouteConfig = {
  [RouteNames.Home]: '/home',
  [RouteNames.News]: '/news',
  [RouteNames.Settings]: '/settings',
  [RouteNames.Longread]: '/@longread/:type/:id',
};
