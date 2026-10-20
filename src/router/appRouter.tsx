import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import { AppRoutes } from '../AppRoutes';

export const appRouter = createBrowserRouter(
  [
    {
      path: '*',
      element: <AppRoutes />,
    },
  ],
  { basename: process.env.PUBLIC_URL || '/' },
);
