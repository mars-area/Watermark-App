import { useDispatch, useSelector } from "react-redux";
import { setFileAction } from "../../redux/slices/fileSlice";
import { resetWatermarkAction } from "../../redux/slices/watermarkSlice";
import { AppDispatch, RootState } from "../../redux/store";

const Upload = () => {
  const { file: selectedFile } = useSelector((state: RootState) => state.file);
  const dispatch = useDispatch<AppDispatch>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const data = e.target.files![0];
      if (!data) return;
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
          dispatch(
            setFileAction({
              file: dataURL,
              height: img.height,
              name: data.name,
              type: data.type,
              width: img.width,
            })
          );
        };
      };
      dispatch(resetWatermarkAction());
    } catch (error) {
      console.error("handle file change", error);
    }
  };
  return (
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
  );
};

export { Upload };
