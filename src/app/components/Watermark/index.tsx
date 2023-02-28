import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import {
  setStartPointAction,
  setDropPointAction,
} from "../../redux/slices/watermarkSlice";
import { setFileAction } from "../../redux/slices/fileSlice";
import { AppDispatch, RootState } from "../../redux/store";

function Watermark() {
  const { file: selectedFile } = useSelector((state: RootState) => state.file);
  const { dropPoint, startPoint, text } = useSelector(
    (state: RootState) => state.watermark
  );

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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const data = e.target.files![0];
      const reader = new FileReader();
      reader.readAsDataURL(data);
      reader.onload = () => {
        const img = document.createElement("img");
        img.src = reader.result as string;
        img.onload = function () {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx!.drawImage(img, 0, 0);
          const dataURL = canvas.toDataURL(data.type);
          dispatch(setFileAction(dataURL));
        };
      };
    } catch (error) {
      console.error("handle file change", error);
    }
  };
  return (
    <>
      <div
        id="watermark"
        className={`relative w-fit bg-red-600 z-50 cursor-move`}
        draggable
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        style={{ left: dropPoint!.x, top: dropPoint!.y }}
      >
        {text}
      </div>
      <Image alt={"preview"} src={selectedFile!} fill objectFit="cover" />
    </>
  );
}

export { Watermark };
