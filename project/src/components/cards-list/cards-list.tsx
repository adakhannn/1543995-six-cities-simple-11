import {useAppSelector} from '../../hooks';
import Card from '../../components/card/card';

function CardsList(): JSX.Element {
  const offers = useAppSelector((state) => state.filteredOffers);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default CardsList;
