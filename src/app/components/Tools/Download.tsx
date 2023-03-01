import { useSelector } from "react-redux";

import { RootState } from "../../redux/store";

const Download = () => {
  const { file, height, name, type, width } = useSelector((state: RootState) => state.file);
  const { color, text, dropPoint } = useSelector((state: RootState) => state.watermark);

  const handleDownload = () => {
    const img = document.createElement("img");
    img.src = file!;
    img.onload = async () => {
      const canvas = document.createElement("canvas");
      canvas.width = width!;
      canvas.height = height!;
      const ctx = canvas.getContext("2d");
      ctx!.drawImage(img, 0, 0);
      ctx!.fillStyle = color!;
      ctx!.font = "30px Arial";
      ctx!.fillText(text!, dropPoint!.x, dropPoint!.y);

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