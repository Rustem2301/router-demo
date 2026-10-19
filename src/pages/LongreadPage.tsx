import { Button, Divider, Empty, Skeleton, Space, Tag, Timeline, Typography } from 'antd';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import type { LongreadItem } from '../mocks/longreads';
import { getLongread, LongreadTypes } from '../mocks/longreads';

const { Title, Paragraph, Text } = Typography;

type LongreadLocationState = {
  fromPath?: string;
};

type LongreadViewProps = {
  longread: LongreadItem;
};

const typeLabels: Record<LongreadTypes, string> = {
  [LongreadTypes.Post]: 'Пост',
  [LongreadTypes.News]: 'Новость',
  [LongreadTypes.Timeline]: 'Запись',
};

const LongreadBody = (props: LongreadViewProps) => {
  const { longread } = props;

  if (longread.type === LongreadTypes.Timeline && longread.entries) {
    return (
      <Timeline
        style={{ marginTop: 24 }}
        items={longread.entries.map((entry) => ({
          color: 'blue',
          children: (
            <Space orientation="vertical" size={2}>
              <Text strong>{entry.title}</Text>
              <Text type="secondary">{entry.date}</Text>
              <Text>{entry.description}</Text>
            </Space>
          ),
        }))}
      />
    );
  }

  return (
    <div className="longread-body">
      {longread.paragraphs.map((paragraph) => (
        <Paragraph key={paragraph}>{paragraph}</Paragraph>
      ))}
    </div>
  );
};

const LongreadView = (props: LongreadViewProps) => {
  const { longread } = props;

  return (
    <article>
      <Space orientation="vertical" size={12} style={{ width: '100%' }}>
        <Space wrap size={8}>
          <Tag color="blue">{typeLabels[longread.type] || longread.type}</Tag>
          {longread.tags.map((tag) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </Space>

        <Title level={1} style={{ margin: 0 }}>
          {longread.title}
        </Title>

        <Text type="secondary">
          {longread.author.name} · {longread.author.position} · {longread.publishedAt}
        </Text>
      </Space>

      <div className="longread-cover" style={{ background: longread.cover }} />

      <Paragraph className="longread-lead">{longread.excerpt}</Paragraph>

      <LongreadBody longread={longread} />

      <Divider />

      <Space size={24} wrap>
        <Text type="secondary">Реакции: {longread.stats.reactions}</Text>
        <Text type="secondary">Комментарии: {longread.stats.comments}</Text>
        <Text type="secondary">Просмотры: {longread.stats.views}</Text>
      </Space>
    </article>
  );
};

export const LongreadPage = () => {
  const { type, id } = useParams<{ type: string; id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  const longread: LongreadItem | null = useMemo(() => getLongread(type, id), [type, id]);
  const fromQuery = useMemo(() => new URLSearchParams(location.search).get('from'), [location.search]);
  const { fromPath } = (location.state as LongreadLocationState | null) || {};

  const onClose = useCallback(() => {
    navigate(fromPath || fromQuery || '/home', { replace: true });
  }, [fromPath, fromQuery, navigate]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 400);

    return () => clearTimeout(timer);
  }, [type, id]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="longread-overlay">
      <div className="longread-container">
        <Button type="text" onClick={onClose} style={{ paddingInline: 0, marginBottom: 16 }}>
          ← Назад
        </Button>

        {isLoading && <Skeleton active avatar paragraph={{ rows: 8 }} />}

        {!isLoading && !longread && (
          <Empty description="Longread не найден">
            <Button type="primary" onClick={onClose}>
              Вернуться на главную
            </Button>
          </Empty>
        )}

        {!isLoading && longread && (
          <>
            <LongreadView longread={longread} />
            <div style={{ marginTop: 24 }}>
              <Button type="primary" onClick={onClose}>
                Закрыть longread
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
