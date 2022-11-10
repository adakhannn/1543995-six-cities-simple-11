import {Offers} from '../../types/offer';
import NearCard from '../near-card/near-card';

type NearCardProps = {
  offers: Offers;
}

function NearCardList(props:NearCardProps): JSX.Element {
  const {offers} = props;
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => <NearCard key={offer.id} offer={offer} />)}
    </div>
  );
}

export default NearCardList;
