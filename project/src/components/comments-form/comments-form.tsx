import {sendReview} from '../../store/api-actions';
import {ChangeEvent, FormEvent, useState} from 'react';
import {ReviewData} from '../../types/review-data';
import {useAppDispatch} from '../../hooks';

type CommentsProp = {
  id: string | undefined;
}

function CommentsForm(props: CommentsProp): JSX.Element {
  const dispatch = useAppDispatch();
  const {id} = props;
  const [formData, setFormData] = useState({
    review: '',
    rating: 0,
  });
  const validationStatus = formData.rating > 0 && formData.review.length > 50 && formData.review.length < 300;
  const handleChange = (evt: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const {name, value} = evt.target;
    setFormData({...formData, [name]: value});
  };
  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    if (validationStatus) {
      onSubmit({
        offerId: Number(id),
        rating: formData.rating,
        comment: formData.review
      });
    }
  };
  const onSubmit = (reviewData: ReviewData) => {
    dispatch(sendReview(reviewData));
    setFormData({
      review: '',
      rating: 0,
    });
  };
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={handleSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="5"
          id="5-stars"
          type="radio"
          onChange={handleChange}
          checked={Number(formData.rating) === 5}
        />
        <label htmlFor="5-stars" className="reviews__rating-label form__rating-label" title="perfect">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="4"
          id="4-stars"
          type="radio"
          onChange={handleChange}
          checked={Number(formData.rating) === 4}
        />
        <label htmlFor="4-stars" className="reviews__rating-label form__rating-label" title="good">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="3"
          id="3-stars"
          type="radio"
          onChange={handleChange}
          checked={Number(formData.rating) === 3}
        />
        <label htmlFor="3-stars" className="reviews__rating-label form__rating-label" title="not bad">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="2"
          id="2-stars"
          type="radio"
          onChange={handleChange}
          checked={Number(formData.rating) === 2}
        />
        <label htmlFor="2-stars" className="reviews__rating-label form__rating-label" title="badly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
        <input
          className="form__rating-input visually-hidden"
          name="rating"
          value="1"
          id="1-star"
          type="radio"
          onChange={handleChange}
          checked={Number(formData.rating) === 1}
        />
        <label htmlFor="1-star" className="reviews__rating-label form__rating-label" title="terribly">
          <svg className="form__star-image" width="37" height="33">
            <use xlinkHref="#icon-star"></use>
          </svg>
        </label>
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        value={formData.review}
        onChange={handleChange}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe
          your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!validationStatus}
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default CommentsForm;
