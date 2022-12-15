import Card from '../../components/card/card';
import {Offers} from '../../types/offer';

type CardsListProps = {
  offers: Offers;
};

function CardsList({ offers }: CardsListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers ? offers.map((offer) => <Card key={offer.id} offer={offer}/>) : ''}
    </div>
  );
}

export default CardsList;
