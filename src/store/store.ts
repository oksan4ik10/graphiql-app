import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import testReducer from './reducers/testReducer';
import signupInputsReducer from './reducers/signupInputsReducer';
import signupErrorsReducer from './reducers/signupErrorsReducer';
import signinInputsReducer from './reducers/signinInputsReducer';
import signinErrorsReducer from './reducers/signinErrorsReducer';

const rootReducer = combineReducers({
  testReducer,
  signupInputsReducer,
  signupErrorsReducer,
  signinInputsReducer,
  signinErrorsReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export type IRootState = ReturnType<typeof store.getState>;
export type IRootDispatch = typeof store.dispatch;

type IDispatchFunc = () => IRootDispatch;

// использовать useAppDispatch и useAppSelector как использовались бы useDispatch и useSelector
export const useAppDispatch: IDispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector;

export default store;
