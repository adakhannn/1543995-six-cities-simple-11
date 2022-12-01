import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {Route, Routes} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {AppRoute} from '../../const';
import {store} from '../../store';
import {checkAuthAction, fetchOffers} from '../../store/api-actions';
import {getAuthCheckedStatus} from '../../store/user-process/selectors';
import {getOffersDataLoadingStatus} from '../../store/offers-data/selectors';
import Main from '../../pages/main/main';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import Loading from '../loading/loading';

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction());

function App(): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <Loading />
    );
  }
  return (
    <HistoryRouter history={browserHistory}>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={<Main />}
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
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
