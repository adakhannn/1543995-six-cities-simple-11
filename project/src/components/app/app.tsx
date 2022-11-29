import {Route, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Reviews} from '../../types/review';
import Main from '../../pages/main/main';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import {useAppSelector} from '../../hooks';
import Loading from '../loading/loading';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';
import {getAuthCheckedStatus} from '../../store/user-process/selectors';
import {getOffersDataLoadingStatus} from '../../store/offers-data/selectors';

type AppScreenProps = {
  reviews: Reviews;
}

function App(props: AppScreenProps): JSX.Element {
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);

  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <Loading />
    );
  }
  const {reviews} = props;
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
            <Property reviews={reviews}/>
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
