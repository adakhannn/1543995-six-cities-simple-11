import {Offer} from './offer';

export type ReviewData = {
  offerId: Offer['id'];
  comment: string;
  rating: number;
};
