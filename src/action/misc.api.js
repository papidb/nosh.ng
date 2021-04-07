import axios, {AxiosResponse} from 'axios';

import {ONBOARDED} from './type';

import {BASE_URL} from 'constants/config';

export const onBoardUser = () => (dispatch) => dispatch({type: ONBOARDED});
