import { all, takeEvery, takeLatest } from 'redux-saga/effects';


// import { getAuthFetch } from '../slices/authSlice';
// import { getAuthSuccess } from '../slices/UserSlice';
import { getAuthHadler } from './handler/UserHandler';



export default function* rootSaga() {
    yield all([
        // takeLatest(getAuthFetch.type, getAuthHadler),



    ]);
}
