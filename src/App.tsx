import { App as AntApp, ConfigProvider } from 'antd';
import ruRU from 'antd/locale/ru_RU';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './App.css';
import { AppRoutes } from './AppRoutes';
import { NavigationBlockerProvider } from './providers/navigation-blocker';

export const App = () => {
  return (
    <ConfigProvider locale={ruRU} theme={{ token: { colorPrimary: '#1677ff', borderRadius: 8 } }}>
      <AntApp>
        <BrowserRouter>
          <NavigationBlockerProvider>
            <AppRoutes />
          </NavigationBlockerProvider>
        </BrowserRouter>
      </AntApp>
    </ConfigProvider>
  );
};
