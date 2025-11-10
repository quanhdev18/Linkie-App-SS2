import React from "react";

export const Slider = ({ min, max, step, value, onValueChange }) => {
  const handleChange = (e) => {
    const val = Number(e.target.value);
    onValueChange([val, value[1]]);
  };

  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step}
      value={value[0]}
      onChange={handleChange}
      className="w-full accent-yellow-400"
    />
  );
};
