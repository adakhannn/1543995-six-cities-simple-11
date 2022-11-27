import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Offers} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

export const loadOffers = createAction<Offers>('data/loadOffers');
export const loadUserData = createAction<UserData>('user/loadUserData');
export const setError = createAction<string | null>('data/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const changeCity = createAction<{city: City}>('offers/changeCity');
export const sorting = createAction<{activeSortType: string}>('offers/sorting');
export const hoverOffer = createAction<{offer: null | Offer}>('offers/hoverOffer');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
