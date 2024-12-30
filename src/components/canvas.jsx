import React, { useState, useEffect, useRef } from "react";
import { Stage, Layer, Rect } from "react-konva";

const Canvas = ({ color }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPixels, setDrawnPixels] = useState([]);
  const [pixelSize, setPixelSize] = useState(0);
  const [stageWidth, setStageWidth] = useState(window.innerWidth * 0.8);
  const [stageHeight, setStageHeight] = useState(window.innerHeight * 0.8);

  const layerRef = useRef();

  useEffect(() => {
    const handleResize = () => {
      const newPixelSize = Math.floor(window.innerWidth / 60);
      setPixelSize(newPixelSize);
      setStageWidth(window.innerWidth * 0.8);
      setStageHeight(window.innerHeight * 0.8);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseDown = (e) => {
    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    const x = Math.floor(pointer.x / pixelSize) * pixelSize;
    const y = Math.floor(pointer.y / pixelSize) * pixelSize;

    setIsDrawing(true);
    setDrawnPixels((prevPixels) => [...prevPixels, { x, y, color }]);
  };

  const handleMouseMove = (e) => {
    if (!isDrawing) return;

    const stage = e.target.getStage();
    const pointer = stage.getPointerPosition();
    const x = Math.floor(pointer.x / pixelSize) * pixelSize;
    const y = Math.floor(pointer.y / pixelSize) * pixelSize;

    setDrawnPixels((prevPixels) => [...prevPixels, { x, y, color }]);
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const downloadCanvas = () => {
    const stage = document.querySelector("canvas");
    const dataUrl = stage.toDataURL();
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = "canvas-image.png";
    link.click();
  };

  const clearCanvas = () => {
    layerRef.current.clear();
    layerRef.current.batchDraw();
    setDrawnPixels([]);
  };

  return (
    <div className="relative inline-block p-4 bg-gray-100 shadow-lg rounded-lg">
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        className="border-2 border-black bg-white rounded-lg"
      >
        <Layer ref={layerRef}>
          {drawnPixels.map((pixel, index) => (
            <Rect
              key={index}
              x={pixel.x}
              y={pixel.y}
              width={pixelSize}
              height={pixelSize}
              fill={pixel.color}
              stroke="black"
              strokeWidth={0}
            />
          ))}
        </Layer>
      </Stage>

      <div className="mt-4 space-x-2">
        <button
          onClick={downloadCanvas}
          className="px-6 py-2 bg-green-500 text-white rounded-md shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
        >
          Télécharger le Canvas
        </button>
        <button
          onClick={clearCanvas}
          className="px-6 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
        >
          Effacer le Canvas
        </button>
      </div>
    </div>
  );
};

export default Canvas;
