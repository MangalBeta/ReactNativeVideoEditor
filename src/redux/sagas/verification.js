import {call, put, select, takeLatest} from 'redux-saga/effects';

import {api} from '../../utils/api';
import { commonVerifyOTP } from '../../utils/url';
import { setGlobalError } from '../../appContainer/actions';
import { submitOtpVerify } from '../actions';
import { storeData } from '../../utils';
import { LOCALSTORAGE_DATA_KEY } from '../../constants/constants';


const submitOtpVerifyApi = (payload) =>
  api({
    method: 'POST',
    url: `${commonVerifyOTP}`,
    data: payload
  });

  function* createVerifyRequest({payload}) {
    try {
        yield put(submitOtpVerify.request({ isLoading: true }));
        const response = yield call(submitOtpVerifyApi,payload);
        if (response.success) {
            const { message,statusCode, data } = response.data;
            if (statusCode === 200) {
                debugger
                console.log(data?.accessToken,"data?.accessTokendata?.accessTokendata?.accessToken")
                if(data?.accessToken){
                    yield storeData(LOCALSTORAGE_DATA_KEY.USER_TOKEN,data?.accessToken)
                }
                yield put(submitOtpVerify.success(data));
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
        yield put(submitOtpVerify.fulfill({ isLoading: false}));
    }
}
export default function* globalSaga() {
    yield takeLatest(submitOtpVerify.TRIGGER, createVerifyRequest)
}
