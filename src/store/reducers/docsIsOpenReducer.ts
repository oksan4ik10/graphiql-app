import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDocsIsOpen {
  docsIsOpen: boolean;
}

export const docsIsOpenSlice = createSlice({
  name: 'docsIsOpenSlice',
  initialState: {
    docsIsOpen: false,
  } as IDocsIsOpen,
  reducers: {
    updateDocsIsOpen: (state, action: PayloadAction<boolean>) => {
      state.docsIsOpen = action.payload;
    },
  },
});

export const { updateDocsIsOpen } = docsIsOpenSlice.actions;

export default docsIsOpenSlice.reducer;
