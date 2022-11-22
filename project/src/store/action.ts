import {createAction} from '@reduxjs/toolkit';
import {City, Offer, Offers} from '../types/offer';

export const getOffers = createAction<{offers: Offers}>('offers/getOffers');
export const changeCity = createAction<{city: City}>('offers/changeCity');
export const hoverOffer = createAction<{offer: null | Offer}>('offers/hoverOffer');
