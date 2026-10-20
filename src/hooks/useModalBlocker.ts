import type { ModalFuncProps } from 'antd';
import { useEffect, useRef } from 'react';
import { useBlocker } from 'react-router-dom';

type ModalApi = {
  confirm: (props: ModalFuncProps) => unknown;
};

type Params = {
  isBlocked: boolean;
  modal: ModalApi;
  modalProps?: ModalFuncProps;
};

export const useModalBlocker = (params: Params) => {
  const { isBlocked, modal, modalProps = {} } = params;
  const blocker = useBlocker(isBlocked);
  const handledLocationKeyRef = useRef<string | null>(null);

  useEffect(() => {
    if (blocker.state === 'blocked') {
      if (handledLocationKeyRef.current !== blocker.location.key) {
        handledLocationKeyRef.current = blocker.location.key;

        modal.confirm({
          icon: null,
          centered: true,
          title: 'Отменить и выйти?',
          okText: 'Выйти',
          cancelText: 'Отмена',
          ...modalProps,
          onOk: () => blocker.proceed(),
          onCancel: () => blocker.reset(),
        });
      }
    } else {
      handledLocationKeyRef.current = null;
    }
  }, [blocker, modal, modalProps]);
};
