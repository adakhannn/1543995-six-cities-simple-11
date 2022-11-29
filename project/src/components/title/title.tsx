import {useAppSelector} from '../../hooks';
import {getActiveCity, getSortedOffers} from '../../store/offers-data/selectors';

function Title(): JSX.Element {
  const offers = useAppSelector(getSortedOffers);
  const activeCity = useAppSelector(getActiveCity);
  return (
    <b className="places__found">{offers ? offers.length : ''} places to stay in {activeCity.name}</b>
  );
}

export default Title;
