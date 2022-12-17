import { datatype, internet, name, system } from 'faker';
import { cities, HousingType } from '../const';
import {City, Offer} from '../types/offer';
import {Reviews, SendingReview} from '../types/review';
import {UserData} from '../types/user-data';

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(100),
  previewImage: system.commonFileName(),
  title: datatype.string(),
  isPremium: datatype.boolean(),
  price: datatype.number(100),
  rating: datatype.number(100),
  bedrooms: datatype.number(100),
  city: {
    location: {
      latitude: datatype.float(0.01),
      longitude: datatype.float(0.01),
      zoom: datatype.number(10),
    },
    name: cities[Math.floor(Math.random() * cities.length)].name,
  },
  description: datatype.string(),
  goods: Array.from({ length: datatype.number(10) }, () => datatype.string()),
  host: {
    id: datatype.number(100),
    avatarUrl: system.commonFileName(),
    isPro: datatype.boolean(),
    name: name.firstName(),
  },
  images: Array.from({ length: datatype.number(10) }, () => datatype.string()),
  location: {
    latitude: datatype.float(0.01),
    longitude: datatype.float(0.01),
    zoom: datatype.number(10),
  },
  maxAdults: datatype.number(100),
  type: HousingType[Math.floor(Math.random() * cities.length)],
});

export const makeFakeCity = (): City => (
  {
    location: {
      latitude: datatype.float(0.01),
      longitude: datatype.float(0.01),
      zoom: datatype.number(10),
    },
    name: cities[Math.floor(Math.random() * cities.length)].name,
  });

export const makeFakeUserData = (): UserData => ({
  avatarUrl: internet.url(),
  email: internet.email(),
  id: datatype.number(100),
  isPro: datatype.boolean(),
  name: name.firstName(),
  token: datatype.string(),
});

export const makeFakeReviewsIncoming = (): Reviews =>
  Array.from({ length: datatype.number(10) }, () => ({
    comment: datatype.string(),
    date: datatype.string(),
    id: datatype.number(100),
    rating: datatype.number(5),
    user: makeFakeUserData(),
  }));

export const makeFakeReviewOutgoing = (): SendingReview => ({
  comment: datatype.string(),
  rating: datatype.number(5),
});

