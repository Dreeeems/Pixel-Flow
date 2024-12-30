import "./App.css";
import React, { useState } from "react";
import Canvas from "./components/canvas";
import Tools from "./components/tools";

function App() {
  const [color, setColor] = useState("#ffffff");
  const [width, setWidth] = useState(1);
  const handleColorChange = (newColor) => {
    setColor(newColor.hex);
  };

  const handleWidthChange = (newWidth) => {
    setWidth(newWidth);
  };
  return (
    <>
      <div className="flex flex-row gap-3">
        <Tools
          color={color}
          onColorChange={handleColorChange}
          onWidthChange={handleWidthChange}
        />
        <Canvas color={color} pixelSize={16} />
      </div>
    </>
  );
}

export default App;
