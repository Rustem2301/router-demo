import { Button, List, Typography } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UiModal } from '../../components/ui-modal/UiModal';
import type { Group } from '../../mocks/groups';
import { getGroup } from '../../mocks/groups';
import { getRoutePath, RouteNames } from '../../router/routes';

const { Text } = Typography;

type GroupAlbumsContentProps = {
  group: Group;
  onOpenAlbum: (albumId: string) => void;
};

const GroupAlbumsContent = (props: GroupAlbumsContentProps) => {
  const { group, onOpenAlbum } = props;

  return (
    <List
      dataSource={group.albums}
      renderItem={(album) => (
        <List.Item
          actions={[
            <Button key="open" type="link" onClick={() => onOpenAlbum(album.id)}>
              Открыть
            </Button>,
          ]}
        >
          <List.Item.Meta
            avatar={<div className="album-cover" style={{ background: album.cover }} />}
            title={album.title}
            description={album.description}
          />
        </List.Item>
      )}
    />
  );
};

export const GroupAlbumsModal = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const navigate = useNavigate();
  const group = getGroup(groupId);

  const openAlbum = (albumId: string) => {
    if (groupId) {
      navigate(getRoutePath(RouteNames.GroupAlbum, { groupId, albumId }));
    }
  };

  let content = <Text type="secondary">Группа не найдена</Text>;

  if (group) {
    content = <GroupAlbumsContent group={group} onOpenAlbum={openAlbum} />;
  }

  return (
    <>
      <UiModal.Header>
        <UiModal.Header.Title title={group ? `Альбомы — ${group.title}` : 'Альбомы'} />
      </UiModal.Header>
      {content}
    </>
  );
};
