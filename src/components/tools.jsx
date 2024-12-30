import React from "react";
import { SketchPicker } from "react-color";

const Tools = ({ color, onColorChange }) => {
  return (
    <div className="flex flex-col w-64 bg-red-600 h-screen">
      <div className="flex flex-col items-center p-5">
        <SketchPicker color={color} onChange={onColorChange} />
      </div>
    </div>
  );
};

export default Tools;
