import {Review} from './types/review';
import dayjs from 'dayjs';

export const sortReviewDate = (reviewA : Review, reviewB : Review) => dayjs(reviewB.date).diff(dayjs(reviewA.date));
