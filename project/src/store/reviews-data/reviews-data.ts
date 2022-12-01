import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {ReviewsData} from '../../types/state';
import {fetchReviews, sendReview} from '../api-actions';

const initialState: ReviewsData = {
  reviews: [],
};

export const reviewsData = createSlice({
  name: NameSpace.Reviews,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.reviews = action.payload;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
