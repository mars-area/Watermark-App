import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction, Dispatch } from "@reduxjs/toolkit";

interface IStartPoint {
  x: number;
  y: number;
}

export interface IWatermarkState {
  text?: string;
  color?: string;
  startPoint?: IStartPoint;
  dropPoint?: IStartPoint;
}

const initialState: IWatermarkState = {
  text: "",
  color: "#000000",
  startPoint: { x: 0, y: 0 },
  dropPoint: { x: 0, y: 0 },
};

export const watermarkSlice = createSlice({
  name: "watermark",
  initialState,
  reducers: {
    setColor: (state, action: PayloadAction<string>) => {
      state.color = action.payload;
    },
    setText: (state, action: PayloadAction<string>) => {
      state.text = action.payload;
    },
    setStartPoint: (state, action: PayloadAction<IStartPoint>) => {
      state.startPoint = action.payload;
    },
    setDropPoint: (state, action: PayloadAction<IStartPoint>) => {
      state.dropPoint = action.payload;
    }
  },
});

export const { setColor, setText, setStartPoint, setDropPoint } = watermarkSlice.actions;
export default watermarkSlice.reducer;

export const setColorAction = (data: string) => (dispatch: Dispatch) => {
  dispatch(setColor(data));
};

export const setTextAction = (data: string) => (dispatch: Dispatch) => {
  dispatch(setText(data));
};

export const setStartPointAction = (data: IStartPoint) => (dispatch: Dispatch) => {
  dispatch(setStartPoint(data));
};

export const setDropPointAction = (data: IStartPoint) => (dispatch: Dispatch) => {
  dispatch(setDropPoint(data));
};