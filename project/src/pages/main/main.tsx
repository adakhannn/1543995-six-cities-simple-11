import {useAppDispatch, useAppSelector} from '../../hooks';
import LocationList from '../../components/location-list/location-list';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import {sortTypes} from '../../const';
import {useState} from 'react';
import classNames from 'classnames';
import {sorting} from '../../store/action';
import Header from '../../components/header/header';

function Main(): JSX.Element {
  const sortedOffers = useAppSelector((state) => state.sortedOffers);
  const city = useAppSelector((state) => state.city);
  const activeSortType = useAppSelector((state) => state.activeSortType);
  const [sortStatus, setSortStatus] = useState(false);
  const dispatch = useAppDispatch();
  return (
    <div className="page page--gray page--main">
      <Header />
      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{sortedOffers ? sortedOffers.length : ''} places to stay in {city.name}</b>
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
                      className={classNames('places__option', {'places__option--active': activeSortType === sortType})}
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
              <CardsList />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Main;
