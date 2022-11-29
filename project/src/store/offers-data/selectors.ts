import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {City, Offers} from '../../types/offer';

export const getOffersDataLoadingStatus = (state: State): boolean => state[NameSpace.Data].isOffersDataLoading;
export const getActiveCity = (state: State): City => state[NameSpace.Data].activeCity;
export const getActiveSortType = (state: State): string => state[NameSpace.Data].activeSortType;
export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getSortedOffers = (state: State): Offers => state[NameSpace.Data].sortedOffers;
