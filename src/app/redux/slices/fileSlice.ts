import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface IFileState {
  file: string | null;
  width: number;
  height: number;
}

const initialState: IFileState = {
  file: null,
  width: 0,
  height: 0,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<string|null>) => {
      state.file = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    }
  },
});

export const { setFile, setHeight, setWidth } = fileSlice.actions;
export default fileSlice.reducer;

export const setFileAction = (data: IFileState) => (dispatch: Dispatch) => {
  dispatch(setFile(data.file));
  dispatch(setWidth(data.width));
  dispatch(setHeight(data.height));
};