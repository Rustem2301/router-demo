import { Button, Space, Typography } from 'antd';
import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import { UiModal } from '../../components/ui-modal/UiModal';
import { getGroupImage } from '../../mocks/groups';

const { Paragraph, Text } = Typography;

type GroupImageModalProps = {
  onClose?: () => void;
};

export const GroupImageModal = (props: GroupImageModalProps) => {
  const { onClose } = props;
  const { groupId, albumId, imageId } = useParams<{ groupId: string; albumId: string; imageId: string }>();
  const location = useLocation();
  const image = getGroupImage(groupId, albumId, imageId);

  return (
    <>
      <UiModal.Header>
        <UiModal.Header.Title title={image ? image.title : 'Изображение'} />
      </UiModal.Header>
      <Space orientation="vertical" size={12} style={{ width: '100%' }}>
        {image && (
          <>
            <div className="group-image-preview" style={{ background: image.cover }} />
            <Paragraph type="secondary" style={{ margin: 0 }}>
              {image.description}
            </Paragraph>
            <Text code>{location.pathname}</Text>
            <Button onClick={onClose}>Назад к альбому</Button>
          </>
        )}
        {!image && <Text type="secondary">Изображение не найдено</Text>}
      </Space>
    </>
  );
};
