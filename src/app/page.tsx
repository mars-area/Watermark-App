"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import { RootState } from "../redux/store";

import { Tools, Upload, Watermark } from "../components";

export default function Page() {
  const {
    file: selectedFile,
    height,
    width,
  } = useSelector((state: RootState) => state.file);

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
            <div
              className={`flex h-[${height}px] w-[${width}px] p-4 bg-gray-800 rounded-md shadow-lg`}
            >
              <div
                id="preview"
                className={`relative h-[${height}px] w-[${width}px] overflow-hidden`}
              >
                <Watermark />
                <Image
                  alt={"preview"}
                  src={selectedFile!}
                  width={width!}
                  height={height!}
                />
              </div>
            </div>
          </div>
        )}
        <Upload />
      </div>
      {selectedFile && <Tools />}
    </main>
  );
}
