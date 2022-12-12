import {fetchReviews} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import ReviewItem from '../review-item/review-item';
import {useEffect} from 'react';
import {getReviews} from '../../store/reviews-data/selectors';

type ReviewListProp = {
  id: string | undefined;
}

function Reviews(props: ReviewListProp): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = props;
  const reviews = useAppSelector(getReviews);
  useEffect(() => {
    dispatch(fetchReviews(Number(id)));
  }, []);
  return (
    <>
      <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
      <ul className="reviews__list">
        {reviews.map((review) => <ReviewItem key={review.id} review={review} />)}
      </ul>
    </>
  );
}

export default Reviews;
