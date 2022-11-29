import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer} from '../../types/offer';

export const getHoveredOffer = (state: State): Offer | null => state[NameSpace.Offers].hoveredOffer;
