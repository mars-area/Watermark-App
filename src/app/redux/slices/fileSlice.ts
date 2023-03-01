import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Dispatch } from "@reduxjs/toolkit";

export interface IFileState {
  file: string | null;
  height: number;
  name?: string;
  type?: string;
  width: number;
}

const initialState: IFileState = {
  file: null,
  height: 0,
  width: 0,
};

export const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<string | null>) => {
      state.file = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setHeight: (state, action: PayloadAction<number>) => {
      state.height = action.payload;
    },
    setFileType: (state, action: PayloadAction<string | undefined>) => {
      state.type = action.payload;
    },
    setFileName: (state, action: PayloadAction<string | undefined>) => {
      state.name = action.payload;
    }
  },
});

export const { setFile, setFileName, setFileType, setHeight, setWidth } = fileSlice.actions;
export default fileSlice.reducer;

export const setFileAction = (data: IFileState) => (dispatch: Dispatch) => {
  const name = data.name?.split(".")[0]
  dispatch(setFile(data.file));
  dispatch(setWidth(data.width));
  dispatch(setHeight(data.height));
  dispatch(setFileName(name));
  dispatch(setFileType(data.type));
};
