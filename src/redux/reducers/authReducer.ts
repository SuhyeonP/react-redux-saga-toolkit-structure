import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHandlingError, IStoreCommon } from '~/redux/types/common';

export class IAdminState {
  bearer_token: string | null = null;
}

export class LoginForm {
  email!: string;
  password!: string;
}

export type AdminState = IAdminState & IStoreCommon;

const initialState: AdminState = {
  isLoading: false,
  err: null,
  bearer_token: localStorage.getItem('authenticate'),
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest(state, action: PayloadAction<LoginForm>) {
      state.isLoading = true;
    },
    loginSuccess(state, action: PayloadAction<IAdminState>) {
      state.isLoading = false;
      state.bearer_token = action.payload.bearer_token;
    },
    loginFailed(state, action: PayloadAction<IHandlingError>) {
      state.isLoading = false;
      state.err = action.payload;
    },
    logout(state) {
      state.bearer_token = '';
    },
  },
});

export const { actions: authAction, reducer: authReducer } = authSlice;
