import { useDispatch, useSelector } from "react-redux";

import { setColorAction, setTextAction } from "../../redux/slices/watermarkSlice";
import { AppDispatch, RootState } from "../../redux/store";

const Tools = () => {
  const { color, text } = useSelector((state: RootState) => state.watermark);
  const dispatch = useDispatch<AppDispatch>();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = "watermark.png";

    const canvas = document.querySelector("canvas");
    link.href = canvas!.toDataURL();
    link.click();
  };

  return (
    <aside className="flex flex-col items-center w-1/4 p-4 pt-12 bg-gray-800 text-gray-100">
      <h2 className="text-xl font-semibold">Tools</h2>
      <div className="mt-8">
        <label>Text</label>
        <textarea
          className="w-full h-1/2 p-2 rounded bg-gray-400/50"
          onChange={(e) => dispatch(setTextAction(e.target.value))}
          value={text}
        />

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
      <button
        className="mt-8 p-2 rounded bg-gray-400/50"
        onClick={handleDownload}
      >
        Download
      </button>
    </aside>
  );
};

export { Tools }