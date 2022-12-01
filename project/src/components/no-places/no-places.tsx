import {useAppSelector} from '../../hooks';
import {getActiveCity} from '../../store/offers-data/selectors';

function NoPlaces(): JSX.Element {
  const activeCity = useAppSelector(getActiveCity);
  return (
    <p className="cities__status-description">We could not find any property available at the moment in {activeCity.name}</p>
  );
}

export default NoPlaces;
