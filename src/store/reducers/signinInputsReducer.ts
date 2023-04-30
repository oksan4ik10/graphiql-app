import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInputsState {
  email: string;
  password: string;
}

export const signinInputsSlice = createSlice({
  name: 'signinInputsSlice',
  initialState: {
    email: '',
    password: '',
  } as IInputsState,
  reducers: {
    updateEmailLogin: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePasswordLogin: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
  },
});

export const { updateEmailLogin, updatePasswordLogin } = signinInputsSlice.actions;

export default signinInputsSlice.reducer;
