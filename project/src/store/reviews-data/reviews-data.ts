import {fetchReviews, sendReview} from '../api-actions';
import {createSlice} from '@reduxjs/toolkit';
import {sortReviewDate} from '../../utils';
import {NameSpace} from '../../const';
import {ReviewsData} from '../../types/state';

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
        state.reviews = action.payload.sort(sortReviewDate);
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews = action.payload.sort(sortReviewDate);
      });
  }
});
