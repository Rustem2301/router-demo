import React from 'react';
import type { Location } from 'react-router-dom';
import { Navigate, Route, Routes, useLocation, useMatch } from 'react-router-dom';

import { AppLayout } from './layout/AppLayout';
import { HomePage } from './pages/HomePage';
import { LongreadPage } from './pages/LongreadPage';
import { NewsPage } from './pages/NewsPage';
import { SettingsPage } from './pages/SettingsPage';
import { RouteNames, routes } from './router/routes';

type LongreadLocationState = {
  longreadLocation?: Location;
};

export const AppRoutes = () => {
  const location = useLocation();
  const { longreadLocation } = (location.state as LongreadLocationState | null) || {};
  const isLongread = useMatch(routes[RouteNames.Longread]);

  return (
    <>
      {(!isLongread || longreadLocation) && (
        <Routes location={longreadLocation || location}>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to={routes[RouteNames.Home]} replace />} />
            <Route path={routes[RouteNames.Home]} element={<HomePage />} />
            <Route path={routes[RouteNames.News]} element={<NewsPage />} />
            <Route path={routes[RouteNames.Settings]} element={<SettingsPage />} />
            <Route path="*" element={<Navigate to={routes[RouteNames.Home]} replace />} />
          </Route>
        </Routes>
      )}

      {isLongread && (
        <Routes>
          <Route path={routes[RouteNames.Longread]} element={<LongreadPage />} />
        </Routes>
      )}
    </>
  );
};
