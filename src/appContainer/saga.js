import { call, put, select, takeLatest } from 'redux-saga/effects';
import {
    getUser,
} from './actions';

function* getAppDocumentUrlRequest() {
    try {

    } catch (error) {

    } finally {
    }
}




export default function* globalSaga() {
    yield takeLatest(getUser.TRIGGER, getAppDocumentUrlRequest);
}
