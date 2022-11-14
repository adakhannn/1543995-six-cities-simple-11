import classNames from 'classnames';
import {City} from '../../types/offer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeCity} from '../../store/action';

type locationProps = {
  city: City;
}

function Location({city}: locationProps): JSX.Element {
  const location = useAppSelector((state) => state.city);
  const dispatch = useAppDispatch();
  return (
    <li className="locations__item">
      <a
        className={classNames('locations__item-link', 'tabs__item', {'tabs__item--active': city.name === location.name})}
        href="#"
        onClick={(evt) => {
          evt.preventDefault();
          dispatch(changeCity({city: city}));
        }}
      >
        <span>{city.name}</span>
      </a>
    </li>
  );
}

export default Location;
