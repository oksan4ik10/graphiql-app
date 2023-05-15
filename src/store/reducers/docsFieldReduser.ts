import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDocsField {
  docsField: string;
}

export const docsFieldSlice = createSlice({
  name: 'docsFieldSlice',
  initialState: {
    docsField: '',
  } as IDocsField,
  reducers: {
    updateDocsField: (state, action: PayloadAction<string>) => {
      state.docsField = action.payload;
    },
  },
});

export const { updateDocsField } = docsFieldSlice.actions;

export default docsFieldSlice.reducer;
