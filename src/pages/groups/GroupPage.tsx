import { Button, Card, Empty, Space, Tag, Typography } from 'antd';
import React from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import { getGroup } from '../../mocks/groups';
import { getRoutePath, RouteNames } from '../../router/routes';

const { Paragraph, Text, Title } = Typography;

export const GroupPage = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const group = getGroup(groupId);

  if (!group) {
    return (
      <Empty description="Группа не найдена">
        <Button type="primary" onClick={() => navigate(getRoutePath(RouteNames.Home))}>
          На главную
        </Button>
      </Empty>
    );
  }

  return (
    <>
      <Space orientation="vertical" size={20} style={{ width: '100%' }}>
        <div>
          <Space wrap size={8}>
            <Tag color="blue">Группа</Tag>
            <Tag>{group.members} участников</Tag>
          </Space>
          <Title level={2} style={{ margin: '8px 0' }}>
            {group.title}
          </Title>
          <Paragraph type="secondary" style={{ marginBottom: 0 }}>
            {group.description}
          </Paragraph>
        </div>

        <Card cover={<div className="feed-cover" style={{ background: group.cover }} />}>
          <Space orientation="vertical" size={12} style={{ width: '100%' }}>
            <Title level={3} style={{ margin: 0 }}>
              Альбомы
            </Title>
            <Text type="secondary">
              В группе {group.albums.length} альбома. Откройте список, затем альбом и фотографию — каждый шаг
              меняет URL. Или откройте отдельный вариант с модалкой-визардом.
            </Text>
            <Space wrap size={8}>
              <Button
                type="primary"
                onClick={() => navigate(getRoutePath(RouteNames.GroupAlbums, { groupId: group.id }))}
              >
                Открыть альбомы
              </Button>
              <Button onClick={() => navigate(getRoutePath(RouteNames.GroupFiles, { groupId: group.id }))}>
                Открыть файлы
              </Button>
            </Space>
          </Space>
        </Card>
      </Space>
      <Outlet />
    </>
  );
};
