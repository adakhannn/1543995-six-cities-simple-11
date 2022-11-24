import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Offers} from '../types/offer';
import {AppRoute, AuthorizationStatus} from '../const';

export const loadOffers = createAction<Offers>('data/loadOffers');
export const setError = createAction<string | null>('data/setError');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
export const changeCity = createAction<{city: City}>('offers/changeCity');
export const hoverOffer = createAction<{offer: null | Offer}>('offers/hoverOffer');
export const redirectToRoute = createAction<AppRoute>('offers/redirectToRoute');
export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
