import React, { useEffect, useRef, useState } from "react";
import "./CanvasELement.css";
import Canvas from "../utils/Canvas";
import useCanvas from "../hooks/useCanvas";

export default function CanvasElement() {
  const ref = useRef(null);
  const [canvasInstance, setCanvasInstance] = useState(null);
  const { image, backgroundColor, caption, template, cta } = useCanvas();

  useEffect(() => {
    const initializeCanvas = () => {
      if (!canvasInstance && template) {
        const canvas = ref.current;
        const myCanvas = new Canvas(canvas, template);
        myCanvas.loadTemplate();
        setCanvasInstance(myCanvas);
      }
    };

    const drawImage = () => {
      if (image && canvasInstance) {
        canvasInstance.drawImageMask(image);
      }
    };

    const changeBackgroundColor = () => {
      if (backgroundColor && canvasInstance) {
        canvasInstance.changeBackgroundColor(backgroundColor);
      }
    };

    const writeCaption = () => {
      if (canvasInstance) {
        canvasInstance.writeCaption(caption);
      }
    };

    const writeCTA = () => {
      if (canvasInstance) {
        canvasInstance.writeCTA(cta);
      }
    };

    initializeCanvas();
    drawImage();
    changeBackgroundColor();
    writeCaption();
    writeCTA();
  }, [template, canvasInstance, image, backgroundColor, caption, cta]);

  return (
    <div className="canvas_container">
      <canvas
        className="canvas_container__canvas"
        ref={ref}
        height="1080"
        width="1080"
      />
      <canvas
        className="canvas_container__canvas"
        height="1080"
        width="1080"
        id="caption"
      />
      <canvas
        className="canvas_container__canvas"
        height="1080"
        width="1080"
        id="cta"
      />
    </div>
  );
}
