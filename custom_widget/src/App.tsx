import React, { useState } from "react";
import Slider from "./components/Slider";
import "./App.css";

const App = () => {
  const schema = {
    minimum: 20,
    maximum: 68,
    title: "price",
  };
  const [data, setData] = useState<number[]>([]);

  const handleSliderChange = (val: number[]) => {
    setData(val);
  };

  return (
    <div className="app">
      <Slider schema={schema} onChange={handleSliderChange} />
    </div>
  );
};
export default App;
