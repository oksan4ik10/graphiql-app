import { configureStore, AnyAction, Reducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import signupInputsReducer from './reducers/signupInputsReducer';
import signupErrorsReducer from './reducers/signupErrorsReducer';
import signinInputsReducer from './reducers/signinInputsReducer';
import signinErrorsReducer from './reducers/signinErrorsReducer';
import codeEditReducer from './reducers/codeEditReducer';
import modalReducer from './reducers/modalReducer';
import docsIsOpenReducer from './reducers/docsIsOpenReducer';
import { countryAPI } from './reducers/api/CountryApiReducer';

export const combinedReducer = combineReducers({
  signupInputsReducer,
  signupErrorsReducer,
  signinInputsReducer,
  signinErrorsReducer,
  codeEditReducer,
  modalReducer,
  docsIsOpenReducer,
  [countryAPI.reducerPath]: countryAPI.reducer,
});

export type ICombinedReducerState = ReturnType<typeof combinedReducer>;

const rootReducer: Reducer = (state: ICombinedReducerState, action: AnyAction) => {
  if (action.type === 'RESET') {
    state = {} as ICombinedReducerState;
  }
  return combinedReducer(state, action);
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(countryAPI.middleware),
});

export type IRootState = ReturnType<typeof store.getState>;
export type IRootDispatch = typeof store.dispatch;

type IDispatchFunc = () => IRootDispatch;

// использовать useAppDispatch и useAppSelector как использовались бы useDispatch и useSelector
export const useAppDispatch: IDispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export const initialRootState = {
  ...store.getState(),
};

export default store;
