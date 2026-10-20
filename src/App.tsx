import { App as AntApp, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import React from 'react';
import { RouterProvider } from 'react-router-dom';

import './App.css';
import { appRouter } from './router/appRouter';

export const App = () => (
  <ConfigProvider locale={ruRU} theme={{ token: { colorPrimary: '#1677ff', borderRadius: 8 } }}>
    <AntApp>
      <RouterProvider router={appRouter} />
    </AntApp>
  </ConfigProvider>
);
