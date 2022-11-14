import {createAction} from '@reduxjs/toolkit';
import {City} from '../types/offer';

export const changeCity = createAction<{city: City}>('offers/changeCity');
