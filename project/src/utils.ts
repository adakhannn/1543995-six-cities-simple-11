import {Offer, Offers} from './types/offer';
import {Review} from './types/review';
import dayjs from 'dayjs';

export const sortingOffers = (activeSortType:string, offers:Offers) => {
  switch (activeSortType) {
    case 'Popular':
      return offers;
    case 'Price: low to high':
      return offers.sort((offer1:Offer, offer2:Offer) => offer1.price - offer2.price);
    case 'Price: high to low':
      return offers.sort((offer1:Offer, offer2:Offer) => offer2.price - offer1.price);
    case 'Top rated first':
      return offers.sort((offer1:Offer, offer2:Offer) => offer2.rating - offer1.rating);
  }
};

const getWeightForNullData = (dataA: string, dataB: string) => {
  if (dataA === null && dataB === null) {
    return 0;
  }
  if (dataA === null) {
    return 1;
  }
  if (dataB === null) {
    return -1;
  }
  return null;
};

export const sortReviewDate = (reviewA : Review, reviewB : Review) => {
  const weight = getWeightForNullData(reviewA.date, reviewB.date);
  return weight ?? dayjs(reviewB.date).diff(dayjs(reviewA.date));
};
