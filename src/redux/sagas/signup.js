import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    createSignup,
    createLogin,
    createForgotPassword,
    createSecurityQuestion
} from '../actions/signup';
import { api } from '../../utils/api';
import { commonSignup, commonLogin, commonSecurityQuestion, commonForgotPassword } from '../../utils/url';
import { setGlobalError, setIsLoggedIn } from '../../appContainer/actions';
import { storeData } from '../../utils';
import { LOCALSTORAGE_DATA_KEY } from '../../constants/constants';


const createSignupApi = (payload) =>
    api({
        method: 'POST',
        url: `${commonSignup}`,
        data: payload
    });

const createLoginApi = (payload) =>
    api({
        method: 'POST',
        url: `${commonLogin}`,
        data: payload
    });

const createSecurityQuestionApi = (payload) =>
    api({
        method: 'PUT',
        url: `${commonSecurityQuestion}`,
        data: payload
    });



const createForgotPasswordApi = (payload) =>
    api({
        method: 'POST',
        url: `${commonForgotPassword}`,
        data: payload
    });

function* createSignupRequest({ payload }) {
    try {
        yield put(createSignup.request({ isLoading: true }));
        const response = yield call(createSignupApi, payload);
        if (response.success) {
            const { message, type, error, statusCode, data } = response.data;
            if (statusCode === 200) {
                yield put(createSignup.success(data));
            } else {
                yield put(setGlobalError.success({ error: message }))

            }
        } else {
            const { message, error, data } = response.data;
            yield put(setGlobalError.success({ error: message }));
        }
    } catch (error) {
        yield put(setGlobalError.success());
    } finally {
        yield put(createSignup.fulfill({ isLoading: false }));
    }
}
function* createLoginRequest({ payload }) {
    try {
        yield put(createLogin.request({ isLoading: true }));
        const response = yield call(createLoginApi, payload);

        if (response.success) {
            const { message, statusCode, data } = response.data;
            if (statusCode === 200) {
                if (data?.accessToken) {
                    yield storeData(LOCALSTORAGE_DATA_KEY.USER_TOKEN, data?.accessToken)
                }
                yield put(setIsLoggedIn.trigger({
                    isLoggedIn: true
                }))
                yield put(createLogin.success(data));
            } else {
                yield put(setGlobalError.success({ error: message }))
            }
        } else {
            const { message, error, data } = response.data;
            yield put(setGlobalError.success({ error: message }));
        }
    } catch (error) {
        yield put(setGlobalError.success());
    } finally {
        yield put(createLogin.fulfill({ isLoading: false }));
    }
}

function* createSecurityQuestionRequest({ payload }) {
    try {
        yield put(createSecurityQuestion.request({ isLoading: true }));
        const response = yield call(createSecurityQuestionApi, payload);
        debugger
        if (response.success) {
            const { message, statusCode, data } = response.data;
            if (statusCode === 200) {
                yield put(setIsLoggedIn.trigger({
                    isLoading: true
                }))
                yield put(createSecurityQuestion.success(data));
            } else {
                yield put(setGlobalError.success({ error: message }))
            }
        } else {
            const { message, error, data } = response.data;
            yield put(setGlobalError.success({ error: message }));
        }
    } catch (error) {
        yield put(setGlobalError.success());
    } finally {
        yield put(createSecurityQuestion.fulfill({ isLoading: false }));
    }
}


function* createForgotRequest({ payload }) {
    try {
        yield put(createForgotPassword.request({ isLoading: true }));
        const response = yield call(createForgotPasswordApi, payload);
        console.log(response,"responseresponse")
        if (response.success) {
            const { message, type, error, statusCode, data } = response.data;
            if (statusCode === 200) {
                yield put(createForgotPassword.success(data));
            } else {
                yield put(setGlobalError.success({ error: message }))

            }
        } else {
            const { message, error, data } = response.data;
            yield put(setGlobalError.success({ error: message }));
        }
    } catch (error) {
        yield put(setGlobalError.success());
    } finally {
        yield put(createForgotPassword.fulfill({ isLoading: false }));
    }
}


export default function* globalSaga() {
    yield takeLatest(createSignup.TRIGGER, createSignupRequest)
    yield takeLatest(createLogin.TRIGGER, createLoginRequest)
    yield takeLatest(createForgotPassword.TRIGGER, createForgotRequest)
    yield takeLatest(createSecurityQuestion.TRIGGER, createSecurityQuestionRequest)


}
