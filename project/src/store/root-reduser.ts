import {userProcess} from './user-process/user-process';
import {offersData} from './offers-data/offers-data';
import {offersProcess} from './offers-process/offers-process';
import {reviewsData} from './reviews-data/reviews-data';
import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';

export const rootReducer = combineReducers({
  [NameSpace.Data]: offersData.reducer,
  [NameSpace.User]: userProcess.reducer,
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Reviews]: reviewsData.reducer,
});
