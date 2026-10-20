import { stringify } from 'query-string';
import { useCallback } from 'react';
import type { NavigateOptions, To } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

import type { LongreadParams } from '../mocks/longreads';
import { getRoutePath, RouteNames } from '../router/routes';

const getLinkParams = (params: LongreadParams, from: string): To => {
  const { type, id, ...restParams } = params;

  return {
    pathname: getRoutePath(RouteNames.Longread, { id: String(id), type }),
    search: stringify({ ...restParams, from }),
  };
};

export const useLongreadNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const openLongread = useCallback(
    (params: LongreadParams, state?: Record<string, unknown>) => {
      const to = getLinkParams(params, location.pathname);
      const options: NavigateOptions = {
        state: { ...state, longreadLocation: location },
      };

      navigate(to, options);
    },
    [location, navigate],
  );

  return { openLongread };
};

export const useLongreadLink = (params: LongreadParams, defaultState?: Record<string, unknown>) => {
  const location = useLocation();

  return {
    to: getLinkParams(params, location.pathname),
    state: { ...defaultState, longreadLocation: location },
  };
};
