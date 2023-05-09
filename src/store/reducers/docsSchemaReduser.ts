import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDocsSchema {
  docsSchema: string;
}

export const docsSchemaSlice = createSlice({
  name: 'docsSchemaSlice',
  initialState: {
    docsSchema: '',
  } as IDocsSchema,
  reducers: {
    updateDocsSchema: (state, action: PayloadAction<string>) => {
      state.docsSchema = action.payload;
    },
  },
});

export const { updateDocsSchema } = docsSchemaSlice.actions;

export default docsSchemaSlice.reducer;
