import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cities, NameSpace, sortTypes} from '../../const';
import {OffersData} from '../../types/state';
import {City, Offer} from '../../types/offer';
import {fetchNearbyOffers, fetchOffer, fetchOffers} from '../api-actions';

const initialState: OffersData = {
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isError: true,
  activeCity: cities[0],
  activeSortType: sortTypes[0],
  offers: [],
  filteredOffers: [],
  sortedOffers: [],
  nearbyOffers: [],
  activeOffer: null,
};

export const offersData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    filtering: (state, action: PayloadAction<{activeCity: City}>) => {
      const {activeCity} = action.payload;
      state.activeCity = activeCity;
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.activeCity.name);
      switch (state.activeSortType) {
        case 'Popular':
          state.sortedOffers = state.filteredOffers;
          break;
        case 'Price: low to high':
          state.sortedOffers = state.filteredOffers.sort((offer1:Offer, offer2:Offer) => offer1.price - offer2.price);
          break;
        case 'Price: high to low':
          state.sortedOffers = state.filteredOffers.sort((offer1:Offer, offer2:Offer) => offer2.price - offer1.price);
          break;
        case 'Top rated first':
          state.sortedOffers = state.filteredOffers.sort((offer1:Offer, offer2:Offer) => offer2.rating - offer1.rating);
          break;
        default:
          state.sortedOffers = state.filteredOffers;
      }
    },
    sorting: (state, action: PayloadAction<{activeSortType: string}>) => {
      const {activeSortType} = action.payload;
      state.activeSortType = activeSortType;
      switch (state.activeSortType) {
        case 'Popular':
          state.sortedOffers = state.filteredOffers;
          break;
        case 'Price: low to high':
          state.sortedOffers = state.filteredOffers.sort((offer1:Offer, offer2:Offer) => offer1.price - offer2.price);
          break;
        case 'Price: high to low':
          state.sortedOffers = state.filteredOffers.sort((offer1:Offer, offer2:Offer) => offer2.price - offer1.price);
          break;
        case 'Top rated first':
          state.sortedOffers = state.filteredOffers.sort((offer1:Offer, offer2:Offer) => offer2.rating - offer1.rating);
          break;
        default:
          state.sortedOffers = state.filteredOffers;
      }
      state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.activeCity.name);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.filteredOffers = state.offers.filter((offer) => offer.city.name === state.activeCity.name);
        state.sortedOffers = state.filteredOffers;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffers.rejected, (state, action) => {
        state.isOffersDataLoading = false;
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOffer.pending, (state) => {
        state.isOfferDataLoading = true;
      })
      .addCase(fetchOffer.fulfilled, (state, action) => {
        state.activeOffer = action.payload;
        state.isError = false;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOffer.rejected, (state, action) => {
        state.isError = true;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchNearbyOffers.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      });
  }
});

export const {filtering, sorting} = offersData.actions;
