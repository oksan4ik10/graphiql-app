import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IModalState {
  display: boolean;
  errText: string;
}

export const modalReducerSlice = createSlice({
  name: 'modalSlice',
  initialState: {
    display: false,
    errText: '',
  } as IModalState,
  reducers: {
    isDisplay: (state, action: PayloadAction<boolean>) => {
      state.display = action.payload;
    },
    setErrText: (state, action: PayloadAction<string>) => {
      state.errText = action.payload;
    },
  },
});

export const { isDisplay, setErrText } = modalReducerSlice.actions;

export default modalReducerSlice.reducer;
