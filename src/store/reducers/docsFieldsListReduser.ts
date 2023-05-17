import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IDocsFieldsList {
  docsFieldsList: Array<string>;
}

export const docsFieldsListSlice = createSlice({
  name: 'docsFieldsListSlice',
  initialState: {
    docsFieldsList: [],
  } as IDocsFieldsList,
  reducers: {
    addField: (state, action: PayloadAction<string>) => {
      state.docsFieldsList.push(action.payload);
    },
    removeField: (state) => {
      state.docsFieldsList.pop();
    },
  },
});

export const { addField, removeField } = docsFieldsListSlice.actions;

export default docsFieldsListSlice.reducer;
