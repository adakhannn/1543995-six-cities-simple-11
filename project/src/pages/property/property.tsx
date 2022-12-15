import {fetchNearbyOffers, fetchOffer, fetchReviews} from '../../store/api-actions';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';
import {getActiveOffer, getErrorStatus, getOfferDataLoadingStatus} from '../../store/offers-data/selectors';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import Header from '../../components/header/header';
import NearCardList from '../../components/near-card-list/near-card-list';
import CommentsForm from '../../components/comments-form/comments-form';
import Reviews from '../../components/reviews/reviews';
import NearbyMap from '../../components/nearby-map/nearby-map';
import Loading from '../../components/loading/loading';
import {AuthorizationStatus, OneStarPercent, PicturesNumber} from '../../const';
import Error from '../error/error';

function Property(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const {id: offerId} = useParams();
  useEffect(() => {
    dispatch(fetchOffer(Number(offerId)));
    dispatch(fetchNearbyOffers(Number(offerId)));
    dispatch(fetchReviews(Number(offerId)));
  }, [offerId]);
  const currentOffer = useAppSelector(getActiveOffer);
  const isError = useAppSelector(getErrorStatus);
  const isOfferDataLoading = useAppSelector(getOfferDataLoadingStatus);
  if (isOfferDataLoading) {
    return (
      <Loading />
    );
  }
  if (isError && !isOfferDataLoading || !currentOffer) {
    return <Error />;
  }
  return (
    <div className="page">
      <Header />
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {currentOffer.images.slice(PicturesNumber.MinPictures, PicturesNumber.MaxPictures).map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Photo studio" />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {currentOffer.isPremium ?
                <div className="property__mark">
                  <span>Premium</span>
                </div>
                : ''}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {currentOffer.title}
                </h1>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${OneStarPercent * currentOffer.rating}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{currentOffer.rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {currentOffer.type === 'room' ? 'Private Room' : currentOffer.type[0].toUpperCase() + currentOffer.type.slice(1)}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {currentOffer.bedrooms} Bedroom{currentOffer.bedrooms > 1 ? 's' : ''}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {currentOffer.maxAdults} Adult{currentOffer.maxAdults > 1 ? 's' : ''}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{currentOffer.price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {currentOffer.goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src="img/avatar-angelina.jpg" width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    Angelina
                  </span>
                  <span className="property__user-status">
                    Pro
                  </span>
                </div>
                <div className="property__description">
                  <p className="property__text">
                    A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam. The
                    building is green and from 18th century.
                  </p>
                  <p className="property__text">
                    An independent House, strategically located between Rembrand Square and National Opera, but where the
                    bustle of the city comes to rest in this alley flowery and colorful.
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <Reviews />
                {authorizationStatus === AuthorizationStatus.Auth ? <CommentsForm /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <NearbyMap />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <NearCardList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default Property;
