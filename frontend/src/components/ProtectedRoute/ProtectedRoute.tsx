import React, { FC } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie } from '../../utils/cookie';
import { IProtectedRoute } from '../../utils/type/main';

export const ProtectedRoute: FC<IProtectedRoute> = ({
  children,
  path,
  exact,
}) => {
  return (
    <Route
      path={`${path}`}
      exact
      render={({ location }) =>
      getCookie('token') ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/table',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
};