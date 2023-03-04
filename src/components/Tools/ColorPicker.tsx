import { useDispatch, useSelector } from "react-redux";

import { setColorAction } from "../../redux/slices/watermarkSlice";

import { AppDispatch, RootState } from "../../redux/store";

const ColorPicker = () => {
  const { color } = useSelector((state: RootState) => state.watermark);
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col">
      <label>Color</label>
      <div className="flex">
        <input
          className="w-full h-12 p-2 rounded bg-gray-400/50"
          onChange={(e) => dispatch(setColorAction(e.target.value))}
          type="color"
          value={color}
        />
        <input
          type={"text"}
          className="w-full ml-4 h-12 p-2 rounded bg-gray-400/50"
          value={color}
          onChange={(e) => dispatch(setColorAction(e.target.value))}
        />
      </div>
    </div>
  );
};

export { ColorPicker };
