import { Spin } from 'antd';
import React, { Suspense } from 'react';
import type { Location } from 'react-router-dom';
import { Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom';

import { AppLayout } from './layout/AppLayout';
import { ModalRoute } from './router/ModalRoute';
import type { LazyRoute } from './router/routes';
import { getRoutePath, longreadRoutes, privateRoutes, RouteNames, routes } from './router/routes';

type LongreadLocationState = {
  longreadLocation?: Location;
};

const renderRouteComponent = (LazyComponent: LazyRoute['component'], modal?: boolean) => {
  if (modal) {
    return <ModalRoute>{(onClose) => <LazyComponent onClose={onClose} />}</ModalRoute>;
  }

  return <LazyComponent />;
};

const renderRoute = ({ path, component, modal, children }: LazyRoute) => (
  <Route
    key={path}
    path={path}
    element={<Suspense fallback={<Spin fullscreen />}>{renderRouteComponent(component, modal)}</Suspense>}
  >
    {children?.map(renderRoute)}
  </Route>
);

export const AppRoutes = () => {
  const location = useLocation();
  const { longreadLocation } = (location.state as LongreadLocationState | null) || {};
  const isLongread = useMatch(routes[RouteNames.Longread]);

  return (
    <>
      {(!isLongread || longreadLocation) && (
        <Routes location={longreadLocation || location}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to={getRoutePath(RouteNames.Home)} replace />} />
            {privateRoutes.map(renderRoute)}
            <Route path="*" element={<Navigate to={getRoutePath(RouteNames.Home)} replace />} />
          </Route>
        </Routes>
      )}

      {isLongread && <Routes>{longreadRoutes.map(renderRoute)}</Routes>}
    </>
  );
};
