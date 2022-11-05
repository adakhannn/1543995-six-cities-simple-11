import Card from '../../components/card/card';
import {Offers} from '../../types/offer';

type CardListProps = {
  offers: Offers;
}

function CardsList({offers}: CardListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer} />)}
    </div>
  );
}

export default CardsList;
