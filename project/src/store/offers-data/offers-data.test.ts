import {datatype} from 'faker';
import {makeFakeCity, makeFakeOffer} from '../../utils/mocks';
import {OffersData} from '../../types/state';
import {cities, sortTypes} from '../../const';
import {filtering, offersData, sorting} from './offers-data';
import {fetchNearbyOffers, fetchOffer, fetchOffers} from '../api-actions';

const offer = makeFakeOffer();
const offers = Array.from({length: datatype.number(10)}, () =>
  makeFakeOffer()
);
const city = makeFakeCity();
const sortType = sortTypes[Math.floor(Math.random() * sortTypes.length)];
const activeOffer = offer;
const nearbyOffers = offers;

describe('Reducer: offersData', () => {
  let initialState: OffersData;

  beforeEach(() => {
    initialState = {
      isOffersDataLoading: false,
      isOfferDataLoading: false,
      isError: true,
      activeCity: cities[0],
      activeSortType: sortTypes[0],
      offers: [],
      nearbyOffers: [],
      activeOffer: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersData.reducer(undefined, { type: 'UNKNOWN_ACTION' })).toEqual(
      initialState
    );
  });

  it('should set isOffersDataLoading to "true" when pending', () => {
    expect(
      offersData.reducer(initialState, { type: fetchOffers.pending.type })
    ).toEqual({
      ...initialState,
      isOffersDataLoading: true
    });
  });

  it('should set loaded offers', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffers.fulfilled.type,
        payload: offers,
      })
    ).toEqual({
      ...initialState,
      offers,
      isOffersDataLoading: false
    });
  });

  it('should set isOfferDataLoading to "false"', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffers.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isOffersDataLoading: false,
      isOfferDataLoading: true
    });
  });

  it('should set isOfferDataLoading to "true" when pending', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffer.pending.type,
      })
    ).toEqual({
      ...initialState,
      isOfferDataLoading: true
    });
  });

  it('should set activeOffer', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffer.fulfilled.type,
        payload: activeOffer,
      })
    ).toEqual({
      ...initialState,
      activeOffer,
      isError: false,
    });
  });

  it('should set isError to "true" and isOfferDataLoading to "true" on activeOffer rejected', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchOffer.rejected.type,
      })
    ).toEqual({
      ...initialState,
      isError: true,
      isOfferDataLoading: false
    });
  });

  it('should set loaded nearby offers', () => {
    expect(
      offersData.reducer(initialState, {
        type: fetchNearbyOffers.fulfilled.type,
        payload: nearbyOffers,
      })
    ).toEqual({
      ...initialState,
      nearbyOffers,
    });
  });

  it('should set new city', () => {
    expect(
      offersData.reducer(initialState, filtering({ activeCity: city }))
    ).toEqual({ ...initialState, activeCity: city });
  });

  it('should set new sorting', () => {
    expect(
      offersData.reducer(initialState, sorting({ activeSortType: sortType }))
    ).toEqual({ ...initialState, activeSortType: sortType });
  });
});
