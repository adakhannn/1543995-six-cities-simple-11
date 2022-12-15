import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {cities, NameSpace, sortTypes} from '../../const';
import {OffersData} from '../../types/state';
import {fetchNearbyOffers, fetchOffer, fetchOffers} from '../api-actions';
import {City} from '../../types/offer';

const initialState: OffersData = {
  isOffersDataLoading: false,
  isOfferDataLoading: false,
  isError: true,
  activeCity: cities[0],
  activeSortType: sortTypes[0],
  offers: [],
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
    },
    sorting: (state, action: PayloadAction<{activeSortType: string}>) => {
      const {activeSortType} = action.payload;
      state.activeSortType = activeSortType;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchOffers.pending, (state) => {
        state.isOffersDataLoading = true;
      })
      .addCase(fetchOffers.fulfilled, (state, action) => {
        state.offers = action.payload;
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
