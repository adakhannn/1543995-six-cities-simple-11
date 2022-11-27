import {Offer, Offers} from './types/offer';

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
