import { useDispatch, useSelector } from "react-redux";

import { setTextAction } from "../../redux/slices/watermarkSlice";
import { AppDispatch, RootState } from "../../redux/store";

const WatermarkText = () => {
  const { text } = useSelector((state: RootState) => state.watermark);

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="flex flex-col">
      <label>Text</label>
      <textarea
        className="w-full h-1/2 p-2 rounded bg-gray-400/50"
        onChange={(e) => dispatch(setTextAction(e.target.value))}
        value={text}
      />
    </div>
  );
};

export { WatermarkText };
