import {store} from '../store';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';
import {City, Offer, Offers} from './offer';
import {Reviews} from './review';

export type UserProcess = {
  authorizationStatus: AuthorizationStatus;
  userInfo: UserData | null;
};

export type OffersData = {
  isOffersDataLoading: boolean;
  isOfferDataLoading: boolean;
  isError: boolean;
  activeCity: City;
  activeSortType: string;
  offers: Offers;
  filteredOffers: Offers;
  sortedOffers: Offers;
  nearbyOffers: Offers;
  activeOffer: Offer | null;
};

export type ReviewsData = {
  reviews: Reviews;
};

export type OffersProcess = {
  hoveredOffer: Offer | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
