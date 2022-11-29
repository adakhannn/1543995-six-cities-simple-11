import {Link} from 'react-router-dom';
import {Offer} from '../../types/offer';
import {useAppDispatch} from '../../hooks';
import {hoveringOffer} from '../../store/offers-process/offers-process';

type CardProps = {
  offer: Offer;
}

function Card(props: CardProps): JSX.Element {
  const {offer} = props;
  const dispatch = useAppDispatch();
  return (
    <article
      className="cities__card place-card"
      onMouseEnter={(evt) => {
        evt.preventDefault();
        dispatch(hoveringOffer({hoveredOffer: offer}));
      }}
      onMouseLeave={(evt) => {
        evt.preventDefault();
        dispatch(hoveringOffer({hoveredOffer: null}));
      }}
    >
      {offer.isPremium ?
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
        : ''}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img className="place-card__image" src={offer.previewImage} width="260" height="200" alt="Place image" />
        </a>
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
            <span style={{width: `${(100 / 5) * offer.rating}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link
            to={`/offer/${offer.id}`}
            onClick={(evt) => {
              dispatch(hoveringOffer({hoveredOffer: null}));
            }}
          >
            {offer.title}
          </Link>
        </h2>
        <p className="place-card__type">{offer.type}</p>
      </div>
    </article>
  );
}

export default Card;
