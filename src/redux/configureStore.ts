import { Action, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { configureStore, ThunkAction } from '@reduxjs/toolkit';
import { routerMiddleware } from 'connected-react-router';
import { authReducer } from '~/redux/reducers';
import { history } from '~/util/history';
import { rootSaga } from '~/redux/saga';

const rootReducer = combineReducers({
  auth: authReducer,
});

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(sagaMiddleware, routerMiddleware(history)),
  devTools: true,
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
