import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInputsState {
  name_: string;
  email: string;
  password: string;
  confirmPass: string;
  passError: string;
}

const passwErrorTextOpts = {
  initial: '',
  length: 'err pass length',
  letter: 'err pass letter',
  num: 'err pass num',
  special: 'err pass special',
  different: 'err pass confirm',
};

export const signupInputsSlice = createSlice({
  name: 'signupInputsSlice',
  initialState: {
    name_: '',
    email: '',
    password: '',
    confirmPass: '',
    passError: '',
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
    updatePassErrorText: (state, action: PayloadAction<string>) => {
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
        case 'different':
          state.passError = passwErrorTextOpts.different;
          break;
      }
    },
  },
});

export const { updateName, updateEmail, updatePassword, updateConfirm, updatePassErrorText } =
  signupInputsSlice.actions;

export default signupInputsSlice.reducer;
