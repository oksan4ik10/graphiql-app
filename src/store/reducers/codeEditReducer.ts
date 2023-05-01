import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface IInputSerach {
  strCode: string;
}
const initialState: IInputSerach = {
  strCode: '',
};

export const codeEditorSlice = createSlice({
  name: 'codeEdit',
  initialState,
  reducers: {
    saveCode(state, action: PayloadAction<string>) {
      state.strCode = action.payload;
    },
  },
});

export default codeEditorSlice.reducer;
