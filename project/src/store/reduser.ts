import {createReducer} from '@reduxjs/toolkit';
import {cities} from '../const';
import {changeCity, getOffers, hoverOffer} from './action';
import {City, Offer, Offers} from '../types/offer';

type State = {
  city: City;
  offers: Offers;
  filteredOffers: Offers;
  selectedOffer: null | Offer;
};

const initialState:State = {
  city: cities[0],
  offers: [],
  filteredOffers: [],
  selectedOffer: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state, action) => {
      const {offers} = action.payload;
      state.offers = offers;
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
    });
});

export {reducer};
