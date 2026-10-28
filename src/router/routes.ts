import type { ComponentType, LazyExoticComponent } from 'react';
import { lazy } from 'react';

export enum RouteNames {
  Home = 'Home',
  News = 'News',
  Settings = 'Settings',
  Longread = 'Longread',
  Groups = 'Groups',
  Group = 'Group',
  GroupAlbums = 'GroupAlbums',
  GroupAlbum = 'GroupAlbum',
  GroupImage = 'GroupImage',
  GroupFiles = 'GroupFiles',
}

export type RouteConfig = Record<RouteNames, string>;
export type RouteParams = Record<string, string | number>;

export const routes: RouteConfig = {
  [RouteNames.Home]: '/home',
  [RouteNames.News]: '/news',
  [RouteNames.Settings]: '/settings',
  [RouteNames.Longread]: '/@longread/:type/:id',
  [RouteNames.Groups]: '/groups',
  [RouteNames.Group]: '/groups/:groupId',
  [RouteNames.GroupAlbums]: '/groups/:groupId/albums',
  [RouteNames.GroupAlbum]: '/groups/:groupId/albums/:albumId',
  [RouteNames.GroupImage]: '/groups/:groupId/albums/:albumId/image/:imageId',
  [RouteNames.GroupFiles]: '/groups/:groupId/files/:fileId?/:service?/:serviceId?',
};

const isRouteName = (route: string | RouteNames): route is RouteNames => route in RouteNames;

export const replaceParams = (route: string | RouteNames, params: RouteParams) => {
  let result = isRouteName(route) ? routes[route] : route;

  Object.keys(params).forEach((param) => {
    result = result.replace(new RegExp(`:${param}[?]{0,1}`), encodeURIComponent(params[param]));
  });

  return result;
};

export const getRoutePath = <P extends RouteParams = RouteParams>(routeName: RouteNames, params?: P) => {
  let path = routes[routeName];

  if (params) {
    path = replaceParams(path, params);
  }

  path = path.replace(/\/:\w+\??/g, '');

  return path;
};

export type LazyRoute = {
  path: string;
  component: LazyExoticComponent<ComponentType<{ onClose?: () => void }>>;
  modal?: boolean;
  children?: LazyRoute[];
};

export const privateRoutes: LazyRoute[] = [
  {
    path: routes[RouteNames.Home],
    component: lazy(() => import('../pages/modules/PageHome')),
  },
  {
    path: routes[RouteNames.Groups],
    component: lazy(() => import('../pages/modules/PageGroups')),
  },
  {
    path: routes[RouteNames.News],
    component: lazy(() => import('../pages/modules/PageNews')),
  },
  {
    path: routes[RouteNames.Settings],
    component: lazy(() => import('../pages/modules/PageSettings')),
  },
  {
    path: routes[RouteNames.Group],
    component: lazy(() => import('../pages/modules/PageGroup')),
    children: [
      {
        path: routes[RouteNames.GroupAlbums],
        component: lazy(() => import('../pages/modules/PageGroupAlbums')),
        modal: true,
        children: [
          {
            path: routes[RouteNames.GroupAlbum],
            component: lazy(() => import('../pages/modules/PageGroupAlbum')),
            modal: true,
            children: [
              {
                path: routes[RouteNames.GroupImage],
                component: lazy(() => import('../pages/modules/PageGroupImage')),
                modal: true,
              },
            ],
          },
        ],
      },
      {
        path: routes[RouteNames.GroupFiles],
        component: lazy(() => import('../pages/modules/PageGroupFilesWizard')),
      },
    ],
  },
];

export const longreadRoutes: LazyRoute[] = [
  {
    path: routes[RouteNames.Longread],
    component: lazy(() => import('../pages/modules/PageLongread')),
  },
];
