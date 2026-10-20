import { Button, Card, Col, Row, Space, Typography } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UiModal } from '../../components/ui-modal/UiModal';
import { getAlbum, getGroup } from '../../mocks/groups';
import { getRoutePath, RouteNames } from '../../router/routes';

const { Text } = Typography;

export const GroupAlbumModal = () => {
  const { groupId, albumId } = useParams<{ groupId: string; albumId: string }>();
  const navigate = useNavigate();
  const group = getGroup(groupId);
  const album = getAlbum(groupId, albumId);
  const albums = group?.albums ?? [];
  const currentAlbumIndex = albums.findIndex((item) => item.id === album?.id);
  const nextAlbum =
    albums.length > 1 && currentAlbumIndex >= 0 ? albums[(currentAlbumIndex + 1) % albums.length] : null;

  const openImage = (imageId: string) => {
    if (groupId && album) {
      navigate(getRoutePath(RouteNames.GroupImage, { groupId, albumId: album.id, imageId }));
    }
  };

  const openNews = () => {
    navigate(getRoutePath(RouteNames.News));
  };

  const openGroup = () => {
    if (groupId) {
      navigate(getRoutePath(RouteNames.Group, { groupId }));
    }
  };

  const openOtherAlbum = () => {
    if (groupId && nextAlbum) {
      navigate(getRoutePath(RouteNames.GroupAlbum, { groupId, albumId: nextAlbum.id }));
    }
  };

  return (
    <>
      <UiModal.Header>
        <UiModal.Header.Title title={album ? album.title : 'Альбом'} />
      </UiModal.Header>
      <Space orientation="vertical" size={16} style={{ width: '100%' }}>
        {album && <Text type="secondary">{album.description}</Text>}
        <Space wrap size={8}>
          <Button onClick={openNews}>Новости</Button>
          <Button onClick={openGroup}>К группе</Button>
          {nextAlbum && <Button onClick={openOtherAlbum}>Другой альбом: {nextAlbum.title}</Button>}
        </Space>
        {album && (
          <Row gutter={[12, 12]}>
            {album.images.map((image) => (
              <Col xs={12} md={8} key={image.id}>
                <Card
                  size="small"
                  cover={<div className="album-image-cover" style={{ background: image.cover }} />}
                >
                  <Space orientation="vertical" size={4} style={{ width: '100%' }}>
                    <Text strong>{image.title}</Text>
                    <Button type="link" style={{ paddingInline: 0 }} onClick={() => openImage(image.id)}>
                      Открыть фото
                    </Button>
                  </Space>
                </Card>
              </Col>
            ))}
          </Row>
        )}
        {!album && <Text type="secondary">Альбом не найден</Text>}
      </Space>
    </>
  );
};
