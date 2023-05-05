import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInputSearch {
  strCode: string;
  variables: string;
  header: string;
}
const initialState: IInputSearch = {
  strCode: '',
  variables: '',
  header: '',
};

export const codeEditorSlice = createSlice({
  name: 'codeEdit',
  initialState,
  reducers: {
    saveCode(state, action: PayloadAction<string>) {
      state.strCode = action.payload;
    },
    saveVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload;
    },
    saveHeader(state, action: PayloadAction<string>) {
      state.header = action.payload;
    },
  },
});

export default codeEditorSlice.reducer;
