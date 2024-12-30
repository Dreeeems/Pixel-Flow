import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";

const Canvas = ({ color }) => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnPixels, setDrawnPixels] = useState([]);
  const [pixelSize, setPixelSize] = useState(0);
  const [stageWidth, setStageWidth] = useState(window.innerWidth * 0.8);
  const [stageHeight, setStageHeight] = useState(window.innerHeight * 0.8);

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

  return (
    <div
      style={{
        position: "relative",
        display: "inline-block",
        padding: "10px",
        backgroundColor: "#f4f4f4",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
      }}
    >
      <Stage
        width={stageWidth}
        height={stageHeight}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseOut={handleMouseUp}
        style={{
          border: "2px solid #000",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Layer>
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
      <button
        onClick={downloadCanvas}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          backgroundColor: "#4CAF50",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Download Canvas
      </button>
    </div>
  );
};

export default Canvas;
