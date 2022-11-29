import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import {reviews} from './mocks/reviews';
import {store} from './store';
import App from './components/app/app';
import {checkAuthAction, fetchOffers} from './store/api-actions';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

store.dispatch(fetchOffers());
store.dispatch(checkAuthAction());

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer />
      <App
        reviews = {reviews}
      />
    </Provider>
  </React.StrictMode>,
);
