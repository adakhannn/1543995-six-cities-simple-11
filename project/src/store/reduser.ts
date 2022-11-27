import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus, cities, sortTypes} from '../const';
import {
  changeCity,
  loadOffers,
  hoverOffer,
  setError,
  setOffersDataLoadingStatus,
  requireAuthorization,
  sorting, loadUserData
} from './action';
import {City, Offer, Offers} from '../types/offer';
import {sortingOffers} from '../utils';
import {UserData} from '../types/user-data';

type State = {
  city: City;
  activeSortType: string;
  offers: Offers;
  filteredOffers: Offers;
  sortedOffers: Offers | undefined;
  hoverOffer: null | Offer;
  error: string | null;
  isOffersDataLoading: boolean;
  authorizationStatus: string;
  userInfo: UserData | null;
};

const initialState:State = {
  city: cities[0],
  activeSortType: sortTypes[0],
  offers: [],
  filteredOffers: [],
  sortedOffers: [],
  hoverOffer: null,
  error: null,
  isOffersDataLoading: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === cities[0].name);
      state.sortedOffers = state.filteredOffers;
    })
    .addCase(loadUserData, (state, action) => {
      state.userInfo = action.payload;
    })
    .addCase(changeCity, (state, action) => {
      const {city} = action.payload;
      state.city = city;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city.name);
      state.sortedOffers = sortingOffers(state.activeSortType, state.filteredOffers);
    })
    .addCase(sorting, (state, action) => {
      const {activeSortType} = action.payload;
      state.activeSortType = activeSortType;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.city.name);
      state.sortedOffers = sortingOffers(state.activeSortType, state.filteredOffers);
    })
    .addCase(hoverOffer, (state, action) => {
      const {offer} = action.payload;
      state.hoverOffer = offer;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    })
    .addCase(setOffersDataLoadingStatus, (state, action) => {
      state.isOffersDataLoading = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    });
});

export {reducer};
