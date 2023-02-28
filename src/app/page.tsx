"use client";

import { useDispatch, useSelector } from "react-redux";

import { setFileAction } from "./redux/slices/fileSlice";
import {
  setColorAction,
  setTextAction
} from "./redux/slices/watermarkSlice";
import { AppDispatch, RootState } from "./redux/store";

import { Watermark } from "./components";

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

export default function Home() {
  const { file: selectedFile } = useSelector((state: RootState) => state.file);

  const dispatch = useDispatch<AppDispatch>();

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
    <main className="flex">
      <div
        className={`flex flex-col justify-center items-center bg-gray-50 w-full h-screen ${
          selectedFile && "w-3/4"
        }`}
      >
        {selectedFile && (
          <div className="flex flex-col pt-12 h-3/4 p-4 w-full justify-center items-center">
            <h2 className="text-xl font-semibold">Preview</h2>
            <div className="flex w-full h-full p-4 bg-gray-800 rounded-md shadow-lg">
              <div
                id="preview"
                className="relative h-full w-full overflow-hidden"
              >
                <Watermark />
              </div>
            </div>
          </div>
        )}
        <div className={`flex items-center ${selectedFile && "h-1/4"}`}>
          <form
            className={`flex flex-col justify-center items-center bg-gray-300/50 p-4 rounded space-y-4`}
          >
            <label>Upload your doc</label>
            <input
              className="flex-1 h-full p-2 rounded bg-gray-400/50"
              onChange={handleFileChange}
              type="file"
            />
          </form>
        </div>
      </div>
      {selectedFile && <Tools />}
    </main>
  );
}
