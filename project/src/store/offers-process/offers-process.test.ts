import {makeFakeOffer} from '../../utils/mocks';
import {OffersProcess} from '../../types/state';
import {hoveringOffer, offersProcess} from './offers-process';

const hoverOffer = makeFakeOffer();

describe('Reducer: offersProcess', () => {
  let initialState: OffersProcess;

  beforeEach(() => {
    initialState = {
      hoveredOffer: null,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(
      offersProcess.reducer(undefined, {type: 'UNKNOWN_ACTION'})
    ).toEqual(initialState);
  });

  it('should set new sorting', () => {
    expect(
      offersProcess.reducer(initialState, hoveringOffer({hoveredOffer: hoverOffer}))
    ).toEqual({...initialState, hoveredOffer: hoverOffer});
  });
});
