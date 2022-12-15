import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Reviews} from '../../types/review';

export const getReviews = (state: State): Reviews => state[NameSpace.Reviews].reviews;
export const getSendStatus = (state: State): string => state[NameSpace.Reviews].sendStatus;
