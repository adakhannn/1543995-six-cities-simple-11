import Card from '../../components/card/card';
import {Offers} from '../../types/offer';

type CardListProps = {
  offers: Offers;
}

function CardsList({offers}: CardListProps): JSX.Element {
  /*const [selectedCard, setSelectedCard] = useState<Offer | undefined>(undefined);

  const onListCardHover = (listCardId: number) => {
    const currentCard = offers.find((offer) => offer.id === listCardId);
    setSelectedCard(currentCard);
  };*/

  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => <Card key={offer.id} offer={offer}/>)}
    </div>
  );
}

export default CardsList;
