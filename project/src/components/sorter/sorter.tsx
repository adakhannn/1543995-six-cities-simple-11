import {sortTypes} from '../../const';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {useState} from 'react';
import classNames from 'classnames';
import {sorting} from '../../store/offers-data/offers-data';
import {getActiveSortType} from '../../store/offers-data/selectors';

function Sorter(): JSX.Element {
  const dispatch = useAppDispatch();
  const activeSortType = useAppSelector(getActiveSortType);
  const [sortStatus, setSortStatus] = useState(false);
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        onClick={(evt) => {
          evt.preventDefault();
          if (!sortStatus) {
            setSortStatus(true);
          }
        }}
      >
        {activeSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={classNames('places__options', 'places__options--custom', {'places__options--opened': sortStatus})}>
        {sortTypes.map((sortType) => (
          <li
            className={classNames('places__option', 'places__option--active')}
            key={sortType}
            onClick={(evt) => {
              evt.preventDefault();
              setSortStatus(false);
              dispatch(sorting({activeSortType: sortType}));
            }}
          >
            {sortType}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default Sorter;
