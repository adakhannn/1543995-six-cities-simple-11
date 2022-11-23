import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Offers} from '../types/offer';

export const loadOffers = createAction<Offers>('data/loadOffers');
export const setError = createAction<string | null>('data/setError');
export const changeCity = createAction<{city: City}>('offers/changeCity');
export const hoverOffer = createAction<{offer: null | Offer}>('offers/hoverOffer');
export const setOffersDataLoadingStatus = createAction<boolean>('data/setOffersDataLoadingStatus');
