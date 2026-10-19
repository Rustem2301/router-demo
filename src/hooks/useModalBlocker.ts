import type { ModalFuncProps } from 'antd';
import { useCallback } from 'react';

import { useBlocker } from '../providers/navigation-blocker';

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

  const shouldBlock = useCallback(async () => {
    if (isBlocked) {
      const isConfirmed = await new Promise<boolean>((resolve) => {
        modal.confirm({
          icon: null,
          centered: true,
          title: 'Отменить и выйти?',
          okText: 'Выйти',
          cancelText: 'Отмена',
          ...modalProps,
          onOk: () => resolve(true),
          onCancel: () => resolve(false),
        });
      });

      return !isConfirmed;
    }

    return false;
  }, [isBlocked, modal, modalProps]);

  return useBlocker(shouldBlock);
};
