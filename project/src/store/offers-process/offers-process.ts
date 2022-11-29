import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersProcess} from '../../types/state';
import {Offer} from '../../types/offer';

const initialState: OffersProcess = {
  hoveredOffer: null,
};

export const offersProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    hoveringOffer: (state, action: PayloadAction<{hoveredOffer: Offer | null}>) => {
      const {hoveredOffer} = action.payload;
      state.hoveredOffer = hoveredOffer;
    },
  },
});

export const {hoveringOffer} = offersProcess.actions;
