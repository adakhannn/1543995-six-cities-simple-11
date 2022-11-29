import {useAppSelector} from '../../hooks';
import {getSortedOffers} from '../../store/offers-data/selectors';
import Card from '../../components/card/card';

function CardsList(): JSX.Element {
  const offers = useAppSelector(getSortedOffers);
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers ? offers.map((offer) => <Card key={offer.id} offer={offer}/>) : ''}
    </div>
  );
}

export default CardsList;
