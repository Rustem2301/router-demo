import { useContext, useEffect } from 'react';

import type { NavigationBlockerFunction } from './NavigationBlockerProvider';
import { NavigationBlockerContext } from './NavigationBlockerProvider';

export const useBlocker = (shouldBlock: NavigationBlockerFunction) => {
  const blockerContext = useContext(NavigationBlockerContext);

  useEffect(() => {
    blockerContext.setShouldBlock(shouldBlock);
  }, [blockerContext, shouldBlock]);
};
