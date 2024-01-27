import React, { useEffect, useRef, useState } from "react";
import "./CanvasELement.css";
import Canvas from "../utils/Canvas";
import useCanvas from "../hooks/useCanvas";

export default function CanvasElement() {
  const ref = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);

  const { image, backgroundColor, caption, template } = useCanvas();

  useEffect(() => {
    if (!canvasInstance && template) {
      const canvas = ref.current;
      const myCanvas = new Canvas(canvas, template);
      myCanvas.init();
      setCanvasInstance(myCanvas);
    }
  }, [template, canvasInstance]);

  useEffect(() => {
    if (image && canvasInstance) {
      canvasInstance.drawImageMask(image);
    }
  }, [image, canvasInstance]);

  useEffect(() => {
    if (backgroundColor && canvasInstance) {
      canvasInstance.changeBackgroundColor(backgroundColor);
    }
  }, [backgroundColor, canvasInstance]);

  useEffect(() => {
    if (caption != null && canvasInstance) {
      canvasInstance.updateCaption(caption);
    }
  }, [caption, canvasInstance]);

  return (
    <div className="canvas_container">
      <canvas
        className="canvas_container__canvas"
        ref={ref}
        height="1080"
        width="1080"
      />
      {/* <canvas
        className="canvas_container__canvas"
        id="canvas"
        height="1080"
        width="1080"
      /> */}
    </div>
  );
}
