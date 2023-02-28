import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface IFileState {
  file: string | null;
}

const initialState: IFileState = {
  file: null,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<string>) => {
      state.file = action.payload;
    },
  },
});

export const { setFile } = fileSlice.actions;
export default fileSlice.reducer;

export const setFileAction = (data: string) => (dispatch: Dispatch) => {
  dispatch(setFile(data));
};
