import {useAppSelector} from '../../hooks';
import NearCard from '../near-card/near-card';

function NearCardList(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => <NearCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearCardList;
