import { Button, Card, Col, Row, Space, Tag, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useLongreadNavigation } from '../hooks/useLongreadNavigation';
import { LongreadTypes, longreads } from '../mocks/longreads';
import { getRoutePath, RouteNames } from '../router/routes';

const { Title, Paragraph, Text } = Typography;

export const HomePage = () => {
  const { openLongread } = useLongreadNavigation();
  const navigate = useNavigate();
  const posts = longreads[LongreadTypes.Post];
  const timeline = longreads[LongreadTypes.Timeline];

  return (
    <Space orientation="vertical" size={28} style={{ width: '100%' }}>
      <div>
        <Title level={2} style={{ marginBottom: 8 }}>
          Лента
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Откройте любой материал — longread появится поверх текущей страницы, а адрес изменится на отдельный
          роут.
        </Paragraph>
      </div>

      <Card>
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          <Space wrap size={8}>
            <Tag color="purple">Пример</Tag>
            <Tag>Вложенные роуты</Tag>
          </Space>
          <Title level={4} style={{ margin: 0 }}>
            Вложенные модальные роуты
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            Откройте группу, затем альбомы, альбом и фотографию. Каждый шаг меняет URL и добавляет модальное
            окно поверх предыдущего.
          </Paragraph>
          <Text code>/groups/1 → /groups/1/albums → /groups/1/albums/1 → .../image/2</Text>
          <Button type="primary" onClick={() => navigate(getRoutePath(RouteNames.Group, { groupId: 1 }))}>
            Открыть groups/1
          </Button>
        </Space>
      </Card>

      <Card>
        <Space orientation="vertical" size={12} style={{ width: '100%' }}>
          <Space wrap size={8}>
            <Tag color="green">Вариант 2</Tag>
            <Tag>Одна модалка-визард</Tag>
          </Space>
          <Title level={4} style={{ margin: 0 }}>
            Визард с вложенными модалками
          </Title>
          <Paragraph type="secondary" style={{ margin: 0 }}>
            Одна модалка открывает файл и комментарий по параметрам маршрута. Закрытие визарда возвращает на
            страницу группы.
          </Paragraph>
          <Text code>/groups/1/files → /groups/1/files/1 → /groups/1/files/1/comments/1</Text>
          <Button onClick={() => navigate(getRoutePath(RouteNames.GroupFiles, { groupId: 1 }))}>
            Открыть визард
          </Button>
        </Space>
      </Card>

      <Row gutter={[16, 16]}>
        {posts.map((post) => (
          <Col xs={24} md={12} xl={8} key={post.id}>
            <Card
              hoverable
              className="feed-card"
              onClick={() => openLongread({ type: post.type, id: post.id, postType: 'entry' })}
              cover={<div className="feed-cover" style={{ background: post.cover }} />}
            >
              <Space orientation="vertical" size={10} style={{ width: '100%' }}>
                <Space wrap size={4}>
                  {post.tags.map((tag) => (
                    <Tag key={tag}>{tag}</Tag>
                  ))}
                </Space>
                <Title level={4} style={{ margin: 0 }}>
                  {post.title}
                </Title>
                <Paragraph type="secondary" ellipsis={{ rows: 2 }} style={{ margin: 0 }}>
                  {post.excerpt}
                </Paragraph>
                <Text type="secondary">
                  {post.author.name} · {post.publishedAt}
                </Text>
                <Button
                  type="primary"
                  onClick={(event) => {
                    event.stopPropagation();
                    openLongread({ type: post.type, id: post.id, postType: 'entry' });
                  }}
                >
                  Читать longread
                </Button>
              </Space>
            </Card>
          </Col>
        ))}
      </Row>

      <div>
        <Title level={3} style={{ marginBottom: 12 }}>
          Записи
        </Title>
        <Row gutter={[16, 16]}>
          {timeline.map((record) => (
            <Col xs={24} md={12} key={record.id}>
              <Card
                hoverable
                onClick={() => openLongread({ type: record.type, id: record.id })}
                cover={<div className="feed-cover feed-cover-small" style={{ background: record.cover }} />}
              >
                <Space orientation="vertical" size={8} style={{ width: '100%' }}>
                  <Title level={4} style={{ margin: 0 }}>
                    {record.title}
                  </Title>
                  <Paragraph type="secondary" style={{ margin: 0 }}>
                    {record.excerpt}
                  </Paragraph>
                  <Text type="secondary">{record.publishedAt}</Text>
                </Space>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </Space>
  );
};
