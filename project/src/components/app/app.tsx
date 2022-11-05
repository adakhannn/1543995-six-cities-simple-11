import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import {Offers} from '../../types/offer';

type AppScreenProps = {
  placesCount: number;
  offers: Offers;
}

function App({placesCount, offers}: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Root}
          element={
            <Main
              placesCount={placesCount}
              offers={offers}
            />
          }
        />
        <Route
          path={AppRoute.Login}
          element={<Login />}
        />
        <Route
          path={AppRoute.Property}
          element={<Property />}
        />
        <Route
          path={AppRoute.Error}
          element={<Error />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
