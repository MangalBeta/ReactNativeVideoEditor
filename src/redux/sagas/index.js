import { all } from 'redux-saga/effects';

import signupSaga from './signup';
import globalSaga from '../../appContainer/saga';
import verificationSaga from './verification';
import profileSaga from './profile';

function* rootSaga() {
    yield all([
        globalSaga(),
        signupSaga(),
        verificationSaga(),
        profileSaga()
    ]);
}  


export default rootSaga;
