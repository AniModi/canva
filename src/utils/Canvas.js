import captionWorker from "../workers/caption-worker"
import ctaWorker from "../workers/cta-worker"

export default class Canvas {
  constructor(canvas, data) {
    this.canvas = canvas;
    this.data = data;
    this.context = canvas.getContext("2d");
    this.backgroundColor = "#0369A1";
    this.handleCaptionWorker();
    this.handleCTAWorker();
  }

  handleCaptionWorker() {
    const code = captionWorker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    const worker = new Worker(URL.createObjectURL(blob));
    const canvas = document.getElementById("caption").transferControlToOffscreen();
    worker.postMessage({ canvas }, [canvas]);
    this.captionWorker = worker;
  }

  handleCTAWorker() {
    const code = ctaWorker.toString();
    const blob = new Blob(["(" + code + ")()"]);
    const worker = new Worker(URL.createObjectURL(blob));
    const canvas = document.getElementById("cta").transferControlToOffscreen();
    worker.postMessage({ canvas }, [canvas]);
    this.ctaWorker = worker;
  }

  loadTemplate() {
    this.drawImage("design_pattern", () => {
      this.drawImage("mask", () => {
        this.drawImage("stroke", () => {});
      });
    });
  }

  drawImage(type, callback) {
    const image = new Image();
    image.onload = () => {
      this.context.drawImage(
        image,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      if (callback) {
        callback();
      }
    };
    image.src = this.data.urls[type];
  }

  drawImageMask(url) {
    const { x, y, width, height } = this.data.image_mask;
    const image = new Image();
    image.onload = () => {
      this.context.drawImage(image, x, y, width, height);
    };
    image.src = url;
  }

  changeBackgroundColor(color) {
    this.canvas.style.backgroundColor = color;
  }

  writeCaption(text) {
    const caption = this.data.caption;
    if(text === null) {
      text = this.data.caption.text;
    }
    this.captionWorker.postMessage({
      text,
      x: caption.position.x,
      y: caption.position.y,
      fontSize: caption.font_size,
      textColor: caption.text_color,
      maxWidth : caption.max_characters_per_line,
      alignment: caption.alignment
    });
  }

  writeCTA(text) {
    const cta = this.data.cta;
    if(text === null) {
      text = this.data.cta.text;
    }
    this.ctaWorker.postMessage({
      text,
      x: cta.position.x,
      y: cta.position.y,
      fontSize: cta.font_size || 30,
      textColor: cta.text_color,
      backgroundColor: cta.background_color,
      maxWidth: cta.wrap_length || 20
    });
  }
}
