import type { FC, PropsWithChildren } from 'react';
import React, { createContext, useContext, useMemo, useRef } from 'react';
import type { Navigator } from 'react-router-dom';
import { UNSAFE_NavigationContext as NavigationContext } from 'react-router-dom';

export type NavigationBlockerFunction = () => Promise<boolean>;

type NavigationBlockerContextValue = {
  setShouldBlock: (shouldBlock: NavigationBlockerFunction) => void;
};

const IDLE_BLOCKER: NavigationBlockerFunction = async () => false;

export const NavigationBlockerContext = createContext<NavigationBlockerContextValue>({
  setShouldBlock: () => {},
});

export const NavigationBlockerProvider: FC<PropsWithChildren> = (props) => {
  const { children } = props;
  const navigationContext = useContext(NavigationContext);
  const shouldBlockRef = useRef<NavigationBlockerFunction>(IDLE_BLOCKER);

  const contextValue = useMemo<NavigationBlockerContextValue>(
    () => ({
      setShouldBlock: (shouldBlock) => {
        shouldBlockRef.current = shouldBlock;
      },
    }),
    [],
  );

  const navigationValue = useMemo(() => {
    const modify = async (onProceed: () => void) => {
      const isBlocked = await shouldBlockRef.current();

      if (!isBlocked) {
        shouldBlockRef.current = IDLE_BLOCKER;

        return onProceed();
      }

      return undefined;
    };

    return {
      ...navigationContext,
      navigator: {
        ...navigationContext.navigator,
        push: (...args: Parameters<Navigator['push']>) =>
          modify(() => navigationContext.navigator.push(...args)),
        replace: (...args: Parameters<Navigator['replace']>) =>
          modify(() => navigationContext.navigator.replace(...args)),
        go: (...args: Parameters<Navigator['go']>) => modify(() => navigationContext.navigator.go(...args)),
      },
    };
  }, [navigationContext]);

  return (
    <NavigationBlockerContext.Provider value={contextValue}>
      <NavigationContext.Provider value={navigationValue}>{children}</NavigationContext.Provider>
    </NavigationBlockerContext.Provider>
  );
};
