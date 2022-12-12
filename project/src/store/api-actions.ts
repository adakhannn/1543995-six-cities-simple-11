import {dropToken, saveToken} from '../services/token';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {redirectToRoute} from './action';
import {AxiosInstance} from 'axios';
import {AppDispatch, State} from '../types/state.js';
import {APIRoute, AppRoute} from '../const';
import {Offer, Offers} from '../types/offer';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {Reviews} from '../types/review';
import {ReviewData} from '../types/review-data';

export const fetchOffers = createAsyncThunk<Offers, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffers',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(APIRoute.Offers);
    return data;
  },
);

export const fetchOffer = createAsyncThunk<Offer, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchOffer',
  async (offerId: number, {dispatch, extra: api}) => {
    const {data} = await api.get<Offer>(`${APIRoute.Offers}/${offerId}`);
    return data;
  },
);

export const fetchNearbyOffers = createAsyncThunk<Offers, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'data/fetchNearbyOffers',
  async (offerId: number, {dispatch, extra: api}) => {
    const {data} = await api.get<Offers>(`${APIRoute.Offers}/${offerId}/nearby`);
    return data;
  },
);

export const fetchReviews = createAsyncThunk<Reviews, Offer['id'], {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/fetchReviews',
  async (offerId: number, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${offerId}`);
    return data;
  },
);

export const sendReview = createAsyncThunk<Reviews, ReviewData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'reviews/sendReview',
  async ({offerId, comment, rating}, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${offerId}`, {comment, rating});
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    return data;
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/login',
  async ({login: email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    saveToken(data.token);
    dispatch(redirectToRoute(AppRoute.Root));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch;
  state: State;
  extra: AxiosInstance;
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    dropToken();
  },
);
