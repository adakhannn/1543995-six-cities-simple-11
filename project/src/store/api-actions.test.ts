import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {fetchOffers, fetchOffer, fetchNearbyOffers, fetchReviews, sendReview, checkAuthAction, loginAction, logoutAction} from './api-actions';
import {APIRoute, AUTH_TOKEN_KEY_NAME} from '../const';
import {State} from '../types/state';
import {makeFakeOffer, makeFakeReviewOutgoing, makeFakeReviewsIncoming, makeFakeUserData} from '../utils/mocks';
import {datatype} from 'faker';
import {AuthData} from '../types/auth-data';
import {redirectToRoute} from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action<string>,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should fetchOffers when server returns 200', async () => {
    const offers = Array.from({ length: datatype.number(10) }, () =>
      makeFakeOffer()
    );

    const store = mockStore();
    mockAPI.onGet(APIRoute.Offers).reply(200, offers);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOffers());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOffers.pending.type,
      fetchOffers.fulfilled.type,
    ]);
  });

  it('should fetchOffer when server returns 200', async () => {
    const id = datatype.number(100);
    const offer = makeFakeOffer();

    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${id}`).reply(200, offer);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchOffer(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchOffer.pending.type,
      fetchOffer.fulfilled.type,
    ]);
  });

  it('should fetchNearbyOffers when server returns 200', async () => {
    const id = datatype.number(100);
    const nearbyOffers = Array.from({ length: datatype.number(10) }, () =>
      makeFakeOffer()
    );

    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Offers}/${id}/nearby`).reply(200, nearbyOffers);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchNearbyOffers(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchNearbyOffers.pending.type,
      fetchNearbyOffers.fulfilled.type,
    ]);
  });

  it('should fetchReviews when server returns 200', async () => {
    const id = datatype.number(100);
    const reviews = makeFakeReviewsIncoming();

    const store = mockStore();
    mockAPI.onGet(`${APIRoute.Comments}/${id}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(fetchReviews(id));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      fetchReviews.pending.type,
      fetchReviews.fulfilled.type,
    ]);
  });

  it('should dispatch sendReview when server returns 200', async () => {
    const offerId = datatype.number(100);
    const sendingReview = makeFakeReviewOutgoing();
    const reviews = makeFakeReviewsIncoming();

    const store = mockStore();
    mockAPI.onPost(`${APIRoute.Comments}/${offerId}`).reply(200, reviews);

    expect(store.getActions()).toEqual([]);
    await store.dispatch(sendReview({...sendingReview, offerId}));
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      sendReview.pending.type,
      sendReview.fulfilled.type,
    ]);
  });

  it('should dispatch checkUserAction when server returns 200', async () => {
    const user = makeFakeUserData();

    const store = mockStore();
    mockAPI.onGet(APIRoute.Login).reply(200, user);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({ type }) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type,
    ]);
  });

  it('should dispatch loginAction and redirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {login: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type,
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME, 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith(AUTH_TOKEN_KEY_NAME);
  });
});
