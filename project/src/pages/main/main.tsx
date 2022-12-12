import {useAppSelector} from '../../hooks';
import {store} from '../../store';
import {fetchOffers} from '../../store/api-actions';
import LocationList from '../../components/location-list/location-list';
import CardsList from '../../components/cards-list/cards-list';
import Map from '../../components/map/map';
import Header from '../../components/header/header';
import Sorter from '../../components/sorter/sorter';
import Title from '../../components/title/title';
import {getOffers, getOffersDataLoadingStatus} from '../../store/offers-data/selectors';
import NoPlaces from '../../components/no-places/no-places';
import {getAuthCheckedStatus} from '../../store/user-process/selectors';
import Loading from '../../components/loading/loading';
import classNames from 'classnames';

store.dispatch(fetchOffers());

function Main(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const isAuthChecked = useAppSelector(getAuthCheckedStatus);
  const isOffersDataLoading = useAppSelector(getOffersDataLoadingStatus);
  if (!isAuthChecked || isOffersDataLoading) {
    return (
      <Loading />
    );
  }
  return (
    <div className="page page--gray page--main ">
      <Header />
      <main className={classNames('page__main', 'page__main--index', {'page__main--index-empty': offers.length === 0})}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <LocationList />
          </section>
        </div>
        {offers.length > 0
          ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <Title />
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
          :
          <div className="cities">
            <div className="cities__places-container cities__places-container--empty container">
              <section className="cities__no-places">
                <div className="cities__status-wrapper tabs__content">
                  <b className="cities__status">No places to stay available</b>
                  <NoPlaces />
                </div>
              </section>
              <div className="cities__right-section"></div>
            </div>
          </div>}
      </main>
    </div>
  );
}

export default Main;
