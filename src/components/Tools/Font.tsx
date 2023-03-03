import { useDispatch, useSelector } from "react-redux";

import { setFontFamilyAction, setFontSizeAction } from "../../redux/slices/watermarkSlice";

import { AppDispatch, RootState } from "../../redux/store";

const Font = () => {
  const { fontFamily, fontSize } = useSelector((state: RootState) => state.watermark);

  const dispatch = useDispatch<AppDispatch>();
  return (
    <div>
      <div className="flex space-x-4">
        <div className="flex flex-col w-1/2">
          <label>Font</label>
          <select
            className="h-12 p-2 rounded bg-gray-400/50"
            defaultValue={fontFamily}
            onChange={(e) => dispatch(setFontFamilyAction(e.target.value))}
          >
            <option style={{ fontFamily: 'sans-serif' }} value="sans-serif">Sans-Serif</option>
            <option style={{ fontFamily: 'serif' }} value="serif">Serif</option>
            <option style={{ fontFamily: 'monospace' }} value="monospace">Monospace</option>
          </select>
        </div>
        <div className="flex flex-col w-1/2">
          <label>Font Size</label>
          <input
            type="number"
            className="h-12 p-2 rounded bg-gray-400/50"
            onChange={(e) => dispatch(setFontSizeAction(parseInt(e.target.value)))}
            value={fontSize}
          />
        </div>
      </div>
    </div>
  );
};

export { Font };
