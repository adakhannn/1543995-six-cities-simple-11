import {cities} from '../../const';
import Location from '../location/location';

function LocationList(): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {cities.map((city) => <Location key={city.name} city={city}/>)}
    </div>
  );
}

export default LocationList;
