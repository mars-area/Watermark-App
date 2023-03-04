import { ColorPicker } from "./ColorPicker";
import { Font } from "./Font";
import { WatermarkText } from "./WatermarkText";
import { Download } from "./Download";

const Tools = () => {
  return (
    <aside className="flex flex-col items-center w-1/4 p-4 pt-12 bg-gray-800 text-gray-100">
      <h2 className="text-xl font-semibold">Tools</h2>
      <div className="flex flex-col mt-8 w-full">
        <WatermarkText />
        <Font />
        <ColorPicker />
      </div>
      <Download />
    </aside>
  );
};

export { Tools }