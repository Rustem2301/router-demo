import { Layout, Menu, Typography } from 'antd';
import React from 'react';
import type { Location } from 'react-router-dom';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { RouteNames, routes } from '../router/routes';

const menuItems = [
  { key: routes[RouteNames.Home], label: 'Лента' },
  { key: routes[RouteNames.News], label: 'Новости' },
  { key: routes[RouteNames.Settings], label: 'Настройки' },
];

type LongreadLocationState = {
  longreadLocation?: Location;
};

export const AppLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { longreadLocation } = (location.state as LongreadLocationState | null) || {};
  const activePath = (longreadLocation || location).pathname;
  const selectedKey =
    menuItems.find((item) => activePath.startsWith(item.key))?.key || routes[RouteNames.Home];

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Layout.Header style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <Typography.Text
          className="app-brand"
          onClick={() => navigate(routes[RouteNames.Home])}
          style={{ cursor: 'pointer' }}
        >
          Router sandbox
        </Typography.Text>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => navigate(key)}
          style={{ flex: 1, minWidth: 0 }}
        />
      </Layout.Header>
      <Layout.Content className="app-content">
        <Outlet />
      </Layout.Content>
    </Layout>
  );
};
