import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IErrorState {
  isNameError: boolean;
  isEmailError: boolean;
  isPasswordError: boolean;
}

export const signupErrorsSlice = createSlice({
  name: 'signupErrorsSlice',
  initialState: {
    isNameError: false,
    isEmailError: false,
    isPasswordError: false,
  } as IErrorState,
  reducers: {
    updateNameError: (state, action: PayloadAction<boolean>) => {
      state.isNameError = action.payload;
    },
    updateEmailError: (state, action: PayloadAction<boolean>) => {
      state.isEmailError = action.payload;
    },
    updatePasswordError: (state, action: PayloadAction<boolean>) => {
      state.isPasswordError = action.payload;
    },
  },
});

export const { updateNameError, updateEmailError, updatePasswordError } = signupErrorsSlice.actions;

export default signupErrorsSlice.reducer;
