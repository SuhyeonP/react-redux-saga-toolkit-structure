import { call, put, take, fork } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { push } from 'connected-react-router';
import { PayloadAction } from '@reduxjs/toolkit';
import { AdminState, authAction, LoginForm } from '~/redux/reducers';
import { IResponseData } from '~/redux/types/common';
import { CustomAPI } from '~/redux/api/CustomAPI';

function* handleLogin(payload: LoginForm) {
  try {
    const response: IResponseData<AdminState> = yield call(
      CustomAPI.login,
      payload,
    );
    if (response.ok) {
      const token = response.result.bearer_token as string;
      localStorage.setItem('authenticate', token);
      yield put(authAction.loginSuccess({ bearer_token: token }));
    } else {
      yield put(authAction.loginFailed(response.err));
    }
  } catch (err) {
    authAction.loginFailed({
      code: (err as AxiosError).response!.data.detail[0].msg,
      v: (err as AxiosError).response!.data.detail[0],
    });
  }
}

function* handleLogout() {
  yield call(CustomAPI.logout);
  localStorage.removeItem('authenticate');

  yield put(push('/login'));
}

function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('authenticate'));
    if (!isLoggedIn) {
      const action: PayloadAction<LoginForm> = yield take(
        authAction.loginRequest.type,
      );
      yield fork(handleLogin, action.payload);
    }
    yield take(authAction.logout.type);
    yield call(handleLogout);
  }
}

export function* authSaga() {
  yield fork(watchLoginFlow);
}
