import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import Main from '../../pages/main/main';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';
import {Offers} from '../../types/offer';
import {Reviews} from '../../types/review';

type AppScreenProps = {
  placesCount: number;
  offers: Offers;
  reviews: Reviews;
}

function App(props: AppScreenProps): JSX.Element {
  const {placesCount, offers, reviews} = props;
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
          element={
            <Property
              reviews={reviews}
              offers={offers}
            />
          }
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
