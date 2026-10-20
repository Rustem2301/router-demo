import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { groups } from '../../mocks/groups';
import { getRoutePath, RouteNames } from '../../router/routes';

const { Paragraph, Title } = Typography;

export const GroupsPage = () => {
  const navigate = useNavigate();

  return (
    <Space orientation="vertical" size={28} style={{ width: '100%' }}>
      <div>
        <Title level={2} style={{ marginBottom: 8 }}>
          Группы
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Выберите группу, чтобы открыть её альбомы и фотографии.
        </Paragraph>
      </div>

      <Row gutter={[16, 16]}>
        {groups.map((group) => (
          <Col xs={24} md={12} xl={8} key={group.id}>
            <Card
              hoverable
              className="feed-card"
              cover={<div className="feed-cover" style={{ background: group.cover }} />}
              onClick={() => navigate(getRoutePath(RouteNames.Group, { groupId: group.id }))}
            >
              <Space orientation="vertical" size={10} style={{ width: '100%' }}>
                <Space wrap size={8}>
                  <Tag color="blue">Группа</Tag>
                  <Tag>{group.members} участников</Tag>
                </Space>
                <Title level={4} style={{ margin: 0 }}>
                  {group.title}
                </Title>
                <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                  {group.description}
                </Paragraph>
                <Button
                  type="primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    navigate(getRoutePath(RouteNames.Group, { groupId: group.id }));
                  }}
                >
                  Перейти в группу
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>
    </Space>
  );
};
