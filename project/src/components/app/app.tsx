import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute} from '../../const';
import {Reviews} from '../../types/review';
import Main from '../../pages/main/main';
import Property from '../../pages/property/property';
import Login from '../../pages/login/login';
import Error from '../../pages/error/error';

type AppScreenProps = {
  reviews: Reviews;
}

function App(props: AppScreenProps): JSX.Element {
  const {reviews} = props;
  return (
    <BrowserRouter>
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
    </BrowserRouter>
  );
}

export default App;
