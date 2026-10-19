import { Button, Card, List, Space, Tag, Typography } from 'antd';
import React from 'react';

import { useLongreadNavigation } from '../hooks/useLongreadNavigation';
import { LongreadTypes, longreads } from '../mocks/longreads';

const { Title, Paragraph, Text } = Typography;

export const NewsPage = () => {
  const { openLongread } = useLongreadNavigation();
  const news = longreads[LongreadTypes.News];

  return (
    <Space orientation="vertical" size={20} style={{ width: '100%' }}>
      <div>
        <Title level={2} style={{ marginBottom: 8 }}>
          Новости
        </Title>
        <Paragraph type="secondary" style={{ marginBottom: 0 }}>
          Новости тоже открываются отдельным longread-роутом. Параметр from сохраняет страницу, с которой вы
          пришли.
        </Paragraph>
      </div>

      <List
        grid={{ gutter: 16, xs: 1, md: 2 }}
        dataSource={news}
        renderItem={(item) => (
          <List.Item>
            <Card
              hoverable
              className="feed-card"
              onClick={() => openLongread({ type: item.type, id: item.id, newsType: 'simple' })}
              cover={<div className="feed-cover" style={{ background: item.cover }} />}
            >
              <Space orientation="vertical" size={10} style={{ width: '100%' }}>
                <Space wrap size={4}>
                  {item.tags.map((tag) => (
                    <Tag key={tag} color="blue">
                      {tag}
                    </Tag>
                  ))}
                </Space>
                <Title level={4} style={{ margin: 0 }}>
                  {item.title}
                </Title>
                <Paragraph type="secondary" style={{ margin: 0 }}>
                  {item.excerpt}
                </Paragraph>
                <Text type="secondary">{item.publishedAt}</Text>
                <Button
                  onClick={(event) => {
                    event.stopPropagation();
                    openLongread({ type: item.type, id: item.id, newsType: 'simple' });
                  }}
                >
                  Открыть новость
                </Button>
              </Space>
            </Card>
          </List.Item>
        )}
      />
    </Space>
  );
};
