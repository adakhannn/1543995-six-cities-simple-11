import browserHistory from '../../browser-history';
import {rootReducer} from '../root-reduser';
import {Middleware} from 'redux';
import {PayloadAction} from '@reduxjs/toolkit';

type Reducer = ReturnType<typeof rootReducer>;

export const redirect: Middleware<unknown, Reducer> =
  (_store) =>
    (next) =>
      (action: PayloadAction<string>) => {
        if (action.type === 'offers/redirectToRoute') {
          browserHistory.push(action.payload);
        }

        return next(action);
      };
