import { useDispatch, useSelector } from "react-redux";

import {
  setStartPointAction,
  setDropPointAction,
} from "../../redux/slices/watermarkSlice";
import { AppDispatch, RootState } from "../../redux/store";

function Watermark() {
  const { color, dropPoint, startPoint, text } = useSelector((state: RootState) => state.watermark);

  const dispatch = useDispatch<AppDispatch>();

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (startPoint!.x === 0 && startPoint!.y === 0) {
      dispatch(setStartPointAction({ x: e.clientX, y: e.clientY }));
    }
  };

  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.clientX <= 0 && e.clientY <= 0) return;
    const watermark = document.getElementById("watermark");
    if (!watermark) return;
    watermark.style.left = `${e.clientX - startPoint!.x}px`;
    watermark.style.top = `${e.clientY - startPoint!.y}px`;
    dispatch(
      setDropPointAction({
        x: e.clientX - startPoint!.x,
        y: e.clientY - startPoint!.y,
      })
    );
  };

  const handleDragEnd = () => {
    const previewArea = document.getElementById("preview");
    if (
      dropPoint!.x < 0 ||
      dropPoint!.y < 0 ||
      dropPoint!.x > previewArea!.offsetWidth ||
      dropPoint!.y > previewArea!.offsetHeight
    )
      dispatch(setDropPointAction({ x: 0, y: 0 }));
  };

  return (
    <div
      id="watermark"
      className={`absolute w-fit bg-red-600 z-50 cursor-move`}
      draggable
      onDragStart={handleDragStart}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
      style={{ left: dropPoint!.x, top: dropPoint!.y, color }}
    >
      {text}
    </div>
  );
}

export { Watermark };
