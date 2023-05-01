import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInputsState {
  email: string;
  password: string;
  passError: string;
}

const passwErrorTextOpts = {
  initial: '',
  length: 'Password must have at least 8 characters.',
  letter: 'Password must have at least 1 letter.',
  num: 'Password must have at least 1 number.',
  special: 'Password must have at least 1 special character.',
};

export const signinInputsSlice = createSlice({
  name: 'signinInputsSlice',
  initialState: {
    email: '',
    password: '',
    passError: '',
  } as IInputsState,
  reducers: {
    updateEmailLogin: (state, action: PayloadAction<string>) => {
      state.email = action.payload;
    },
    updatePasswordLogin: (state, action: PayloadAction<string>) => {
      state.password = action.payload;
    },
    updatePassErrorTextLogin: (state, action: PayloadAction<string>) => {
      switch (action.payload) {
        case 'initial':
          state.passError = passwErrorTextOpts.initial;
          break;
        case 'length':
          state.passError = passwErrorTextOpts.length;
          break;
        case 'letter':
          state.passError = passwErrorTextOpts.letter;
          break;
        case 'num':
          state.passError = passwErrorTextOpts.num;
          break;
        case 'special':
          state.passError = passwErrorTextOpts.special;
          break;
      }
    },
  },
});

export const { updateEmailLogin, updatePasswordLogin, updatePassErrorTextLogin } =
  signinInputsSlice.actions;

export default signinInputsSlice.reducer;
