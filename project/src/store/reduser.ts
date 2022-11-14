import {createReducer} from '@reduxjs/toolkit';
import {DEFAULT_CITY} from '../const';
import {offers} from '../mocks/offers';
import {changeCity} from './action';

const initialState = {
  city: DEFAULT_CITY,
  offers: offers.filter((offer) => offer.city.name === DEFAULT_CITY.name)
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
      state.offers = offers.filter((offer) => offer.city.name === city.name);
    });
});

export {reducer};
