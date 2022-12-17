import {makeFakeReviewsIncoming} from '../../utils/mocks';
import {ReviewsData} from '../../types/state';
import {SendReviewStatus} from '../../const';
import {fetchReviews, sendReview} from '../api-actions';
import {reviewsData} from './reviews-data';

const reviews = makeFakeReviewsIncoming();

describe('Reducer: offersData', () => {
  let initialState: ReviewsData;

  beforeEach(() => {
    initialState = {
      reviews: [],
      sendStatus: SendReviewStatus.UnSuccess,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(reviewsData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should set loaded reviews', () => {
    expect(
      reviewsData.reducer(initialState, {
        type: fetchReviews.fulfilled.type,
        payload: reviews,
      })
    ).toEqual({
      ...initialState,
      reviews
    });
  });

  it('should set sendStatus to "PENDING"', () => {
    expect(
      reviewsData.reducer(initialState, { type: sendReview.pending.type})
    ).toEqual({...initialState, sendStatus: SendReviewStatus.Pending});
  });

  it('should set update reviews', () => {
    expect(
      reviewsData.reducer(initialState, {
        type: sendReview.fulfilled.type,
        payload: reviews,
      })
    ).toEqual({...initialState, reviews, sendStatus: SendReviewStatus.Success});
  });

  it('should set sendStatus to "UN_SUCCESS"', () => {
    expect(
      reviewsData.reducer(initialState, {
        type: sendReview.rejected.type,
      })
    ).toEqual({...initialState, sendStatus: SendReviewStatus.UnSuccess});
  });
});
