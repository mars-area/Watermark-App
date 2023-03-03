import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

interface IImageSize {
  width: number;
  height: number;
}

function getScaleFactor(
  { width: originalWidth, height: originalHeight }: IImageSize,
  { width: maxWidth, height: maxHeight }: IImageSize
): { widthScale: number, heightScale: number } {
  const widthScale =  originalWidth / maxWidth;
  const heightScale =  originalHeight / maxHeight;
  return { widthScale, heightScale }
}

function getElementById(id: string): HTMLElement | null {
  return document.getElementById(id);
}

const Download = () => {
  const { file, height, name, type, width } = useSelector((state: RootState) => state.file);
  const {
    color,
    fontFamily,
    fontSize,
    text,
    dropPoint
  } = useSelector((state: RootState) => state.watermark);

  const handleDownload = () => {
    const previewArea = getElementById("preview-image");
    if (!previewArea) return;

    const img = document.createElement("img");
    img.src = file!;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = width!;
      canvas.height = height!;

      const scaleFactor = getScaleFactor(
        { width: width, height: height },
        { width: previewArea.offsetWidth, height: previewArea.offsetHeight }
      );

      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);
      ctx!.font = `${fontSize}px ${fontFamily}`;
      ctx!.fillStyle = color!;
      ctx!.fillText(
        text!,
        dropPoint!.x * scaleFactor.widthScale,
        dropPoint!.y * scaleFactor.heightScale
      );

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), type);
      });

      if (blob) {
        const link = document.createElement("a");
        link.download = `${name}-watermarked.${type?.split("/")[1]}`;
        link.href = URL.createObjectURL(blob);
        link.click();
        // delete the internal blob reference, to let the browser clear memory from it
        URL.revokeObjectURL(link.href);
      }
    }
  };

  return (
    <button
      className="mt-8 p-2 rounded bg-gray-400/50"
      onClick={handleDownload}
    >
      Download
    </button>
  );
}

export { Download };