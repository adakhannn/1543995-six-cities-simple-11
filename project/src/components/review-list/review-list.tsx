import Review from '../review/review';
import {Reviews} from '../../types/review';

type ReviewsListProps = {
  reviews: Reviews;
}

function ReviewList(props:ReviewsListProps): JSX.Element {
  const {reviews} = props;
  return (
    <ul className="reviews__list">
      {reviews.map((review) => <Review key={review.id} review={review} />)}
    </ul>
  );
}

export default ReviewList;
