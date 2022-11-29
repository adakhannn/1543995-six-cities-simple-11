import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';
import {City, Offer, Offers} from './offer';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
};

export type OffersData = {
  isOffersDataLoading: boolean;
  activeCity: City;
  activeSortType: string;
  offers: Offers;
  filteredOffers: Offers;
  sortedOffers: Offers;
};

export type OffersProcess = {
  hoveredOffer: Offer | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
