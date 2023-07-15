import { useState } from "react";
import Slider from "react-slider";

interface CustomSliderProps {
  schema: {
    title: string;
    minimum?: number;
    maximum?: number;
  };
  onChange: (values: number[]) => void;
}

const CustomSlider = ({ schema, onChange }: CustomSliderProps) => {
  const MIN = schema.minimum || 0;
  const MAX = schema.maximum || 100;

  const [values, setValues] = useState([MIN, MAX]);

  const handleChange = (newValues: number[]) => {
    setValues(newValues);
    onChange(newValues);
  };
  return (
    <div className="box">
      <h3>
        {schema.title} <span>Range:</span>
      </h3>
      <div className={"values"}>
        ${values[0]} - ${values[1]}
      </div>
      <Slider
        className={"slider"}
        value={values}
        min={MIN}
        max={MAX}
        onAfterChange={(e) => handleChange(e)}
      />
    </div>
  );
};

export default CustomSlider;
