import { Button, Card, Col, List, Row, Space, Steps, Typography } from 'antd';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { UiModal } from '../../components/ui-modal/UiModal';
import type { Group, GroupAlbum, GroupImage } from '../../mocks/groups';
import { getAlbum, getGroup, getGroupImage } from '../../mocks/groups';
import { getRoutePath, RouteNames } from '../../router/routes';

const { Text } = Typography;

const wizardSteps = [{ title: 'Файлы' }, { title: 'Файл' }, { title: 'Комментарий' }];

type GroupFilesWizardParams = {
  groupId?: string;
  fileId?: string;
  commentId?: string;
};

type FilesStepProps = {
  group: Group | null;
  files: GroupAlbum[];
  currentStep: number;
  onOpenFile: (fileId: string) => void;
};

const FilesStep = (props: FilesStepProps) => {
  const { group, files, currentStep, onOpenFile } = props;

  if (!group) {
    return <Text type="secondary">Группа не найдена</Text>;
  }

  return (
    <Space orientation="vertical" size={20} style={{ width: '100%' }}>
      <Steps current={currentStep} items={wizardSteps} size="small" />
      <List
        dataSource={files}
        renderItem={(file) => (
          <List.Item
            actions={[
              <Button key="open" type="link" onClick={() => onOpenFile(file.id)}>
                Открыть
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<div className="album-cover" style={{ background: file.cover }} />}
              title={file.title}
              description={file.description}
            />
          </List.Item>
        )}
      />
    </Space>
  );
};

type FileStepProps = {
  file: GroupAlbum | null;
  onOpenComment: (commentId: string) => void;
  onClose: () => void;
};

const FileStep = (props: FileStepProps) => {
  const { file, onOpenComment, onClose } = props;

  if (!file) {
    return <Text type="secondary">Файл не найден</Text>;
  }

  return (
    <Space orientation="vertical" size={16} style={{ width: '100%' }}>
      <Text type="secondary">{file.description}</Text>
      <List
        dataSource={file.images}
        renderItem={(comment) => (
          <List.Item
            actions={[
              <Button key="open" type="link" onClick={() => onOpenComment(comment.id)}>
                Открыть
              </Button>,
            ]}
          >
            <List.Item.Meta
              avatar={<div className="album-cover" style={{ background: comment.cover }} />}
              title={comment.title}
              description={comment.description}
            />
          </List.Item>
        )}
      />
      <Button onClick={onClose}>Назад к файлам</Button>
    </Space>
  );
};

type CommentStepProps = {
  comment: GroupImage | null;
  onClose: () => void;
};

const CommentStep = (props: CommentStepProps) => {
  const { comment, onClose } = props;

  if (!comment) {
    return <Text type="secondary">Комментарий не найден</Text>;
  }

  return (
    <Space orientation="vertical" size={12} style={{ width: '100%' }}>
      <Row gutter={[12, 12]}>
        <Col span={24}>
          <Card cover={<div className="group-image-preview" style={{ background: comment.cover }} />} />
        </Col>
      </Row>
      <Text>{comment.description}</Text>
      <Button onClick={onClose}>Назад к файлу</Button>
    </Space>
  );
};

export const GroupFilesWizard = () => {
  const { groupId, fileId, commentId } = useParams<GroupFilesWizardParams>();
  const navigate = useNavigate();
  const group = getGroup(groupId);
  const files = group?.albums ?? [];
  const file = getAlbum(groupId, fileId);
  const comment = getGroupImage(groupId, fileId, commentId);
  const currentStep = commentId ? 2 : fileId ? 1 : 0;

  const closeWizard = () => {
    navigate('..', { relative: 'route', replace: true });
  };

  const closeFile = () => {
    if (groupId) {
      navigate(getRoutePath(RouteNames.GroupFiles, { groupId }), { replace: true });

      return;
    }

    closeWizard();
  };

  const closeComment = () => {
    if (groupId && fileId) {
      navigate(getRoutePath(RouteNames.GroupFile, { groupId, fileId }), { replace: true });

      return;
    }

    closeFile();
  };

  const openFile = (nextFileId: string) => {
    if (groupId) {
      navigate(getRoutePath(RouteNames.GroupFile, { groupId, fileId: nextFileId }));
    }
  };

  const openComment = (nextCommentId: string) => {
    if (groupId && fileId) {
      navigate(getRoutePath(RouteNames.GroupFileComment, { groupId, fileId, commentId: nextCommentId }));
    }
  };

  return (
    <>
      <UiModal onClose={closeWizard} width={760} zIndex={1000}>
        <UiModal.Header>
          <UiModal.Header.Title title={group ? `Файлы — ${group.title}` : 'Файлы'} />
        </UiModal.Header>
        <FilesStep group={group} files={files} currentStep={currentStep} onOpenFile={openFile} />
      </UiModal>

      {fileId && (
        <UiModal onClose={closeFile} width={640} mask={false} zIndex={1100}>
          <UiModal.Header>
            <UiModal.Header.Title title={file ? file.title : 'Файл'} />
          </UiModal.Header>
          <FileStep file={file} onOpenComment={openComment} onClose={closeFile} />
        </UiModal>
      )}

      {fileId && commentId && (
        <UiModal onClose={closeComment} width={520} mask={false} zIndex={1200}>
          <UiModal.Header>
            <UiModal.Header.Title title={comment ? comment.title : 'Комментарий'} />
          </UiModal.Header>
          <CommentStep comment={comment} onClose={closeComment} />
        </UiModal>
      )}
    </>
  );
};
