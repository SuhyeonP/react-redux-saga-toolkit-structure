import { all, fork } from 'redux-saga/effects';
import { authSaga } from '~/redux/saga';

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
