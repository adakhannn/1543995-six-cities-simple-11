import {Offer} from '../../types/offer';
import {fetchNearbyOffers, fetchOffer, fetchReviews} from '../../store/api-actions';
import {useAppDispatch} from '../../hooks';

type NearCardProps = {
  offer: Offer;
}

function NearCard(props:NearCardProps): JSX.Element {
  const offer = props.offer;
  const dispatch = useAppDispatch();
  return (
    <article className="near-places__card place-card">
      <div className="near-places__image-wrapper place-card__image-wrapper">
        <div>
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt={offer.title} />
        </div>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{offer.price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${(100 / 5) * Math.round(offer.rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <a
            onClick={(evt) => {
              evt.preventDefault();
              dispatch(fetchOffer(offer.id));
              dispatch(fetchNearbyOffers(offer.id));
              dispatch(fetchReviews(offer.id));
            }}
          >
            {offer.title}
          </a>
        </h2>
        <p className="place-card__type">{offer.type === 'room' ? 'Private Room' : offer.type[0].toUpperCase() + offer.type.slice(1)}</p>
      </div>
    </article>
  );
}

export default NearCard;
