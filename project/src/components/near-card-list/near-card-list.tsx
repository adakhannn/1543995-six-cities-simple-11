import {useAppSelector} from '../../hooks';
import {getNearbyOffers} from '../../store/offers-data/selectors';
import NearCard from '../near-card/near-card';

function NearCardList(): JSX.Element {
  const nearbyOffers = useAppSelector(getNearbyOffers);
  return (
    <div className="near-places__list places__list">
      {nearbyOffers.map((offer) => <NearCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearCardList;
