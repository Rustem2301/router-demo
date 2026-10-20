import React from 'react';
import type { ReactNode } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { UiModal } from '../components/ui-modal/UiModal';

type ModalRouteProps = {
  children: (onClose: () => void) => ReactNode;
};

export const ModalRoute = (props: ModalRouteProps) => {
  const { children } = props;
  const navigate = useNavigate();

  const close = () => {
    navigate('..', { relative: 'route', replace: true });
  };

  return (
    <>
      <UiModal onClose={close}>{children(close)}</UiModal>
      <Outlet />
    </>
  );
};
