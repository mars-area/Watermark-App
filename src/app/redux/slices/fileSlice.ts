import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface IFileState {
  file: Blob | null;
  text?: string;
  color?: string;
}

const initialState: IFileState = {
  file: null,
  text: "",
  color: "#000000",
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setFile: (state, action: PayloadAction<Blob>) => {
      state.file = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    }
  },
});

export const { setColor, setFile, setText } = fileSlice.actions;
export default fileSlice.reducer;

export const setColorAction = (data: string) => (dispatch: Dispatch) => {
  dispatch(setColor(data));
};

export const setFileAction = (data: Blob) => (dispatch: Dispatch) => {
  dispatch(setFile(data));
};

export const setTextAction = (data: string) => (dispatch: Dispatch) => {
  dispatch(setText(data));
};

