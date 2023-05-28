import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IErrorState {
  isEmailError: boolean;
  isPasswordError: boolean;
}

export const signinErrorsSlice = createSlice({
  name: 'signinErrorsSlice',
  initialState: {
    isEmailError: false,
    isPasswordError: false,
  } as IErrorState,
  reducers: {
    updateEmailErrorLogin: (state, action: PayloadAction<boolean>) => {
      state.isEmailError = action.payload;
    },
    updatePasswordErrorLogin: (state, action: PayloadAction<boolean>) => {
      state.isPasswordError = action.payload;
    },
  },
});

export const { updateEmailErrorLogin, updatePasswordErrorLogin } = signinErrorsSlice.actions;

export default signinErrorsSlice.reducer;
