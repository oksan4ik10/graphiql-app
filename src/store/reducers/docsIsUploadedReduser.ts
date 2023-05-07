import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDocsIsUploaded {
  docsIsUploaded: boolean;
}

export const docsIsUploadedSlice = createSlice({
  name: 'docsIsUploadedSlice',
  initialState: {
    docsIsUploaded: false,
  } as IDocsIsUploaded,
  reducers: {
    updateDocsIsUploaded: (state, action: PayloadAction<boolean>) => {
      state.docsIsUploaded = action.payload;
    },
  },
});

export const { updateDocsIsUploaded } = docsIsUploadedSlice.actions;

export default docsIsUploadedSlice.reducer;
