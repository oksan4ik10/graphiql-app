import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInputsState {
  name_: string;
  email: string;
  password: string;
  confirmPass: string;
}

export const signupInputsSlice = createSlice({
  name: 'signupInputsSlice',
  initialState: {
    name_: '',
    email: '',
    password: '',
    confirmPass: '',
  } as IInputsState,
  reducers: {
    updateName: (state, action: PayloadAction<string>) => {
      state.name_ = action.payload;
    },
    updateEmail: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePassword: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updateConfirm: (state, action: PayloadAction<string>) => {
      state.confirmPass = action.payload;
    },
  },
});

export const { updateName, updateEmail, updatePassword, updateConfirm } = signupInputsSlice.actions;

export default signupInputsSlice.reducer;
