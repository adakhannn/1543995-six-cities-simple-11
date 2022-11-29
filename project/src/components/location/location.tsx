import {useAppDispatch, useAppSelector} from '../../hooks';
import classNames from 'classnames';
import {City} from '../../types/offer';
import {getActiveCity} from '../../store/offers-data/selectors';
import {filtering} from '../../store/offers-data/offers-data';

type locationProps = {
  city: City;
}

function Location({city}: locationProps): JSX.Element {
  const location = useAppSelector(getActiveCity);
  const dispatch = useAppDispatch();
  return (
    <li className="locations__item">
      <a
        className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city.name === location.name})}
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(filtering({activeCity: city}));
        }}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default Location;
