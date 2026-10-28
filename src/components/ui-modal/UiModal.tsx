import { Button, Modal, Space, Typography } from 'antd';
import type { ModalProps } from 'antd';
import React, { createContext, useContext } from 'react';
import type { PropsWithChildren, ReactNode } from 'react';

type UiModalContextValue = {
  onClose: () => void;
};

const UiModalContext = createContext<UiModalContextValue | null>(null);

const useUiModal = (): UiModalContextValue => {
  const context = useContext(UiModalContext);

  if (!context) {
    throw new Error('UiModal не найден');
  }

  return context;
};

type UiModalProps = Omit<ModalProps, 'open' | 'closable' | 'footer' | 'onCancel'> & {
  onClose: () => void;
};

const UiModalBase = (props: UiModalProps) => {
  const { onClose, children, ...modalProps } = props;

  return (
    <UiModalContext.Provider value={{ onClose }}>
      <Modal {...modalProps} open closable={false} footer={null} onCancel={onClose}>
        {children}
      </Modal>
    </UiModalContext.Provider>
  );
};

const UiModalHeader = (props: PropsWithChildren) => {
  const { children } = props;

  return <div>{children}</div>;
};

type UiModalHeaderTitleProps = {
  title: ReactNode;
};

const UiModalHeaderTitle = (props: UiModalHeaderTitleProps) => {
  const { title } = props;
  const { onClose } = useUiModal();

  return (
    <Space align="center" style={{ justifyContent: 'space-between', width: '100%' }}>
      <Typography.Title level={4} style={{ margin: 0 }}>
        {title}
      </Typography.Title>
      <Button type="text" onClick={onClose} aria-label="Закрыть">
        ×
      </Button>
    </Space>
  );
};

const UiModalHeaderComponent = Object.assign(UiModalHeader, { Title: UiModalHeaderTitle });

type UiModalComponent = typeof UiModalBase & {
  Header: typeof UiModalHeaderComponent;
};

export const UiModal = UiModalBase as UiModalComponent;

UiModal.Header = UiModalHeaderComponent;
