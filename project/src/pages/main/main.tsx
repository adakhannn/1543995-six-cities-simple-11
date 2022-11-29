import {useAppSelector} from '../../hooks';
import LocationList from '../../components/location-list/location-list';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import {getActiveCity, getSortedOffers} from '../../store/offers-data/selectors';
import Sorter from '../../components/sorter/sorter';

function Main(): JSX.Element {
  const offers = useAppSelector(getSortedOffers);
  const activeCity = useAppSelector(getActiveCity);
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
              <b className="places__found">{offers ? offers.length : ''} places to stay in {activeCity.name}</b>
              <Sorter />
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
