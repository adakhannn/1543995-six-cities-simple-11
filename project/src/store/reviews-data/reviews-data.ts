import {fetchReviews, sendReview} from '../api-actions';
import {createSlice} from '@reduxjs/toolkit';
import {sortReviewDate} from '../../utils';
import {NameSpace, SendReviewStatus} from '../../const';
import {ReviewsData} from '../../types/state';

const initialState: ReviewsData = {
  reviews: [],
  sendStatus: SendReviewStatus.UnSuccess,
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
      .addCase(sendReview.pending, (state) => {
        state.sendStatus = SendReviewStatus.Pending;
      })
      .addCase(sendReview.fulfilled, (state, action) => {
        state.reviews = action.payload.sort(sortReviewDate);
        state.sendStatus = SendReviewStatus.Success;
      })
      .addCase(sendReview.rejected, (state, action) => {
        state.sendStatus = SendReviewStatus.UnSuccess;
      });
  }
});
