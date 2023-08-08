import { FC, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getCookie, setCookie } from '../../utils/cookie';
import { IProtectedRoute } from '../../utils/type/main';
import { useSelector } from '../../utils/type/store';

export const ProtectedRoute: FC<IProtectedRoute> = ({
  children,
  path,
  exact,
}) => {
  const orderInfo = useSelector(store => store.orderInfo);

  console.log(orderInfo);


  // useEffect(() => {
  //   orderInfo.error && setCookie('token', '');
  // }, []);

  console.log(getCookie('token'));

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