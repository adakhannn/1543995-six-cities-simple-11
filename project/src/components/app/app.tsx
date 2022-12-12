import browserHistory from '../../browser-history';
import {checkAuthAction} from '../../store/api-actions';
import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {AppRoute, AuthorizationStatus} from '../../const';
import HistoryRouter from '../history-route/history-route';
import {Route, Routes} from 'react-router-dom';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import Main from '../../pages/main/main';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';

store.dispatch(checkAuthAction());

function App(): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={authorizationStatus === AuthorizationStatus.Auth ? <Main /> : <Login />}
        />
        <Route
          path={AppRoute.Property}
          element={
            <Property />
          }
        />
        <Route
          path={AppRoute.Error}
          element={<Error />}
        />
      </Routes>
    </HistoryRouter>
  );
}

export default App;
