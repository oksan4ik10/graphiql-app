import { configureStore, AnyAction, Reducer } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import signupInputsReducer from './reducers/signupInputsReducer';
import signupErrorsReducer from './reducers/signupErrorsReducer';
import signinInputsReducer from './reducers/signinInputsReducer';
import signinErrorsReducer from './reducers/signinErrorsReducer';
import codeEditReducer from './reducers/codeEditReducer';

export const combinedReducer = combineReducers({
  signupInputsReducer,
  signupErrorsReducer,
  signinInputsReducer,
  signinErrorsReducer,
  codeEditReducer,
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
