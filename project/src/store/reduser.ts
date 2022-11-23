import {createReducer} from '@reduxjs/toolkit';
import {cities} from '../const';
import {changeCity, loadOffers, hoverOffer, setError, setOffersDataLoadingStatus} from './action';
import {City, Offer, Offers} from '../types/offer';

type State = {
  city: City;
  offers: Offers;
  filteredOffers: Offers;
  selectedOffer: null | Offer;
  error: string | null;
  isOffersDataLoading: boolean;
};

const initialState:State = {
  city: cities[0],
  offers: [],
  filteredOffers: [],
  selectedOffer: null,
  error: null,
  isOffersDataLoading: false,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === cities[0].name);
    })
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === city.name);
    })
    .addCase(hoverOffer, (state, action) => {
      const {offer} = action.payload;
      state.selectedOffer = offer;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    });
});

export {reducer};
