import {call, put, select, takeLatest} from 'redux-saga/effects';

import {api} from '../../utils/api';
import { getLoginData } from '../../utils/url';
import { setGlobalError } from '../../appContainer/actions';
import { getUserProfile,createlogOutUser } from '../actions';
import { LOCALSTORAGE_DATA_KEY } from '../../constants/constants';
import { removeData } from '../../utils';


const getUserProfileApi = (payload) =>
  api({
    method: 'POST',
    url: `${getLoginData}`,
    data: payload
  });

function* getUserProfileRequest({payload}) {
    try {
        yield put(getUserProfile.request({ isLoading: true }));
        const response = yield call(getUserProfileApi,payload);
        if (response.success) {
            const { message,statusCode, data } = response.data;
            if (statusCode === 200) {              
                yield put(getUserProfile.success(data));
            } else {
                yield put(setGlobalError.success({ error:message}))
                 
            }
        } else {
            const { message,error, data } = response.data;
            yield put(setGlobalError.success({error:message}));
        }
    } catch (error) {
        yield put(setGlobalError.success());
    } finally {
        yield put(getUserProfile.fulfill({ isLoading: false}));
    }
}

function* logoutUserProfileRequest({payload}) {
    try {
        yield put(createlogOutUser.request({ isLoading: true }));
        const response = yield removeData(LOCALSTORAGE_DATA_KEY.USER_TOKEN)
        yield put(createlogOutUser.success())
    } catch (error) {
        yield put(setGlobalError.success());
    } finally {
        yield put(createlogOutUser.fulfill({ isLoading: false}));
    }
}
export default function* globalSaga() {
    yield takeLatest(getUserProfile.TRIGGER, getUserProfileRequest)
    yield takeLatest(createlogOutUser.TRIGGER, logoutUserProfileRequest)

}
